import { useState, useEffect, useRef } from 'react'
import { fetchUsers } from '../services'
import { GitHubUser, APIError } from '../types'

const PER_PAGE = 10

export function useGitHubUsers() {
  const [users, setUsers] = useState<GitHubUser[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<APIError | null>(null)
  const [hasMore, setHasMore] = useState(true)
  const pageRef = useRef(1)

  // Helper function to fetch a page
  const fetchPage = async (page: number, append: boolean = false) => {
    try {
      setLoading(true)
      setError(null)
      const data = await fetchUsers(page)

      if (append) {
        setUsers((prev) => [...prev, ...data])
      } else {
        setUsers(data)
      }

      setHasMore(data.length === PER_PAGE)
      pageRef.current = page
    } catch (err) {
      setError(err as APIError)
      setHasMore(false)
    } finally {
      setLoading(false)
    }
  }

  // Initial load
  useEffect(() => {
    fetchPage(1)
  }, [])

  // Load more users (for infinite scroll)
  const loadMore = async () => {
    if (loading || !hasMore) return
    fetchPage(pageRef.current + 1, true)
  }

  return {
    users,
    loading,
    error,
    hasMore,
    loadMore,
  }
}
