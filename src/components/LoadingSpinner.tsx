export function LoadingSpinner() {
  return (
    <div className="flex items-center justify-center py-10 gap-2 text-sm text-[#656d76]">
      <span className="w-4 h-4 border-2 border-[#d0d7de] border-t-[#0969da] rounded-full animate-spin" />
      Loading users…
    </div>
  )
}
