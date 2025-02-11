'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import { Player, TimeRange } from '../types/leaderboard'
import { fetchLeaderboard } from '../lib/api'

interface LeaderboardProps {
    initialPlayers?: Player[]
}

export default function Leaderboard({ initialPlayers = [] }: LeaderboardProps) {
    const [timeRange, setTimeRange] = useState<TimeRange>('24h')
    const [players, setPlayers] = useState<Player[]>(initialPlayers)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        async function loadLeaderboard() {
            try {
                setLoading(true)
                setError(null)
                const data = await fetchLeaderboard(timeRange)
                setPlayers(data)
            } catch (err) {
                setError('Failed to load leaderboard data')
                console.error(err)
            } finally {
                setLoading(false)
            }
        }

        loadLeaderboard()
    }, [timeRange])

    return (
        <div className="w-full max-w-4xl mx-auto p-6">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold">Talon Leaderboard</h2>
                <div className="flex gap-2">
                    <button
                        onClick={() => setTimeRange('24h')}
                        disabled={loading}
                        className={`px-4 py-2 rounded ${timeRange === '24h' ? 'bg-blue-500 text-white' : 'bg-gray-200'
                            } ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
                    >
                        24h
                    </button>
                    <button
                        onClick={() => setTimeRange('7d')}
                        disabled={loading}
                        className={`px-4 py-2 rounded ${timeRange === '7d' ? 'bg-blue-500 text-white' : 'bg-gray-200'
                            } ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
                    >
                        7 days
                    </button>
                    <button
                        onClick={() => setTimeRange('30d')}
                        disabled={loading}
                        className={`px-4 py-2 rounded ${timeRange === '30d' ? 'bg-blue-500 text-white' : 'bg-gray-200'
                            } ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
                    >
                        30 days
                    </button>
                </div>
            </div>

            {error && (
                <div className="bg-red-50 text-red-500 p-4 rounded-lg mb-6">
                    {error}
                </div>
            )}

            <div className="bg-white rounded-lg shadow">
                {loading ? (
                    <div className="p-8 text-center text-gray-500">Loading...</div>
                ) : (
                    <table className="w-full">
                        <thead>
                            <tr className="border-b">
                                <th className="px-6 py-3 text-left">Rank</th>
                                <th className="px-6 py-3 text-left">Player</th>
                                <th className="px-6 py-3 text-right">Wins</th>
                            </tr>
                        </thead>
                        <tbody>
                            {players.map((player) => (
                                <tr key={player.id} className="border-b hover:bg-gray-50">
                                    <td className="px-6 py-4">#{player.rank[timeRange]}</td>
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-3">
                                            <div className="relative w-8 h-8">
                                                <Image
                                                    src={player.avatarUrl}
                                                    alt={`${player.name}'s avatar`}
                                                    fill
                                                    className="rounded-full"
                                                    sizes="32px"
                                                    priority
                                                />
                                            </div>
                                            <span>{player.name}</span>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 text-right">{player.wins[timeRange]}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
            </div>
        </div>
    )
} 