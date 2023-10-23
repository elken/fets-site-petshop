import { useUser } from 'hooks/auth'
import { Navigate } from 'react-router-dom'

export default function ProtectedRoute({ children }) {
    const { data: user } = useUser()

    if (user) {
        return children
    } else {
        return <Navigate to='/' replace />
    }
}
