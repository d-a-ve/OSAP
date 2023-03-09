import {
  PROFILE_BY_HANDLE,
  RELAY,
  RELAY_ACTION_STATUS,
} from "@/utils/graphql"
import { pinJSONToIPFS } from "@/utils/helpers/functions"
import {
  useLazyQuery,
  useMutation,
} from "@apollo/client"
import { CloseIcon } from "@chakra-ui/icons"
import {
  Button,
  useToast,
} from "@chakra-ui/react"
import {
  gql,
  GraphQLClient,
} from "graphql-request"
import { useContext, useState } from "react"
import { GlobalContext } from "../../contexts/global"
import { ModalContext } from "../../contexts/modal"
import {
  IProfileMetadata,
  ISignupInput,
} from "../../utils/types"
import OSAP from "../../utils/abi/OSAP.json"
import { ethers, id } from "ethers"
import { TailSpin } from "react-loading-icons"

const endpoint =
  "https://api.cyberconnect.dev/testnet/"
const graphQLClient = new GraphQLClient(endpoint)

const MintProfileBtn = ({
  handle,
  avatar,
  name,
  bio,
  operator,
}: ISignupInput) => {
  const [loading, setLoading] = useState(false)
  const { address }: any = useContext(
    GlobalContext
  )
  const { handleModal }: any =
    useContext(ModalContext)
  const [
    relay,
    {
      data: relayData,
      loading: relayLoading,
      error: relayError,
    },
  ] = useMutation(RELAY)
  const [
    relayActionStatus,
    {
      data: relayActionStatusData,
      loading: relayActionStatusLoading,
      error: relayActionStatusError,
    },
  ] = useLazyQuery(RELAY_ACTION_STATUS)
  const [
    profileByHandle,
    {
      data: profileByHandleData,
      loading: profileByHandleLoading,
      error: profileByHandleError,
    },
  ] = useLazyQuery(PROFILE_BY_HANDLE)
  const toast = useToast()

  async function createProfile() {
    setLoading(true)
    const xx = localStorage.getItem("accessToken")
    if (xx) {
      const accessToken = xx
      console.log("my rr Token", accessToken)
      //  setAccessToken(xx);

      /* Construct metadata schema */
      const metadata = {
        name: name,
        bio: bio,
        handle: handle,
        version: "1.0.0",
      }

      /* Upload metadata to IPFS */
      const ipfsHash = await pinJSONToIPFS(
        metadata
      )

      const mutation = gql`
        mutation CreateCreateProfileTypedData(
          $input: CreateCreateProfileTypedDataInput!
        ) {
          createCreateProfileTypedData(
            input: $input
          ) {
            typedDataID
          }
        }
      `

      const variables = {
        input: {
          to: address,
          operator:
            operator.length < 58
              ? "0xF8908f32067a875a1c204787F4953d5Af3C32784"
              : operator,
          metadata: ipfsHash,
          handle: "osap_" + handle.toLowerCase(),
          avatar: avatar,
        },
      }

      const requestHeaders = {
        authorization: `bearer ${accessToken}`,
      }

      try {
        const data: any =
          await graphQLClient.request(
            mutation,
            variables,
            requestHeaders
          )
        console.log(
          JSON.stringify(data, undefined, 2)
        )

        if (data) {
          const typedDataID =
            data.createCreateProfileTypedData
              .typedDataID

          const relayResult = await relay({
            variables: {
              input: { typedDataID: typedDataID },
            },
          })
          console.log("relayResult", relayResult)
          const relayActionId =
            relayResult.data?.relay?.relayActionId
          console.log(
            "relayActionId",
            relayActionId
          )

          const pollRelayActionStatus = async (
            id: string
          ) => {
            console.log("start polling")
            const relayActionStatusResult =
              await relayActionStatus({
                variables: {
                  relayActionId: relayActionId,
                },
                fetchPolicy: "network-only",
              })
            console.log(
              "relayActionStatusResult",
              relayActionStatusResult
            )
            if (
              relayActionStatusResult.data
                ?.relayActionStatus?.txHash
            ) {
              //Mint an OSAP NFT For this user
              const ethereum = (window as any)
                .ethereum
              await ethereum.request({
                method: "eth_requestAccounts",
              })
              const provider =
                new ethers.BrowserProvider(
                  ethereum
                )
              const signer = provider.getSigner()
              const contract =
                new ethers.Contract(
                  process.env.NEXT_PUBLIC_CONTRACT_ADDRESS!,
                  OSAP.abi,
                  await signer
                )
              const cid = ipfsHash // replace with the desired CID for your NFT
              // Mint the NFT
              const tx = await contract.mint(
                (await signer).getAddress(),
                cid
              )
              await tx.wait()

              console.log(
                "NFT minted successfully!"
              )

              setLoading(false)
              handleModal(
                "success",
                "Profile was created! Please refresh page"
              )
              // toast({
              //     title: "Profile was created!",
              //     status: "success",
              //     duration: 3000,
              // });

              return
            } else if (
              relayActionStatusResult.data
                ?.relayActionStatus?.reason
            ) {
              alert(
                "Error: " +
                  relayActionStatusResult.data
                    ?.relayActionStatus?.reason
              )
              return
            }
            await new Promise((resolve) =>
              setTimeout(resolve, 1000)
            )
            await pollRelayActionStatus(id)
          }

          await pollRelayActionStatus(
            relayActionId
          )
          console.log("peroidic polling end")

          setLoading(false)

          //Close modal or show end animation
        }
      } catch (error: any) {
        console.log(
          JSON.stringify(error, undefined, 2)
        )
        setLoading(false)
        const errorMessage =
          error.response.errors[0].message
        console.log(errorMessage) // output: "err: invalid ccProfile handle"

        toast({
          title: "Error",
          description: errorMessage,
          status: "error",
          duration: 9000,
          isClosable: true,
        })
      }
    }
  }

  function handleOnClick(e: any) {
    e.preventDefault()
    createProfile()
  }

  return (
    <Button
      type="submit"
      bg={"lightgreen"}
      _hover={{
        backgroundColor: "green",
        color: "white",
      }}
      color={"green"}
      fontSize="xl"
      fontWeight={800}
      w="60%"
      h="48px"
      mt="8px"
      borderRadius={8}
      onClick={handleOnClick}
      cursor={"pointer"}
    >
      {loading && (
        <TailSpin
          stroke="#fff"
          height={20}
          className="m-0"
          strokeWidth={2}
        />
      )}
      Mint Profile
    </Button>
  )
}

export default MintProfileBtn
