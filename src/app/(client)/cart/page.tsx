'use client'
import Loading from '@/components/Loading'
import React, { useEffect, useState } from 'react'
import useCartStore from '../../../../store'
import { useAuth } from '@clerk/nextjs'
import Container from '@/components/Container'
import NoAccessToCart from '@/components/NoAccessToCart'
import EmptyCart from '@/components/EmptyCart'
import { Heart, ShoppingBag, Trash } from 'lucide-react'
import Image from 'next/image'
import { urlFor } from '@/sanity/lib/image'
import Link from 'next/link'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'
import { FormatPrice } from '@/lib/use-price'
import QuantityButtons from '@/components/QuantityButtons'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import paypalLogo from '@/images/paypalLogo.png'

const CartPage = () => {
    const [isClient, setIsClient] = useState(false)

    const { deleteCartProduct, getTotalPrice, getItemCount, getSubTotalPrice, resetCart, getGroupedItems } =
        useCartStore()
    const { isSignedIn } = useAuth()

    useEffect(() => {
        setIsClient(true)
    }, [])

    const cartProducts = getGroupedItems()

    const handleDeleteProduct = (productId: string) => {
        deleteCartProduct(productId)
    }

    const handleResetCart = () => {
        const isConfirmed = confirm('Are you sure you want to reset the cart?')
        if (isConfirmed) {
            resetCart()
        }
    }

    if (!isClient) return <Loading />

    return (
        <div className="bg-gray-50 pb-52 md:pb-10">
            {isSignedIn ? (
                <Container>
                    {cartProducts?.length ? (
                        <>
                            <div className="flex items-center gap-2 py-5">
                                <ShoppingBag />
                                <h1 className="text-2xl font-semibold">Shopping cart</h1>
                            </div>
                            <div className="grid lg:grid-cols-3 md:gap-8">
                                <div className="lg:col-span-2 rounded-lg">
                                    <div className="border bg-white rounded-md">
                                        {cartProducts?.map(({ product }) => {
                                            const itemCount = getItemCount(product._id)
                                            return (
                                                <div
                                                    key={product._id}
                                                    className="border-b p-2.5 last:border-b-0 flex items-center justify-between gap-5"
                                                >
                                                    <div className="flex flex-1 items-center gap-2 h-36 md:h-44">
                                                        {product?.images && (
                                                            <Link
                                                                href={`/product/${product?.slug?.current}`}
                                                                className="border p-0.5 md:p-1 mr-2 rounded-md overflow-hidden group"
                                                            >
                                                                <Image
                                                                    src={urlFor(product.images[0]).url()}
                                                                    alt="productImage"
                                                                    width={500}
                                                                    height={500}
                                                                    loading="lazy"
                                                                    className="w-32 md:w-40 h-32 md:h-40 object-cover group-hover:scale-105 overflow-hidden hoverEffect"
                                                                />
                                                            </Link>
                                                        )}
                                                        <div className="h-full flex flex-1 items-start flex-col justify-between py-1">
                                                            <div className="space-y-1.5">
                                                                <h2 className="font-semibold line-clamp-1">
                                                                    {product?.name}
                                                                </h2>
                                                                <p className="text-sm text-lightColor font-medium">
                                                                    {product?.intro}
                                                                </p>
                                                                <p className="text-sm capitalize">
                                                                    Variant:{' '}
                                                                    <span className="font-semibold">
                                                                        {product?.variant}
                                                                    </span>
                                                                </p>
                                                                <p className="text-sm capitalize">
                                                                    Status:{' '}
                                                                    <span className="font-semibold">
                                                                        {product?.status}
                                                                    </span>
                                                                </p>
                                                            </div>
                                                            <div className="text-gray-500 flex items-center gap-2">
                                                                <TooltipProvider>
                                                                    <Tooltip>
                                                                        <TooltipTrigger>
                                                                            <Heart className="w-4 h-4 md:w-5 md:h-5 hover:text-green-600 hoverEffect" />
                                                                        </TooltipTrigger>
                                                                        <TooltipContent className="font-bold">
                                                                            Add to wishlist
                                                                        </TooltipContent>
                                                                    </Tooltip>
                                                                    <Tooltip>
                                                                        <TooltipTrigger>
                                                                            <Trash
                                                                                className="w-4 h-4 md:w-5 md:h-5 hover:text-red-600 hoverEffect"
                                                                                onClick={() =>
                                                                                    handleDeleteProduct(product._id)
                                                                                }
                                                                            />
                                                                        </TooltipTrigger>
                                                                        <TooltipContent className="font-bold">
                                                                            Delete from cart
                                                                        </TooltipContent>
                                                                    </Tooltip>
                                                                </TooltipProvider>
                                                            </div>
                                                        </div>
                                                        <div className="flex flex-col items-start justify-between h-36 md:h-44 p-0.5 md:p-1">
                                                            <FormatPrice
                                                                amount={(product?.price as number) * itemCount}
                                                                className="font-bold text-lg"
                                                            />
                                                            <QuantityButtons product={product} />
                                                        </div>
                                                    </div>
                                                </div>
                                            )
                                        })}
                                        <Button
                                            className="m-5 font-semibold"
                                            variant="destructive"
                                            onClick={handleResetCart}
                                        >
                                            Reset Cart
                                        </Button>
                                    </div>
                                </div>
                                <div className="lg:col-span-1">
                                    <div className="hidden md:inline-block w-full bg-white p-6 rounded-lg border">
                                        <h2 className="text-xl font-semibold mb-4">Order Sumary</h2>
                                        <div className="space-y-4">
                                            <div className="flex justify-between">
                                                <span>Subtotal</span>
                                                <FormatPrice amount={getSubTotalPrice()} />
                                            </div>
                                            <div className="flex justify-between">
                                                <span>Discount</span>
                                                <FormatPrice amount={getSubTotalPrice() - getTotalPrice()} />
                                            </div>
                                            <Separator />
                                            <div className="flex justify-between">
                                                <span>Total</span>
                                                <FormatPrice
                                                    amount={getTotalPrice()}
                                                    className="text-lg font-bold text-black"
                                                />
                                            </div>
                                            <Button className="w-full rounded-full font-semibold tracking-wide">
                                                Proceed to checkout
                                            </Button>
                                            <Link
                                                href="/"
                                                className="flex items-center justify-center py-2 border border-darkColor/50 rounded-full hover:border-darkColor hover:bg-darkColor/5 hoverEffect"
                                            >
                                                <Image src={paypalLogo} alt="paypal" className="w-20" />
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                                <div className="md:hidden fixed bottom-0 left-0 w-full bg-white pt-2">
                                    <div className="p-4 rounded-lg border mx-4">
                                        <h2 className="text-xl font-semibold mb-4">Order Sumary</h2>
                                        <div className="space-y-4">
                                            <div className="flex justify-between">
                                                <span>Subtotal</span>
                                                <FormatPrice amount={getSubTotalPrice()} />
                                            </div>
                                            <div className="flex justify-between">
                                                <span>Discount</span>
                                                <FormatPrice amount={getSubTotalPrice() - getTotalPrice()} />
                                            </div>
                                            <Separator />
                                            <div className="flex justify-between">
                                                <span>Total</span>
                                                <FormatPrice
                                                    amount={getTotalPrice()}
                                                    className="text-lg font-bold text-black"
                                                />
                                            </div>
                                            <Button className="w-full rounded-full font-semibold tracking-wide">
                                                Proceed to checkout
                                            </Button>
                                            <Link
                                                href="/"
                                                className="flex items-center justify-center py-2 border border-darkColor/50 rounded-full hover:border-darkColor hover:bg-darkColor/5 hoverEffect"
                                            >
                                                <Image src={paypalLogo} alt="paypal" className="w-20" />
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </>
                    ) : (
                        <EmptyCart />
                    )}
                </Container>
            ) : (
                <NoAccessToCart />
            )}
        </div>
    )
}

export default CartPage
