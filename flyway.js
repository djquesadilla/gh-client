require('dotenv').config();

const { ConnectionString } = require('connection-string');

const cs = new ConnectionString(process.env.POSTGRES_URL);

console.log('Flyway configuration initialized with the following settings:');
console.log(`Host: ${cs.host}`);
console.log(`Database: ${cs.path && cs.path[0]}`);
console.log(`Schema: ${cs.params && cs.params.schema}`);
console.log(`Schemas: ${cs.params && cs.params.schemas}`);
console.log(`User: ${cs.user}`);

const {
    user: USERNAME,
    password: PASSWORD,
    HOST = cs.host,
    DATABASE = cs.path && cs.path[0],
    SCHEMA = cs.params && cs.params.schema,
    SCHEMAS = cs.params && cs.params.schemas,
} = cs;

module.exports = {
    flywayArgs: {
        url: `jdbc:postgresql://${HOST}/${DATABASE}`,
        schemas: SCHEMAS || SCHEMA,
        defaultSchema: SCHEMA,
        locations: `filesystem:./migrations`,
        user: USERNAME,
        password: PASSWORD,
        table: '__migrations',
        sqlMigrationSuffixes: '.sql',
        validateMigrationNaming: true,
    },
    env: {
        JAVA_ARGS: '-Djava.util.logging.config.file=./conf/logging.properties',
      },
    mavinPlugins: [
    {
        // optional, use to add any plugins (ie. logging)
        groupId: 'org.slf4j',
        artifactId: 'slf4j-api',
        version: '1.7.25',
        // This can be a specifc url to download that may be different then the auto generated url.
        downloadUrl:
        'https://repo1.maven.org/maven2/org/slf4j/slf4j-api/1.7.25/slf4j-api-1.7.25.jar',
    },
    {
        groupId: 'org.slf4j',
        artifactId: 'slf4j-jdk14',
        version: '1.7.25',
    },
    ],
    downloads: {
        storageDirectory: `${__dirname}/tmp`, // optional, the specific directory to store the flyway downloaded files. The directory must be writable by the node app process' user.
        expirationTimeInMs: -1, // optional, -1 will never check for updates, defaults to 1 day.
    },
}