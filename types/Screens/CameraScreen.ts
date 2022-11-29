declare type BoundingFrame = {
  x: number;
  y: number;
  width: number;
  height: number;
  boundingCenterX: number;
  boundingCenterY: number;
};
declare type Point = {
  x: number;
  y: number;
};
declare type TextElement = {
  text: string;
  frame: BoundingFrame;
  cornerPoints: Point[];
};
declare type TextLine = {
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
declare type Text = {
  text: string;
  blocks: TextBlock[];
};
