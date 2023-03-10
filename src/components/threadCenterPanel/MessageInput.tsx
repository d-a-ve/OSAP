import React, {
  useContext,
  useEffect,
  useState,
} from "react"
import {
  Box,
  InputGroup,
  Input,
  InputRightElement,
  IconButton,
  Center,
  Spinner,
} from "@chakra-ui/react"
import { BiSend } from "react-icons/bi"
import {
  Content,
  Env,
} from "@cyberlab/cyberconnect-v2/lib/types"
import { GlobalContext } from "@/contexts/global"
import useCreatePost from "@/hooks/useCreatePost"
import CyberConnect from "@cyberlab/cyberconnect-v2"

// const endpoint = "https://api.cyberconnect.dev/testnet/";
// const graphQLClient = new GraphQLClient(endpoint);

type MessageInputType = {
  comment?: string
  handleChange?: (
    e: React.ChangeEvent<HTMLInputElement>
  ) => void
  sendMessage?: () => void
  boxRef?: React.LegacyRef<HTMLDivElement>
}

export default function MessageInput({
  comment,
  handleChange,
  sendMessage,
  boxRef,
}: MessageInputType) {
  const [isCommenting, setIsCommenting] =
    useState(false)
  const { address, primaryProfile }: any =
    useContext(GlobalContext)
  const [mounted, setIsMounted] =
    React.useState(false)
  const [targetContentId, setTargetContentId] =
    React.useState("")
  const [cc, setCC] =
    React.useState<CyberConnect>()
  const [contentId, setContentId] =
    React.useState("")

  React.useEffect(() => {
    setIsMounted(true)
    const cyberConnect = new CyberConnect({
      namespace: "CyberConnect",
      provider: (window as any)?.ethereum,
      env: Env.STAGING,
      appId:
        "e20d0b35-8e8c-46f9-80bc-ccfeda19f133",
    })

    setCC(cyberConnect)
  }, [])

  const createPost = async () => {
    const res = await cc?.createPost({
      title: "title",
      body: comment!,
      author: primaryProfile.handle,
    })

    setContentId(res?.contentID)
  }

  useEffect(() => {
    console.log(contentId)
  }, [contentId])

  return (
    <Box
      pos="fixed"
      bottom="20px"
      right={["0", "0", "25%"]}
      left={["0", "0", "20%"]}
      px={[2, 2, 4]}
      ref={boxRef}
    >
      <form>
        <InputGroup size="lg">
          <Input
            pr="3.7rem"
            placeholder="Message"
            focusBorderColor="green.100"
            value={comment}
            required
            onChange={handleChange}
          />
          <InputRightElement>
            {isCommenting && (
              <Center>
                <Spinner />
              </Center>
            )}
            {!isCommenting && (
              <IconButton
                bg="green.300"
                color="white"
                aria-label="Send Message"
                fontSize="2xl"
                icon={<BiSend />}
                size="lg"
                onClick={createPost}
              />
            )}
          </InputRightElement>
        </InputGroup>
      </form>
    </Box>
  )
}

//  try {

//       const authorAddress = address;
//       const authorHandle = primaryProfile.handle;
//       const targetContentID = "1";
//       console.log(comment);

//       const message = comment;
//       const xx =
//         JSON.stringify({
//           "types": {
//             "EIP712Domain": [
//               {
//                 "name": "name",
//                 "type": "string"
//               },
//               {
//                 "name": "version",
//                 "type": "string"
//               },
//               {
//                 "name": "chainId",
//                 "type": "uint256"
//               },
//               {
//                 "name": "verifyingContract",
//                 "type": "address"
//               }
//             ],
//             "Message": [
//               {
//                 "name": "message",
//                 "type": "string"
//               }
//             ]
//           },
//           "primaryType": "Message",
//           "domain": {
//             "name": "osap",
//             "version": "1.0",
//             "chainId": 97,
//             "verifyingContract": "0xDbd8962AEA101246975EF8D917Ac81dc92bDD6dB"
//           },
//           "message": {
//             "message": comment
//           }
//         }
//         )

//       const ethereum = (window as any).ethereum
//       await ethereum.request({
//         method: "eth_requestAccounts",
//       })
//       const provider = new ethers.BrowserProvider(
//         ethereum
//       )
//       /* Get the signer from the provider */
//       const signer = provider.getSigner();

//       /* Get the signature for the message signed with the wallet */
//       const fromAddress = await (
//         await signer
//       ).getAddress();
//       const params = [fromAddress, xx]
//       const method = "eth_signTypedData_v4"
//       const signature = await (
//         await signer
//       ).provider.send(method, params);

//       //  const key =  await (await signer).signMessage(message!);

//       console.log(signature);

//       const signingKey = (await signer).signMessage(comment!);

//       console.log(signingKey);

//       const mutation = gql`
//       mutation PublishComment($input: PublishRequest!, $targetContentID: String!) {
//         publishComment(input: $input, targetContentID: $targetContentID) {
//           status
//         }
//       }
//     `;

//       const variables = {
//         input: {
//           authorAddress,
//           authorHandle,
//           message,
//           signature,
//           signingKey
//         },
//         targetContentID,
//       };

//       try {
//         const data: any = await graphQLClient.request(mutation, variables);
//         return data.publishComment.status;

//       } catch (error) {
//         console.error(JSON.stringify(error, undefined, 2));
//       }

//     }
