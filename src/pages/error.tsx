import { useRouteError } from 'react-router-dom'
import styles from '../app/app.module.css'
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
            <main id="error-page" className={`${styles.main} flex flex-col place-items-center pt-24`}>
                <header className={styles.header}>
                    <h1 className={`${styles.headerTitle} !text-red-500`}>Oops!</h1>
                </header>
                <div className={styles.headerDescription}>
                    <p>Sorry, an unexpected error has occurred.</p>
                    <p>
                        {error?.statusText || error?.message}
                    </p>

                    <img
                        className="h-96 w-full object-contain p-4"
                        src={image} />

                    <p>Hopefully this makes up for it!</p>

                </div>
            </main>
        </>
    )
}
