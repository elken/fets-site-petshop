import Card from 'components/card'
import { usePets } from 'hooks/data'

export default function Added() {
    const { data: pets } = usePets()

    const filteredPets = pets?.filter((pet) => pet.name && pet?.status !== 'unavailable')

    if (filteredPets?.length > 0) {
        return (
            <section className="mx-auto grid grid-cols-4 gap-4">
                {filteredPets.map((props) => (
                    <div
                        key={props.name}
                        className="col-span-2 sm:col-span-1 transition hover:-translate-y-1"
                    >
                        <Card {...props} />
                    </div>
                ))}
            </section>
        )
    } else {
        return (
            <div className="p-4 rounded-md cursor-pointer bg-white/5 text-white shadow-xl font-bold tracking-tight">
                <h1 className="text-2xl self-center font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-br from-purple-400 to-purple-800">Nobody here but us chickens!</h1>
                <p>Or not...</p>
                <p>Try adding some pets</p>
            </div>
        )
    }
}
