import { CardEpisode } from "@/pages/Home/Home";
import { ReactNode, createContext, useState } from "react";
import toast from "react-hot-toast";

interface EpisodeContext {
    favorites: Array<CardEpisode>;
    vieweds: Array<CardEpisode>;
    favoriteEpisode: (episode: CardEpisode) => void;
    unfavoriteEpisode: (episodeId: number) => void;
    viewedEpisode: (episode: CardEpisode) => void;
}

interface EpisodeProvidrerProps {
    children: ReactNode;
}

export const EpisodeContext = createContext({} as EpisodeContext)

function EpisodeProvidrer({ children }: EpisodeProvidrerProps) {
    const [favorites, setFavorites] = useState<Array<CardEpisode>>([])
    const [vieweds, setVieweds] = useState<Array<CardEpisode>>([])

    function favoriteEpisode(episode: CardEpisode) {
        if (favorites.length >= 20) {
            toast.success('You can only favorite 20 episodes')
            return
        }
        setFavorites((prevFavorites) => [
            ...prevFavorites,
            { ...episode, favorite: true },
        ]);
        toast.success('Successfully favorited episode')
    }

    function unfavoriteEpisode(episodeId: number) {
        setFavorites((favorites) => favorites.filter((episode) => episode.id !== episodeId))
        toast.success('Successfully unfavorite episode')
    }

    function viewedEpisode(episode: CardEpisode) {
        setVieweds((prevViews) => [
            ...prevViews,
            { ...episode, viewed: true },
        ]);
    }

    return (
        <EpisodeContext.Provider value={{
            favorites,
            favoriteEpisode,
            unfavoriteEpisode,
            viewedEpisode,
            vieweds
        }}>
            {children}
        </EpisodeContext.Provider>
    )
}

export default EpisodeProvidrer