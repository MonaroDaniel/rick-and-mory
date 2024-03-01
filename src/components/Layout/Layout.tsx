import { Outlet } from "react-router-dom"
import Header from "../Header/Header"
import { ThemeProvider } from "@/components/theme-provider"

export default () => {
    return (
        <>
            <ThemeProvider>
                <Header />
                <Outlet />
            </ThemeProvider>
        </>
    )
}