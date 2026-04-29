export default function Skeleton() {
    return (
        <div className="animate-pulse">

            <div className="flex gap-4 mb-6">
                <div className="h-10 bg-gray-800 rounded-lg w-40" />
                <div className="h-10 bg-gray-800 rounded-lg w-40" />
                <div className="h-10 bg-gray-800 rounded-lg w-40" />
            </div>

            <div className="rounded-xl overflow-hidden border border-gray-800">
                <div className="bg-gray-800 h-12" />

                {Array.from({ length: 6 }).map((_, i) => (
                    <div key={i} className="flex gap-4 px-6 py-4 border-t border-gray-800">
                        <div className="h-4 bg-gray-800 rounded w-24" />
                        <div className="h-4 bg-gray-800 rounded w-32" />
                        <div className="h-4 bg-gray-800 rounded w-20" />
                        <div className="h-4 bg-gray-800 rounded w-16" />
                        <div className="h-4 bg-gray-800 rounded w-20" />
                    </div>
                ))}
            </div>
        </div>
    )
}