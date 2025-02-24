"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import Link from "next/link"

export default function DINCalculator() {
  const [height, setHeight] = useState("")
  const [weight, setWeight] = useState("")
  const [bootLength, setBootLength] = useState("")
  const [skiingLevel, setSkiingLevel] = useState("")
  const [din, setDin] = useState<number | null>(null)

  const calculateDIN = () => {
    const heightCm = Number.parseFloat(height)
    const weightKg = Number.parseFloat(weight)
    const bootLengthMm = Number.parseFloat(bootLength)

    if (isNaN(heightCm) || isNaN(weightKg) || isNaN(bootLengthMm) || !skiingLevel) {
      alert("Please fill in all fields with valid numbers.")
      return
    }

    // This is a simplified DIN calculation for demonstration purposes
    // In a real-world scenario, you'd need a more complex algorithm that takes into account
    // the skier's weight, height, boot sole length, and skiing type more accurately

    let skierCode = 0

    // Determine skier code based on weight and height
    if (weightKg < 30) skierCode = 1
    else if (weightKg < 40) skierCode = 2
    else if (weightKg < 50) skierCode = 3
    else if (weightKg < 60) skierCode = 4
    else if (weightKg < 70) skierCode = 5
    else if (weightKg < 80) skierCode = 6
    else skierCode = 7

    // Adjust skier code based on height
    if (heightCm > 180) skierCode += 1

    // Adjust skier code based on skiing level
    if (skiingLevel === "advanced") skierCode += 1
    else if (skiingLevel === "expert") skierCode += 2

    // Calculate DIN based on skier code and boot length
    let calculatedDIN = (skierCode * bootLengthMm) / 250

    // Adjust DIN based on skiing level
    if (skiingLevel === "beginner") calculatedDIN *= 0.85
    else if (skiingLevel === "expert") calculatedDIN *= 1.15

    setDin(Math.round(calculatedDIN * 10) / 10) // Round to 1 decimal place
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">DIN Calculator</h1>
      <div className="grid gap-4 max-w-sm">
        <div>
          <Label htmlFor="height">Height (cm)</Label>
          <Input
            id="height"
            type="number"
            value={height}
            onChange={(e) => setHeight(e.target.value)}
            placeholder="Enter height in cm"
          />
        </div>
        <div>
          <Label htmlFor="weight">Weight (kg)</Label>
          <Input
            id="weight"
            type="number"
            value={weight}
            onChange={(e) => setWeight(e.target.value)}
            placeholder="Enter weight in kg"
          />
        </div>
        <div>
          <Label htmlFor="boot-length">Boot Sole Length (mm)</Label>
          <Input
            id="boot-length"
            type="number"
            value={bootLength}
            onChange={(e) => setBootLength(e.target.value)}
            placeholder="Enter boot sole length in mm"
          />
        </div>
        <div>
          <Label htmlFor="skiing-level">Skiing Level</Label>
          <Select onValueChange={setSkiingLevel}>
            <SelectTrigger id="skiing-level">
              <SelectValue placeholder="Select skiing level" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="beginner">Beginner</SelectItem>
              <SelectItem value="intermediate">Intermediate</SelectItem>
              <SelectItem value="advanced">Advanced</SelectItem>
              <SelectItem value="expert">Expert</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <Button onClick={calculateDIN}>Calculate DIN</Button>
        {din !== null && <div className="text-lg font-semibold">Recommended DIN setting: {din}</div>}
        <Link href="/" className="text-blue-500 hover:underline">
          Back to Home
        </Link>
      </div>
    </div>
  )
}

