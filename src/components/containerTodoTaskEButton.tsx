import { IcomponentProps } from '../ts/types/interfaces/IcomponentProps';

import { useContext } from 'react';
import { ThemeContext } from '../contexts/themeContext';

export const ContainerTodoTaskEButton = ({
  children,
  provided,
  snapshot,
}: IcomponentProps & { provided?: any; snapshot?: any }) => {
  const {
    state: { theme },
  } = useContext(ThemeContext);

  if (provided) {
    return (
      <div
        className={`containerTodoTaskEButton containerTodoTaskEButton--theme-${theme}`}
        ref={provided.innerRef}
        snapshot={snapshot}
        {...provided.draggableProps}
        {...provided.dragHandleProps}
      >
        {children}
      </div>
    );
  } else {
    return (
      <div
        className={`containerTodoTaskEButton containerTodoTaskEButton--theme-${theme}`}
      >
        {children}
      </div>
    );
  }
};
