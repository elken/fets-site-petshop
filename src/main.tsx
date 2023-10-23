import { createRoot } from 'react-dom/client'
import './index.css'
import { StrictMode } from 'react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import ErrorPage from './pages/error'
import Pet, { loader as petLoader } from './pages/pet'
import Root from './pages/root'
import Index from './pages'
import AddPet from './pages/add-pet'
import Mine from './pages/mine'
import ProtectedRoute from './pages/protected-route'

const container = document.getElementById('root')

if (!container) {
    throw new Error('No container found')
}

const root = createRoot(container)
const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            retry: false
        }
    }
})

const router = createBrowserRouter([
    {
        path: '/',
        element: <Root />,
        errorElement: <ErrorPage />,
        children: [
            {
                index: true,
                element: <Index />
            },
            {
                path: 'add',
              element: <ProtectedRoute><AddPet /></ProtectedRoute>
            },
            {
                path: 'added',
                element: <ProtectedRoute><Mine /></ProtectedRoute>
            },
            {
                path: 'pet/:petId',
                loader: petLoader,
                element: <ProtectedRoute><Pet /></ProtectedRoute>
            }
        ]
    }

])

root.render(
    <StrictMode>
        <QueryClientProvider client={queryClient}>
            <RouterProvider router={router} />
            <ReactQueryDevtools initialIsOpen={false} />
        </QueryClientProvider>
    </StrictMode>
)
