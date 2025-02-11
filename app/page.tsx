import Image from "next/image";
import Leaderboard from './components/Leaderboard'
import { mockPlayers } from './data/mockLeaderboard'

export default function Home() {
  return (
    <main className="min-h-screen bg-gray-100 py-12">
      <Leaderboard players={mockPlayers} />
    </main>
  );
}
