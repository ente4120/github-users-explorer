export function EmptyState({
  message,
  icon = '👤',
}: {
  message: string
  icon?: string
}) {
  return (
    <div className="py-10 text-center border border-[#d0d7de] rounded-md bg-white">
      <div className="text-4xl mb-3">{icon}</div>
      <p className="text-sm text-[#656d76]">{message}</p>
    </div>
  )
}
