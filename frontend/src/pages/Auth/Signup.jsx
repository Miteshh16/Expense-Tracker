import React, { useState, useContext } from 'react';
import AuthLayouts from '../../Components/layouts/AuthLayouts';
import { useNavigate, Link } from 'react-router-dom';
import Input from '../../Components/Inputs/Input';
import ProfilePhotoSelector from '../../Components/Inputs/ProfilePhotoSelector';
import { validateEmail } from '../../utils/helper';
import axiosInstance from '../../utils/axiosInstance';
import { API_PATHS } from '../../utils/apiPath';
import { UserContext } from '../../Context/UserContext';
import uploadImage from '../../utils/uploadImage';


const Signup = () => {
  const [profilePic, setProfilePic] = useState(null);
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();
  const { updateUser } = useContext(UserContext); // ✅ grab updateUser from context

  const handleSignUp = async (e) => {
    e.preventDefault();

    let profileImageUrl=""

    if (!fullName) {
      setError("Please Enter Name");
      return;
    }
    if (!validateEmail(email)) {
      setError("Please Enter Valid Email");
      return;
    }
    if (!password) {
      setError("Enter correct Password");
      return;
    }

    setError("");

    try {
      
      if(profilePic){
        const imgUploadRes=await uploadImage(profilePic)
        profileImageUrl=imgUploadRes.imageUrl ||""
      }

      const response = await axiosInstance.post(API_PATHS.AUTH.REGISTER, {
        fullname: fullName,
        email,
        password,
        profileImageUrl,
      });

      const { token, user } = response.data;

      if (token) {
        localStorage.setItem("token", token);
        updateUser(user);
        navigate("/dashboard");
      }
    } catch (error) {
      if (error.response?.data?.message) {
        setError(error.response.data.message);
      } else {
        setError("Something went wrong. Please try again.");
      }
    }
  }

  return (
    <AuthLayouts>
      <div className="lg:w-[70%] h-3/4 md:h-full mt-10 md:mt-0 flex flex-col justify-center">
        <h3 className="text-xl font-semibold text-black">Create An Account</h3>
        <p className="text-xs text-slate-700 mt-2 mb-6">Join us</p>

        <form onSubmit={handleSignUp}>
          <ProfilePhotoSelector image={profilePic} setImage={setProfilePic} />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              value={fullName}
              onChange={({ target }) => setFullName(target.value)}
              label="Full Name"
              placeholder="John Doe"
              type="text"
            />
            <Input
              value={email}
              onChange={({ target }) => setEmail(target.value)}
              label="Email Address"
              placeholder="johndoe@example.com"
              type="email"
            />
          </div>

          <Input
            value={password}
            onChange={({ target }) => setPassword(target.value)}
            label="Password"
            placeholder="Min 8 Characters"
            type="password"
          />

          {error && <p className="text-red-500 text-sm mt-2">{error}</p>}

          <button
            type="submit"
            className="w-full bg-violet-600 text-white py-2 mt-4 rounded-md hover:bg-purple-700 transition"
          >
            Sign Up
          </button>

          <p className="text-[13px] text-slate-800 mt-3">
            Already have an account?{" "}
            <Link className="font-medium text-primary underline" to="/login">
              Login
            </Link>
          </p>
        </form>
      </div>
    </AuthLayouts>
  );
};

export default Signup;
