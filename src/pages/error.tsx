import { useRouteError } from 'react-router-dom'
import { usePetPhotos } from 'hooks/data'
import { GiphyFetch } from '@giphy/js-fetch-api'
import { useEffect, useState } from 'react'
import Navbar from 'components/navbar/navbar'

export default function ErrorPage() {
    const [image, setImage] = useState('')
    const error = useRouteError()
    const { data: photos } = usePetPhotos()

    useEffect(() => {
        async function getImage() {
            const giphyFetch = new GiphyFetch('sXpGFDGZs0Dv1mmNFvYaGUvYwKX0PWIh')
            const image = await giphyFetch.search(error?.statusText || error?.message, { limit: 1 })
            if (photos) {
                setImage(photos[Math.floor(Math.random() * photos?.length)].url)
            } else {
                setImage(image.data[0].images.original.url)
            }
        }
        void getImage()
    }, [])
    console.error(error)

    return (
        <>
            <Navbar />
            <main className="bg-dots flex flex-col items-center justify-center">
                <header>
                    <h1 className='text-6xl lg:text-7xl leading-none font-extrabold tracking-tight  mb-8 sm:mb-10 text-transparent bg-clip-text bg-gradient-to-br from-purple-400 to-purple-800 !text-red-500'>Oops!</h1>
                </header>
                <div className="max-w-screen-lg text-lg sm:text-2xl sm:leading-10 text-gray-300 font-medium mb-10 sm:mb-11">
                    <p>Sorry, an unexpected error has occurred.</p>
                    <p>
                        {error?.statusText || error?.message}
                    </p>

                    <img className="h-96 w-full object-contain p-4" src={image} />
                </div>
            </main>
        </>
    )
}
