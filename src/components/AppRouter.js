import { Route, Routes } from 'react-router-dom';
import { privateRoutes, publicRoutes } from './../routes';

const AppRouter = () => {
  const isAuth = true;

  return (
    <Routes>
      {isAuth &&
        privateRoutes.map(({ path, Component }) => (
          <Route key={path} path={path} element={<Component />} />
        ))}

      {publicRoutes.map(({ path, Component }) => (
        <Route key={path} path={path} element={<Component />} />
      ))}
    </Routes>
  );
};

export default AppRouter;
