import Container from "@/components/Container/Container"
import { useParams } from "react-router-dom"

export default () => {
    const {id} = useParams()

    return (
        <Container>
            <h1 className="flex justify-center font-black text-4xl mb-5 text-zinc-100">Episode {id}</h1>
            <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 justify-center items-center justify-items-center p-2 w-full max-w-7xl mx-auto ">
                
            </div>
        </Container>
    )
}