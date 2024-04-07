import React from "react";
import logo from "./logo.svg";
import "./App.css";
import { useGetGitCommits } from "./hooks/useGetGitCommits";

function App() {
  const {} = useGetGitCommits({
    ownerName: "",
    repoName: "",
    githubPersonalToken: process.env.REACT_APP_GITHUB_TOKEN!,
  });
  return <h1 className="text-3xl font-bold underline">Hello world!</h1>;
}

export default App;
