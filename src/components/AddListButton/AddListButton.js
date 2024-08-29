import React, { useState } from 'react';
import List from '../List/List';
import Badge from '../Badge/Badge';

import CloseSvg from '../../assets/img/close.svg';
import './AddListButton.scss';

function AddListButton({ colors, onAddList }) {
	const [visiblePopup, setVisiblePopup] = useState(false);
	const [selectedColor, setSelectedColor] = useState(colors[0].id);
	const [inputValue, setInputValue] = useState('');

	const addList = () => {
		if (!inputValue) {
			alert('Ведіть назву списку задач');
			return;
		}
		onAddList({
			id: Math.random(),
			name: inputValue,
			colorId: selectedColor,
			color: colors.find(color => color.id === selectedColor).name,
		});
		closePopup();
		console.log('List added');
	};

	const closePopup = () => {
		setVisiblePopup(false);
		setInputValue('');
		setSelectedColor(colors[0].id);
	};

	return (
		<div className='add-list'>
			<List
				onClick={() => setVisiblePopup(!visiblePopup)}
				items={[
					{
						className: 'add-list__add-button',
						icon: (
							<svg
								width='10'
								height='10'
								viewBox='0 0 16 16'
								fill='none'
								xmlns='http://www.w3.org/2000/svg'
							>
								<path
									d='M8 1V15'
									stroke='black'
									strokeWidth='2'
									strokeLinecap='round'
									strokeLinejoin='round'
								/>
								<path
									d='M1 8H15'
									stroke='black'
									strokeWidth='2'
									strokeLinecap='round'
									strokeLinejoin='round'
								/>
							</svg>
						),
						name: 'Добавити список',
					},
				]}
			/>
			{visiblePopup && (
				<div className='add-list__popup'>
					<img
						onClick={closePopup}
						src={CloseSvg}
						alt='close btn'
						className='add-list__popup-close-btn'
					/>
					<input
						value={inputValue}
						onChange={e => setInputValue(e.target.value)}
						className='field'
						type='text'
						placeholder='Назва списку'
					/>
					<div className='add-list__popup-colors'>
						{colors.map(color => (
							<Badge
								onClick={() => {
									setSelectedColor(color.id);
								}}
								key={color.id}
								color={color.name}
								className={selectedColor === color.id && 'active'}
							/>
						))}
					</div>
					<button onClick={addList} className='button'>
						Добавити
					</button>
				</div>
			)}
		</div>
	);
}

export default AddListButton;
