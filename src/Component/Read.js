import React, { useState, useEffect } from 'react';

import { Link } from "react-router-dom";

const Read = () => {
    const [data, setData] = useState([]);

    const getDataFromLocalStorage = () => {
        const storedData = Object.keys(localStorage).map((key) => JSON.parse(localStorage.getItem(key)));
        setData(storedData);
    };

    const handleDelete = (id) => {
        alert("Are you sure you want to delete this item?");

        setData(prevData => prevData.filter(item => item.id !== id));
        localStorage.removeItem(id);

    };

    useEffect(() => {
        getDataFromLocalStorage();
    }, []);

    return (
        <div className="form">
            <div className="d-flex">
                <h2>Read Form</h2>
                <div className="data">

                    <Link to='/'>
                        <button className="btn-primary">Create Data</button>
                    </Link>
                </div>
            </div>
            <table className="table">
                <thead>
                    <tr>
                        <th scope="col">Name</th>
                        <th scope="col">Email</th>
                        <th scope="col">Gender</th>
                        <th scope="col">Hobbies</th>
                        <th scope="col">City</th>
                        <th colSpan="2">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((item) => (<>
                        <tr key={item.id}>
                            <td>{item.name}</td>
                            <td>{item.email}</td>
                            <td>{item.gender}</td>
                            <td>{item.hobbies}</td>
                            <td>{item.city}</td>
                            <td>
                                <Link to={`/${item.id}`}><button className="btn btn-success" >Edit</button></Link>
                                <button className="btn btn-danger" onClick={() => handleDelete(item.id)}>Delete</button>

                            </td>
                        </tr>
                    </>))}
                </tbody>
            </table>
        </div>
    );
}

export default Read;
