import React from 'react'
import ReactDOM from 'react-dom/client'
// import './index.css'
import { ChakraProvider } from '@chakra-ui/react'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Root from './routes/root';
import ErrorPage from './ErrorPage';
import Homework from './routes/Homework';
import HomeworkDeal, {
  loader as dealLoader,
} from './routes/HomeworkDeal';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "homework/",
        element: <Homework />,
      },
      {
        path: "homework/:dealId",
        element: <HomeworkDeal />,
        loader: dealLoader
      }
    ],
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ChakraProvider>
      <RouterProvider router={router} />
    </ChakraProvider>
  </React.StrictMode>,
)
