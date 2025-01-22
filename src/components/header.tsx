"use client";
import Link from "next/link";
const Header = () => {
  return (
    <header>
      <div className="">
        <div className="flex justify-between items-center py-8 px-20">
          <div>
            <div>LOGO</div>
          </div>
          <nav className="flex justify-between gap-16 ">
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
          <div className="flex justify-center items-center gap-8">
            <div>
              <span>Login</span>
            </div>
            <div className="border border-solid border-white rounded-[6px] px-[0.6rem] py-[0.3rem] text-white bg-black">
              <span>Sign up</span>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
