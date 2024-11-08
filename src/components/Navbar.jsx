import { useEffect, useState } from 'react';
import logo from '../assets/images/logo.png';
import { FaRegUser, FaSearch } from "react-icons/fa";
import Profile from './Profile';
import { Link } from 'react-router-dom';
import useCart from '../hooks/useCart';
import useAuth from '../hooks/useAuth';
import useMenu from '../hooks/useMenu';

const Navbar = () => {
    const [isSticky, setIsSticky] = useState(false);
    const { user } = useAuth();
    const [carts, refetch] = useCart();
    const [activeItem, setActiveItem] = useState('Home');
    const [menu] = useMenu();
    const [isSearchActive, setIsSearchActive] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [filteredSuggestions, setFilteredSuggestions] = useState([]);
    // console.log(menu);
    
    useEffect(() => {
        const handleScroll = () => {
            setIsSticky(window.scrollY > 0);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const handleItemClick = (item) => setActiveItem(item);

    const handleSearchIconClick = () => {
        setIsSearchActive(true);
    };

    const handleSearchChange = (event) => {
        const value = event.target.value;
        setSearchTerm(value);

        // Filter menu items based on search term
        const suggestions = menu.filter(item =>
            item.name.toLowerCase().includes(value.toLowerCase())
        );
        setFilteredSuggestions(suggestions);
    };

    const navItems = (
        <>
            <li className={activeItem === 'Home' ? 'active' : ''}>
                <Link to="/" onClick={() => handleItemClick('Home')}>Home</Link>
            </li>
            <li className={activeItem === 'Menu' ? 'active' : ''}>
                <Link to="/menu" onClick={() => handleItemClick('Menu')}>Menu</Link>
            </li>
            <li tabIndex={0}>
                <details>
                    <summary>Services</summary>
                    <ul className="p-2">
                        <li><a onClick={() => handleItemClick('Online Order')}>Online Order</a></li>
                        <li><a onClick={() => handleItemClick('Table Booking')}>Table Booking</a></li>
                        <li><a onClick={() => handleItemClick('Order Tracking')}>Order Tracking</a></li>
                    </ul>
                </details>
            </li>
            <li className={activeItem === 'Offers' ? 'active' : ''}>
                <Link onClick={() => handleItemClick('Offers')}>Offers</Link>
            </li>
        </>
    );

    return (
        <header className='max-w-screen-2xl container mx-auto fixed top-0 left-0 right-0 transition-all duration-300 ease-out'>
            <div className={`navbar xl:px-24 ${isSticky ? "shadow-md bg-base-100" : ""}`}>
                <div className="navbar-start">
                    <div className="dropdown">
                        <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" />
                            </svg>
                        </div>
                        <ul tabIndex={0} className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow">
                            {navItems}
                        </ul>
                    </div>
                    <a href='/' className="btn btn-ghost text-xl">
                        <img src={logo} alt="logo" />
                    </a>
                </div>
                <div className="navbar-center hidden lg:flex">
                    <ul className="menu menu-horizontal px-1">
                        {navItems}
                    </ul>
                </div>
                <div className="navbar-end flex items-center gap-4">
                    {/* Search */}
                    {isSearchActive ? (
                        <div className="relative">
                            <input
                                type="text"
                                value={searchTerm}
                                onChange={handleSearchChange}
                                placeholder="Search..."
                                className="input w-full rounded-full h-8"
                                autoFocus
                                onBlur={() => setIsSearchActive(false)}
                            />
                            <FaSearch className="absolute right-2 top-2 text-gray-500" />
                            {/* Suggestions dropdown */}
                            {searchTerm && (
                                <ul className="absolute z-10 w-full mt-2 bg-white shadow-md rounded-md max-h-96 overflow-y-scroll">
                                    {filteredSuggestions.map((item) => (
                                        <li key={item._id} className="px-4 py-2 hover:bg-gray-100 w-full">
                                            <Link to={`/menu/${item._id}`} className="flex items-center justify-start gap-2 relative">
                                                <img src={item.image} alt="item-image" className='w-8 h-8 rounded-full' />
                                                <div className="text-sm truncated-text">{item.name}</div>
                                                <div className='absolute right-0 text-soft-red'>${item.price}</div>
                                            </Link>
                                        </li>
                                    ))}
                                    {filteredSuggestions.length === 0 && (
                                        <li className="px-4 py-2 text-gray-500">No results found</li>
                                    )}
                                </ul>
                            )}
                        </div>
                    ) : (
                        <button className="btn btn-ghost btn-circle hidden lg:flex" onClick={handleSearchIconClick}>
                            <FaSearch className="text-gray-500" />
                        </button>
                    )}
                    {/* Cart */}
                    <Link to="cart-page">
                        <div className="flex-none mr-3 hidden lg:flex items-center justify-center">
                            <div className="dropdown dropdown-end">
                                <div tabIndex={0} role="button" className="btn btn-ghost btn-circle">
                                    <div className="indicator">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                                        </svg>
                                        <span className="badge badge-sm indicator-item">{carts?.length || 0}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Link>
                    {/* Contact */}
                    {user ? (
                        <Profile user={user} />
                    ) : (
                        <Link to="/login" className="btn bg-primary rounded-full px-6 text-white flex items-center gap-2">
                            <FaRegUser /> Login
                        </Link>
                    )}
                </div>
            </div>
        </header>
    );
};

export default Navbar;
