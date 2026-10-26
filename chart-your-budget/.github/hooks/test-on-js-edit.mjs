import { spawnSync } from 'node:child_process';

let raw = '';
for await (const chunk of process.stdin) {
    raw += chunk;
}

let event;
try {
    event = JSON.parse(raw);
} catch {
    process.exit(0);
}

// Edit tools differ in input shape (filePath vs. patch text), so scan the serialized input.
const isEditTool = /edit|replace|patch|create_file|insert/i.test(event.tool_name ?? '');
const touchedPaths = JSON.stringify(event.tool_input ?? {}).match(/[^"\s\\]+\.js\b/g) ?? [];
const touchedJs = touchedPaths.some((path) => !path.includes('node_modules'));

if (!isEditTool || !touchedJs) {
    process.exit(0);
}

const result = spawnSync('npm', ['test'], { encoding: 'utf8', timeout: 55000 });

if (result.status === 0) {
    console.log(JSON.stringify({ systemMessage: 'npm test passed after .js edit.' }));
    process.exit(0);
}

const output = `${result.stdout ?? ''}${result.stderr ?? ''}`.slice(-4000);
console.log(JSON.stringify({
    decision: 'block',
    reason: `npm test failed after a .js edit. Fix the failures:\n${output}`
}));
