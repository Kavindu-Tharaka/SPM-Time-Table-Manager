import React from 'react';
import DataTable from 'react-data-table-component';
import axios from 'axios';
import { IoMdClose } from 'react-icons/io';
import swal from '@sweetalert/with-react';
import DeleteConfirmationDialogBox from '../DeleteConfirmationDialogBox/DeleteConfirmationDialogBox';
import { store } from 'react-notifications-component';
import { buildToast } from '../../util/toast';

const AssignForSessionsTable = (props) => {
	const removeSession = (roomIdAndSessionId) => {
		const roomId = roomIdAndSessionId.split('_')[0];
		const sessionId = roomIdAndSessionId.split('_')[1];
		const room = props.rooms.find((room) => room._id === roomId);

		const sessionIds = room.assignForSessions.filter(
			(session) => session._id !== sessionId
		);

		axios
			.patch(`http://localhost:8000/api/v1/rooms/${room._id}`, {
				assignForSessions: [...sessionIds],
			})
			.then(() => {
				swal.close();
				store.addNotification(
					buildToast('danger', 'Success', 'Session Removed')
				);
				props.refreshComponent();
			})
			.catch((err) => {
				console.log(err.response);
			});
	};

	const onDeleteClick = (room, session) => {
		swal({
			buttons: false,
			content: (
				<DeleteConfirmationDialogBox
					deleteEventWithIdHandler={removeSession}
					itemId={`${room._id}_${session._id}`}
					itemName={`${room.roomName} - ${session.asString}`}
				/>
			),
		});
	};

	const columns = [
		{ name: 'ID', selector: '_id', omit: true },
		{ name: 'Building', selector: 'building', omit: true },
		{
			name: 'Building',
			selector: 'building.buildingName',
			sortable: true,
		},
		{ name: 'Room Name', selector: 'roomName', sortable: true },
		{ name: 'Capacity', selector: 'capacity', sortable: true },
		{ name: 'Room Type', selector: 'roomType', sortable: true },
		{
			name: 'Allocated Sessions',
			cell: (row) => (
				<div className='cell'>
					{row.assignForSessions.map((session) => (
						<div key={session._id} className='row'>
							<div className='col-8'>
								<p>{session.asString}</p>
							</div>
							<div className='col-4'>
								<button
									className='sm-ctrl-btn sm-ctrl-btn-dlt afs-sm-ctrl-btn-dlt'
									onClick={() => {
										onDeleteClick(row, session);
									}}
								>
									<IoMdClose />
								</button>
							</div>
						</div>
					))}
				</div>
			),
		},
	];

	return (
		<DataTable
			title='Allocated Rooms'
			data={props.rooms}
			columns={columns}
			pagination
			dense
		/>
	);
};

export default AssignForSessionsTable;
