import { cn } from '@/lib/utils'
import React from 'react'
import { motion } from 'motion/react'
import { Loader2 } from 'lucide-react'

const NoProductAvailable = ({ selectedTab, className }: { selectedTab: string; className?: string }) => {
    return (
        <div
            className={cn(
                'flex flex-col items-center justify-center min-h-80 space-y-4 text-center bg-gray-100 rounded-lg w-full mt-10',
                className
            )}
        >
            <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
                <h2 className="text-2xl font-bold text-gray-800">No Product Availabel</h2>
            </motion.div>
            <motion.p className="text-gray-600">
                Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ratione repellat omnis corrupti reprehenderit
                quaerat quis modi unde neque! Sequi, molestiae!
            </motion.p>
            <motion.div
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ repeat: Infinity, duration: 1.5 }}
                className="flex items-center space-x-2 text-blue-600"
            >
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>Lorem ipsum dolor sit amet consectetur. {selectedTab}</span>
            </motion.div>
        </div>
    )
}

export default NoProductAvailable
