import { lazy } from 'react';
import PageLoader from './ui/PageLoader';

export const UserLayout = PageLoader(
    lazy(()=> import ('../components/layout/user/Main'))
)

export const UserHome = PageLoader(
    lazy(()=> import ('../app/user/Home/Home'))
)

export const AdminLayout = PageLoader(
    lazy(()=> import ('../components/layout/admin/Main'))
)


export const ChoosePaymentMethod = PageLoader(
    lazy(()=> import('../app/user/PaymentMethod/PaymentMethod'))
)

export const Transaction = PageLoader(
    lazy(()=> import('../app/user/Transaction/Transaction'))
)

export const Status = PageLoader(
    lazy(()=> import('../app/user/Status/Status'))
)

export const ExchangeRate = PageLoader(
    lazy(() => import('../app/user/ExchangeRate/ExchangeRate'))
)

//admin

export const Login = PageLoader(
    lazy(()=> import ('../app/admin/auth/Login'))
)

export const Dashboard = PageLoader(
    lazy(()=> import ('../app/admin/Dashboard/Dashboard'))
)

export const AllTransaction = PageLoader(
    lazy(()=> import('../app/admin/Transaction/Transaction'))
)

export const TransactionById = PageLoader(
    lazy(() => import('../app/admin/TransactionById/TransactionById'))
)

export const AllCurrencies = PageLoader(
    lazy(() => import('../app/admin/Currency/AllCurrencies'))
)

export const AllExchangeRate = PageLoader(
    lazy(() => import('../app/admin/ExchangeRate/ExchangeRate'))
)

export const AllPayments = PageLoader(
    lazy(() => import('../app/admin/Payment/Payment'))
)

export const AllUsers = PageLoader(
    lazy(() => import('../app/admin/User/User'))
)