import React, { useState } from 'react';
import { useEffect } from 'react';
import Tag from '../../components/Tag/Tag';
import axios from 'axios';
import swal from '@sweetalert/with-react';
import ContentHeader from '../../components/ContentHeader/ContentHeader';
import EmptyDataPlaceholder from '../EmptyDataPlacehoder/EmptyDataPlaceholder';
import UpdateTagsDialogBox from './UpdateTagsDialogBox';
import './tagContent.css';
import PreLoader from '../PreLoader/PreLoader';
import { store } from 'react-notifications-component';
import { buildToast } from '../../util/toast';

function TagContent(props) {
    const [tagName, setTagName] = useState('');
    const [tagList, setTagList] = useState([]);

	const [isTagNameValid, setIsTagNameValid] = useState(true);
	const [errorMsg, setErrorMsg] = useState('');

	const [loading, setLoading] = useState(true);

    useEffect(() => {
        const CancelToken = axios.CancelToken;
        const source = CancelToken.source();

        const loadData = () => {
            axios
                .get('http://localhost:8000/api/v1/tags', {
                    cancelToken: source.token,
                })
                .then(function (response) {
                    // console.log(response.data.data.tags);
                    setTagList(response.data.data.tags);
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
            addTagName(e);
        }
    };

    const addTagName = (e) => {
        e.preventDefault();

        if (tagName === '') {
            // Swal.fire({
            //     text: 'Please Enter a Tag Name!',
            //     confirmButtonColor: '#205374',
            // });
            setIsTagNameValid(false);
            setErrorMsg('Please Enter a valid Tag name!');
			return;
            
        } else {
            let isExist = false;

            tagList.forEach((element) => {
                if (element.tagname === tagName) {
                    // Swal.fire({
                    //     text: 'The Tag Name You Entered is Already Exists!',
                    //     confirmButtonColor: '#205374',
                    // });
                    setIsTagNameValid(false);
                    setErrorMsg('The Tag Name You Entered is Already Exists!');
                    isExist = true;
                    setTagName('');
                }
            });

            if (!isExist) {
                axios
                    .post('http://localhost:8000/api/v1/tags', {
                        tagname: tagName,
                    })
                    .then(function (response) {
                        console.log(response.data.data.tag);
                        setTagList([...tagList, response.data.data.tag]);
                        setTagName('');
				        store.addNotification(buildToast('success', 'Success', 'Tag Added Successfully'));
                    })
                    .catch(function (error) {
                        console.log(error);
                    });
            }
        }
    };

    const deleteTagName = (tagId) => {
        axios
            .delete(`http://localhost:8000/api/v1/tags/${tagId}`)
            .then((res) => {
                swal.close();
                setTagList(
                    tagList.filter((item) => {
                        return tagId !== item._id;
                    })
                );
                store.addNotification(buildToast('danger', 'Deleted', 'Tag Deleted Successfully'));
            })
            .catch((err) => {
                console.log(err);
            });
    };

    const onInputChange = (e) => {
        setTagName(e.target.value);
        setIsTagNameValid(true);
        setErrorMsg('');
    };

    return (
        <div>
			<PreLoader loading={loading} hasSideBar={false} />
            <ContentHeader header={'Tags'} />

            <form style={{
                marginLeft:'35%',
                marginTop:'3%',
            }}>
                <div className="form-row">
                    <div className="col-md-4 mb-3">
                        {/* <label>First name</label> */}
                        <input
                            type='text'
                            className={
                                isTagNameValid
                                    ? 'form-control'
                                    : 'form-control is-invalid'
                            }
                            placeholder='Tag Name'
                            onChange={onInputChange}
                            onKeyDown={handleKeyDown}
                            value={tagName}
                            data-toggle="tooltip"
                            data-placement="top"
                            title="Tag can be a text like Lecture, Tutorial..."
					    />
                        <div className='invalid-feedback'>
                            {errorMsg}
					    </div>
                    </div>
                    <div className="col-md-2 mb-3">
                    <button
                        className='btn btn-primary'
                        onClick={addTagName}
				    >
					    Add
				    </button>                    
                </div>
                </div>
            </form>

            <div
                style={{
                    textAlign: 'center',
                    marginTop: '5%',
                    padding: '10px',
                    overflowY: 'auto',
                }}
                className="row"
            >
                {tagList.length === 0 ? (
                    <div
                        style={{
                            width: '100%',
                        }}
                    >
                        <EmptyDataPlaceholder message="Tag List is Currently Empty" />
                    </div>
                ) : (
                    tagList.map((tag) => (
                        <div key={tag._id}>
                            <div className="col">
                                <Tag
                                    id={tag._id}
                                    deleteMethod={deleteTagName}
                                    tagName={tag.tagname}
                                    component={UpdateTagsDialogBox}
                                    itemList={tagList}
                                    setItemList={setTagList}
                                />
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
}

export default TagContent;
