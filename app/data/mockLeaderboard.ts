import { Player } from '../types/leaderboard'

// Using Dicebear's avataaars collection
const getRandomAvatar = (seed: string) =>
    `https://api.dicebear.com/7.x/avataaars/svg?seed=${seed}&backgroundColor=65c9ff,b6e3f4,c0aede,d1d4f9`

export const mockPlayers: Player[] = [
    {
        id: '1',
        name: 'DragonSlayer',
        avatarUrl: getRandomAvatar('DragonSlayer'),
        wins: {
            '24h': 15,
            '7d': 89,
            '30d': 342
        },
        rank: {
            '24h': 1,
            '7d': 2,
            '30d': 1
        }
    },
    {
        id: '2',
        name: 'TalonMaster',
        avatarUrl: getRandomAvatar('TalonMaster'),
        wins: {
            '24h': 12,
            '7d': 95,
            '30d': 301
        },
        rank: {
            '24h': 2,
            '7d': 1,
            '30d': 2
        }
    },
    // Add more mock players as needed
] 