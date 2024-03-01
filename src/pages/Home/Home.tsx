import CardEpisode from "@/components/CardEpisode/CardEpisode"
import Container from "../../components/Container/Container"
import { Input } from "@/components/ui/input"
import { useEffect, useState } from "react"
import { client } from '@/config/client-graphql'
import { gql } from '@apollo/client'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { useNavigate } from "react-router-dom"
import { Star } from "lucide-react"
import { Pagination, PaginationContent, PaginationEllipsis, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "@/components/ui/pagination"
import { Button } from "@/components/ui/button"

interface VideoProps {
    id: number;
    episode: string;
    name: string;
    air_date: string;
    characters: Array<any>;
}

interface PaginateProps {
    pages: number;
    count: number;
    next: number;
    prev: number;
}

export default () => {
    const navigate = useNavigate()


    const [paginate, setPaginate] = useState<PaginateProps>()
    const [videos, setVideos] = useState<Array<VideoProps>>()
    const [currentPage, setCurrentPage] = useState(1)

    const [inputName, setInputName] = useState('')

    useEffect(() => {
        getData()
        console.log(paginate);
        console.log(currentPage);
    }, [currentPage])

    useEffect(() => {
        console.log(paginate);
        console.log(currentPage);
    }, [paginate])

    function getData() {
        client.query({
            query: gql`
            query {
                episodes(page:${currentPage}, filter:{name:"${inputName}"}){
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
            setVideos(response.data.episodes.results);
            console.log(response.data.episodes.results);
            setPaginate({
                count: response.data.episodes.info.count,
                next: response.data.episodes.info.next,
                pages: response.data.episodes.info.pages,
                prev: response.data.episodes.info.prev,
            });
            console.log(response.data.episodes.info);


        }).catch(error => {
            console.log(error);
        })
    }

    return (
        <Container>
            <div className="flex items-center w-full max-h-28 justify-center">
                <div className="flex justify-between gap-2 max-w-5xl w-full">
                    <Input
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
                    <Pagination>
                        <PaginationContent>
                            <PaginationItem>
                                <PaginationPrevious
                                    className="cursor-pointer hover:bg-zinc-200"
                                    onClick={() => setCurrentPage(paginate?.prev ?? Math.max(currentPage - 1, 1))}
                                />
                            </PaginationItem>
                            {paginate && Array.from({ length: paginate?.pages }, (_, index) => (
                                <PaginationItem key={index + 1}>
                                    <PaginationLink
                                        className={`cursor-pointer hover:bg-zinc-200 ${index + 1 === currentPage ? 'bg-zinc-200' : ''}`}
                                        onClick={() => setCurrentPage(index + 1)}
                                    >
                                        {index + 1}
                                    </PaginationLink>
                                </PaginationItem>
                            ))}
                            <PaginationItem>
                                <PaginationNext
                                    className="cursor-pointer hover:bg-zinc-200"
                                    onClick={() => setCurrentPage(paginate?.next ?? 1)}
                                />
                            </PaginationItem>
                        </PaginationContent>
                    </Pagination>
                </div>
            </div>
            {/* <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 justify-center items-center justify-items-center p-2 w-full max-w-7xl mx-auto ">
                {videos && videos.length > 0 && renderVideos(videos)}
            </div> */}
            <div className="max-w-5xl max-h-96 mx-auto border m-5 rounded-lg overflow-y-scroll overflow-x-hidden p-2">
                <Table>
                    <TableHeader>
                        <TableHead>ID</TableHead>
                        <TableHead>Episode</TableHead>
                        <TableHead>Name</TableHead>
                        <TableHead>Air Date</TableHead>
                        <TableHead>Characters</TableHead>
                        <TableHead>Favorite</TableHead>
                    </TableHeader>
                    <TableBody>
                        {videos && videos.length > 0 && (
                            videos.map(video => (
                                <TableRow key={video.id} onClick={() => navigate(`/episodes/${video.id}`)}>
                                    <TableCell>{video.id}</TableCell>
                                    <TableCell>{video.episode}</TableCell>
                                    <TableCell>{video.name}</TableCell>
                                    <TableCell>{video.air_date}</TableCell>
                                    <TableCell>{video.characters.length}</TableCell>
                                    <TableCell> <Star /> </TableCell>
                                </TableRow>
                            ))
                        )}
                    </TableBody>
                </Table>
            </div>
        </Container>
    )
}