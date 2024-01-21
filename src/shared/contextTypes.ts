import { Difficulties, MaxTargets, SpawnSpeed, TargetSizes } from '@/shared/types';

export type ScoreContextType = {
	score: number,
	topScore: number,

	setScore: React.Dispatch<React.SetStateAction<number>>;
	setTopScore: React.Dispatch<React.SetStateAction<number>>;
	saveTopScore: (value: number) => void;
}

export type DifficultyContextType = {
	difficulty: Difficulties;
	spawnSpeed: SpawnSpeed;
	targetSize: TargetSizes;
	maxTargets: MaxTargets;

	setDifficulty: React.Dispatch<React.SetStateAction<Difficulties>>;
	setSpawnSpeed: React.Dispatch<React.SetStateAction<SpawnSpeed>>;
	setTargetSize: React.Dispatch<React.SetStateAction<TargetSizes>>;
	setMaxTargets: React.Dispatch<React.SetStateAction<MaxTargets>>;
	changeDifficult: (value: Difficulties) => void;
}

export type GameStateContextType = {
	gameOver: boolean;
	gamePaused: boolean;

	setGameOver: React.Dispatch<React.SetStateAction<boolean>>;
	setGamePaused: React.Dispatch<React.SetStateAction<boolean>>;
	endGame: () => void;
	startGame: () => void;
}
