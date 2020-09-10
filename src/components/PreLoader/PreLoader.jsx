import React from 'react';
import { css } from '@emotion/core';
import ScaleLoader from 'react-spinners/ScaleLoader';

import './preLoader.css';

const PreLoader = (props) => {
	const override = css`
		display: block;
		margin: auto;
	`;

	return (
		<div
			className={
				props.loading
					? props.hasSideBar
						? 'loader-container-wsb'
						: 'loader-container-nsb'
					: 'd-none'
			}
		>
			<div className='loader-inner-container'>
				<ScaleLoader
					css={override}
					size={550}
					color={'#205374'}
					loading={props.loading}
				/>
				<p>Loading</p>
			</div>
		</div>
	);
};

export default PreLoader;
