import { useContext, useState, useEffect } from 'react';
import { Container } from 'react-bootstrap';
import { ThemeContext } from '../contexts/themeContext';
import { TodoContext } from '../contexts/todoContext';
import '../sass/main.scss';
import { ItodoTask } from '../ts/types/interfaces/ItodoTask';
import { ContainerTodoList } from './containerTodoList';
import { FormAddNewTodo } from './form/formAddNewTodo/formAddNewTodo';

import { Header } from './header';

export const Todo = () => {
  const { state } = useContext(TodoContext);
  const {
    state: { theme },
    dispatch,
  } = useContext(ThemeContext);
  const [todoList, setTodoList] = useState(state);

  useEffect(() => {
    setTodoList(state);
  }, [state]);

  const allTodo = () => {
    setTodoList(state);
  };

  const activeTodo = () => {
    const activeTodo = state.filter((todo: ItodoTask) => !todo.completed);
    setTodoList(activeTodo);
  };

  const completedTodo = (state: ItodoTask[]) => {
    const completedTodo = state.filter((todo: ItodoTask) => todo.completed);
    setTodoList(completedTodo);
  };

  return (
    <div className={`app app--theme-${theme}`}>
      <Header />
      <Container>
        <div className="container-form-add-new-todo-container-todo-list">
          <FormAddNewTodo />
          <ContainerTodoList todoList={state} />
        </div>
      </Container>
    </div>
  );
};
