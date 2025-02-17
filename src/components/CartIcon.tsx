'use client'
import { ShoppingBag } from 'lucide-react'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import useCartStore from '../../store'

const CartIcon = () => {
    const { getGroupedItems } = useCartStore()
    const [cartCount, setCartCount] = useState(0)

    useEffect(() => {
        const cartProducts = getGroupedItems()
        setCartCount(cartProducts.length)
    }, [getGroupedItems])

    return (
        <Link href="/cart" className="group relative">
            <ShoppingBag className="w-5 h-5 group-hover:text-darkColor hoverEffect" />
            <span className="absolute -top-1 -right-1 bg-darkColor text-white h-3.5 w-3.5 rounded-full text-xs font-semibold flex items-center justify-center">
                {cartCount}
            </span>
        </Link>
    )
}

export default CartIcon
