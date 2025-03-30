import React, { useState } from 'react';
import AuthLayouts from '../../Components/layouts/AuthLayouts';
import { useNavigate, Link } from 'react-router-dom';
import Input from '../../Components/Inputs/Input';
import ProfilePhotoSelector from '../../Components/Inputs/ProfilePhotoSelector';
import { validateEmail } from '../../utils/helper';

const Signup = () => {
  const [profilePic, setProfilePic] = useState(null);
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleSignUp = (e) => {
    e.preventDefault();
    let profileImageUrl=""

    if(!fullName){
      setError("Please Enter Name")
      return
    }
    if(!validateEmail(email)){
      setError("Please Enter Valid Email")
    }
    if(!password){
      setError("Enter correct Password")
      return
    }
    setError("")
  };

  return (
    <AuthLayouts>
      <div className="lg:w-[70%] h-3/4 md:h-full mt-10 md:mt-0 flex flex-col justify-center">
        <h3 className="text-xl font-semibold text-black">Create An Account</h3>
        <p className="text-xs text-slate-700 mt-2 mb-6">Join us</p>

        <form onSubmit={handleSignUp}>
          <ProfilePhotoSelector image={profilePic} setImage={setProfilePic}/>
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

          {/* <div className="mb-4">
            <label className="text-[13px] text-slate-800">Profile Picture</label>
            <input
              type="file"
              onChange={(e) => setProfilePic(e.target.files[0])}
              className="w-full mt-2"
            />
          </div> */}

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
