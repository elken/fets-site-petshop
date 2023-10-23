import { useMutation, useQueryClient } from '@tanstack/react-query'
import styles from './card.module.css'
import { TrashIcon } from '@heroicons/react/24/outline'
import { type Pet, petstoreClient } from '../../fetsClient'
import { refetchPets } from '../../utils'
import { Link } from 'react-router-dom'

async function deletePet(pet: Pet) {
  if (!pet.id) {
    throw new Error('Pet id is required')
  }
  const response = await petstoreClient['/pet/{petId}'].delete({
    params: { petId: pet.id }
  })
  if (response.status !== 200) {
    throw new Error('Failed to delete pet')
  }
}

function Card(pet: Pet) {
  const { name, photoUrls, category } = pet
  const queryClient = useQueryClient()
  const { mutate } = useMutation({
    mutationKey: ['deletePet'],
    mutationFn: deletePet,
    onError: (error) => {
      console.error(error)
    },
    onSettled: () => {
      refetchPets(queryClient)
    }
  })
  return (
    <div className={styles.card}>
      <div className={styles.content}>
        <div className="flex justify-between">
          <h3 className={styles.title}>{name}</h3>
          <button
            className="p-2"
            onClick={() => {
              mutate(pet)
            }}
          >
            <TrashIcon className="w-6 text-red-500" />
          </button>
        </div>
        {category && (
          <div className="flex items-center text-white gap-2">
            <span>
              <b>Category:</b>
            </span>
            <span key={category.id}>{category.name}</span>
          </div>
        )}
        {typeof photoUrls === 'object' &&
          photoUrls
            ?.filter((url) => !!url && url.includes('http'))
            .map((url) => (
              <img
                key={url}
                src={url}
                alt={name}
                className="w-full h-64 object-cover rounded-md"
                loading="lazy"
              />
            ))}
        <div className={styles.callToActionContainer}>
          <Link to={`/pet/${pet.id}`} className={styles.callToActionElement}>
            See more →
          </Link>
        </div>
      </div>
    </div>
  )
}

export default Card
