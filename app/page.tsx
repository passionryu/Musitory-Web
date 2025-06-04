import MostLikedMusic from "@/components/most-liked-music"
import RecentMusic from "@/components/recent-music"
import RecommendationsForOthers from "@/components/recommendations-for-others"
import Header from "@/components/header"

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-50 via-slate-100 to-slate-200">
      <Header />
      <div className="container mx-auto px-3 sm:px-4 py-6 sm:py-8">
        <h1 className="text-3xl sm:text-4xl font-bold mb-6 sm:mb-8 text-center bg-gradient-to-r from-slate-700 to-slate-900 bg-clip-text text-transparent">
          Musitory
        </h1>

        <section className="mb-8 sm:mb-12">
          <h2 className="text-xl sm:text-2xl font-semibold mb-3 sm:mb-4 text-slate-700 px-1">Most Liked Music</h2>
          <MostLikedMusic />
        </section>

        <section className="mb-8 sm:mb-12">
          <h2 className="text-xl sm:text-2xl font-semibold mb-3 sm:mb-4 text-slate-700 px-1">Recent Music</h2>
          <RecentMusic />
        </section>

        <section className="mb-8 sm:mb-12">
          <h2 className="text-xl sm:text-2xl font-semibold mb-3 sm:mb-4 text-slate-700 px-1">
            Recommendations From Others
          </h2>
          <RecommendationsForOthers />
        </section>
      </div>
    </main>
  )
}
