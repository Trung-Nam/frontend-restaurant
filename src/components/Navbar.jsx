import { useEffect, useState } from 'react';
import logo from '../assets/images/logo.png';
import { FaRegUser } from "react-icons/fa";
import Modal from './Modal';
const Navbar = () => {
    const [isSticky, setIsSticky] = useState(false);
    const [isOpen, setIsOpen] = useState(false); // State to manage modal visibility

    const openModal = () => {
        setIsOpen(true);
        document.getElementById('my_modal').showModal()
    } 
    const closeModal = () => {
        setIsOpen(false);
        document.getElementById('my_modal').close()

    }

    useEffect(() => {
        const handleScroll = () => {
            const offset = window.scrollY;
            if (offset > 0) {
                setIsSticky(true);
            } else {
                setIsSticky(false);
            }
        }

        window.addEventListener('scroll', handleScroll);

        return () => {
            window.addEventListener('scroll', handleScroll);

        }
    }, [])


    const navItems = (
        <>
            <li>
                <a href="/">Home</a>
            </li>
            <li tabIndex={0}>
                <details>
                    <summary>Menu</summary>
                    <ul className="p-2">
                        <li><a href="/menu">All</a></li>
                        <li><a>Salad</a></li>
                        <li><a>Pizza</a></li>
                    </ul>
                </details>
            </li>
            <li tabIndex={0}>
                <details>
                    <summary>Services</summary>
                    <ul className="p-2">
                        <li><a>Online Order</a></li>
                        <li><a>Table Booking</a></li>
                        <li><a>Order Tracking</a></li>
                    </ul>
                </details>
            </li>
            <li>
                <a>Offers</a>
            </li>
        </>
    )
    return (
        <header className='max-w-screen-2xl container mx-auto 
        fixed top-0 left-0 right-0
        transition-all duration-300 ease-out
        '>
            <div className={`navbar xl:px-24 ${isSticky ? "shadow-md bg-base-100 transition-all duration-300 ease-in-out" : ""}`}>
                <div className="navbar-start">
                    <div className="dropdown">
                        <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-5 w-5"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor">
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M4 6h16M4 12h8m-8 6h16" />
                            </svg>
                        </div>
                        <ul
                            tabIndex={0}
                            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow">
                            {navItems}
                        </ul>
                    </div>
                    <a className="btn btn-ghost text-xl">
                        <img src={logo} alt="logo" />
                    </a>
                </div>
                <div className="navbar-center hidden lg:flex">
                    <ul className="menu menu-horizontal px-1">
                        {navItems}
                    </ul>
                </div>
                <div className="navbar-end">
                    {/* Search */}
                    <button className="btn btn-ghost btn-circle hidden lg:flex">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-5 w-5"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor">
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                        </svg>
                    </button>
                    {/* Cart items */}
                    <div className="flex-none mr-3 hidden lg:flex items-center justify-center">
                        <div className="dropdown dropdown-end">
                            <div tabIndex={0} role="button" className="btn btn-ghost btn-circle">
                                <div className="indicator">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="h-5 w-5"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor">
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2"
                                            d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                                    </svg>
                                    <span className="badge badge-sm indicator-item">8</span>
                                </div>
                            </div>
                            <div
                                tabIndex={0}
                                className="card card-compact dropdown-content bg-base-100 z-[1] mt-3 w-52 shadow">
                                <div className="card-body">
                                    <span className="text-lg font-bold">8 Items</span>
                                    <span className="text-info">Subtotal: $999</span>
                                    <div className="card-actions">
                                        <button className="btn btn-primary btn-block">View cart</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* Contact */}
                    <button
                        className="btn bg-primary rounded-full px-6 text-white flex items-center gap-2"
                        onClick={openModal}
                    >
                        <FaRegUser />
                        Login
                    </button>

                    <Modal isOpen={isOpen} onClose={closeModal}/>
                </div>
            </div>
        </header>
    )
}

export default Navbar