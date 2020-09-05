import React, { useState, useEffect } from 'react';
import ContentHeader from '../ContentHeader/ContentHeader';
import DataTable from 'react-data-table-component';
import axios from 'axios';
import PreLoader from '../PreLoader/PreLoader';

const StatisticsLecturer = (props) => {
	const [lecturers, setLecturers] = useState([]);

	const [loading, setLoading] = useState(true);

	useEffect(() => {
		axios
			.get('http://localhost:8000/api/v1/lecturers')
			.then((res) => {
				setLecturers(res.data.data.lecturers);
				setLoading(false);
			})
			.catch((err) => {
				console.log(err.response);
				setLoading(false);
			});
	}, []);

	const columns = [
		{ name: 'Emp ID', selector: 'employeeId', sortable: true },
		{ name: 'Name', selector: 'name', sortable: true },
		{ name: 'Faculty', selector: 'faculty', sortable: true },
		{ name: 'Center', selector: 'center', sortable: true },
		{ name: 'Department', selector: 'department', sortable: true },
		{ name: 'Building', selector: 'building', sortable: true },
		{ name: 'Level', selector: 'level', sortable: true },
		{ name: 'Rank', selector: 'rankVal', sortable: true },
	];

	return (
		<div>
			<PreLoader loading={loading} hasSideBar={true} />
			<ContentHeader header='Lecturer Statistics' />

			<DataTable
				title='Inserted Lecturers'
				columns={columns}
				data={lecturers}
				pagination
			/>
		</div>
	);
};

export default StatisticsLecturer;
