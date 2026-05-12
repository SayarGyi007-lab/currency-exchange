import { Outlet } from 'react-router';
import { Bounce, ToastContainer } from 'react-toastify';
import UserHeader from './Header';
import Footer from './Footer';

function UserMain() {
  return (
    <section
      className="min-h-screen flex flex-col relative bg-[var(--surface)] text-[var(--text-primary)]"
    >
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        transition={Bounce}
      />

      <UserHeader />

      <div className="flex-1">
        <Outlet />
      </div>

      <Footer/>
    </section>
  );
}

export default UserMain;