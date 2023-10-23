import { fetchPet } from 'hooks/data';


export async function loader({ params }): Pet {
    const pet = await fetchPet(params.petId);
    return pet;
}
