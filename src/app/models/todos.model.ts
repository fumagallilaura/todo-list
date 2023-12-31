import { AddTodo, EditTodo, Todo } from '$/app/types';
import { TodosDAO } from '$/db';

export const todosModel = {
  async get (id: Todo['id']): Promise<Todo> {
    const result = await TodosDAO.findOne({ where: { id }, raw: true });
    return result as unknown as Todo;
  },

  async exists (id: Todo['id']): Promise<boolean> {
    const result = await TodosDAO.count({ where: { id } });
    return !!result;
  },

  async edit (id: Todo['id'], changes: EditTodo): Promise<void> {
    await TodosDAO.update(
      { ...changes, updatedAt: new Date() },
      { where: { id } }
    );
  },

  async remove (id: Todo['id']): Promise<void> {
    await TodosDAO.destroy({ where: { id } });
  },

  async add (data: AddTodo): Promise<Todo['id']> {
    const { id } = await TodosDAO
      .create({ ...data, createdAt: new Date() }) as unknown as Todo;
    return id;
  },

  async list (): Promise<Todo[]> {
    const result = await TodosDAO.findAll({ raw: true });
    return result as unknown as Todo[];
  }
};
