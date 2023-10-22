import { RouterProvider } from "react-router-dom";
import "react-lazy-load-image-component/src/effects/blur.css";

import router from "./router";
import ContextProvider from "./context";

export default function App() {
  return (
    <ContextProvider>
      <RouterProvider router={router} />
    </ContextProvider>
  );
}
