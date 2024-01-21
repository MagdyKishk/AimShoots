// React
import { useContext } from 'react';
// Context
import { GameStateContext, ScoreContext } from '@/App';
// Types
import { GameStateContextType, ScoreContextType } from '@/shared/contextTypes';

export default function GameOver() {

	const { score } = useContext<ScoreContextType | undefined>(ScoreContext)!;
	const { startGame } = useContext<GameStateContextType | undefined>(GameStateContext)!;

	return (
		<div className='absolute top-1/2 left-1/2 translate-x-[-50%] translate-y-[-50%] bg-gray-900 px-12 py-6 text-center rounded text-white'>
			<h1 className='font-bold text-3xl'>Game Over</h1>
			<p className='text-2xl'>Your Score: {score}</p>
			<button
				className='bg-white text-black px-6 py-2 mt-6 rounded-full'
				onClick={() => {
					startGame();
				}}>
				Retry
			</button>
		</div>
	);
}
