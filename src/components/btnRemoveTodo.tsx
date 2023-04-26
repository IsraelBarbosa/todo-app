import { IoClose } from 'react-icons/io5';
import { useContext } from 'react';
import { TodoContext } from '../contexts/todoContext';
import { ThemeContext } from '../contexts/themeContext';

export const BtnRemoveTodo = ({ idTask }: { idTask: string }) => {
  const {
    state: { theme },
  } = useContext(ThemeContext);
  const { dispatch } = useContext(TodoContext);

  function removeTodo() {
    dispatch({
      type: 'REMOVE_TASK',
      // Apenas necessita do id da task para removela
      task: { completed: false, id: idTask, task: '' },
    });
  }

  return (
    <button className={`btn-remove-todo`} onClick={removeTodo}>
      <IoClose
        className={`btn-remove-todo__icon btn-remove-todo__icon--theme-${theme}`}
      />
    </button>
  );
};
