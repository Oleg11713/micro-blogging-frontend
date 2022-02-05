import { authHost, host } from './index';

export const fetchAllPosts = async () => {
  const { data } = await host.get('api/post/viewAllPosts');
  return data;
};

export const fetchOnePost = async id => {
  const { data } = await authHost.get(`api/post/viewPost/${id}`);
  return data;
};

export const createPost = async post => {
  const { data } = await authHost.post('api/post/createPost', post);
  return data;
};

export const updatePost = async updatedPost => {
  const { data } = await authHost.patch(`/api/post/updatePost`, updatedPost);
  return data;
};

export const deletePost = async id => {
  const { data } = await authHost.delete(`api/post/deletePost/${id}`);
  return data;
};
