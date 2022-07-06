import { useState } from "react";
import Select from "./select/Select";

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

type IProps = {
  questDto: any;
  setQuestDto: any;
  handleSubmitQuest: any;
};

const QuestForm: React.FC<IProps> = ({
  questDto,
  setQuestDto,
  handleSubmitQuest,
}) => {
  const [difficultyLevelselected, setDifficultyLevelSelected] = useState(
    difficultyLevels[0]
  );
  return (
    <form
      className="space-y-8 divide-y divide-gray-200"
      method="POST"
      onSubmit={(e) => handleSubmitQuest(e)}
    >
      <div className="space-y-8 divide-y divide-gray-200">
        <div>
          <div>
            <h3 className="text-lg leading-6 font-medium text-gray-900">
              Quest
            </h3>
            <p className="mt-1 text-sm text-gray-500">
              This information will be displayed publicly so be careful what you
              share.
            </p>
          </div>

          <div className="mt-6 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
            <div className="sm:col-span-4">
              <label
                htmlFor="username"
                className="block text-sm font-medium text-gray-700"
              >
                Title
              </label>
              <div className="mt-1 flex rounded-md shadow-sm">
                <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500 sm:text-sm">
                  hunterrank.xyz/quests/
                </span>
                <input
                  type="text"
                  name="title"
                  id="title"
                  autoComplete="title"
                  value={questDto.title}
                  onChange={(e) =>
                    setQuestDto({ ...questDto, title: e.target.value })
                  }
                  className="flex-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full min-w-0 rounded-none rounded-r-md sm:text-sm border-gray-300"
                />
              </div>
            </div>

            <div className="sm:col-span-6">
              <label
                htmlFor="about"
                className="block text-sm font-medium text-gray-700"
              >
                Description
              </label>
              <div className="mt-1">
                <textarea
                  id="description"
                  name="description"
                  rows={7}
                  value={questDto.description}
                  onChange={(e) =>
                    setQuestDto({ ...questDto, description: e.target.value })
                  }
                  className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border border-gray-300 rounded-md"
                  defaultValue={""}
                />
              </div>
              <p className="mt-2 text-sm text-gray-500">
                Write a detailed description of the quest.
              </p>
            </div>
          </div>
        </div>

        <div className="pt-8">
          <div>
            <h3 className="text-lg leading-6 font-medium text-gray-900">
              Details
            </h3>
            <p className="mt-1 text-sm text-gray-500">
              Provide accurate information about the quest.
            </p>
          </div>
          <div className="mt-6 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
            <div className="sm:col-span-2">
              <Select
                items={difficultyLevels}
                selected={difficultyLevelselected}
                setSelected={setDifficultyLevelSelected}
              />
            </div>
            <div className="sm:col-span-3">
              <label
                htmlFor="company-website"
                className="block text-sm font-medium text-gray-700"
              >
                Location
              </label>
              <div className="mt-1 flex rounded-md shadow-sm">
                <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500 sm:text-sm">
                  https://meet.google.com/
                </span>
                <input
                  type="text"
                  name="location"
                  id="location"
                  className="flex-1 min-w-0 block w-full px-3 py-2 rounded-none rounded-r-md focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm border-gray-300"
                  placeholder="vxq-oygn-hsg"
                  value={questDto.location}
                  onChange={(e) =>
                    setQuestDto({
                      ...questDto,
                      location: "https://meet.google.com/" + e.target.value,
                    })
                  }
                />
              </div>
            </div>

            <div className="sm:col-span-2">
              <label
                htmlFor="startAt"
                className="block text-sm font-medium text-gray-700"
              >
                Start time & date
              </label>
              <div className="mt-1">
                <input
                  id="startAt"
                  name="startAt"
                  type="datetime-local"
                  autoComplete="startAt"
                  value={questDto.startAt}
                  onChange={(e) =>
                    setQuestDto({ ...questDto, startAt: e.target.value })
                  }
                  className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                />
              </div>
            </div>

            <div className="sm:col-span-2">
              <label
                htmlFor="endAt"
                className="block text-sm font-medium text-gray-700"
              >
                End time & date
              </label>
              <div className="mt-1">
                <input
                  id="endAt"
                  name="endAt"
                  type="datetime-local"
                  autoComplete="endAt"
                  value={questDto.endAt}
                  onChange={(e) =>
                    setQuestDto({ ...questDto, endAt: e.target.value })
                  }
                  className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                />
              </div>
            </div>

            <div className="sm:col-span-2">
              <label
                htmlFor="reward"
                className="block text-sm font-medium text-gray-700"
              >
                Reward
              </label>
              <div className="mt-1 relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <span className="text-gray-500 sm:text-sm">Ǥ</span>
                </div>
                <input
                  type="text"
                  name="reward"
                  id="reward"
                  className="focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-7 pr-12 sm:text-sm border-gray-300 rounded-md"
                  placeholder="10"
                  aria-describedby="price-currency"
                  value={questDto.reward}
                  onChange={(e) =>
                    setQuestDto({ ...questDto, reward: Number(e.target.value) })
                  }
                />
                <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                  <span
                    className="text-gray-500 sm:text-sm"
                    id="price-currency"
                  >
                    Gold coin
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="pt-8">
        <div>
          <h3 className="text-lg leading-6 font-medium text-gray-900">
            Notifications
          </h3>
          <p className="mt-1 text-sm text-gray-500">
            We'll always let you know about important changes, but you pick what
            else you want to hear about.
          </p>
        </div>
        <div className="mt-6">
          <fieldset>
            <legend className="contents text-base font-medium text-gray-900">
              Push Notifications
            </legend>
            <p className="text-sm text-gray-500">
              These are delivered via SMS to your mobile phone.
            </p>
            <div className="mt-4 space-y-4">
              <div className="flex items-center">
                <input
                  id="push-everything"
                  name="push-notifications"
                  type="radio"
                  className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300"
                />
                <label
                  htmlFor="push-everything"
                  className="ml-3 block text-sm font-medium text-gray-700"
                >
                  Everything
                </label>
              </div>
              <div className="flex items-center">
                <input
                  id="push-email"
                  name="push-notifications"
                  type="radio"
                  className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300"
                />
                <label
                  htmlFor="push-email"
                  className="ml-3 block text-sm font-medium text-gray-700"
                >
                  Same as email
                </label>
              </div>
              <div className="flex items-center">
                <input
                  id="push-nothing"
                  name="push-notifications"
                  type="radio"
                  className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300"
                />
                <label
                  htmlFor="push-nothing"
                  className="ml-3 block text-sm font-medium text-gray-700"
                >
                  No push notifications
                </label>
              </div>
            </div>
          </fieldset>
        </div>
      </div>

      <div className="pt-5">
        <div className="flex justify-end">
          <button
            type="button"
            className="bg-white py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Submit request
          </button>
        </div>
      </div>
    </form>
  );
};
export default QuestForm;
