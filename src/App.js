
import './App.css';
import { useEffect, useRef, useState } from 'react';
import {
  BrowserRouter,
  Routes,
  Route,
  Link,
} from "react-router-dom";
import Updateuser from './Updateuser';



function App() {
  
  const [users, Setuser] = useState([])
  const nameRef = useRef()
  const emailRef = useRef()
  

  useEffect(() => {
    fetch('http://localhost:3200/adduser')
      .then(res => res.json())
      .then(data => {
        Setuser(data)
        console.log(data)
      })
  }, [])

  const handleaddUser = (e) => {
    e.preventDefault()
    const name = nameRef.current.value;
    const email = emailRef.current.value;
    const newObj = {
      name, email
    };
    console.log(newObj);

    fetch("http://localhost:3200/adduser", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body:JSON.stringify(newObj)
        
    }).then(res => res.json())
      .then(data => {
        if (data) {
          alert("Successfull Added")
          console.log(data);
          
          
          const remaining = [...users, data]
          Setuser(remaining)
          console.log();
          
        }
       
    })
  }

  const handleDelete = id => {
    const procced = window.confirm("Are you sure ?")
    if (procced) {
      const url = `http://localhost:3200/adduser/${id}`
      fetch(url, {
        method: "DELETE"
      })
        .then(res => res.json())
        .then(data => {
          if (data.acknowledged) {
            const remainig = users.filter(user => user._id !== id)
            Setuser(remainig)
            // console.log(data);
          }
        })
   }

  }



  return (
     <BrowserRouter>
    <Routes>
        <Route path="/" element={<div className="App">
          <form onSubmit={handleaddUser} className='mt-5'>
            <input ref={nameRef} className='mt-2' placeholder='Name' type="text" name="" id="" />
            <br />
            <input ref={emailRef} placeholder="Email" className='mt-2' type="text" name="" id="" /><br />
            <input className='mt-2' type="submit" value="submit" />
          </form>
          <h2>Found User {users?.length}</h2>

          <div><ol>
            {
              users?.map(user => <li key={user._id}><h1 style={{ display: "Inline" }}> {user.name}</h1>  <span>{user.email}</span>
                
                <Link to={`/adduser/update/${user._id}`}><button className='border'>update</button></Link>

                <button className='border' onClick={() => handleDelete(user._id)}>x  </button>
              </li>)
            }
          </ol></div>
        </div>}/>
       
        
        <Route path='/update/:id'
          element={ <Updateuser/>} />
    </Routes>
  </BrowserRouter>
  
  );
}

export default App;
