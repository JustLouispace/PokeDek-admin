import axios from "axios";
import { config } from "../../utils/axiosconfig";

const getProducts = async () => {
  const response = await axios.get("http://localhost:5000/api/PokemonCard");
  return response.data;
};

const createProduct = async (product) => {
  console.log(product);
  const response = await axios.post("http://localhost:5000/api/PokemonCard", product, config);
  return response.data;
};

const getAProduct = async (id) => {

  const response = await axios.get(`http://localhost:5000/api/PokemonCard/${id}`,  config);
  return response.data;
};

const deleteAProduct = async (id) => {

  const response = await axios.delete(`http://localhost:5000/api/PokemonCard/${id}`,  config);
  return response.data;
};

const updateProduct = async (Product) => {
  console.log(Product);
  const response = await axios.put(`http://localhost:5000/api/PokemonCard/${Product.id}`,
    config);
  return response.data;
};

const productService = {
  getProducts,
  createProduct,
  getAProduct,
  updateProduct,
  deleteAProduct
};

export default productService;
