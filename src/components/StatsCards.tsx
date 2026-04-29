import { useVehicle } from '../context/VehicleContext'
import type { VehicleStatus } from '../types/vehicle'

export default function StatsCards() {
    const { vehicles, filters, setFilters } = useVehicle()

    const total = vehicles.length
    const aktif = vehicles.filter((v) => v.status === 'aktif').length
    const bakimda = vehicles.filter((v) => v.status === 'bakımda').length
    const arizali = vehicles.filter((v) => v.status === 'arızalı').length

    const handleClick = (status: VehicleStatus | 'hepsi') => {
        setFilters({ ...filters, status: filters.status === status ? 'hepsi' : status })
    }

    const cards = [
        { label: 'Toplam Araç', value: total, icon: '🚗', status: 'hepsi' as const, className: 'border-blue-500/30 bg-blue-500/10 hover:bg-blue-500/20', activeClass: 'ring-2 ring-blue-500' },
        { label: 'Aktif', value: aktif, icon: '✅', status: 'aktif' as const, className: 'border-green-500/30 bg-green-500/10 hover:bg-green-500/20', activeClass: 'ring-2 ring-green-500' },
        { label: 'Bakımda', value: bakimda, icon: '🔧', status: 'bakımda' as const, className: 'border-yellow-500/30 bg-yellow-500/10 hover:bg-yellow-500/20', activeClass: 'ring-2 ring-yellow-500' },
        { label: 'Arızalı', value: arizali, icon: '❌', status: 'arızalı' as const, className: 'border-red-500/30 bg-red-500/10 hover:bg-red-500/20', activeClass: 'ring-2 ring-red-500' },
    ]

    return (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            {cards.map((card) => (
                <div
                    key={card.label}
                    onClick={() => handleClick(card.status)}
                    className={`rounded-xl border p-4 flex items-center gap-4 cursor-pointer transition-all ${card.className} ${filters.status === card.status ? card.activeClass : ''}`}
                >
                    <span className="text-3xl">{card.icon}</span>
                    <div>
                        <p className="text-gray-400 text-xs">{card.label}</p>
                        <p className="text-white text-2xl font-bold">{card.value}</p>
                    </div>
                </div>
            ))}
        </div>
    )
}