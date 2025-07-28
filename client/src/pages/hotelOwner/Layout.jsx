import React, { useEffect } from 'react';
import NavBar from '../../components/hotelOwner/NavBar';
import SideBar from '../../components/hotelOwner/SideBar';
import { Outlet } from 'react-router-dom';
import { useAppContext } from '../../context/AppContext';

const Layout = () => {

    const { isOwner, navigate, loadingUser, fetchUser } = useAppContext();

    useEffect(() => {
        fetchUser();   // ✅ actually ask the server
    }, []);

    useEffect(() => {
        if (!loadingUser && !isOwner) {
        navigate("/");
        }
    }, [isOwner, loadingUser]);


    return (
        <div className='flex flex-col h-screen'>
           <NavBar />

           <div className='flex h-full'>
            <SideBar />
            <div className='flex-1 p-4 pt-10 md:px-10 h-full'>
                <Outlet />
            </div>
           </div>
        </div>
    );
};

export default Layout;