'use client';
import { useState } from 'react';
import Link from 'next/link';

const Header = ({ isOpen, toggleModal }: any) => {
    const [isMenuOpen, setIsMenuOpen] = useState(false); // State to toggle the mobile menu

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen); // Toggle the menu state
    };

    return (
        <header>
            <div>
                <div className="flex justify-between items-center py-8 px-4 sm:px-20">
                    {/* Logo */}
                    <div>
                        <div>LOGO</div>
                    </div>

                    {/* Navigation for Large Screens */}
                    <nav className="hidden 2xl:flex justify-between gap-16 ">
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

                    {/* Auth Buttons for Large Screens */}
                    <div className="hidden 2xl:flex justify-center items-center gap-8">
                        <div>
                            <span className="hover:text-gray-300">Login</span>
                        </div>
                        <button
                            className="bg-blue-500 text-white px-4 py-2 rounded mouse-pointer"
                            onClick={toggleModal}
                        >
                            Sign Up
                        </button>
                    </div>

                    {/* Hamburger Menu (Mobile and Tablet) */}
                    <div
                        className=" 2xl:hidden flex items-center"
                        onClick={toggleMenu}
                    >
                        <button className="text-black">
                            {/* Hamburger icon (three lines) */}
                            <span className="text-xl block">☰ MENU</span>
                        </button>
                    </div>
                </div>

                {/* Mobile Menu - Will be displayed when `isMenuOpen` is true */}
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
                        <div>
                            <span className="hover:text-gray-300">Login</span>
                        </div>
                        <button
                            className="bg-blue-500 text-white px-4 py-2 rounded mouse-pointer"
                            onClick={toggleModal}
                        >
                            Sign Up
                        </button>
                    </div>
                )}
            </div>
        </header>
    );
};

export default Header;
