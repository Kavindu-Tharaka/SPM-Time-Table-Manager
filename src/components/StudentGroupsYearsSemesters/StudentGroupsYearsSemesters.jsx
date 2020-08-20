import React, { useState } from 'react';
import { useEffect } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import swal from '@sweetalert/with-react';
import Label from '../Label/Label';
import ContentHeader from '../ContentHeader/ContentHeader';
import EmptyDataPlaceholder from '../EmptyDataPlacehoder/EmptyDataPlaceholder';

function StudentGroupsYearsSemesters(props) {
    const [year, setYear] = useState('');
    const [semester, setSemester] = useState('');
    const [yearsemesterList, setYearSemesterList] = useState([]);

    useEffect(() => {
        const CancelToken = axios.CancelToken;
        const source = CancelToken.source();

        const loadData = () => {
            axios
                .get('http://localhost:8000/api/v1/yearsemesters', {
                    cancelToken: source.token,
                })
                .then(function (response) {
                    console.log(response.data.data.yearsemesters);
                    setYearSemesterList(response.data.data.yearsemesters);
                })
                .catch(function (error) {
                    console.log(error);
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
            year === '' ||
            semester === '' ||
            year === '0' ||
            semester === '0'
        ) {
            Swal.fire({
                text: 'Please Enter Valid Year and Semester!',
                confirmButtonColor: '#205374',
            });
            setYear('');
            setSemester('');
        } else if (!(/^\d+$/.test(year) && /^\d+$/.test(semester))) {
            Swal.fire({
                text: 'Year and Semster Should be Positive Numbers!',
                confirmButtonColor: '#205374',
            });
            setYear('');
            setSemester('');
        } else if (year > 4 || year < 0) {
            Swal.fire({
                text: 'Year Should be in Between 1 and 4!',
                confirmButtonColor: '#205374',
            });
            setYear('');
            setSemester('');
        } else if (semester > 2 || semester < 0) {
            Swal.fire({
                text: 'Semester Should be 1 or 2!',
                confirmButtonColor: '#205374',
            });
            setYear('');
            setSemester('');
        } else {
            let isExist = false;

            yearsemesterList.forEach((element) => {
                if (element.yearsemestername === `Y${year}.S${semester}`) {
                    Swal.fire({
                        text:
                            'The Year Semester Combination You Entered is Already Exist!',
                        confirmButtonColor: '#205374',
                    });
                    isExist = true;
                    setYear('');
                    setSemester('');
                }
            });

            if (!isExist) {
                axios
                    .post('http://localhost:8000/api/v1/yearsemesters', {
                        yearsemestername: `Y${year}.S${semester}`,
                    })
                    .then(function (response) {
                        console.log(response.data.data.yearsemester);
                        setYearSemesterList([
                            ...yearsemesterList,
                            response.data.data.yearsemester,
                        ]);
                        setYear('');
                        setSemester('');
                    })
                    .catch(function (error) {
                        console.log(error);
                    });
            }
        }
    };

    const deleteYearSemester = (yearsemesterId) => {
        // Swal.fire({
        //     title: 'Are you sure?',
        //     text: "You won't be able to revert this!",
        //     // icon: 'warning',
        //     showCancelButton: true,
        //     confirmButtonColor: '#205374',
        //     // cancelButtonColor: '#3085d6',
        //     confirmButtonText: 'Delete',
        // }).then((result) => {
        //     if (result.value) {
        axios
            .delete(
                `http://localhost:8000/api/v1/yearsemesters/${yearsemesterId}`
            )
            .then((res) => {
                swal.close();
                setYearSemesterList(
                    yearsemesterList.filter((item) => {
                        return yearsemesterId !== item._id;
                    })
                );
            })
            .catch((err) => {
                console.log(err);
            });
        //     }
        // });
    };

    const editYearSemester = (inputText, id) => {
        Swal.fire({
            // title: 'Edit Year Semester',
            html:
                // '<div class="container">' +
                // '<div class="row">' +
                // '<div class="col-5">' +
                // `<div class="row"> Year<input class="swal2-input" id="swal-input1" type="text" class="form-control" value=${inputText.substring(
                //     0,
                //     2
                // )} > </div>` +
                // '</div>' +
                // '<div class="col-1"></div>' +
                // '<div class="col-5">' +
                // `<div class="row"> Semester<input class="swal2-input" id="swal-input2" type="text" class="form-control" value=${inputText.substring(
                //     3,
                //     5
                // )} > </div>` +
                // '</div>' +
                // '</div>' +
                // '</div>',
                `<h4>Year</h4>
                <input class="swal2-input" id="swal-input1" value=${inputText.substring(
                    0,
                    2
                )}
                ><br/> <br/>
                <h4>Semester</h4>
                <input class="swal2-input" id="swal-input2" value=${inputText.substring(
                    3,
                    5
                )}>`,
            focusConfirm: true,
            confirmButtonText: 'Edit',
            confirmButtonColor: '#205374',
            showCancelButton: true,
            preConfirm: () => {
                const editedYear = document.getElementById('swal-input1').value;
                const editedSemester = document.getElementById('swal-input2')
                    .value;
                const editedYearSemester = `${editedYear}.${editedSemester}`;

                if (inputText !== editedYearSemester) {
                    if (
                        editedYearSemester.length !== 5 ||
                        !/(Y[1-4])/g.test(editedYearSemester) ||
                        !/(S[1-2])/g.test(editedYearSemester)
                    ) {
                        Swal.fire({
                            text:
                                'Year Semester Text Pattern does not matched! \n\n Should be in Y1.S1 format!',
                            confirmButtonColor: '#205374',
                        });
                    } else {
                        let isExist = false;

                        yearsemesterList.forEach((element) => {
                            if (
                                element.yearsemestername === editedYearSemester
                            ) {
                                Swal.fire({
                                    text:
                                        'The Year Semester Combination You Entered is Already Exist!',
                                    confirmButtonColor: '#205374',
                                });
                                isExist = true;
                            }
                        });

                        if (!isExist) {
                            if (inputText !== editedYearSemester) {
                                axios
                                    .patch(
                                        `http://localhost:8000/api/v1/yearsemesters/${id}`,
                                        {
                                            yearsemestername: editedYearSemester,
                                        }
                                    )
                                    .then((res) => {
                                        setYearSemesterList((prevlist) =>
                                            prevlist.map((listItem) =>
                                                id === listItem._id
                                                    ? {
                                                          ...listItem,
                                                          yearsemestername: editedYearSemester,
                                                      }
                                                    : listItem
                                            )
                                        );
                                    })
                                    .catch((err) => console.log(err));
                            }
                        }
                    }
                }
            },
        });
    };

    const onInputChangeYear = (e) => {
        setYear(e.target.value);
    };

    const onInputChangeSemester = (e) => {
        setSemester(e.target.value);
    };

    return (
        <div>
            <ContentHeader header={'Years & Semesters'} />
            <div
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
            </div>

            <div
                style={{
                    // position: 'fixed',
                    // width: '95%',
                    textAlign: 'center',
                    marginTop: '10%',
                    // left: '50%',
                    padding: '10px',
                    // transform: 'translate(-50%, 0)',
                    overflowY: 'auto',
                    // height: '450px',
                }}
                className="row"
            >
                {yearsemesterList.length === 0 ? (
                    <div
                        style={{
                            width: '100%',
                        }}
                    >
                        <EmptyDataPlaceholder message="Year Semester List is Currently Empty" />
                    </div>
                ) : (
                    yearsemesterList.map((tag) => (
                        <div key={tag._id}>
                            <div className="col">
                                <Label
                                    id={tag._id}
                                    deleteMethod={deleteYearSemester}
                                    editMethod={editYearSemester}
                                    tagName={tag.yearsemestername}
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
