import React, { useEffect, useState } from "react";
import "./Profile.scss";
import PageMenu from "../../Components/PageMenu/PageMenu";
import { useDispatch, useSelector } from "react-redux";
import Card from "../../Components/card/Card";
import Loader from "../../Components/loader/Loader";
import {
  getUser,
  updatePhoto,
  updateUser,
} from "../../redux/features/auth/authSlice";
import { AiOutlineCloudUpload } from "react-icons/ai";
import { toast } from "react-toastify";
import { shortenText } from "../../utils";

const cloud_name = "dogmq5rv3";
const upload_preset = "agyilx2i";
const url = `https://api.cloudinary.com/v1_1/${cloud_name}/image/upload`;

const Profile = () => {
  const { isLoading, user } = useSelector((state) => state.auth);
  const initialState = {
    name: user?.name || "",
    email: user?.email || "",
    phone: user?.phone || "",
    role: user?.role || "",
    photo: user?.photo || "",
    address: user?.address || {
      address: user?.address.address || "",
      state: user?.address.state || "",
      country: user?.address.country || "",
    },
  };

  const [profile, setProfile] = useState(initialState);
  const [profileImage, setProfileImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const dispatch = useDispatch();

  useEffect(() => {
    if (user === null) {
      dispatch(getUser());
    }
  }, [dispatch, user]);

  useEffect(() => {
    if (user) {
      setProfile({
        name: user?.name || "",
        email: user?.email || "",
        phone: user?.phone || "",
        role: user?.role || "",
        photo: user?.photo || "",
        address: {
          address: user?.address.address || "",
          state: user?.address.state || "",
          country: user?.address.country || "",
        },
      });
    }
  }, [user]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProfile({ ...profile, [name]: value });
  };

  const handleImageChange = (e) => {
    setProfileImage(e.target.files[0]);
    setImagePreview(URL.createObjectURL(e.target.files[0]));
  };

  const savePhoto = async () => {
    let imageURL;
    try {
      if (
        profileImage !== null &&
        (profileImage.type === "image/jpeg" ||
          profileImage.type === "image/jpg" ||
          profileImage.type === "image/png")
      ) {
        const image = new FormData();
        image.append("file", profileImage);
        image.append("upload_preset", upload_preset); // Correctly append upload_preset

        const response = await fetch(url, { method: "post", body: image });
        const imgData = await response.json();
        imageURL = imgData.url.toString();

        // Save image to MongoDB
        const userData = {
          photo: profileImage ? imageURL : profile.photo,
        };
        await dispatch(updatePhoto(userData));
        setImagePreview(null);
        toast.success("Photo uploaded successfully!");
      } else {
        toast.error("Please select a valid image file (jpeg, jpg, png).");
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const saveProfile = async (e) => {
    e.preventDefault();

    // Save profile updates
    const userData = {
      name: user?.name || "",
      email: user?.email || "",
      phone: user?.phone || "",
      role: user?.role || "",
      photo: user?.photo || "",
      address: {
        address: user?.address.address || "",
        state: user?.address.state || "",
        country: user?.address.country || "",
      },
    };
    await dispatch(updateUser(userData));
    toast.success("Profile updated successfully!");
  };

  console.log("Rendering PageMenu");

  return (
    <>
      <section>
        {isLoading && <Loader />}
        <div className="container">
          <div className="page-menu-container">
            <PageMenu />
          </div>
        </div>
        <h2>Profile</h2>
        <div className="--flex-start profile">
          <Card cardClass={"card"}>
            {!isLoading && (
              <>
                <div className="profile-photo">
                  <div>
                    <img
                      src={imagePreview === null ? user?.photo : imagePreview}
                      alt="profile"
                    />
                    <h3>Role: {profile.role}</h3>
                    {imagePreview !== null && (
                      <div className="--center-all">
                        <button
                          className="--btn --btn-secondary"
                          onClick={savePhoto}
                        >
                          <AiOutlineCloudUpload size={18} />
                          Upload Photo
                        </button>
                      </div>
                    )}
                  </div>
                </div>
                <form onSubmit={saveProfile}>
                  <p>
                    <label>Change Photo:</label>
                    <input
                      type="file"
                      accept="image/*"
                      name="image"
                      onChange={handleImageChange}
                    />
                  </p>
                  <p>
                    <label>Name :</label>
                    <input
                      type="text"
                      name="name"
                      value={profile?.name}
                      onChange={handleInputChange}
                      required
                    />
                  </p>
                  <p>
                    <label>Email :</label>
                    <input
                      type="email"
                      name="email"
                      value={profile?.email}
                      onChange={handleInputChange}
                      disabled
                    />
                  </p>
                  <p>
                    <label>Phone :</label>
                    <input
                      type="text"
                      name="phone"
                      value={profile?.phone}
                      onChange={handleInputChange}
                      required
                    />
                  </p>
                  <p>
                    <label>Address :</label>
                    <input
                      type="text"
                      name="address"
                      value={profile?.address.address}
                      onChange={handleInputChange}
                      required
                    />
                  </p>
                  <p>
                    <label>State :</label>
                    <input
                      type="text"
                      name="state"
                      value={profile?.address.state}
                      onChange={handleInputChange}
                      required
                    />
                  </p>
                  <p>
                    <label>Country :</label>
                    <input
                      type="text"
                      name="country"
                      value={profile?.address.country}
                      onChange={handleInputChange}
                      required
                    />
                  </p>
                  <button className="--btn --btn-primary --btn-block">
                    Update Profile
                  </button>
                </form>
              </>
            )}
          </Card>
        </div>
      </section>
    </>
  );
};

export const UserName = () => {
  const { user } = useSelector((state) => state.auth);
  const username = user?.name || "...";
  return (
    <span style={{ color: "#ff7722" }}>Hi, {shortenText(username, 9)}| </span>
  );
};

export default Profile;
