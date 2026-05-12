import { useEffect, type ReactNode } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router";
import type { RootState } from "../slices/store/store";


interface props {
    children: ReactNode,
    adminOnly?: boolean
}

const Protect = ({ children, adminOnly = false }: props) => {

    const userInfo = useSelector((state: RootState) => state.auth.userInfo)
    const navigate = useNavigate()

    useEffect(() => {
        if (!userInfo) {
            navigate("/", { replace: true });
        }
        else if (adminOnly && userInfo.role !== "admin" || "admin") {
            navigate("/home", { replace: true });
        }
    }, [userInfo, adminOnly, navigate])

    return (
        <>{children}</>
    )
}

export default Protect
