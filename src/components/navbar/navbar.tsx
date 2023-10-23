import Button from 'components/button'
import Logos from 'components/logos'
import { authorizeCallback, useUser } from 'hooks/auth'
import { Link, NavLink } from 'react-router-dom'

function User() {
    const { data: user } = useUser()

    if (user) {
        return (
            <div className="flex items-center">
                <img className="h-10 bg-red-200 rounded-lg border-1 border-white" src={`https://api.dicebear.com/7.x/miniavs/svg?seed=${user?.['juxt.site/user'].fullname}`} />
                <p className="text-white font-medium pt-2 pl-2">{user?.['juxt.site/user'].fullname}</p>
            </div>
        )
    } else {
        return (
            <Button onClick={authorizeCallback}>
                Login
            </Button>

        )
    }
}

export default function Navbar() {
    const { data: user } = useUser()

    return (
        <nav className="w-full z-20 fixed top-0 left-0 bg-[#111827] border-2 border-white/5">
            <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
                <Link to={'/'} className="flex items-center">
                    <Logos.Vite className="h-8 mr-3" />
                    <h3 className="text-2xl self-center font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-br from-purple-400 to-purple-800">PETS'r'US</h3>
                </Link>
                <div className="w-auto">
                    <ul className="font-medium flex flex-row space-x-8 text-white">
                        <li>
                            <NavLink
                                to={'/added'}
                                className={({ isActive }) => user ? isActive ? 'bg-blue-600/20 font-bold p-2 rounded-md' : '' : 'hidden'}
                            >Added Pets</NavLink>
                        </li>
                        <li>
                            <NavLink
                                to={'/add'}
                                className={({ isActive }) => user ? isActive ? 'bg-blue-600/20 font-bold p-2 rounded-md' : '' : 'hidden'}
                            >Add pet</NavLink>
                        </li>
                    </ul>
                </div>
                <User />
            </div>
        </nav>
    )
}
