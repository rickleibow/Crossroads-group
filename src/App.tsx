import React from "react";
import logo from "./logo.svg";
import "./App.css";
import { useGetGitCommits } from "./hooks/useGetGitCommits";

function App() {
  const { data, error, isLoading } = useGetGitCommits({
    ownerName: "rickleibow",
    repoName: "Crossroads-group",
    githubPersonalToken: process.env.REACT_APP_GITHUB_TOKEN!,
  });

  return <pre className="">{JSON.stringify({ data }, null, 2)}</pre>;
}

export default App;
