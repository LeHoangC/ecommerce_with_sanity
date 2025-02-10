'use client'

import React from 'react'
import { Button } from './ui/button'
import { Product } from '../../sanity.types'
import { cn } from '@/lib/utils'
import QuantityButtons from './QuantityButtons'
import { FormatPrice } from '@/lib/use-price'
import useCartStore from '../../store'

interface Props {
    product: Product
    className?: string
}

const AddToCartButton = ({ product, className }: Props) => {
    const { addItem, getItemCount } = useCartStore()
    const itemCount = getItemCount(product._id)
    const isOutOfStock = product?.stock === 0

    return (
        <div className="w-full">
            {itemCount ? (
                <div>
                    <div className="flex items-center justify-between">
                        <span className="text-xs text-muted-foreground">Quantity</span>
                        <QuantityButtons product={product} />
                    </div>
                    <div className="flex items-center justify-between border-t pt-1">
                        <span className="text-xs font-semibold">Subtotal</span>
                        <FormatPrice amount={(product?.price ?? 0) * itemCount} />
                    </div>
                </div>
            ) : (
                <Button
                    disabled={isOutOfStock}
                    className={cn(
                        'w-full bg-transparent text-darkColor shadow-none border border-darkColor/30 font-semibold tracking-wide hover:text-white hoverEffect',
                        className
                    )}
                    onClick={() => addItem(product)}
                >
                    Add to cart
                </Button>
            )}
        </div>
    )
}

export default AddToCartButton
