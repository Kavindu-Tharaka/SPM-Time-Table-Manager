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

    return (
        <div>
            <ContentHeader header={'Generate Group IDs'} />
            <div className="row">
                <div className="col-4">
                    <Label>{'Year & Semester'}</Label>
                    <select
                        style={{ borderRadius: 0 }}
                        className="form-control form-control-sm"
                    >
                        {yearSemesterList.map((item) => (
                            <option key={item._id}>
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
                    >
                        {specializationList.map((item) => (
                            <option key={item._id}>
                                {item.specializationname}
                            </option>
                        ))}
                    </select>
                </div>
                <div className="col-4">
                    <Label>{'Group Number'}</Label>

                    <select
                        style={{ borderRadius: 0 }}
                        className="form-control form-control-sm"
                    >
                        {groupNumberList.map((item) => (
                            <option key={item._id}>{item.groupnumber}</option>
                        ))}
                    </select>
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
