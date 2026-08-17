import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Navbar from '../components/Navbar';

// AddChild Component
const AddChild = () => {
  const { userId } = useParams();
  const navigate = useNavigate();
  const [childData, setChildData] = useState({
    firstName: '',
    lastName: '',
    birthdate: '',
    gender: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setChildData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`http://localhost:5000/api/users/${userId}/children`, childData);
      alert('Child added successfully!');
      navigate(`/userprofiles/view/${userId}`);
    } catch (error) {
      console.error('Error adding child:', error);
    }
  };

  return (
    <div className="p-4">
      <Navbar />
      <h1 className="text-xl font-bold">Add Child for User {userId}</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>First Name:</label>
          <input
            type="text"
            name="firstName"
            value={childData.firstName}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Last Name:</label>
          <input
            type="text"
            name="lastName"
            value={childData.lastName}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Birthdate:</label>
          <input
            type="date"
            name="birthdate"
            value={childData.birthdate}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Gender:</label>
          <select value={childData.gender} onChange={handleChange} name="gender">
            <option value="">Select Gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
          </select>
        </div>
        <button type="submit" className="mt-4 px-4 py-2 bg-green-500 text-white rounded">Add Child</button>
      </form>
    </div>
  );
};

// EditChild Component
const EditChild = () => {
  const { childId } = useParams();
  const navigate = useNavigate();
  const [childData, setChildData] = useState({
    firstName: '',
    lastName: '',
    birthdate: '',
    gender: '',
  });

  useEffect(() => {
    axios.get(`http://localhost:5000/api/children/${childId}`)
      .then(response => {
        setChildData(response.data);
      })
      .catch(error => {
        console.error('Error fetching child data:', error);
      });
  }, [childId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setChildData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(`http://localhost:5000/api/children/${childId}`, childData, {
        headers: { 'Content-Type': 'application/json' },
      });
      alert('Child updated successfully!');
      navigate(`/childprofiles/view/${childId}`);
    } catch (error) {
      console.error('Error updating child:', error);
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold">Edit Child</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>First Name:</label>
          <input
            type="text"
            name="firstName"
            value={childData.firstName}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Last Name:</label>
          <input
            type="text"
            name="lastName"
            value={childData.lastName}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Birthdate:</label>
          <input
            type="date"
            name="birthdate"
            value={childData.birthdate}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Gender:</label>
          <select value={childData.gender} onChange={handleChange} name="gender">
            <option value="">Select Gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
          </select>
        </div>
        <button type="submit">Update Child</button>
      </form>
    </div>
  );
};

// ChildProfilePage Component
const ChildProfilePage = () => {
  const { childId } = useParams();
  const navigate = useNavigate();
  const [child, setChild] = useState(null);
  const [medicalRecords, setMedicalRecords] = useState([]);
  const [milestones, setMilestones] = useState([]);

  useEffect(() => {
    const fetchChild = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/children/${childId}`);
        setChild(response.data);
      } catch (error) {
        console.error('Error fetching child:', error);
      }
    };

    const fetchMedicalRecords = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/children/${childId}/medical-records`);
        setMedicalRecords(response.data);
      } catch (error) {
        console.error('Error fetching medical records:', error);
      }
    };

    const fetchMilestones = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/children/${childId}/milestones`);
        setMilestones(response.data);
      } catch (error) {
        console.error('Error fetching milestones:', error);
      }
    };

    fetchChild();
    fetchMedicalRecords();
    fetchMilestones();
  }, [childId]);

  const handleEditChild = () => {
    navigate(`/childprofiles/edit/${childId}`);
  };

  const handleAddMedicalRecord = () => {
    navigate(`/childprofiles/${childId}/add-medical-record`);
  };

  const handleEditMedicalRecord = (recordId) => {
    navigate(`/medicalrecords/edit/${recordId}`);
  };

  const handleDeleteMedicalRecord = async (recordId) => {
    try {
      await axios.delete(`http://localhost:5000/api/medical-records/${recordId}`);
      setMedicalRecords(medicalRecords.filter(record => record._id !== recordId));
    } catch (error) {
      console.error('Error deleting medical record:', error);
    }
  };

  const handleAddMilestone = () => {
    navigate(`/childprofiles/${childId}/add-milestone`);
  };

  const handleEditMilestone = (milestoneId) => {
    navigate(`/milestones/edit/${milestoneId}`);
  };

  const handleDeleteMilestone = async (milestoneId) => {
    try {
      await axios.delete(`http://localhost:5000/api/milestones/${milestoneId}`);
      setMilestones(milestones.filter(milestone => milestone._id !== milestoneId));
    } catch (error) {
      console.error('Error deleting milestone:', error);
    }
  };

  if (!child) {
    return <div>Loading...</div>;
  }

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold">{child.firstName} {child.lastName}</h1>
      <p>Age: {child.age}</p>
      <p>Gender: {child.gender}</p>
      <button onClick={handleEditChild} className="mt-4 px-4 py-2 bg-blue-500 text-white rounded">Edit Child</button>
      <h2 className="text-lg font-bold mt-4">Medical Records</h2>
      {medicalRecords.length === 0 ? (
        <p>No medical records found.</p>
      ) : (
        <ul className="mt-4">
          {medicalRecords.map(record => (
            <li key={record._id} className="border p-2 my-2 rounded">
              {record.date} - {record.notes}
              <div>
                <button onClick={() => handleEditMedicalRecord(record._id)} className="px-2 py-1 bg-yellow-500 text-white rounded">Edit</button>
                <button onClick={() => handleDeleteMedicalRecord(record._id)} className="px-2 py-1 bg-red-500 text-white rounded">Delete</button>
              </div>
            </li>
          ))}
        </ul>
      )}
      <button onClick={handleAddMedicalRecord} className="mt-4 px-4 py-2 bg-green-500 text-white rounded">Add Medical Record</button>
      <h2 className="text-lg font-bold mt-4">Milestones</h2>
      {milestones.length === 0 ? (
        <p>No milestones found.</p>
      ) : (
        <ul className="mt-4">
          {milestones.map(milestone => (
            <li key={milestone._id} className="border p-2 my-2 rounded">
              {milestone.date} - {milestone.description}
              <div>
                <button onClick={() => handleEditMilestone(milestone._id)} className="px-2 py-1 bg-yellow-500 text-white rounded">Edit</button>
                <button onClick={() => handleDeleteMilestone(milestone._id)} className="px-2 py-1 bg-red-500 text-white rounded">Delete</button>
              </div>
            </li>
          ))}
        </ul>
      )}
      <button onClick={handleAddMilestone} className="mt-4 px-4 py-2 bg-green-500 text-white rounded">Add Milestone</button>
    </div>
  );
};

export { AddChild, EditChild, ChildProfilePage };
