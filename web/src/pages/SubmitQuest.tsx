import { useState } from "react";
import { useMutation, useQuery } from "react-query";
import { getAuthenticatedUser, submitQuest } from "../api";
import NavigationBar from "../components/NavigationBar";
import QuestForm from "../components/QuestForm";

const difficultyLevels = [
  {
    id: 1,
    name: "F Class:  1~10",
    avatar:
      "https://images.unsplash.com/photo-1491528323818-fdd1faba62cc?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
  },
  {
    id: 2,
    name: "E Class: 11~20",
    avatar:
      "https://images.unsplash.com/photo-1550525811-e5869dd03032?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
  },
  {
    id: 3,
    name: "D Class: 21~30",
    avatar:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2.25&w=256&h=256&q=80",
  },
  {
    id: 4,
    name: "C Class: 31~40",
    avatar:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2.25&w=256&h=256&q=80",
  },
  {
    id: 5,
    name: "B Class: 41~50",
    avatar:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2.25&w=256&h=256&q=80",
  },
  {
    id: 6,
    name: "A Class: 51~60",
    avatar:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2.25&w=256&h=256&q=80",
  },
  {
    id: 7,
    name: "A+ Class: 61~70",
    avatar:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2.25&w=256&h=256&q=80",
  },
  {
    id: 8,
    name: "A++ Class: 71~",
    avatar:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2.25&w=256&h=256&q=80",
  },
];

export default function SubmitQuest() {
  const userQuery = useQuery("user", getAuthenticatedUser);
  const [difficultyLevelSelected, setDifficultyLevelSelected] = useState(
    difficultyLevels[0]
  );
  const [questDto, setQuestDto] = useState({
    title: "",
    description: "",
    reward: 1,
    difficultyLevel: difficultyLevelSelected.name.split(" ")[0],
    location: "",
    startAt: "",
    endAt: "",
  });

  async function handleSubmitQuest(e: any) {
    e.preventDefault();
    questDto.difficultyLevel = difficultyLevelSelected.name.split(" ")[0];
    questDto.location = "https://meet.google.com/" + questDto.location;
    submitQuestMutate(questDto);
    // window.location.reload();
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
                    difficultyLevels={difficultyLevels}
                    difficultyLevelSelected={difficultyLevelSelected}
                    setDifficultyLevelSelected={setDifficultyLevelSelected}
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
