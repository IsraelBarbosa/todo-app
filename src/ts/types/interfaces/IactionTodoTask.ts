import { ItodoTask } from "./ItodoTask";

export interface IactionTodoTask {
  type:
    | 'ADD_NEW_TASK'
    | 'UPDATE_TASK'
    | 'UPDATE_ORDER_TASK'
    | 'REMOVE_TASK'
    | 'REMOVE_ALL_TASKS_COMPLETED';
  idTask?: string;
  task: ItodoTask;
  tasks?: ItodoTask[];
}
