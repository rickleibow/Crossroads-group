import React, { useEffect, useState } from "react";
import "./App.css";
import { useGetGitCommits } from "./hooks/useGetGitCommits";
import { BiUser, BiTime, BiHash } from "react-icons/bi";
import { MdMouse } from "react-icons/md";
import { ScrollWheel } from "./icons/ScrollWheel";

function App() {
  const { data, error, isLoading } = useGetGitCommits({
    ownerName: "rickleibow",
    repoName: "Crossroads-group",
    githubPersonalToken: process.env.REACT_APP_GITHUB_TOKEN!,
  });

  const [commitIdx, setCommitIdx] = useState(0);

  let canScroll = true;
  function handleWheel(event: WheelEvent) {
    if (canScroll) {
      setCommitIdx((idx) => {
        const getNewIdx = () => {
          if (event.deltaY > 1) {
            const newIdx = idx + 1;
            return newIdx >= data.length ? idx : idx + 1;
          } else {
            const newIdx = idx - 1;
            return newIdx < 0 ? 0 : idx - 1;
          }
        };

        const newIdx = getNewIdx();

        const element = document.querySelector(`[data-commitIdx="${newIdx}"]`);

        element?.scrollIntoView({
          behavior: "smooth",
          block: "center",
          inline: "center",
        });

        return newIdx;
      });

      canScroll = false;
      setTimeout(() => {
        canScroll = true;
      }, 500);
    }
  }

  useEffect(() => {
    if (typeof window !== "undefined") {
      document.documentElement.addEventListener("wheel", handleWheel);
    }

    return () => {
      document.documentElement.removeEventListener("wheel", handleWheel);
    };
  }, [data]);

  return (
    <div className="overflow-hidden h-screen p-32 w-full flex items-center">
      <img
        src="/bg.avif"
        className="w-screen h-screen object-cover fixed top-0 left-0"
      />
      <div className="z-30 fixed top-16 right-16 text-3xl text-white items-center flex flex-col gap-2">
        <ScrollWheel></ScrollWheel>
        <p className="text-base">Scroll</p>
      </div>
      <div className="w-[90vw] h-[90vh] rounded-xl bg-white bg-opacity-25 blur fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"></div>
      <div className="relative">
        <div
          style={{ width: `${(data.length - 1) * 20}rem` }}
          className="h-2 border border-black rounded-full"
        ></div>

        <div
          style={{ width: `${commitIdx * 20}rem` }}
          className="absolute top-0 left-0 h-2 border bg-black rounded-full"
        />

        {data.length &&
          data.map((_commit, idx) => {
            const commit = data[data.length - 1 - idx];
            return (
              <div
                data-commitIdx={idx}
                key={commit.sha}
                style={{ left: `${idx * 20}rem` }}
                className={`absolute w-6 h-6 top-1/2 -translate-x-1/2 -translate-y-1/2 ${
                  commitIdx >= idx ? "bg-black" : "bg-white"
                } border border-black rounded-full`}
              >
                <div className="relative">
                  <div
                    className={`${
                      commitIdx === idx
                        ? "-translate-y-[120%] opacity-100 pointer-events-none"
                        : "-translate-y-[100%] pointer-events-auto opacity-0"
                    } py-4 px-8 transition-all bg-white rounded-xl shadow-sm absolute top-0 flex flex-col gap-4`}
                  >
                    <div className="flex gap-2 items-center">
                      <BiUser></BiUser>
                      <p>{commit?.commit?.committer?.name}</p>
                    </div>
                    <div className="flex gap-2 items-center">
                      <BiTime></BiTime>
                      <p>{commit?.commit?.committer?.date}</p>
                    </div>
                    <div className="flex gap-2 items-center">
                      <BiHash></BiHash>
                      <p>{commit?.sha}</p>
                    </div>
                  </div>
                  <div
                    className={`${
                      commitIdx === idx
                        ? "translate-y-16 opacity-100 pointer-events-none"
                        : "translate-y-10 pointer-events-auto opacity-0"
                    } py-4 px-8 transition-all min-w-48 bg-white rounded-xl shadow-sm absolute top-0 flex flex-col gap-4`}
                  >
                    <div className="flex flex-col gap-2 justify-center text-center">
                      <p className="font-bold text-xl">Message</p>
                      <p>{commit.commit.message}</p>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
}

export default App;
