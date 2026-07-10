const fs = require('node:fs');
const path = require('node:path');
const theme = require('./theme');
const layout = require('./layout');
const profile = require('./data/profile');
const github = require('./data/github');
const projectsData = require('./data/projects');
const skillsData = require('./data/skills');
const timelineData = require('./data/timeline');
const { validateData } = require('./data/schema');
const { svgDocument } = require('./utils/svg');
const header = require('./components/header');
const mission = require('./components/mission');
const timeline = require('./components/timeline');
const radar = require('./components/radar');
const skills = require('./components/skills');
const projects = require('./components/projects');
const footer = require('./components/footer');

const data = validateData({
  profile,
  github,
  projects: projectsData,
  skills: skillsData,
  timeline: timelineData,
});

const sections = [
  ['header', header, data.profile.header],
  ['mission', mission, data.profile.mission],
  ['timeline', timeline, data.timeline],
  ['radar', radar, data.github],
  ['skills', skills, data.skills],
  ['projects', projects, data.projects],
  ['footer', footer, data.profile.footer],
];

const context = { theme, layout };
const fragments = sections.map(([, component, sectionData]) => component(sectionData, context));

const outputPath = path.resolve(__dirname, '..', 'assets', 'profile.svg');

function generateProfile() {
  const svg = svgDocument({
    width: layout.canvas.width,
    height: layout.totalHeight,
    title: data.profile.documentTitle,
    description: data.profile.documentDescription,
    children: fragments,
  });

  fs.mkdirSync(path.dirname(outputPath), { recursive: true });
  fs.writeFileSync(outputPath, svg, 'utf8');
  return { outputPath, svg };
}

if (require.main === module) {
  const result = generateProfile();
  console.log(`已生成 ${path.relative(process.cwd(), result.outputPath)}`);
}

module.exports = { generateProfile, outputPath };
