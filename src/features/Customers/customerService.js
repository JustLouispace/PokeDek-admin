import axios from "axios";


const getUsers = async (userData) => {
  const response = await axios.get(`http://localhost:5000/api/user/all-user`, userData);

  return response.data

};

const customerService = {
    getUsers,
  };

export default customerService;