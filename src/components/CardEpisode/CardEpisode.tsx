import image from '@/assets/bg.jpeg'
import { Star } from 'lucide-react'

export default () => {
    return (
        <section
            className="w-[19.10rem] h-max rounded-lg p-2 select-none"
        >
            <div className='relative'>
                <img
                    src={image}
                    alt=""
                    className="hover:border-zinc-100 border-2 border-transparent p-[2px] box-border transition-all"
                    onClick={() => console.log('a')}
                />
                <div
                    onClick={() => console.log('a')}
                    className="w-5 h-min flex justify-center [&>span:nth-child(2)]:hover:visible absolute top-2 right-2"
                >
                    <Star className="cursor-pointer text-white" fill="white" />
                    <span className="bg-zinc-50 invisible select-none font-semibold absolute cursor-pointer -right-[4.5rem] rounded-lg drop-shadow p-1">Favoritar</span>
                </div>
            </div>
            <div className='flex flex-col w-full h-full ml-1'>
                <span className='font-semibold text-zinc-300 text-base'>S01E02: Lawnmowaaaaaer Dog</span>
                <span className='font-medium text-zinc-400 text-sm'>39 Characters</span>
                <span className='font-medium text-zinc-400 text-sm text-zic-900'>December 2, 2013</span>
            </div>
        </section>
    )
}