import { GitHubUser } from '../types'
import { UserCard } from './UserCard'

export function UserList({ users }: { users: GitHubUser[] }) {
  return (
    <ul className="list-none p-0 m-0 flex flex-col gap-2">
      {users.map((user) => (
        <li key={user.id}>
          <UserCard user={user} />
        </li>
      ))}
    </ul>
  )
}
