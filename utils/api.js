export const getGithubUser = async (token) => {
  const githubUser = await fetch("https://api.github.com/user", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return githubUser.json();
};

export const fetchUserRepos = async (username, token) => {
  try {
    const response = await fetch(
      `https://api.github.com/users/${username}/repos`,
      {
        headers: { Authorization: `token ${token}` },
      }
    );

    if (!response.ok) {
      throw new Error(`Error ${response.status}: ${response.statusText}`);
    }

    const repos = await response.json();

    if (!Array.isArray(repos)) {
      throw new Error("Unexpected response format");
    }

    return repos.map((repo) => repo.name);
  } catch (error) {
    console.error("Error fetching repos:", error.message);

    throw error;
  }
};
