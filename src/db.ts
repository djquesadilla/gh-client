import pgPromise from 'pg-promise';
import { User } from './types';
import { ConnectionString } from 'connection-string';
import dotenv from 'dotenv';

dotenv.config();

// TODO: change all to process.env
const pgp = pgPromise();


const cs = new ConnectionString(process.env.POSTGRES_URL);

const db = pgp(process.env.POSTGRES_URL || cs);

export async function saveUser(user: User) {
  try {
    await db.none('INSERT INTO users(login, name, location) VALUES($1, $2, $3)', [user.login, user.name, user.location]);
    console.log('User saved to database');
  } catch (error) {
    throw error;
  }
}

export async function listUsers(): Promise<User[]> {
  try {
    return await db.any('SELECT * FROM users');
  } catch (error) {
    throw error;
  }
}

export default db;
