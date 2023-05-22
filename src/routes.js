import { Chat } from './pages/Chat';
import { Home } from './pages/Home';
import { Error } from './pages/Error';

export const privateRoutes = [
  {
    path: '/chat',
    Component: Chat,
  },
];

export const publicRoutes = [
  {
    path: '/',
    Component: Home,
  },
  {
    path: '*',
    Component: Error,
  },
];
