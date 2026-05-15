import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { RouterProvider } from "react-router-dom";
import router from "./Routers/Router.jsx";
import FirebaseAuthProvider from "./firebase/FirebaseAuthProvider.jsx";
import { Toaster } from "react-hot-toast";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <FirebaseAuthProvider>
      <QueryClientProvider client={queryClient}>
        <Toaster position="top-right" reverseOrder={false} />
        <RouterProvider router={router}></RouterProvider>
      </QueryClientProvider>
    </FirebaseAuthProvider>
  </StrictMode>
);
