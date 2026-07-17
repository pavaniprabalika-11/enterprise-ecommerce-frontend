import { useState } from "react";
import Navbar from "../components/Navbar";
import axios from "axios";
import { FaEdit } from "react-icons/fa";

function Profile() {
  const email = localStorage.getItem("email");

  const [profile, setProfile] = useState({
  phone: localStorage.getItem("phone") || "",
  address1: localStorage.getItem("address1") || "",
  address2: localStorage.getItem("address2") || "",
});

  const [editing, setEditing] = useState(false);

 const saveProfile = async () => {
  try {
    await axios.post(
      "https://enterprise-ecommerce-backend.onrender.com/api/Address/add",
      {
        userEmail: email,
        fullName: "Customer",
        phoneNumber: profile.phone,
        doorNumber: "",
        streetName: "",
        addressLine1: profile.address1,
        addressLine2: profile.address2,
        city: "",
        state: "",
        pincode: "",
        addressType: "Home",
      }
    );

    // Optional: keep local copy too
    localStorage.setItem("phone", profile.phone);
    localStorage.setItem("address1", profile.address1);
    localStorage.setItem("address2", profile.address2);

    alert("Profile Updated Successfully 🎉");

    setEditing(false);
  } catch (err) {
    console.log(err);
    alert("Failed to save address");
  }
};

  return (
    <>
      <Navbar />

      <div className="min-h-screen bg-[#f5f0e8] py-12 px-5">
        <div className="max-w-3xl mx-auto bg-white rounded-3xl shadow-xl p-10">

          <h1
            className="text-4xl font-bold mb-10"
            style={{
              color: "#8B6914",
              fontFamily: "Playfair Display",
            }}
          >
            My Profile
          </h1>

          {/* Email */}
          <div className="mb-6">
            <label className="font-semibold text-gray-700">
              Email
            </label>

            <input
              type="text"
              value={email}
              disabled
              className="w-full mt-2 border rounded-lg p-3 bg-gray-100"
            />
          </div>

          {/* Phone */}
          <div className="mb-6">
            <label className="font-semibold text-gray-700">
              Phone Number
            </label>

            <input
              type="text"
              disabled={!editing}
              value={profile.phone}
              onChange={(e) =>
                setProfile({
                  ...profile,
                  phone: e.target.value,
                })
              }
              className="w-full mt-2 border rounded-lg p-3"
            />
          </div>

          {/* Address Line 1 */}
          <div className="mb-6">
            <label className="font-semibold text-gray-700">
              Address Line 1
            </label>

            <input
              type="text"
              disabled={!editing}
              value={profile.address1}
              onChange={(e) =>
                setProfile({
                  ...profile,
                  address1: e.target.value,
                })
              }
              className="w-full mt-2 border rounded-lg p-3"
            />
          </div>

          {/* Address Line 2 */}
          <div className="mb-8">
            <label className="font-semibold text-gray-700">
              Address Line 2
            </label>

            <textarea
              rows="3"
              disabled={!editing}
              value={profile.address2}
              onChange={(e) =>
                setProfile({
                  ...profile,
                  address2: e.target.value,
                })
              }
              className="w-full mt-2 border rounded-lg p-3"
            />
          </div>

          {!editing ? (
            <button
              onClick={() => setEditing(true)}
              className="bg-[#C9A227] hover:bg-black text-white px-8 py-3 rounded-full flex items-center gap-2"
            >
              <FaEdit />
              Edit Profile
            </button>
          ) : (
            <button
              onClick={saveProfile}
              className="bg-green-600 hover:bg-green-700 text-white px-8 py-3 rounded-full"
            >
              Save Changes
            </button>
          )}

        </div>
      </div>
    </>
  );
}

export default Profile;
