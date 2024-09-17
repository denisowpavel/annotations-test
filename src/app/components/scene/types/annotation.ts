export interface IAnnotation {
  id: number;
  view: IAnnotationView;
  content?: IAnnotationContent;
}
export interface IAnnotationView {
  top: number;
  left: number;
  color: string;
}
export interface IAnnotationContent {}
