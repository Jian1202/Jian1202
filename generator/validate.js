const { buildProfile } = require('./index');
const { loadConfig } = require('./config/load-config');

const config = loadConfig(process.argv[2]);
const result = buildProfile(config);

console.log(`配置有效：${result.enabledSections.length} 个区块，画布高度 ${result.totalHeight}`);
