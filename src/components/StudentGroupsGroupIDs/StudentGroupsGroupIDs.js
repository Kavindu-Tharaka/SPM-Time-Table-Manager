import React, { useState } from 'react';
import { useEffect } from 'react';
import Tag from '../../components/Tag/Tag';
import axios from 'axios';
import Swal from 'sweetalert2';
import ContentHeader from '../../components/ContentHeader/ContentHeader';
import { Label } from 'reactstrap';

function StudentGroupsGroupIDs(props) {
    const [yearSemester, setYearSemester] = useState('');
    const [yearSemesterList, setYearSemesterList] = useState([]);

    const [specialization, setSpecialization] = useState('');
    const [specializationList, setSpecializationList] = useState([]);

    const [groupNumber, setGroupNumber] = useState('');
    const [groupNumberList, setGroupNumberList] = useState([]);

    useEffect(() => {
        const CancelToken = axios.CancelToken;
        const source = CancelToken.source();

        // props.setShowSubMenu(false);

        const loadData = () => {
            axios
                .get('http://localhost:8000/api/v1/yearsemesters', {
                    cancelToken: source.token,
                })
                .then(function (response) {
                    console.log(response.data.data.yearsemesters);
                    setYearSemesterList(response.data.data.yearsemesters);
                    setYearSemester(
                        response.data.data.yearsemesters[0].yearsemestername
                    );
                })
                .catch(function (error) {
                    console.log(error);
                });

            axios
                .get('http://localhost:8000/api/v1/groupnumbers', {
                    cancelToken: source.token,
                })
                .then(function (response) {
                    console.log(response.data.data.groupnumbers);
                    setGroupNumberList(response.data.data.groupnumbers);
                    setGroupNumber(
                        response.data.data.groupnumbers[0].groupnumber
                    );
                })
                .catch(function (error) {
                    console.log(error);
                });

            axios
                .get('http://localhost:8000/api/v1/specializations', {
                    cancelToken: source.token,
                })
                .then(function (response) {
                    console.log(response.data.data.specializations);
                    setSpecializationList(response.data.data.specializations);
                    setSpecialization(
                        response.data.data.specializations[0].specializationname
                    );
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

    const onInputChangeYearSemester = (e) => {
        setYearSemester(e.target.value);
        console.log(yearSemester);
    };
    const onInputChangeSpecialization = (e) => {
        setSpecialization(e.target.value);
        console.log(specialization);
    };
    const onInputChangeGroupNumber = (e) => {
        setGroupNumber(e.target.value);
        console.log(groupNumber);
    };

    const addGroupID = (e) => {
        e.preventDefault();
        console.log(yearSemester);
        console.log(specialization);
        console.log(groupNumber);
    };

    return (
        <div>
            <ContentHeader header={'Generate Group IDs'} />
            <div
                style={{
                    left: '20%',
                    marginTop: '3%',
                    paddingLeft: '17%',
                    paddingRight: '25%',
                }}
            >
                <div className="row">
                    <div className="col-4">
                        <Label>{'Year & Semester'}</Label>
                        <select
                            style={{ borderRadius: 0 }}
                            className="form-control form-control-sm"
                            value={yearSemester}
                            onChange={onInputChangeYearSemester}
                        >
                            {yearSemesterList.map((item) => (
                                <option
                                    key={item._id}
                                    value={item.yearsemestername}
                                >
                                    {item.yearsemestername}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className="col-4">
                        <Label>{'Specialization'}</Label>
                        <select
                            style={{ borderRadius: 0 }}
                            className="form-control form-control-sm"
                            value={specialization}
                            onChange={onInputChangeSpecialization}
                        >
                            {specializationList.map((item) => (
                                <option
                                    key={item._id}
                                    value={item.specializationname}
                                >
                                    {item.specializationname}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className="col-3">
                        <Label>{'Group Number'}</Label>

                        <select
                            style={{ borderRadius: 0 }}
                            className="form-control form-control-sm"
                            value={groupNumber}
                            onChange={onInputChangeGroupNumber}
                        >
                            {groupNumberList.map((item) => (
                                <option key={item._id} value={item.groupnumber}>
                                    {item.groupnumber}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className="col-1">
                        <Label style={{ color: 'transparent' }}>{'.'}</Label>{' '}
                        <br />
                        <button
                            className="btn btn-primary"
                            style={{ borderRadius: 0 }}
                            onClick={addGroupID}
                        >
                            Add
                        </button>
                    </div>
                </div>
            </div>
            <br />
            <ContentHeader label={'1st Year'} />
            <div></div>
            <br />
            <ContentHeader label={'2nd Year'} />
            <div></div>
            <br />
            <ContentHeader label={'3rd Year'} />
            <div></div>
            <br />
            <ContentHeader label={'4th Year'} />
            <div></div>
        </div>
    );
}

export default StudentGroupsGroupIDs;
