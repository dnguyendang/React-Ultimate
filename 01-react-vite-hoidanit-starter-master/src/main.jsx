import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom"
import RegisterPage from './pages/register.jsx';
import UserPage from './pages/user.jsx';
import LoginPage from './pages/login.jsx';
import BookPage from './pages/book.jsx';
import './styles/global.css'
import TodoApp from './components/todo/TodoApp.jsx';
import ErrorPage from './pages/error.jsx';

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <TodoApp />
      },
      {
        path: "/users",
        element: <UserPage />
      },
      {
        path: "/books",
        element: <BookPage />
      },
    ]
  },
  {
    path: "/register",
    element: <RegisterPage />
  },
  {
    path: "/login",
    element: <LoginPage />
  },

]);

ReactDOM.createRoot(document.getElementById('root')).render(
  // <React.StrictMode>
  <RouterProvider router={router} />
  // </React.StrictMode>,
)

