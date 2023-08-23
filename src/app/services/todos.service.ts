import { NotFoundError } from '$/app/errors';
import { todosModel } from '$/app/models';
import { AddTodo, EditTodo, Todo } from '$/app/types';

export const todosService = {
  async get(id: Todo['id']): Promise<Todo> {
    const result = await todosModel.get(id);
    return result;
  },

  async edit(id: Todo['id'], changes: EditTodo): Promise<void> {
    await todosModel.edit(id, changes);
  },

  async checkExists(id: Todo['id']): Promise<void> {
    const exists = await todosModel.exists(id);
    if (!exists) throw new NotFoundError();
  },

  async remove(id: Todo['id']): Promise<void> {
    await todosModel.remove(id);
  },

  async add(data: AddTodo): Promise<Todo['id']> {
    const result = await todosModel.add(data);
    return result;
  },

  async list(): Promise<Todo[]> {
    const result = await todosModel.list();
    return result;
  }
};
