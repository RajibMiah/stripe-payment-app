"use client";
import Link from "next/link";
const Header = () => {
  return (
    <header>
      <div>
        <div className="flex">
          <div>
            <div>LOGO</div>
          </div>
          <nav className="">
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
          <div>
            <div>
              <span>Login</span>
            </div>
            <div>
              <span>Sign up</span>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
