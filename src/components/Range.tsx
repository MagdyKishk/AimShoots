// React
import { useContext, useEffect, useRef } from 'react';
// Components
import Target from '@/components/Target';
import GameOver from '@/components/GameOver';
import { DiffcultyContext, GameStateContext } from '@/App';
// Types
import { DifficultyContextType, GameStateContextType } from '@/shared/contextTypes';


type Props = {
	endGame: () => void;
	targets: { x: number; y: number; id: number }[] | [];
	setTargets: React.Dispatch<React.SetStateAction<{ x: number; y: number; id: number }[] | []>>;
};

export default function Range({endGame, targets, setTargets }: Props): JSX.Element {
	// needed states from context
	const { spawnSpeed, targetSize, maxTargets } = useContext<DifficultyContextType | undefined>(DiffcultyContext)!;
	const { gameOver, gamePaused } = useContext<GameStateContextType | undefined>(GameStateContext)!;

	// Reference to the Dom Node
	const RangNode = useRef<HTMLDivElement>(null);

	const generateNewTarget = () => {
		const RangeWidth = RangNode.current!.clientWidth - targetSize;
		const RangeHeight = RangNode.current!.clientHeight - targetSize;

		return {
			x: Math.round(Math.random() * RangeWidth),
			y: Math.round(Math.random() * RangeHeight),
			id: (targets.at(-1)?.id || 0) + 1,
		};
	};

	useEffect(() => {
		if (RangNode.current) {
			const intervalId = setInterval(() => {
				if (targets.length > maxTargets) {
					endGame();
				} else if (!gameOver && !gamePaused) {
					const newTarget = generateNewTarget();
					setTargets((prev) => [...prev, newTarget]);
				}
			}, spawnSpeed);

			return () => clearInterval(intervalId);
		}
		console.log(gameOver);
	}, [RangNode, targets, gameOver, gamePaused]);

	return (
		<div
			ref={RangNode}
			className='h-full bg-[url(/assets/bg-image.jpg)] relative bg-cover'>
			{targets.map(({ x, y, id }) => (
				<Target
					setTargets={setTargets}
					posX={x}
					posY={y}
					key={id}
					targetId={id}
				/>
			))}
			{gameOver && <GameOver />}
		</div>
	);
}
