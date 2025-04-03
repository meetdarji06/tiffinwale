import React from "react";

function Profile() {
  async function handleLogout(e) {
    e.preventDefault();
    // console.log(email)
    // console.log(password)
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/v1/user/logout`,
        {
          email,
          password,
        },
        { withCredentials: true }
      );

      if (res.data.success) {
        toast.success(res.data.message);
      } else {
        toast(res.data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  }
  return (
    <div>
      <button onClick={handleLogout}>logout</button>
    </div>
  );
}

export default Profile;
