import Card from 'components/card'
import { usePets } from 'hooks/data'

export default function Mine() {
    const { data: pets } = usePets()
    console.log(pets?.filter((pet) => pet.name && pet?.status !== 'unavailable'))
    return (
        <section className="mx-auto grid grid-cols-4 gap-4">
            {pets?.filter((pet) => pet.name && pet?.status !== 'unavailable')
                .map((props) => (
                    <div
                        key={props.name}
                        className="col-span-2 sm:col-span-1 transition hover:-translate-y-1"
                    >
                        <Card {...props} />
                    </div>
                ))}
        </section>
    )
}
