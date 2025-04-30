import Navigation from "@/components/navigation/navigation"

export default function Home() {
  return (
    <main className="min-h-screen">
      <Navigation />
      <div className="container mx-auto px-4 py-20">
        <h1 className="text-3xl font-bold">Welcome to ZVV</h1>
        <p className="mt-4">Your modern transportation solution.</p>
      </div>
    </main>
  )
}
