import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { message } from 'antd';
import axios from '../../../axios/axios';
import './profile.css';
import { useSelector } from 'react-redux';

function Profile() {
  const [image, setImage] = useState('');
  const [previewImage, setPreviewImage] = useState('');
  const users = useSelector(state => state.token.id);

  function handleImage(e) {
    const selectedImage = e.target.files[0];
    setImage(selectedImage);

    // Create a preview URL for the selected image
    setPreviewImage(URL.createObjectURL(selectedImage));
  }

  function handleApi() {
    const formData = new FormData();
    formData.append('image', image);
    axios.post(`/addProfile/${users}`, formData)
      .then((res) => {
        console.log(res);
        // Show success message
        message.success('Image submitted successfully');
      })
      .catch((error) => {
        // Handle error if submission fails
        console.error(error);
        message.error('Failed to submit image');
      });
  }

  return (
    <section className="vh-100">
      <div className="container py-5 h-100">
        <div className="row d-flex justify-content-center align-items-center h-100">
          <div className="col-12 col-md-8 col-lg-6 col-xl-5">
            <div className="card shadow-2-strong">
              <div className="card-body p-5 text-center">
                <h3 className="mb-5">Profile</h3>
                <div className="form-outline mb-4">
                  <img src={previewImage} alt="Preview" />
                </div>
                <div className="form-outline mb-4">
                  <input type="file" name="file" onChange={handleImage} />
                </div>
                <button
                  className="btn btn-primary btn-lg btn-block mb-3"
                  type="submit"
                  onClick={handleApi}
                >
                  Upload
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Profile;
