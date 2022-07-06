import { useState } from "react";
import { useMutation, useQuery } from "react-query";
import { getAuthenticatedUser, submitQuest } from "../api";
import NavigationBar from "../components/NavigationBar";
import QuestForm from "../components/QuestForm";

export default function SubmitQuest() {
  const userQuery = useQuery("user", getAuthenticatedUser);

  const [questDto, setQuestDto] = useState({
    title: "",
    description: "",
    reward: 1,
    difficultyLevel: "A",
    location: "",
    startAt: "",
    endAt: "",
  });

  async function handleSubmitQuest(e: any) {
    e.preventDefault();
    submitQuestMutate(questDto);
  }

  const {
    data,
    mutate: submitQuestMutate,
    isLoading,
  } = useMutation(submitQuest);

  return (
    <>
      <div className="min-h-full">
        <NavigationBar user={userQuery?.data} />
        <main className="-mt-24 pb-8">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:max-w-7xl lg:px-8">
            <h1 className="sr-only">Page title</h1>
            <section aria-labelledby="section-1-title">
              <h2 className="sr-only" id="section-1-title">
                Section title
              </h2>
              <div className="rounded-lg bg-white overflow-hidden shadow">
                <div className="p-6">
                  {/* Your content */}
                  <QuestForm
                    questDto={questDto}
                    setQuestDto={setQuestDto}
                    handleSubmitQuest={handleSubmitQuest}
                  />
                </div>
              </div>
            </section>
          </div>
        </main>
      </div>
    </>
  );
}
