import { ReactNode } from "react"

export default ({ children }: { children: ReactNode }) => {
    return (
        <div className="w-full max-w-7xl mx-auto">
            {children}
        </div>
    )
}