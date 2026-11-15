// Keep static entry pages in sync with the shared application shell, and stamp every script URL with the deploy's
// version (sw.js CACHE): index.html's js/ and data/ script tags get ?v=<CACHE>, and js/app.js's ASSET_V (added to
// the scripts it loads on demand) is set to the same. Run after bumping CACHE in sw.js.
const fs = require('node:fs');
const path = require('node:path');
const root = path.resolve(__dirname, '..');
const cache = /const CACHE = '([^']+)';/.exec(fs.readFileSync(path.join(root, 'sw.js'), 'utf8'))[1];
const V = '?v=' + cache;
const write = (file, text) => { const f = path.join(root, file); if (fs.readFileSync(f, 'utf8') !== text) fs.writeFileSync(f, text); };
const shell = fs.readFileSync(path.join(root, 'index.html'), 'utf8').replace(/<script src="((?:js|data)\/[^"?]+\.js)(?:\?v=[^"]*)?"/g, (_, src) => '<script src="' + src + V + '"');
write('index.html', shell);
write('js/app.js', fs.readFileSync(path.join(root, 'js/app.js'), 'utf8').replace(/^const ASSET_V = '[^']*';$/m, "const ASSET_V = '" + V + "';"));
// recall.html: the Recall page was removed; old links and bookmarks still load the app, which opens Overview.
const pages = ["recall","passages","exams","aamc","flprep","score-report","about","recall-session","passage-session","exam-session","results","exam-results"];
for (const page of pages) write(page + '.html', shell.replace('<title>MCAT Study App</title>', '<title>' + page.replaceAll('-', ' ') + ' | MCAT Study App</title>'));
console.log('Generated ' + pages.length + ' static entry pages; scripts at ' + V + '.');
