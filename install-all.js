const { execSync } = require('child_process');
const path = require('path');

// 定义子项目的相对路径
const subProjects = [
  'main',
  'app1',
  'app2',
];

// 遍历子项目并执行 pnpm install
subProjects.forEach((subProject) => {
  const subProjectPath = path.join(__dirname, subProject);
  try {
    console.log(`正在为 ${subProject} 执行 pnpm install...`);
    execSync('pnpm install', { cwd: subProjectPath, stdio: 'inherit' });
    console.log(`${subProject} 的 pnpm install 执行完成。`);
  } catch (error) {
    console.error(`在 ${subProject} 执行 pnpm install 时出错:`, error.message);
  }
});