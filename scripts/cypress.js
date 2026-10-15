const { spawnSync } = require('child_process');
const fs = require('fs');
const path = require('path');
const os = require('os');

const root = path.join(__dirname, '..');

const isNixOS =
  fs.existsSync('/etc/os-release') &&
  fs.readFileSync('/etc/os-release', 'utf8').includes('NixOS');

const args = process.argv.slice(2);
const user = os.userInfo();

if (isNixOS) {
  const dockerArgs = [
    'run', '--rm',
    '--network', 'host',
    '-u', `${user.uid}:${user.gid}`,
    '-e', 'CYPRESS_CACHE_FOLDER=/tmp/Cypress',
    '-v', `${root}:/app`,
    '-v', path.join(os.homedir(), '.cache', 'Cypress') + ':/tmp/Cypress',
    '-w', '/app',
    'cypress/included:15.21.1',
    ...(args.includes('verify') ? ['version'] : args),
  ];

  const result = spawnSync('docker', dockerArgs, { stdio: 'inherit', cwd: root });
  if (result.error) {
    console.error(result.error.message);
    process.exit(1);
  }
  process.exit(result.status ?? 1);
}

const result = spawnSync('cypress', args, { stdio: 'inherit', cwd: root });
if (result.error) {
  console.error(result.error.message);
  process.exit(1);
}
process.exit(result.status ?? 1);
