import { useField } from 'formik';
import { ItextInput } from '../../../ts/types/interfaces/form/IinputText';
import { forwardRef, ForwardedRef, useContext } from 'react';
import { ThemeContext } from '../../../contexts/themeContext';

export const TextInput = forwardRef(
  ({ ...props }: ItextInput, ref: ForwardedRef<HTMLInputElement>) => {
    const {
      state: { theme },
    } = useContext(ThemeContext);

    const [field, meta] = useField(props);

    return (
      <div className='container-input-e-error'>
        {/* <label htmlFor={props.id || props.name}>{props.label}</label> */}
        <input
          className={`form__text-input form__text-input--theme-${theme}`}
          ref={ref}
          {...field}
          {...props}
        />
        {meta.touched && meta.error ? (
          <div className="form__text-input__error">{meta.error}</div>
        ) : null}
      </div>
    );
  }
);
