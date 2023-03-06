import {
    Box,

    Text
} from "@chakra-ui/react"

export default function HomeCenterPanelheader() {
    return (
        <>
            <Box pl="8px" fontSize="lg" pb="8px" bg="white"
                position={"fixed"}
                zIndex="tooltip"
                mt={0}
                h="60px"
                w="55%"
                shadow={"sm"}
                display="flex"
                alignItems={"center"}
            >
                <Box
                    as="img"
                    src="OSAP.svg"
                    alt="osap_ogo"
                    h="45px"
                />
            </Box>

        </>
    )
}
