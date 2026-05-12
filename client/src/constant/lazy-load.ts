import { lazy } from 'react';
import PageLoader from './ui/PageLoader';

export const UserLayout = PageLoader(
    lazy(()=> import ('../components/layout/user/Main'))
)

export const UserHome = PageLoader(
    lazy(()=> import ('../app/user/Home'))
)

export const AdminLayout = PageLoader(
    lazy(()=> import ('../components/layout/admin/Main'))
)


export const ChoosePaymentMethod = PageLoader(
    lazy(()=> import('../app/user/PaymentMethod'))
)

export const Transaction = PageLoader(
    lazy(()=> import('../app/user/Transaction'))
)

export const Status = PageLoader(
    lazy(()=> import('../app/user/Status'))
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