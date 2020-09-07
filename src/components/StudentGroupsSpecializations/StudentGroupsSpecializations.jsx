import React, { useState } from 'react';
import { useEffect } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import Tag from '../Tag/Tag';
import ContentHeader from '../ContentHeader/ContentHeader';
import EmptyDataPlaceholder from '../EmptyDataPlacehoder/EmptyDataPlaceholder';
import swal from '@sweetalert/with-react';
import UpdateSpecializationsDialogBox from './UpdateSpecializationsDialogBox';

function StudentGroupsSpecializations(props) {
    const [specializationName, setSpecializationName] = useState('');
    const [specializationList, setSpecializationList] = useState([]);

    const [isSpecializationNameValid, setIsSpecializationNameValid] = useState(true);
    const [errorMsg, setErrorMsg] = useState('');
    
    useEffect(() => {
        const CancelToken = axios.CancelToken;
        const source = CancelToken.source();

        const loadData = () => {
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

    const handleKeyDown = (e) => {
        if (e.keyCode === 13) {
            addSpecializationName(e);
        }
    };

    const addSpecializationName = (e) => {
        e.preventDefault();
        if (specializationName === '') {
            setIsSpecializationNameValid(false);
            setErrorMsg('Please Enter a Specialization!');
			return;
        } 
        else if (!/^[a-zA-Z]+$/.test(specializationName)) {
            setIsSpecializationNameValid(false);
            setErrorMsg('Specialization can not include numbers!');
            setSpecializationName('');
			return;
        } 
        else {
            let isExist = false;

            specializationList.forEach((element) => {
                if (
                    element.specializationname ===
                    specializationName.toUpperCase()
                ) {
                    setIsSpecializationNameValid(false);
                    setErrorMsg('The Specialization You Entered is Already Exist!');
                    setSpecializationName('');
                    isExist = true;
                }
            });

            if (!isExist) {
                axios
                    .post('http://localhost:8000/api/v1/specializations', {
                        specializationname: specializationName.toUpperCase(),
                    })
                    .then(function (response) {
                        console.log(response.data.data.specialization);
                        setSpecializationList([
                            ...specializationList,
                            response.data.data.specialization,
                        ]);
                        setSpecializationName('');
                    })
                    .catch(function (error) {
                        console.log(error);
                    });
            }
        }
    };

    const deleteSpecializationName = (specializationId) => {
        axios
            .delete(
                `http://localhost:8000/api/v1/specializations/${specializationId}`
            )
            .then((res) => {
                swal.close();
                setSpecializationList(
                    specializationList.filter((item) => {
                        return specializationId !== item._id;
                    })
                );
            })
            .catch((err) => {
                console.log(err);
            });
    };

    const onInputChange = (e) => {
        setSpecializationName(e.target.value);
        setErrorMsg('');
        setIsSpecializationNameValid(true);
    };

    return (
        <div>
            <ContentHeader header={'Specializations'} />

            <form style={{
                marginLeft:'30%',
                marginTop:'3%',
            }}>
                <div className="form-row">
                    <div className="col-md-5 mb-3">
                        {/* <label>First name</label> */}
                        <input
                            type='text'
                            className={
                                isSpecializationNameValid
                                    ? 'form-control'
                                    : 'form-control is-invalid'
                            }
                            placeholder='Specialization'
                            onChange={onInputChange}
                            onKeyDown={handleKeyDown}
                            value={specializationName}
                            data-toggle="tooltip"
                            data-placement="top"
                            title="Enter an acronym of a specialization."
					    />
                        <div className='invalid-feedback'>
                            {errorMsg}
					    </div>
                    </div>
                    <div className="col-md-2 mb-3">
                    <button
                        className='btn btn-primary'
                        onClick={addSpecializationName}
				    >
					    Add
				    </button>                    
                </div>
                </div>
            </form>

            {/* <div
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
                    placeholder="Specialization Name"
                    onChange={onInputChange}
                    onKeyDown={handleKeyDown}
                    value={specializationName}
                    data-toggle="tooltip"
                    data-placement="top"
                    title="Tag can be an acronym of a specialization."
                />
                <button
                    style={{ marginLeft: 20, borderRadius: 0 }}
                    type="button"
                    className="btn btn-primary"
                    onClick={addSpecializationName}
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
                className="row"
            >
                {specializationList.length === 0 ? (
                    <div
                        style={{
                            width: '100%',
                        }}
                    >
                        <EmptyDataPlaceholder message="Specialization List is Currently Empty" />
                    </div>
                ) : (
                    specializationList.map((tag) => (
                        <div key={tag._id}>
                            <div className="col">
                                <Tag
                                    id={tag._id}
                                    deleteMethod={deleteSpecializationName}
                                    tagName={tag.specializationname}
                                    component={UpdateSpecializationsDialogBox}
                                    itemList={specializationList}
                                    setItemList={setSpecializationList}
                                />
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
}

export default StudentGroupsSpecializations;
