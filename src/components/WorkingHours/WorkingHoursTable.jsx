import React, { useEffect, useState } from 'react';
import axios from 'axios';
import DataTable from 'react-data-table-component';
import DeleteConfirmationDialogBox from '../DeleteConfirmationDialogBox/DeleteConfirmationDialogBox';
import UpdateWorkingHoursDialogBox from '../UpdateWorkingHoursDialogBox/UpdateWorkingHoursDialogBox';
import { store } from 'react-notifications-component';
import { buildToast } from '../../util/toast';
import swal from '@sweetalert/with-react';
import EmptyDataPlaceholder from '../EmptyDataPlacehoder/EmptyDataPlaceholder';
import './workingHours.css';
import { IoMdClose, IoMdCreate } from 'react-icons/io';

function WorkingHoursTable({ workingDay, refreshComponent }) {
	useEffect(() => {
		console.log(workingDay);
	}, []);

	//delete functionality
	const onDeleteClick = (id) => {
		swal({
			buttons: false,
			content: (
				<DeleteConfirmationDialogBox
					deleteEventWithIdHandler={deleteWorkingDay}
					itemId={id}
				/>
			),
		});
	};

	const deleteWorkingDay = async (id) => {
		try {
			axios
				.delete(
					`https://time-table-manager.herokuapp.com/api/v1/workingDays/${id}`
				)
				.then((res) => {
					swal.close();
					store.addNotification(
						buildToast('danger', 'Deleted', 'Working hour deleted')
					);
					refreshComponent();
				})
				.catch((err) => {
					console.log(err.response);
				});
		} catch (error) {}
	};

	const updateWorkingDay = (row) => {
		swal({
			buttons: false,
			content: (
				<UpdateWorkingHoursDialogBox
					row={row}
					workingDay={workingDay}
					refreshComponent={refreshComponent}
				/>
			),
		});
	};

	const columns = [
		{
			name: 'ID',
			selector: '_id',
			sortable: true,
			omit: true,
		},
		{
			name: 'Day Type',
			selector: 'dayType',
			sortable: true,
		},
		{
			name: 'Day of Work',
			selector: 'dayOfWork',
			sortable: true,
		},

		{
			name: 'From',
			selector: 'fromTime',
		},
		{
			name: 'To',
			selector: 'toTime',
		},
		{
			name: 'Time Slot',
			selector: 'timeSlot',
			sortable: true,
		},
		{
			name: 'Actions',
			selector: 'action',
			cell: (row) => (
				<>
					<button
						className='sm-ctrl-btn sm-ctrl-btn-upt'
						style={style.button}
						onClick={() => updateWorkingDay(row)}
					>
						<IoMdCreate />
					</button>
					<button
						style={style.button}
						className='sm-ctrl-btn sm-ctrl-btn-dlt'
						onClick={() => onDeleteClick(row._id)}
					>
						<IoMdClose />
					</button>
				</>
			),
			ignoreRowClick: true,
			allowOverflow: true,
			button: true,
		},
	];
	return (
		<>
			<DataTable
				noDataComponent={
					<EmptyDataPlaceholder message={'No Data Found'} />
				}
				subHeader={true}
				title='Working Hours'
				columns={columns}
				data={workingDay}
				pagination={true}
				paginationTotalRows={7}
				paginationPerPage={7}
				highlightOnHover={true}
				responsive={true}
				dense
			/>
		</>
	);
}

export default WorkingHoursTable;

const style = {
	button: {
		borderRadius: '50%',
		paddingBottom: 10,
		border: 'none',
		marginRight: 10,
	},
};
