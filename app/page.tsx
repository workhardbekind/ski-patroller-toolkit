import Link from "next/link"
import { Calculator, Thermometer } from "lucide-react"

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <h1 className="text-4xl font-bold mb-8">Ski Patroller Toolkit</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Link
          href="/din-calculator"
          className="flex flex-col items-center justify-center p-6 bg-blue-100 rounded-lg hover:bg-blue-200 transition-colors"
        >
          <Calculator className="w-12 h-12 mb-2" />
          <span className="text-lg font-semibold">DIN Calculator</span>
        </Link>
        <Link
          href="/wet-bulb-calculator"
          className="flex flex-col items-center justify-center p-6 bg-green-100 rounded-lg hover:bg-green-200 transition-colors"
        >
          <Thermometer className="w-12 h-12 mb-2" />
          <span className="text-lg font-semibold">Wet Bulb Calculator</span>
        </Link>
      </div>
    </main>
  )
}

