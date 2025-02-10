'use client'
import React from 'react'
import Logo from './Logo'
import { motion } from 'motion/react'
import { Loader2 } from 'lucide-react'

const Loading = () => {
    return (
        <div className="fixed min-h-screen w-full bg-white flex items-center justify-center left-0 top-0">
            <div className="flex flex-col items-center justify-center gap-1">
                <Logo>CStore</Logo>
                <motion.div
                    animate={{ scale: [1, 1.1, 1] }}
                    transition={{ repeat: Infinity, duration: 1.5 }}
                    className="flex items-center space-x-2 text-green-800"
                >
                    <Loader2 className="animate-spin" />
                    <span className="font-semibold tracking-wide">CStore is loading...</span>
                </motion.div>
            </div>
        </div>
    )
}

export default Loading
