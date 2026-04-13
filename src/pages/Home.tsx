import { useGitHubUsers } from '../hooks'
import { FilterInput, UserList, EmptyState, LoadingSpinner } from '../components'

export function Home() {
  const {
    users, loading, error,
    page, hasNext, hasPrev, goNext, goPrev,
    perPage, setPerPage,
    from, to,
    filterText, setFilterText,
  } = useGitHubUsers()

  return (
    <div className="min-h-screen bg-[#f6f8fa]">
      {/* Navbar */}
      <header className="bg-[#24292f] sticky top-0 z-10">
        <div className="max-w-screen-lg mx-auto px-4 h-14 flex items-center gap-3">
          <svg width="28" height="28" viewBox="0 0 24 24" className="fill-white flex-shrink-0" aria-hidden="true">
            <circle cx="14.5" cy="7" r="3" opacity="0.6" />
            <path d="M14.5 12c-2.1 0-4 .9-5.3 2.3A6.96 6.96 0 0 0 14.5 16c1.5 0 2.9-.5 4-1.3A6.55 6.55 0 0 0 14.5 12z" opacity="0.6" />
            <circle cx="9.5" cy="8" r="3.2" />
            <path d="M9.5 13C6.46 13 4 15.46 4 18.5V19h11v-.5C15 15.46 12.54 13 9.5 13z" />
          </svg>
          <span className="text-white font-semibold text-sm whitespace-nowrap">
            GitHub Users Explorer
          </span>
        </div>
      </header>

      {/* Content */}
      <main className="max-w-screen-lg mx-auto px-4 py-6">
        <div className="flex items-baseline gap-2 mb-3">
          <h2 className="text-xl font-semibold text-[#1f2328]">GitHub Users</h2>
          {!loading && users.length > 0 && filterText && (
            <span className="text-sm text-[#656d76]">
              {users.length} result{users.length !== 1 ? 's' : ''}
            </span>
          )}
        </div>

        {/* Filter + per page */}
        <div className="mb-4 flex items-center gap-3">
          <div className="flex-1">
            <FilterInput value={filterText} onChange={setFilterText} />
          </div>

          <div className="flex items-center gap-1.5 flex-shrink-0">
            <label className="text-xs text-[#656d76] whitespace-nowrap">Per page</label>
            <select
              value={perPage}
              onChange={(e) => setPerPage(Number(e.target.value))}
              className="px-2 py-[5px] text-sm text-[#24292f] bg-white border border-[#d0d7de] rounded-md focus:outline-none focus:border-[#0969da] transition-colors cursor-pointer"
            >
              {[10, 25, 50, 100, 200].map((n) => (
                <option key={n} value={n}>{n}</option>
              ))}
            </select>
          </div>
        </div>

        {loading && <LoadingSpinner />}

        {!loading && error && (
          <div className="p-4 rounded-md border border-[#ffebe9] bg-[#fff8f8] text-[#82071e] text-sm">
            ⚠️ {error.message}
          </div>
        )}

        {!loading && users.length > 0 && <UserList users={users} />}

        {!loading && users.length === 0 && filterText && (
          <EmptyState message={`No results for "${filterText}"`} icon="🔍" />
        )}

        {/* Pagination */}
        {!filterText && (
          <div className="mt-4 flex items-center justify-between">
            <button
              onClick={goPrev}
              disabled={!hasPrev || loading}
              className="flex items-center gap-1 px-3 py-[5px] text-sm font-medium text-[#24292f] bg-white border border-[#d0d7de] rounded-md hover:bg-[#f3f4f6] disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              Previous
            </button>

            <div className="flex items-center gap-1.5 text-sm text-[#656d76]">
              <span className="font-medium text-[#1f2328]">Page {page}</span>
              {!loading && users.length > 0 && (
                <>
                  <span>·</span>
                  <span>items {from}–{to}</span>
                </>
              )}
            </div>

            <button
              onClick={goNext}
              disabled={!hasNext || loading}
              className="flex items-center gap-1 px-3 py-[5px] text-sm font-medium text-[#24292f] bg-white border border-[#d0d7de] rounded-md hover:bg-[#f3f4f6] disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
            >
              Next
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        )}
      </main>
    </div>
  )
}
