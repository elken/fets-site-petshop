import { CubeTransparentIcon } from '@heroicons/react/24/outline'
import { useQueryClient } from '@tanstack/react-query'
import Button from 'components/button'
import { useAddPet, usePetPhotos } from 'hooks/data'
import { useContext, useState } from 'react'
import { refetchPets } from '../utils'
import { RootContext } from './root'

export default function AddPet() {
    const { showNotification } = useContext(RootContext)

    const queryClient = useQueryClient()
    const { data: photos } = usePetPhotos()

    const { mutate, isError, error } = useAddPet()

    const [petName, setPetName] = useState('')
    const [petPhoto, setPetPhoto] = useState('')
    const [category, setCategory] = useState('Dogs')
    const categories = ['Dogs', 'Cats', 'Birds', 'Fish', 'Reptiles']

    function addPet() {
        mutate({
            name: petName,
            category: {
                name: category,
                id: category
            },
            photoUrls: petPhoto ? [petPhoto] : undefined
        })
        refetchPets(queryClient)
        showNotification('success', `You have added ${petName}!`)
        setPetName('')
        setPetPhoto('')
        setCategory(categories[0])
    }

    return (
        <div>
            <header>
                <div className="my-4 text-lg sm:text-2xl sm:leading-10 text-gray-300 font-medium">
                    Do you like pets? Well buy them here!
                </div>
            </header>
            <section className="mx-auto">
                <div className="flex flex-col w-fit gap-2">
                    <input
                        placeholder="Pet Name"
                        className="border-2 border-gray-500 rounded-md bg-gray-700 text-white"
                        type="text"
                        value={petName}
                        onChange={(e) => {
                            setPetName(e.target.value)
                        }}
                    />
                    <select
                        placeholder="Type of Pet"
                        className="border-2 border-gray-500 rounded-md bg-gray-700 text-white"
                        value={category}
                        onChange={(e) => {
                            setCategory(e.target.value)
                        }}
                    >
                        {categories.map((category) => (
                            <option key={category} value={category}>
                                {category}
                            </option>
                        ))}
                    </select>

                    <div className="grid grid-cols-5 max-h-[32rem] gap-5 overflow-y-auto">
                        {photos?.map(photo => {
                            const active = petPhoto === photo.url
                            return <figure
                                key={photo.id}
                                onClick={(_) => {
                                    setPetName(photo.title)
                                    setPetPhoto(photo.url)
                                }}
                                className={`${active ? 'bg-blue-500/20' : 'bg-white/5'} p-2 rounded-md cursor-pointer transition hover:-translate-y-1 hover:bg-white/10`}>
                                <img
                                    className="object-cover h-48 w-full p-2"
                                    src={photo.url} />
                                <figcaption className="font-bold text-blue-500 pt-2">{photo.title}</figcaption>
                            </figure>
                        })}
                    </div>
                    <Button onClick={addPet}>
                        <p>Add a new pet</p>
                    </Button>
                    {isError && (
                        <div className="flex items-center gap-2">
                            <CubeTransparentIcon className="w-6 h-6 text-red-500" />
                            <span className="text-red-500">
                                Failed to add pet - {error?.message}
                            </span>
                        </div>
                    )}
                </div>
            </section>

        </div>
    )
}
