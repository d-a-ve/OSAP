import React, { useEffect } from "react"
import { useContext } from "react"
import { TailSpin } from "react-loading-icons"
import {
  useLazyQuery,
  useMutation,
  useQuery,
} from "@apollo/client"

import {
  CREATE_REGISTER_ESSENCE_TYPED_DATA,
  RELAY,
} from "../../utils/graphql"
import { randPhrase } from "@ngneat/falso"
import { v4 as uuidv4 } from "uuid"
// @ts-ignore
import LitJsSdk from "@lit-protocol/sdk-browser"
import { GlobalContext } from "../../contexts/global"
import { ModalContext } from "../../contexts/modal"
import {
  getEssenceSVGData,
  isValidUrl,
  pinFileToIPFS,
  pinJSONToIPFS,
} from "../../utils/helpers/functions"
import {
  IPostInput,
  IEssenceMetadata,
} from "../../utils/types"
import {
  Button,
  useToast,
} from "@chakra-ui/react"
import { ethers } from "ethers"

function PostBtn({
  nftMedia,
  content,
  privacy,
  description,
}: IPostInput) {
  const toast = useToast()
  const {
    address,
    accessToken,
    primaryProfile,
    indexingPosts,
    setIndexingPosts,
    connectWallet,
    checkNetwork,
  } = useContext(GlobalContext)
  const [loading, setLoading] =
    React.useState(false)
  const { handleModal } = useContext(ModalContext)
  const [createRegisterEssenceTypedData] =
    useMutation(
      CREATE_REGISTER_ESSENCE_TYPED_DATA
    )
  // const [getRelayActionStatus] = useQuery(RELAY_ACTION_STATUS)
  const [relay] = useMutation(RELAY)
  const [relayActionId, setRelayActionId] =
    React.useState("")

  const encryptWithLit = async (data: any) => {
    const client = new LitJsSdk.LitNodeClient()
    await client.connect()
    const chain = "bscTestnet"

    //assessing comments

    const evmContractConditions = [
      {
        contractAddress:
          "0xDfA982cB1A5bDa0ad62dFfd416bABBfab02D6ba8",
        functionName: "balanceOf",
        functionAbi: {
          type: "function",
          stateMutability: "view",
          inputs: [
            {
              internalType: "address",
              name: "owner",
              type: "address",
            },
          ],
          name: "balanceOf",
          outputs: [
            {
              internalType: "uint256",
              name: "",
              type: "uint256",
            },
          ],
        },
        chain,
        parameters: [":userAddress"],
        returnValueTest: {
          key: "",
          comparator: "=",
          value: "1",
        },
      },
    ]

    const unifiedAccessControlConditions = [
      {
        conditionType: "evmContract",
        permanent: false,
        contractAddress:
          "0xa52cc9b8219dce25bc791a8b253dec61f16d5ff0",
        functionName: "isSubscribedByMe",
        functionParams: [
          String(primaryProfile?.profileID),
          ":userAddress",
        ],
        functionAbi: {
          inputs: [
            {
              internalType: "uint256",
              name: "profileId",
              type: "uint256",
            },
            {
              internalType: "address",
              name: "me",
              type: "address",
            },
          ],
          name: "isSubscribedByMe",
          outputs: [
            {
              internalType: "bool",
              name: "",
              type: "bool",
            },
          ],
          stateMutability: "view",
          type: "function",
        },
        chain: "bscTestnet",
        returnValueTest: {
          key: "",
          comparator: "=",
          value: "true",
        },
      },
    ]

    const authSig =
      await LitJsSdk.checkAndSignAuthMessage({
        chain: "bscTestnet",
      })
    const { encryptedString, symmetricKey } =
      await LitJsSdk.encryptString(data)

    const encryptedSymmetricKey =
      await client.saveEncryptionKey({
        evmContractConditions,
        symmetricKey,
        authSig,
        chain: "bscTestnet",
      })

    return {
      encryptedString,
      encryptedSymmetricKey:
        LitJsSdk.uint8arrayToString(
          encryptedSymmetricKey,
          "base16"
        ),
    }
  }

  const pollRelayActionStatus = async (
    relayActionId: string
  ) => {
    const res = await fetch(
      "https://api.cyberconnect.dev/testnet/",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem(
            "accessToken"
          )}`,
          "X-API-KEY":
            "hACrUZVfmEbOz1rCF1vmQ48JtJy4dUBp",
        },
        body: JSON.stringify({
          query: `query relayActionStatus($relayActionId: ID!) {
				relayActionStatus(relayActionId: $relayActionId){ 
				... on RelayActionStatusResult {
				txHash
				}
				... on RelayActionError {
				reason
				}
				... on RelayActionQueued {
				reason
				}
				}
				}
			      `,
          variables: {
            relayActionId,
          },
        }),
      }
    )

    const resData = await res.json()

    return resData.data.relayActionStatus
  }

  const post = async (id: string) => {
    console.log("start polling")
    const res = await pollRelayActionStatus(id)
    console.log("res", res)
    if (res.txHash) {
      console.log("txHash", res.txHash)
      handleModal(
        "success",
        `Your post was successfully relayed https://testnet.bscscan.com/tx/${res.txHash}`
      )
      return
    }
    await new Promise((resolve) =>
      setTimeout(resolve, 1000)
    )
    console.log("peroidic polling end")
    await post(id)
  }

  const handleOnClick = async (e: any) => {
    e.preventDefault()
    setLoading(true)

    if (description.length < 4) {
      toast({
        title: "Error",
        description: "Description is too short",
        status: "error",
        duration: 3000,
        isClosable: false,
      })
      setLoading(false)
      return
    }

    if (content.length < 1) {
      toast({
        title: "Error",
        description:
          "Please add atleast an image or video url content",
        status: "error",
        duration: 6000,
        isClosable: true,
      })
      setLoading(false)
      return
    } else {
      if (!isValidUrl(content)) {
        toast({
          title: "Error",
          description:
            "Invalid image or video url",
          status: "error",
          duration: 3000,
          isClosable: false,
        })
        setLoading(false)
        return
      }
    }

    try {
      /* Check if the user logged in */
      if (!accessToken) {
        throw Error("You need to Sign in.")
      }

      /* Check if the has signed up */
      if (!primaryProfile?.profileID) {
        throw Error("Youn need to Sign up.")
      }
      console.log("content", content)
      const encryptedContent =
        await encryptWithLit(content)

      const ethereum = (window as any).ethereum
      await ethereum.request({
        method: "eth_requestAccounts",
      })
      const provider = new ethers.BrowserProvider(
        ethereum
      )

      /* Check if the network is the correct one */
      await checkNetwork(provider)

      /* Function to render the svg data for the NFT */
      /* (default if the user doesn't pass a image url) */
      const svg_data = getEssenceSVGData()

      const contentHash = await pinFileToIPFS(
        encryptedContent.encryptedString
      )

      /* Construct the metadata object for the Essence NFT */
      const metadata: IEssenceMetadata = {
        metadata_id: uuidv4(),
        version: "1.0.0",
        app_id: "cyberconnect",
        lang: "en",
        issue_date: new Date().toISOString(),
        content:
          JSON.stringify({
            contentHash: contentHash,
            encryptedSymmetricKey:
              encryptedContent.encryptedSymmetricKey,
          }) || randPhrase(),
        media: [],
        tags: ["lit-v1.2", privacy],
        image:
          nftMedia && nftMedia.length > 2
            ? nftMedia
            : "",
        image_data:
          nftMedia || nftMedia.length < 2
            ? svg_data
            : "",
        description: description,
        animation_url: "",
        external_url: "",
        attributes: [],
      }

      /* Upload metadata to IPFS */
      const ipfsHash = await pinJSONToIPFS(
        metadata
      )

      /* Get the signer from the provider */
      const signer = provider.getSigner()

      /* Get the address from the provider */
      const address = await (
        await signer
      ).getAddress()

      /* Create typed data in a readable format */
      const typedDataResult =
        await createRegisterEssenceTypedData({
          variables: {
            input: {
              options: {},
              /* The profile id under which the Essence is registered */
              profileID:
                primaryProfile?.profileID,
              /* Name of the Essence */
              name: "Post",
              /* Symbol of the Essence */
              symbol: "POST",
              /* URL for the json object containing data about content and the Essence NFT */
              tokenURI: `https://gateway.pinata.cloud/ipfs/${ipfsHash}`,
              /* Middleware that allows users to collect the Essence NFT for free */
              middleware: { collectFree: true },
              /* Set if the Essence should be transferable or not */
              transferable: true,
            },
          },
        })

      const typedData =
        typedDataResult.data
          ?.createRegisterEssenceTypedData
          ?.typedData
      const message = typedData.data
      const typedDataID = typedData.id

      /* Get the signature for the message signed with the wallet */
      const fromAddress = await (
        await signer
      ).getAddress()
      const params = [fromAddress, message]
      const method = "eth_signTypedData_v4"
      const signature = await (
        await signer
      ).provider.send(method, params);

      /* Call the relay to broadcast the transaction */
      const relayResult = await relay({
        variables: {
          input: {
            typedDataID: typedDataID,
            signature: signature,
          },
        },
      })
      const relayActionId =
        relayResult.data.relay.relayActionId
      console.log("relayActionId", relayActionId)
      setRelayActionId(relayActionId)
      /* Close Post Modal */
      handleModal(null, "")

      const relayingPost = {
        createdBy: {
          handle: primaryProfile?.handle,
          avatar: primaryProfile?.avatar,
          metadata: primaryProfile?.metadata,
          profileID: primaryProfile?.profileID,
        },
        essenceID: 0, // Value will be updated once it's indexed
        tokenURI: `https://cyberconnect.mypinata.cloud/ipfs/${ipfsHash}`,
        isIndexed: false,
        isCollectedByMe: false,
        collectMw: undefined,
        relayActionId: relayActionId,
      }
      console.log("relayingPost", relayingPost)
      localStorage.setItem(
        "relayingPosts",
        JSON.stringify([
          ...indexingPosts,
          relayingPost,
        ])
      )
      post(relayActionId)

      /* Display success message */
      handleModal(
        "info",
        "Your post is being relayed..."
      )
    } catch (error: any) {
      /* Set the indexingPosts in the state variables */
      setIndexingPosts([...indexingPosts])

      /* Display error message */
      const message = error.message as string
      handleModal("error", message)
      setLoading(false)
    }
    setLoading(false)
  }

  return (
    <Button
      className="post-btn flex items-center justify-center"
      onClick={handleOnClick}
      borderRadius="12px"
      h="55px"
      bg="green"
    >
      {loading && (
        <TailSpin
          stroke="#fff"
          height={20}
          className="m-0"
          strokeWidth={2}
        />
      )}
      {!loading && "Post"}
    </Button>
  )
}

export default PostBtn
