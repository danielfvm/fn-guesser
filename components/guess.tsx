"use client"

import {useState, useEffect, useRef, FormEvent} from "react"
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/components/ui/card"

export default function Component() {
  const [input, setInput] = useState("")
  const [result, setResult] = useState<number | null>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  // Gratulation, du hast die secret Funktion gefunden!
  const secretFunction = (x: number) => {
    return x * x + 2 * x + 1 // f(x) = x^2 + 2x + 1
  }

  useEffect(() => {
    const num = parseFloat(input)
    if (!isNaN(num)) {
      setResult(secretFunction(num))
    } else {
      setResult(null)
    }
  }, [input])

  useEffect(() => {
    // Auto-focus the input field when the component mounts
    if (inputRef.current) {
      inputRef.current.focus()
    }
  }, [])

  const enterText = (e: FormEvent<HTMLSpanElement>) => {
    if (/\s+/.test(e.currentTarget.innerText))
      e.currentTarget.innerText = e.currentTarget.innerText.replaceAll(/\s+/g, "");
    setInput(e.currentTarget.innerText);
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-violet-400 to-red-400 flex items-center justify-center p-4 select-none">
      <Card className="w-full max-w-md bg-white/80 backdrop-blur-sm scale-150">
        <CardHeader>
          <CardTitle className="text-3xl font-bold text-center">Function Guesser Game</CardTitle>
          <CardDescription className="text-center">
            Try to guess the function f(x) by entering a number and see the result.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="mt-8 p-6 bg-white/50 rounded-lg">
            <div className="text-3xl sm:text-5xl md:text-5xl font-mono text-center break-words">
              f(
              <span 
                contentEditable="true" 
                className="p-1 rounded-lg outline-none text-violet-600 text-3xl align-middle" 
                ref={inputRef} 
                onInput={(e) => enterText(e)} 
                onBlur={() => setTimeout(() => inputRef.current?.focus(), 1)}
              />
              ) =
              <span className="text-violet-600 text-3xl align-middle">
                {result !== null ? ` ${result}` : " ?"}
              </span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
