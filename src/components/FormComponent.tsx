import React from 'react';
import s from './FormComponent.module.css';
import SingleSection from './SingleSection';
import { Formik, FormikHelpers, Form, FormikErrors } from 'formik';
import NextBtn from './NextBtn';

interface Props {
  section: Frontier.Section;
  formNav: number;
  setFormNav: React.Dispatch<React.SetStateAction<number>>;
  index: number;
  total: number;
  completed: FormikErrors<Values>[];
  setCompleted: React.Dispatch<React.SetStateAction<FormikErrors<Values>[]>>;
}

function FormComponent({
  section,
  formNav,
  setFormNav,
  index,
  total,
  completed,
  setCompleted,
}: Props): JSX.Element {
  let initialVal: FormikErrors<Values> = {};
  section.content.forEach(content => {
    const key = content.id;
    initialVal[key] = '';
  });

  return (
    <div className={s.formInterface}>
      <div className={s.step}>
        <p className={s.stepText}>
          Step of {index + 1} of {total + 1}
        </p>
      </div>

      <Formik
        initialValues={initialVal}
        onSubmit={(
          values: FormikErrors<Values>,
          { setSubmitting }: FormikHelpers<FormikErrors<Values>>,
        ) => {
          if (formNav === total) {
            const tab = [...completed];
            tab.push(values);
            setCompleted(tab);
            setSubmitting(true);
          }
        }}
      >
        {({ isSubmitting, isValid, values, setFieldValue }) => (
          <Form className={s.form}>
            <div className={s.formFrame}>
              <h1 className={s.formTitle}>{section.title}</h1>
              {section.content.map(element => {
                return (
                  <SingleSection
                    key={element.id}
                    element={element}
                    values={values}
                    setFieldValue={setFieldValue}
                  />
                );
              })}
            </div>

            {formNav !== 0 ? (
              <button
                className={s.submitBtn}
                type="submit"
                style={{ backgroundColor: isSubmitting ? 'gray' : '#3ebf62' }}
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Submitted' : 'Submit'}
              </button>
            ) : (
              <NextBtn
                setFormNav={setFormNav}
                isValid={isValid}
                values={values}
                setCompleted={setCompleted}
                completed={completed}
              />
            )}
          </Form>
        )}
      </Formik>
    </div>
  );
}

export default FormComponent;
