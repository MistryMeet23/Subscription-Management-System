import React, { useEffect, useState } from 'react';
import './Profile.css';

function Profile() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Get user details from local storage
    const storedUserDetails = localStorage.getItem('userDetails');
    if (storedUserDetails) {
      setUser(JSON.parse(storedUserDetails));
    }
  }, []);

  if (!user) {
    return <div>Loading...</div>; // Show a loading message while fetching user data
  }

  return (
    <>
    <div className="profile-card">
      <img
        src="https://via.placeholder.com/150"
        alt="Profile"
        className="profile-image"
      />
      <div className="profile-details">
        <h2 className="profile-name">{user.name}</h2>
        <div className="profile-info">
          <p><strong>First Name:</strong> {user.firstName}</p>
          <p><strong>Last Name:</strong> {user.lastName}</p>
          <p><strong>Email:</strong> {user.email}</p>
          <p><strong>Phone Number:</strong> {user.phoneNumber}</p>
          <p><strong>Address:</strong> {user.address}</p>
          <p><strong>Date of Birth:</strong> {user.dateOfBirth}</p>
        </div>
      </div>
    </div>
    </>
  );
}

export default Profile;
