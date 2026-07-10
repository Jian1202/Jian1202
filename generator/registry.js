const header = require('./components/header');
const mission = require('./components/mission');
const timeline = require('./components/timeline');
const radar = require('./components/radar');
const skills = require('./components/skills');
const projects = require('./components/projects');
const footer = require('./components/footer');
const validators = require('./config/block-schema');

function createBlock(variants, validate) {
  return {
    variants,
    validate(section, path) {
      validate(section.data, `${path}.data`);
    },
    measure(section, context) {
      return variants[section.variant].measure(section, context);
    },
    render(section, context) {
      return variants[section.variant].render(section, context);
    },
  };
}

const registry = {
  header: createBlock({ default: header }, validators.header),
  mission: createBlock({ cards: mission }, validators.mission),
  timeline: createBlock({ horizontal: timeline }, validators.timeline),
  radar: createBlock({ default: radar }, validators.radar),
  skills: createBlock({ tree: skills }, validators.skills),
  projects: createBlock({ drawer: projects }, validators.projects),
  footer: createBlock({ default: footer }, validators.footer),
};

function getBlock(section) {
  const block = registry[section.type];

  if (!block) {
    throw new Error(`未知区块 type：${section.type}`);
  }

  if (!block.variants[section.variant]) {
    throw new Error(`区块 ${section.id} 不支持 variant：${section.variant}`);
  }

  return block;
}

module.exports = { getBlock, registry };
