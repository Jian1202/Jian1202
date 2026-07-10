const fs = require('node:fs');
const path = require('node:path');
const theme = require('./theme');
const data = require('./data');
const header = require('./components/header');
const radar = require('./components/radar');

const { width, headerHeight, radarHeight } = theme.layout;
const outputPath = path.resolve(__dirname, '..', 'assets', 'profile.svg');
const cleanFragment = (fragment) => fragment.split('\n').map((line) => line.trimEnd()).join('\n');
const indentFragment = (fragment) => cleanFragment(fragment).trim().split('\n').map((line) => (line ? `  ${line}` : '')).join('\n');

const svg = [
  '<?xml version="1.0" encoding="UTF-8"?>',
  `<svg width="${width}" height="${headerHeight + radarHeight}" viewBox="0 0 ${width} ${headerHeight + radarHeight}" fill="none" xmlns="http://www.w3.org/2000/svg" role="img" aria-labelledby="title desc">`,
  '  <title id="title">渡的小窝</title>',
  '  <desc id="desc">哈喽，这里是渡的小窝哦。包含 AI、Agent、前端和笔记方向，以及 GitHub 数据雷达。</desc>',
  indentFragment(header(theme)),
  indentFragment(radar(theme, data.radar, headerHeight)),
  '</svg>',
  '',
].join('\n');

fs.mkdirSync(path.dirname(outputPath), { recursive: true });
fs.writeFileSync(outputPath, svg, 'utf8');
console.log(`已生成 ${path.relative(process.cwd(), outputPath)}`);
