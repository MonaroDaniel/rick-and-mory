import CardCharacter from "@/components/CardEpisode/CardCharacter"
import Container from "@/components/Container/Container"
import { useTheme } from "@/components/theme-provider"
import { Input } from "@/components/ui/input"
import { client } from "@/config/client-graphql"
import { gql } from "@apollo/client"
import { useContext, useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { CardEpisode } from "../Home/Home"
import { EpisodeContext } from "@/context/EpisodeContext"

export type CharactersType = {
    id: number,
    name: string;
    species: string;
    status: string;
    image: string;
}

export default () => {
    const { id } = useParams()
    const { theme } = useTheme()
    const { viewedEpisode } = useContext(EpisodeContext)
    const navigate = useNavigate()

    const [inputName, setInputName] = useState('')

    const [dataCards, setDataCards] = useState<CardEpisode>()

    const filteredRepos = inputName.trim().length > 0
        ? dataCards?.characters.filter(character => character.name.includes(inputName))
        : dataCards?.characters

    useEffect(() => {
        getData(Number(id))
    }, [id])

    async function getData(id: number) {
        await client.query({
            query: gql`
            query {
                episode(id:${id}){
                  id,
                  name,
                  air_date,
                  episode,
                  characters{
                    id,
                    name,
                    species,
                    status,
                    image
                  }
                }
              }
              
            `
        }).then(response => {
            let { id, name, air_date, episode, characters }: CardEpisode = response.data.episode
            let currentEpisode = {
                id: id,
                name: name,
                air_date: air_date,
                episode: episode,
                characters: characters,
                favorite: false,
                viewed: false
            }
            setDataCards(currentEpisode)
            viewedEpisode(currentEpisode)
        }).catch(error => {
            navigate('/', { replace: true })
            console.log(error);
        })
    }

    return (
        <Container>
            <div style={{
                color: theme === 'dark' ? 'white' : 'black'
            }}>
                {dataCards?.episode === undefined && dataCards?.air_date === undefined && dataCards?.name === undefined ? (
                    <h1 className="flex justify-center font-black text-2xl mb-5">Carregando...</h1>
                ) : <>
                    <h1 className="flex justify-center font-black text-2xl mb-5">{dataCards?.episode}: {dataCards?.name}</h1>
                    <h1 className="flex justify-center font-black text-2xl mb-5">{dataCards?.air_date}</h1>
                </>}

            </div>
            <div className="flex justify-center items-center max-w-xl mx-auto gap-2">
                <Input
                    placeholder="Search the episode..."
                    type="text"
                    value={inputName}
                    onChange={(e) => setInputName(e.target.value)}
                />
            </div>
            <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 justify-center items-center justify-items-center p-2 w-full max-w-7xl mx-auto overflow-x-hidden">
                {dataCards && dataCards?.characters.length > 0 && (
                    filteredRepos?.map(character => (
                        <CardCharacter
                            key={character.id}
                            id={character.id.toString()}
                            image={character.image}
                            name={character.name}
                            species={character.species}
                            status={character.status}
                        />
                    ))
                )}
            </div>
        </Container >
    )
}