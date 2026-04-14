export function Pagination({
  page,
  from,
  to,
  hasNext,
  hasPrev,
  loading,
  goNext,
  goPrev,
  itemCount,
}: {
  page: number
  from: number
  to: number
  hasNext: boolean
  hasPrev: boolean
  loading: boolean
  goNext: () => void
  goPrev: () => void
  itemCount: number
}) {
  return (
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
        {!loading && itemCount > 0 && (
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
  )
}
