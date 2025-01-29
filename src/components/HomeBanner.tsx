import React from 'react'
import Title from './Title'

const HomeBanner = () => {
    return (
        <div className="flex flex-col justify-center items-center gap-5">
            <Title className="text-3xl md:text-4xl uppercase font-bold text-center">Best Clothing Collection</Title>
            <p className="text-sm text-center text-lightColor/80 font-medium max-w-[480px]">
                Lorem ipsum dolor sit, amet consectetur adipisicing elit. Eaque vel suscipit ducimus adipisci.
            </p>
        </div>
    )
}

export default HomeBanner
