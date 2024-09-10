import yargs from 'yargs';
import { hideBin } from 'yargs/helpers';
import { fetchUser } from './github';
import { listUsers, saveUser } from './db';

export async function cli() {
  return yargs(hideBin(process.argv))
    .command('fetch <username>', 'Fetch GitHub user information', (yargs) => {
      return yargs.positional('username', {
        describe: 'GitHub username to fetch',
        type: 'string',
      });
    }, (argv) => {
      console.log(`Fetching info for user: ${argv.username}`);
      fetchUser(argv.username as string).then(user => {
        return saveUser(user);
      }).catch(error => {
        console.error('Error fetching user info:', error);
      });
    })
    .command('list', 'List all stored users', {}, () => {
      // TODO: Implement this
      console.log('Listing all users stored in the database');
      listUsers().then(users => {
        users.forEach(user => {
          console.log(user);
        });
      }).catch(error => {
        console.error('Error listing users:', error);
      });
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
      // TODO: Implement this
      console.log(`Filtering users:`);
      if (argv.location) console.log(`Location: ${argv.location}`);
      if (argv.language) console.log(`Language: ${argv.language}`);
    })
    .demandCommand(1)
    .help()
    .argv;
}