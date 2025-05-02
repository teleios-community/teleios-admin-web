import { useEffect, useState } from 'react'

 export const useDebounce = (value: string, delay = 500) => {
  const [debounceValue, setDebounceValue] = useState(value)

  useEffect(() => {
    const handleTimer = setTimeout(() => {
      setDebounceValue(value)
    }, delay)

    return () => {
      clearTimeout(handleTimer)
    }
  }, [value, delay])

  return debounceValue
}