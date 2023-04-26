import { useContext, useEffect, useState } from 'react';
import { ThemeContext } from '../contexts/themeContext';
import { TodoContext } from '../contexts/todoContext';
import { ItodoTask } from '../ts/types/interfaces/ItodoTask';
import { FormTodo } from './form/formTodo/formTodo';
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';

export const ContainerTodoList = ({ todoList }: { todoList: ItodoTask[] }) => {
  const {
    state: { theme },
  } = useContext(ThemeContext);
  const { dispatch } = useContext(TodoContext);
  const [todoListState, setTodoListState] = useState<ItodoTask[]>(todoList);
  const [userActionsBtnActionActive, setUserActionsBtnActionActive] = useState({
    allBtnActive: true,
    activeBtnActive: false,
    completedBtnActive: false,
  });

  useEffect(() => {
    setTodoListState(todoList);
    setUserActionsBtnActionActive({
      allBtnActive: true,
      activeBtnActive: false,
      completedBtnActive: false,
    });
  }, [todoList]);

  function getAllTodo() {
    setTodoListState(todoList);
    setUserActionsBtnActionActive({
      allBtnActive: true,
      activeBtnActive: false,
      completedBtnActive: false,
    });
  }

  function getActiveTodo() {
    setTodoListState(todoList.filter((todo: ItodoTask) => !todo.completed));
    setUserActionsBtnActionActive({
      allBtnActive: false,
      activeBtnActive: true,
      completedBtnActive: false,
    });
  }

  function getCompletedTodo() {
    setTodoListState(todoList.filter((todo: ItodoTask) => todo.completed));
    setUserActionsBtnActionActive({
      allBtnActive: false,
      activeBtnActive: false,
      completedBtnActive: true,
    });
  }

  function leftTodoLength() {
    const leftTodoLength = todoList.filter(
      (todo: ItodoTask) => !todo.completed
    ).length;

    return leftTodoLength;
  }

  function removeAllTasksCompleted() {
    dispatch({
      type: 'REMOVE_ALL_TASKS_COMPLETED',
      task: { completed: false, id: '', task: '' },
    });
  }

  function onDragEnd(result: any) {
    const newItems = Array.from(todoListState);
    const [removed] = newItems.splice(result.source.index, 1);
    newItems.splice(result.destination.index, 0, removed);
    dispatch({
      type: 'UPDATE_ORDER_TASK',
      task: { completed: false, id: 'asda', task: 'das' },
      tasks: newItems,
    });
    // setTodoListState(newItems);
  }

  return (
    <>
      <DragDropContext onDragEnd={(result) => onDragEnd(result)}>
        <div
          className={`container-todo-list container-todo-list--theme-${theme}`}
        >
          <Droppable
            droppableId="droppable"
            renderClone={(provided, snapshot, rubric) => (
              <div
                {...provided.draggableProps}
                {...provided.dragHandleProps}
                ref={provided.innerRef}
              >
                <div
                  // style={{
                  //   width: '100%',
                  //   height: '100%',
                  //   backgroundColor: `${
                  //     theme === Theme.Dark
                  //       ? 'hsl(235, 19%, 35%)'
                  //       : 'hsl(234, 11%, 52%)'
                  //   }`,
                  // }}
                  className={`containerTodoTaskEButton containerTodoTaskEButton--theme-${theme}`}
                >
                  Movendo item
                </div>
              </div>
            )}
          >
            {(provided) => (
              <div ref={provided.innerRef} {...provided.droppableProps}>
                {todoListState.map((task: ItodoTask, i) => {
                  return (
                    <Draggable key={task.id} draggableId={task.id} index={i}>
                      {(provided, snapshot) => (
                        <FormTodo
                          key={task.id}
                          textInputValue={task.task}
                          checkboxValue={task.completed}
                          idTask={task.id}
                          provided={provided}
                          snapshot={snapshot}
                        />
                      )}
                    </Draggable>
                  );
                })}
                {provided.placeholder}
              </div>
            )}
          </Droppable>

          <div className="container-todo-list__container-btns">
            <button
              className={`container-todo-list__container-btns__btn 
            container-todo-list__container-btns__btn--theme-${theme}`}
            >
              {`${leftTodoLength()} items a serem feitos`}
            </button>
            <button
              className={`container-todo-list__container-btns__btn 
            container-todo-list__container-btns__btn--theme-${theme}`}
              onClick={() => removeAllTasksCompleted()}
            >
              Apagar completados
            </button>
          </div>
        </div>

        <div className={`user-actions user-actions--theme-${theme}`}>
          <div className="user-actions__container">
            <button
              className={`user-actions__container__btn 
            user-actions__container__btn--theme-${theme} ${
                userActionsBtnActionActive.allBtnActive
                  ? `user-actions__container__btn-theme-${theme}--active`
                  : ``
              }`}
              onClick={() => getAllTodo()}
            >
              All
            </button>
            <button
              className={`user-actions__container__btn 
            user-actions__container__btn--theme-${theme} ${
                userActionsBtnActionActive.activeBtnActive
                  ? `user-actions__container__btn-theme-${theme}--active`
                  : ``
              }`}
              onClick={() => getActiveTodo()}
            >
              Active
            </button>
            <button
              className={`user-actions__container__btn 
            user-actions__container__btn--theme-${theme} ${
                userActionsBtnActionActive.completedBtnActive
                  ? `user-actions__container__btn-theme-${theme}--active`
                  : ``
              }`}
              onClick={() => getCompletedTodo()}
            >
              Completed
            </button>
          </div>
        </div>
      </DragDropContext>
    </>
  );
};
