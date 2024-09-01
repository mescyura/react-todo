import React from 'react';
import classNames from 'classnames';

import './Badge.scss';
import '../../colors.scss';

function Badge({ color, onClick, className }) {
	// return <i onClick={onClick} className={`badge badge--${color}`}></i>;
	return (
		<i
			onClick={onClick}
			className={classNames(
				'badge',
				{ [`color--bg-${color}`]: color },
				className
			)}
		></i>
	);
}

export default Badge;
