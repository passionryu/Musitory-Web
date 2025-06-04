interface MusicItem {
  id: string
  title: string
  artist: string
  genre: string
  thumbnail: string
  likes: number
  uploader: string
  timestamp: string
  comment: string
}

const mockRecentMusic: MusicItem[] = [
  {
    id: "1",
    title: "Blinding Lights",
    artist: "The Weeknd",
    genre: "Pop",
    thumbnail: "/placeholder.svg?height=60&width=60",
    likes: 250,
    uploader: "TheWeekndFan",
    timestamp: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(), // 1 day ago
    comment: "신나는 멜로디가 인상적인 곡이에요. 드라이브할 때 들으면 좋아요!",
  },
  {
    id: "2",
    title: "Shape of You",
    artist: "Ed Sheeran",
    genre: "Pop",
    thumbnail: "/placeholder.svg?height=60&width=60",
    likes: 300,
    uploader: "EdSheeranLover",
    timestamp: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(), // 3 days ago
    comment: "언제 들어도 질리지 않는 명곡이죠. 기타 선율이 너무 좋아요.",
  },
  {
    id: "3",
    title: "Bohemian Rhapsody",
    artist: "Queen",
    genre: "Rock",
    thumbnail: "/placeholder.svg?height=60&width=60",
    likes: 400,
    uploader: "QueenForever",
    timestamp: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(), // 7 days ago
    comment: "전설적인 밴드 Queen의 대표곡! 웅장함과 드라마틱함이 느껴져요.",
  },
  {
    id: "4",
    title: "Hotel California",
    artist: "Eagles",
    genre: "Rock",
    thumbnail: "/placeholder.svg?height=60&width=60",
    likes: 280,
    uploader: "EaglesFan",
    timestamp: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString(), // 10 days ago
    comment: "기타 솔로가 정말 인상적인 곡. Eagles의 감성을 느낄 수 있어요.",
  },
  {
    id: "5",
    title: "Kill Bill",
    artist: "SZA",
    genre: "R&B",
    thumbnail: "/placeholder.svg?height=60&width=60",
    likes: 140,
    uploader: "SZALover",
    timestamp: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000).toISOString(), // 14 days ago
    comment: "SZA의 감성적인 보컬이 돋보이는 곡이에요. 사랑 이별의 복잡한 감정을 잘 표현했어요.",
  },
  {
    id: "6",
    title: "thank u, next",
    artist: "Ariana Grande",
    genre: "Pop",
    thumbnail: "/placeholder.svg?height=60&width=60",
    likes: 180,
    uploader: "ArianaFan123",
    timestamp: new Date(Date.now() - 20 * 24 * 60 * 60 * 1000).toISOString(), // 20 days ago
    comment: "아리아나의 성숙함이 느껴지는 곡. 가사가 정말 와닿아요.",
  },
  {
    id: "7",
    title: "Circles",
    artist: "Post Malone",
    genre: "Pop",
    thumbnail: "/placeholder.svg?height=60&width=60",
    likes: 220,
    uploader: "PostyFan",
    timestamp: new Date(Date.now() - 25 * 24 * 60 * 60 * 1000).toISOString(), // 25 days ago
    comment: "Post Malone의 매력적인 보이스가 돋보이는 곡. 멜로디가 계속 맴돌아요.",
  },
  {
    id: "8",
    title: "Someone You Loved",
    artist: "Lewis Capaldi",
    genre: "Pop",
    thumbnail: "/placeholder.svg?height=60&width=60",
    likes: 190,
    uploader: "LewisFan",
    timestamp: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString(), // 30 days ago
    comment: "가슴 아픈 이별 노래. Lewis Capaldi의 감성이 잘 느껴져요.",
  },
]

const RecentMusic = () => {
  return (
    <div>
      <h2>Recent Music</h2>
      <ul>
        {mockRecentMusic.map((music) => (
          <li key={music.id}>
            {music.title} - {music.artist}
          </li>
        ))}
      </ul>
    </div>
  )
}

export default RecentMusic
