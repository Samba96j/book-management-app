import axios from 'axios';

const API_URL = 'http://localhost:5000/api/books';

export const getBooks = () => {
  return axios.get(API_URL);
};

export const createBook = (bookData) => {
  return axios.post(API_URL, bookData);
};

export const updateBook = (id, bookData) => {
  return axios.put(`${API_URL}/${id}`, bookData);
};

export const deleteBook = (id) => {
  return axios.delete(`${API_URL}/${id}`);
};