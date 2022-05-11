const productsService = require('../../../services/productsService');
const productsModel = require('../../../models/productsModel');
const sinon = require('sinon');
const { expect } = require('chai');

const noResults = [];
const oneResult = [{
  id: 1,
  name: 'potato',
  quantity: 5,
}];
const postResult = {
  id: 1,
  name: 'mashed potato',
  quantity: 5,
};

describe('ProductsService', () => {
  describe('A função "getAll"', () => {
    describe('quando não há produtos salvos no banco', () => {
      beforeEach(() => {
        sinon.stub(productsModel, 'getAll').resolves(noResults);
      })
      afterEach(() => {
        productsModel.getAll.restore();
      })
  
      it('retorna um array vazio', async () => {
        const data = await productsService.getAll();
        expect(data).to.be.an('array');
        expect(data).to.be.empty;
      })
    });

    describe('quando há produtos cadastrados no banco', () => {
      before(() => {
        sinon.stub(productsModel, 'getAll').resolves(oneResult);
      })
      after(() => {
        productsModel.getAll.restore();
      })
  
      it('retorna um array', async () => {
        const data = await productsService.getAll();
        expect(data).to.be.an('array');
      })
  
      it('o array contém objetos', async () => {
        const data = await productsService.getAll();
        data.forEach((product) => {
          expect(product).to.be.an('object');
        })
      })
  
      it('os objetos têm as propriedades: id, name, quantity', async () => {
        const [data] = await productsService.getAll();
        expect(data).to.have.all.keys('id', 'name', 'quantity');
      })
    });
  });
});
