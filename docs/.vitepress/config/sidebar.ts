import { readdirSync } from 'node:fs';
import { solutionsPath } from './helper';
import type { DefaultTheme } from 'vitepress';

export function generateSidebar(): DefaultTheme.Sidebar {
  const files = readdirSync(solutionsPath);

  const aliasFiles = files.map(file => {
    const [serialNum] = file.split('.');

    return {
      serialNum,
      link: `/solutions/${serialNum}`,
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
