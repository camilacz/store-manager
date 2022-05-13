const salesService = require('../../../services/salesService');
const salesModel = require('../../../models/salesModel');
const productsModel = require('../../../models/productsModel');
const sinon = require('sinon');
const { expect } = require('chai');

const noResults = [];
const completeResults = [
  {
    id: 1,
    date: '2022-05-10 17:50:50',
    sale_id: 1,
    product_id: 1,
    quantity: 5,
  },
  {
    id: 1,
    date: '2022-05-10 14:25:25',
    sale_id: 1,
    product_id: 2,
    quantity: 10,
  },
];
const registerSaleResult = [
  {
    "productId": 1,
    "quantity": 2
  },
  {
    "productId": 2,
    "quantity": 5
  }
];
const productResult = [{
  id: 1,
  name: 'potato',
  quantity: 5,
}];
const updateResult = [
  {
    "productId": 1,
    "quantity": 6
  }
];

describe('SalesService: a função "getAll" retorna os dados corretos', () => {
  describe('quando não há vendas registradas no db', () => {
    beforeEach(() => {
      sinon.stub(salesModel, 'getAll').resolves(noResults);
    })
    afterEach(() => {
      salesModel.getAll.restore();
    })

    it('retorna um array vazio', async () => {
      const data = await salesService.getAll();
      expect(data).to.be.an('array');
      expect(data).to.be.empty;
    })
  });

  describe('quando há vendas registradas no db', () => {
    beforeEach(() => {
      sinon.stub(salesModel, 'getAll').resolves(completeResults);
    })
    afterEach(() => {
      salesModel.getAll.restore();
    })

    it('retorna um array de objetos', async () => {
      const data = await salesService.getAll();
      expect(data).to.be.an('array');
      expect(data).not.be.not.empty;
      data.forEach((sale) => {
        expect(sale).to.be.an('object');
      });
    })

    it('os objetos tem as propriedades: saleId, date, productId, quantity', async () => {
      const [data] = await salesService.getAll();
      expect(data).to.have.all.keys('saleId', 'date', 'productId', 'quantity');
    })
  });
});

describe('SalesService: a função "findSale"', () => {
  describe('se há uma venda correspondente ao id passado', () => {
    beforeEach(() => {
      sinon.stub(salesModel, 'findSale').resolves(completeResults);
    })
    afterEach(() => {
      salesModel.findSale.restore();
    })

    it('retorna um array', async () => {
      const data = await salesService.findSale(1);
      expect(data).to.be.an('array');
    })

    it('o array contém objetos', async () => {
      const data = await salesService.findSale();
      data.forEach((sale) => {
        expect(sale).to.be.an('object');
      })
    })

    it('os objetos têm as propriedades: date, productId, quantity', async () => {
      const [data] = await salesService.findSale();
      expect(data).to.have.all.keys('date', 'productId', 'quantity');
    })
  });
});

describe('SalesService: a função "registerNewSale"', () => {
  beforeEach(() => {
    sinon.stub(salesModel, 'registerSale').resolves(5);
    sinon.stub(salesModel, 'registerSaleProduct').resolves(registerSaleResult);
    sinon.stub(productsModel, 'decreaseQuantity').resolves();
    sinon.stub(productsModel, 'findAvaiableProduct').resolves(productResult)
  })
  afterEach(() => {
    salesModel.registerSale.restore();
    salesModel.registerSaleProduct.restore();
    productsModel.decreaseQuantity.restore();
    productsModel.findAvaiableProduct.restore();
  })

  const params = [
    {
      date: "2022-05-13T18:28:48.000Z",
      productId: 1,
      quantity: 5
    },
    {
      date: "2022-05-13T18:28:48.000Z",
      productId: 2,
      quantity: 10
    }
  ];
  it('retorna um objeto', async () => {
    const data = await salesService.registerNewSale(params);
    expect(data).to.be.an('object');
  })

  it('o objeto tem as chaves: id, itemsSold', async () => {
    const data = await salesService.registerNewSale(params);
    expect(data).to.have.all.keys('id', 'itemsSold');
  })

  it('a chave "itemsSold" é um array de objetos', async () => {
    const { itemsSold } = await salesService.registerNewSale(params);
    expect(itemsSold).to.be.an('array');
    itemsSold.forEach((item) => {
      expect(item).to.be.an('object');
    })
  })

  it('cada objeto da chave itemsSold tem as chaves: productId, quantity', async () => {
    const { itemsSold } = await salesService.registerNewSale(params);
    itemsSold.forEach((item) => {
      expect(item).to.have.all.keys('productId', 'quantity');
    })
  })
});

describe('SalesService: a função "updateSale"', () => {
  describe('quando a requisição é válida', () => {
    beforeEach(() => {
      sinon.stub(salesModel, 'findSale').resolves(completeResults);
      sinon.stub(salesModel, 'updateSale').resolves(updateResult);
      sinon.stub(productsModel, 'findProduct').resolves(productResult);
    })
    afterEach(() => {
      salesModel.findSale.restore();
      salesModel.updateSale.restore();
      productsModel.findProduct.restore();
    })

    const params = [1, updateResult];
    it('retorna um objeto', async () => {
      const data = await salesService.updateSale(...params);
      expect(data).to.be.an('object');
    })

    it('o objeto tem as chaves: saleId, itemUpdated', async () => {
      const data = await salesService.updateSale(...params);
      expect(data).to.have.all.keys('saleId', 'itemUpdated');
    })

    it('a chave itemUpdated é um array', async () => {
      const { itemUpdated } = await salesService.updateSale(...params);
      expect(itemUpdated).to.be.an('array');
    })

    it('itemUpdated contém objeto com as propriedades: productId, quantity', async () => {
      const { itemUpdated } = await salesService.updateSale(...params);
      expect(itemUpdated[0]).to.have.all.keys('productId', 'quantity');
    })
  });
});

// describe('SalesService: a função "deleteSale"', () => {
//   beforeEach(() => {
//     sinon.stub(salesModel, 'findSale').resolves(completeResults);
//     sinon.stub(salesModel, 'deleteProductSale').resolves();
//     sinon.stub(salesModel, 'deleteSale').resolves();
//   })
//   afterEach(() => {
//     salesModel.findSale.restore();
//     salesModel.deleteProductSale.restore();
//     salesModel.deleteSale.restore();
//   })

//   it('não retorna nada??? sei nem oq tô fazendo mais ;-;', async () => {
//     // só vai 👀
//     const data = await salesService.deleteSale();
//     expect(data).to.be.undefined;
//   })
// })