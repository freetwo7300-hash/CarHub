"use client"

import { useState, useEffect } from "react"
import { Input } from "@/components/ui/input"
import { Card } from "@/components/ui/card"

const Search = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
    />
  </svg>
)

const X = () => (
  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
  </svg>
)

interface SearchResult {
  id: string
  title: string
  type: "forum" | "guide" | "event"
  description: string
}

export default function SearchBar() {
  const [query, setQuery] = useState("")
  const [results, setResults] = useState<SearchResult[]>([])
  const [isOpen, setIsOpen] = useState(false)

  // Mock search results
  const mockResults: SearchResult[] = [
    { id: "1", title: "Oil Change Guide", type: "guide", description: "Complete oil change tutorial" },
    { id: "2", title: "Tire Rotation Discussion", type: "forum", description: "Best practices for tire rotation" },
    { id: "3", title: "Brake Workshop", type: "event", description: "Learn brake maintenance" },
    { id: "4", title: "Battery Replacement", type: "guide", description: "Step-by-step battery guide" },
    { id: "5", title: "Engine Diagnostics", type: "forum", description: "Troubleshooting engine issues" },
  ]

  useEffect(() => {
    if (query.length > 0) {
      const filtered = mockResults.filter(
        (item) =>
          item.title.toLowerCase().includes(query.toLowerCase()) ||
          item.description.toLowerCase().includes(query.toLowerCase()),
      )
      setResults(filtered)
      setIsOpen(true)
    } else {
      setResults([])
      setIsOpen(false)
    }
  }, [query])

  const getTypeColor = (type: string) => {
    switch (type) {
      case "guide":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200"
      case "forum":
        return "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200"
      case "event":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <div className="relative w-full max-w-md">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
        <Input
          type="text"
          placeholder="Search guides, forums, events..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="pl-10 pr-10 glass-effect"
        />
        {query && (
          <button
            onClick={() => {
              setQuery("")
              setIsOpen(false)
            }}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground"
          >
            <X />
          </button>
        )}
      </div>

      {/* Search Results Dropdown */}
      {isOpen && results.length > 0 && (
        <Card className="absolute top-full left-0 right-0 mt-2 p-0 z-50 glass-effect border-border animate-fade-in-up">
          <div className="max-h-96 overflow-y-auto">
            {results.map((result) => (
              <button
                key={result.id}
                className="w-full text-left px-4 py-3 hover:bg-muted/50 border-b border-border/50 last:border-b-0 transition-colors"
              >
                <div className="flex items-start justify-between gap-2">
                  <div className="flex-1">
                    <p className="font-medium text-sm">{result.title}</p>
                    <p className="text-xs text-muted-foreground mt-1">{result.description}</p>
                  </div>
                  <span className={`text-xs px-2 py-1 rounded-full whitespace-nowrap ${getTypeColor(result.type)}`}>
                    {result.type}
                  </span>
                </div>
              </button>
            ))}
          </div>
        </Card>
      )}

      {isOpen && results.length === 0 && query && (
        <Card className="absolute top-full left-0 right-0 mt-2 p-4 z-50 glass-effect border-border text-center text-sm text-muted-foreground animate-fade-in-up">
          No results found for "{query}"
        </Card>
      )}
    </div>
  )
}
