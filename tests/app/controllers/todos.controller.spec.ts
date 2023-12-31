import { todosController } from '$/app/controllers';
import { todosService } from '$/app/services';
import { AddTodo, EditTodo, Todo } from '$/app/types';
import { todosValidator } from '$/app/validators';
import { expect, use } from 'chai';
import chaiAsPromised from 'chai-as-promised';
import sinon from 'sinon';

use(chaiAsPromised);

describe('app/controllers/todos.controller', () => {
  beforeEach(sinon.restore);

  describe('get', () => {
    it('should throw if todosValidator.paramsId throws', () => {
      sinon.stub(todosValidator, 'paramsId').rejects();
      return expect(todosController.get({})).to.eventually.be.rejected;
    });

    it('should throw if todosService.checkExists throws', () => {
      sinon.stub(todosValidator, 'paramsId').resolves({ id: 1 });
      sinon.stub(todosService, 'checkExists').rejects();
      return expect(todosController.get({})).to.eventually.be.rejected;
    });

    it('should throw if todosService.get throws', () => {
      sinon.stub(todosValidator, 'paramsId').resolves({ id: 1 });
      sinon.stub(todosService, 'checkExists').resolves();
      sinon.stub(todosService, 'get').rejects();
      return expect(todosController.get({})).to.eventually.be.rejected;
    });

    it('should return result', () => {
      sinon.stub(todosValidator, 'paramsId').resolves({ id: 1 });
      sinon.stub(todosService, 'checkExists').resolves();
      sinon.stub(todosService, 'get').resolves({ id: 1 } as Todo);
      return expect(todosController.get({})).to.eventually.deep.equal({ id: 1 });
    });
  });

  describe('edit', () => {
    it('should throw if todosValidator.paramsId throws', () => {
      sinon.stub(todosValidator, 'paramsId').rejects();
      sinon.stub(todosValidator, 'bodyEdit').resolves({} as EditTodo);
      return expect(todosController.edit({}, {})).to.eventually.be.rejected;
    });

    it('should throw if todosValidator.bodyEdit throws', () => {
      sinon.stub(todosValidator, 'paramsId').resolves({ id: 1 });
      sinon.stub(todosValidator, 'bodyEdit').rejects();
      return expect(todosController.edit({}, {})).to.eventually.be.rejected;
    });

    it('should throw if todosService.edit throws', () => {
      sinon.stub(todosValidator, 'paramsId').resolves({ id: 1 });
      sinon.stub(todosValidator, 'bodyEdit').resolves({} as EditTodo);
      sinon.stub(todosService, 'edit').rejects();
      return expect(todosController.edit({}, {})).to.eventually.be.rejected;
    });

    it('should throw if todosService.checkExists throws', () => {
      sinon.stub(todosValidator, 'paramsId').resolves({ id: 1 });
      sinon.stub(todosValidator, 'bodyEdit').resolves({} as EditTodo);
      sinon.stub(todosService, 'checkExists').rejects();
      return expect(todosController.edit({}, {})).to.eventually.be.rejected;
    });

    it('should throw if todosService.edit throws', () => {
      sinon.stub(todosValidator, 'paramsId').resolves({ id: 1 });
      sinon.stub(todosValidator, 'bodyEdit').resolves({} as EditTodo);
      sinon.stub(todosService, 'checkExists').resolves();
      sinon.stub(todosService, 'edit').rejects();
      return expect(todosController.edit({}, {})).to.eventually.be.rejected;
    });

    it('should throw if todosService.get throws', () => {
      sinon.stub(todosValidator, 'paramsId').resolves({ id: 1 });
      sinon.stub(todosValidator, 'bodyEdit').resolves({} as EditTodo);
      sinon.stub(todosService, 'checkExists').resolves();
      sinon.stub(todosService, 'edit').resolves();
      sinon.stub(todosService, 'get').rejects();
      return expect(todosController.edit({}, {})).to.eventually.be.rejected;
    });

    it('should return result', () => {
      sinon.stub(todosValidator, 'paramsId').resolves({ id: 1 });
      sinon.stub(todosValidator, 'bodyEdit').resolves({} as EditTodo);
      sinon.stub(todosService, 'checkExists').resolves();
      sinon.stub(todosService, 'edit').resolves();
      sinon.stub(todosService, 'get').resolves({ id: 1 } as Todo);
      return expect(todosController.edit({}, {})).to.eventually.deep.equal({ id: 1 });
    });
  });

  describe('remove', () => {
    it('should throw if todosValidator.paramsId throws', () => {
      sinon.stub(todosValidator, 'paramsId').rejects();
      return expect(todosController.remove({})).to.eventually.be.rejected;
    });

    it('should throw if todosService.checkExists throws', () => {
      sinon.stub(todosValidator, 'paramsId').resolves({ id: 1 });
      sinon.stub(todosService, 'checkExists').rejects();
      return expect(todosController.remove({})).to.eventually.be.rejected;
    });

    it('should throw if todosService.remove throws', () => {
      sinon.stub(todosValidator, 'paramsId').resolves({ id: 1 });
      sinon.stub(todosService, 'checkExists').resolves();
      sinon.stub(todosService, 'remove').rejects();
      return expect(todosController.remove({})).to.eventually.be.rejected;
    });

    it('should return result', () => {
      sinon.stub(todosValidator, 'paramsId').resolves({ id: 1 });
      sinon.stub(todosService, 'checkExists').resolves();
      sinon.stub(todosService, 'remove').resolves();
      return expect(todosController.remove({})).to.eventually.be.undefined;
    });
  });

  describe('add', () => {
    it('should throw if todosValidator.bodyAdd throws', () => {
      sinon.stub(todosValidator, 'bodyAdd').rejects();
      sinon.stub(todosValidator, 'bodyAdd').rejects();
      sinon.stub(todosValidator, 'bodyAdd').rejects();
      return expect(todosController.add({})).to.eventually.be.rejected;
    });

    it('should throw if todosService.add throws', () => {
      sinon.stub(todosValidator, 'bodyAdd').resolves({} as AddTodo);
      sinon.stub(todosService, 'add').rejects();
      return expect(todosController.add({})).to.eventually.be.rejected;
    });

    it('should throw if todosService.get throws', () => {
      sinon.stub(todosValidator, 'bodyAdd').resolves({} as AddTodo);
      sinon.stub(todosService, 'add').resolves(1);
      sinon.stub(todosService, 'get').rejects();
      return expect(todosController.add({})).to.eventually.be.rejected;
    });

    it('should return result', () => {
      sinon.stub(todosValidator, 'bodyAdd').resolves({} as AddTodo);
      sinon.stub(todosService, 'add').resolves(1);
      sinon.stub(todosService, 'get').resolves({ id: 1 } as Todo);
      return expect(todosController.add({})).to.eventually.deep.equal({ id: 1 });
    });
  });

  describe('list', () => {
    it('should throw if todosService.list throws', () => {
      sinon.stub(todosService, 'list').rejects();
      return expect(todosController.list()).to.eventually.be.rejected;
    });

    it('should return result', () => {
      sinon.stub(todosService, 'list').resolves([{ id: 1 }] as Todo[]);
      return expect(todosController.list()).to.eventually.deep.equal([{ id: 1 }]);
    });
  });
});
