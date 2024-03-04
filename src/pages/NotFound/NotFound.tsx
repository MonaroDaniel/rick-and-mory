import { Button } from "@/components/ui/button"
import { Ban } from "lucide-react"
import { useNavigate } from "react-router-dom"

export default () => {
    const navigate = useNavigate()

    return (
        <div className="flex flex-col items-center mt-10 justify-center">
            <span className="flex items-center justify-center font-black text-7xl">
                PAGE NOT FOUND
                <Ban size={90} />
            </span>
            <span className="font-semibold text-4xl mb-4">Return to home</span>
            <Button onClick={() => navigate('/', { replace: true })}>Home</Button>
        </div >
    )
}