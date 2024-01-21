// React
import { useContext, useState } from 'react';
// Components
import { XMarkIcon } from '@heroicons/react/16/solid';
// Context
import { DiffcultyContext } from '@/App';
// Types
import { DifficultyContextType } from '@/shared/contextTypes';
import {
	Difficulties,
	SpawnSpeed,
	MaxTargets,
	TargetSizes,
} from '@/shared/types';

type Props = {
	difficulty: Difficulties;
	spawnSpeed: SpawnSpeed;
	targetSize: TargetSizes;
	maxTargets: MaxTargets;
	controlSettings: (value: boolean) => void;
	changeDifficult: (value: Difficulties) => void;
};

export default function SettingsWindow({ controlSettings, changeDifficult }: Props) {
	const { difficulty, spawnSpeed, setSpawnSpeed, targetSize, setTargetSize, maxTargets, setMaxTargets} = useContext<DifficultyContextType | undefined>(DiffcultyContext)!;
	const [formSpawnSpeed, setFormSpawnSpeed] = useState(spawnSpeed);
	const [formTargetSize, setFormTargetSize] = useState(targetSize);
	const [formMaxTargets, setFormMaxTargets] = useState(maxTargets);

	function handleSubmition() {
		setSpawnSpeed(formSpawnSpeed);
		setTargetSize(formTargetSize);
		setMaxTargets(formMaxTargets)
		controlSettings(false);
	}

	function refreshData(value: Difficulties) {
		setFormSpawnSpeed(SpawnSpeed[value as keyof typeof SpawnSpeed]);
		setFormTargetSize(TargetSizes[value as keyof typeof TargetSizes]);
		setFormMaxTargets(MaxTargets[value as keyof typeof MaxTargets]);
	}

	return (
		<div className='flex flex-col h-5/6 w-5/6 bg-gray-900 absolute left-1/2 top-1/2 translate-x-[-50%] translate-y-[-50%] rounded shadow-lg shadow-black overflow-hidden z-50'>
			<header className='h-8 bg-gray-950 flex items-center px-2 flex-row-reverse'>
				<XMarkIcon
					className='w-6 h-6 text-white hover:text-red-500 cursor-pointer'
					onClick={() => {
						controlSettings(false);
					}}
				/>
			</header>
			<main className='flex-1'>
				<div className='flex flex-col px-8 h-full relative pt-2 py-4'>
					<ul className='flex justify-center gap-4 h-fit'>
						<li
							className={`rounded font-bold hover:text-white cursor-pointer px-6 py-4 bg-gray-500 w-fit ${
								difficulty === Difficulties.easy
									? 'text-white'
									: 'text-gray-400'
							}`}
							onClick={() => {
								changeDifficult(Difficulties.easy);
								refreshData(Difficulties.easy);
							}}>
							Easy
						</li>
						<li
							className={`rounded font-bold hover:text-white cursor-pointer px-6 py-4 bg-gray-500 w-fit ${
								difficulty === Difficulties.medium
									? 'text-white'
									: 'text-gray-400'
							}`}
							onClick={() => {
								changeDifficult(Difficulties.medium);
								refreshData(Difficulties.medium);
							}}>
							Medium
						</li>
						<li
							className={`rounded font-bold hover:text-white cursor-pointer px-6 py-4 bg-gray-500 w-fit ${
								difficulty === Difficulties.hard
									? 'text-white'
									: 'text-gray-400'
							}`}
							onClick={() => {
								changeDifficult(Difficulties.hard);
								refreshData(Difficulties.hard);
							}}>
							Hard
						</li>
						<li
							className={`rounded font-bold hover:text-white cursor-pointer px-6 py-4 bg-gray-500 w-fit ${
								difficulty === Difficulties.insance
									? 'text-white'
									: 'text-gray-400'
							}`}
							onClick={() => {
								changeDifficult(Difficulties.insance);
								refreshData(Difficulties.insance);
							}}>
							Insance
						</li>
						<li
							className={`rounded font-bold hover:text-white cursor-pointer px-6 py-4 bg-gray-500 w-fit ${
								difficulty === Difficulties.custom
									? 'text-white'
									: 'text-gray-400'
							}`}
							onClick={() => {
								changeDifficult(Difficulties.custom);
							}}>
							Custom
						</li>
					</ul>
					<hr className='mt-4' />
					<div className='pt-4 flex flex-col flex-1'>
						<div className='gap-4'>
							<label
								htmlFor='speed'
								className='text-white text-2xl font-bold block my-2'>
								Spawn Speed
							</label>
							<input
								type='range'
								id='speed'
								min={100}
								step={100}
								max={1000}
								value={formSpawnSpeed}
								onChange={(e) => {
									setFormSpawnSpeed(Number.parseInt(e.target.value));
									changeDifficult(Difficulties.custom);
								}}
							/>
							<span className='ml-2 text-white'>{formSpawnSpeed}</span>
						</div>
						<div className='gap-4'>
							<label
								htmlFor='speed'
								className='text-white text-2xl font-bold block my-2'>
								Target Size
							</label>
							<input
								type='range'
								id='speed'
								min={10}
								step={10}
								max={200}
								value={formTargetSize}
								onChange={(e) => {
									setFormTargetSize(Number.parseInt(e.target.value));
									changeDifficult(Difficulties.custom);
								}}
							/>
							<span className='ml-2 text-white'>{formTargetSize}</span>
						</div>
						<div className='gap-4'>
							<label
								htmlFor='speed'
								className='text-white text-2xl font-bold block my-2'>
								Max Targets On Screen
							</label>
							<input
								type='range'
								id='speed'
								min={2}
								max={20}
								value={formMaxTargets}
								onChange={(e) => {
									setFormMaxTargets(Number.parseInt(e.target.value));
									changeDifficult(Difficulties.custom);
								}}
							/>
							<span className='ml-2 text-white'>{formMaxTargets}</span>
						</div>
						<button
							className='bg-gray-500 text-gray-200 rounded px-8 py-4 w-fit justify-self-end self-end mt-auto hover:text-white font-bold'
							onClick={() => {
								handleSubmition();
							}}>
							Submit
						</button>
					</div>
				</div>
			</main>
		</div>
	);
}
