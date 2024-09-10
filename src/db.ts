import pgPromise from 'pg-promise';

// TODO: change all to process.env
const pgp = pgPromise();

const connection = {
  host: 'localhost',
  port: 5432,
  database: 'lovelystay-github',
  user: 'postgres',
  password: 'postgres',
};

const db = pgp(connection);

export default db;
