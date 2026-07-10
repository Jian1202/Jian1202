const fs = require('node:fs');
const path = require('node:path');
const theme = require('./theme');
const header = require('./components/header');

const { width, headerHeight } = theme.layout;
const outputPath = path.resolve(__dirname, '..', 'assets', 'profile.svg');

const svg = `<?xml version="1.0" encoding="UTF-8"?>
<svg width="${width}" height="${headerHeight}" viewBox="0 0 ${width} ${headerHeight}" fill="none" xmlns="http://www.w3.org/2000/svg" role="img" aria-labelledby="title desc">
  <title id="title">渡的小窝</title>
  <desc id="desc">哈喽，这里是渡的小窝哦。方向包括 AI、Agent、前端和笔记。</desc>
  ${header(theme)}
</svg>
`;

fs.mkdirSync(path.dirname(outputPath), { recursive: true });
fs.writeFileSync(outputPath, svg, 'utf8');
console.log(`已生成 ${path.relative(process.cwd(), outputPath)}`);
