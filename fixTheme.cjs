const fs = require('fs');
const path = require('path');

const directoryPath = path.join(__dirname, 'src');

const replacements = [
  { regex: /\bbg-blue-50\b(?!\/| dark:)/g, replacement: 'bg-blue-50 dark:bg-blue-900/30' },
  { regex: /\bbg-red-50\b(?!\/| dark:)/g, replacement: 'bg-red-50 dark:bg-red-900/30' },
  { regex: /\bbg-orange-50\b(?!\/| dark:)/g, replacement: 'bg-orange-50 dark:bg-orange-900/30' },
  { regex: /\bbg-green-50\b(?!\/| dark:)/g, replacement: 'bg-green-50 dark:bg-green-900/30' },
  { regex: /\bbg-emerald-50\b(?!\/| dark:)/g, replacement: 'bg-emerald-50 dark:bg-emerald-900/30' },
  { regex: /\bbg-purple-50\b(?!\/| dark:)/g, replacement: 'bg-purple-50 dark:bg-purple-900/30' },
  
  { regex: /\bbg-blue-100\b(?!\/| dark:)/g, replacement: 'bg-blue-100 dark:bg-blue-900/50' },
  { regex: /\bbg-red-100\b(?!\/| dark:)/g, replacement: 'bg-red-100 dark:bg-red-900/50' },
  { regex: /\bbg-orange-100\b(?!\/| dark:)/g, replacement: 'bg-orange-100 dark:bg-orange-900/50' },
  
  { regex: /\bborder-red-100\b(?!\/| dark:)/g, replacement: 'border-red-100 dark:border-red-900/50' },
  { regex: /\bborder-blue-100\b(?!\/| dark:)/g, replacement: 'border-blue-100 dark:border-blue-900/50' },
  { regex: /\bborder-orange-100\b(?!\/| dark:)/g, replacement: 'border-orange-100 dark:border-orange-900/50' },
  { regex: /\bborder-emerald-100\b(?!\/| dark:)/g, replacement: 'border-emerald-100 dark:border-emerald-900/50' },
];

function processDirectory(dir) {
  const files = fs.readdirSync(dir);

  for (const file of files) {
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);

    if (stat.isDirectory()) {
      processDirectory(fullPath);
    } else if (fullPath.endsWith('.jsx') || fullPath.endsWith('.js')) {
      if (file === 'ThemeToggle.jsx') continue;
      
      let content = fs.readFileSync(fullPath, 'utf8');
      let original = content;

      for (const { regex, replacement } of replacements) {
        content = content.replace(regex, replacement);
      }

      if (content !== original) {
        fs.writeFileSync(fullPath, content, 'utf8');
        console.log(`Updated accent colors: ${fullPath}`);
      }
    }
  }
}

processDirectory(directoryPath);
console.log("Done updating accent colors!");
