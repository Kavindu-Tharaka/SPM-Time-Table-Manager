import React, { useEffect, useState } from 'react';
import DataTable from 'react-data-table-component';
import axios from 'axios';
import { IoMdClose, IoMdCreate } from 'react-icons/io';
import swal from '@sweetalert/with-react';
import DeleteConfirmationDialogBox from '../DeleteConfirmationDialogBox/DeleteConfirmationDialogBox';
import UpdateRoomDialogBox from '../UpdateRoomDialogBox/UpdateRoomDialogBox';

const RoomsTable = (props) => {
	const onDeleteClick = (roomId, roomName) => {
		swal({
			buttons: false,
			content: (
				<DeleteConfirmationDialogBox
					deleteEventWithIdHandler={deleteRoom}
					itemId={roomId}
					itemName={roomName}
				/>
			),
		});
	};

	const deleteRoom = (roomId) => {
		axios
			.delete(`http://localhost:8000/api/v1/rooms/${roomId}`)
			.then((res) => {
				swal.close();
				props.refreshComponent();
			})
			.catch((err) => {
				console.log(err.response);
			});
	};

	const onUpdateClick = (room) => {
		swal({
			buttons: false,
			content: (
				<UpdateRoomDialogBox
					room={room}
					buildings={props.buildings}
					refreshComponent={props.refreshComponent}
				/>
			),
		});
	};

	const columns = [
		{ name: 'ID', selector: '_id', omit: true },
		{ name: 'Building', selector: 'building', omit: true },
		{ name: 'Room Name', selector: 'roomName', sortable: true },
		{ name: 'Floor', selector: 'floor', sortable: true },
		{ name: 'Capacity', selector: 'capacity', sortable: true },
		{ name: 'Room Type', selector: 'roomType', sortable: true },
		{
			name: 'Action',
			cell: (row) => (
				<div>
					<button
						className='sm-ctrl-btn sm-ctrl-btn-upt bc-sm-ctrl-btn-upt'
						onClick={() => {
							onUpdateClick({
								_id: row._id,
								building: row.building,
								roomName: row.roomName,
								floor: row.floor,
								capacity: row.capacity,
								roomType: row.roomType,
							});
						}}
					>
						<IoMdCreate />
					</button>
					<button
						className='sm-ctrl-btn sm-ctrl-btn-dlt bc-sm-ctrl-btn-dlt'
						onClick={() => {
							onDeleteClick(row._id, row.roomName);
						}}
					>
						<IoMdClose />
					</button>
				</div>
			),
		},
	];

	return (
		<DataTable
			title='Inserted Rooms'
			data={props.rooms}
			columns={columns}
			pagination
		/>
	);
};

export default RoomsTable;
