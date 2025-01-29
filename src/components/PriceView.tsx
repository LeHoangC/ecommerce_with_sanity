import { FormatPrice } from '@/lib/use-price'
import { cn } from '@/lib/utils'
import React from 'react'

interface Props {
    price: number | undefined
    discount?: number
    className?: string
}

const PriceView = ({ price, discount, className }: Props) => {
    return (
        <div className="flex items-center gap-2">
            {price && discount && <FormatPrice amount={price * (1 - discount / 100)} className={className} />}
            <FormatPrice
                amount={price}
                className={discount ? cn('line-through font-medium text-zinc-500') : className}
            />
        </div>
    )
}

export default PriceView
