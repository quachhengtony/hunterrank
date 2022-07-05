import apiClient from "./http-common";

export async function login(dto: any) {
  const result = await apiClient
    .post("/auth/login", dto)
    .then((res) => res.data);
  localStorage.setItem("x-token", result["access_token"]);
  window.location.replace("/home");
  return result;
}

export async function logout() {
  localStorage.removeItem("x-token");
  window.location.reload();
}
