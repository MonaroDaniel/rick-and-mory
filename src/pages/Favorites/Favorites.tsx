import Container from "@/components/Container/Container"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { EpisodeContext } from "@/context/EpisodeContext"
import { Eye, EyeOff } from "lucide-react"
import { useContext, useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card"
import { CardEpisode } from "../Home/Home"

export default () => {
    const { favorites, vieweds } = useContext(EpisodeContext)
    const navigate = useNavigate()

    const [favoritesData, setFavoritesData] = useState<Array<CardEpisode>>([])

    useEffect(() => {
        getDataFavorites(favorites)
    }, [])

    function getDataFavorites(list: Array<CardEpisode>) {
        let currentFavorites = list.map((episode: CardEpisode) => {
            return {
                ...episode,
                viewed: vieweds.some(viewed => viewed.id === episode.id),
            }
        })
        setFavoritesData(currentFavorites)
    }

    return (
        <Container>
            {favoritesData.length > 0 ? (
                <>
                    <h1 className="flex justify-center font-black text-2xl mb-5">List of favorite episodes</h1>
                    <div className="max-w-5xl max-h-screen mx-auto border m-5 rounded-lg overflow-y-auto overflow-x-hidden p-2">
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>ID</TableHead>
                                    <TableHead>Episode</TableHead>
                                    <TableHead>Name</TableHead>
                                    <TableHead>Air Date</TableHead>
                                    <TableHead>Characters</TableHead>
                                    <TableHead>Watched</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {favoritesData && favoritesData.length > 0 && (
                                    favoritesData.map(episode => (
                                        <TableRow key={episode.id} onClick={() => navigate(`/episodes/${episode.id}`)}>
                                            <TableCell>{episode.id}</TableCell>
                                            <TableCell>{episode.episode}</TableCell>
                                            <TableCell>{episode.name}</TableCell>
                                            <TableCell>{episode.air_date}</TableCell>
                                            <TableCell>{episode.characters.length}</TableCell>
                                            <TableCell>
                                                <HoverCard>
                                                    <HoverCardTrigger>
                                                        {episode.viewed ? (
                                                            <EyeOff />
                                                        ) : <Eye />}
                                                    </HoverCardTrigger>
                                                    <HoverCardContent className="cursor-auto">
                                                        {episode.viewed ? 'Watched' : 'To view'}
                                                    </HoverCardContent>
                                                </HoverCard>
                                            </TableCell>
                                        </TableRow>
                                    ))
                                )}
                            </TableBody>
                        </Table>
                    </div>
                </>
            ) : (
                <div className="flex flex-col mt-10 gap-5 items-center justify-center w-full max-w-7xl">
                    <span className="font-bold text-2xl">You haven't favorited any episodes yet</span>
                    <Button onClick={() => navigate('/')}>Favorite</Button>
                </div>
            )}
        </Container>
    )
}