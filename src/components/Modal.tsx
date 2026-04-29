import { useEffect } from 'react'
import { useVehicle } from '../context/VehicleContext'
import Badge from './Badge'

export default function Modal() {
    const { selectedVehicle, setSelectedVehicle } = useVehicle()

    useEffect(() => {
        const handleEsc = (e: KeyboardEvent) => {
            if (e.key === 'Escape') setSelectedVehicle(null)
        }
        document.addEventListener('keydown', handleEsc)
        return () => document.removeEventListener('keydown', handleEsc)
    }, [setSelectedVehicle])

    if (!selectedVehicle) return null

    return (
        <div
            className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50"
            onClick={() => setSelectedVehicle(null)}
        >
            <div
                className="bg-gray-900 border border-gray-700 rounded-2xl p-8 w-full max-w-md shadow-2xl"
                onClick={(e) => e.stopPropagation()}
            >
                <div className="flex items-center justify-between mb-6">
                    <h2 className="text-xl font-bold text-white">{selectedVehicle.brand} {selectedVehicle.model}</h2>
                    <button
                        onClick={() => setSelectedVehicle(null)}
                        className="text-gray-400 hover:text-white text-2xl leading-none transition-colors"
                    >
                        ×
                    </button>
                </div>

                <div className="space-y-4">
                    <Row label="Plaka" value={selectedVehicle.plate} />
                    <Row label="Yıl" value={selectedVehicle.year.toString()} />
                    <Row label="Sürücü" value={selectedVehicle.driver} />
                    <Row label="Kilometre" value={`${selectedVehicle.km.toLocaleString('tr-TR')} km`} />
                    <Row label="Son Bakım" value={new Date(selectedVehicle.lastService).toLocaleDateString('tr-TR')} />
                    <div className="flex items-center justify-between py-2 border-b border-gray-800">
                        <span className="text-gray-400 text-sm">Durum</span>
                        <Badge status={selectedVehicle.status} />
                    </div>
                </div>
            </div>
        </div>
    )
}

function Row({ label, value }: { label: string; value: string }) {
    return (
        <div className="flex items-center justify-between py-2 border-b border-gray-800">
            <span className="text-gray-400 text-sm">{label}</span>
            <span className="text-white text-sm font-medium">{value}</span>
        </div>
    )
}