const fs = require('node:fs');
const path = require('node:path');
const theme = require('./theme');
const { svgDocument } = require('./utils/svg');
const header = require('./components/header');
const mission = require('./components/mission');
const radar = require('./components/radar');
const skills = require('./components/skills');
const projects = require('./components/projects');
const footer = require('./components/footer');

const profile = {
  header: {
    title: '渡的小窝',
    greeting: '哈喽，这里是渡的小窝哦',
    directions: 'AI / Frontend / Transformer',
  },
  mission: [
    { name: 'AI', items: ['LLM', 'Agent', 'Transformer'], color: 'blue' },
    { name: 'Engineering', items: ['Frontend', 'Tooling'], color: 'green' },
  ],
  radar: [
    { label: 'Stars', value: 20, color: 'gold' },
    { label: 'Repositories', value: 12, color: 'green' },
    { label: 'Commits', value: 82, color: 'blue' },
    { label: 'Contributions', value: 158, color: 'blue' },
  ],
  skills: [
    { name: 'AI', items: ['Machine Learning', 'Deep Learning', 'Transformer', 'Agent'], color: 'blue' },
    { name: 'Engineering', items: ['Frontend', 'Git', 'System'], color: 'green' },
  ],
  projects: [
    { name: 'my-agent', note: '从零写 LLM Agent 的小实践', color: 'blue' },
    { name: 'transformer-explainer-cn', note: 'Transformer 可视化解释器汉化', color: 'gold' },
    { name: 'grape-robot', note: '机器人视觉与采摘方向练习', color: 'green' },
  ],
};

const sections = [
  ['header', header, profile.header],
  ['mission', mission, profile.mission],
  ['radar', radar, profile.radar],
  ['skills', skills, profile.skills],
  ['projects', projects, profile.projects],
  ['footer', footer, null],
];

let offsetY = 0;
const fragments = sections.map(([name, component, data]) => {
  const fragment = component(theme, data, offsetY);
  offsetY += theme.layout.sections[name];
  return fragment;
});

const svg = svgDocument({
  width: theme.layout.width,
  height: offsetY,
  title: '渡的小窝',
  description: '个人 AI 实验室主页，包含当前方向、GitHub 雷达、知识树和代表项目。',
  children: fragments,
});
const outputPath = path.resolve(__dirname, '..', 'assets', 'profile.svg');

fs.mkdirSync(path.dirname(outputPath), { recursive: true });
fs.writeFileSync(outputPath, svg, 'utf8');
console.log(`已生成 ${path.relative(process.cwd(), outputPath)}`);
