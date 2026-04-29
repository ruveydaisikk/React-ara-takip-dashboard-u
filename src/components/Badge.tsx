import type { VehicleStatus } from '../types/vehicle'

interface Props {
    status: VehicleStatus
}

const statusConfig = {
    aktif: { label: 'Aktif', className: 'bg-green-500/20 text-green-400 border border-green-500/30' },
    bakımda: { label: 'Bakımda', className: 'bg-yellow-500/20 text-yellow-400 border border-yellow-500/30' },
    arızalı: { label: 'Arızalı', className: 'bg-red-500/20 text-red-400 border border-red-500/30' },
}

export default function Badge({ status }: Props) {
    const config = statusConfig[status]
    return (
        <span className={`px-2 py-1 rounded-full text-xs font-medium ${config.className}`}>
            {config.label}
        </span>
    )
}