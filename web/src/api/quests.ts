import apiClient from "./http-common";

export async function fetchAllQuests() {
  const result = await apiClient.get("/quests").then((res) => res.data);
  return result;
}
