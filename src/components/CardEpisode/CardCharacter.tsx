import { useState } from 'react';
import { useTheme } from '../theme-provider'

interface CardEpisodeProps {
    id: string;
    name: string;
    image: string;
    status: string;
    species: string;
}

export default ({ id, name, image, status, species }: CardEpisodeProps) => {

    const { theme } = useTheme()

    const [loadImages, setLoadImages] = useState<string[]>()

    function handleImageLoad(id: string) {
        setLoadImages((prevImageLoaded) => [...prevImageLoaded || [], id])
      }

    return (
        <section
            className="w-max h-max rounded-lg p-2 select-none"
        >
            <div
                className="w-[19.15rem] h-[19.15rem] rounded-lg bg-slate-200"
                style={{
                    display: loadImages?.includes(id) ? 'none' : 'block'
                }}
            ></div>
            <img
                src={image}
                alt={name}
                onLoad={() => handleImageLoad(id)}
                className={`w-[19.15rem] h-[19.15rem] rounded-xl ${theme === 'dark' ? 'hover:border-zinc-100' : 'hover:border-zinc-900'} border-[3px] border-transparent p-[2px] object-cover box-border transition-all`}
                style={{
                    display: loadImages?.includes(id) ? 'block' : 'none'
                }}
            />
            <div className='flex gap-2'>
                <div className='flex flex-col w-full h-full ml-1'
                    style={{
                        color: theme === 'dark' ? 'white' : 'black'
                    }}
                >
                    <span className='font-semibold text-xl'>{name}</span>
                    <span className='font-medium text-lg'>{status} - {species}</span>
                </div>
            </div>
        </section>
    )
}