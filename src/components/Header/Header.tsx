//@ts-ignore
import React from "react"
import logo from '../../assets/logo.png'
import { Link } from "react-router-dom"

export default () => {
    return (
        <div className="w-full mx-auto flex items-center justify-center max-w-7xl h-max">
            <Link to='/'>
                <img
                    src={logo}
                    alt="Logo"
                    className="cursor-pointer"
                />
            </Link>
        </div>
    )
}