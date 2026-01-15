import { Lock, MailIcon, User2Icon } from "lucide-react";
import { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import api from "../config/api";
import toast from "react-hot-toast";

const Login = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const state = searchParams.get("state") || "login";
  const navigate=useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleSubmit =async(e) => {
    try{
      e.preventDefault();
      if(state==="login"){
        const {data}=await api.post("api/users/login",{email:formData.email,password:formData.password},{withCredentials:true})
        toast.success(data.message);
        navigate("/")
      }
      else{
        const {data}=await api.post("api/users/register",{name:formData.name,email:formData.email,password:formData.password},{withCredentials:true})
        toast.success(data.message);
        navigate("/")
      }
    }catch(err){
      toast.error(err.response?.data?.message)
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div
      className={`min-h-screen flex items-center justify-center px-4 transition-colors duration-300 ${
        state === "login" ? "bg-red-500" : "bg-white"
      }`}
    >
      <form
        onSubmit={handleSubmit}
        className={`w-87.5 text-center rounded-2xl px-8 border transition-colors duration-300 ${
          state === "login"
            ? "bg-white border-red-200"
            : "bg-red-500 border-red-400"
        }`}
      >
        <h1
          className={`text-3xl mt-10 font-medium ${
            state === "login" ? "text-gray-900" : "text-white"
          }`}
        >
          {state === "login" ? "Login" : "Sign up"}
        </h1>

        <p
          className={`text-sm mt-2 ${
            state === "login" ? "text-gray-600" : "text-red-100"
          }`}
        >
          Please sign in to continue
        </p>

        {/* Name (Register only) */}
        {state !== "login" && (
          <div className="flex items-center mt-6 w-full bg-white border border-red-300 h-12 rounded-full overflow-hidden pl-6 gap-2">
            <User2Icon className="text-red-500" />
            <input
              type="text"
              name="name"
              placeholder="Name"
              className="w-full bg-transparent text-gray-800 placeholder-gray-500 outline-none"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>
        )}

       <div
          className={`flex items-center w-full mt-4 h-12 rounded-full overflow-hidden pl-6 gap-2 border ${
            state === "login"
              ? "bg-white border-red-300"
              : "bg-white border-red-300"
          }`}
        >
          <MailIcon className="text-red-500" />
          <input
            type="email"
            name="email"
            placeholder="Email"
            className="w-full bg-transparent text-gray-800 placeholder-gray-500 outline-none"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>

        <div
          className={`flex items-center mt-4 w-full h-12 rounded-full overflow-hidden pl-6 gap-2 border ${
            state === "login"
              ? "bg-white border-red-300"
              : "bg-white border-red-300"
          }`}
        >
          <Lock className="text-red-500" />
          <input
            type="password"
            name="password"
            placeholder="Password"
            className="w-full bg-transparent text-gray-800 placeholder-gray-500 outline-none"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>

        <button
          type="submit"
          className={`mt-6 w-full h-11 rounded-full transition ${
            state === "login"
              ? "bg-red-500  text-white hover:bg-red-400"
              : "bg-white text-red-600 hover:bg-red-50"
          }`}
        >
          {state === "login" ? "Login" : "Sign up"}
        </button>

        <p
          onClick={() =>
            setSearchParams({
              state: state === "login" ? "register" : "login",
            })
          }
          className={`text-sm mt-4 mb-10 cursor-pointer ${
            state === "login" ? "text-gray-600" : "text-red-100"
          }`}
        >
          {state === "login"
            ? "Don't have an account?"
            : "Already have an account?"}
          <span className="ml-1 underline">Click here</span>
        </p>
      </form>
    </div>
  );
};

export default Login;
