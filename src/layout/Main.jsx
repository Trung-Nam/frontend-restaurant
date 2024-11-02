import { Outlet } from "react-router-dom"
import Navbar from "../components/Navbar"
import "../App.css"
import Footer from "../components/Footer"
import { useContext } from "react"
import { AuthContext } from "../contexts/AuthProvider"
import Loading from "../components/Loading"
const Main = () => {
  const { loading } = useContext(AuthContext);

  return (
    <div className="bg-primary-background">
      {
        loading ?
          <Loading />
          :
          <>
            <Navbar />
            <Outlet />
            <Footer />
          </>
      }
    </div>
  )
}

export default Main