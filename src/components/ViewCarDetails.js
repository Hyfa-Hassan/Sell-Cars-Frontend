import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
const ViewCarDetails = () => {

  const navigate = useNavigate();
    const [carDetails, setCarDetails] = useState([]);

    useEffect(() => {
      const fetchData = async () => {
        const response = await fetch("http://localhost:9002/all-car-details");
        const data = await response.json();
        setCarDetails(data);
      };
  
      fetchData();
    }, []);

    const handleDelete = async (id) => {
        const response = await fetch(`http://localhost:9002/delete-car-details/${id}`, {
          method: "DELETE",
        });
        if (response.ok) {
          const newData = carDetails.filter((carDetail) => carDetail.id !== id);
          setCarDetails(newData);
        }
      };
      
      const handleEdit = () => {
        navigate("/edit-details", { state: { carDetails } });
      };

    return (
      <div>
        <h2>All Car Details:</h2>
        <ul>
          {carDetails.map((carDetail) => (
            <li key={carDetail.id}>
              <p>Title: {carDetail.title}</p>
              <p>Description: {carDetail.desc}</p>
              <img src={carDetail.image} alt="car" />
              <button onClick={() => handleDelete(carDetail.id)}>Delete</button>
              <button onClick={() => handleEdit(carDetail.id)}>Edit</button>
            </li>
          ))}
        </ul>
      </div>
    );
}

export default ViewCarDetails