"use client";

import Cookies from "js-cookie";
import { useState } from "react";

const UpdateProfile = () => {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    phone: "",
    profile_picture: null,
  });
  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState("");
  const [generalError, setGeneralError] = useState("");
  const [preview, setPreview] = useState(null);

  const resetErrors = () => {
    setErrors({});
    setGeneralError("");
    setSuccessMessage("");
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setPreview(null);
    resetErrors();

    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        setErrors({ profile_picture: "File size must be less than 5MB" });
        return;
      }

      setFormData({ ...formData, profile_picture: file });

      const reader = new FileReader();
      reader.onload = (e) => setPreview(e.target.result);
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    resetErrors();

    const data = new FormData();
    data.append("username", formData.username);
    if (formData.password) data.append("password", formData.password);
    if (formData.phone) data.append("phone", formData.phone);
    if (formData.profile_picture)
      data.append("profile_picture", formData.profile_picture);

    try {
      const response = await fetch("http://localhost:5000/api/users/current", {
        method: "PATCH",
        headers: {
          Authorization: Cookies.get("token"),
        },
        credentials: "include",
        mode: "cors",
        body: data,
      });

      const result = await response.json();

      if (!response.ok) {
        if (result.errors) {
          const newErrors = {};
          result.errors.forEach((error) => {
            newErrors[error.field] = error.message;
          });
          setErrors(newErrors);
        } else {
          throw new Error(result.message || "Update failed");
        }
        return;
      }

      setSuccessMessage("Profile updated successfully!");
    } catch (error) {
      console.error("Error:", error);
      setGeneralError(error.message || "An unexpected error occurred.");
    }
  };

  return (
    <div style={{ maxWidth: "600px", margin: "0 auto", padding: "20px" }}>
      <h2>Update Profile</h2>
      {generalError && <div className="alert alert-error">{generalError}</div>}
      {successMessage && (
        <div className="alert alert-success">{successMessage}</div>
      )}

      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            id="username"
            name="username"
            value={formData.username}
            onChange={handleInputChange}
            className={errors.username ? "error" : ""}
          />
          {errors.username && (
            <div className="error-message">{errors.username}</div>
          )}
        </div>

        <div className="form-group">
          <label htmlFor="password">Password (Optional):</label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleInputChange}
            className={errors.password ? "error" : ""}
          />
          {errors.password && (
            <div className="error-message">{errors.password}</div>
          )}
        </div>

        <div className="form-group">
          <label htmlFor="phone">Phone Number:</label>
          <input
            type="tel"
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleInputChange}
            className={errors.phone ? "error" : ""}
          />
          {errors.phone && <div className="error-message">{errors.phone}</div>}
          <div className="info">Numbers only (10-15 digits)</div>
        </div>

        <div className="form-group">
          <label htmlFor="profile_picture">Profile Picture (Optional):</label>
          <input
            type="file"
            id="profile_picture"
            name="profile_picture"
            accept=".jpg,.jpeg,.png,.svg"
            onChange={handleFileChange}
            className={errors.profile_picture ? "error" : ""}
          />
          {errors.profile_picture && (
            <div className="error-message">{errors.profile_picture}</div>
          )}
          <div className="info">
            Allowed formats: JPG, JPEG, PNG, SVG (max 5MB)
          </div>
          {preview && (
            <img src={preview} alt="Preview" className="preview-image" />
          )}
        </div>

        <button type="submit">Update Profile</button>
      </form>
    </div>
  );
};

export default UpdateProfile;
