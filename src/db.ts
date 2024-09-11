import pgPromise from 'pg-promise';
import { User, UserWithLanguages } from './types';
import { ConnectionString } from 'connection-string';
import dotenv from 'dotenv';

dotenv.config();

// TODO: change all to process.env
const pgp = pgPromise();


const cs = new ConnectionString(process.env.POSTGRES_URL);

const db = pgp(process.env.POSTGRES_URL || cs);

export async function saveUser(user: User) {
  // saves a user to the database
  try {
    await db.none('INSERT INTO users(login, name, location) VALUES($1, $2, $3)', [user.login, user.name, user.location]);
  } catch (error) {
    throw error;
  }
}

export async function saveLanguage(language: string) {
  // saves a language to the database
  try {
    await db.none('INSERT INTO languages(name) VALUES($1)', language);
  } catch (error) {
    throw error;
  }
}

export async function saveUserAndLanguages(user: UserWithLanguages) {
  // saves a user and their languages to the database
  // if user already exists, update their languages
  try {
    await db.tx(async t => {
      const userExists = await t.oneOrNone('SELECT id FROM users WHERE login = $1', user.login);
      if (!userExists) {
        await saveUser({ login: user.login, name: user.name, location: user.location });
      }

      for (const language of user.languages) {
        const languageExists = await t.oneOrNone('SELECT id FROM languages WHERE name = $1', language);
        if (!languageExists) {
          await saveLanguage(language);
        }
      }

      for (const language of user.languages) {
        const userLanguageExists = await t.oneOrNone(`
          SELECT 1 FROM users_languages
          WHERE user_id = (SELECT id FROM users WHERE login = $1)
          AND language_id = (SELECT id FROM languages WHERE name = $2)
        `, [user.login, language]);
        
        if (!userLanguageExists) {
          await t.none(`
            INSERT INTO users_languages(user_id, language_id)
            VALUES(
              (SELECT id FROM users WHERE login = $1),
              (SELECT id FROM languages WHERE name = $2)
            )`, [user.login, language]
          );
        }
      }
    })
  } catch (error) {
    throw error;
  }
}

export async function listUsers(): Promise<UserWithLanguages[]> {
  try {
    return await db.any(`
      SELECT u.*, array_agg(l.name) as languages
      FROM users u
      LEFT JOIN users_languages ul ON u.id = ul.user_id
      LEFT JOIN languages l ON ul.language_id = l.id
      GROUP BY u.id;
    `);
  } catch (error) {
    throw error;
  }
}

export async function filterUsers(location?: string, language?: string): Promise<UserWithLanguages[]> {
  try {
    return await db.any(`
      SELECT u.*, array_agg(l.name) as languages
      FROM users u
      LEFT JOIN users_languages ul ON u.id = ul.user_id
      LEFT JOIN languages l ON ul.language_id = l.id
      WHERE ($1::text IS NULL OR u.location = $1)
      AND ($2::text IS NULL OR l.name = $2)
      GROUP BY u.id;
    `, [location, language]);
  } catch (error) {
    throw error;
  }
}

export default db;
