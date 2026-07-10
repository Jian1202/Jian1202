const fs = require('node:fs');
const path = require('node:path');
const YAML = require('yaml');
const { registry } = require('../registry');
const { validateProfileConfig } = require('./schema');

const defaultConfigPath = path.resolve(__dirname, '..', '..', 'profile.yaml');

function configError(configPath, error) {
  const line = error.linePos?.start?.line || error.linePos?.[0]?.line;
  const location = line ? ` 第 ${line} 行` : '';
  return new Error(`无法解析配置文件 ${configPath}${location}：${error.message}`);
}

function loadConfig(configPath = defaultConfigPath) {
  let source;

  try {
    source = fs.readFileSync(configPath, 'utf8');
  } catch (error) {
    if (error.code === 'ENOENT') {
      throw new Error(`配置文件不存在：${configPath}`);
    }
    throw error;
  }

  const document = YAML.parseDocument(source, { prettyErrors: true });
  if (document.errors.length) {
    throw configError(configPath, document.errors[0]);
  }

  return validateProfileConfig(document.toJS(), registry);
}

module.exports = { defaultConfigPath, loadConfig };
