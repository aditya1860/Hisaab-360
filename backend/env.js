import fs from 'fs';
import path from 'path';

// Native env loader for Node >= 20.6
if (typeof process.loadEnvFile === 'function') {
  const candidates = [
    path.resolve(process.cwd(), '.env'),
    path.resolve(process.cwd(), 'backend', '.env')
  ];
  for (const file of candidates) {
    if (fs.existsSync(file)) {
      try {
        process.loadEnvFile(file);
        break;
      } catch (err) {
        // Continue if parse error or missing
      }
    }
  }
}
