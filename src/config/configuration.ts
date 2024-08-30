// This is just going to be a function initializing variables with a name.
export default () => ({
  app: {
    port: Number(process.env.PORT) || 3000,
    host:
      process.env.HOST && process.env.HOST !== ""
        ? process.env.HOST.split(",")
        : [],
    environment: process.env.ENVIRONMENT,
  },
  mysql: {
    host: process.env.MySQL_HOST,
    port: Number(process.env.MySQL_PORT) || 3306,
    user: process.env.MySQL_USER,
    password: process.env.MySQL_PASSWORD,
    database: process.env.MySQL_DATABASE,
  },
});
