import { useState } from "react";
import { MdOutlineCancel } from "react-icons/md";
import { IoMdMenu } from "react-icons/io";
import { Link, NavLink } from "react-router-dom";

function UserHeader() {

  const [menuOpen, setMenuOpen] = useState(false);

  const navLinkClass = ({ isActive }: { isActive: boolean }) =>
  isActive
    ? "text-indigo-600 font-semibold underline"
    : "hover:underline text-lg transition";

  const mobileNavLinkClass = ({ isActive }: { isActive: boolean }) =>
  isActive
    ? "text-yellow-400 font-semibold"
    : "hover:underline text-base";

  return (
    <header className="bg-black shadow-md static text-gray-500">
      <nav className="flex justify-between items-center px-6 py-4 ">

        <Link
          to={"/"}
          className="text-3xl font-bold bg-gradient-to-r from-indigo-300 to-cyan-300 bg-clip-text text-transparent"
        >
          SwiftExChange
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex gap-6 items-center">
            <>
              <NavLink to="/" className={navLinkClass}>
                Home
              </NavLink>
              <NavLink to="/exchange" className={navLinkClass}>
                Exchange Rate
              </NavLink>
              {/* <NavLink to="/status/:id" className={mobileNavLinkClass}>
                Status
              </NavLink> */}
              <NavLink to="/contact" className={navLinkClass}>
                Contact Us
              </NavLink>
            </>
          
        </div>

        {/* mobile humberger */}
        <button
          className="md:hidden text-gray-50 focus:outline-none"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <MdOutlineCancel size={24} /> : <IoMdMenu size={24} />}
        </button>
      </nav>

      {/* mobile dropdown */}
      {menuOpen && (
        <div className="md:hidden bg-black border-t border-gray-700 px-6 pb-4 flex flex-col gap-4 text-gray-50">
          
            <>
              <NavLink to="/" className={mobileNavLinkClass}>
                Home
              </NavLink>
              <NavLink to="/exchange" className={mobileNavLinkClass}>
                Exchange Rate
              </NavLink>
              {/* <NavLink to="/status/:id" className={mobileNavLinkClass}>
                Status
              </NavLink> */}
              <NavLink to="/contact" className={mobileNavLinkClass}>
                Contact Us
              </NavLink>
            </>
          
        </div>
      )}
    </header>
  );
}

export default UserHeader;