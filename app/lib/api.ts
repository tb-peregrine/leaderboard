import { Player, TimeRange } from '../types/leaderboard'

const TINYBIRD_API_URL = process.env.NEXT_PUBLIC_TINYBIRD_API_URL
const TINYBIRD_API_KEY = process.env.NEXT_PUBLIC_TINYBIRD_API_KEY

// Add interface for API response
interface LeaderboardApiResponse {
    data: {
        player: string
        total_wins: number
        rank: number
    }[]
}

function getDateRangeForTimeRange(timeRange: TimeRange): { start: string; end: string } {
    const end = new Date()
    const start = new Date()

    switch (timeRange) {
        case '24h':
            start.setHours(start.getHours() - 24)
            break
        case '7d':
            start.setDate(start.getDate() - 7)
            break
        case '30d':
            start.setDate(start.getDate() - 30)
            break
    }

    return {
        start: start.toISOString(),
        end: end.toISOString()
    }
}

const getRandomAvatar = (seed: string) =>
    `https://api.dicebear.com/7.x/avataaars/svg?seed=${seed}&backgroundColor=65c9ff,b6e3f4,c0aede,d1d4f9`

export async function fetchLeaderboard(timeRange: TimeRange): Promise<Player[]> {
    if (!TINYBIRD_API_URL || !TINYBIRD_API_KEY) {
        throw new Error('Tinybird API configuration missing')
    }

    const { start, end } = getDateRangeForTimeRange(timeRange)

    const params = new URLSearchParams({
        start_date: start,
        end_date: end
    })

    const response = await fetch(`${TINYBIRD_API_URL}/v0/pipes/leaderboard_api.json?${params}`, {
        headers: {
            'Authorization': `Bearer ${TINYBIRD_API_KEY}`
        }
    })

    if (!response.ok) {
        throw new Error('Failed to fetch leaderboard data')
    }

    const data = await response.json() as LeaderboardApiResponse

    return data.data.map((item) => ({
        id: item.player,
        name: item.player,
        avatarUrl: getRandomAvatar(item.player),
        wins: {
            '24h': timeRange === '24h' ? item.total_wins : 0,
            '7d': timeRange === '7d' ? item.total_wins : 0,
            '30d': timeRange === '30d' ? item.total_wins : 0
        },
        rank: {
            '24h': timeRange === '24h' ? item.rank : 0,
            '7d': timeRange === '7d' ? item.rank : 0,
            '30d': timeRange === '30d' ? item.rank : 0
        }
    }))
} 