import { Formik, Form } from 'formik';
import { useContext, useRef } from 'react';
import * as Yup from 'yup';
import { TodoContext } from '../../../contexts/todoContext';
import { ContainerTodoTask } from '../../containerTodoTask';
import { ContainerTodoTaskEButton } from '../../containerTodoTaskEButton';
import { Checkbox, IcheckboxHandle } from '../inputs/checkbox';
import { TextInput } from '../inputs/inputText';
import { v4 as uuidv4 } from 'uuid';

export const FormAddNewTodo = () => {
  const { state, dispatch } = useContext(TodoContext);

  const textInputAddNewTodoRef = useRef<HTMLInputElement>(null);
  const checkboxInputAddNewTodoRef = useRef<IcheckboxHandle>(null);

  return (
    <>
      <Formik
        initialValues={{
          inputAddNewTodo: '',
          checkboxAddNewTodo: false,
        }}
        validationSchema={Yup.object({
          inputAddNewTodo: Yup.string()
            .max(50, '50 caracteres ou menos')
            .required('Obrigatório'),
          checkboxAddNewTodo: Yup.boolean(),
        })}
        onSubmit={(values, { setSubmitting, resetForm }) => {
          setTimeout(() => {
            console.log(JSON.stringify(values, null, 2));
            setSubmitting(false);
            dispatch({
              type: 'ADD_NEW_TASK',
              task: {
                id: uuidv4(),
                task: textInputAddNewTodoRef.current?.value!,
                completed: checkboxInputAddNewTodoRef.current?.inputCheckbox()!,
              },
            });
            textInputAddNewTodoRef.current?.blur();
            checkboxInputAddNewTodoRef.current?.setCheckboxChecked(false);
            resetForm();
          }, 400);
        }}
      >
        <ContainerTodoTaskEButton>
          <ContainerTodoTask>
            <Form className="form">
              <Checkbox
                type={'checkbox'}
                id={'checkboxAddNewTodo'}
                name={'checkboxAddNewTodo'}
                ref={checkboxInputAddNewTodoRef}
              />

              <TextInput
                type={'text'}
                id={'inputAddNewTodo'}
                name={'inputAddNewTodo'}
                placeholder={'Criar nova tarefa...'}
                ref={textInputAddNewTodoRef}
              />
            </Form>
          </ContainerTodoTask>
        </ContainerTodoTaskEButton>
      </Formik>
    </>
  );
};
