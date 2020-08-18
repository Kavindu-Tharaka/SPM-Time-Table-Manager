import React from 'react';

import './contentHeader.css';

/**
 * This component accepts following props
 * header: Default null - Header text
 * label: Default null - Small label with some content after the text
 */

const ContentHeader = (props) => {
	const header = props.header || null;
	const label = props.label || null;

	return (
		<div className='ch-header-container'>
			<div className='d-flex flex-row'>
				<div>
					<h4>{header}</h4>
				</div>
				<div>
					{label ? (
						<label className='mt-2 ml-2 badge badge-pill badge-info'>
							{label}
						</label>
					) : null}
				</div>
			</div>
			<hr className='mt-0' />
		</div>
	);
};

export default ContentHeader;
