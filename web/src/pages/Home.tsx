import Quest from "../components/Quest";
import { useQuery } from "react-query";
import NavigationBar from "../components/NavigationBar";
import { fetchAllQuests, getAuthenticatedUser } from "../api";
import { useState } from "react";
import Notification from "../components/overlays/Notification";

const navigation = [
  { name: "Quest Board", href: "#", current: true },
  { name: "Your Quests", href: "#", current: false },
  { name: "Upcoming", href: "#", current: false },
  { name: "Quests Ranking", href: "#", current: false },
  { name: "Hunters Ranking", href: "#", current: false },
];

export default function Home() {
  const [showNotification, setShowNotification] = useState(false);

  const { isLoading, isError, data } = useQuery("quests", fetchAllQuests);

  const userQuery = useQuery("user", getAuthenticatedUser);

  if (isLoading) {
    return <span>Loading...</span>;
  }

  if (isError) {
    return <span>Error: Something went wrong.</span>;
  }

  return (
    <>
      <Notification show={showNotification} setShow={setShowNotification} />
      <div className="min-h-full">
        <NavigationBar navigation={navigation} user={userQuery.data} />

        <main className="-mt-24 pb-8">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:max-w-7xl lg:px-8">
            <h1 className="sr-only">Page title</h1>
            {/* Main 3 column grid */}
            <div className="grid grid-cols-1 gap-4 items-start lg:grid-cols-3 lg:gap-8">
              {/* Left column */}
              <div className="grid grid-cols-1 gap-4 lg:col-span-2">
                <section aria-labelledby="section-1-title">
                  <h2 className="sr-only" id="section-1-title">
                    Section title
                  </h2>
                  <div className="rounded-lg bg-white overflow-hidden shadow">
                    <div className="p-6">
                      {/* Your content */}
                      {data.map((quest: any) => (
                        <Quest quest={quest} />
                      ))}
                    </div>
                  </div>
                </section>
              </div>

              {/* Right column */}
              <div className="grid grid-cols-1 gap-4">
                <section aria-labelledby="section-2-title">
                  <h2 className="sr-only" id="section-2-title">
                    Section title
                  </h2>
                  <div className="rounded-lg bg-white overflow-hidden shadow">
                    <div className="p-6">{/* Your content */}</div>
                  </div>
                </section>
              </div>
            </div>
          </div>
        </main>
        <footer>
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 lg:max-w-7xl">
            <div className="border-t border-gray-200 py-8 text-sm text-gray-500 text-center sm:text-left">
              <span className="block sm:inline">
                &copy; 2021 Tailwind Labs Inc.
              </span>{" "}
              <span className="block sm:inline">All rights reserved.</span>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
}
