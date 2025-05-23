import { readdirSync } from 'node:fs';
import type { DefaultTheme } from 'vitepress';

export function generateSidebar(solutionsPath: string): DefaultTheme.Sidebar {
  const files = readdirSync(solutionsPath);

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
