import { useState, useEffect, useMemo } from 'react'
import { useSearchParams } from 'react-router-dom'
import { fetchUsers } from '../services'
import { GitHubUser, APIError } from '../types'

const PER_PAGE_OPTIONS = [10, 25, 50, 100, 200]
const DEFAULT_PER_PAGE = 10
const MIN_PER_PAGE = 1
const MAX_PER_PAGE = 200

/**
 * Custom hook for fetching and managing GitHub users.
 *
 * State variables follow the spec: sources, filteredSources, loading, filterText.
 * `filteredSources` is derived from `sources` via useMemo rather than useState —
 * storing derived state in useState requires a useEffect to keep it in sync,
 * which React explicitly discourages (see: you-might-not-need-an-effect).
 *
 * The hook is also compatible with virtual/infinite scroll — `hasNext` signals
 * whether more data is available and `goNext` fetches the next page.
 * To switch to infinite scroll: accumulate pages in `sources` instead of
 * replacing, and call `goNext` on scroll-to-bottom instead of a button click.
 */
export function useGitHubUsers() {
  const [searchParams, setSearchParams] = useSearchParams()
  const page = Math.max(1, Number(searchParams.get('page')) || 1)
  const rawPerPage = Number(searchParams.get('per_page'))
  const perPage = rawPerPage >= MIN_PER_PAGE && rawPerPage <= MAX_PER_PAGE
    ? rawPerPage
    : DEFAULT_PER_PAGE

  const [sources, setSources] = useState<GitHubUser[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<APIError | null>(null)
  const [hasNext, setHasNext] = useState(true)
  const [filterText, setFilterText] = useState('')
  const [retryCount, setRetryCount] = useState(0)

  useEffect(() => {
    let cancelled = false

    const load = async () => {
      try {
        setLoading(true)
        setError(null)
        const data = await fetchUsers(page, perPage)
        if (!cancelled) {
          setSources(data)
          setHasNext(data.length === perPage)
        }
      } catch (err) {
        if (!cancelled) setError(err as APIError)
      } finally {
        if (!cancelled) setLoading(false)
      }
    }

    load()
    return () => { cancelled = true }
  }, [page, perPage, retryCount])

  const setPage = (next: number) => {
    setFilterText('')
    setSearchParams(prev => {
      const params = new URLSearchParams(prev)
      if (next <= 1) {
        params.delete('page')
      } else {
        params.set('page', String(next))
      }
      return params
    })
  }

  const setPerPage = (value: number) => {
    setFilterText('')
    setSearchParams(prev => {
      const params = new URLSearchParams(prev)
      params.set('per_page', String(value))
      params.delete('page')
      return params
    })
  }

  const goNext = () => { if (!loading && hasNext) setPage(page + 1) }
  const goPrev = () => { if (!loading && page > 1) setPage(page - 1) }
  const retry = () => setRetryCount((c) => c + 1)

  // Derived from sources — useMemo is preferred over useState + useEffect for derived state
  const filteredSources = useMemo(() => {
    if (!filterText.trim()) return sources
    return sources.filter((u) =>
      u.login.toLowerCase().includes(filterText.toLowerCase())
    )
  }, [sources, filterText])

  const from = (page - 1) * perPage + 1
  const to = from + sources.length - 1

  return {
    users: filteredSources,
    loading,
    error,
    page,
    hasNext,
    hasPrev: page > 1,
    goNext,
    goPrev,
    perPage,
    setPerPage,
    perPageOptions: PER_PAGE_OPTIONS,
    from,
    to,
    retry,
    filterText,
    setFilterText,
  }
}
