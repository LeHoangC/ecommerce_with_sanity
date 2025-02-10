'use client'
import React from 'react'
import emptyCart from '@/images/emptyCart.png'
import Image from 'next/image'
import { motion } from 'motion/react'
import { ShoppingCart } from 'lucide-react'
import Link from 'next/link'

const EmptyCart = () => {
    return (
        <div className="flex items-center justify-center py-10 md:py-20 bg-gradient-to-b from-blue-50 to-white p-4">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, ease: 'easeOut' }}
                className="bg-white rounded-2xl shadow-xl p-8 max-w-md w-full space-y-8"
            >
                <motion.div
                    animate={{ scale: [1, 1.1, 1], rotate: [0, 5, -5, 0] }}
                    transition={{
                        duration: 4,
                        ease: 'easeInOut',
                        repeat: Infinity,
                    }}
                    className="w-48 h-48 mx-auto relative"
                >
                    <Image src={emptyCart} alt="empty-cart" className="drop-shadow-lg object-contain" />
                    <motion.div
                        animate={{ x: [0, -10, 10, 0], y: [0, -5, 5, 0] }}
                        transition={{ repeat: Infinity, duration: 4, ease: 'linear' }}
                        className="absolute -top-4 -right-4 bg-blue-500 rounded-full p-2"
                    >
                        <ShoppingCart size={24} className="text-white" />
                    </motion.div>
                </motion.div>
                <div className="">
                    <h2 className="text-3xl font-bold text-gray-800">Your cart is feeling lonely</h2>
                    <p className="text-gray-600">
                        Lorem, ipsum dolor sit amet consectetur adipisicing elit. Enim magni eveniet voluptatum corrupti
                        dignissimos laudantium totam ab laboriosam architecto nihil perspiciatis sint eum dolorum harum,
                        illo incidunt voluptatem soluta dolores.
                    </p>
                </div>
                <Link
                    href="/"
                    className="block text-darkColor/50 border border-darkColor/20 text-center py-2.5 rounded-full text-sm font-semibold tracking-wide hover:border-darkColor hover:bg-darkColor hover:text-white hoverEffect"
                >
                    Discover Products
                </Link>
            </motion.div>
        </div>
    )
}

export default EmptyCart
