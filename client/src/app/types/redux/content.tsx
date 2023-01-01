import { ComponentType } from 'react';

export interface Content {
  type: string;
  props: object;
}
interface InitialState {
  content: Content[];
}
const UpdateContentAction: string = 'CONTENT';

export default InitialState;
export { UpdateContentAction };
