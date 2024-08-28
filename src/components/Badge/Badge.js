import React from 'react';

import './Badge.scss';

function Badge({ color }) {
	return <i className={`badge badge--${color}`}></i>;
}

export default Badge;
