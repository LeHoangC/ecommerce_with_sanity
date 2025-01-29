import { cn } from './utils'

export function FormatPrice({ amount, className }: { amount: number | undefined; className?: string }) {
    const formatCurrency = new Intl.NumberFormat('vi-VN', {
        style: 'currency',
        currency: 'VND',
        maximumFractionDigits: 2,
    })

    return (
        <span className={cn('text-sm font-semibold text-darkColor', className)}>
            {formatCurrency.format(amount ?? 0)}
        </span>
    )
}
