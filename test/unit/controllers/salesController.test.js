const salesService = require('../../../services/salesService');
const salesController = require('../../../controllers/salesController');
const sinon = require('sinon');
const { expect } = require('chai');

const salesMock = [
  {
    saleId: 1,
    date: '2021-09-09T04:54:29.000Z',
    productId: 1,
    quantity: 2,
  }
];
const salesIdMock = [
  {
    date: '2021-09-09T04:54:29.000Z',
    productId: 1,
    quantity: 2
  },
  {
    date: '2021-09-09T04:54:54.000Z',
    productId: 2,
    quantity: 2
  }
];
const registeredMock = {
  id: 1,
  itemsSold: [{ productId: 1, quantity: 3 }],
};
const updatedMock = {
  saleId: 1,
  itemUpdated: [{ productId: 1, quantity: 3 }],
};

describe('SalesController', () => {
  describe('A função "getAll"', () => {
    const response = {};
    const request = {};

    beforeEach(() => {
      response.status = sinon.stub().returns(response)
      response.json = sinon.stub().returns();

      sinon.stub(salesService, 'getAll').resolves(salesMock);
    })
    afterEach(() => {
      salesService.getAll.restore();
    })

    it('retorna o status 200', async () => {
      await salesController.getAll(request, response);
      expect(response.status.calledWith(200)).to.be.true;
    })

    it('retorna o método json passando um array', async () => {
      await salesController.getAll(request, response);
      expect(response.json.calledWith(sinon.match.array)).to.be.true;
    })
  });

  describe('A função "findSale"', () => {
    const response = {};
    const request = {
      params: { id: 1 },
    };

    beforeEach(() => {
      response.status = sinon.stub().returns(response)
      response.json = sinon.stub().returns();

      sinon.stub(salesService, 'findSale').resolves(salesIdMock);
    })
    afterEach(() => {
      salesService.findSale.restore();
    })

    it('retorna o status 200', async () => {
      await salesController.findSale(request, response);
      expect(response.status.calledWith(200)).to.be.true;
    })

    it('retorna o método json passando um array', async () => {
      await salesController.findSale(request, response);
      expect(response.json.calledWith(sinon.match.array)).to.be.true;
    })
  });

  describe('A função "registerNewSale"', () => {
    const response = {};
    const request = {
      body: [{ productId: 1, quantity: 3 }],
    };

    beforeEach(() => {
      response.status = sinon.stub().returns(response)
      response.json = sinon.stub().returns();

      sinon.stub(salesService, 'registerNewSale').resolves(registeredMock);
    })
    afterEach(() => {
      salesService.registerNewSale.restore();
    })

    it('retorna o status 201', async () => {
      await salesController.registerNewSale(request, response);
      expect(response.status.calledWith(201)).to.be.true;
    })

    it('retorna o método json passando um objeto', async () => {
      await salesController.registerNewSale(request, response);
      expect(response.json.calledWith(sinon.match.object)).to.be.true;
    })
  });

  describe('A função "updateSale"', () => {
    const response = {};
    const request = {
      params: { id: 1 },
      body: [{ productId: 1, quantity: 3 }],
    };

    beforeEach(() => {
      response.status = sinon.stub().returns(response)
      response.json = sinon.stub().returns();

      sinon.stub(salesService, 'updateSale').resolves(updatedMock);
    })
    afterEach(() => {
      salesService.updateSale.restore();
    })

    it('retorna o status 200', async () => {
      await salesController.updateSale(request, response);
      expect(response.status.calledWith(200)).to.be.true;
    })

    it('retorna o método json passando um objeto', async () => {
      await salesController.updateSale(request, response);
      expect(response.json.calledWith(sinon.match.object)).to.be.true;
    })
  });

  describe('A função "deleteSale"', () => {
    const response = {};
    const request = {
      params: { id: 1 },
    };

    beforeEach(() => {
      response.status = sinon.stub().returns(response)
      response.end = sinon.stub().returns();

      sinon.stub(salesService, 'deleteSale').resolves();
    })
    afterEach(() => {
      salesService.deleteSale.restore();
    })

    it('retorna o status 204', async () => {
      await salesController.deleteSale(request, response);
      expect(response.status.calledWith(204)).to.be.true;
    })

    it('retorna o método json passando um objeto', async () => {
      await salesController.deleteSale(request, response);
      expect(response.end.calledWith()).to.be.true;
    })
  });
});