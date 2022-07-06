import apiClient from "./http-common";

export async function fetchAllQuests() {
  const result = await apiClient.get("/quests").then((res) => res.data);
  return result;
}

export async function submitQuest(dto: any) {
  const result = await apiClient.post("/quests", dto).then((res) => res.data);
  return result;
}
