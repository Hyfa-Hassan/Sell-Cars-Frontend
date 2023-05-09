import { useState, useEffect, useParams } from "react";
import { useNavigate, useLocation } from "react-router";
const EditCarDetails = () => {
    const navigate = useNavigate();
    const location = useLocation();

    const { carDetails } = location.state;

    const [title, setTitle] = useState(carDetails.title);
    const [image, setImage] = useState(carDetails.image);
    const [desc, setDesc] = useState(carDetails.desc);

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
            id: carDetails.id,
            title,
            image,
            desc,
        };
        // console.log(data)
        const res = await fetch("http://localhost:9002/edit-car-details", {
            method: "PUT",
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
        <>
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
                    {image && <img className="car-image" src={image} alt="Car" />}
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
                    Save Changes
                </button>
            </form>

        </>
    )
}
export default EditCarDetails