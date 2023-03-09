import { useCreateAsset } from "@livepeer/react";
import { useCallback, useContext, useMemo, useState } from "react";
import { useDropzone } from "react-dropzone";

import { uploadFairsaveImage } from "@/utils/helpers/savefiles";

const useStudioInputs = () => {

    const useUploadVideo = () => {
        const [video, setVideo] = useState<File | undefined>();
        const onDrop = useCallback(async (acceptedFiles: File[]) => {
            if (acceptedFiles && acceptedFiles.length > 0 && acceptedFiles?.[0]) {
                setVideo(acceptedFiles[0]);
            }
        }, []);

        const dropzone = useDropzone({
            accept: { "video/*": [".mp4", ".mov"] },
            maxFiles: 1,
            onDrop,
        });
        return { dropzone };
    };

    const useUploadImage = () => {
        const [image, setImage] = useState<File | undefined>();

        const [get, set] = useState<{
            progress: ProgressEvent<XMLHttpRequestEventTarget>;
            response: {
                cid: string;
                title: string;
            };
        }>();

        const onDrop = useCallback(async (acceptedFiles: File[]) => {
            if (acceptedFiles && acceptedFiles.length > 0 && acceptedFiles?.[0]) {
                uploadFairsaveImage({ image: acceptedFiles[0], set });
                setImage(acceptedFiles[0]);
                console.log("mem2");
            }
        }, []);

        const imagedDopzone = useDropzone({
            accept: { "image/png": [".png", ".jpg", ".jpeg", ".gif"] },
            maxFiles: 1,
            onDrop,
        });

        return { imagedDopzone, get, image };
    };

    return {
        useUploadVideo,
        useUploadImage,
    };
};

export default useStudioInputs;