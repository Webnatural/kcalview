import {Dispatch} from 'react';

export type Props = {
  takePic: () => Promise<void>;
  previewImage?: string | null;
  setPreviewImage: Dispatch<React.SetStateAction<string | null>>;
};
