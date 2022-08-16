import { useEffect, useState } from "react"

export default function useFetch<T>(url: string, options?: object) {
  const [data, dataUpdater] = useState<T | []>([])
  const [error, errorUpdater] = useState(false)
  const [loading, loadingUpdater] = useState(false)
  /* i am using object here as initial value because it is (reference type) so when i call it:
  refetch({})
  state value well change because it is not the same object in memory
  */
  const [shouldRefetch, refetch] = useState({})

  useEffect(() => {
    ;(async () => {
      try {
        loadingUpdater(true)
        const res = await fetch(url, options)
        const comingData = await res.json()
        dataUpdater(comingData)
        loadingUpdater(false)
      } catch (error: any) {
        errorUpdater(error)
      }
    })()
  }, [url, shouldRefetch, options])

  return { data, error, loading, refetch }
}
