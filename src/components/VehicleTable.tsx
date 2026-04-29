import { useMemo, useState } from 'react'
import { useVehicle } from '../context/VehicleContext'
import type { Vehicle } from '../types/vehicle'
import Badge from './Badge'

const columns: { label: string; key: keyof Vehicle }[] = [
    { label: 'Plaka', key: 'plate' },
    { label: 'Marka', key: 'brand' },
    { label: 'Model', key: 'model' },
    { label: 'Yıl', key: 'year' },
    { label: 'Sürücü', key: 'driver' },
    { label: 'KM', key: 'km' },
    { label: 'Son Bakım', key: 'lastService' },
    { label: 'Durum', key: 'status' },
]

const PAGE_SIZE = 8

export default function VehicleTable() {
    const { vehicles, filters, sortConfig, setSortConfig, setSelectedVehicle } = useVehicle()
    const [currentPage, setCurrentPage] = useState(1)

    const handleSort = (key: keyof Vehicle) => {
        setSortConfig({
            key,
            direction: sortConfig.key === key && sortConfig.direction === 'asc' ? 'desc' : 'asc',
        })
        setCurrentPage(1)
    }

    const filtered = useMemo(() => {
        return vehicles.filter((v) => {
            if (filters.status !== 'hepsi' && v.status !== filters.status) return false
            if (filters.brand && v.brand !== filters.brand) return false
            if (filters.dateFrom && v.lastService < filters.dateFrom) return false
            if (filters.dateTo && v.lastService > filters.dateTo) return false
            return true
        })
    }, [vehicles, filters])

    const sorted = useMemo(() => {
        if (!sortConfig.key) return filtered
        return [...filtered].sort((a, b) => {
            const aVal = a[sortConfig.key!]
            const bVal = b[sortConfig.key!]
            if (aVal < bVal) return sortConfig.direction === 'asc' ? -1 : 1
            if (aVal > bVal) return sortConfig.direction === 'asc' ? 1 : -1
            return 0
        })
    }, [filtered, sortConfig])

    const totalPages = Math.ceil(sorted.length / PAGE_SIZE)
    const paginated = sorted.slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE)

    const SortIcon = ({ colKey }: { colKey: keyof Vehicle }) => {
        if (sortConfig.key !== colKey) return <span className="text-gray-600 ml-1">↕</span>
        return <span className="text-blue-400 ml-1">{sortConfig.direction === 'asc' ? '↑' : '↓'}</span>
    }

    return (
        <div>
            <div className="rounded-xl overflow-hidden border border-gray-800">
                <table className="w-full text-sm">
                    <thead className="bg-gray-800 text-gray-400">
                        <tr>
                            {columns.map((col) => (
                                <th
                                    key={col.key}
                                    onClick={() => handleSort(col.key)}
                                    className="px-4 py-3 text-left cursor-pointer hover:text-white transition-colors select-none"
                                >
                                    {col.label}
                                    <SortIcon colKey={col.key} />
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {paginated.length === 0 ? (
                            <tr>
                                <td colSpan={8} className="text-center py-12 text-gray-500">
                                    Filtreye uyan araç bulunamadı.
                                </td>
                            </tr>
                        ) : (
                            paginated.map((vehicle) => (
                                <tr
                                    key={vehicle.id}
                                    onClick={() => setSelectedVehicle(vehicle)}
                                    className="border-t border-gray-800 hover:bg-gray-800/50 cursor-pointer transition-colors"
                                >
                                    <td className="px-4 py-3 text-white font-mono">{vehicle.plate}</td>
                                    <td className="px-4 py-3 text-gray-300">{vehicle.brand}</td>
                                    <td className="px-4 py-3 text-gray-300">{vehicle.model}</td>
                                    <td className="px-4 py-3 text-gray-300">{vehicle.year}</td>
                                    <td className="px-4 py-3 text-gray-300">{vehicle.driver}</td>
                                    <td className="px-4 py-3 text-gray-300">{vehicle.km.toLocaleString('tr-TR')}</td>
                                    <td className="px-4 py-3 text-gray-300">
                                        {new Date(vehicle.lastService).toLocaleDateString('tr-TR')}
                                    </td>
                                    <td className="px-4 py-3">
                                        <Badge status={vehicle.status} />
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>

            {totalPages > 1 && (
                <div className="flex items-center justify-between mt-4 text-sm text-gray-400">
                    <span>{sorted.length} araçtan {(currentPage - 1) * PAGE_SIZE + 1}–{Math.min(currentPage * PAGE_SIZE, sorted.length)} arası gösteriliyor</span>
                    <div className="flex gap-2">
                        <button
                            onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
                            disabled={currentPage === 1}
                            className="px-3 py-1 rounded-lg border border-gray-700 hover:bg-gray-800 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                        >
                            ← Önceki
                        </button>
                        {Array.from({ length: totalPages }).map((_, i) => (
                            <button
                                key={i}
                                onClick={() => setCurrentPage(i + 1)}
                                className={`px-3 py-1 rounded-lg border transition-colors ${currentPage === i + 1
                                    ? 'bg-blue-600 border-blue-600 text-white'
                                    : 'border-gray-700 hover:bg-gray-800'
                                    }`}
                            >
                                {i + 1}
                            </button>
                        ))}
                        <button
                            onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
                            disabled={currentPage === totalPages}
                            className="px-3 py-1 rounded-lg border border-gray-700 hover:bg-gray-800 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                        >
                            Sonraki →
                        </button>
                    </div>
                </div>
            )}
        </div>
    )
}