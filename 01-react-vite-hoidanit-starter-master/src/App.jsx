import Header from "./components/layout/header"
import Footer from "./components/layout/footer"
import { Outlet } from "react-router-dom"

// component = html + css + js


const App = () => {
  return (
    <>
      <Header />
      <Outlet />
      <Footer />
    </>

  )
}

export default App
