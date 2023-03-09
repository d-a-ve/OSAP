import { Box } from "@chakra-ui/react"

const Loader = () => {
  return (
    <Box className="loader">
      <Box className="loader-circle"></Box>
      <Box>indexing</Box>
    </Box>
  )
}

export default Loader
