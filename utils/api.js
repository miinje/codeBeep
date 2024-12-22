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

export async function getRepoFiles(username, repo, path = null) {
  const url = path
    ? `https://api.github.com/repos/${username}/${repo}/contents/${path}`
    : `https://api.github.com/repos/${username}/${repo}/contents`;

  try {
    const response = await fetch(url);
    if (!response.ok) {
      console.error(`Failed to fetch: ${url}, Status: ${response.status}`);
      return [];
    }

    const data = await response.json();

    const validFiles = [];
    const validExtensions = [".js", ".ts", ".jsx", ".tsx"];

    for (let i = 0; i < data.length; i++) {
      const item = data[i];

      if (path !== null && item.type === "file") {
        for (let j = 0; j < validExtensions.length; j++) {
          if (item.name.endsWith(validExtensions[j])) {
            const filePath = path ? `${path}/${item.name}` : item.name;
            validFiles.push(filePath);
            break;
          }
        }
      } else if (item.type === "dir") {
        const nestedFiles = await getRepoFiles(
          username,
          repo,
          path ? `${path}/${item.name}` : item.name
        );
        validFiles.push(...nestedFiles);
      }
    }

    return validFiles;
  } catch (error) {
    console.error(`Error while fetching ${url}:`, error);
    return [];
  }
}

export function getRandomElement(repo) {
  const randomIndex = Math.floor(Math.random() * repo.length);

  return repo[randomIndex];
}

export async function getRepoFiles(username, repo, path = "") {
  const url = path
    ? `https://api.github.com/repos/${username}/${repo}/contents/${path}`
    : `https://api.github.com/repos/${username}/${repo}/contents`;

  try {
    const response = await fetch(url);
    if (!response.ok) {
      console.error(`Error fetching ${url} - Status: ${response.status}`);
      return [];
    }

    const data = await response.json();
    const validFiles = [];
    const validExtensions = [".js", ".ts", ".jsx", ".tsx"];

    for (let i = 0; i < data.length; i++) {
      const item = data[i];

      if (item.type === "file") {
        for (let j = 0; j < validExtensions.length; j++) {
          if (item.name.endsWith(validExtensions[j])) {
            const filePath = path ? `${path}/${item.name}` : item.name;
            validFiles.push(filePath);
            break;
          }
        }
      } else if (item.type === "dir") {
        const nestedFiles = await getRepoFiles(
          username,
          repo,
          path ? `${path}/${item.name}` : item.name
        );
        validFiles.push(...nestedFiles);
      }
    }

    return validFiles;
  } catch (error) {
    console.error(`Error while fetching ${url}:`, error);
    return [];
  }
}

export async function getRandomFileAndCode(username, repo) {
  // 모든 파일 가져오기
  const allFiles = await getRepoFiles(username, repo);
  if (allFiles.length === 0) {
    console.warn("No valid files found in the repository.");
    return null;
  }

  // 1️⃣ 랜덤 파일 선택
  const randomIndex = Math.floor(Math.random() * allFiles.length);
  const randomFile = allFiles[randomIndex];
  console.log(`Random file selected: ${randomFile}`);

  // 2️⃣ 랜덤 코드 블록 가져오기
  const randomCode = await getFileContent(username, repo, randomFile);
  return { file: randomFile, code: randomCode };
}

/**
 * 3️⃣ 특정 파일의 내용을 가져오고, 랜덤 코드 블록 반환하기
 */
export async function getFileContent(username, repo, filePath) {
  const url = `https://api.github.com/repos/${username}/${repo}/contents/${filePath}`;

  try {
    const response = await fetch(url);

    if (!response.ok) {
      console.error(`Error fetching ${url} - Status: ${response.status}`);
      return "";
    }

    const data = await response.json();

    // 파일 내용을 Base64로 디코딩
    const decodedContent = atob(data.content);

    // 코드를 문단으로 나눔 (빈 줄을 기준으로)
    const codeBlocks = decodedContent.split("\n\n");
    if (codeBlocks.length === 0) {
      console.warn("No code blocks found.");
      return decodedContent; // 전체 코드 반환
    }

    // 랜덤 코드 블록 반환
    const randomIndex = Math.floor(Math.random() * codeBlocks.length);
    return codeBlocks[randomIndex].trim();
  } catch (error) {
    console.error(`Error while fetching ${url}:`, error);
    return "";
  }
}
