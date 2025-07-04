export default function ExpensesLoading() {
  return (
    <div className="min-h-screen bg-black text-white">
      <header className="border-b border-white/10 bg-black/95 backdrop-blur">
        <div className="container mx-auto px-4 py-4">
          <div className="h-6 bg-white/10 rounded animate-pulse w-48"></div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {[1, 2, 3].map((i) => (
            <div key={i} className="bg-white/5 border border-white/20 rounded-lg p-6">
              <div className="h-4 bg-white/10 rounded animate-pulse mb-2"></div>
              <div className="h-8 bg-white/10 rounded animate-pulse mb-2"></div>
              <div className="h-3 bg-white/10 rounded animate-pulse w-24"></div>
            </div>
          ))}
        </div>

        <div className="bg-white/5 border border-white/20 rounded-lg p-6">
          <div className="h-6 bg-white/10 rounded animate-pulse mb-4 w-48"></div>
          <div className="space-y-4">
            {[1, 2, 3, 4, 5].map((i) => (
              <div key={i} className="h-16 bg-white/10 rounded animate-pulse"></div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
