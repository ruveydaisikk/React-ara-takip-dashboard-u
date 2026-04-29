export type VehicleStatus = 'aktif' | 'bakımda' | 'arızalı'

export interface Vehicle {
    id: string
    plate: string
    brand: string
    model: string
    year: number
    status: VehicleStatus
    driver: string
    lastService: string
    km: number
}