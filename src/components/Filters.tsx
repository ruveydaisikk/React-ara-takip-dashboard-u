import { useVehicle } from '../context/VehicleContext'
import type { VehicleStatus } from '../types/vehicle'

const brands = ['Hepsi', 'Ford', 'Mercedes', 'Volkswagen', 'Renault', 'Toyota', 'Fiat']
const statuses: { label: string; value: VehicleStatus | 'hepsi' }[] = [
    { label: 'Hepsi', value: 'hepsi' },
    { label: 'Aktif', value: 'aktif' },
    { label: 'Bakımda', value: 'bakımda' },
    { label: 'Arızalı', value: 'arızalı' },
]

export default function Filters() {
    const { filters, setFilters } = useVehicle()

    return (
        <div className="flex flex-wrap gap-4 mb-6">
            <select
                value={filters.status}
                onChange={(e) => setFilters({ ...filters, status: e.target.value as VehicleStatus | 'hepsi' })}
                className="bg-gray-800 text-white text-sm px-4 py-2 rounded-lg border border-gray-700 focus:outline-none focus:border-blue-500"
            >
                {statuses.map((s) => (
                    <option key={s.value} value={s.value}>{s.label}</option>
                ))}
            </select>

            <select
                value={filters.brand}
                onChange={(e) => setFilters({ ...filters, brand: e.target.value === 'Hepsi' ? '' : e.target.value })}
                className="bg-gray-800 text-white text-sm px-4 py-2 rounded-lg border border-gray-700 focus:outline-none focus:border-blue-500"
            >
                {brands.map((b) => (
                    <option key={b} value={b}>{b}</option>
                ))}
            </select>

            <input
                type="date"
                value={filters.dateFrom}
                onChange={(e) => setFilters({ ...filters, dateFrom: e.target.value })}
                className="bg-gray-800 text-white text-sm px-4 py-2 rounded-lg border border-gray-700 focus:outline-none focus:border-blue-500"
            />
            <input
                type="date"
                value={filters.dateTo}
                onChange={(e) => setFilters({ ...filters, dateTo: e.target.value })}
                className="bg-gray-800 text-white text-sm px-4 py-2 rounded-lg border border-gray-700 focus:outline-none focus:border-blue-500"
            />

            <button
                onClick={() => setFilters({ status: 'hepsi', brand: '', dateFrom: '', dateTo: '' })}
                className="px-4 py-2 text-sm text-gray-400 hover:text-white border border-gray-700 rounded-lg transition-colors"
            >
                Temizle
            </button>
        </div>
    )
}