export interface User {
  id: string
  nickname: string
  realName: string
  phoneNumber: string
  profileImage: string
  favoriteGenres: string[]
  joinDate: string
  status: "normal" | "warning" | "suspended"
}

export interface Playlist {
  id: string
  name: string
  description: string
  createdAt: string
  musicCount: number
  isPublic: boolean
}
