import { useState } from 'react';
import formInstructions from '../data/form_instructions.json';
import Header from './Header';
import Footer from './Footer';
import s from './App.module.css';
import FormComponent from './FormComponent';
import { FormikErrors } from 'formik';

function App(): JSX.Element {
  const job = formInstructions as Frontier.Job;
  const [completed, setCompleted] = useState<Array<FormikErrors<Values>>>([]);
  const [formNav, setFormNav] = useState<number>(0);

  // Check your console to see the full instructions!
  console.log(job);

  //Check the array of user's response
  console.log('Response', completed);

  const FormJSXElement = job.sections.map((section, index, array) => {
    return (
      <FormComponent
        key={section.id}
        section={section}
        index={index}
        total={array.length - 1}
        formNav={formNav}
        setFormNav={setFormNav}
        completed={completed}
        setCompleted={setCompleted}
      />
    );
  });

  return (
    <div className={s.App}>
      <Header />
      <div className={s.body}>{FormJSXElement[formNav]}</div>
      <Footer />
    </div>
  );
}

export default App;
