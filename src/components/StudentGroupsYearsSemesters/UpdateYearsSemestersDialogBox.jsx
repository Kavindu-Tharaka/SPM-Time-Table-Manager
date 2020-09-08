import React, { useState } from 'react';
import swal from '@sweetalert/with-react';
import axios from 'axios';

import './updateYearsSemestersDialogBox.css';

const UpdateYearsSemestersDialogBox = (props) => {
    const [year, setYear] = useState(parseInt(props.itemName.substring(1, 2)));
    const [semester, setSemester] = useState(
        parseInt(props.itemName.substring(4, 5))
    );

    const setYearSemesterList = props.setYearSemesterList;
    const yearsemesterList = props.yearSemesterList;

    const [isYearValid, setIsYearValid] = useState(true);
    const [yearErrorMsg, setYearErrorMsg] = useState('');
    const [isSemesterValid, setIsSemesterValid] = useState(true);
    const [semesterErrorMsg, setSemesterErrorMsg] = useState('');

    const editYearSemester = (year, semester, id) => {
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
            if (
                props.itemName.substring(1, 2) !== year &&
                props.itemName.substring(4, 5) !== semester
            ) {
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
                    }
                });

                if (!isExist) {
                    axios
                        .patch(
                            `http://localhost:8000/api/v1/yearsemesters/${id}`,
                            {
                                yearsemestername: `Y${year}.S${semester}`,
                            }
                        )
                        .then((res) => {
                            setYearSemesterList((prevlist) =>
                                prevlist.map((listItem) =>
                                    id === listItem._id
                                        ? {
                                              ...listItem,
                                              yearsemestername: `Y${year}.S${semester}`,
                                          }
                                        : listItem
                                )
                            );
                            swal.close();
                        })
                        .catch((err) => console.log(err));
                }
            } else {
                swal.close();
            }
        }
    };

    const onYearChange = (e) => {
		if(e.target.value > 0 || e.target.value === '')
			setYear(e.target.value);
			
		setIsYearValid(true);
		setYearErrorMsg('');
    };

    const onSemesterChange = (e) => {
		if(e.target.value > 0 || e.target.value === '')
			setSemester(e.target.value);

		setIsSemesterValid(true);
		setSemesterErrorMsg('');
    };

    return (
        <div className="dcdb-dialog-container">
            <h5 className="text-left m-0">Update Year & Semester</h5>
            <hr />

            <div className="form-row">
                <div className="form-group col-6">
                    <input
						type="number"
						placeholder="Year"
                        className={
                            isYearValid
                                ? 'form-control'
                                : 'form-control is-invalid'
                        }
                        onChange={onYearChange}
                        value={year}
                    />
                    <div
                        style={{ textAlign: 'left' }}
                        className="invalid-feedback"
                    >
                        {yearErrorMsg}
                    </div>
                </div>
                <div className="form-group col-6">
                    <input
						type="number"
						placeholder="Semester"
                        className={
                            isSemesterValid
                                ? 'form-control'
                                : 'form-control is-invalid'
                        }
                        onChange={onSemesterChange}
                        value={semester}
                    />
                    <div
                        style={{ textAlign: 'left' }}
                        className="invalid-feedback"
                    >
                        {semesterErrorMsg}
                    </div>
                </div>
            </div>
            <hr />

            <button
                className="btn btn-info float-right mb-4"
                onClick={() => editYearSemester(year, semester, props.id)}
            >
                Update
            </button>
            <button
                className="btn btn-secondary float-right mb-4 mr-2"
                onClick={() => {
                    swal.close();
                }}
            >
                Cancel
            </button>
        </div>
    );
};

export default UpdateYearsSemestersDialogBox;
