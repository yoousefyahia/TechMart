import React from "react";
import ReactDOM from "react-dom/client";
import "./index.sass";

import { RouterProvider, createBrowserRouter } from "react-router-dom";
import HomePage from "./components/pages/HomePage";
import "bootstrap/dist/css/bootstrap.min.css";
import { Provider } from "react-redux";
import { store } from './rtk/store';
import CartPage from "./components/pages/CartPage";
import AppLayout from "./components/layout/AppLayout";
import CheckoutPage from "./components/pages/CheckoutPage";
import ProductDetail from "./components/pages/ProductDetail";
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import ErrorBoundary from './components/ui/ErrorBoundary';

const queryClient = new QueryClient();

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <ErrorBoundary>
        <AppLayout />
      </ErrorBoundary>
    ),
    children: [
      {
        path: "",
        element: <HomePage />,
      },
      {
        path: "cart",
        element: <CartPage />,
      },
      {
        path: "checkout",
        element: <CheckoutPage />,
      },
      {
        path: "product/:id",
        element: <ProductDetail />,
      },
    ],
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
      </QueryClientProvider>
    </Provider>
  </React.StrictMode>
);


