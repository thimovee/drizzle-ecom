import { UserProfile } from "@clerk/nextjs"
import React from 'react'

const page = async () => {


    return (
        <div className="mx-auto md:mx-0">
            <div className="flex flex-col gap-2">
                <h1 className="font-bold text-3xl">Account</h1>
                <p className='text-slate-400'>Manage your account settings.</p>
            </div>
            <UserProfile
                appearance={{
                    variables: {
                        borderRadius: "0.25rem",
                        fontSize: "1.25rem",
                    },

                    elements: {
                        scrollBox: "max-w-screen sm:max-w-md md:max-w-xl lg:max-w-3xl",
                        pageScrollBox: "p-2 sm:p-0 max-w-screen sm:max-w-md md:max-w-xl lg:max-w-3xl",
                        card: "shadow-none max-w-screen sm:max-w-md md:max-w-xl lg:max-w-3xl",
                        profileSection__danger: "hidden",
                        navbar: "hidden",
                        navbarMobileMenuButton: "hidden",
                        headerTitle: "hidden",
                        headerSubtitle: "hidden",
                    },
                }}
            />
        </div>
    )
}

export default page