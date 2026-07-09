const fs = require('fs');
const { execSync } = require('child_process');

fs.writeFileSync('test.css', `@import "tailwindcss";\n@custom-variant dark (&:where(.dark, .dark *));\n.test { @apply dark:bg-red-500; }`);
fs.writeFileSync('test2.css', `@import "tailwindcss";\n@variant dark (&:where(.dark, .dark *));\n.test { @apply dark:bg-red-500; }`);

try {
  execSync('npx tailwindcss -i test.css -o out1.css');
  console.log("test1 compiled successfully");
} catch (e) {
  console.log("test1 failed", e.message);
}

try {
  execSync('npx tailwindcss -i test2.css -o out2.css');
  console.log("test2 compiled successfully");
} catch (e) {
  console.log("test2 failed", e.message);
}

if (fs.existsSync('out1.css')) {
  console.log("OUT1:");
  console.log(fs.readFileSync('out1.css', 'utf8').substring(0, 500));
}
if (fs.existsSync('out2.css')) {
  console.log("OUT2:");
  console.log(fs.readFileSync('out2.css', 'utf8').substring(0, 500));
}
