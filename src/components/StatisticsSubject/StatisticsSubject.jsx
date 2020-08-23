import React, { useEffect, useState } from 'react';
import ContentHeader from '../ContentHeader/ContentHeader';
import DataTable from 'react-data-table-component';
import axios from 'axios';

const StatisticsSubject = (props) => {

	const [subjects, setSubjects] = useState([]);

	useEffect(() => {
		axios.get('http://localhost:8000/api/v1/subjects').then((res) => {
			setSubjects(res.data.data.subjects)
		}).catch((err) => {
			console.log(err.response);
		})
	}, [])

	const columns = [
		{name: 'Subject Code', selector: 'subjectCode', sortable: true},
		{name: 'Offered Year', selector: 'subjectCode', sortable: true},
		{name: 'Offered Semester', selector: 'subjectCode', sortable: true},
		{name: 'Subject Name', selector: 'subjectCode', sortable: true},
		{name: 'Lecture Hours', selector: 'subjectCode', sortable: true},
		{name: 'Tutorial Hours', selector: 'subjectCode', sortable: true},
		{name: 'Evaluation Hours', selector: 'subjectCode', sortable: true},
	]

	return (
		<div>
			<ContentHeader header="Subject Statistics"/>

			<DataTable title='Inserted Subjects' columns={columns} pagination data={subjects}/>
		</div>
	);
};

export default StatisticsSubject;
