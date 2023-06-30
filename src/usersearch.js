import React, { useState } from 'react';


const App = () => {
  const [users, setUsers] = useState([]);
  const [searchInput, setSearchInput] = useState('');


  const fetchData = () => {
    const firstName = searchInput.trim().toLowerCase();


    if (firstName === '') {
      return; // Exit if the search input is empty
    }


    fetch('https://reqres.in/api/users?page=2')
      .then(response => response.json())
      .then(data => {
        // Filter the users based on the searched first name
        const matchingUsers = data.data.filter(user =>
          user.first_name.toLowerCase() === firstName
        );


        setUsers(matchingUsers);
      })
      .catch(error => {
        console.log('An error occurred while fetching data:', error);
      });
  };


  const handleSearchChange = event => {
    setSearchInput(event.target.value);
  };


  const handleSearchClick = () => {
    fetchData();
  };


  const handleRefreshClick = () => {
    setUsers([]);
    setSearchInput('');
  };


  return (
    <div>
      <input
        type="text"
        value={searchInput}
        onChange={handleSearchChange}
      />
      <button onClick={handleSearchClick}>Search</button>
      <button onClick={handleRefreshClick}>Refresh</button>


      <div>
        {users.map(user => (
          <div key={user.id} className="user">
            <span>ID: {user.id}</span><br></br>
            <img src={user.avatar} alt="Avatar" /><br></br>
            <span>First Name: {user.first_name}</span>
          </div>
        ))}
      </div>
    </div>
  );
};


export default App;
