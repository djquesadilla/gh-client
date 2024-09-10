import yargs from 'yargs';
import { hideBin } from 'yargs/helpers';

export function cli() {
  return yargs(hideBin(process.argv))
    .command('fetch <username>', 'Fetch GitHub user information', (yargs) => {
      return yargs.positional('username', {
        describe: 'GitHub username to fetch',
        type: 'string',
      });
    }, (argv) => {
      console.log(`Fetching info for user: ${argv.username}`);
    })
    .command('list', 'List all stored users', {}, () => {
      console.log('Listing all users stored in the database');
    })
    .command('filter', 'Filter users by location', (yargs) => {
      return yargs
        .option('location', {
          describe: 'Filter by location',
          type: 'string',
        })
        .option('language', {
          describe: 'Filter by programming language',
          type: 'string',
        });
    }, (argv) => {
      console.log(`Filtering users:`);
      if (argv.location) console.log(`Location: ${argv.location}`);
      if (argv.language) console.log(`Language: ${argv.language}`);
    })
    .demandCommand(1)
    .help()
    .argv;
}