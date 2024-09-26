const fs = require('fs');
const { resolve } = require('node:path');

const solutionsPath = resolve(__dirname, '..', 'solutions');
const solutions = fs.readdirSync(solutionsPath);
const vitepressRouteRoot = resolve(__dirname, '..', 'docs', 'solutions');

if (!fs.existsSync(vitepressRouteRoot)) {
  fs.mkdirSync(vitepressRouteRoot);
}

for (const solution of solutions) {
  const solutionMd = `${solutionsPath}/${solution}/README.md`;
  const isExists = fs.existsSync(solutionMd);
  const content = isExists ? fs.readFileSync(solutionMd, 'utf-8') : '';

  fs.writeFileSync(`${vitepressRouteRoot}/${solution}.md`, content);
}
