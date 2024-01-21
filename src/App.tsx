// React
import {useState, createContext, useEffect } from 'react';
// Components
import Navbar from '@/components/Navbar';
import Range from '@/components/Range';
import SettingsWindow from '@/components/SettingsWindow';
import SettingsIcon from '@/components/SettingsIcon';
// Types
	// General Types
	import {
		Difficulties,
		SpawnSpeed,
		MaxTargets,
		TargetSizes,
	} from '@/shared/types';
	// Context Types
	import {
		DifficultyContextType,
		ScoreContextType,
		GameStateContextType,
	} from '@/shared/contextTypes';

// Contexts
export let ScoreContext     = createContext<ScoreContextType | undefined>(undefined);
export let DiffcultyContext = createContext<DifficultyContextType | undefined>(undefined);
export let GameStateContext = createContext<GameStateContextType | undefined>(
	undefined
);


export default function App(): JSX.Element {

	// Score State
	const [score, setScore] = useState<number>(0);
	const [topScore, setTopScore] = useState<number>(0);

	const ScoreContextValue: ScoreContextType = {
		score: score,
		topScore: topScore,
		setScore: setScore,
		setTopScore,
		saveTopScore,
	};

	// Difficulty States
	const [difficulty, setDifficulty] = useState<Difficulties>(Difficulties.medium);
	const [spawnSpeed, setSpawnSpeed] = useState<SpawnSpeed>(SpawnSpeed[difficulty as keyof typeof SpawnSpeed]);
	const [targetSize, setTargetSize] = useState<TargetSizes>(TargetSizes[difficulty as keyof typeof TargetSizes]);
	const [maxTargets, setMaxTargets] = useState<MaxTargets>(MaxTargets[difficulty as keyof typeof MaxTargets]);

	const DiffcultyContextValue: DifficultyContextType = {
		difficulty,
		spawnSpeed,
		targetSize,
		maxTargets,
		setDifficulty,
		setSpawnSpeed,
		setTargetSize,
		setMaxTargets,
		changeDifficult,
	};

	// Game State
	const [gameOver, setGameOver] = useState<boolean>(false);
	const [gamePaused, setGamePaused] = useState<boolean>(false);

	const GameContextValue = {
		gameOver,
		gamePaused,
		setGameOver,
		setGamePaused,
		endGame,
		startGame,
	};
	// Windows States
	const [settings, setSettings] = useState<boolean>(false);

	// Targets
	const [targets, setTargets] = useState<(Array<{ x: number; y: number; id: number }> | [])>([]);

	function saveTopScore(value: number) {
		window.localStorage.setItem("TopScore", `${value}`);
	}

	// Clears the Range From All Target Components
	function clearTargets() {
		setTargets([]);
	}

	// Handle Difficulty change
	function changeDifficult(value: Difficulties) {
		if (value !== 'custom') {
			setSpawnSpeed(SpawnSpeed[value as keyof typeof SpawnSpeed]);
			setTargetSize(TargetSizes[value as keyof typeof TargetSizes]);
			setMaxTargets(MaxTargets[value as keyof typeof MaxTargets]);
		}
		setDifficulty(value)
		clearTargets();
		setScore(0);
	}

	// Control the Settings Popup
	function controlSettings(value: boolean) {
		setGamePaused(value);
		setSettings(value);
	}

	// Control Game State
	function endGame() {
		setGameOver(true);
		setGamePaused(true);

		clearTargets();

		if (score > topScore) {
			setTopScore(score);
			saveTopScore(score)
		}
	}

	function startGame() {
		setGameOver(false);
		setGamePaused(false);
		setScore(0);
	}

	useEffect(() => {
		let TopScore: string | number | null = window.localStorage.getItem("TopScore");
		TopScore = TopScore? Number(TopScore): 0
		setTopScore(TopScore);
	}, [])

	return (
		<div className='h-screen flex flex-col justify-between relative'>
			<ScoreContext.Provider value={ScoreContextValue}>
				<DiffcultyContext.Provider value={DiffcultyContextValue}>
					<GameStateContext.Provider value={GameContextValue}>
						<header>
							<Navbar controlSettings={controlSettings} />
						</header>
						{settings && (
							<SettingsWindow
								difficulty={difficulty}
								spawnSpeed={spawnSpeed}
								targetSize={targetSize}
								maxTargets={maxTargets}
								controlSettings={controlSettings}
								changeDifficult={changeDifficult}
							/>
						)}
						<SettingsIcon controlSettings={controlSettings} />
						<main className='h-full'>
							<Range
								targets={targets}
								setTargets={setTargets}
								endGame={endGame}
							/>
						</main>
					</GameStateContext.Provider>
				</DiffcultyContext.Provider>
			</ScoreContext.Provider>
		</div>
	);
}
