export type BoundingFrame = {
  x: number;
  y: number;
  width: number;
  height: number;
  boundingCenterX: number;
  boundingCenterY: number;
};
export type Point = {
  x: number;
  y: number;
};
export type TextElement = {
  text: string;
  frame: BoundingFrame;
  cornerPoints: Point[];
};
export type TextLine = {
  text: string;
  elements: TextElement[];
  frame: BoundingFrame;
  recognizedLanguages: string[];
  cornerPoints: Point[];
};

export type TextBlock = {
  text: string;
  lines: TextLine[];
  frame: BoundingFrame;
  recognizedLanguages: string[];
  cornerPoints: Point[];
};
export type Text = {
  text: string;
  blocks: TextBlock[];
};
