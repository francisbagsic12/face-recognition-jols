import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "bootstrap/dist/css/bootstrap.min.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import NotFound from "./components/404/NotFound.jsx";

const router = createBrowserRouter([
  { path: "/", element: <App /> },

  { path: "*", element: <NotFound /> },
]);
createRoot(document.getElementById("root")).render(<App />);
