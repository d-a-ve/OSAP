import React from "react";
import Home from "./pages/Home";

function App() {
  React.useEffect(() => {
    (window as any)?.ethereum?.on("accountsChanged", function () {
      // Time to reload your interface with accounts[0]!
      localStorage.clear();
      window.location.reload();
    });
  }, []);
  return (
    <Home />
  )
}

export default App;
