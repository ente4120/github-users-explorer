import { useState, useEffect, useMemo } from 'react'
import { useSearchParams } from 'react-router-dom'
import { fetchUsers } from '../services'
import { GitHubUser, APIError } from '../types'

const PER_PAGE_OPTIONS = [10, 25, 50, 100, 200]
const DEFAULT_PER_PAGE = 10
const MIN_PER_PAGE = 1
const MAX_PER_PAGE = 200

export function useGitHubUsers() {
  const [searchParams, setSearchParams] = useSearchParams()
  const page = Math.max(1, Number(searchParams.get('page')) || 1)
  const rawPerPage = Number(searchParams.get('per_page'))
  const perPage = rawPerPage >= MIN_PER_PAGE && rawPerPage <= MAX_PER_PAGE
    ? rawPerPage
    : DEFAULT_PER_PAGE

  const [allUsers, setAllUsers] = useState<GitHubUser[]>([])
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
          setAllUsers(data)
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
    if (next <= 1) {
      searchParams.delete('page')
      setSearchParams(searchParams)
    } else {
      setSearchParams({ page: String(next) })
    }
  }

  const setPerPage = (value: number) => {
    setFilterText('')
    const next = new URLSearchParams()
    next.set('per_page', String(value))
    setSearchParams(next)
  }

  const goNext = () => { if (!loading && hasNext) setPage(page + 1) }
  const goPrev = () => { if (!loading && page > 1) setPage(page - 1) }
  const retry = () => setRetryCount((c) => c + 1)

  const users = useMemo(() => {
    if (!filterText.trim()) return allUsers
    return allUsers.filter((u) =>
      u.login.toLowerCase().includes(filterText.toLowerCase())
    )
  }, [allUsers, filterText])

  const from = (page - 1) * perPage + 1
  const to = from + allUsers.length - 1

  return {
    users,
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
