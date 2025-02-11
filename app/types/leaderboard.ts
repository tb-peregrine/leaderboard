export type TimeRange = '24h' | '7d' | '30d'

export interface Player {
    id: string
    name: string
    avatarUrl: string
    wins: {
        [key in TimeRange]: number
    }
    rank: {
        [key in TimeRange]: number
    }
} 