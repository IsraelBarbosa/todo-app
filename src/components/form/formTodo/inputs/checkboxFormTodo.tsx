import { useField } from 'formik';
import { Icheckbox } from '../../../../ts/types/interfaces/form/IinputCheckbox';
import { forwardRef, useRef, useImperativeHandle, useState } from 'react';
import { BiCheck } from 'react-icons/bi';
import { useContext } from 'react';
import { ThemeContext } from '../../../../contexts/themeContext';

type TcheckboxProps = Icheckbox & { checkboxCustomValue: boolean };

export interface IcheckboxHandle {
  setCheckboxChecked: (setChecked: boolean) => void;
  inputCheckbox: () => boolean;
}

export const CheckboxFormTodo = forwardRef<IcheckboxHandle, TcheckboxProps>(
  ({ checkboxCustomValue, ...props }, ref) => {
    const { state: {theme} } = useContext(ThemeContext);

    const [checkboxValue, setCheckboxValue] =
      useState<boolean>(checkboxCustomValue);
    const checkboxRef = useRef<HTMLInputElement>(null);

    const [field, meta] = useField(props);

    function setCheckboxChecked(setChecked: boolean) {
      setCheckboxValue(setChecked);
    }

    function inputCheckbox() {
      return checkboxRef.current?.checked!;
    }

    useImperativeHandle(
      ref,
      () => {
        return {
          setCheckboxChecked,
          inputCheckbox,
          // toggleDisplayCheckboxIcon,
        };
      },
      []
    );

    return (
      <div className="form-container-checkbox">
        <div
          className={`form-checkbox-custom form-checkbox-custom--theme-${theme} ${
            checkboxValue ? 'form-checkbox-custom--checked' : ''
          }`}
        >
          <BiCheck
            className={`form-checkbox-custom__icon ${
              checkboxValue ? 'form-checkbox-custom__icon--display' : ''
            }`}
          />
        </div>
        {/* <label htmlFor={props.id || props.name}> */}
        <input
          className="form__checkbox"
          ref={checkboxRef}
          onClick={(e: React.MouseEvent<HTMLInputElement>) =>
            setCheckboxValue((e.target as HTMLInputElement).checked)
          }
          {...field}
          {...props}
        />
        {/* </label> */}
        {meta.touched && meta.error ? (
          <div className="form__checkbox__error">{meta.error}</div>
        ) : null}
      </div>
    );
  }
);
