import React from 'react';
import BuildingCard from './BuildingCard/BuildingCard';

const BuildingCards = (props) => {
	return (
		<div className='row row-cols-4'>
			{props.buildings.map((building) => {
				return (
					<BuildingCard
						key={building._id}
						building={building}
						refreshComponent={props.refreshComponent}
					/>
				);
			})}
		</div>
	);
};

export default BuildingCards;
