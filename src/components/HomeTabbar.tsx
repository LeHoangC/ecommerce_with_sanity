import { productType } from '@/constants'

interface Props {
    selectedTab: string
    setSelectedTab: (tab: string) => void
}

const HomeTabBar = ({ selectedTab, setSelectedTab }: Props) => {
    return (
        <div className="flex items-center gap-1.5 text-sm font-semibold">
            <div className="flex items-center gap-1.5">
                <button
                    className={`border border-darkColor px-4 py-1.5 md:px-6 md:py-2 rounded-full hover:bg-darkColor hover:text-white hoverEffect ${selectedTab === 'all' && 'bg-darkColor text-white'}`}
                    onClick={() => setSelectedTab('all')}
                >
                    All
                </button>
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
        </div>
    )
}

export default HomeTabBar
