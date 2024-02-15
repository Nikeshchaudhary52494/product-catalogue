import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import { FiLogOut } from "react-icons/fi";

const Header = () => {
    const location = useLocation();
    const isAuthenticated = localStorage.getItem('user') ? true : false;

    const handleLogout = () => {
        localStorage.removeItem('user');
    };
    return (
        <>
            <div className='h-20 bg-blue-600'>
                <div className='max-w-5xl  h-full text-white flex justify-between items-center mx-auto'>
                    <h1 className='text-5xl font-bold'>Grill</h1>
                    <div className='space-x-4'>
                        <Link className='hover:bg-blue-500 px-4 py-2 rounded-sm ' to={"/"}>Home</Link>
                        <Link className={`hover:bg-blue-500 px-4 py-2 rounded-sm ${isAuthenticated ? 'hidden' : ''}`} to="/login" state={location.pathname}>Login</Link>
                        <Link className='hover:bg-blue-500 px-4 py-2 rounded-sm ' to={"/cart"} >Cart</Link>
                        <FiLogOut className={`inline ${isAuthenticated ? `` : `hidden`} `} onClick={handleLogout} />
                    </div>
                </div>
            </div>
        </>
    )
}

export default Header