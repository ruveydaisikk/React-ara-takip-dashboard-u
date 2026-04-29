import { useVehicle, VehicleProvider } from './context/VehicleContext'
import Filters from './components/Filters'
import VehicleTable from './components/VehicleTable'
import Modal from './components/Modal'
import Skeleton from './components/Skeleton'
import ErrorScreen from './components/ErrorScreen'
import StatsCards from './components/StatsCards'

function Dashboard() {
  const { loading, error, retry } = useVehicle()

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold text-white"><span className="text-5xl">🚗</span>Filo Yönetim Dashboard</h1>
        <p className="text-gray-400 mt-1">Araç durumlarını takip edin ve filtreleyin.</p>
      </div>

      {loading && <Skeleton />}
      {error && <ErrorScreen message={error} onRetry={retry} />}
      {!loading && !error && (
        <>
          <StatsCards />
          <Filters />
          <VehicleTable />
        </>
      )}
      <Modal />
    </div>
  )
}

function App() {
  return (
    <VehicleProvider>
      <Dashboard />
    </VehicleProvider>
  )
}

export default App