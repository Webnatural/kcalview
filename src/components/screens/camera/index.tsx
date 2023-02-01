import React, { useState } from 'react';
import { launchCamera } from 'react-native-image-picker';

import TextRecognition, {
    TextRecognitionResult,
} from '@react-native-ml-kit/text-recognition';

import BottomButtons from './components/BottomButtons';
import ImagePreview from './components/ImagePreview';

export default function CameraScreen() {
    const [previewImgPath, setPreviewImgPath] = useState<string | null>(null);
    const [textFromImage, setTextFromImage] =
        useState<TextRecognitionResult | null>(null);

    const takePic = async () => {
        const result = await launchCamera('capture', setPreviewImgPath);

        setTextFromImage(null);

        try {
            if (!result?.assets) {
                return;
            }

            const { uri } = result.assets[0];
            const data = await TextRecognition.recognize(uri);

            setTextFromImage(data);
        } catch (error) {
            /** @todo: Weryfikacja błędów */
            console.log(error);
            return;
        }
    };
    return (
        <>
            {!previewImgPath ? (
                <BottomButtons takePic={takePic} />
            ) : (
                <ImagePreview
                    previewImgPath={previewImgPath}
                    setPreviewImgPath={setPreviewImgPath}
                    textFromImage={textFromImage}
                />
            )}
        </>
    );
}
