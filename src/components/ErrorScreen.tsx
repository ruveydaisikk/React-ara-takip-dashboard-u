interface Props {
    message: string
    onRetry: () => void
}

export default function ErrorScreen({ message, onRetry }: Props) {
    return (
        <div className="flex flex-col items-center justify-center py-24 gap-4">
            <div className="text-red-400 text-6xl">⚠️</div>
            <h2 className="text-xl font-semibold text-white">Bir hata oluştu</h2>
            <p className="text-gray-400 text-sm">{message}</p>
            <button
                onClick={onRetry}
                className="mt-2 px-6 py-2 bg-blue-600 hover:bg-blue-500 text-white text-sm font-medium rounded-lg transition-colors"
            >
                Tekrar Dene
            </button>
        </div>
    )
}