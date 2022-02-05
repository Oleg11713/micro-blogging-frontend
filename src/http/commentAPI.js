import { authHost, host } from './index';

export const fetchAllComments = async () => {
  const { data } = await host.get('api/comment/viewAllComments');
  return data;
};

export const createComment = async comment => {
  const { data } = await authHost.post('api/comment/createComment', comment);
  return data;
};

export const updateComment = async updatedComment => {
  const { data } = await authHost.patch(
    `/api/comment/updateComment`,
    updatedComment,
  );
  return data;
};

export const deleteComment = async id => {
  const { data } = await authHost.delete(`api/comment/deleteComment/${id}`);
  return data;
};
