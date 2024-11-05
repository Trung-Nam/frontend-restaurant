import React from 'react'
import { Link, Outlet } from 'react-router-dom'
import { MdOutlineSpaceDashboard, MdOutlineBorderColor, MdOutlinePostAdd, MdMenuBook } from "react-icons/md";
import { FaRegUser, FaUsers, FaShoppingBag, FaLocationArrow, FaQuestionCircle, FaHome } from "react-icons/fa";
import { BsCartCheckFill } from "react-icons/bs";
import logo from "/logo.png";
import useAdmin from "../hooks/useAdmin";
import useAuth from "../hooks/useAuth";
import Login from '../components/Login'

const sharedLinks = (
  <>
    <li className="mt-3">
      <Link to="/">
        <FaHome /> Home
      </Link>
    </li>
    <li>
      <Link to="/menu"><MdMenuBook /> Menu</Link>
    </li>
    <li>
      <Link to="/menu"><FaLocationArrow /> Orders Tracking</Link>
    </li>
    <li>
      <Link to="/menu"><FaQuestionCircle /> Customer Support</Link>
    </li>
  </>
);

const DashboardLayout = () => {
  const { loading } = useAuth()
  const [isAdmin, isAdminLoading] = useAdmin()
  return (
    <>
      {
        isAdmin ? (
          <div className="drawer lg:drawer-open" >
            <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
            <div className="drawer-content flex flex-col sm:items-center sm:justify-start py-4">
              {/* Page content here */}
              <div className="flex items-center justify-between mx-4">
                <label htmlFor="my-drawer-2" className="btn btn-primary drawer-button lg:hidden">
                  <MdOutlineSpaceDashboard />
                </label>

                <button className='btn rounded-full px-6 bg-primary text-white sm:hidden flex items-center gap-2'>
                  <FaRegUser />
                  Logout
                </button>
              </div>
              <div className='mt-5 md:mt-2 mx-4'>
                <Outlet />
              </div>
            </div>
            <div className="drawer-side">
              <label htmlFor="my-drawer-2" aria-label="close sidebar" className="drawer-overlay"></label>
              <ul className="menu bg-base-200 text-base-content min-h-full w-80 p-4">
                {/* Sidebar content here */}

                <li>
                  <Link to="/dashboard/admin">
                    <img src={logo} alt="logo" className='w-20' />
                    <div className="badge badge-primary badge-outline">admin</div>
                  </Link>
                </li>
                <li className="mt-3">
                  <Link to="/dashboard/admin">
                    <MdOutlineSpaceDashboard />
                    Dashboard
                  </Link>
                </li>
                <li>
                  <Link to="/dashboard/admin">
                    <BsCartCheckFill />
                    Manage Booking
                  </Link>
                </li>
                <li>
                  <Link to="/dashboard/add-menu">
                    <MdOutlinePostAdd />
                    Add Menu
                  </Link>
                </li>
                <li>
                  <Link to="/dashboard/manage-items">
                    <MdOutlineBorderColor />
                    Mange Items
                  </Link>
                </li>
                <li>
                  <Link to="/dashboard/users">
                    <FaUsers />
                    All Users
                  </Link>
                </li>

                <hr />


                {/* shared nav links */}
                {
                  sharedLinks
                }

              </ul>
            </div>
          </div>
        ) : (loading ? <Login /> : <div className="h-screen flex justify-center items-center"><Link to="/"><button className="btn bg-green text-white">Back to Home</button></Link></div>)
      }

    </>
  )
}

export default DashboardLayout