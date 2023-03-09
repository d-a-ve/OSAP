import {
  Box,
  Button,
  Flex,
  Input,
} from "@chakra-ui/react"
import { useState, ChangeEvent } from "react"
import { ISignupInput } from "../../utils/types"
import { FaTwitter } from "react-icons/fa"
import MintProfileBtn from "../Buttons/MintProfile"

const SignupForm = () => {
  const [signupInput, setSignupInput] =
    useState<ISignupInput>({
      handle: "",
      name: "",
      bio: "",
      avatar: "",
      operator: "",
    })

  const handleOnChange = (
    event: ChangeEvent<HTMLInputElement>
  ) => {
    const name = event.target.name
    const value = event.target.value
    setSignupInput({
      ...signupInput,
      [name]: value,
    })
  }

  return (
    <form>
      <Box className="form signup-form">
        <Flex
          justifyContent="space-between"
          alignItems={"center"}
        >
          <h2 className="font-bold text-2xl">
            Create profile
          </h2>
          <Button
            py={8}
            px={12}
            bg={"#1DA1F2"}
            fontSize="14px"
            borderRadius={"10px"}
            color="white"
            fontWeight={600}
            leftIcon={<FaTwitter color="white" />}
          >
            Sign up with Twitter
          </Button>
        </Flex>

        <Box>
          <label>Handle (w/o @osap_)</label>
          <Input
            name="handle"
            value={signupInput.handle}
            onChange={handleOnChange}
            placeholder={"@username"}
            minLength={8}
            required
          />
        </Box>
        <Box>
          <label>Avatar URL</label>
          <Input
            name="avatar"
            value={signupInput.avatar}
            onChange={handleOnChange}
            placeholder="https://example.com/pic.jpg"
            required
          />
        </Box>
        <Box>
          <label>Name</label>
          <Input
            name="name"
            placeholder="John Doe"
            value={signupInput.name}
            onChange={handleOnChange}
            required
          />
        </Box>
        <Box>
          <label>Bio</label>
          <Input
            name="bio"
            value={signupInput.bio}
            onChange={handleOnChange}
            placeholder={
              "Infinty Stone Collector"
            }
          />
        </Box>
        <div>
          <label>
            Operator address (optional)
          </label>
          <input
            name="operator"
            value={signupInput.operator}
            onChange={handleOnChange}
            placeholder="0x..."
            required
          ></input>
        </div>

        <label>
          Mint your ccProfile NFT and start
          contributing on OSAP.
        </label>
        <MintProfileBtn {...signupInput} />
      </Box>
    </form>
  )
}

export default SignupForm
