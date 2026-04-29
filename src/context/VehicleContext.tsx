import { createContext, useContext, useEffect, useState } from 'react'
import type { ReactNode } from 'react'
import type { Vehicle, VehicleStatus } from '../types/vehicle'
import { fetchVehicles } from '../services/mockApi'
import { useSearchParams } from 'react-router-dom'

interface Filters {
    status: VehicleStatus | 'hepsi'
    brand: string
    dateFrom: string
    dateTo: string
}

interface SortConfig {
    key: keyof Vehicle | null
    direction: 'asc' | 'desc'
}

interface VehicleContextType {
    vehicles: Vehicle[]
    loading: boolean
    error: string | null
    filters: Filters
    sortConfig: SortConfig
    selectedVehicle: Vehicle | null
    setFilters: (filters: Filters) => void
    setSortConfig: (config: SortConfig) => void
    setSelectedVehicle: (vehicle: Vehicle | null) => void
    retry: () => void
}

const VehicleContext = createContext<VehicleContextType | null>(null)

export const VehicleProvider = ({ children }: { children: ReactNode }) => {
    const [vehicles, setVehicles] = useState<Vehicle[]>([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)
    const [selectedVehicle, setSelectedVehicle] = useState<Vehicle | null>(null)
    const [searchParams, setSearchParams] = useSearchParams()

    const filters: Filters = {
        status: (searchParams.get('status') as VehicleStatus | 'hepsi') || 'hepsi',
        brand: searchParams.get('brand') || '',
        dateFrom: searchParams.get('dateFrom') || '',
        dateTo: searchParams.get('dateTo') || '',
    }

    const sortConfig: SortConfig = {
        key: (searchParams.get('sortKey') as keyof Vehicle) || null,
        direction: (searchParams.get('sortDir') as 'asc' | 'desc') || 'asc',
    }

    const setFilters = (newFilters: Filters) => {
        const params = new URLSearchParams(searchParams)
        params.set('status', newFilters.status)
        if (newFilters.brand) params.set('brand', newFilters.brand)
        else params.delete('brand')
        if (newFilters.dateFrom) params.set('dateFrom', newFilters.dateFrom)
        else params.delete('dateFrom')
        if (newFilters.dateTo) params.set('dateTo', newFilters.dateTo)
        else params.delete('dateTo')
        setSearchParams(params)
    }

    const setSortConfig = (config: SortConfig) => {
        const params = new URLSearchParams(searchParams)
        if (config.key) {
            params.set('sortKey', config.key)
            params.set('sortDir', config.direction)
        } else {
            params.delete('sortKey')
            params.delete('sortDir')
        }
        setSearchParams(params)
    }

    const loadVehicles = () => {
        setLoading(true)
        setError(null)
        fetchVehicles()
            .then(setVehicles)
            .catch((err) => setError(err.message))
            .finally(() => setLoading(false))
    }

    useEffect(() => {
        loadVehicles()
    }, [])

    return (
        <VehicleContext.Provider value={{
            vehicles, loading, error, filters, sortConfig, selectedVehicle,
            setFilters, setSortConfig, setSelectedVehicle, retry: loadVehicles,
        }}>
            {children}
        </VehicleContext.Provider>
    )
}

export const useVehicle = () => {
    const ctx = useContext(VehicleContext)
    if (!ctx) throw new Error('useVehicle must be used within VehicleProvider')
    return ctx
}