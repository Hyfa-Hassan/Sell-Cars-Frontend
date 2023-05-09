import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./AddcarDetails.css";

const Card = () => {
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [image, setImage] = useState("");
  const [desc, setDesc] = useState(Array(4).fill(""));

  const handleImageChange = (event) => {
    const selectedFile = event.target.files[0];
    setImage(URL.createObjectURL(selectedFile));
  };

  const handleTitleChange = (event) => {
    setTitle(event.target.value);
  };

  const handleDescriptionChange = (index, event) => {
    const newDescription = [...desc];
    newDescription[index] = event.target.value;
    setDesc(newDescription);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log("submitted");

    const data = {
      title,
      image,
      desc,
    };
    // console.log(data)
    const res = await fetch("http://localhost:9002/add-car-details", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    const resData = await res.json();
    console.log(resData);
    if (res.status === 404 || !data) {
      window.alert("Please fill all the details");
    } else {
      navigate("/view-car-details", { state: { resData } });
      window.alert("Done");
    }
  };

  return (
    <div className="car-details-container">
      <h1 style={{ textAlign: "center" }}>Dealer Car Details Form</h1>

      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="title">Title:</label>
          <input
            type="text"
            id="title"
            name="title"
            value={title}
            onChange={handleTitleChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="image">Image:</label>
          <input
            type="file"
            id="image"
            name="image"
            onChange={handleImageChange}
          />
          {/* {image && <img className="car-image" src={image} alt="Car" />} */}
        </div>
        <div className="form-group">
          <label>Description:</label>
          <ul>
            {desc.map((descriptionItem, index) => (
              <li key={index}>
                <input
                  type="text"
                  name="desc"
                  value={descriptionItem}
                  onChange={(event) => handleDescriptionChange(index, event)}
                />
              </li>
            ))}
          </ul>
        </div>

        <button className="submit-button" type="submit">
          Submit
        </button>
      </form>
    </div>
  );
};

export default Card;
