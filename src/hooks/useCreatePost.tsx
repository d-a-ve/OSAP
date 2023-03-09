import CyberConnect from "@cyberlab/cyberconnect-v2/lib/cyberConnect";
import { Content, Env } from "@cyberlab/cyberconnect-v2/lib/types";
import { ethers } from "ethers";
import { useCallback, useMemo, useState } from "react";
import useCyberConnect from "./useCC";

function useCreatePost() {
    const [isLoading, toggleIsLoading] = useState(false);
    const cc: any = useCyberConnect();


    const createPost = useCallback(
        async (content: Content) => {
            if (!cc)
                return {
                    isError: true,
                    message: "CC client is not ready.",
                };
            toggleIsLoading(true);
            const error = await cc
                .createPost(content)
                .catch((error: any) => {
                    return error;
                })
                .finally(() => toggleIsLoading(false));

            if (!error || error.message === "ALREADY_DONE") {
                return { isSuccess: true };
            } else {
                return {
                    isError: true,
                    message: "Network busy. Please try again later.",
                };
            }
        },

        []);

    return useMemo(
        () => ({
            isLoading,
            createPost,
        }),
        [isLoading, createPost]
    );
}

export default useCreatePost;