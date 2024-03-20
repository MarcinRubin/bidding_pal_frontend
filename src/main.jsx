import React from 'react'
import ReactDOM from 'react-dom/client'
// import './index.css'
import { ChakraProvider } from '@chakra-ui/react'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Root from './routes/Root';
import ErrorPage from './ErrorPage';
import Homework , {loader as homeworkLoader} from './routes/Homework';
import HomeworkDeal, {
  loader as dealLoader,
} from './routes/HomeworkDeal';
import NextBidQuiz, {loader as quizLoader} from './routes/NextBidQuiz';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "homework/",
        element: <Homework />,
        loader: homeworkLoader
      },
      {
        path: "homework/:dealId",
        element: <HomeworkDeal />,
        loader: dealLoader
      },
      {
        path: "bid_quiz/",
        element: <NextBidQuiz />,
        loader: quizLoader
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
