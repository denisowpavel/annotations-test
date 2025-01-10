export interface IAnnotation {
  id: number;
  documentID: number;
  view: IAnnotationView;
  content?: IAnnotationContent;
}
export interface IAnnotationView {
  top: number;
  left: number;
  color: string;
}
export interface IAnnotationContent {
  text?: string;
  imageData?: string;
}
