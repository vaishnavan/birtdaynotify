import React, { useState } from 'react';
import { postBirthday } from '../../service/birthday.service';
import ShowBrithday from '../ShowBirthday/ShowBrithday';
import './postbrith.css';

const initialState = {
    username: '',
    goal: '',
    dob: '',
};

export default function PostBirthday () {
    const [isSubmit, setIsSubmit] = useState(false);
    const [show, setShow] = useState(false);
    const [profile, setProfile] = useState(initialState);
    const [singleFile, setSingleFile] = useState('');
    const [birthData, setBirthData] = useState([]);

    const handleChange = e => {
        const { name, value } = e.target;
        setProfile({
            ...profile,
            [name]: value,
        });
    };

    const handleFile = e => {
        setSingleFile(e.target.files[0]);
    };

    const handleSubmit = e => {
        e.preventDefault();
        console.log('hello');
        const formData = new FormData();
        console.log(profile.username);
        formData.append('image', singleFile);
        formData.append('username', profile.username);
        formData.append('goal', profile.goal);
        formData.append('dob', profile.dob);
        setIsSubmit(true);
        postBirthday(formData).then(res => {
            console.log(res.data);
            setBirthData([...birthData, res.data]);
            setProfile({
                username: '',
                goal: '',
                dob: '',
            });
            setIsSubmit(false);
        });
    };

    const handleShow = () => {
        setShow(false);
        window.location.reload();
    };

    const handlePost = () => {
        var myComment = prompt('Ask password with vaishnavan to post!');
        if (myComment === process.env.REACT_APP_POST_KEY) {
            setShow(true);
        }
    };

    return (
        <div>
            <div className='toggle-btn'>
                <div className='input-btn'>
                    <button onClick={handleShow}>
                        All Birthday ({birthData.length})
                    </button>
                </div>
                <div className='input-btn'>
                    <button onClick={handlePost}>Post</button>
                </div>
            </div>
            {show ? (
                <div className='birth-form'>
                    <form>
                        <div className='birth-input'>
                            <label>Name *</label>
                            <br />
                            <br />
                            <input
                                type='text'
                                placeholder='Name'
                                name='username'
                                value={profile.username}
                                onChange={handleChange}
                            />
                        </div>

                        <div className='birth-input'>
                            <label>Goal *</label>
                            <br />
                            <br />
                            <input
                                type='text'
                                placeholder='goal'
                                name='goal'
                                value={profile.goal}
                                onChange={handleChange}
                            />
                        </div>
                        <div className='birth-input'>
                            <label>Date Of Birth *</label>
                            <br />
                            <br />
                            <input
                                type='date'
                                placeholder='DOB'
                                name='dob'
                                value={profile.dob}
                                onChange={handleChange}
                            />
                        </div>
                        <div className='birth-input'>
                            <label>Profile Image *</label>
                            <br />
                            <input
                                type='file'
                                name='profile'
                                onChange={handleFile}
                            />
                        </div>
                        <div className='birth-myBtn'>
                            <input
                                disabled={isSubmit}
                                onClick={handleSubmit}
                                type='submit'
                                value='upload'
                            />
                        </div>
                    </form>
                </div>
            ) : (
                <>
                    <ShowBrithday showBirth={{ birthData, setBirthData }} />
                </>
            )}
        </div>
    );
}
