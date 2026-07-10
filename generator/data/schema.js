const accentTokens = new Set(['blue', 'green', 'gold']);

function fail(path, message) {
  throw new Error(`数据校验失败：${path} ${message}`);
}

function object(value, path) {
  if (!value || typeof value !== 'object' || Array.isArray(value)) {
    fail(path, '必须是对象。');
  }
}

function keys(value, path, expected) {
  object(value, path);
  const actual = Object.keys(value).sort();
  const required = [...expected].sort();

  if (actual.length !== required.length || actual.some((key, index) => key !== required[index])) {
    fail(path, `字段必须为：${required.join(', ')}。`);
  }
}

function string(value, path) {
  if (typeof value !== 'string' || !value.trim()) {
    fail(path, '必须是非空字符串。');
  }
}

function number(value, path, { min = 0, max = Number.POSITIVE_INFINITY } = {}) {
  if (!Number.isFinite(value) || value < min || value > max) {
    fail(path, `必须是 ${min} 到 ${max} 之间的数字。`);
  }
}

function list(value, path) {
  if (!Array.isArray(value) || !value.length) {
    fail(path, '必须是非空数组。');
  }
}

function accent(value, path) {
  if (!accentTokens.has(value)) {
    fail(path, `必须使用主题色 token：${[...accentTokens].join(', ')}。`);
  }
}

function labeledSection(value, path, entryKey) {
  keys(value, path, ['eyebrow', entryKey, 'title']);
  string(value.title, `${path}.title`);
  string(value.eyebrow, `${path}.eyebrow`);
  list(value[entryKey], `${path}.${entryKey}`);
}

function validateProfile(profile) {
  keys(profile, 'profile', ['documentDescription', 'documentTitle', 'footer', 'header', 'mission']);
  string(profile.documentTitle, 'profile.documentTitle');
  string(profile.documentDescription, 'profile.documentDescription');
  keys(profile.header, 'profile.header', ['greeting', 'subtitle', 'title']);
  Object.entries(profile.header).forEach(([key, value]) => string(value, `profile.header.${key}`));
  labeledSection(profile.mission, 'profile.mission', 'tracks');
  profile.mission.tracks.forEach((track, index) => {
    keys(track, `profile.mission.tracks[${index}]`, ['color', 'items', 'name']);
    string(track.name, `profile.mission.tracks[${index}].name`);
    accent(track.color, `profile.mission.tracks[${index}].color`);
    list(track.items, `profile.mission.tracks[${index}].items`);
    track.items.forEach((item, itemIndex) => string(item, `profile.mission.tracks[${index}].items[${itemIndex}]`));
  });
  keys(profile.footer, 'profile.footer', ['handle', 'slogan']);
  Object.entries(profile.footer).forEach(([key, value]) => string(value, `profile.footer.${key}`));
}

function validateGithub(github) {
  keys(github, 'github', ['eyebrow', 'languages', 'stats', 'title']);
  string(github.title, 'github.title');
  string(github.eyebrow, 'github.eyebrow');
  list(github.stats, 'github.stats');
  list(github.languages, 'github.languages');
  github.stats.forEach((stat, index) => {
    keys(stat, `github.stats[${index}]`, ['color', 'label', 'value']);
    string(stat.label, `github.stats[${index}].label`);
    number(stat.value, `github.stats[${index}].value`);
    accent(stat.color, `github.stats[${index}].color`);
  });
  github.languages.forEach((language, index) => {
    keys(language, `github.languages[${index}]`, ['name', 'percent']);
    string(language.name, `github.languages[${index}].name`);
    number(language.percent, `github.languages[${index}].percent`, { max: 100 });
  });
}

function validateProjects(projects) {
  labeledSection(projects, 'projects', 'entries');
  projects.entries.forEach((entry, index) => {
    keys(entry, `projects.entries[${index}]`, ['color', 'description', 'name', 'tags']);
    string(entry.name, `projects.entries[${index}].name`);
    string(entry.description, `projects.entries[${index}].description`);
    accent(entry.color, `projects.entries[${index}].color`);
    list(entry.tags, `projects.entries[${index}].tags`);
    entry.tags.forEach((tag, tagIndex) => string(tag, `projects.entries[${index}].tags[${tagIndex}]`));
  });
}

function validateSkills(skills) {
  labeledSection(skills, 'skills', 'trees');
  skills.trees.forEach((tree, index) => {
    keys(tree, `skills.trees[${index}]`, ['color', 'items', 'name']);
    string(tree.name, `skills.trees[${index}].name`);
    accent(tree.color, `skills.trees[${index}].color`);
    list(tree.items, `skills.trees[${index}].items`);
    tree.items.forEach((item, itemIndex) => string(item, `skills.trees[${index}].items[${itemIndex}]`));
  });
}

function validateTimeline(timeline) {
  labeledSection(timeline, 'timeline', 'entries');
  timeline.entries.forEach((entry, index) => {
    keys(entry, `timeline.entries[${index}]`, ['color', 'focus', 'year']);
    string(entry.year, `timeline.entries[${index}].year`);
    string(entry.focus, `timeline.entries[${index}].focus`);
    accent(entry.color, `timeline.entries[${index}].color`);
  });
}

function validateData(data) {
  keys(data, 'data', ['github', 'profile', 'projects', 'skills', 'timeline']);
  validateProfile(data.profile);
  validateGithub(data.github);
  validateProjects(data.projects);
  validateSkills(data.skills);
  validateTimeline(data.timeline);
  return data;
}

module.exports = { validateData };
