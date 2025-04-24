import fs from 'node:fs';
import { solutionsPath } from './index';
import type { DefaultTheme } from 'vitepress';

export function generateSidebar(): DefaultTheme.Sidebar {
  const files = fs.readdirSync(solutionsPath);

  const aliasFiles = files.map(file => {
    const [serialNum] = file.split('.');

    return {
      serialNum,
      link: `/solutions/${file}`,
      text: file,
    };
  });

  aliasFiles.sort((a, b) => Number(a.serialNum) - Number(b.serialNum));

  return [
    {
      text: 'Solutions',
      items: aliasFiles,
    },
  ];
}
