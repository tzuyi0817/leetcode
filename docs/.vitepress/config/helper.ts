import { execSync } from 'node:child_process';
import { readdirSync, statSync } from 'node:fs';
import { resolve } from 'node:path';

const repoRoot = resolve(__dirname, '..', '..', '..');
const gitLastModMap = buildGitLastModMap();

export const hostname = 'https://tzuyi0817.github.io/leetcode/';
export const solutionsPath = resolve(__dirname, '..', '..', '..', 'solutions');

/** 序號 → solutions 目錄名稱（例：`992` → `992. Subarrays with K Different Integers`）。 */
const serialToDir = new Map<string, string>();

for (const dir of readdirSync(solutionsPath)) {
  const [serial] = dir.split('.');

  serialToDir.set(serial, dir);
}

/** 一次性執行 `git log` 建立物件，鍵為 repo 相對路徑、值為 ISO 格式時間字串 */
function buildGitLastModMap() {
  const map = new Map<string, string>();

  try {
    // 加 `-c core.quotepath=false` 讓非 ASCII 路徑（如目錄名含 `×`）以 UTF-8 原樣輸出而非八進位轉義
    const output = execSync('git -c core.quotepath=false log --name-only --pretty=format:%n%aI -- solutions/', {
      cwd: repoRoot,
      encoding: 'utf8',
      maxBuffer: 256 * 1024 * 1024,
    });
    let currentDate: string | null = null;

    for (const rawLine of output.split('\n')) {
      const line = rawLine.trim();

      if (!line) continue;

      if (/^\d{4}-\d{2}-\d{2}T/.test(line)) {
        currentDate = line;
        continue;
      }

      if (currentDate && line.startsWith('solutions/') && !map.has(line)) {
        map.set(line, currentDate);
      }
    }
  } catch {
    console.warn('Build the git lastmod failed');
  }

  return map;
}

/** 從輸入字串擷取題號` */
export function extractSolutionSerial(input: string) {
  const match = input.match(/(?:^|\/)solutions\/(\d+)(?:\.md)?\/?$/);

  return match?.[1];
}

/** 取得題目對應 `solutions/<dir>/README.md` 的最後變更時間 */
export function getSolutionLastModISO(serial: string) {
  const dir = serialToDir.get(serial);

  if (!dir) return;

  const relativeFile = `solutions/${dir}/README.md`;
  const fromGit = gitLastModMap.get(relativeFile);

  if (fromGit) return fromGit;

  try {
    return statSync(resolve(repoRoot, relativeFile)).mtime.toISOString();
  } catch {
    return;
  }
}
