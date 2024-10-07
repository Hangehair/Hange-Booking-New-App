const fs = require('fs');
const path = require('path');

// 定义项目结构
const projectStructure = {
  'public': {
    'index.html': '<!DOCTYPE html>\n<html lang="en">\n<head>\n  <meta charset="UTF-8">\n  <meta name="viewport" content="width=device-width, initial-scale=1.0">\n  <title>Document</title>\n</head>\n<body>\n  <h1>Hello World</h1>\n</body>\n</html>',
    'style.css': '/* Add your styles here */',
    'firebase.js': '// Firebase SDK initialization logic here'
  },
  'src': {
    'booking.js': '// Booking system logic here'
  },
  '.gitignore': 'node_modules/\n.env',
  'README.md': '# Project Name\n\nProject description goes here.',
  'package.json': JSON.stringify({
    name: "your-project",
    version: "1.0.0",
    description: "A project generated with a Node.js script",
    main: "index.js",
    scripts: {
      start: "node index.js"
    },
    author: "",
    license: "ISC"
  }, null, 2)  // 让 JSON 格式化输出
};

// 递归创建文件夹和文件
function createStructure(basePath, structure) {
  Object.keys(structure).forEach(key => {
    const fullPath = path.join(basePath, key);

    // 如果是对象，则表示这是一个文件夹
    if (typeof structure[key] === 'object') {
      if (!fs.existsSync(fullPath)) {
        fs.mkdirSync(fullPath, { recursive: true });
        console.log(`Created folder: ${fullPath}`);
      }
      createStructure(fullPath, structure[key]);  // 递归创建子文件夹
    } else {
      // 如果是字符串，则表示这是一个文件，写入内容
      fs.writeFileSync(fullPath, structure[key]);
      console.log(`Created file: ${fullPath}`);
    }
  });
}

// 指定项目根目录
const projectRoot = path.join(__dirname, 'your-project');

// 创建项目根目录
if (!fs.existsSync(projectRoot)) {
  fs.mkdirSync(projectRoot);
  console.log(`Created project root: ${projectRoot}`);
}

// 创建项目结构
createStructure(projectRoot, projectStructure);
