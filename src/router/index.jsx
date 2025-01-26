import * as React from "react";

import { createBrowserRouter, redirect } from "react-router-dom";

import BaseLayout from "../views/BaseLayout";
import RegisterPage from "../views/Register";
import LoginPage from "../views/LoginPage";
import HomePage from "../views/HomePage";
import TopUpPage from "../views/TopUpPage";
import PaymentPage from "../views/PaymentPage";
import TransactionPage from "../views/Transaction";
import AkunPage from "../views/AkunPage";

const router = createBrowserRouter([
  {
    element: <BaseLayout />,
    loader: () => {
      if (!sessionStorage.getItem("token")) {
        return redirect("/login");
      }
      return null;
    },
    children: [
      {
        path: "/",
        element: <HomePage />,
      },
      {
        path: "/TopUp",
        element: <TopUpPage />,
      },
      {
        path: "/transaction",
        element: <TransactionPage />,
      },
      {
        path: "/Akun",
        element: <AkunPage />,
      },
      {
        path: "/payment/:slug",
        element: <PaymentPage />,
      },
    ],
  },
  {
    path: "/registration",
    element: <RegisterPage />,
  },
  {
    path: "/login",
    element: <LoginPage />,
  },
]);

export default router;
