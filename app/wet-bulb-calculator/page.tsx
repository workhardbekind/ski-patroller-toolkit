"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import Link from "next/link"

export default function WetBulbCalculator() {
  const [temperature, setTemperature] = useState("")
  const [humidity, setHumidity] = useState("")
  const [wetBulbTemp, setWetBulbTemp] = useState<number | null>(null)

  const calculateWetBulbTemp = () => {
    const T = Number.parseFloat(temperature)
    const RH = Number.parseFloat(humidity)

    if (isNaN(T) || isNaN(RH)) {
      alert("Please enter valid numbers for temperature and humidity.")
      return
    }

    // This is a simplified wet bulb temperature calculation
    // For more accurate results, you'd need a more complex algorithm
    const wetBulb =
      T * Math.atan(0.151977 * Math.pow(RH + 8.313659, 0.5)) +
      Math.atan(T + RH) -
      Math.atan(RH - 1.676331) +
      0.00391838 * Math.pow(RH, 1.5) * Math.atan(0.023101 * RH) -
      4.686035

    setWetBulbTemp(Math.round(wetBulb * 10) / 10) // Round to 1 decimal place
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Wet Bulb Temperature Calculator</h1>
      <div className="grid gap-4 max-w-sm">
        <div>
          <Label htmlFor="temperature">Temperature (°C)</Label>
          <Input
            id="temperature"
            type="number"
            value={temperature}
            onChange={(e) => setTemperature(e.target.value)}
            placeholder="Enter temperature"
          />
        </div>
        <div>
          <Label htmlFor="humidity">Relative Humidity (%)</Label>
          <Input
            id="humidity"
            type="number"
            value={humidity}
            onChange={(e) => setHumidity(e.target.value)}
            placeholder="Enter humidity"
          />
        </div>
        <Button onClick={calculateWetBulbTemp}>Calculate Wet Bulb Temperature</Button>
        {wetBulbTemp !== null && <div className="text-lg font-semibold">Wet Bulb Temperature: {wetBulbTemp}°C</div>}
        <Link href="/" className="text-blue-500 hover:underline">
          Back to Home
        </Link>
      </div>
    </div>
  )
}

