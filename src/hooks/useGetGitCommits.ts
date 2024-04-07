import { useEffect, useState } from "react";

interface useGetGitCommitsProps {
  repoName: string;
  ownerName: string;
  githubPersonalToken: string;
}

export const useGetGitCommits = ({
  ownerName,
  repoName,
  githubPersonalToken,
}: useGetGitCommitsProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();
  const [data, setData] = useState();

  useEffect(() => {
    const FetchCommits = async () => {
      setIsLoading(true);
      const res = await fetch(
        `https://api.github.com/repos/${ownerName}/${repoName}/commits`,
        {
          headers: {
            Accept: "application/vnd.github+json",
            Authorization: `${githubPersonalToken}`,
            "X-GitHub-Api-Version": "2022-11-28",
          },
        }
      ).catch((error) => setError(error));

      const data = await res?.json();

      setData(data);
      setIsLoading(false);
    };

    if (isLoading) return;
    FetchCommits();
  }, []);

  return {
    isLoading,
    error,
    data,
  };
};
