const productsController = require('../../../controllers/productsController');
const productsService = require('../../../services/productsService');
const sinon = require('sinon');
const { expect } = require('chai');

const productsMock = [
  {
    id: 1,
    name: 'potato',
    quantity: 5,
  },
  {
    id: 2,
    name: 'smiley potato',
    quantity: 5,
  }
];

const oneProductMock = {
  id: 8,
  name: 'angry potato',
  quantity: 2,
}

describe('ProductsController', () => {
  describe('A função "getAll"', () => {
    const response = {};
    const request = {};

    beforeEach(() => {
      response.status = sinon.stub().returns(response)
      response.json = sinon.stub().returns();

      sinon.stub(productsService, 'getAll').resolves(productsMock);
    })
    afterEach(() => {
      productsService.getAll.restore();
    })

    it('retorna o status 200', async () => {
      await productsController.getAll(request, response);
      expect(response.status.calledWith(200)).to.be.true;
    })

    it('retorna o método json passando um array', async () => {
      await productsController.getAll(request, response);
      expect(response.json.calledWith(sinon.match.array)).to.be.true;
    })

    it('o array passado ao json tem os dados corretos', async () => {
      await productsController.getAll(request, response);
      expect(response.json.calledWith(sinon.match.array.deepEquals(productsMock))).to.be.true;
    })
  });

  describe('A função "findProduct"', () => {
    const response = {};
    const request = {
      params: { id: 8 },
    };

    beforeEach(() => {
      response.status = sinon.stub().returns(response)
      response.json = sinon.stub().returns();

      sinon.stub(productsService, 'findProduct').resolves(oneProductMock);
    })
    afterEach(() => {
      productsService.findProduct.restore();
    })

    it('retorna o status 200', async () => {
      await productsController.findProduct(request, response);
      expect(response.status.calledWith(200)).to.be.true;
    })

    it('retorna o método json passando um objeto', async () => {
      await productsController.findProduct(request, response);
      expect(response.json.calledWith(sinon.match.object)).to.be.true;
    })
  });

  describe('A função "registerProduct"', () => {
    const response = {};
    const request = {
      body: { name: 'angry potato', quantity: 2 },
    };

    beforeEach(() => {
      response.status = sinon.stub().returns(response);
      response.json = sinon.stub().returns();

      sinon.stub(productsService, 'registerProduct').resolves(oneProductMock);
    })
    afterEach(() => {
      productsService.registerProduct.restore();
    })

    it('retorna o método "status" com o código 201', async () => {
      await productsController.registerProduct(request, response);
      expect(response.status.calledWith(201)).to.be.true;
    })

    it('retorna o método "json" passando um objeto', async () => {
      await productsController.registerProduct(request, response);
      expect(response.json.calledWith(sinon.match.object)).to.be.true;
    })
  });

  describe('A função "updateProduct"', () => {
    const response = {};
    const request = {
      params: { id: 8 },
      body: { name: 'angry potato', quantity: 2 },
    };

    beforeEach(() => {
      response.status = sinon.stub().returns(response);
      response.json = sinon.stub().returns();

      sinon.stub(productsService, 'updateProduct').resolves(oneProductMock);
    })
    afterEach(() => {
      productsService.updateProduct.restore();
    })

    it('retorna o status 200', async () => {
      await productsController.updateProduct(request, response);
      expect(response.status.calledWith(200)).to.be.true;
    })

    it('retorna o método json passando um objeto', async () => {
      await productsController.updateProduct(request, response);
      expect(response.json.calledWith(sinon.match.object)).to.be.true;
    })
  });

  describe('A função "deleteProduct"', () => {
    const response = {};
    const request = {
      params: { id: 8 },
    };

    beforeEach(() => {
      response.status = sinon.stub().returns(response);
      response.end = sinon.stub().returns();

      sinon.stub(productsService, 'deleteProduct').resolves();
    })
    afterEach(() => {
      productsService.deleteProduct.restore();
    })

    it('retorna o status 204', async () => {
      await productsController.deleteProduct(request, response);
      expect(response.status.calledWith(204)).to.be.true;
    })

    it('finaliza a requisição com o método end', async () => {
      await productsController.deleteProduct(request, response);
      expect(response.end.calledWith()).to.be.true;
    })
  });
});
