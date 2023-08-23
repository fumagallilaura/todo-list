import packageJson from 'package.json';
const { env, cwd } = process;

export default {
  api: {
    name: packageJson.name,
    path: cwd(),
    port: Number(env.API_PORT || env.PORT || 3001)
  },
  db: {
    username: env.DB_USER || 'root',
    password: env.DB_PASS || 'root',
    database: env.DB_NAME || 'todos',
    host: env.DB_HOST || 'localhost',
    port: Number(env.DB_PORT || 3306),
    dialect: env.DB_DIALECT || 'mysql',
    dialectOptions: env.DB_OPTIONS ? JSON.parse(env.DB_OPTIONS) : {},
  },
};

