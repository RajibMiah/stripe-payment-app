'use client';
import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useDispatch, useSelector } from 'react-redux';

import { RootState } from '@redux/store';
import { logout } from '@redux/slices/authSlice';

interface HeaderProps {
    signupToogle: () => void;
    loginToggle: () => void;
}

const Header = ({ loginToggle, signupToogle }: HeaderProps) => {
    const dispatch = useDispatch();
    const [isMenuOpen, setIsMenuOpen] = useState(false); // State to toggle the mobile menu

    const { isAuthenticated } = useSelector((state: RootState) => state.auth);

    // Toggle the mobile menu
    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    const handleLogout = () => {
        dispatch(logout());
    };

    return (
        <header className="sticky top-0 z-50 w-full bg-white">
            {/* Main Container */}
            <div>
                {/* Top Header Section */}
                <div className="flex justify-between items-center py-8 px-4 sm:px-8 md:px-12 lg:px-12 xl:px-24">
                    {/* Logo */}
                    <div>
                        <Image
                            src="/logo_payment.wbmp"
                            alt="Logo"
                            width={50}
                            height={50}
                            className="h-12 w-auto rounded-full"
                        />
                    </div>

                    {/* Navigation (Large Screens) */}
                    <nav className="hidden lg:flex justify-between gap-16">
                        <Link href="/" passHref>
                            <span className="hover:text-gray-300">Home</span>
                        </Link>
                        <Link href="/" passHref>
                            <span className="hover:text-gray-300">About</span>
                        </Link>
                        <Link href="/" passHref>
                            <span className="hover:text-gray-300">Service</span>
                        </Link>
                        <Link href="/" passHref>
                            <span className="hover:text-gray-300">Contact</span>
                        </Link>
                    </nav>

                    {/* Auth Buttons (Large Screens) */}
                    <div className="hidden lg:flex justify-center items-center gap-8">
                        {!isAuthenticated && (
                            <>
                                <button
                                    className="mouse-pointer"
                                    onClick={loginToggle}
                                >
                                    <span className="hover:text-gray-700 mouse-pointer">
                                        Login
                                    </span>
                                </button>
                                <button
                                    className="bg-purple-500 text-white px-4 py-2 rounded mouse-pointer"
                                    onClick={signupToogle}
                                >
                                    Sign Up
                                </button>
                            </>
                        )}

                        {isAuthenticated && (
                            <button
                                className="bg-purple-500 text-white px-4 py-2 rounded mouse-pointer"
                                onClick={handleLogout}
                            >
                                Logout
                            </button>
                        )}
                    </div>

                    {/* Hamburger Menu Icon (Mobile and Tablet) */}
                    <div
                        className="lg:hidden flex items-center"
                        onClick={toggleMenu}
                    >
                        <button className="text-black">
                            <span className="text-xl block">☰ MENU</span>
                        </button>
                    </div>
                </div>

                {/* Mobile Menu (Visible when `isMenuOpen` is true) */}
                {isMenuOpen && (
                    <div className="2xl:hidden flex flex-col items-center gap-4 py-4 bg-black text-white">
                        <Link href="/" passHref>
                            <span className="hover:text-gray-300">Home</span>
                        </Link>
                        <Link href="/" passHref>
                            <span className="hover:text-gray-300">About</span>
                        </Link>
                        <Link href="/" passHref>
                            <span className="hover:text-gray-300">Service</span>
                        </Link>
                        <Link href="/" passHref>
                            <span className="hover:text-gray-300">Contact</span>
                        </Link>

                        {!isAuthenticated && (
                            <>
                                <button onClick={loginToggle}>
                                    <span className="hover:text-gray-300">
                                        Login
                                    </span>
                                </button>
                                <button
                                    className="bg-blue-500 text-white px-4 py-2 rounded mouse-pointer"
                                    onClick={signupToogle}
                                >
                                    Sign Up
                                </button>
                            </>
                        )}
                        {isAuthenticated && (
                            <button
                                className="bg-blue-500 text-white px-4 py-2 rounded mouse-pointer"
                                onClick={handleLogout}
                            >
                                Logout
                            </button>
                        )}
                    </div>
                )}
            </div>
        </header>
    );
};

export default Header;
