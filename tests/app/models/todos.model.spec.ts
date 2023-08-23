import { todosModel } from '$/app/models';
import { AddTodo, Todo } from '$/app/types';
import { TodosDAO } from '$/db';
import { expect, use } from 'chai';
import chaiAsPromised from 'chai-as-promised';
import { Model } from 'sequelize';
import sinon from 'sinon';

use(chaiAsPromised);

describe('app/models/todos.model', () => {
  beforeEach(sinon.restore);

  describe('get', () => {
    it('should throw if TodosDAO.findOne throws', () => {
      sinon.stub(TodosDAO, 'findOne').rejects();
      return expect(todosModel.get(1)).to.eventually.be.rejected;
    });

    it('should return result', () => {
      sinon.stub(TodosDAO, 'findOne').resolves({ id: 1 } as unknown as Model<Todo>);
      return expect(todosModel.get(1)).to.eventually.deep.equal({ id: 1 });
    });
  });

  describe('exists', () => {
    it('should throw if TodosDAO.count throws', () => {
      sinon.stub(TodosDAO, 'count').rejects();
      return expect(todosModel.exists(1)).to.eventually.be.rejected;
    });

    it('should return result', () => {
      sinon.stub(TodosDAO, 'count').resolves(1);
      return expect(todosModel.exists(1)).to.eventually.be.true;
    });
  });

  describe('edit', () => {
    it('should throw if TodosDAO.update throws', () => {
      sinon.stub(TodosDAO, 'update').rejects();
      return expect(todosModel.edit(1, {})).to.eventually.be.rejected;
    });

    it('should return result', () => {
      sinon.stub(TodosDAO, 'update').resolves();
      return expect(todosModel.edit(1, {})).to.eventually.be.undefined;
    });
  });

  describe('remove', () => {
    it('should throw if TodosDAO.destroy throws', () => {
      sinon.stub(TodosDAO, 'destroy').rejects();
      return expect(todosModel.remove(1)).to.eventually.be.rejected;
    });

    it('should return result', () => {
      sinon.stub(TodosDAO, 'destroy').resolves();
      return expect(todosModel.remove(1)).to.eventually.be.undefined;
    });
  });

  describe('add', () => {
    it('should throw if TodosDAO.create throws', () => {
      sinon.stub(TodosDAO, 'create').rejects();
      return expect(todosModel.add({} as AddTodo)).to.eventually.be.rejected;
    });

    it('should return result', () => {
      sinon.stub(TodosDAO, 'create').resolves({ id: 1 } as any);
      return expect(todosModel.add({} as AddTodo)).to.eventually.equal(1);
    });
  });

  describe('list', () => {
    it('should throw if TodosDAO.findAll throws', () => {
      sinon.stub(TodosDAO, 'findAll').rejects();
      return expect(todosModel.list()).to.eventually.be.rejected;
    });

    it('should return result', () => {
      sinon.stub(TodosDAO, 'findAll').resolves([{ id: 1 }] as unknown as Model<Todo>[]);
      return expect(todosModel.list()).to.eventually.deep.equal([{ id: 1 }]);
    });
  });
});
