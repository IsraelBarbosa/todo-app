import { IactionTodoTask } from '../ts/types/interfaces/IactionTodoTask';
import { ItodoTask } from '../ts/types/interfaces/ItodoTask';
import { v4 as uuidv4 } from 'uuid';
import { useReducer } from 'react';

const todoListInitialState: ItodoTask[] = [
  {
    id: uuidv4(),
    completed: false,
    task: 'Ir ao mercado',
  },
];

function todoReducer(state: ItodoTask[], action: IactionTodoTask) {
  switch (action.type) {
    case 'ADD_NEW_TASK': {
      return [...state, { ...action.task }];
    }

    case 'UPDATE_TASK': {
      return state.map((todo: ItodoTask) => {
        if (todo.id === action.idTask) {
          return action.task;
        } else {
          return todo;
        }
      });
    }

    case 'UPDATE_ORDER_TASK': {
      if (action.tasks) {
        return [...action.tasks];
      }
      throw new Error('action.tasks esta vazio');
    }

    case 'REMOVE_TASK': {
      return state.filter((todo: ItodoTask) => {
        return todo.id !== action!.task!.id;
      });
    }

    case 'REMOVE_ALL_TASKS_COMPLETED': {
      return state.filter((todo: ItodoTask) => {
        return !todo.completed;
      });
    }

    default:
      throw new Error();
  }
}

export const useTodoReducer = () => {
  const [state, dispatch] = useReducer(todoReducer, todoListInitialState);

  return { state, dispatch };
};
