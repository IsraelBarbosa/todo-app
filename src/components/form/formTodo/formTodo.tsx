import { Formik, Form, FormikValues, FormikBag } from 'formik';
import * as Yup from 'yup';
import { ContainerTodoTask } from '../../containerTodoTask';
import { CheckboxFormTodo, IcheckboxHandle } from './inputs/checkboxFormTodo';
import { TextInput } from '../inputs/inputText';
import { useContext, useRef } from 'react';
import { TodoContext } from '../../../contexts/todoContext';
import { v4 as uuidv4 } from 'uuid';
import { ContainerTodoTaskEButton } from '../../containerTodoTaskEButton';
import { BtnRemoveTodo } from '../../btnRemoveTodo';
import { DraggableProvided, DraggableStateSnapshot } from 'react-beautiful-dnd';

export const FormTodo = ({
  textInputValue,
  checkboxValue,
  idTask,
  provided,
  snapshot,
}: {
  textInputValue: string;
  checkboxValue: boolean;
  idTask: string;
  provided: DraggableProvided;
  snapshot: DraggableStateSnapshot;
}) => {
  const { state, dispatch } = useContext(TodoContext);

  const textInputRef = useRef<HTMLInputElement>(null);
  const checkboxInputRef = useRef<IcheckboxHandle>(null);

  function submitForm(
    values: FormikValues,
    { setSubmitting }: { [key: string]: any }
  ) {
    setTimeout(() => {
      setSubmitting(false);

      dispatch({
        type: 'UPDATE_TASK',
        idTask: idTask,
        task: {
          id: uuidv4(),
          task: textInputRef.current?.value!,
          completed: checkboxInputRef.current?.inputCheckbox()!,
        },
      });
      checkboxInputRef.current?.setCheckboxChecked(false);
    }, 400);
  }

  return (
    <>
      <Formik
        initialValues={{
          inputTodo: textInputValue,
          checkboxTodo: checkboxValue,
        }}
        validationSchema={Yup.object({
          inputTodo: Yup.string()
            .max(50, '50 caracteres ou menos')
            .required('Obrigatório'),
          checkboxTodo: Yup.boolean(),
        })}
        onSubmit={submitForm}
      >
        <ContainerTodoTaskEButton snapshot={snapshot} provided={provided}>
          <ContainerTodoTask>
            <Form className="form">
              <CheckboxFormTodo
                type={'checkbox'}
                id={'checkboxTodo'}
                name={'checkboxTodo'}
                ref={checkboxInputRef}
                checkboxCustomValue={checkboxValue}
              />
              <TextInput
                type={'text'}
                id={'inputTodo'}
                name={'inputTodo'}
                placeholder={'Criar nova tarefa...'}
                ref={textInputRef}
              />
            </Form>
          </ContainerTodoTask>

          <BtnRemoveTodo idTask={idTask} />
        </ContainerTodoTaskEButton>
      </Formik>
    </>
  );
};
