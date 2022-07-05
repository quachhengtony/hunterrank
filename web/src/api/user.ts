import apiClient from "./http-common";

export async function getAuthenticatedUser() {
  const result = await apiClient.get("/users").then((res) => res.data);
  return result;
}
