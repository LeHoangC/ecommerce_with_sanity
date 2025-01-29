import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from './ui/tooltip'
import Link from 'next/link'
import { Github } from 'lucide-react'
import { cn } from '@/lib/utils'
interface Props {
    className?: string
    iconClassName?: string
    tooltipClassName?: string
}

const SocialMedia = ({ className, tooltipClassName, iconClassName }: Props) => {
    return (
        <TooltipProvider>
            <div className={cn('flex items-center gap-3.5', className)}>
                <Tooltip>
                    <TooltipTrigger asChild>
                        <Link
                            href="https://github.com/LeHoangC"
                            className={cn(
                                'p-2 border rounded-full hover:text-white hover:border-white hoverEffect',
                                iconClassName
                            )}
                        >
                            <Github />
                        </Link>
                    </TooltipTrigger>
                    <TooltipContent className={cn('bg-white text-darkColor font-semibold', tooltipClassName)}>
                        Github
                    </TooltipContent>
                </Tooltip>
            </div>
        </TooltipProvider>
    )
}

export default SocialMedia
