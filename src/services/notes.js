import axios from 'axios';
// URL for production build
// const baseUrl = '/api/notes';
// URL for development via json-server
const baseUrl = 'http://localhost:3003/api/notes';

const getAll = () => {
  const request = axios.get(baseUrl);
  return request.then((response) => response.data);
};

const create = (newObject) => {
  const request = axios.post(baseUrl, newObject);
  return request.then((response) => response.data);
};

const update = (id, newObject) => {
  const request = axios.put(`${baseUrl}/${id}`, newObject);
  return request.then((response) => response.data);
};

const remove = (id) => {
  const request = axios.delete(`${baseUrl}/${id}`);
  return request.then((response) => response);
};

export default {
  getAll,
  create,
  update,
  remove
};
