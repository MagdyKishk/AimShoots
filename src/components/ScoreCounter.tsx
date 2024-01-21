import { useContext } from 'react';
// Context
import { DiffcultyContext, ScoreContext } from '@/App';
// Types
import { DifficultyContextType, ScoreContextType } from '@/shared/contextTypes';

type Props = {
};

export default function ScoreCounter({ }: Props): JSX.Element {
	const { score, topScore } = useContext<ScoreContextType | undefined>(ScoreContext)!;
	const { difficulty } = useContext<DifficultyContextType | undefined>(DiffcultyContext)!;

	return (
		<div className='font-bold text-center justify-between sm:absolute sm:left-1/2 sm:translate-x-[-50%]'>
			<div>{difficulty.toUpperCase()}</div>
			<div className='text-3xl'>
				Score: <span>{score}</span>
			</div>
			<div>Top Score: {topScore}</div>
		</div>
	);
}
