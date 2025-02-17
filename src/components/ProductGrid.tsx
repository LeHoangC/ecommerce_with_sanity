'use client'
import React, { useEffect, useState } from 'react'
import HomeTabBar from './HomeTabbar'
import { client } from '@/sanity/lib/client'
// import { productType } from '@/constants'
import { Product } from '../../sanity.types'
import ProductCard from './ProductCard'
import NoProductAvailable from './NoProductAvailable'
import { AnimatePresence, motion } from 'motion/react'

const ProductGrid = () => {
    const [selectedTab, setSelectedTab] = useState('all')
    const [products, setProducts] = useState<Product[]>([])
    const [loading, setLoading] = useState(false)

    const query =
        selectedTab === 'all'
            ? `*[_type == 'product'] | order(name asc)`
            : `*[_type == 'product' && variant == '${selectedTab}'] | order(name asc)`
    const params = { variant: selectedTab }

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true)
            try {
                const response = await client.fetch(query, params)
                setProducts(await response)
            } catch (error) {
                console.log('Fetching data error', error)
            } finally {
                setLoading(false)
            }
        }
        fetchData()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [selectedTab])

    return (
        <div className="mt-10 flex flex-col items-center">
            <HomeTabBar selectedTab={selectedTab} setSelectedTab={setSelectedTab} />
            {loading ? (
                <>Loading...</>
            ) : (
                <>
                    {products.length ? (
                        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 mt-10 w-full">
                            {products.map((item) => (
                                <AnimatePresence key={item._id}>
                                    <motion.div
                                        layout
                                        initial={{ opacity: 0.2 }}
                                        animate={{ opacity: 1 }}
                                        exit={{ opacity: 0 }}
                                    >
                                        <ProductCard product={item} />
                                    </motion.div>
                                </AnimatePresence>
                            ))}
                        </div>
                    ) : (
                        <NoProductAvailable selectedTab={selectedTab} />
                    )}
                </>
            )}
        </div>
    )
}

export default ProductGrid
