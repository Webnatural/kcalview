import React, { useState } from 'react';
import ImagePicker from 'react-native-image-picker';

import TextRecognition, {
    TextRecognitionResult,
} from '@react-native-ml-kit/text-recognition';

import BottomButtons from './components/BottomButtons';
import ImagePreview from './components/ImagePreview';

export default function CameraScreen() {
    const [previewImgPath, setPreviewImgPath] = useState<string | null>(null);
    const [textFromImage, setTextFromImage] = useState<TextRecognitionResult | null>(null);

    const takePic = async () => {
        const result = await ImagePicker.launchCamera('capture', setPreviewImgPath);
        try {
            if (!result) {
                return
            };
            const data = await TextRecognition.recognize(result.assets[0].uri);

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

                <BottomButtons takePic={takePic} previewImgPath={previewImgPath} />

            ) : (

                <ImagePreview
                    previewImgPath={previewImgPath}
                    setPreviewImgPath={setPreviewImgPath}
                    textFromImage={textFromImage}
                />
            )}

        </>
    )
}