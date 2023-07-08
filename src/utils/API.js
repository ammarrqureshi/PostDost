import axios from 'axios';

const Instance = axios.create({
  baseURL: 'http://localhost:8000/api',
  headers: {
    'Content-type': 'application/json',
  },
});

export const apiPostCall = (path, params) => {
  const config = {
    withCredentials: true,
  };
  return Instance.post(path, params, config)
    .then((res) => res?.data)
    .catch((Err) => {
      return { isError: true, Error: Err };
    });
};

export const apiGetCall = (path, params) => {
  const config = {
    withCredentials: true,
  };
  return Instance.get(path, { params: { ...params }, ...config })
    .then((res) => res.data)
    .catch((Err) => {
      return { isError: true, Error: Err };
    });
};
