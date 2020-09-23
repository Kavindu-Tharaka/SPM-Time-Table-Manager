import React from 'react';
import { useDrag } from 'react-dnd';
import { ItemTypes } from '../../util/ItemTypes';

import './roomCard.css'

const RoomCard = (props) => {

    const name = props.name;

    const assignRoom = (tag) => {
        alert(`You dropped ${name} into ${tag}!`);
    }

    const [{ isDragging }, drag] = useDrag({
		item: { name, type: ItemTypes.RoomCard },
		end: (item, monitor) => {
			const dropResult = monitor.getDropResult();
			if (item && dropResult) {
				assignRoom(dropResult.name);
			}
		},
		collect: (monitor) => ({
			isDragging: monitor.isDragging(),
		}),
    });

    const opacity = isDragging ? 0.3 : 1;

    return (
        <div className='room-card-container' ref={drag} style={{ opacity }}>
            <p>{name}</p>
        </div>
    );
};

export default RoomCard;