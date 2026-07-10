const staticData = {
  now: ['AI / Agent', 'Transformer', 'Frontend', '算法笔记'],
  radar: {
    contributions: 158,
    repositories: 12,
    stars: 20,
    languages: [
      { name: 'Python', percent: 67, color: 'blue' },
      { name: 'JavaScript', percent: 19, color: 'green' },
      { name: 'TypeScript', percent: 14, color: 'gold' },
    ],
  },
  skills: [
    { name: 'AI', items: ['LLM', 'Agent', 'Transformer'], color: 'blue' },
    { name: 'Frontend', items: ['Vue', 'JavaScript', 'TypeScript'], color: 'green' },
    { name: 'Code', items: ['Python', 'C / C++', 'Node.js', 'Git'], color: 'gold' },
  ],
};

const query = `
  query ProfileData($login: String!, $from: DateTime!, $to: DateTime!) {
    user(login: $login) {
      repositories(first: 100, privacy: PUBLIC, ownerAffiliations: OWNER, orderBy: {field: UPDATED_AT, direction: DESC}) {
        totalCount
        nodes {
          stargazerCount
          languages(first: 10, orderBy: {field: SIZE, direction: DESC}) {
            edges {
              size
              node {
                name
              }
            }
          }
        }
      }
      contributionsCollection(from: $from, to: $to) {
        contributionCalendar {
          totalContributions
        }
      }
    }
  }
`;

async function requestProfileData(token, login) {
  const now = new Date();
  const from = new Date(Date.UTC(now.getUTCFullYear(), 0, 1)).toISOString();
  const response = await fetch('https://api.github.com/graphql', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
      'User-Agent': 'Jian1202-profile-generator',
    },
    body: JSON.stringify({ query, variables: { login, from, to: now.toISOString() } }),
  });
  const payload = await response.json();

  if (!response.ok || payload.errors) {
    const message = payload.errors?.map((error) => error.message).join('; ') || response.statusText;
    throw new Error(`GitHub GraphQL 请求失败：${message}`);
  }

  return payload.data.user;
}

function summarizeLanguages(repositories) {
  const sizes = new Map();

  for (const repository of repositories) {
    for (const edge of repository.languages.edges) {
      sizes.set(edge.node.name, (sizes.get(edge.node.name) || 0) + edge.size);
    }
  }

  const total = [...sizes.values()].reduce((sum, size) => sum + size, 0);
  const colors = ['blue', 'green', 'gold'];

  return [...sizes.entries()]
    .sort(([, left], [, right]) => right - left)
    .slice(0, 3)
    .map(([name, size], index) => ({
      name,
      percent: total ? Math.round((size / total) * 100) : 0,
      color: colors[index],
    }));
}

async function getProfileData() {
  const token = process.env.GITHUB_TOKEN;

  if (!token) {
    return staticData;
  }

  const user = await requestProfileData(token, process.env.GITHUB_LOGIN || 'Jian1202');
  const repositories = user.repositories.nodes;

  return {
    ...staticData,
    radar: {
      contributions: user.contributionsCollection.contributionCalendar.totalContributions,
      repositories: user.repositories.totalCount,
      stars: repositories.reduce((sum, repository) => sum + repository.stargazerCount, 0),
      languages: summarizeLanguages(repositories),
    },
  };
}

module.exports = { getProfileData, staticData };
