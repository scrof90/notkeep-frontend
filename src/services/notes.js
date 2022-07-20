import axios from 'axios';
// URL for production build
const baseUrl = '/api/notes';
// URL for development via json-server
// const baseUrl = 'http://localhost:3003/api/notes';

const getAll = async () => {
  const response = await axios.get(baseUrl);
  return response.data;
};

const create = async (newObject) => {
  const response = await axios.post(baseUrl, newObject);
  return response.data;
};

const update = async (id, newObject) => {
  const response = await axios.put(`${baseUrl}/${id}`, newObject);
  return response.data;
};

const remove = async (id) => await axios.delete(`${baseUrl}/${id}`);

export default {
  getAll,
  create,
  update,
  remove
};
