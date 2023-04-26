import { IcomponentProps } from '../ts/types/interfaces/IcomponentProps';

export const ContainerTodoTask = ({ children }: IcomponentProps) => {
  return <div className="containerTodoTask">{children}</div>;
};
