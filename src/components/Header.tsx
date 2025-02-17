import React from 'react'
import HeaderMenu from './HeaderMenu'
import Logo from './Logo'
import Container from './Container'
import MobileMenu from './MobileMenu'
import SearchBar from './SearchBar'
import CartIcon from './CartIcon'
import { currentUser } from '@clerk/nextjs/server'
import { ClerkLoaded, SignedIn, SignInButton, UserButton } from '@clerk/nextjs'
import Link from 'next/link'
import { ListOrdered } from 'lucide-react'
import { getAllCategories } from '@/sanity/helpers/queries'

const Header = async () => {
    const user = await currentUser()
    const categories = await getAllCategories()
    return (
        <header className="bg-white border-b border-b-gray-400 py-5 sticky top-0 z-50">
            <Container className="flex items-center justify-between gap-7 text-lightColor">
                <HeaderMenu categories={categories} />
                <div className="w-auto md:w-1/3 flex items-center justify-center gap-2.5">
                    <MobileMenu />
                    <Logo>CStore</Logo>
                </div>
                <div className="w-auto md:w-1/3 flex items-center justify-end gap-5">
                    <SearchBar />
                    <CartIcon />
                    <ClerkLoaded>
                        <SignedIn>
                            <Link href="/orders" className="group relative mt-1">
                                <ListOrdered className="w-6 h-6 group-hover:text-darkColor hoverEffect" />
                            </Link>
                            <UserButton />
                        </SignedIn>
                        {!user && (
                            <SignInButton mode="modal">
                                <button className="text-sm font-semibold hover:text-darkColor hoverEffect">
                                    Login
                                </button>
                            </SignInButton>
                        )}
                    </ClerkLoaded>
                </div>
            </Container>
        </header>
    )
}

export default Header
