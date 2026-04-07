const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

const SCRIPTS_DIR = __dirname;
const RESULTS_FILE = path.join(__dirname, '../BENCHMARKS.md');

const scripts = [
    { name: 'Bloat Engine (Mock Run)', cmd: 'node scripts/bloat-engine.js --dry-run' },
    { name: 'Design Pattern Scaffolder', cmd: 'node scripts/generate-design-patterns.js' },
    { name: 'SOLID Principle Implementer', cmd: 'node scripts/generate-solid-garbage.js' },
    { name: 'SCC Aggregator', cmd: 'node scripts/scc-aggregator.js' }
];

console.log("⏱️  Running Enterprise Performance Benchmarks...");

let markdown = `# Enterprise Performance Benchmarks ⏱️\n\n`;
markdown += `The following metrics represent the operational efficiency of our synergistic build pipeline.\n\n`;
markdown += `| Component | Execution Time (ms) | Status |\n`;
markdown += `| :--- | :--- | :--- |\n`;

scripts.forEach(script => {
    const start = Date.now();
    try {
        // We actually run them since they are safe to repeat
        execSync(script.cmd, { cwd: path.join(__dirname, '..'), stdio: 'ignore' });
        const end = Date.now();
        markdown += `| ${script.name} | ${end - start}ms | ✅ OPTIMIZED |\n`;
        console.log(`Finished ${script.name} in ${end - start}ms`);
    } catch (e) {
        markdown += `| ${script.name} | N/A | ❌ SYNERGY BREAKDOWN |\n`;
    }
});

markdown += `\n*Note: Benchmarks were performed on a machine with 16GB RAM and a 10x developer mindset.*\n`;

fs.writeFileSync(RESULTS_FILE, markdown);
console.log("✅ Benchmarks complete! Results written to BENCHMARKS.md");
