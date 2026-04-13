import { useGitHubUsers } from '../hooks'

export function Home(): JSX.Element {
  const { users, loading, error, hasMore, loadMore } = useGitHubUsers()

  if (loading && users.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 p-4">
        <div className="max-w-7xl mx-auto">
          <p className="text-lg text-gray-600">Loading users...</p>
        </div>
      </div>
    )
  }

  if (error && users.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 p-4">
        <div className="max-w-7xl mx-auto">
          <p className="text-lg text-red-600">Error: {error.message}</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold text-gray-900 mb-8">GitHub Users Explorer</h1>

        <div className="bg-white shadow rounded-lg p-6">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">Users List</h2>
          <ul className="space-y-4">
            {users.map((user) => (
              <li
                key={user.id}
                className="flex items-center gap-4 p-4 border rounded hover:bg-gray-50"
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
                  className="text-blue-600 hover:text-blue-800 font-medium"
                >
                  {user.login}
                </a>
              </li>
            ))}
          </ul>

          {/* Load more button (placeholder for infinite scroll) */}
          {hasMore && (
            <button
              onClick={loadMore}
              disabled={loading}
              className="mt-6 w-full px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:bg-gray-400"
            >
              {loading ? 'Loading...' : 'Load More'}
            </button>
          )}

          {error && users.length > 0 && (
            <p className="mt-4 text-red-600">Error loading more: {error.message}</p>
          )}
  )
}
