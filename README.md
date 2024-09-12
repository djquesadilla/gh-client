# gh-client

A command-line application to fetch and list users from Github

## Project Setup

### Requirements

- NodeJS
- Typescript
- PostgreSQL
- Flyway (for database migrations)

There's a `docker-compose.yml` file that can be used to setup a PostgreSQL database for development purposes.

### Environment Variables

Create a `.env` file in the root of the project with the following variables:

```env
POSTGRES_URL=
GITHUB_TOKEN=
```

## Usage

### Install Dependencies

```bash
npm install
```

### Run Migrations

```bash
npm run migrate
```

### Run the Application

**NOTE**: The build and start scripts are broken and because of lack of time I didn't implement it. To run the application, you need to run the following commands:

```bash
npm run dev -- fetch <username>
npm run dev -- list
npm run dev -- filter --location <location> --language <language>
```

## Implementation Details

### Database

The database schema is a very simple one with 3 tables:
- `users`: stores the users fetched from Github
- `languages`: stores the languages used by the users
- `users_languages`: a many-to-many relationship between users and languages

### Folder Structure

- `infrasctructure`: contains the docker-compose file
- `migrations`: contains the database migrations
- `scripts`: contains relevant scripts to run the application. In this case we only have one to create database migrations
- `src`: contains the source code
  - `index.ts`: entry point of the application
  - `cli.ts`: contains the CLI logic to parse the arguments and run the commands
  - `db.ts`: contains the database connection and queries logic
  - `github.ts`: contains the logic to fetch users from Github
  - `types.ts`: contains the types used in the application


## Future Improvements

- Fix the build and start scripts
- Add more tests
- Add linting and formatting on pre-commit hooks
