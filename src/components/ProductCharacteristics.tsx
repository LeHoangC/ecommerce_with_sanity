import React from 'react'
import { Product } from '../../sanity.types'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from './ui/accordion'

const ProductCharacteristics = ({ product }: { product: Product }) => {
    return (
        <Accordion type="single" collapsible>
            <AccordionItem value="item-1">
                <AccordionTrigger>{product?.name}: Characteristics</AccordionTrigger>
                <AccordionContent className="flex flex-col gap-1">
                    <p className="flex items-center justify-between">
                        Brand: <span className="font-serif tracking-wide">Unknow</span>
                    </p>
                    <p className="flex items-center justify-between">
                        Collection: <span className="font-serif tracking-wide">2025</span>
                    </p>
                    <p className="flex items-center justify-between">
                        Type: <span className="font-serif tracking-wide">{product?.variant}</span>
                    </p>
                    <p className="flex items-center justify-between">
                        Stock:
                        <span className="font-serif tracking-wide">{product?.stock ? 'Avaiable' : 'Out of stock'}</span>
                    </p>
                    <p className="flex items-center justify-between">
                        Intro:
                        <span className="font-serif tracking-wide">{product?.intro}</span>
                    </p>
                </AccordionContent>
            </AccordionItem>
        </Accordion>
    )
}

export default ProductCharacteristics
