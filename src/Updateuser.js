import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';


const Updateuser = () => {
    const [user, SetUser] = useState({}||{name:"munna",email:"@munna"})
    const { id } = useParams()

    useEffect(() => {
        const url = `http://localhost:3200/adduser/update/${id}`;
        fetch(url)
            .then(res => res.json())
            .then(data => {
                SetUser(data)
            })
    }, [])

    const updateNameChange = (e) => {
        
        const updateName = e.target.value;
        const updatedUser = { ...user };
        
        updatedUser.name = updateName
    
        SetUser(updatedUser)
        
        
    }
    const updateEmailChange = (e) => {
        
        const updateEmail = e.target.value;
        const updatedUser = { ...user };
        updatedUser.email = updateEmail
        
        
    
        SetUser(updatedUser)
        
        
    }
    
    const handleUpdatedUser = e => {
        const url = `http://localhost:3200/update/${id}`;
        console.log(user)
        fetch(url, {
            method: "put",
            headers: {
                "content-type": "application/json"
            },
            
            body: JSON.stringify(user)
        })
            .then(res => res.json())
            .then(data => {
                if (data.modifiedCount > 0) {
                    alert("Updated Successfully")
                    SetUser(data)
                    
                    console.log(user)
                }
            })
        // e.preventDefault()
        
    }

    return (
        <div style={{ height: "200px", border: "2px solid green", margin: "10px " }} className="text-center" >
            <h2 > Name : {user.name}   </h2>
            <small> Email: {user.email}</small>

            <form onSubmit={handleUpdatedUser}>
                <div
                    className=' text-center 
             justify-content-center py-auto '>
                    <input onChange={updateNameChange} type="text" name="" id="" defaultValue={user.name} /> <br />

                    <input type="text" name="" id="" onChange={updateEmailChange} defaultValue={user.email} />
                    <br />
                    <button type='submit'>Update</button>

                </div>
            </form>
        </div>
    );
};

export default Updateuser;