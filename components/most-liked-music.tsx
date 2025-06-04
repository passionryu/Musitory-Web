import { Box, Flex, Image, Text } from "@chakra-ui/react"
import { FaHeart } from "react-icons/fa"

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

const mockMostLikedMusic: MusicItem[] = [
  {
    id: "1",
    title: "Blinding Lights",
    artist: "The Weeknd",
    genre: "Pop",
    thumbnail: "/placeholder.svg?height=60&width=60",
    likes: 1245,
    uploader: "MusicFan22",
    timestamp: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000).toISOString(), // 4 days ago
    comment: "새벽에 듣기 좋은 노래예요!",
  },
  {
    id: "2",
    title: "Shape of You",
    artist: "Ed Sheeran",
    genre: "Pop",
    thumbnail: "/placeholder.svg?height=60&width=60",
    likes: 1100,
    uploader: "MusicLover123",
    timestamp: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(), // 7 days ago
    comment: "언제 들어도 질리지 않는 명곡!",
  },
  {
    id: "3",
    title: "Bohemian Rhapsody",
    artist: "Queen",
    genre: "Rock",
    thumbnail: "/placeholder.svg?height=60&width=60",
    likes: 980,
    uploader: "RockFan88",
    timestamp: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString(), // 10 days ago
    comment: "전설은 영원하다!",
  },
  {
    id: "4",
    title: "Hotel California",
    artist: "Eagles",
    genre: "Rock",
    thumbnail: "/placeholder.svg?height=60&width=60",
    likes: 950,
    uploader: "ClassicRockGuy",
    timestamp: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000).toISOString(), // 14 days ago
    comment: "기타 솔로가 예술!",
  },
  {
    id: "5",
    title: "Imagine",
    artist: "John Lennon",
    genre: "Pop",
    thumbnail: "/placeholder.svg?height=60&width=60",
    likes: 920,
    uploader: "PeaceAndLove",
    timestamp: new Date(Date.now() - 20 * 24 * 60 * 60 * 1000).toISOString(), // 20 days ago
    comment: "평화를 노래하는 명곡",
  },
]

const MostLikedMusic = () => {
  return (
    <Box>
      <Text fontSize="xl" fontWeight="bold" mb={4}>
        Most Liked Music
      </Text>
      {mockMostLikedMusic.map((music) => (
        <Flex key={music.id} align="center" p={2} borderRadius="md" _hover={{ bg: "gray.100" }} cursor="pointer">
          <Image
            src={music.thumbnail || "/placeholder.svg"}
            alt={music.title}
            boxSize="60px"
            objectFit="cover"
            mr={4}
          />
          <Box flex="1">
            <Text fontWeight="bold">{music.title}</Text>
            <Text fontSize="sm" color="gray.600">
              {music.artist} - {music.genre}
            </Text>
            <Text fontSize="xs" color="gray.500">
              Uploaded by {music.uploader} - {new Date(music.timestamp).toLocaleDateString()}
            </Text>
            <Text fontSize="xs" color="gray.700">
              Comment: {music.comment}
            </Text>
          </Box>
          <Flex align="center">
            <FaHeart color="red" mr={1} />
            <Text>{music.likes}</Text>
          </Flex>
        </Flex>
      ))}
    </Box>
  )
}

export default MostLikedMusic
