import React from "react";
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import ErrorPage from "./pages/Error";
import Home from "./pages/Home";
import Thread from "./pages/Thread";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home/>,
    errorElement: <ErrorPage />
  },
  {
    path: "/thread",
    element: <Thread/>,
  },
]);

function App() {
  React.useEffect(() => {
    (window as any)?.ethereum?.on("accountsChanged", function () {
      // Time to reload your interface with accounts[0]!
      localStorage.clear();
      window.location.reload();
    });
  }, []);
  return (
    <RouterProvider router={router} />
  )
}

export default App;
