function getNature() {
    const natures = [
        'Adamant',
        'Bashful',
        'Bold',
        'Brave',
        'Calm',
        'Careful',
        'Docile',
        'Gentle',
        'Hardy',
        'Hasty',
        'Impish',
        'Jolly',
        'Lax',
        'Lonely',
        'Mild',
        'Modest',
        'Naive',
        'Naughty',
        'Quiet',
        'Quirky',
        'Rash',
        'Relaxed',
        'Sassy',
        'Serious',
        'Timid'
    ]

  return natures[Math.floor(Math.random() * natures.length)]
}

function getFacts(name: string) {
  const facts = [
    `${name} is an expert at hand-to-hand combat despite not having hands`,
    `${name} has climbed Mt. Everest`,
    `${name} has won the Oscar for Best Picture a total of 5 times!`,
    `The Pope once met ${name} and blessed them`,
    `In 1975, ${name} was pivotal in launching the Viking 1 probe towards Mars`,
    `${name} loves being scratched just behind the ears`,
    `${name} is very cuddly`,
    `The owner of ${name} cannot get enough of them`,
    `After being the first pet into space, ${name} also ran for governer of Florida`
  ]

  return facts.sort(() => 0.5 - Math.random()).slice(0, 5)
}

export default function PetInfo({ pet }) {
    return (
        <div className="bg-white/5 rounded-md shadow-xl">
            <div className="flex flex-col p-2">
                <h3 className="text-2xl font-bold text-blue-500">
                    {pet.name}
                </h3>
                <div className="flex items-center p-4">
                    <img
                        className="h-96 object-contain rounded-md shadow-xl"
                        src={pet.photoUrls[0]}
                        loading="lazy"
                        alt={`Image of ${pet.name}`} />
                    <ul className="text-white tracking-wide text-xl px-6">
                        <li>Breed: {pet.category.name}</li>
                        <li>Nature: {getNature()}</li>
                        <li className="pt-2">
                            <ul className="list-disc">
                                {getFacts(pet.name).map(fact => <li key={btoa(fact)}>{fact}</li>)}
                            </ul>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    )
}
