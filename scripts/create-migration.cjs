const fs = require('fs');
const path = require('path');

const migrationName = process.argv[2];

if (!migrationName) {
  console.error('Please provide a migration name');
  process.exit(1);
}

const timestamp = new Date().toISOString().replace(/[-T:]|\.\d{3}Z/g, '');
const fileName = `V${timestamp}__${migrationName}.sql`;

const migrationPath = path.join(__dirname, '..', 'migrations', fileName);

fs.writeFileSync(migrationPath, '-- Write your migration SQL here\n');

console.log(`Created migration file: ${fileName}`);