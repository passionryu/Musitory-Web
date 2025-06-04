export interface MusicRecommendation {
  id: string
  thumbnail: string
  title: string
  artist: string
  recommender: string
}

export interface RecommendationPost {
  id: string
  content: string
  author: string
  timestamp: string
  recommendations: MusicRecommendation[]
}
