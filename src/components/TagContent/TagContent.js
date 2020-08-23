import React, { useState } from 'react';
import { useEffect } from 'react';
import Tag from '../../components/Tag/Tag';
import axios from 'axios';
import Swal from 'sweetalert2';
import swal from '@sweetalert/with-react';
import ContentHeader from '../../components/ContentHeader/ContentHeader';
import EmptyDataPlaceholder from '../EmptyDataPlacehoder/EmptyDataPlaceholder';
import UpdateTagsDialogBox from './UpdateTagsDialogBox';

function TagContent(props) {
    const [tagName, setTagName] = useState('');
    const [tagList, setTagList] = useState([]);

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
            addTagName(e);
        }
    };

    const addTagName = (e) => {
        e.preventDefault();

        if (tagName === '') {
            Swal.fire({
                text: 'Please Enter a Tag Name!',
                confirmButtonColor: '#205374',
            });
        } else {
            let isExist = false;

            tagList.forEach((element) => {
                if (element.tagname === tagName) {
                    Swal.fire({
                        text: 'The Tag Name You Entered is Already Exists!',
                        confirmButtonColor: '#205374',
                    });
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
            })
            .catch((err) => {
                console.log(err);
            });
    };

    const editTagName = (tagName, id) => {

        if (tagName === '') {
            Swal.fire({
                text: 'Please Enter a Tag Name!',
                confirmButtonColor: '#205374',
            });
        } else {
            let isExist = false;

            tagList.forEach((element) => {
                if (element.tagname === tagName) {
                    Swal.fire({
                        text: 'The Tag Name You Entered is Already Exists!',
                        confirmButtonColor: '#205374',
                    });
                    isExist = true;
                    setTagName('');
                }
            });

            if (!isExist) {
                axios
                    .patch(
                        `http://localhost:8000/api/v1/tags/${id}`,
                        {
                            tagname: tagName,
                        }
                    )
                    .then((res) => {
                        setTagList((prevlist) =>
                            prevlist.map((listItem) =>
                                id === listItem._id
                                    ? {
                                          ...listItem,
                                          tagname: tagName,
                                      }
                                    : listItem
                            )
                        );
                    })
                    .catch((err) => console.log(err));
            }
        }
        swal.close();
    };

    const onInputChange = (e) => {
        setTagName(e.target.value);
    };

    return (
        <div>
            <ContentHeader header={'Tags'} />
            <div
                style={{
                    position: 'fixed',
                    width: '30%',
                    textAlign: 'center',
                    left: '50%',
                    padding: '20px',
                    transform: 'translate(-50%, 0)',
                }}
                className="input-group mb-3"
            >
                <input
                    style={{ borderRadius: 0 }}
                    type="text"
                    className="form-control"
                    placeholder="Tag Name"
                    onChange={onInputChange}
                    onKeyDown={handleKeyDown}
                    value={tagName}
                    data-toggle="tooltip"
                    data-placement="top"
                    title="Tag can be a text like Lecture, Tutorial..."
                />
                <button
                    style={{ marginLeft: 20, borderRadius: 0 }}
                    type="button"
                    className="btn btn-primary"
                    onClick={addTagName}
                >
                    Add
                </button>
            </div>

            <div
                style={{
                    textAlign: 'center',
                    marginTop: '10%',
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
                                    editMethod={editTagName}
                                    tagName={tag.tagname}
                                    component={UpdateTagsDialogBox}
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
