import { createContext, Dispatch } from 'react';
import { IactionTodoTask } from '../ts/types/interfaces/IactionTodoTask';
import { ItodoTask } from '../ts/types/interfaces/ItodoTask';
import { IcomponentProps } from '../ts/types/interfaces/IcomponentProps';
import { useTodoReducer } from '../reducers/todoReducer';

export const TodoContext = createContext<{
  state: ItodoTask[];
  dispatch: Dispatch<IactionTodoTask>;
}>({
  state: [{ completed: false, id: '', task: '' }],
  dispatch: () => null,
});

export const TodoProvider = ({ children }: IcomponentProps) => {
  const { state, dispatch } = useTodoReducer();

  return (
    <>
      <TodoContext.Provider value={{ state, dispatch }}>
        {children}
      </TodoContext.Provider>
    </>
  );
};
