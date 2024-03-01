import { Outlet } from "react-router-dom"
import Header from "../Header/Header"

export default () => {
    return (
        <>
            <Header />
            <Outlet />
        </>
    )
}