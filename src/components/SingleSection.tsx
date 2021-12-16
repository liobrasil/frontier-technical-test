import { Field, ErrorMessage, FormikErrors } from 'formik';
import s from './SingleSection.module.css';

interface Props {
  element: Frontier.Element;
  values: FormikErrors<Values>;
  setFieldValue: (field: string, value: any, shouldValidate?: boolean) => void;
}

function SingleSection({ element, values, setFieldValue }: Props): JSX.Element {
  function validate(value: string): string | undefined {
    let error;

    if (element.type === 'boolean') {
      if (value === '') {
        error = 'Required';
      }
      return error;
    }

    if (!value) {
      error = 'Required';
    }

    if (element.id === 'email') {
      if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)) {
        error = 'Invalid email address';
      }
    }

    if (element.type === 'text' && element.metadata.format === 'number') {
      if (!/\d+/.test(value)) {
        error = 'Only digits';
      }
    }

    return error;
  }

  return (
    <div className={s.section}>
      <label htmlFor={element.id}>{element.question_text}</label>
      {element.type === 'boolean' ? (
        <>
          <div className={s.btnContainer}>
            <button
              className={s.boolBtn}
              onClick={() => {
                setFieldValue(element.id, true, false);
              }}
            >
              Yes
            </button>
            <button
              className={s.boolBtn}
              onClick={() => {
                setFieldValue(element.id, false, false);
              }}
            >
              No
            </button>
          </div>
          <Field
            className={s.fieldBoolean}
            type="checkbox"
            id={element.id}
            name={element.id}
            value={true}
            validate={validate}
          />
        </>
      ) : element.type === 'multichoice' ? (
        <Field
          className={s.fieldMultichoice}
          component="select"
          id={element.id}
          name={element.id}
          multiple
          validate={validate}
        >
          {element.metadata.options!.map(element => (
            <option
              key={element.label}
              value={element.value}
              label={element.label}
            />
          ))}
        </Field>
      ) : (
        <Field
          className={s.field}
          as={element.type === 'textarea' ? 'textarea' : 'input'}
          type={element.id === 'email' ? 'email' : 'text'}
          name={element.id}
          placeholder={element.metadata.placeholder}
          validate={validate}
        />
      )}

      <ErrorMessage
        className={s.errorMessage}
        name={element.id}
        component="div"
      />
    </div>
  );
}

export default SingleSection;
