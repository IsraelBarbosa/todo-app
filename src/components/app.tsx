import { ThemeProvider } from "react-bootstrap"
import { TodoProvider } from "../contexts/todoContext";
import { Todo } from "./todo"

export const App = () => {
  return (
    <ThemeProvider>
      <TodoProvider>
        <Todo />
      </TodoProvider>
    </ThemeProvider>
  );
}