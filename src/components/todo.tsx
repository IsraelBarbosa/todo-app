import { useContext, useState, useEffect } from 'react';
import { Container } from 'react-bootstrap';
import { ThemeContext } from '../contexts/themeContext';
import { TodoContext } from '../contexts/todoContext';
import '../sass/main.scss';
import { ContainerTodoList } from './containerTodoList';
import { FormAddNewTodo } from './form/formAddNewTodo/formAddNewTodo';

import { Header } from './header';

export const Todo = () => {
  const { state } = useContext(TodoContext);
  const {
    state: { theme },
  } = useContext(ThemeContext);
  const [todoList, setTodoList] = useState(state);

  useEffect(() => {
    setTodoList(state);
  }, [state]);

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
