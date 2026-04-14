export function FilterInput({
  value,
  onChange,
  placeholder = 'Filter by username...',
}: {
  value: string
  onChange: (value: string) => void
  placeholder?: string
}) {
  return (
    <div className="relative">
      <input
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full px-3 py-[5px] text-sm rounded-md border border-[#d0d7de] bg-white text-[#1f2328] placeholder-[#8c959f] focus:outline-none focus:border-[#0969da] focus:ring-[3px] focus:ring-[#0969da]/20 transition-colors"
      />
      {value && (
        <button
          onClick={() => onChange('')}
          className="absolute inset-y-0 right-0 pr-3 flex items-center text-sm text-[#8c959f] hover:text-[#1f2328] transition-colors"
          aria-label="Clear filter"
        >
          ✕
        </button>
      )}
    </div>
  )
}
