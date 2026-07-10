const assert = require('node:assert/strict');
const fs = require('node:fs');
const os = require('node:os');
const path = require('node:path');
const test = require('node:test');
const { buildProfile } = require('../index');
const { defaultConfigPath, loadConfig } = require('../config/load-config');
const { validateProfileConfig } = require('../config/schema');
const layout = require('../layout');
const { getBlock, registry } = require('../registry');

function cloneConfig() {
  return structuredClone(loadConfig(defaultConfigPath));
}

test('默认 profile.yaml 可解析并注册全部区块', () => {
  const config = cloneConfig();

  assert.equal(config.sections.length, 7);
  assert.equal(getBlock(config.sections[0]), registry.header);
  assert.equal(getBlock(config.sections[2]), registry.timeline);
});

test('enabled 过滤会缩短画布高度', () => {
  const config = cloneConfig();
  const base = buildProfile(config);
  config.sections.find((section) => section.id === 'timeline').enabled = false;
  validateProfileConfig(config, registry);
  const withoutTimeline = buildProfile(config);

  assert.equal(withoutTimeline.enabledSections.some((section) => section.id === 'timeline'), false);
  assert.equal(withoutTimeline.totalHeight, base.totalHeight - layout.blockHeights.timeline);
});

test('section 顺序决定 SVG 片段顺序', () => {
  const config = cloneConfig();
  const timelineIndex = config.sections.findIndex((section) => section.id === 'timeline');
  const radarIndex = config.sections.findIndex((section) => section.id === 'radar');
  [config.sections[timelineIndex], config.sections[radarIndex]] = [config.sections[radarIndex], config.sections[timelineIndex]];
  validateProfileConfig(config, registry);
  const result = buildProfile(config);

  assert.ok(result.svg.indexOf('id="radar"') < result.svg.indexOf('id="timeline"'));
});

test('Timeline 条目增加时自动增加高度', () => {
  const config = cloneConfig();
  const base = buildProfile(config);
  const timeline = config.sections.find((section) => section.id === 'timeline');
  timeline.data.entries.push({ year: 'Next', focus: 'Applied AI', color: 'green' });
  validateProfileConfig(config, registry);
  const expanded = buildProfile(config);

  assert.equal(expanded.totalHeight, base.totalHeight + 30);
  assert.match(expanded.svg, /Applied AI/);
});

test('未知 type、未知 variant 与重复 id 都会被拒绝', () => {
  const unknownType = cloneConfig();
  unknownType.sections[0].type = 'unknown';
  assert.throws(() => validateProfileConfig(unknownType, registry), /unknown/);

  const unknownVariant = cloneConfig();
  unknownVariant.sections[0].variant = 'compact';
  assert.throws(() => validateProfileConfig(unknownVariant, registry), /variant/);

  const duplicateId = cloneConfig();
  duplicateId.sections[1].id = duplicateId.sections[0].id;
  assert.throws(() => validateProfileConfig(duplicateId, registry), /duplicated/);
});

test('非法 YAML 会包含配置文件错误', () => {
  const directory = fs.mkdtempSync(path.join(os.tmpdir(), 'profile-config-'));
  const configPath = path.join(directory, 'profile.yaml');
  fs.writeFileSync(configPath, 'page: [', 'utf8');

  try {
    assert.throws(() => loadConfig(configPath), /无法解析配置文件/);
  } finally {
    fs.rmSync(directory, { recursive: true, force: true });
  }
});
