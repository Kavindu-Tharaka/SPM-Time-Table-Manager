import React from 'react';
import DataTable from 'react-data-table-component';
import axios from 'axios';
import { IoMdClose } from 'react-icons/io';
import swal from '@sweetalert/with-react';
import DeleteConfirmationDialogBox from '../DeleteConfirmationDialogBox/DeleteConfirmationDialogBox';
import { store } from 'react-notifications-component';
import { buildToast } from '../../util/toast';

const AssignForGroupsTable = (props) => {
	const removeGroup = (roomIdAndGroupId) => {
		const roomId = roomIdAndGroupId.split('_')[0];
		const groupId = roomIdAndGroupId.split('_')[1];
		const room = props.rooms.find((room) => room._id === roomId);

		const groupIds = room.assignedGroups.filter(
			(group) => group._id !== groupId
		);

		axios
			.patch(
				`https://time-table-manager.herokuapp.com/api/v1/rooms/${room._id}`,
				{
					assignedGroups: [...groupIds],
				}
			)
			.then(() => {
				swal.close();
				store.addNotification(
					buildToast('danger', 'Success', 'Group Removed')
				);
				props.refreshComponent();
			})
			.catch((err) => {
				console.log(err.response);
			});
	};

	const onDeleteClick = (room, group) => {
		swal({
			buttons: false,
			content: (
				<DeleteConfirmationDialogBox
					deleteEventWithIdHandler={removeGroup}
					itemId={`${room._id}_${group._id}`}
					itemName={`${room.roomName} - ${group.subgroupid}`}
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
			name: 'Allocated Groups',
			cell: (row) => (
				<div className='cell'>
					{row.assignedGroups.map((group) => (
						<div key={group._id} className='row'>
							<div className='col-8'>
								<p>{group.subgroupid}</p>
							</div>
							<div className='col-4'>
								<button
									className='sm-ctrl-btn sm-ctrl-btn-dlt afs-sm-ctrl-btn-dlt'
									onClick={() => {
										onDeleteClick(row, group);
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

export default AssignForGroupsTable;
