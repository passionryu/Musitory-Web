export interface MusicItem {
  id: string
  thumbnail: string
  title: string
  artist: string
  genre: string
  uploader: string
  likes: number
  timestamp: string
  comment: string
  isLiked?: boolean
  isBookmarked?: boolean
}
