//@ts-ignore
import React from "react"
import logo from '../../assets/logo.png'
import { Link, useNavigate } from "react-router-dom"
import { ModeToggle } from "../mode-toggle"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "../ui/dropdown-menu"

export default () => {
    const navigate = useNavigate()

    return (
        <div className="grid grid-cols-[1fr_5rem]  w-full mx-auto items-center justify-center max-w-7xl h-max">
            <Link
                to='/'
                className="w-full flex justify-center ml-5"
            >
                <img
                    src={logo}
                    alt="Logo"
                    className="cursor-pointer"
                />
            </Link>
            <div className="w-max">
                <div className="w-max flex justify-end items-center gap-2">
                    <DropdownMenu>
                        <DropdownMenuTrigger className="border p-2 rounded-lg">Open</DropdownMenuTrigger>
                        <DropdownMenuContent>
                            <DropdownMenuLabel>Menu</DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem 
                            onClick={() => navigate('/favorites')}
                            >
                                Favorites
                                </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                    <ModeToggle />
                </div>
            </div>
        </div>
    )
}