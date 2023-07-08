import { Github } from "lucide-react"
import Link from "next/link"

const Footer = () => {
    return (
        <footer className="border-t w-full flex justify-center gap-6">
            <p className="py-6 text-xs">© 2023 Thimove. All rights reserved</p>
            <Link target="_blank" href="$" className="p-1 bg-slate-900 rounded-md max-h-6 my-auto hover:bg-slate-600 hover:scale-105 duration-300">
                <Github className="w-4 h-4 text-white" />
            </Link>
        </footer>
    )
}

export default Footer