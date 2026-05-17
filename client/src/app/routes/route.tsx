import { createBrowserRouter } from "react-router-dom";
import { AdminLayout, AllCurrencies, AllExchangeRate, AllPayments, AllTransaction, AllUsers, ChoosePaymentMethod, Dashboard, ExchangeRate, Login, Status, Transaction, TransactionById, UserHome, UserLayout } from "../../constant/lazy-load";
import ContactUs from "../user/ContactUs/ContactUs";

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
        },
        {
            path: 'rates',
            element: <AllExchangeRate/>
        },
        {
            path: 'payments',
            element: <AllPayments/>
        },
        {
            path: 'users',
            element: <AllUsers/>
        }
    ],
  },
])

export default router