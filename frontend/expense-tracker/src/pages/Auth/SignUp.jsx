import AuthLayout from "../../components/layouts/AuthLayout";
import { Link, useNavigate } from "react-router-dom";
import Input from "../../components/Inputs/Input";
import { validateEmail } from "../../utils/helper";
import { useState } from "react";
import ProfilPhotoSelector from "../../components/Inputs/ProfilPhotoSelector";
import axiosInstance from "../../utils/axiosInstance";
import { API_PATHS } from "../../utils/apiPath";
import { useContext } from "react";
import { UserContext } from "../../context/UserContext";
import uploadImage from "../../utils/uploadImage";

const SignUp = () => {
  const [profilePic, setProfilePic] = useState("");
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { updateUser } = useContext(UserContext);
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  const handleSignUp = async (e) => {
    e.preventDefault();

    let profileImageUrl = "";

    if (!fullName) {
      setError("Please enter your name.");
      return;
    }

    if (!validateEmail(email)) {
      setError("Please enter a valid email address.");
      return;
    }

    if (!password) {
      setError("Please enter the password");
      return;
    }

    setError("");

    try {
      //Upload image if present
      if (profilePic) {
        const imgUploadRes = await uploadImage(profilePic);
        profileImageUrl = imgUploadRes || "";
      }

      const response = await axiosInstance.post(API_PATHS.AUTH.REGISTER, {
        fullName,
        email,
        password,
        profileImageUrl,
      });

      const { token, user } = response.data;

      if (token) {
        localStorage.setItem("expense-tracker-token", token);
        updateUser(user);
        navigate("/dashboard");
      }
    } catch (error) {
      if (error.response && error.response.data.message) {
        setError(error.response.data.message);
      } else {
        setError("Something went wrong. Please try again.");
      }
    }
  };

  return (
    <AuthLayout>
      <div className="lg:w-full h-auto md:h-full mt-10 md:mt-0 flex flex-col justify-center">
        <h3 className="text-xl font-semibold mt-6">Create an Account</h3>
        <p className="text-xs text-slate-700 mt-1.5 mb-6">
          Join us today by entering your details below.
        </p>

        <form onSubmit={handleSignUp}>
          <ProfilPhotoSelector image={profilePic} setImage={setProfilePic} />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              value={fullName}
              label="Full Name"
              type="text"
              onChange={({ target }) => setFullName(target.value)}
              placeholder="Enter Your Name"
            />

            <Input
              value={email}
              onChange={({ target }) => setEmail(target.value)}
              label="Email Address"
              placeholder="joe@gmail.com"
              type="text"
            />
            <div className="col-span-2">
              <Input
                value={password}
                onChange={({ target }) => setPassword(target.value)}
                label="Password"
                placeholder="Min 8 Characters"
                type="password"
              />
            </div>

            {error && <p className="text-red-500 text-sm pb-2.5">{error}</p>}

            <button type="submit" className="btn-primary col-span-2">
              SignUp
            </button>

            <p className="text-[13px] text-slate-800 mb-2">
              Already have an account?{" "}
              <Link className="font-medium text-primary underline" to="/login">
                Login
              </Link>
            </p>
          </div>
        </form>
      </div>
    </AuthLayout>
  );
};

export default SignUp;
