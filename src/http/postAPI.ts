import { authHost, host } from "./index";

export const fetchAllPosts = async () => {
  const { data } = await host.get("api/post/viewAllPosts");
  return data;
};

export const fetchOnePost = async (id: string | undefined) => {
  const { data } = await authHost.get(`api/post/viewPost/${id}`);
  return data;
};

export const createPost = async (post: FormData) => {
  const { data } = await authHost.post("api/post/createPost", post);
  return data;
};

export const updatePost = async (updatedPost: FormData) => {
  const { data } = await authHost.patch(`/api/post/updatePost`, updatedPost);
  return data;
};

export const deletePost = async (id?: number) => {
  const { data } = await authHost.delete(`api/post/deletePost/${id}`);
  return data;
};
