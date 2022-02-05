import jwtDecode from 'jwt-decode';

import { authHost, host } from './index';

export const registration = async (displayName, age, email, password) => {
  const { data } = await host.post('api/user/registration', {
    displayName,
    age,
    email,
    password,
  });
  localStorage.setItem('token', data.token);
  return jwtDecode(data.token);
};

export const login = async (email, password) => {
  const { data } = await host.post('api/user/login', { email, password });
  localStorage.setItem('token', data.token);
  return jwtDecode(data.token);
};

export const authCheck = async () => {
  const { data } = await authHost.get('api/user/auth');
  localStorage.setItem('token', data.token);
  return jwtDecode(data.token);
};

export const resetToken = async () => {
  localStorage.setItem('token', '');
  return jwtDecode('');
};

export const fetchAllUsers = async () => {
  const { data } = await host.get('api/user/viewAllUsers');
  return data;
};

export const fetchOneUser = async id => {
  const { data } = await authHost.get(`api/user/viewUser/${id}`);
  return data;
};
