
import { Flex } from "@chakra-ui/react";
import CenterPanel from "../homeCenterPanel/CenterPanel";
import LeftPanel from "../homeLeftPanel/LeftPanel";
import RightPanel from "../homeRightPanel/RightPanel";




export default function Layout(props: { children: any, sides: boolean }) {


    return (
        props.sides ?
            <Flex
                position={"fixed"} w="100%" h="100vh">
                <LeftPanel
                />

                {props.children}

                <RightPanel />
            </Flex> :

            <>
                 {props.children}
            </>


    )
}

