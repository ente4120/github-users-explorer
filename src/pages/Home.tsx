import { useGitHubUsers } from '../hooks'

export function Home() {
  const { users, loading, error, hasMore, loadMore } = useGitHubUsers()

  if (loading && users.length === 0) {
    return (
      <div className="min-h-screen bg-primary-50 dark:bg-primary-950 p-4">
        <div className="max-w-7xl mx-auto">
          <p className="text-lg text-primary-600 dark:text-primary-400">Loading users...</p>
        </div>
      </div>
    )
  }

  if (error && users.length === 0) {
    return (
      <div className="min-h-screen bg-primary-50 dark:bg-primary-950 p-4">
        <div className="max-w-7xl mx-auto">
          <p className="text-lg text-error">Error: {error.message}</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-primary-50 dark:bg-primary-950 p-4">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold text-primary-950 dark:text-primary-50 mb-8">
          GitHub Users Explorer
        </h1>

        <div className="bg-white dark:bg-primary-900 shadow rounded-lg p-6 border border-primary-200 dark:border-primary-800">
          <h2 className="text-2xl font-semibold text-primary-900 dark:text-primary-50 mb-4">
            Users List
          </h2>
          <ul className="space-y-4">
            {users.map((user) => (
              <li
                key={user.id}
                className="flex items-center gap-4 p-4 border border-primary-200 dark:border-primary-800 rounded hover:bg-primary-50 dark:hover:bg-primary-800 transition"
              >
                <img
                  src={user.avatar_url}
                  alt={user.login}
                  className="w-10 h-10 rounded-full"
                />
                <a
                  href={user.html_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-accent-700 hover:text-accent-800 dark:text-accent-500 dark:hover:text-accent-400 font-medium"
                >
                  {user.login}
                </a>
              </li>
            ))}
          </ul>

          {/* Load more button */}
          {hasMore && (
            <button
              onClick={loadMore}
              disabled={loading}
              className="mt-6 w-full px-4 py-2 bg-accent-700 hover:bg-accent-800 disabled:bg-primary-400 text-white rounded transition"
            >
              {loading ? 'Loading...' : 'Load More'}
            </button>
          )}

          {error && users.length > 0 && (
            <p className="mt-4 text-error">Error loading more: {error.message}</p>
          )}
        </div>
      </div>
    </div>
  )
}
