import { productType } from '@/constants'
import { Repeat } from 'lucide-react'

interface Props {
    selectedTab: string
    setSelectedTab: (tab: string) => void
}

const HomeTabBar = ({ selectedTab, setSelectedTab }: Props) => {
    return (
        <div className="flex items-center gap-1.5 text-sm font-semibold">
            <div className="flex items-center gap-1.5">
                {productType?.map((item) => (
                    <button
                        key={item?.title}
                        className={`border border-darkColor px-4 py-1.5 md:px-6 md:py-2 rounded-full hover:bg-darkColor hover:text-white hoverEffect ${selectedTab === item.value && 'bg-darkColor text-white'}`}
                        onClick={() => setSelectedTab(item.value)}
                    >
                        {item?.title}
                    </button>
                ))}
            </div>
            <button className="border border-darkColor p-2 rounded-full hover:bg-darkColor hover:text-white hoverEffect">
                <Repeat size={18} />
            </button>
        </div>
    )
}

export default HomeTabBar
