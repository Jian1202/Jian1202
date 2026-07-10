const fs = require('node:fs');
const path = require('node:path');
const theme = require('./theme');
const { getProfileData } = require('./data');
const header = require('./components/header');
const radar = require('./components/radar');
const timeline = require('./components/timeline');
const skills = require('./components/skills');
const footer = require('./components/footer');

const { width, headerHeight, radarHeight, timelineHeight, skillsHeight, footerHeight } = theme.layout;
const outputPath = path.resolve(__dirname, '..', 'assets', 'profile.svg');
const cleanFragment = (fragment) => fragment.split('\n').map((line) => line.trimEnd()).join('\n');
const indentFragment = (fragment) => cleanFragment(fragment).trim().split('\n').map((line) => (line ? `  ${line}` : '')).join('\n');
const timelineOffset = headerHeight + radarHeight;
const skillsOffset = timelineOffset + timelineHeight;
const footerOffset = skillsOffset + skillsHeight;
const totalHeight = footerOffset + footerHeight;

async function main() {
  const data = await getProfileData();
  const svg = [
  '<?xml version="1.0" encoding="UTF-8"?>',
  `<svg width="${width}" height="${totalHeight}" viewBox="0 0 ${width} ${totalHeight}" fill="none" xmlns="http://www.w3.org/2000/svg" role="img" aria-labelledby="title desc">`,
  '  <title id="title">渡的小窝</title>',
  '  <desc id="desc">哈喽，这里是渡的小窝哦。这里有正在做的方向、GitHub 数据雷达和技术地图。</desc>',
  indentFragment(header(theme)),
  indentFragment(radar(theme, data.radar, headerHeight)),
  indentFragment(timeline(theme, data.now, timelineOffset)),
  indentFragment(skills(theme, data.skills, skillsOffset)),
  indentFragment(footer(theme, footerOffset)),
  '</svg>',
  '',
  ].join('\n');

  fs.mkdirSync(path.dirname(outputPath), { recursive: true });
  fs.writeFileSync(outputPath, svg, 'utf8');
  console.log(`已生成 ${path.relative(process.cwd(), outputPath)}`);
}

main().catch((error) => {
  console.error(error.message);
  process.exitCode = 1;
});
