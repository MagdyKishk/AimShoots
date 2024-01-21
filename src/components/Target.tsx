import { DiffcultyContext, ScoreContext } from '@/App';
import TargetImage from '@/assets/img/Target.png';
import { DifficultyContextType, ScoreContextType } from '@/shared/contextTypes';
import { useContext } from 'react';

type Props = {
	posX: number;
	posY: number;
	targetId: number;
	setTargets: React.Dispatch<React.SetStateAction<Array<{ x: number; y: number; id: number }>>>;
};

export default function Target({
	posX,
	posY,
	targetId,
	setTargets }: Props): JSX.Element {

	const { setScore } = useContext<ScoreContextType | undefined >(ScoreContext)!;
	const { targetSize } = useContext<DifficultyContextType | undefined >(DiffcultyContext)!;

	function handleClick() {
		setTargets((prev: Array<{ x: number; y: number; id: number }>) =>
			prev.filter((target) => target.id !== targetId)
		);
		setScore((prev) => prev + 1);
	}

	return (
		<div
			className='bg-white flex absolute justify-center items-center rounded-full overflow-hidden user-undragable cursor-pointer'
			onClick={handleClick}
			style={{
				left: posX,
				top: posY,
				width: targetSize,
				height: targetSize,
			}}>
			<img src={TargetImage} alt='Target' draggable={false} />
		</div>
	);
}
