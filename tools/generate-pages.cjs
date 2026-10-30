// Keep static entry pages in sync with the shared application shell.
const fs = require('node:fs');
const path = require('node:path');
const root = path.resolve(__dirname, '..');
const shell = fs.readFileSync(path.join(root, 'index.html'), 'utf8');
const pages = ["recall","passages","exams","score-report","about","recall-session","passage-session","exam-session","results","exam-results"];
for (const page of pages) fs.writeFileSync(path.join(root, page + '.html'), shell.replace('<title>MCAT Study App</title>', '<title>' + page.replaceAll('-', ' ') + ' | MCAT Study App</title>'));
console.log('Generated ' + pages.length + ' static entry pages.');
