import { Player, TimeRange } from '../types/leaderboard'

const TINYBIRD_API_URL = process.env.NEXT_PUBLIC_TINYBIRD_API_URL
const TINYBIRD_API_KEY = process.env.NEXT_PUBLIC_TINYBIRD_API_KEY

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

    const data = await response.json()

    return data.data.map((item: any) => ({
        id: item.player,
        name: item.player,
        avatarUrl: getRandomAvatar(item.player),
        wins: {
            [timeRange]: item.total_wins
        },
        rank: {
            [timeRange]: item.rank
        }
    }))
} 