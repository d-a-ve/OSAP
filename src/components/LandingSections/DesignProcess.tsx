import {
  Box,
  Flex,
  Image,
  Text,
  Heading,
} from "@chakra-ui/react"

const imageStyles = {
  maxW: "100%",
}

const headingStyles = {
  fontWeight: "bold",
  base: { fontSize: "lg" },
  md: { fontSize: "xl" },
}

const subheadingStyles = {
  fontSize: { base: "xl", md: "2xl" },
  lineHeight: { base: "1.5", md: "1.7" },
  fontWeight: "bold",
  marginBottom: "2rem",
}

const textStyles = {
  fontSize: { base: "sm", md: "md" },
  fontWeight: "500",
  marginBottom: "2rem",
}

export default function DesignProcess() {
  return (
    <Box>
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        margin={{
          base: "1rem auto",
          md: "3rem auto",
        }}
      >
        <Image
          src="src/assets/designProcess.jpg"
          alt="Design Process"
          {...imageStyles}
        />
      </Box>
      <Flex
        direction={{ base: "column", md: "row" }}
        justifyContent="center"
        alignItems="center"
        gap={{ base: "3rem", md: "7" }}
      >
        <Box flex="1">
          <Image
            src="src/assets/Brainstorm.jpg"
            alt="Brainstorming Design"
            {...imageStyles}
          />
        </Box>
        <Box
          flex="1"
          marginTop={{ base: "2rem", md: 0 }}
          color="white"
        >
          <Text
            marginBottom="1.5rem"
            textAlign={{
              base: "center",
              md: "left",
            }}
            {...headingStyles}
          >
            Brainstorming
          </Text>
          <Text as="h2" {...subheadingStyles}>
            I initally thought of this idea after
            our country banned twitter for nearly
            6 months
          </Text>
          <Text {...textStyles} opacity="0.8">
            One of the main purpose of the
            creation of decentralized apps is to
            give the masses the power to control
            and manage their own content. OSAP
            could be well-positioned to take
            advantage of this trend, by providing
            a platform that is built on Web3
            principles and designed to enable new
            forms of collaboration, and not cut
            off a particular section of people
            from the rest of the world.
          </Text>
        </Box>
      </Flex>
      <Flex
        direction={{ base: "column", md: "row" }}
        justifyContent="space-between"
        alignItems="center"
        marginTop="3rem"
        marginBottom="2rem"
        color={"white"}
      >
        <Text
          textAlign={{
            base: "center",
            md: "left",
          }}
          {...headingStyles}
          fontSize="lg"
        >
          INFORMATION ARCHITECTURE
        </Text>
        <Text
          width="50%"
          fontSize={{ base: "lg", md: "md" }}
          marginTop={{
            base: "10rem",
            md: "18rem",
          }}
          paddingBottom="10rem"
          fontWeight="500"
          paddingRight={{ base: 0, md: 10 }}
        >
          By merging core functions of creating
          ccpprofile, receiving a custom
          membershhip nft, and having access to
          post, contribute and vote for solutions
          shared on variety of topics. There is
          also a sign in with twitter that should
          reduce the process of filling profile
          infomration and possibly link ccprofile
          with new account
        </Text>
      </Flex>
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        margin={{
          base: "2rem auto",
          md: "5rem auto",
        }}
      >
        <Image
          src="src/assets/informationarchi.jpg"
          alt=""
          maxW="100%"
        />
      </Box>
    </Box>
  )
}
