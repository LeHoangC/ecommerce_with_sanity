/* eslint-disable react-hooks/exhaustive-deps */
'use client'
import React, { useEffect, useState } from 'react'
import { Category, Product } from '../../sanity.types'
import { Button } from './ui/button'
import { client } from '@/sanity/lib/client'
import { AnimatePresence, motion } from 'motion/react'
import ProductCard from './ProductCard'
import NoProductAvailable from './NoProductAvailable'

interface Props {
    categories: Category[]
    slug: string
}

const CategoryProducts = ({ categories, slug }: Props) => {
    const [currentCategory, setCurrentCategory] = useState(slug)
    const [products, setProducts] = useState<Product[]>([])
    const [loading, setLoading] = useState(false)

    const fetchProducts = async (categorySlug: string) => {
        setLoading(true)
        const query = `*[_type == 'product' && references(*[_type == 'category' && slug.current == '${currentCategory}']._id)] | order(name asc)`
        const data = await client.fetch(query, { categorySlug })
        setProducts(data)
        setLoading(false)
    }

    useEffect(() => {
        fetchProducts(currentCategory)
    }, [currentCategory])

    return (
        <div className="py-5 flex flex-col md:flex-row items-start gap-5">
            <div className="flex flex-col md:min-w-40 border">
                {categories?.map((item) => (
                    <Button
                        key={item._id}
                        className={`bg-transparent border-0 rounded-none text-darkColor shadow-none hover:bg-darkColor/80 hover:text-white font-semibold hoverEffect border-b last:border-b-0 ${item?.slug?.current === currentCategory && 'bg-darkColor text-white'}`}
                        onClick={() => setCurrentCategory(item?.slug?.current ?? currentCategory)}
                    >
                        {item.title}
                    </Button>
                ))}
            </div>
            <div className="">
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
                            <NoProductAvailable selectedTab={currentCategory} />
                        )}
                    </>
                )}
            </div>
        </div>
    )
}

export default CategoryProducts
