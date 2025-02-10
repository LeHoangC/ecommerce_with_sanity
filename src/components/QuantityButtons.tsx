import React from 'react'
import { Product } from '../../sanity.types'
import { Button } from './ui/button'
import { Minus, Plus } from 'lucide-react'
import { cn } from '@/lib/utils'
import useCartStore from '../../store'

interface Props {
    product: Product
    className?: string
}

const QuantityButtons = ({ product, className }: Props) => {
    const { addItem, getItemCount, removeItem } = useCartStore()
    const itemCount = getItemCount(product._id)

    const handleRemoveProduct = () => {
        removeItem(product._id)
    }
    return (
        <div className={cn('flex items-center gap-1 text-base', className)}>
            <Button variant="outline" size="icon" className="w-6 h-6" onClick={handleRemoveProduct}>
                <Minus />
            </Button>
            <span className="font-semibold w-8 text-center text-darkColor">{itemCount}</span>
            <Button
                variant="outline"
                size="icon"
                className="w-6 h-6"
                disabled={itemCount >= (product?.stock ?? 0)}
                onClick={() => addItem(product)}
            >
                <Plus />
            </Button>
        </div>
    )
}

export default QuantityButtons
