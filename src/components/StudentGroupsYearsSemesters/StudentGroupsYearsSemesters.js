import React, { useState } from 'react';
import { useEffect } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import Label from '../Label/Label';

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

    const addYearSemester = (e) => {
        e.preventDefault();
        if (year === '' || semester === '') {
            Swal.fire('Please Enter a Year and a Semster!');
        } else {
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
    };

    const deleteYearSemester = (yearsemesterId) => {
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            // icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            // cancelButtonColor: '#3085d6',
            confirmButtonText: 'Delete',
        }).then((result) => {
            if (result.value) {
                axios
                    .delete(
                        `http://localhost:8000/api/v1/yearsemesters/${yearsemesterId}`
                    )
                    .then((res) => {
                        setYearSemesterList(
                            yearsemesterList.filter((item) => {
                                return yearsemesterId !== item._id;
                            })
                        );
                    })
                    .catch((err) => {
                        console.log(err);
                    });
            }
        });
    };

    const editYearSemester = (inputText, id) => {
        Swal.mixin({
            input: 'text',
            inputValue: inputText,
            confirmButtonText: 'Edit',
            showCancelButton: true,
        })
            .queue([
                {
                    title: 'Edit Year Semester Combination',
                },
            ])
            .then((result) => {
                if (result.value) {
                    const editedYearSemester = result.value[0];
                    if (`Y${year}.S${semester}` !== editedYearSemester) {
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
            });
    };

    const onInputChangeYear = (e) => {
        setYear(e.target.value);
    };

    const onInputChangeSemester = (e) => {
        setSemester(e.target.value);
    };

    return (
        <div className="container">
            <h4>{'Years & Semesters'}</h4>
            <hr style={{ width: '100%' }} />
            <div
                style={{
                    position: 'fixed',
                    width: '30%',
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
                />
                <input
                    style={{ marginLeft: 20, borderRadius: 0 }}
                    type="text"
                    className="form-control"
                    placeholder="Semester"
                    onChange={onInputChangeSemester}
                    onKeyDown={handleKeyDown}
                    value={semester}
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
                    position: 'fixed',
                    // width: '95%',
                    textAlign: 'center',
                    top: '25%',
                    // left: '50%',
                    padding: '20px',
                    // transform: 'translate(-50%, 0)',
                    overflowY: 'auto',
                    height: '450px',
                }}
                className="row"
            >
                {yearsemesterList.map((tag) => (
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
                ))}
            </div>
        </div>
    );
}

export default StudentGroupsYearsSemesters
