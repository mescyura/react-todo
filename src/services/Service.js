import axios from 'axios';

const GET_ALL_LISTS_URL =
	'http://localhost:3001/lists?_expand=color&_embed=tasks';
const LIST_URL = 'http://localhost:3001/lists';
const TASK_URL = 'http://localhost:3001/tasks';
const COLORS_URL = 'http://localhost:3001/colors';

class Service {
	getLists() {
		return axios.get(GET_ALL_LISTS_URL);
	}

	addList(list) {
		return axios.post(LIST_URL, list);
	}

	editListTitle(id, list) {
		return axios.patch(LIST_URL + '/' + id, list);
	}

	removeList(id) {
		return axios.delete(LIST_URL + '/' + id);
	}

	getColors() {
		return axios.get(COLORS_URL);
	}

	addTask(task) {
		return axios.post(TASK_URL, task);
	}

	editTask(id, task) {
		return axios.patch(TASK_URL + '/' + id, task);
	}

	removeTask(id) {
		return axios.delete(TASK_URL + '/' + id);
	}
}

export default new Service();
