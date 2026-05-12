import { Outlet } from 'react-router';
import { Bounce, ToastContainer } from 'react-toastify';
import AdminHeader from './Header';

function AdminMain() {
  return (
    <section className="min-h-screen flex flex-col relative bg-[#060e20]">
      
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

      <AdminHeader />

      <div className="flex-1">
        <Outlet />
      </div>


    </section>
  );
}

export default AdminMain;