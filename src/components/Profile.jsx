import React, { useContext } from 'react'
import { AuthContext } from '../contexts/AuthProvider';
import { Link } from 'react-router-dom';
const Profile = ({ user }) => {
  const { logout } = useContext(AuthContext);

  const handleLogout = () => {
    logout();
  }
  return (
    <div className="dropdown dropdown-end">
      <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
        <div className="w-10 rounded-full">
          <img
            alt="Profile Image"
            src={user.photoURL ? user.photoURL : "https://i0.wp.com/digitalhealthskills.com/wp-content/uploads/2022/11/3da39-no-user-image-icon-27.png?fit=500%2C500&ssl=1"}
          />
        </div>
      </div>
      <ul
        tabIndex={0}
        className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow">
        <li>
          <a href='/user-profile' className="justify-between">
            Profile
            <span className="badge">New</span>
          </a>
        </li>
        <li><a>Order</a></li>
        <li><a>Settings</a></li>
        <li>
          <Link to="/dashboard/admin">Dashboard</Link>
        </li>
        <li><a onClick={handleLogout}>Logout</a></li>
      </ul>
    </div>
  )
}

export default Profile