import React, { useEffect } from "react";
import "./Profile.scss";
import PageMenu from "../../Components/PageMenu/PageMenu";
import { useDispatch, useSelector } from "react-redux";
import Card from "../../Components/card/Card";
import Loader from "../../Components/loader/Loader";
import { useState } from "react";
import { getUser, updateUser } from "../../redux/features/auth/authSlice";
import { AiOutlineCloudUpload } from "react-icons/ai";

const Profile = () => {
  const { isLoading, user } = useSelector((state) => state.auth);
  const initialState = {
    name: user?.name || "",
    email: user?.email || "",
    phone: user?.phone || "",
    role: user?.role || "",
    photo: user?.photo || "",
    address: user?.address || {
      address: user?.address || "",
      state: user?.address || "",
      country: user?.address || "",
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
        address: user?.address || {
          address: user?.address || "",
          state: user?.address || "",
          country: user?.address || "",
        },
      });
    }
  }, [dispatch]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProfile({ ...profile, [name]: value });
  };
  const handleImageChange = (e) => {
    setProfileImage(e.target.files[0]);
    setImagePreview(URL.createObjectURL(e.target.files[0]));
  };

  const saveProfile = async (e) => {
    e.preventDefault();

    const userData = {
      name: profile.name,
      phone: profile.phone,

      address: {
        address: profile.address,
        state: profile.state,
        country: profile.country,
      },
    };
    // console.log(userData);
    await dispatch(updateUser(userData));
  };

  const savePhoto = async () => {};

  return (
    <>
      <section>
        {isLoading && <Loader />}
        <div className="container">
          <PageMenu />
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
                      required
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
                      accept="email"
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
                      accept="phone"
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
                      name="adddress"
                      value={profile?.address?.address}
                      onChange={handleInputChange}
                      required
                    />
                  </p>
                  <p>
                    <label>State :</label>
                    <input
                      type="text"
                      name="state"
                      value={profile?.address?.state}
                      onChange={handleInputChange}
                      required
                    />
                  </p>
                  <p>
                    <label>Country :</label>
                    <input
                      type="text"
                      name="country"
                      value={profile?.address?.country}
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

export default Profile;
