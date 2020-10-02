import React, { useState } from 'react';
import { useEffect } from 'react';
import axios from 'axios';
import swal from '@sweetalert/with-react';
import Label from '../Label/Label';
import ContentHeader from '../ContentHeader/ContentHeader';
import EmptyDataPlaceholder from '../EmptyDataPlacehoder/EmptyDataPlaceholder';
import UpdateYearsSemestersDialogBox from './UpdateYearsSemestersDialogBox';
import PreLoader from '../PreLoader/PreLoader';
import { store } from 'react-notifications-component';
import { buildToast } from '../../util/toast';
import { FaSpinner } from 'react-icons/fa';

function StudentGroupsYearsSemesters(props) {
	const [year, setYear] = useState('');
	const [semester, setSemester] = useState('');
	const [yearsemesterList, setYearSemesterList] = useState([]);

	const [isYearValid, setIsYearValid] = useState(true);
	const [yearErrorMsg, setYearErrorMsg] = useState('');
	const [isSemesterValid, setIsSemesterValid] = useState(true);
	const [semesterErrorMsg, setSemesterErrorMsg] = useState('');

	const [loading, setLoading] = useState(true);
	const [isAdding, setIsAdding] = useState(false);

	useEffect(() => {
		const CancelToken = axios.CancelToken;
		const source = CancelToken.source();

		const loadData = () => {
			axios
				.get(
					'https://time-table-manager.herokuapp.com/api/v1/yearsemesters',
					{
						cancelToken: source.token,
					}
				)
				.then(function (response) {
					console.log(response.data.data.yearsemesters);
					setYearSemesterList(response.data.data.yearsemesters);
					setLoading(false);
				})
				.catch(function (error) {
					console.log(error);
					setLoading(false);
				});
		};

		loadData();

		return () => {
			source.cancel();
		};
	}, []);

	const handleKeyDown = (e) => {
		if (e.keyCode === 13) {
			addYearSemester(e);
		}
	};

	const addYearSemester = async (e) => {
		e.preventDefault();
		if (
			(year === '' || year === '0' || year === 'e') &&
			(semester === '' || semester === '0' || semester === 'e')
		) {
			setIsYearValid(false);
			setYearErrorMsg('Please Enter Valid Year!');
			setYear('');

			setIsSemesterValid(false);
			setSemesterErrorMsg('Please Enter Valid Semester!');
			setSemester('');
		}
		if (year === '' || year === '0' || year === 'e') {
			setIsYearValid(false);
			setYearErrorMsg('Please Enter Valid Year!');
			setYear('');
		} else if (semester === '' || semester === '0' || semester === 'e') {
			setIsSemesterValid(false);
			setSemesterErrorMsg('Please Enter Valid Semester!');
			setSemester('');
		} else if (!/^\d+$/.test(year)) {
			setIsYearValid(false);
			setYearErrorMsg('Year Should be a Positive Number!');
			setYear('');
		} else if (!/^\d+$/.test(semester)) {
			setIsSemesterValid(false);
			setSemesterErrorMsg('Semester Should be a Positive Number!');
			setSemester('');
		} else if (year > 4 || year < 0) {
			setIsYearValid(false);
			setYearErrorMsg('Year Should be in Between 1 and 4!');
			setYear('');
		} else if (semester > 2 || semester < 0) {
			setIsSemesterValid(false);
			setSemesterErrorMsg('Semester Should be 1 or 2!');
			setSemester('');
		} else {
			setIsAdding(true);

			let isExist = false;

			yearsemesterList.forEach((element) => {
				if (element.yearsemestername === `Y${year}.S${semester}`) {
					setIsYearValid(false);
					setIsSemesterValid(false);
					setYearErrorMsg(
						'The Year Semester Combination You Entered is Already Exist!'
					);
					isExist = true;
					setYear('');
					setSemester('');
					setIsAdding(false);
				}
			});

			if (!isExist) {
				axios
					.post(
						'https://time-table-manager.herokuapp.com/api/v1/yearsemesters',
						{
							yearsemestername: `Y${year}.S${semester}`,
						}
					)
					.then(function (response) {
						console.log(response.data.data.yearsemester);
						setYearSemesterList([
							...yearsemesterList,
							response.data.data.yearsemester,
						]);
						setYear('');
						setSemester('');
						setIsAdding(false);

						store.addNotification(
							buildToast(
								'success',
								'Success',
								'Year and Semester Added Successfully'
							)
						);
					})
					.catch(function (error) {
						console.log(error);
					});
			}
		}
	};

	const deleteYearSemester = (yearsemesterId) => {
		axios
			.delete(
				`https://time-table-manager.herokuapp.com/api/v1/yearsemesters/${yearsemesterId}`
			)
			.then((res) => {
				swal.close();
				setYearSemesterList(
					yearsemesterList.filter((item) => {
						return yearsemesterId !== item._id;
					})
				);
				store.addNotification(
					buildToast(
						'danger',
						'Deleted',
						'Year and Semester Deleted Successfully'
					)
				);
			})
			.catch((err) => {
				console.log(err);
			});
	};

	const onInputChangeYear = (e) => {
		if (e.target.value > 0 || e.target.value === '')
			setYear(e.target.value);
		setIsYearValid(true);
		setYearErrorMsg('');
	};

	const onInputChangeSemester = (e) => {
		if (e.target.value > 0 || e.target.value === '')
			setSemester(e.target.value);
		setIsSemesterValid(true);
		setSemesterErrorMsg('');
	};

	return (
		<div>
			<PreLoader loading={loading} hasSideBar={true} />
			<ContentHeader header={'Years & Semesters'} />

			<form
				style={{
					marginLeft: '15%',
					marginTop: '3%',
				}}
			>
				<div className='form-row'>
					<div className='col-md-4 mb-3'>
						{/* <label>First name</label> */}
						<input
							type='number'
							className={
								isYearValid
									? 'form-control'
									: 'form-control is-invalid'
							}
							placeholder='Year'
							onChange={onInputChangeYear}
							onKeyDown={handleKeyDown}
							value={year}
							data-toggle='tooltip'
							data-placement='top'
							title='Year can be a positive number between 1 and 4'
						/>
						<div className='invalid-feedback'>{yearErrorMsg}</div>
					</div>
					<div className='col-md-4 mb-3'>
						<input
							type='number'
							className={
								isSemesterValid
									? 'form-control'
									: 'form-control is-invalid'
							}
							placeholder='Semester'
							onChange={onInputChangeSemester}
							onKeyDown={handleKeyDown}
							value={semester}
							data-toggle='tooltip'
							data-placement='top'
							title='Semester can be number 1 or 2'
						/>
						<div className='invalid-feedback'>
							{semesterErrorMsg}
						</div>
					</div>
					<div className='col-md-2 mb-3'>
						<button
							className='btn btn-primary'
							onClick={addYearSemester}
						>
							{isAdding ? (
								<div>
									Adding <FaSpinner className='spin' />
								</div>
							) : (
								'Add'
							)}
						</button>
					</div>
				</div>
			</form>

			{/* <div
                style={{
                    position: 'fixed',
                    width: '35%',
                    textAlign: 'center',
                    left: '60%',
                    padding: '20px',
                    transform: 'translate(-50%, 0)',
                }}
                className="input-group mb-3"
            >
                <input
                    style={{ borderRadius: 0 }}
                    type="text"
                    className="form-control"
                    placeholder="Year"
                    onChange={onInputChangeYear}
                    onKeyDown={handleKeyDown}
                    value={year}
                    data-toggle="tooltip"
                    data-placement="top"
                    title="Year can be a positive number between 1 and 4"
                />
                <input
                    style={{ marginLeft: 20, borderRadius: 0 }}
                    type="text"
                    className="form-control"
                    placeholder="Semester"
                    onChange={onInputChangeSemester}
                    onKeyDown={handleKeyDown}
                    value={semester}
                    data-toggle="tooltip"
                    data-placement="top"
                    title="Semester can be number 1 or 2"
                />
                <button
                    style={{ marginLeft: 20, borderRadius: 0 }}
                    type="button"
                    className="btn btn-primary"
                    onClick={addYearSemester}
                >
                    Add
                </button>
            </div> */}

			<div
				style={{
					textAlign: 'center',
					marginTop: '5%',
					padding: '10px',
					overflowY: 'auto',
				}}
				className='row'
			>
				{yearsemesterList.length === 0 ? (
					<div
						style={{
							width: '100%',
						}}
					>
						<EmptyDataPlaceholder message='Year Semester List is Currently Empty' />
					</div>
				) : (
					yearsemesterList.map((tag) => (
						<div key={tag._id}>
							<div className='col'>
								<Label
									id={tag._id}
									deleteMethod={deleteYearSemester}
									tagName={tag.yearsemestername}
									component={UpdateYearsSemestersDialogBox}
									yearSemesterList={yearsemesterList}
									setYearSemesterList={setYearSemesterList}
								/>
							</div>
						</div>
					))
				)}
			</div>
		</div>
	);
}

export default StudentGroupsYearsSemesters;
