import type { Vehicle } from '../types/vehicle'

const mockVehicles: Vehicle[] = [
    { id: '1', plate: '34 BKT 392', brand: 'Ford', model: 'Transit', year: 2020, status: 'aktif', driver: 'Ahmet Yılmaz', lastService: '2024-03-12', km: 45230 },
    { id: '2', plate: '06 HRS 771', brand: 'Mercedes', model: 'Sprinter', year: 2019, status: 'bakımda', driver: 'Mehmet Kaya', lastService: '2023-11-08', km: 78540 },
    { id: '3', plate: '35 PLK 094', brand: 'Volkswagen', model: 'Crafter', year: 2021, status: 'arızalı', driver: 'Ali Demir', lastService: '2025-01-22', km: 31870 },
    { id: '4', plate: '16 ZRN 458', brand: 'Ford', model: 'Ranger', year: 2018, status: 'aktif', driver: 'Ayşe Çelik', lastService: '2024-06-30', km: 92100 },
    { id: '5', plate: '01 DKM 613', brand: 'Mercedes', model: 'Vito', year: 2022, status: 'aktif', driver: 'Fatma Şahin', lastService: '2025-03-01', km: 17650 },
    { id: '6', plate: '07 YTB 227', brand: 'Renault', model: 'Master', year: 2020, status: 'bakımda', driver: 'Hasan Arslan', lastService: '2023-09-17', km: 63420 },
    { id: '7', plate: '44 GVN 819', brand: 'Volkswagen', model: 'Transporter', year: 2023, status: 'aktif', driver: 'Zeynep Kurt', lastService: '2025-02-14', km: 12300 },
    { id: '8', plate: '58 MRT 506', brand: 'Renault', model: 'Trafic', year: 2019, status: 'arızalı', driver: 'Mustafa Öz', lastService: '2022-07-03', km: 86750 },
    { id: '9', plate: '26 SNK 341', brand: 'Toyota', model: 'HiAce', year: 2021, status: 'aktif', driver: 'Emre Doğan', lastService: '2024-11-19', km: 38900 },
    { id: '10', plate: '42 KLÇ 688', brand: 'Fiat', model: 'Ducato', year: 2020, status: 'bakımda', driver: 'Selin Aydın', lastService: '2024-08-25', km: 54600 },
    { id: '11', plate: '34 KRT 214', brand: 'Ford', model: 'Transit Custom', year: 2022, status: 'bakımda', driver: 'Burak Yıldız', lastService: '2024-09-10', km: 41200 },
    { id: '12', plate: '06 ALT 553', brand: 'Mercedes', model: 'Sprinter', year: 2021, status: 'aktif', driver: 'Derya Kılıç', lastService: '2025-01-05', km: 22300 },
    { id: '13', plate: '35 DNZ 887', brand: 'Toyota', model: 'HiAce', year: 2020, status: 'arızalı', driver: 'Serkan Polat', lastService: '2022-11-30', km: 74500 },
    { id: '14', plate: '16 MRN 129', brand: 'Fiat', model: 'Ducato', year: 2023, status: 'aktif', driver: 'Elif Arslan', lastService: '2025-03-18', km: 8900 },
    { id: '15', plate: '42 BRK 674', brand: 'Volkswagen', model: 'Crafter', year: 2019, status: 'aktif', driver: 'Tolga Çetin', lastService: '2024-07-22', km: 58700 },
]

export const fetchVehicles = (): Promise<Vehicle[]> => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (Math.random() < 0.1) {
                reject(new Error('Sunucuya bağlanılamadı.'))
            } else {
                resolve(mockVehicles)
            }
        }, 1500)
    })
}