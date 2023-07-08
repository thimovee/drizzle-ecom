import Link from 'next/link'
import { SignOutButton } from '@clerk/nextjs'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/Avatar"
import { Button, buttonVariants } from "@/components/ui/Button"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/DropdownMenu"
import { LogOut, LayoutDashboard, User2 } from 'lucide-react'
import { User } from '@clerk/nextjs/dist/types/server'

interface UserAccountNavProps extends React.HTMLAttributes<HTMLDivElement> {
    user: User | null
}

export function UserAccountNav({ user }: UserAccountNavProps) {
    const email =
        user?.emailAddresses?.find((e) => e.id === user.primaryEmailAddressId)
            ?.emailAddress ?? ""

    const initials = `${user?.firstName?.charAt(0) ?? ""} ${user?.lastName?.charAt(0) ?? ""
        }`

    return (
        <>
            {user ? (
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Avatar className="h-8 w-8 cursor-pointer">
                            <AvatarImage
                                src={user.imageUrl}
                                alt={user.username ?? ""}
                            />
                            <AvatarFallback>{initials}</AvatarFallback>
                        </Avatar>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="w-56" align="end" forceMount>
                        <DropdownMenuLabel className="font-normal">
                            <div className="flex flex-col space-y-1">
                                <p className="text-sm font-medium leading-none">
                                    {user.firstName} {user.lastName}
                                </p>
                                <p className="text-xs leading-none text-slate-700">
                                    {email}
                                </p>
                            </div>
                        </DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuGroup>
                            <DropdownMenuItem asChild>
                                <Link href="/dashboard">
                                    <User2
                                        className="mr-2 h-4 w-4"
                                        aria-hidden="true"
                                    />
                                    Account
                                </Link>
                            </DropdownMenuItem>
                            <DropdownMenuItem asChild>
                                <Link href="/dashboard/products">
                                    <LayoutDashboard className="mr-2 h-4 w-4" aria-hidden="true" />
                                    Dashboard
                                </Link>
                            </DropdownMenuItem>
                        </DropdownMenuGroup>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem>
                            <span className="w-full">
                                <SignOutButton>
                                    <span className="flex items-center">
                                        <LogOut className="mr-2 h-4 w-4" aria-hidden="true" />
                                        Log out
                                    </span>
                                </SignOutButton>
                            </span>
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu >
            ) : (
                <Link href="/signin">
                    <Button variant="outline">
                        Sign in
                    </Button>
                </Link>
            )
            }
        </>
    )
}