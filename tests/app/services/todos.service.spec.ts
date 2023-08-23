import { todosModel } from '$/app/models';
import { todosService } from '$/app/services';
import { AddTodo, Todo } from '$/app/types';
import { expect, use } from 'chai';
import chaiAsPromised from 'chai-as-promised';
import sinon from 'sinon';

use(chaiAsPromised);

describe('app/services/todos.service', () => {
  beforeEach(sinon.restore);

  describe('get', () => {
    it('should throw if todosModel.get throws', () => {
      sinon.stub(todosModel, 'get').rejects();
      return expect(todosService.get(1)).to.eventually.be.rejected;
    });

    it('should throw if todosModel.get return empty', () => {
      sinon.stub(todosModel, 'get').resolves();
      return expect(todosService.get(1)).to.eventually.be.undefined;
    });

    it('should return result', () => {
      sinon.stub(todosModel, 'get').resolves({ id: 1 } as Todo);
      return expect(todosService.get(1)).to.eventually.deep.equal({ id: 1 });
    });
  });

  describe('edit', () => {
    it('should throw if todosModel.exists throw', () => {
      sinon.stub(todosModel, 'exists').rejects();
      return expect(todosService.edit(1, {})).to.eventually.be.rejected;
    });

    it('should throw if todosModel.exists return false', () => {
      sinon.stub(todosModel, 'exists').resolves(false);
      return expect(todosService.edit(1, {})).to.eventually.be.rejected;
    });

    it('should throw if todosModel.edit throws', () => {
      sinon.stub(todosModel, 'exists').resolves(true);
      sinon.stub(todosModel, 'edit').rejects();
      return expect(todosService.edit(1, {})).to.eventually.be.rejected;
    });

    it('should return result', () => {
      sinon.stub(todosModel, 'exists').resolves(true);
      sinon.stub(todosModel, 'edit').resolves();
      return expect(todosService.edit(1, {})).to.eventually.be.undefined;
    });
  });

  describe('remove', () => {
    it('should throw if todosModel.exists throw', () => {
      sinon.stub(todosModel, 'exists').rejects();
      return expect(todosService.remove(1)).to.eventually.be.rejected;
    });

    it('should throw if todosModel.exists return false', () => {
      sinon.stub(todosModel, 'exists').resolves(false);
      return expect(todosService.remove(1)).to.eventually.be.rejected;
    });

    it('should throw if todosModel.remove throws', () => {
      sinon.stub(todosModel, 'exists').resolves(true);
      sinon.stub(todosModel, 'remove').rejects();
      return expect(todosService.remove(1)).to.eventually.be.rejected;
    });

    it('should return result', () => {
      sinon.stub(todosModel, 'exists').resolves(true);
      sinon.stub(todosModel, 'remove').resolves();
      return expect(todosService.remove(1)).to.eventually.be.undefined;
    });
  });

  describe('add', () => {
    it('should throw if todosModel.add throws', () => {
      sinon.stub(todosModel, 'add').rejects();
      return expect(todosService.add({} as AddTodo)).to.eventually.be.rejected;
    });

    it('should return result', () => {
      sinon.stub(todosModel, 'add').resolves(1);
      return expect(todosService.add({} as AddTodo)).to.eventually.equal(1);
    });
  });

  describe('list', () => {
    it('should throw if todosModel.list throws', () => {
      sinon.stub(todosModel, 'list').rejects();
      return expect(todosService.list()).to.eventually.be.rejected;
    });

    it('should return result', () => {
      sinon.stub(todosModel, 'list').resolves([{ id: 1 }] as Todo[]);
      return expect(todosService.list()).to.eventually.deep.equal([{ id: 1 }]);
    });
  });
});
