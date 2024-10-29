import { Outlet } from "react-router-dom"

const Main = () => {
  return (
    <div>
        <nav>Nav bar</nav>
        <Outlet/>
        <footer>Footer</footer>
    </div>
  )
}

export default Main