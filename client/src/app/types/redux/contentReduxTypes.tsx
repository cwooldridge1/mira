import { ContentProps } from '../';
interface InitialState {
  content: ContentProps[];
  activeContent: ContentProps | null;
}
const UpdateContentAction: string = 'CONTENT';

export default InitialState;
export { UpdateContentAction };
