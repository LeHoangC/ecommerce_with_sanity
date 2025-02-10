'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React from 'react'
import { Category } from '../../sanity.types'

const HeaderMenu = ({ categories }: { categories: Category[] }) => {
    const pathName = usePathname()
    return (
        <div className="hidden md:inline-flex w-1/3 items-center gap-5 text-sm capitalize font-semibold">
            <Link
                href="/"
                className={`hover:text-darkColor hoverEffect relative group ${pathName === '/' && 'text-darkColor'}`}
            >
                <span
                    className={`absolute -bottom-0.5 left-1/2 w-0 h-0.5 bg-darkColor hoverEffect group-hover:w-1/2 group-hover:left-0 ${
                        pathName === '/' && 'w-1/2'
                    }`}
                />
                <span
                    className={`absolute -bottom-0.5 right-1/2 w-0 h-0.5 bg-darkColor hoverEffect group-hover:w-1/2 group-hover:right-0 ${
                        pathName === '/' && 'w-1/2'
                    }`}
                />
                Home
            </Link>
            {categories?.map((item) => (
                <Link
                    key={item._id}
                    href={`/category/${item.slug?.current}`}
                    className={`hover:text-darkColor hoverEffect relative group ${
                        pathName === `/category/${item.slug?.current}` && 'text-darkColor'
                    }`}
                >
                    {item.title}
                    <span
                        className={`absolute -bottom-0.5 left-1/2 w-0 h-0.5 bg-darkColor hoverEffect group-hover:w-1/2 group-hover:left-0 ${
                            pathName === `/category/${item.slug?.current}` && 'w-1/2'
                        }`}
                    />
                    <span
                        className={`absolute -bottom-0.5 right-1/2 w-0 h-0.5 bg-darkColor hoverEffect group-hover:w-1/2 group-hover:right-0 ${
                            pathName === `/category/${item.slug?.current}` && 'w-1/2'
                        }`}
                    />
                </Link>
            ))}
        </div>
    )
}

export default HeaderMenu
