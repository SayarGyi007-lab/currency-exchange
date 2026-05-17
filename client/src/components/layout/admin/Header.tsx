import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { MdLogout } from "react-icons/md";
import { MdOutlineCancel } from "react-icons/md";
import { IoMdMenu } from "react-icons/io";
import { Link, NavLink, useNavigate } from "react-router-dom";
import type { RootState } from "../../../slices/store/store";
import { useLogoutMutation } from "../../../slices/redux-slices/auth-api";
import { clearUserInfo } from "../../../slices/redux-slices/auth";
import Button from "../../../constant/ui/Button";

function AdminHeader() {
  const userInfo = useSelector((state: RootState) => state.auth.userInfo);

  const [logout, { isLoading }] = useLogoutMutation();

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [menuOpen, setMenuOpen] = useState(false);

  const logoutHandler = async () => {
    try {
      await logout(userInfo).unwrap();
    } catch (error) {
      console.log(error);
    } finally {
      dispatch(clearUserInfo());
      navigate("/admin");
    }
  };

  const navLinkClass = ({ isActive }: { isActive: boolean }) =>
    isActive
      ? "text-indigo-600 font-semibold underline"
      : "hover:underline text-lg transition";

  const sharedDesktopLinks = (
    <>
      <NavLink to="/admin/transactions" className={navLinkClass}>
        Transactions
      </NavLink>

      <NavLink to="/admin/currencies" className={navLinkClass}>
        Currencies
      </NavLink>
    </>
  );

  const sharedMobileLinks = (
    <>
      <NavLink to="/admin/transactions" className={navLinkClass} onClick={() => setMenuOpen(false)}>
        Transactions
      </NavLink>

      <NavLink to="/admin/currencies" className={navLinkClass} onClick={() => setMenuOpen(false)}>
        Currencies
      </NavLink>
    </>
  );

  return (
    <header className="bg-black shadow-md static text-gray-500">
      <nav className="flex justify-between items-center px-6 py-4">
        <Link
          to={userInfo ? "/admin/dashboard" : "/admin"}
          className="text-3xl font-bold bg-gradient-to-r from-indigo-300 to-cyan-300 bg-clip-text text-transparent"
        >
          SwiftExChange
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex gap-6 items-center">

          {/* Admin */}
          {userInfo?.role === "admin" && (
            <>
              <NavLink to="/admin/users" className={navLinkClass}>
                Manage Admins
              </NavLink>

              {sharedDesktopLinks}

              <NavLink to="/admin/rates" className={navLinkClass}>
                Exchange Rates
              </NavLink>

              <NavLink to="/admin/payments" className={navLinkClass}>
                Payments
              </NavLink>

              <Button
                onClick={logoutHandler}
                variant="secondary"
                disabled={isLoading}
              >
                Logout <MdLogout size={18} />
              </Button>
            </>
          )}

          {/* SuperAdmin */}
          {userInfo?.role === "super_admin" && (
            <>
              <NavLink to="/admin/users" className={navLinkClass}>
                Manage Admins
              </NavLink>

              {sharedDesktopLinks}

              <NavLink to="/admin/rates" className={navLinkClass}>
                Exchange Rates
              </NavLink>

              <NavLink to="/admin/payments" className={navLinkClass}>
                Payments
              </NavLink>

              <Button
                onClick={logoutHandler}
                variant="secondary"
                disabled={isLoading}
              >
                Logout <MdLogout size={18} />
              </Button>
            </>
          )}
        </div>

        {/* Mobile Hamburger */}
        <button
          className="md:hidden text-gray-50 focus:outline-none"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? (
            <MdOutlineCancel size={24} />
          ) : (
            <IoMdMenu size={24} />
          )}
        </button>
      </nav>

      {/* Mobile Dropdown */}
      {menuOpen && (
        <div className="md:hidden bg-black border-t border-gray-700 px-6 pb-4 flex flex-col gap-4 text-gray-50">

          {/* Admin */}
          {userInfo?.role === "admin" && (
            <>
              <NavLink
                to="/admin/users"
                className="hover:underline text-base"
                onClick={() => setMenuOpen(false)}
              >
                Manage Admins
              </NavLink>

              {sharedMobileLinks}

              <NavLink to="/admin/rates" className={navLinkClass} onClick={() => setMenuOpen(false)}>
                Exchange Rates
              </NavLink>

              <NavLink to="/admin/payments" className={navLinkClass} onClick={() => setMenuOpen(false)}>
                Payments
              </NavLink>

              <Button
                onClick={() => {
                  logoutHandler();
                  setMenuOpen(false);
                }}
                variant="secondary"
                disabled={isLoading}
              >
                Logout <MdLogout size={18} />
              </Button>
            </>
          )}

          {/* SuperAdmin */}
          {userInfo?.role === "super_admin" && (
            <>

              <NavLink
                to="/admin/users"
                className="hover:underline text-base"
                onClick={() => setMenuOpen(false)}
              >
                Manage Admins
              </NavLink>

              {sharedMobileLinks}

              <NavLink to="/admin/rates" className={navLinkClass} onClick={() => setMenuOpen(false)}>
                Exchange Rates
              </NavLink>

              <NavLink to="/admin/payments" className={navLinkClass} onClick={() => setMenuOpen(false)}>
                Payments
              </NavLink>

              <Button
                onClick={() => {
                  logoutHandler();
                  setMenuOpen(false);
                }}
                variant="secondary"
                disabled={isLoading}
              >
                Logout <MdLogout size={18} />
              </Button>
            </>
          )}
        </div>
      )}
    </header>
  );
}

export default AdminHeader;