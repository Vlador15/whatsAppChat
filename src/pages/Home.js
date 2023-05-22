import classes from '../components/home/home.module.scss';
import { FormParams } from '../components/home/formParams';

export const Home = () => {
  return (
    <div className={classes.container}>
      <div className={classes.block}>
        <h1 className={classes.title}>Тестовое задание</h1>

        <FormParams />
      </div>
    </div>
  );
};
