export interface Game {
    eco: string;
    accuracy: number;
    opening: string;
}

export interface EcoData {
    openings: string[];
    totalAccuracy: number;
    count: number;
}

export interface CommonEco {
    eco: string;
    opening: string;
    averageAccuracy: number;
    count: number;
}
