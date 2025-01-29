import { MapPin, Phone } from 'lucide-react'
import React from 'react'

interface Props {
    title: string
    subtitle: string
    icon: React.ReactNode
}

const data: Props[] = [
    {
        title: 'Visit us',
        subtitle: 'ha noi',
        icon: <MapPin className="text-gray-600 group-hover:text-darkColor transition-colors" />,
    },
    {
        title: 'Call us',
        subtitle: '0987654321',
        icon: <Phone className="text-gray-600 group-hover:text-darkColor transition-colors" />,
    },
    {
        title: '',
        subtitle: 'ha noi',
        icon: <MapPin className="text-gray-600 group-hover:text-darkColor transition-colors" />,
    },
    {
        title: 'Email us',
        subtitle: 'cstore@gmail.com',
        icon: <MapPin className="text-gray-600 group-hover:text-darkColor transition-colors" />,
    },
]

const FooterTop = () => {
    return (
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 border-b">
            {data?.map((item, index) => (
                <ContactItem key={index} icon={item?.icon} title={item?.title} subtitle={item?.subtitle} />
            ))}
        </div>
    )
}

const ContactItem = ({ icon, title, subtitle }: Props) => {
    return (
        <div className="flex items-center gap-3 group hover:bg-gray-50 p-4 transition-colors">
            {icon}
            <div className="">
                <h3 className="font-semibold text-gray-900 group-hover:text-darkColor transition-colors">{title}</h3>
                <p className="text-gray-600 text-sm mt-1 group-hover:text-gray-900 transition-colors">{subtitle}</p>
            </div>
        </div>
    )
}

export default FooterTop
