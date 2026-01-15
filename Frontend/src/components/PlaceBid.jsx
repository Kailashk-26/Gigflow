import React, { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import api from '../config/api';
import toast from 'react-hot-toast';

const PlaceBid = () => {
    const navigate = useNavigate();
    const {gigId}=useParams();


  const [formData, setFormData] = useState({
    message:"",
  });
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };
  const handleSubmit = async(e) => {
    e.preventDefault();
    try{
      const {data}=await api.post(`/api/bids/${gigId}/place`,{message:formData.message},{withCredentials:true})
      toast.success(data.message);
    }catch(err){
      toast.error(err.response?.data?.message)
    }
    finally{
      navigate(-1)
    }
  }
  return (
    <div
      onClick={() => navigate("/dashboard")}
      className="fixed inset-0 z-30 flex items-center justify-center bg-black/40 backdrop-blur-sm"
    >
      <form
        onClick={(e) => e.stopPropagation()}
        onSubmit={handleSubmit}
        className="w-full m-4 max-w-xl bg-white p-6 rounded-2xl shadow-lg"
      >
        <h2 className="text-2xl font-semibold text-gray-800 mb-6">
          Place bid
        </h2>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-600 mb-1">
            Message
          </label>
          <input
            type="text"
            name="message"
            value={formData.message}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-red-400"
          />
        </div>
        <button
          type="submit"
          className="w-full bg-red-500 text-white py-2.5 rounded-xl font-medium hover:bg-red-600 active:scale-95"
        >
          Bid
        </button>
    </form>
    </div>
  )
}

export default PlaceBid