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
              I got this idea from Don Tapscott’s
              speech in Ted : “How the blockchain is
              changing money and business”
            </Text>
            <Text {...textStyles}>
              The main purpose of the creation of
              Bitcoin as a decentralized currency
              was to give the masses the power to
              control and manage their own money.
              You might ask “Well, do I not have
              full control of my money?”. Since the
              money you deposit in the bank is
              usually used to lend it out to others,
              you technically do not have full
              control over it. I build a map-based
              wallet service for cryptocurrency
              information & context sharing and
              decision making!
            </Text>
          </Box>
        </Flex>
        <Flex
          direction={{ base: "column", md: "row" }}
          justifyContent="space-between"
          alignItems="center"
          marginTop="3rem"
          marginBottom="2rem"
        >
          <Text
            textAlign={{
              base: "center",
              md: "left",
            }}
            {...headingStyles}
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
            By merging core functions of
            transferring funds and exchange for
            ideal activities. After brainstorming, I
            decided to add core functions:
            Shapeshift, Express setup, Security Pin
            setup, Crypto show cut, and Wallet
            Dashboard.
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