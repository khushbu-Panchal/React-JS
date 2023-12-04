import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from "react-router-dom";
import { v4 as uuidv4 } from 'uuid';
const Create = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [gender, setGender] = useState('');
    const [hobbies, setHobbies] = useState([]);
    const [city, setCity] = useState('');
    const navigate = useNavigate();
    const { id } = useParams();
    const handleSubmit = (e) => {
        e.preventDefault();
        const formData = {
            id: uuidv4(),
            name: name,
            email: email,
            gender: gender,
            hobbies: hobbies.join(","),
            city: city,
        }
        localStorage.setItem(formData.id, JSON.stringify(formData));
        navigate("/read");

    }
    const handleUpdate = (e) => {
        e.preventDefault();
        if (id) {
            const data = localStorage.getItem(id);
            const dataObj = JSON.parse(data);
            if (dataObj) {
                dataObj.name = name;
                dataObj.email = email;
                dataObj.gender = gender;
                dataObj.hobbies = hobbies.join(',');
                dataObj.city = city;
                localStorage.setItem(id, JSON.stringify(dataObj));
                navigate('/read');
            }
        }
    };
    const handleEvent = (e) => {
        if (id) {
            handleUpdate(e);
        } else {
            handleSubmit(e);
        }
    };
    useEffect(() => {
        if (id) {
            const data = localStorage.getItem(id);
            const dataObj = JSON.parse(data);
            if (dataObj) {
                setName(dataObj.name);
                setEmail(dataObj.email);
                setGender(dataObj.gender);
                setHobbies(dataObj.hobbies.split(','));
                setCity(dataObj.city);
            }
        }
    }, [id])
    const handleHobbyChange = (e) => {
        const hobbyValue = e.target.value;
        if (e.target.checked) {
            setHobbies((prevHobbies) => [...prevHobbies, hobbyValue]);
        } else {
            setHobbies((prevHobbies) => prevHobbies.filter((hobby) => hobby !== hobbyValue));
        }
    }
    const hobbyOptions = [
        { value: 'Dance', label: 'Dance' },
        { value: 'Singing', label: 'Singing' },
        { value: 'Reading', label: 'Reading' },
    ];
    return (
        <div>
            <form className="form" onSubmit={handleSubmit}>
                <div className="d-flex justify-content">

                    <h2>Create Form</h2>
                    <div className="data">

                        <Link to='/read'>
                            <button className="btn-primary">Show Data</button>
                        </Link>
                    </div>
                </div>

                <div className="mb-3">
                    <label htmlFor="exampleInputEmail1" className="form-label">Name</label>
                    <input type="text" className="form-control" id="exampleInputEmail1" name="name" aria-describedby="emailHelp" value={name} onChange={(e) => setName(e.target.value)} />
                </div>
                <div className="mb-3">
                    <label htmlFor="exampleInputPassword1" className="form-label">Email Address</label>
                    <input type="email" name="email" className="form-control" id="exampleInputPassword1" value={email} onChange={(e) => setEmail(e.target.value)} />
                </div>
                <div className="mb-3">
                    <label className="form-label">Gender</label>
                    <div >
                        <label>
                            <input type="radio" value="Male" name="gender" className="form-check-input" checked={gender === 'Male'} onChange={(e) => setGender(e.target.value)} /> Male
                        </label>
                        <label className="formLabel">
                            <input type="radio" value="Female" name="gender" className="form-check-input" checked={gender === 'Female'} onChange={(e) => setGender(e.target.value)} /> Female
                        </label>
                    </div>
                </div>
                <div className="mb-3 radio">
                    <label className="form-label">Hobbies</label>
                    <div >
                        {hobbyOptions.map((hobby) => (
                            <label key={hobby.value} className="formLabel">
                                <input className="form-check-input" type="checkbox" value={hobby.value} checked={hobbies.includes(hobby.value)} onChange={handleHobbyChange} /> {hobby.label}
                            </label>
                        ))}
                    </div>
                </div>
                <div className="mb-3 radio">
                    <div >
                        <label for="exampleInputPassword1" className="form-label">City</label>
                    </div>
                    <select value={city} onChange={(e) => setCity(e.target.value)}>
                        <option value="">Select a city</option>
                        <option value="Surat">Surat</option>
                        <option value="Ahemadabad">Ahemadabad</option>
                        <option value="Vadodra">Vadodra</option>
                    </select>
                </div>
                <button type="submit" className="btn btn-primary" onClick={handleEvent}>Submit</button>
            </form>
        </div>
    );
}

export default Create;
