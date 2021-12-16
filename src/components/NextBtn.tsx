import s from './NextBtn.module.css';
import { FormikErrors } from 'formik';

interface Props {
  setFormNav: React.Dispatch<React.SetStateAction<number>>;
  isValid: boolean;
  values: FormikErrors<Values>;
  completed: FormikErrors<Values>[];
  setCompleted: React.Dispatch<React.SetStateAction<FormikErrors<Values>[]>>;
}

interface Values {
  [id: string]: string;
}

function NextBtn({
  setFormNav,
  completed,
  setCompleted,
  isValid,
  values,
}: Props): JSX.Element {
  return (
    <button
      className={s.nextBtn}
      onClick={e => {
        e.preventDefault();
        if (isValid && Object.values(values)[0] !== '') {
          const tab = [...completed];
          tab.push(values);
          setCompleted(tab);
          setFormNav(prev => prev + 1);
        }
      }}
    >
      Next
    </button>
  );
}

export default NextBtn;
