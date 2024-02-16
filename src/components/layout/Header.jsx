import React, { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { FiLogOut } from "react-icons/fi";
import toast from 'react-hot-toast';

const Header = () => {
    const location = useLocation();
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    useEffect(() => {
        const data = localStorage.getItem('user');
        setIsAuthenticated(data ? true : false);
    });
    const handleLogout = () => {
        setIsAuthenticated(false);
        localStorage.removeItem('user');
        toast.success("User Loged-out");
    };
    return (
        <>
            <div className='h-20 bg-primary sticky top-0'>
                <div className='max-w-5xl px-10 h-full text-white flex justify-between items-center mx-auto'>
                    <h1 className='text-5xl font-bold'>Grull</h1>
                    <div className='md:space-x-4 flex items-center'>
                        <Link className='hover:bg-blue-300 hover:text-blue-600 font-bold duration-100 px-4 py-2 rounded-sm ' to={"/"}>Home</Link>
                        <Link className={`hover:bg-blue-300 hover:text-blue-600  duration-100 px-4 py-2 rounded-sm ${isAuthenticated ? 'hidden' : ''}`} to="/login" state={location.pathname}>Login</Link>
                        <Link className='hover:bg-blue-300 hover:text-blue-600  duration-100 px-4 py-2 rounded-sm ' to={"/cart"} >Cart</Link>
                        <span
                            className={`hover:bg-red-400 duration-100 p-4 rounded-full ${isAuthenticated ? '' : 'hidden'}`}
                            onClick={handleLogout}
                        ><FiLogOut /></span>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Header