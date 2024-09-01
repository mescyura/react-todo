import React, { useState } from 'react';
import Service from '../../services/Service';

import './AddTaskForm.scss';

function AddTaskForm({ list, onAddNewTask }) {
	const [visibleForm, setVisibleForm] = useState(false);
	const [inputValue, setInputValue] = useState('');
	const [isLoading, setIsLoading] = useState(false);

	const addNewTask = () => {
		if (!inputValue || inputValue.trim().length === 0) {
			alert('Введіть назву таски');
			return;
		}

		const newTask = {
			listId: list.id,
			text: inputValue.replace(/\s/g, ''),
			completed: false,
		};

		setIsLoading(true);

		Service.addTask(newTask)
			.then(({ data }) => {
				onAddNewTask(list.id, data);
				closeForm();
			})
			.catch(() => {
				alert('Помилка під час додавання  таску!');
			})
			.finally(() => {
				setIsLoading(false);
			});
	};

	const closeForm = () => {
		setVisibleForm(false);
		setInputValue('');
	};

	return (
		<div className='add-task'>
			{!visibleForm ? (
				<div
					onClick={() => setVisibleForm(!visibleForm)}
					className='add-task__new-task'
				>
					<svg
						width='16'
						height='16'
						viewBox='0 0 16 16'
						fill='none'
						xmlns='http://www.w3.org/2000/svg'
					>
						<path
							d='M8 1V15'
							stroke='black'
							strokeWidth='1.5'
							strokeLinecap='round'
							strokeLinejoin='round'
						/>
						<path
							d='M1 8H15'
							stroke='black'
							strokeWidth='1.5'
							strokeLinecap='round'
							strokeLinejoin='round'
						/>
					</svg>
					<span>Новий таск</span>
				</div>
			) : (
				<div className='add-task__form'>
					<input
						value={inputValue}
						onChange={e => setInputValue(e.target.value)}
						className='field'
						type='text'
						placeholder='Назва таску'
					/>
					<button onClick={addNewTask} className='button'>
						{isLoading ? 'Додавання...' : 'Добавити таску'}
					</button>
					<button onClick={closeForm} className='button button--grey'>
						Відміна
					</button>
				</div>
			)}
		</div>
	);
}

export default AddTaskForm;
