import {
    Box,

    Stack,

} from "@chakra-ui/react"
import CreateThread from "./CreateThread"
import PopularThreadsSection from "./PopularThreadSection"
import ThreadCard from "./ThreadCard"

export default function HomeCenterPanelBody() {
    return (
        <Box mt="60px">
            <CreateThread />
            <Stack spacing="0px">
                <PopularThreadsSection />
                <ThreadCard />
                <ThreadCard />
                <ThreadCard />
            </Stack>


        </Box>);
}
