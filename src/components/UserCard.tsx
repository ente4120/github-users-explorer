import { GitHubUser } from '../types'

export function UserCard({ user }: { user: GitHubUser }) {
  return (
    <a
      href={user.html_url}
      target="_blank"
      rel="noopener noreferrer"
      className="flex items-center gap-4 px-4 py-4 bg-white border border-[#d0d7de] rounded-lg hover:border-[#0969da] hover:shadow-sm transition-all group"
    >
      <img
        src={user.avatar_url}
        alt={user.login}
        className="w-10 h-10 rounded-full border border-[#d0d7de] flex-shrink-0"
      />

      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 flex-wrap">
          <span className="font-semibold text-[#0969da] group-hover:underline text-sm">
            {user.login}
          </span>
          {user.type && (
            <span className={`px-[7px] py-px text-[11px] font-medium rounded-full border ${
              user.type === 'Organization'
                ? 'bg-[#fff8c5] border-[#d4a72c66] text-[#9a6700]'
                : 'bg-[#dafbe1] border-[#4ac26b66] text-[#116329]'
            }`}>
              {user.type}
            </span>
          )}
        </div>
        <p className="text-xs text-[#656d76] mt-0.5">github.com/{user.login}</p>
      </div>

      <svg
        className="w-4 h-4 text-[#d0d7de] group-hover:text-[#0969da] transition-colors flex-shrink-0"
        fill="none" stroke="currentColor" viewBox="0 0 24 24"
      >
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
      </svg>
    </a>
  )
}
