import vars from '$/vars'
import { Options, Sequelize } from 'sequelize'
import makeTodosDAO from './daos/todos.dao'

const sequelize = new Sequelize({
  username: vars.db.username,
  password: vars.db.password,
  database: vars.db.database,
  host: vars.db.host,
  port: vars.db.port,
  dialect: vars.db.dialect,
  dialectOptions: vars.db.dialectOptions,
  logging: false
} as Options)

const TodosDAO = makeTodosDAO(sequelize)

const models = {
  TodosDAO
}

Object
  .values(models)
  .forEach(model => model.associate?.(models, model))

export {
  TodosDAO
}

export default async () => {
  await sequelize.authenticate()
}
