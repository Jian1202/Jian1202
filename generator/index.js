const fs = require('node:fs');
const path = require('node:path');
const { loadConfig } = require('./config/load-config');
const layout = require('./layout');
const { getBlock } = require('./registry');
const { getTheme } = require('./theme');
const { svgDocument } = require('./utils/svg');

const outputPath = path.resolve(__dirname, '..', 'assets', 'profile.svg');

function measureSection(section, context) {
  const block = getBlock(section);
  const size = block.measure(section, context);

  if (!size || !Number.isFinite(size.height) || size.height <= 0) {
    throw new Error(`区块 ${section.id} 返回了非法高度。`);
  }

  return { block, size };
}

function buildProfile(config) {
  const theme = getTheme(config.theme.preset);
  const enabledSections = config.sections.filter((section) => section.enabled);
  let offsetY = layout.pageTop;
  const fragments = [];

  for (const section of enabledSections) {
    const baseContext = { theme, layout, offsetY };
    const { block, size } = measureSection(section, baseContext);
    fragments.push(block.render(section, { ...baseContext, height: size.height }));
    offsetY += size.height + layout.sectionGap;
  }

  const totalHeight = offsetY - layout.sectionGap;
  return {
    enabledSections,
    totalHeight,
    svg: svgDocument({
      width: layout.canvas.width,
      height: totalHeight,
      title: config.page.title,
      description: config.page.description,
      children: fragments,
    }),
  };
}

function generateProfile({ configPath } = {}) {
  const config = loadConfig(configPath);
  const result = buildProfile(config);

  fs.mkdirSync(path.dirname(outputPath), { recursive: true });
  fs.writeFileSync(outputPath, result.svg, 'utf8');
  return { ...result, config, outputPath };
}

if (require.main === module) {
  const result = generateProfile({ configPath: process.argv[2] });
  console.log(`已生成 ${path.relative(process.cwd(), result.outputPath)}`);
}

module.exports = { buildProfile, generateProfile, outputPath };
