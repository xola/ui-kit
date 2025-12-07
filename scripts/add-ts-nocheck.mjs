#!/usr/bin/env node
import fs from 'fs';
import { glob } from 'glob';

const storyFiles = await glob('src/stories/**/*.stories.tsx');

for (const file of storyFiles) {
    const content = fs.readFileSync(file, 'utf8');

    // Only add if not already present
    if (!content.startsWith('// @ts-nocheck')) {
        fs.writeFileSync(file, `// @ts-nocheck\n${content}`, 'utf8');
    }
}

console.log(`Added @ts-nocheck to ${storyFiles.length} files`);
