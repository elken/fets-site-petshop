import Logos from 'components/logos';
import { User } from './navbar';


export default function Navbar() {
    return (
        <nav className="fixed w-full z-20 top-0 left-0">
            <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
                <a href={'/'} className="flex items-center">
                    <Logos.Vite className="h-8 mr-3" />
                    <h3 className="text-2xl self-center font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-br from-purple-400 to-purple-800">PETS'r'US</h3>
                </a>
                <div className="w-auto">
                    <ul className="font-medium flex flex-row flex-row space-x-8">
                        <li>
                            <a href={'/mine'}>Your Pets</a>
                        </li>
                        <li>
                            <a href={'/order'}>Order pet</a>
                        </li>
                    </ul>
                </div>
                <User />

            </div>
        </nav>
    );
}
