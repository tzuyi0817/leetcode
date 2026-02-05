const fs = require('node:fs');
const { resolve } = require('node:path');

const solutionsPath = resolve(__dirname, '..', 'solutions');
const solutions = fs.readdirSync(solutionsPath);
const vitepressRouteRoot = resolve(__dirname, '..', 'docs', 'solutions');

fs.rmSync(vitepressRouteRoot, { recursive: true, force: true });
fs.mkdirSync(vitepressRouteRoot, { recursive: true });

for (const solution of solutions) {
  const solutionMd = `${solutionsPath}/${solution}/README.md`;
  const [serialNum] = solution.split('.');
  const isExists = fs.existsSync(solutionMd);
  const content = isExists ? fs.readFileSync(solutionMd, 'utf8') : '';

  fs.writeFileSync(`${vitepressRouteRoot}/${serialNum}.md`, content);
}
