const fs = require('node:fs');
const path = require('node:path');
const theme = require('./theme');
const profile = require('./data/profile');
const github = require('./data/github');
const projectsData = require('./data/projects');
const skillsData = require('./data/skills');
const timelineData = require('./data/timeline');
const { svgDocument } = require('./utils/svg');
const header = require('./components/header');
const mission = require('./components/mission');
const timeline = require('./components/timeline');
const radar = require('./components/radar');
const skills = require('./components/skills');
const projects = require('./components/projects');
const footer = require('./components/footer');

const sections = [
  ['header', header, profile.header],
  ['mission', mission, profile.mission],
  ['timeline', timeline, timelineData],
  ['radar', radar, github],
  ['skills', skills, skillsData],
  ['projects', projects, projectsData],
  ['footer', footer, profile.footer],
];

let offsetY = 0;
const fragments = sections.map(([name, component, data]) => {
  const fragment = component(data, theme, offsetY);
  offsetY += theme.layout.sections[name];
  return fragment;
});

const svg = svgDocument({
  width: theme.layout.width,
  height: offsetY,
  title: profile.documentTitle,
  description: profile.documentDescription,
  children: fragments,
});
const outputPath = path.resolve(__dirname, '..', 'assets', 'profile.svg');

fs.mkdirSync(path.dirname(outputPath), { recursive: true });
fs.writeFileSync(outputPath, svg, 'utf8');
console.log(`已生成 ${path.relative(process.cwd(), outputPath)}`);
