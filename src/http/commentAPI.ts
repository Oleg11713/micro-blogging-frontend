import { authHost } from "./index";
import { IComment } from "../interfaces/IComment";

export const fetchAllComments = async () => {
  const { data } = await authHost.get("comments/viewAllComments");
  return data;
};

export const createComment = async (comment: IComment) => {
  const { data } = await authHost.post("comments/createComment", comment);
  return data;
};

export const updateComment = async (updatedComment: {
  id?: number;
  content: string;
}) => {
  const { data } = await authHost.patch(
    `comments/updateComment`,
    updatedComment,
  );
  return data;
};

export const deleteComment = async (id: number) => {
  const { data } = await authHost.delete(`comments/deleteComment/${id}`);
  return data;
};
