import {
  Box,
  Button,
  Flex,
  FormLabel,
  HStack,
  Input,
  Textarea,
  VStack,
  Text,
  Center,
} from "@chakra-ui/react"
import {
  useState,
  ChangeEvent,
  useCallback,
  useContext,
  useMemo,
  useEffect,
} from "react"
import { BiGlobe } from "react-icons/bi"
import { BsFillPeopleFill } from "react-icons/bs"
import { IPostInput } from "../../utils/types"
import PostBtn from "../Buttons/PostBtn"
import useStudioInputs from "@/hooks/useStudioinput"
import {
  RiImageAddFill,
  RiImageFill,
  RiVideoAddFill,
  RiVideoFill,
} from "react-icons/ri"
import { GlobalContext } from "@/contexts/global"
import { CloseIcon } from "@chakra-ui/icons"
import {
  FaPen,
  FaWindowClose,
} from "react-icons/fa"

const placeholderImage =
  "https://via.placeholder.com/150x150.png?text=Media "

export const ImageInput = () => {
  const { useUploadImage } = useStudioInputs()
  const { imagedDopzone, image, get } =
    useUploadImage()
  const { imageURL, setimageURL } = useContext(
    GlobalContext
  )
  const { getRootProps, getInputProps } =
    imagedDopzone
  const [xx, setxx] = useState<number | null>(
    null
  )

  useEffect(() => {
    console.log(image)
  }, [image])

  useEffect(() => {
    if (get) {
      const { progress } = get
      const xx = Math.round(
        (progress.loaded * 100) / progress.total
      )
      setxx(xx)
      if (get.response) {
        const { cid, title } = get.response
        setimageURL(`https://ipfs.io/ipfs/${cid}`)
      }
    }
  }, [get])

  useEffect(() => {
    if (xx) {
      console.log(xx)
    }
  }, [xx])

  return (
    <Box display="flex" w="100%" h="100%">
      <Box
        flex={1}
        {...getRootProps()}
        h="60%"
        bg="whitesmoke"
        borderLeftRadius={"25px"}
        borderRightRadius={"25px"}
        flexDirection={"column"}
      >
        <input {...getInputProps()} />
        <RiImageAddFill size={"70px"} />

        <Center>
          <Text fontWeight={900} fontSize={"xl"}>
            Cover Photo
          </Text>
        </Center>
      </Box>
    </Box>
  )
}

export const VideoInput = () => {
  const { useUploadVideo } = useStudioInputs()
  const { dropzone } = useUploadVideo()
  const { getRootProps, getInputProps } = dropzone
  //  const { mutate: createAsset, data } = assetData;

  return (
    <Box display="flex" w="100%" h="100%">
      <Box
        borderRightRadius={"25px"}
        flex={1}
        flexDirection={"column"}
        bg="green"
        h="100%"
        {...getRootProps()}
      >
        <input {...getInputProps()} />
        <RiVideoAddFill size={"70px"} />
      </Box>

      {/* {progressFormatted && (
            <p style={{ marginLeft: "1rem" }}>{progressFormatted}</p>
          )}  */}
    </Box>
  )
}

