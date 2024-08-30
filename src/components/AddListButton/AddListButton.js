import React, { useState, useEffect } from 'react';
import axios from 'axios';

import List from '../List/List';
import Badge from '../Badge/Badge';

import CloseSvg from '../../assets/img/close.svg';
import './AddListButton.scss';

function AddListButton({ colors, onAddNewList }) {
	const [visiblePopup, setVisiblePopup] = useState(false);
	const [selectedColor, setSelectedColor] = useState(3);
	const [inputValue, setInputValue] = useState('');
	const [isLoading, setIsLoading] = useState(false);

	useEffect(() => {
		if (Array.isArray(colors)) {
			setSelectedColor(colors[0].id);
		}
	}, [colors]);

	const addNewList = () => {
		if (!inputValue) {
			alert('Ведіть назву списку задач');
			return;
		}
		setIsLoading(true);

		axios
			.post('http://localhost:3001/lists', {
				name: inputValue,
				colorId: selectedColor,
			})
			.then(({ data }) => {
				const color = colors.filter(c => c.id === selectedColor)[0];
				const newList = { ...data, color };
				onAddNewList(newList);
				closePopup();
			})
			.catch(() => {
				alert('Помилка під час додавання списку!');
			})
			.finally(() => {
				setIsLoading(false);
			});
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
					<button onClick={addNewList} className='button'>
						{isLoading ? 'Додавання...' : 'Добавити'}
					</button>
				</div>
			)}
		</div>
	);
}

export default AddListButton;
