import { createSelector } from 'reselect';
import { useContext } from 'react';
import { TodoContext } from '../contexts/todoContext';
import { ItodoTask } from '../ts/types/interfaces/ItodoTask';

const allTodo = (state: ItodoTask[]) => state;
const activeTodo = (state: ItodoTask[]) =>
  state.filter((todo: ItodoTask) => !todo.completed);
const completedTodo = (state: ItodoTask[]) =>
  state.filter((todo: ItodoTask) => todo.completed);

export const selectAllTodo = createSelector(allTodo, (tasks: ItodoTask[]) => tasks);

export const selectActiveTodo = createSelector(
  activeTodo,
  (tasks: ItodoTask[]) => tasks
);

export const selectCompletedTodo = createSelector(
  completedTodo,
  (tasks: ItodoTask[]) => tasks
);
