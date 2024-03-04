import Container from "../../components/Container/Container"
import { Input } from "@/components/ui/input"
import { useContext, useEffect, useState, KeyboardEvent } from "react"
import { client } from '@/config/client-graphql'
import { gql } from '@apollo/client'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { useNavigate } from "react-router-dom"
import { Eye, EyeOff, Star } from "lucide-react"
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "@/components/ui/pagination"
import { Button } from "@/components/ui/button"
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card"
import { CharactersType } from "../EpisodeDetails/EpisodeDetails"
import { EpisodeContext } from "@/context/EpisodeContext"
import { useTheme } from "@/components/theme-provider"
import toast from "react-hot-toast"

export interface CardEpisode {
    id: number;
    name: string;
    air_date: string;
    episode: string;
    characters: Array<CharactersType>;
    favorite: boolean;
    viewed: boolean;
}

interface PaginateProps {
    pages: number;
    count: number;
    next: number;
    prev: number;
}

export default () => {
    const { vieweds, viewedEpisode, favorites, favoriteEpisode, unfavoriteEpisode } = useContext(EpisodeContext)
    const navigate = useNavigate()

    const { theme } = useTheme()

    const [paginate, setPaginate] = useState<PaginateProps>()
    const [episodes, setEpisodes] = useState<Array<CardEpisode>>()
    const [currentPage, setCurrentPage] = useState(1)

    const [inputName, setInputName] = useState('')
    const [loadingSearch, setLoadingSearch] = useState(false)

    const [colorIconFill, setColorIconFill] = useState('')
    const [colorIconNotFill, setColorIconNotFill] = useState('')

    useEffect(() => {
        getData()
    }, [currentPage, favorites])

    useEffect(() => {
        handlerColorIcon()
    }, [theme])

    async function getData() {
        setLoadingSearch(true)
        await client.query({
            query: gql`
            query {
                episodes(page:${currentPage}, filter:{name:"${inputName.toUpperCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '')}"}){
                  info{
                    pages,
                    count,
                    next
                  }
                  results{
                    id,
                    name,
                    episode,
                    air_date,
                    characters{name}
                  }
                }
              }
            `
        }).then(response => {
            setLoadingSearch(false)
            let currentEpisodes = response.data.episodes.results.map((episode: CardEpisode) => {
                return {
                    ...episode,
                    viewed: vieweds.some(viewed => viewed.id === episode.id),
                    favorite: favorites.some(favorite => favorite.id === episode.id)
                }
            })
            if (currentEpisodes.length <= 0) {
                toast.error('No values ​​found')
            }
            setEpisodes(currentEpisodes);
            setPaginate({
                count: response.data.episodes.info.count,
                next: response.data.episodes.info.next,
                pages: response.data.episodes.info.pages,
                prev: response.data.episodes.info.prev,
            });
        }).catch(error => {
            setLoadingSearch(false)
            console.log(error);
            toast.error(error)
        })
    }

    function handlerFavoriteEpisode(card: CardEpisode) {
        if (card.favorite) {
            unfavoriteEpisode(card.id)
        } else {
            favoriteEpisode(card)
        }
    }

    function handlerColorIcon() {
        //Modifica as cores dos icones de favoritar de acordo com o tema
        setColorIconFill(theme === 'dark' ? 'white' : 'black')
        setColorIconNotFill(theme === 'light' ? 'white' : 'black')
    }

    function keyboardEvent(event: KeyboardEvent<HTMLInputElement>) {
        if (event.nativeEvent.key === 'Enter') {
            getData()
        }
    }

    return (
        <Container>
            <div className="flex flex-col items-center w-full max-h-28 justify-center">
                <h1 className="flex justify-center font-black text-2xl mb-5">List of episodes</h1>
                <div className="flex justify-between items-center gap-2 max-w-5xl w-full">
                    <Input
                        onKeyDown={event => keyboardEvent(event)}
                        placeholder="Search the episode..."
                        type="text"
                        value={inputName}
                        onChange={(e) => setInputName(e.target.value)}
                    />
                    <Button
                        onClick={() => getData()}
                    >
                        Search
                    </Button>
                    <div className="flex justify-start w-full">
                        {loadingSearch && (<div className="font-semibold w-min">Carregando...</div>)}
                    </div>
                    <Pagination className="flex justify-end">
                        <PaginationContent>
                            <PaginationItem>
                                <PaginationPrevious
                                    className="cursor-pointer"
                                    onClick={() => setCurrentPage(paginate?.prev ?? Math.max(currentPage - 1, 1))}
                                />
                            </PaginationItem>
                            {paginate && Array.from({ length: paginate?.pages }, (_, index) => (
                                <PaginationItem key={index + 1}>
                                    <PaginationLink
                                        className={`cursor-pointer ${index + 1 === currentPage ? 'border-2' : ''}`}
                                        onClick={() => setCurrentPage(index + 1)}
                                    >
                                        {index + 1}
                                    </PaginationLink>
                                </PaginationItem>
                            ))}
                            <PaginationItem>
                                <PaginationNext
                                    className="cursor-pointer"
                                    onClick={() => setCurrentPage(paginate?.next ?? 1)}
                                />
                            </PaginationItem>
                        </PaginationContent>
                    </Pagination>
                </div>
            </div>
            <div className="max-w-5xl max-h-screen mx-auto border m-5 rounded-lg overflow-y-auto overflow-x-hidden p-2">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>ID</TableHead>
                            <TableHead>Episode</TableHead>
                            <TableHead>Name</TableHead>
                            <TableHead>Air Date</TableHead>
                            <TableHead>Characters</TableHead>
                            <TableHead>Favorite</TableHead>
                            <TableHead>Watched</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {episodes && episodes.length > 0 && (
                            episodes.map(episode => (
                                <TableRow key={episode.id} onClick={() => {
                                    navigate(`/episodes/${episode.id}`)
                                    viewedEpisode(episode)
                                }}>
                                    <TableCell>{episode.id}</TableCell>
                                    <TableCell>{episode.episode}</TableCell>
                                    <TableCell>{episode.name}</TableCell>
                                    <TableCell>{episode.air_date}</TableCell>
                                    <TableCell>{episode.characters.length}</TableCell>
                                    <TableCell>
                                        <HoverCard>
                                            <HoverCardTrigger>
                                                <Star
                                                    className="cursor-pointer"
                                                    fill={`${favorites.some(favorite => favorite.id === episode.id) ? colorIconFill : colorIconNotFill}`}
                                                    onClick={(e) => {
                                                        e.stopPropagation()
                                                        handlerFavoriteEpisode(episode)
                                                    }}
                                                />
                                            </HoverCardTrigger>
                                            <HoverCardContent onClick={(e) => {
                                                e.stopPropagation()
                                                handlerFavoriteEpisode(episode)
                                            }}
                                            >
                                                {favorites.some(favorite => favorite.id === episode.id) ? 'Unfavorite' : 'Favorite'}
                                            </HoverCardContent>
                                        </HoverCard>
                                    </TableCell>
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
        </Container>
    )
}