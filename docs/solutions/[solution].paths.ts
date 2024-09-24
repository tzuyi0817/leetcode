import fs from 'fs';
import { solutionsPath } from '../.vitepress/config';

export default {
  paths() {
    return fs.readdirSync(solutionsPath).map(solution => {
      const solutionMd = `${solutionsPath}/${solution}/README.md`;
      const isExists = fs.existsSync(solutionMd);
      const content = isExists ? fs.readFileSync(solutionMd, 'utf-8') : '';

      return { params: { solution }, content };
    });
  },
};
