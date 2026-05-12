import { createBrowserRouter } from "react-router-dom";
import { AdminLayout, AllCurrencies, AllTransaction, ChoosePaymentMethod, Dashboard, Login, Status, Transaction, TransactionById, UserHome, UserLayout } from "../../constant/lazy-load";
import ExchangeRate from "../user/ExchangeRate";
import ContactUs from "../user/ContactUs";

const router = createBrowserRouter([
    {
        path: '/',
        element: <UserLayout/>,
        children:[
            {
                index: true,
                element: <UserHome/>
            },
            {
                path: '/exchange',
                element: <ExchangeRate/>
            },
            {
                path: '/contact',
                element: <ContactUs/>
            },
            {
                path: '/payment',
                element: <ChoosePaymentMethod/>
            },
            {
                path: '/transaction',
                element: <Transaction/>
            },
            {
                path: '/status/:id',
                element: <Status/>
            }
        ]
    },

    {
    path: '/admin',
    element: <AdminLayout />, // admin layout
    children: [
        { 
            index: true, 
            element: <Login /> 
        },
        {
            path: 'dashboard',
            element: <Dashboard /> 
        },
        {
            path: 'transactions',
            element: <AllTransaction/>
        },
        {
            path: 'transactions/:id',
            element: <TransactionById/>
        },
        {
            path: 'currencies',
            element: <AllCurrencies/>
        }
    ],
  },
])

export default router