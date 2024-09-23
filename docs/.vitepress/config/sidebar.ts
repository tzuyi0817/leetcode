import fs from 'fs';
import type { DefaultTheme } from 'vitepress';
import { solutionsPath } from './index';

export function generateSidebar(): DefaultTheme.Sidebar {
  const files = fs.readdirSync(solutionsPath);

  const aliasFiles = files.map(file => {
    const [serialNum] = file.split('.');

    return {
      serialNum,
      link: `/solutions/${file}/README`,
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

// export const sidebar = generateSidebar();
