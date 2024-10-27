"use client"
// If anyone ever reads this code, I made this last minute and was too lazy to make it proper,
// if this ever is used more than just for a workshop I will rewrite it to be proper and not
// this disgusing nonsense.

import {useState, useEffect, useRef, FormEvent} from "react"
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/components/ui/card"

export default function Component() {
  const [inputF, setInputF] = useState("")
  const [inputG, setInputG] = useState("")
  const [inputH, setInputH] = useState("")
  const [resultF, setResultF] = useState<number | null>(null)
  const [resultG, setResultG] = useState<number | null>(null)
  const [resultH, setResultH] = useState<number | null>(null)
  const inputRefF = useRef<HTMLInputElement>(null)
  const inputRefG = useRef<HTMLInputElement>(null)
  const inputRefH = useRef<HTMLInputElement>(null)

  // Gratulation, du hast die secret Funktion gefunden!
  const isPrime = (n: number) => {
    if (n <= 1) return false
    if (n <= 3) return true
    if (n % 2 === 0 || n % 3 === 0) return false
    for (let i = 5; i * i <= n; i += 6) {
      if (n % i === 0 || n % (i + 2) === 0) return false
    }
    return true
  }

  const f = (x: number) => {
    return x * x + 2 * x + 1 // f(x) = x^2 + 2x + 1
  }

  const g = (x: number) => {
    return isPrime(x - 3) ? 1 : 0
  }

  const h = (x: number) => {
    return Math.floor(Math.log2(x + 1) * 100) / 100 // f(x) = x^2 + 2x + 1
  }

  useEffect(() => {
    const numF = parseFloat(inputF)
    if (!isNaN(numF)) {
      setResultF(f(numF))
    } else {
      setResultF(null)
    }

    const numG = parseFloat(inputG)
    if (!isNaN(numG)) {
      setResultG(g(numG))
    } else {
      setResultG(null)
    }

    const numH = parseFloat(inputH)
    if (!isNaN(numH)) {
      setResultH(h(numH))
    } else {
      setResultH(null)
    }

  }, [inputF, inputG, inputH])

  useEffect(() => {
    // Auto-focus the input field when the component mounts
    if (inputRefF.current) {
      inputRefF.current.focus()
    }
  }, [])

  const enterText = (e: FormEvent<HTMLSpanElement>, set: any) => {
    if (/\s+/.test(e.currentTarget.innerText))
      e.currentTarget.innerText = e.currentTarget.innerText.replaceAll(/\s+/g, "");
    set(e.currentTarget.innerText);
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-violet-400 to-red-400 flex items-center justify-center p-4 select-none">
      <Card className="w-full max-w-md bg-white/80 backdrop-blur-sm scale-100">
        <CardHeader>
          <CardTitle className="text-3xl font-bold text-center">Function Guesser Game</CardTitle>
          <CardDescription className="text-center">
            Try to guess the function f(x), g(x) and h(x) by entering a number and see the result.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="mt-8 p-6 bg-white/50 rounded-lg">
            <div className="text-3xl sm:text-5xl md:text-5xl font-mono text-center break-words select-none">
              f(
              <span 
                contentEditable="true" 
                className="p-2 bg-gray-300 rounded-lg outline-none text-violet-600 text-3xl align-middle" 
                ref={inputRefF} 
                onInput={(e) => enterText(e, setInputF)} 
              />
              ) =
              <span className="text-violet-600 text-3xl align-middle">
                {resultF !== null ? ` ${resultF}` : " ?"}
              </span>
            </div>
          </div>
          <div className="mt-8 p-6 bg-white/50 rounded-lg">
            <div className="text-3xl sm:text-5xl md:text-5xl font-mono text-center break-words select-none">
              g(
              <span 
                contentEditable="true" 
                className="p-2 bg-gray-300 rounded-lg outline-none text-violet-600 text-3xl align-middle" 
                ref={inputRefG} 
                onInput={(e) => enterText(e, setInputG)} 
              />
              ) =
              <span className="text-violet-600 text-3xl align-middle">
                {resultG !== null ? ` ${resultG}` : " ?"}
              </span>
            </div>
          </div>
          <div className="mt-8 p-6 bg-white/50 rounded-lg">
            <div className="text-3xl sm:text-5xl md:text-5xl font-mono text-center break-words select-none">
              h(
              <span 
                contentEditable="true" 
                className="p-2 bg-gray-300 rounded-lg outline-none text-violet-600 text-3xl align-middle" 
                ref={inputRefH} 
                onInput={(e) => enterText(e, setInputH)} 
              />
              ) =
              <span className="text-violet-600 text-3xl align-middle">
                {resultH !== null ? ` ${resultH}` : " ?"}
              </span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
