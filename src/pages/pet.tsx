import { useLoaderData } from 'react-router-dom'
import { fetchPet } from 'hooks/data'
import { type Pet } from 'src/fetsClient'
import PetInfo from 'components/pet-info/pet-info'

export async function loader({ params }): Promise<Pet> {
  const pet = await fetchPet(params.petId)
  return pet
}

export default function PetView() {
    const pet = useLoaderData()

    return <PetInfo key={btoa(pet.name)} pet={pet} />
}