const PostForm = () => {
  const {
    imageURL,
    setimageURL,
    postInput,
    setPostInput,
  } = useContext(GlobalContext)
  const [addImage, setaddImage] = useState(false)
  const [addVideo, setaddVideo] = useState(false)

  const toggleVideo = () => setaddVideo(!addVideo)
  const toggleImage = () => setaddImage(!addImage)

  function handleImageLink() {
    if (!addImage && !addImage) {
      toggleImage()
    }
  }

  function handleVideLink() {
    if (!addVideo && !addImage) {
      toggleVideo()
    }
  }

  const handleOnChange = (
    event: ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement
    >
  ) => {
    const name = event.target.name
    const value = event.target.value
    setPostInput({
      ...postInput,
      [name]: value,
    })
  }

  return (
    <form>
      <Box
        className="form post-form"
        bg="white"
        position="absolute"
        h={"100vh"}
        w="40%"
        left={0}
        top={0}
        px={32}
        py={4}
        overflow={"auto"}
      >
        <Box>
          <Box
            as="h2"
            fontWeight={"bold"}
            color={"green"}
          >
            Create post
          </Box>

          <Box>
            <label>Description</label>
            <Flex
              w="100%"
              justifyContent={"flex-end"}
            >
              <HStack
                spacing={18}
                pb={8}
                alignItems="center"
                fontSize={"xl"}
                color={
                  addImage || addVideo
                    ? "gray"
                    : "green"
                }
                cursor={
                  addImage || addVideo
                    ? ""
                    : "pointer"
                }
              >
                <RiImageAddFill
                  onClick={handleImageLink}
                />
                <RiVideoAddFill
                  onClick={handleVideLink}
                />
              </HStack>
            </Flex>

            <Textarea
              name="description"
              value={postInput.description}
              onChange={handleOnChange}
              placeholder="What's the your mind?"
              required
            />
          </Box>

          <Box
            sx={{
              fontSize: "13px",
            }}
          >
            <br />

            {addImage && (
              <HStack
                w="100%"
                justifyContent={"space-between"}
                alignItems="center"
                position={"absolute"}
                pr={"10%"}
              >
                <Box w="10%">
                  <RiImageFill
                    color="gray"
                    size="18px"
                  />
                </Box>
                <Input
                  w="60%"
                  bg="whitesmoke"
                  border="none"
                  type="text"
                  name="content"
                  placeholder="htts://lorem.picsium.com/me.png"
                  value={postInput.content}
                  defaultChecked
                  onChange={handleOnChange}
                  borderRadius="25px"
                />
                <Box
                  display={"flex"}
                  fontSize="12px"
                  w="20%"
                >
                  <CloseIcon
                    cursor={"pointer"}
                    fontSize="13px"
                    onClick={toggleImage}
                  />
                </Box>
              </HStack>
            )}

            {addVideo && (
              <HStack
                w="100%"
                justifyContent={"space-between"}
                alignItems="center"
                position={"absolute"}
                pr={"10%"}
              >
                <Box w="10%">
                  <RiVideoFill
                    size="18px"
                    color="gray"
                  />
                </Box>
                <Input
                  bg="whitesmoke"
                  border="none"
                  w="60%"
                  type="text"
                  name="content"
                  value={postInput.content}
                  placeholder="htts://youtube.com/me"
                  defaultChecked
                  onChange={handleOnChange}
                  borderRadius="25px"
                />
                <Box
                  display={"flex"}
                  fontSize="12px"
                  w="20%"
                >
                  <CloseIcon
                    cursor={"pointer"}
                    fontSize="13px"
                    onClick={toggleVideo}
                  />
                </Box>
              </HStack>
            )}
          </Box>

          {addVideo && <Box h="50px" />}
          {addImage && <Box h="50px" />}

          <Box className="form-post-middleware">
            <Box>
              Access Control
              <span
                style={{
                  fontSize: "9px",
                  marginLeft: "9px",
                  color: "red",
                }}
              >
                Powered by Lit Protocol
              </span>
            </Box>
            <Box>
              <FormLabel>
                <strong>
                  <BiGlobe />
                </strong>{" "}
                <span
                  style={{
                    fontSize: "12px",
                  }}
                >
                  Everyone: osap members are free
                  to view & contribute
                </span>
                <input
                  type="radio"
                  name="privacy"
                  value="public"
                  defaultChecked
                  onChange={handleOnChange}
                />
              </FormLabel>
              <label>
                <strong>
                  <BsFillPeopleFill />
                </strong>
                <span
                  style={{
                    fontSize: "12px",
                  }}
                >
                  {" "}
                  Followers: only your
                  suscriptions can view and
                  comment
                </span>
                <input
                  type="radio"
                  name="privacy"
                  value="sub"
                  onChange={handleOnChange}
                />
              </label>
            </Box>
          </Box>
          <br />
          <PostBtn {...postInput} />
        </Box>
      </Box>

      {imageURL ? (
        <Box
          as="div"
          ml={"40%"}
          borderRadius="25px"
          background={`url('${imageURL}')`}
          sx={{
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
            backgroundsize: "center",
          }}
          w="600px"
          h="60vh"
        />
      ) : (
        <Box
          as="div"
          ml={"40%"}
          borderRadius="25px"
          bg="white"
          // background={`url('${placeholderImage}')`}

          w="600px"
          h="60vh"
        >
          <Flex
            sx={{
              display: "flex",

              alignItems: "center",
              height: "100%",
              width: "100%",
            }}
          >
            <ImageInput />
          </Flex>
        </Box>
      )}
    </form>
  )
}

export default PostForm
