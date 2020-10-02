import React from 'react';
import DataTable from 'react-data-table-component';
import axios from 'axios';
import { IoMdClose } from 'react-icons/io';
import swal from '@sweetalert/with-react';
import DeleteConfirmationDialogBox from '../DeleteConfirmationDialogBox/DeleteConfirmationDialogBox';
import { store } from 'react-notifications-component';
import { buildToast } from '../../util/toast';

const UnavailableTimesTable = (props) => {
	const removeUnAvailableTime = (roomIdAndUnAvailableTimeId) => {
		const roomId = roomIdAndUnAvailableTimeId.split('_')[0];
		const unAvailableTimeId = roomIdAndUnAvailableTimeId.split('_')[1];
		const room = props.rooms.find((room) => room._id === roomId);

		const unAvailableTimeIds = room.unAvailableTimes.filter(
			(unAvailableTime) => unAvailableTime._id !== unAvailableTimeId
		);

		axios
			.patch(
				`https://time-table-manager.herokuapp.com/api/v1/rooms/${room._id}`,
				{
					unAvailableTimes: [...unAvailableTimeIds],
				}
			)
			.then(() => {
				swal.close();
				store.addNotification(
					buildToast('danger', 'Success', 'UnAvailableTime Removed')
				);
				props.refreshComponent();
			})
			.catch((err) => {
				console.log(err.response);
			});
	};

	const onDeleteClick = (room, unAvailableTime) => {
		swal({
			buttons: false,
			content: (
				<DeleteConfirmationDialogBox
					deleteEventWithIdHandler={removeUnAvailableTime}
					itemId={`${room._id}_${unAvailableTime._id}`}
					itemName={`${unAvailableTime.date} | ${unAvailableTime.from} | ${unAvailableTime.to}`}
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
			name: 'UnAvailableTimes',
			cell: (row) => (
				<div className='cell'>
					{row.unAvailableTimes.map((unAvailableTime) => (
						<div key={unAvailableTime._id} className='row'>
							<div className='col-8'>
								<p>{`${unAvailableTime.date} | ${unAvailableTime.from} | ${unAvailableTime.to}`}</p>
							</div>
							<div className='col-4'>
								<button
									className='sm-ctrl-btn sm-ctrl-btn-dlt afs-sm-ctrl-btn-dlt'
									onClick={() => {
										onDeleteClick(row, unAvailableTime);
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

export default UnavailableTimesTable;
