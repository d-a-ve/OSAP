import React from "react"
import Home from "./pages/Home"
import Landing from "./pages/landing"

function App() {
  React.useEffect(() => {
    ;(window as any)?.ethereum?.on(
      "accountsChanged",
      function () {
        // Time to reload your interface with accounts[0]!
        localStorage.clear()
        window.location.reload()
      }
    )
  }, [])
  return (
    <>
      {/* <Home /> */}
      <Landing />
    </>
  )
}

export default App
