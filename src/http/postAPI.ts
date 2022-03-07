import { authHost } from "./index";

export const fetchAllPosts = async () => {
  const { data } = await authHost.get("publications/viewAllPublications");
  return data;
};

export const fetchOnePost = async (id: string | undefined) => {
  const { data } = await authHost.get(`publications/viewPublication/${id}`);
  return data;
};

export const createPost = async (post: FormData) => {
  const { data } = await authHost.post("publications/createPublication", post);
  return data;
};

export const updatePost = async (updatedPost: FormData) => {
  const { data } = await authHost.patch(
    `publications/updatePublication`,
    updatedPost,
  );
  return data;
};

export const deletePost = async (id?: number) => {
  const { data } = await authHost.delete(
    `publications/deletePublication/${id}`,
  );
  return data;
};
