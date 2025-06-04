export interface MusicItem {
  id: string
  title: string
  artist: string
  genre: string
  thumbnail?: string
  likes: number
  uploader: string
  timestamp: string // Ensure this is always a string in ISO format
  comment: string
  isLiked?: boolean
  isBookmarked?: boolean
}
