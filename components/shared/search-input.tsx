"use client"

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Card } from "@/components/ui/card"
import { Search, X as XIcon } from "@/lib/icons"

interface SearchResult {
  id: string
  title: string
  type: "forum" | "guide" | "event"
  description: string
}

interface SearchInputProps {
  placeholder?: string
  onSearch?: (query: string) => Promise<SearchResult[]>
}

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

export function SearchInput({ 
  placeholder = "Search guides, forums, events...",
  onSearch 
}: SearchInputProps) {
  const [query, setQuery] = useState("")
  const [results, setResults] = useState<SearchResult[]>([])
  const [isOpen, setIsOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const handleSearch = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setQuery(value)

    if (value.length > 2) {
      setIsLoading(true)
      setIsOpen(true)
      
      if (onSearch) {
        try {
          const searchResults = await onSearch(value)
          setResults(searchResults)
        } catch (error) {
          console.error("Search error:", error)
          setResults([])
        }
      } else {
        setResults([])
      }
      
      setIsLoading(false)
    } else {
      setResults([])
      setIsOpen(false)
    }
  }

  const handleClear = () => {
    setQuery("")
    setResults([])
    setIsOpen(false)
  }

  return (
    <div className="relative w-full max-w-md">
      <div className="relative">
        {/* Search Icon */}
        <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5 pointer-events-none">
          <Search />
        </div>

        {/* Input */}
        <Input
          type="text"
          placeholder={placeholder}
          value={query}
          onChange={handleSearch}
          className="pl-10 pr-10"
        />

        {/* Clear Button */}
        {query && (
          <button
            onClick={handleClear}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground p-1 transition-colors"
          >
            <div className="w-4 h-4">
              <XIcon />
            </div>
          </button>
        )}
      </div>

      {/* Search Results Dropdown */}
      {isOpen && (
        <>
          {isLoading && (
            <Card className="absolute top-full left-0 right-0 mt-2 p-4 z-50 text-center text-sm text-muted-foreground">
              Searching...
            </Card>
          )}

          {!isLoading && results.length > 0 && (
            <Card className="absolute top-full left-0 right-0 mt-2 p-0 z-50 border max-h-96 overflow-y-auto">
              {results.map((result) => (
                <a
                  key={result.id}
                  href={`/${result.type}/${result.id}`}
                  className="block px-4 py-3 hover:bg-muted/50 border-b border-border/50 last:border-b-0 transition-colors"
                >
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-sm truncate">{result.title}</p>
                      <p className="text-xs text-muted-foreground mt-1 line-clamp-2">{result.description}</p>
                    </div>
                    <span className={`text-xs px-2 py-1 rounded-full whitespace-nowrap flex-shrink-0 ${getTypeColor(result.type)}`}>
                      {result.type}
                    </span>
                  </div>
                </a>
              ))}
            </Card>
          )}

          {!isLoading && results.length === 0 && query && (
            <Card className="absolute top-full left-0 right-0 mt-2 p-4 z-50 text-center text-sm text-muted-foreground">
              No results found for "{query}"
            </Card>
          )}
        </>
      )}
    </div>
  )
}
