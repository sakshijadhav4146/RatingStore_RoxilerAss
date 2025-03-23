import React, { useEffect, useState } from 'react';
import axios from 'axios';

function Dashboard() {
  const [userStats, setUserStats] = useState({});
  const [users, setUsers] = useState([]);
  const [stores, setStores] = useState([]);

  useEffect(() => {
   
    const fetchStats = async () => {
      const response = await axios.get('http://localhost:8000/dashboard');
      setUserStats(response.data);
    };

   
    const fetchData = async () => {
      const userResponse = await axios.get('http://localhost:8000/user/getUser');
      setUsers(userResponse.data.users);

      const storeResponse = await axios.get('http://localhost:8000/store');
      setStores(storeResponse.data);
    };

    fetchStats();
    fetchData();
  }, []);

  return (
    <div>
      <h2>System Administrator Dashboard</h2>
      <div>
        <h3>Total Users: {userStats.totalUsers}</h3>
        <h3>Total Stores: {userStats.totalStores}</h3>
        <h3>Total Ratings: {userStats.totalRatings}</h3>
      </div>
      <div>
        <h4>Users List</h4>
        <ul>
          {users.map((user) => (
            <li key={user.id}>{user.name} - {user.email} - {user.role}</li>
          ))}
        </ul>
      </div>
      <div>
        <h4>Stores List</h4>
        <ul>
          {stores.map((store) => (
            <li key={store.storeId}>{store.StoreName} - {store.StoreAddress} - Rating: {store.rating}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default Dashboard;
