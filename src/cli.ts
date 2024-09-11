import yargs from 'yargs';
import { hideBin } from 'yargs/helpers';
import { fetchUser } from './github';
import { listUsers, saveUserAndLanguages, filterUsers } from './db';

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
        console.log(user);
        return saveUserAndLanguages(user);
      }).catch(error => {
        console.error('Error fetching user info:', error);
      });
    })
    .command('list', 'List all stored users', {}, () => {
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
      filterUsers(argv.location as string, argv.language as string).then(users => {
        users.forEach(user => {
          console.log(user);
        });
      }).catch(error => {
        console.error('Error filtering users:', error);
      });
    })
    .demandCommand(1)
    .help()
    .argv;
}