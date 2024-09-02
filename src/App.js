import React, { useState, useEffect } from 'react';
import { Route, useHistory } from 'react-router-dom';
import Service from './services/Service';

import List from './components/List/List';
import AddListButton from './components/List/AddListButton';
import Tasks from './components/Tasks/Tasks';

// import DB from './assets/db.json';

import './App.scss';

function App() {
	const [lists, setLists] = useState(null);
	const [colors, setColors] = useState(null);
	const [activeItem, setActiveItem] = useState(null);
	let history = useHistory();

	useEffect(() => {
		Service.getLists().then(({ data }) => {
			setLists(data);
		});

		Service.getColors().then(({ data }) => {
			setColors(data);
		});
	}, []);

	useEffect(() => {
		return history.listen(location => {
			console.log(history.location.pathname);
			const listId = history.location.pathname.split('lists/')[1];
			if (lists) {
				console.log(lists);
				const list = lists.find(list => list.id === Number(listId));
				setActiveItem(list);
			}
		});
	}, [lists, history]);

	// LISTS METHODS
	const onAddNewList = newList => {
		const updatedList = [...lists, newList];
		setLists(updatedList);
	};

	const onEditListTitle = (id, newTitle) => {
		const updatedList = lists.map(item => {
			if (item.id === id) {
				item.name = newTitle;
			}
			return item;
		});
		setLists(updatedList);
	};

	const onRemoveList = list => {
		if (window.confirm('Видалити список?')) {
			Service.removeList(list.id).then(() => {
				const updatedList = lists.filter(item => item.id !== list.id);
				setLists(updatedList);
			});
		}
	};

	// TASKS METHODS
	const onAddNewTask = (listId, newTask) => {
		const updatedList = lists.map(item => {
			if (item.id === listId) {
				item.tasks = [...item.tasks, newTask];
			}
			return item;
		});
		setLists(updatedList);
	};

	const onEditTask = (listId, taskId, newText) => {
		const newList = lists.map(list => {
			if (list.id === listId) {
				list.tasks = list.tasks.map(task => {
					if (task.id === taskId) {
						task.text = newText;
					}
					return task;
				});
			}
			return list;
		});
		setLists(newList);
	};

	const onCompleteTask = (listId, taskId, completed) => {
		const newList = lists.map(list => {
			if (list.id === listId) {
				list.tasks = list.tasks.map(task => {
					if (task.id === taskId) {
						task.completed = completed;
					}
					return task;
				});
			}
			return list;
		});
		setLists(newList);
		Service.editTask(taskId, {
			completed,
		}).catch(() => {
			alert('Не вдалось позначити виконаним таск');
		});
	};

	const onRemoveTask = (listId, taskId) => {
		if (window.confirm('Видалити таску?')) {
			Service.removeTask(taskId)
				.then(() => {
					const newList = lists.map(item => {
						if (item.id === listId) {
							item.tasks = item.tasks.filter(task => task.id !== taskId);
						}
						return item;
					});
					setLists(newList);
				})
				.catch(() => {
					alert('Не вдалося видалити таску');
				});
		}
	};

	return (
		<div className='todo'>
			<div className='todo__sidebar'>
				<List
					onClickItem={list => history.push(`/`)}
					items={[
						{
							active: !activeItem,
							icon: (
								<svg
									width='18'
									height='18'
									viewBox='0 0 18 18'
									fill='none'
									xmlns='http://www.w3.org/2000/svg'
								>
									<path
										d='M12.96 8.10001H7.74001C7.24321 8.10001 7.20001 8.50231 7.20001 9.00001C7.20001 9.49771 7.24321 9.90001 7.74001 9.90001H12.96C13.4568 9.90001 13.5 9.49771 13.5 9.00001C13.5 8.50231 13.4568 8.10001 12.96 8.10001V8.10001ZM14.76 12.6H7.74001C7.24321 12.6 7.20001 13.0023 7.20001 13.5C7.20001 13.9977 7.24321 14.4 7.74001 14.4H14.76C15.2568 14.4 15.3 13.9977 15.3 13.5C15.3 13.0023 15.2568 12.6 14.76 12.6ZM7.74001 5.40001H14.76C15.2568 5.40001 15.3 4.99771 15.3 4.50001C15.3 4.00231 15.2568 3.60001 14.76 3.60001H7.74001C7.24321 3.60001 7.20001 4.00231 7.20001 4.50001C7.20001 4.99771 7.24321 5.40001 7.74001 5.40001ZM4.86001 8.10001H3.24001C2.74321 8.10001 2.70001 8.50231 2.70001 9.00001C2.70001 9.49771 2.74321 9.90001 3.24001 9.90001H4.86001C5.35681 9.90001 5.40001 9.49771 5.40001 9.00001C5.40001 8.50231 5.35681 8.10001 4.86001 8.10001ZM4.86001 12.6H3.24001C2.74321 12.6 2.70001 13.0023 2.70001 13.5C2.70001 13.9977 2.74321 14.4 3.24001 14.4H4.86001C5.35681 14.4 5.40001 13.9977 5.40001 13.5C5.40001 13.0023 5.35681 12.6 4.86001 12.6ZM4.86001 3.60001H3.24001C2.74321 3.60001 2.70001 4.00231 2.70001 4.50001C2.70001 4.99771 2.74321 5.40001 3.24001 5.40001H4.86001C5.35681 5.40001 5.40001 4.99771 5.40001 4.50001C5.40001 4.00231 5.35681 3.60001 4.86001 3.60001Z'
										fill='black'
									/>
								</svg>
							),
							name: 'Список задач',
						},
					]}
				/>
				{lists ? (
					<List
						items={lists}
						onRemoveList={onRemoveList}
						onClickItem={list => {
							history.push(`/lists/${list.id}`);
						}}
						activeItem={activeItem}
						isRemovable
					/>
				) : (
					<p className='todo__sidebar--lists-loading'>Загрузка..</p>
				)}

				<AddListButton onAddNewList={onAddNewList} colors={colors} />
			</div>
			<div className='todo__tasks'>
				<Route exact path='/'>
					{lists &&
						lists.map(list => (
							<Tasks
								key={list.id}
								list={list}
								onAddNewTask={onAddNewTask}
								onEditListTitle={onEditListTitle}
								onRemoveTask={onRemoveTask}
								onEditTask={onEditTask}
								onCompleteTask={onCompleteTask}
							/>
						))}
				</Route>
				<Route path='/lists/:id'>
					{lists && activeItem && (
						<Tasks
							list={activeItem}
							onAddNewTask={onAddNewTask}
							onEditListTitle={onEditListTitle}
							onRemoveTask={onRemoveTask}
							onEditTask={onEditTask}
							onCompleteTask={onCompleteTask}
						/>
					)}
				</Route>
			</div>
		</div>
	);
}

export default App;
