import React, { useState, useEffect } from "react";
import Loading from "./components/Loading";
import Error from "./components/Error";
import Sorry from "./components/Sorry";

function App() {
  const API = "https://mocki.io/v1/0f032aee-21e6-48a2-93f3-50c9115b8a98";

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [users, setUsers] = useState([]);
  const [disable, setDisable] = useState(false);

  const cYear = new Date().getFullYear();
  const cMonth = new Date().getMonth();
  console.log(cMonth)

  const getData = () => {
    fetch(API)
    .then(response => {
      if(response.ok){
        setLoading(false);
        return response.json()
      }else{
        setLoading(false);
        setError(true)
        throw Error("Users not found")
      }
    })
    .then(userList => {
      setLoading(false);
      setUsers(userList);
    })
    .catch(error => console.log(error))
    
  }

  useEffect(() => {
    getData();
  }, [])

  const todaysBirthday = () => {
    let currentMonth = users.filter((user) => user.month === cMonth + 1); //6
    console.log(currentMonth);
    setUsers(currentMonth);
    setDisable(true);
  };

  const reset = () => {
    getData();
    setDisable(false);
  };

  const clear = () => {
    setUsers([]);
    setDisable(true);
  };

  if(loading){
    return <Loading />
  }

    if(error){
    return <Error />
  }

  return (
    <div className='container mt-3'>
      <div className='row'>
        <div className='col-xl-6 offset-xl-3 text-center bg-white py-4 border-bottom'>
          <h1 className='text-info'>{users.length} Birthday Found</h1>
        </div>

        <div className={users.length === 0 ? "col-xl-6 offset-xl-3 text-center bg-white" : "scrollBar col-xl-6 offset-xl-3 text-center bg-white"}>
          {
            users.length === 0 ? <Sorry/> : users.map((user) => {
              const {id, name, email, phone, day, month, year, gender} = user;
              return (
                <div key={id} className='row py-4 border-bottom'>
                  <div className='col'>
                    <h6 className='text-info'>{name}</h6>
                    <div>
                      <span>{day}-</span>
                      <span>{month}-</span>
                      <span>{year}</span>
                    </div>
                    <p>I am {cYear-year} years old</p>
                  </div>
                  <div className='col'>
                    <p className='text-muted'>{email}</p>
                    <p className='text-muted'>{phone}</p>
                    <p className='text-muted'>{gender}</p>
                  </div>
                </div>
              )
            })
          }
        </div>
        <div className='col-xl-6 offset-xl-3 text-center bg-white py-4 border-bottom'>
          <button className='btn btn-info mr-3' disabled={disable} onClick={todaysBirthday}>Today's Birthday</button>
          <button className='btn btn-info mr-3' onClick={reset}>Get all Birthday</button>
          <button className='btn btn-info mr-3' disabled={disable} onClick={clear}>Clear</button>
        </div>
      </div>
    </div>
  );
}

export default App;
