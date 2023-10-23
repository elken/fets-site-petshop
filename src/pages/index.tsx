import { useUser } from 'hooks/auth'
import { usePetPhotos } from 'hooks/data'

function LoginMessage() {
  const { data: user } = useUser()

  if (user) {
    return <p className="pt-2">Now that you've logged in, you can view pets you've previously ordered and order a new pet using the navigation above.</p>
  } else {
    return <p className="pt-2">First, you need to log in using the "Login" button in the top right</p>
  }
}

function InfoBox({ children }) {
    const { data: photos } = usePetPhotos()

    return (
        <div className="p-4 rounded-md cursor-pointer bg-white/5 text-white shadow-xl font-bold tracking-tight">
            <div className="flex items-center gap-4">
                <img
                    className="h-48 object-cover rounded-md"
                    src={photos?.sort(() => 0.5 - Math.random())[0].url}
                    alt="Image of a pet"
                />
                <div className="flex flex-col">
                    {children}
                </div>
            </div>
        </div>
    )
}

export default function Index() {
    return (
        <div className="flex gap-8 items-center justify-center">
            <InfoBox>
                <h3 className="mb-3 text-2xl self-center font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-br from-purple-400 to-purple-800">Welcome to the Site Petshop demo</h3>

                <p>The following app is a demo of the functionality provided by the petshop API included as a base.</p>
                <LoginMessage />
            </InfoBox>
        </div>
    )
}
