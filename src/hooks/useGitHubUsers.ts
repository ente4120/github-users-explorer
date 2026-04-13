import { useState, useEffect, useMemo } from 'react'
import { useSearchParams } from 'react-router-dom'
import { fetchUsers } from '../services'
import { GitHubUser, APIError } from '../types'

const PER_PAGE = 10

export function useGitHubUsers() {
  const [searchParams, setSearchParams] = useSearchParams()
  const page = Math.max(1, Number(searchParams.get('page')) || 1)

  const [allUsers, setAllUsers] = useState<GitHubUser[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<APIError | null>(null)
  const [hasNext, setHasNext] = useState(true)
  const [filterText, setFilterText] = useState('')

  useEffect(() => {
    let cancelled = false

    const load = async () => {
      try {
        setLoading(true)
        setError(null)
        const data = await fetchUsers(page)
        if (!cancelled) {
          setAllUsers(data)
          setHasNext(data.length === PER_PAGE)
        }
      } catch (err) {
        if (!cancelled) setError(err as APIError)
      } finally {
        if (!cancelled) setLoading(false)
      }
    }

    load()
    return () => { cancelled = true }
  }, [page])

  const setPage = (next: number) => {
    setFilterText('')
    if (next <= 1) {
      searchParams.delete('page')
      setSearchParams(searchParams)
    } else {
      setSearchParams({ page: String(next) })
    }
  }

  const goNext = () => { if (!loading && hasNext) setPage(page + 1) }
  const goPrev = () => { if (!loading && page > 1) setPage(page - 1) }

  const users = useMemo(() => {
    if (!filterText.trim()) return allUsers
    return allUsers.filter((u) =>
      u.login.toLowerCase().includes(filterText.toLowerCase())
    )
  }, [allUsers, filterText])

  return {
    users,
    loading,
    error,
    page,
    hasNext,
    hasPrev: page > 1,
    goNext,
    goPrev,
    filterText,
    setFilterText,
  }
}
