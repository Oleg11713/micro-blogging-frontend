import { authHost, host } from "./index";
import { IComment } from "../interfaces/IComment";

export const fetchAllComments = async () => {
  const { data } = await host.get("api/comment/viewAllComments");
  return data;
};

export const createComment = async (comment: IComment) => {
  const { data } = await authHost.post("api/comment/createComment", comment);
  return data;
};

export const updateComment = async (updatedComment: {
  id?: number;
  content: string;
}) => {
  const { data } = await authHost.patch(
    `/api/comment/updateComment`,
    updatedComment,
  );
  return data;
};

export const deleteComment = async (id: number) => {
  const { data } = await authHost.delete(`api/comment/deleteComment/${id}`);
  return data;
};
