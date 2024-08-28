import React from 'react';
import Badge from '../Badge/Badge';

import './List.scss';

function List({ items }) {
	return (
		<ul className='menu-list'>
			{items.map((item, index) => (
				<li className={item.active ? 'active' : ''} key={index}>
					<i>{item.icon ? item.icon : <Badge color={item.color} />}</i>
					<span>{item.name}</span>
				</li>
			))}
		</ul>
	);
}

export default List;
