import { createSelector } from "reselect";

const loading = (state: { app: { loading: boolean } }) => state.app.loading;

export const selectLoading = createSelector([loading], loading => loading);

const alert = (state: { app: { alert: string } }) => state.app.alert;

export const selectAlert = createSelector([alert], alert => alert);
