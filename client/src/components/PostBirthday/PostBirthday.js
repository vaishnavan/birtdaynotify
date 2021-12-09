import React, { useState } from 'react';
import { postBirthday } from '../../service/birthday.service';

const initialState = {
    username: '',
    goal: '',
    dob: '',
};

export default function PostBirthday () {
    const [profile, setProfile] = useState(initialState);
    const [singleFile, setSingleFile] = useState('');

    const handleChange = e => {
        const { name, value } = e.target;
        setProfile({
            [name]: value,
        });
    };

    const handleFile = e => {
        setSingleFile(e.target.files[0]);
    };

    const handleSubmit = e => {
        e.preventDefault();
        console.log("hello")
        const formData = new FormData();
        formData.append('image', singleFile);
        formData.append('username', profile.username);
        formData.append('goal', profile.goal);
        formData.append('dob', profile.dob);

        postBirthday(formData).then(res => {
            console.log(res.data)
            setProfile({
                username: '',
                goal: '',
                dob: '',
            });
        });
    };

    return (
        <div>
            <form>
                <input
                    type='text'
                    placeholder='username'
                    name='username'
                    value={profile.username}
                    onChange={handleChange}
                />
                <input
                    type='text'
                    placeholder='goal'
                    name='goal'
                    value={profile.goal}
                    onChange={handleChange}
                />
                <input
                    type='date'
                    placeholder='DOB'
                    name='dob'
                    value={profile.dob}
                    onChange={handleChange}
                />
                <input type='file' name='profile' onChange={handleFile} />
                <input onClick={handleSubmit} type="submit" value="upload" />
            </form>
        </div>
    );
}
