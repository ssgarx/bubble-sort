import React, { useState } from "react"

export default function Index() {
  // State declarations
  const [array, setArray] = useState<number[]>([])
  const [inputValue, setInputValue] = useState<string>("")
  const [isSorted, setIsSorted] = useState<boolean>(false)
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false)

  const buttonClasses =
    "bg-zinc-900 px-8 py-2 rounded-md border active:opacity-70 hover:opacity-90 border-zinc-700"

  // Function to handle bubble sort step
  const handleBubbleSort = () => {
    const arr = [...array]
    let sorted = true
    for (let i = 0; i < arr.length - 1; i++) {
      if (arr[i] > arr[i + 1]) {
        ;[arr[i], arr[i + 1]] = [arr[i + 1], arr[i]]
        sorted = false
        break // Exit loop after first swap
      }
    }
    setArray(arr)
    setIsSorted(sorted)
    // Alert when sorting is complete
    if (sorted) {
      alert("Array is completely sorted!")
    }
  }

  // Function to handle input submission
  const handleSubmit = () => {
    if (!inputValue) {
      alert("Enter numbers separated by commas")
      return
    }
    const numbers = inputValue.split(",").map((num) => parseInt(num.trim(), 10))
    setArray(numbers)
    setIsSubmitted(true)
  }

  // Function to reset the state
  const handleReset = () => {
    setArray([])
    setInputValue("")
    setIsSorted(false)
    setIsSubmitted(false)
  }

  // Calculate the maximum value for dynamic height scaling
  const maxValue = array.length > 0 ? Math.max(...array) : 0

  return (
    <div className="flex flex-col w-screen h-screen justify-center items-center">
      <div className="min-w-[40rem] space-y-16 p-10 bg-zinc-950 rounded-md border border-zinc-700 shadow-cyan-500/10 shadow-lg">
        {!isSubmitted ? renderForm() : renderSortDeck()}
      </div>
    </div>
  )

  function renderForm() {
    return (
      <div className="space-y-4">
        <label className="block mb-2 text-xs dark:text-zinc-200 font-medium">
          Enter numbers separated by commas
        </label>
        <input
          type="text"
          className="border border-gray-300 text-white text-sm block w-full p-2.5 dark:bg-zinc-900 dark:border-zinc-950 rounded-md"
          placeholder="1,4,5,6,7"
          value={inputValue}
          autoFocus
          onChange={(e) => setInputValue(e.target.value)}
        />
        <div className="flex justify-end items-center">
          <button onClick={handleSubmit} className={buttonClasses}>
            Start Sorting
          </button>
        </div>
      </div>
    )
  }

  function renderSortDeck() {
    return (
      <>
        <div className="flex justify-between items-end w-full space-x-4 h-64 ">
          {array.map((num, index) => (
            <div
              key={index}
              className="bg-cyan-400 w-full border border-black animate-loadFadeUp flex justify-center items-center text-xl font-bold text-zinc-700"
              style={{ height: `${(num / maxValue) * 100}%` }}
            >
              {num}
            </div>
          ))}
        </div>
        <div className="flex justify-end w-full space-x-4">
          <button
            className={buttonClasses}
            onClick={handleBubbleSort}
            disabled={isSorted}
          >
            Step Sort
          </button>
          <button onClick={handleReset} className={buttonClasses}>
            Reset
          </button>
        </div>
      </>
    )
  }
}
