// Components
import ScoreCounter from '@/components/ScoreCounter';

type Props = {
	controlSettings: (value: boolean) => void;
};

export default function Navbar({  }: Props): JSX.Element {
	return (
		<nav className='flex py-12 bg-gray-800'>
			<div className='w-5/6 mx-auto flex justify-between items-center text-white'>
				<div className='font-bold text-3xl'>Aim Shoots</div>
				<ScoreCounter />
			</div>
		</nav>
	);
}
