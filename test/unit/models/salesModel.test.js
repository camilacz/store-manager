const salesModel = require('../../../models/salesModel');
const sinon = require('sinon');
const connection = require('../../../models/connection');
const { expect } = require('chai');

const noResults = [[]];
const manyResults = [[
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
]];
const postResult = [{
  fieldCount: 0,
  affectedRows: 1,
  insertId: 5,
  info: '',
  serverStatus: 2,
  warningStatus: 0
}];

describe('SalesModel: a função "getAll" retorna os dados corretos', () => {
  describe('quando não há vendas no db', () => {
    beforeEach(() => {
      sinon.stub(connection, 'execute').resolves(noResults);
    })
    afterEach(() => {
      connection.execute.restore();
    })

    it('retorna um array vazio', async () => {
      const data = await salesModel.getAll();
      expect(data).to.be.an('array');
      expect(data).to.be.empty;
    })
  });

  describe('quando há vendas registradas no db', () => {
    beforeEach(() => {
      sinon.stub(connection, 'execute').resolves(manyResults);
    })
    afterEach(() => {
      connection.execute.restore();
    })

    it('retorna um array com objetos', async () => {
      const data = await salesModel.getAll();
      expect(data).to.be.an('array');
      expect(data).to.be.not.empty;
      data.forEach((sale) => {
        expect(sale).to.be.an('object');
      });
    })

    it('os objetos do array possuem as propriedades id, date, sale_id, product_id, quantity', async () => {
      const [data] = await salesModel.getAll();
      expect(data).to.have.all.keys('id', 'date', 'sale_id', 'product_id', 'quantity');
    })
  });
});

describe('SalesModel: a função "findSale" retorna os dados corretos, segundo o id informado', () => {
  describe('quando não existe venda com o id solicitado no db', () => {
    beforeEach(() => {
      sinon.stub(connection, 'execute').resolves(noResults);
    })
    afterEach(() => {
      connection.execute.restore();
    })

    it('retorna um array vazio', async () => {
      const data = await salesModel.findSale(1);
      expect(data).to.be.an('array');
      expect(data).to.be.empty;
    })
  });

  describe('quando há alguma venda com o id solicitado', () => {
    beforeEach(() => {
      sinon.stub(connection, 'execute').resolves(manyResults);
    })
    afterEach(() => {
      connection.execute.restore();
    })

    it('retorna um array de objetos', async () => {
      const data = await salesModel.findSale(1);
      expect(data).to.be.an('array');
      expect(data).to.be.not.empty;
      data.forEach((sale) => {
        expect(sale).to.be.an('object');
      });
    })

    it('os objetos têm as propriedades: id, date, sale_id, product_id, quantity', async () => {
      const data = await salesModel.findSale(1);
      data.forEach((obj) => {
        expect(obj).to.have.all.keys('id', 'date', 'sale_id', 'product_id', 'quantity');
      })
    })

    it('os objetos tem o id correto', async () => {
      const data = await salesModel.findSale(1);
      data.forEach((obj) => {
        expect(obj).to.have.property('id', 1);
      })
    })
  });
});

describe('SalesModel: a função "registerSale" retorna os dados corretos', () => {
  beforeEach(() => {
    sinon.stub(connection, 'execute').resolves(postResult);
  })
  afterEach(() => {
    connection.execute.restore();
  })

  it('retorna um número', async () => {
    const data = await salesModel.registerSale();
    expect(data).to.be.a('number');
  })

  it('o número é equivalente ao id da nova venda cadastrada', async () => {
    const data = await salesModel.registerSale();
    expect(data).to.equal(postResult[0].insertId);
  })
});

describe('SalesModel: a função "registerSaleProduct" retorna os dados corretos', () => {
  beforeEach(() => {
    sinon.stub(connection, 'execute').resolves(postResult);
  })
  afterEach(() => {
    connection.execute.restore();
  })

  const params = [5, [{ productId: 2, quantity: 5 }]];
  it('retorna um array', async () => {
    const data = await salesModel.registerSaleProduct(...params);
    expect(data).to.be.an('array');
  })
});

describe('SalesModel: a função "updateSale"', () => {
  beforeEach(() => {
    sinon.stub(connection, 'execute').resolves(noResults);
  })
  afterEach(() => {
    connection.execute.restore();
  })

  const params = [2, [{ productId: 2, quantity: 5 }]];
  it('retorna um array', async () => {
    const data = await salesModel.updateSale(...params);
    expect(data).to.be.an('array');
  })
});

describe('SalesModel: a função "deleteSale"', () => {
  beforeEach(() => {
    sinon.stub(connection, 'execute').resolves(noResults);
  })
  afterEach(() => {
    connection.execute.restore();
  })

  it('não tem retorno', async () => {
    const data = await salesModel.deleteSale(1);
    expect(data).to.be.undefined;
  })
});

describe('SalesModel: a função "deleteProductSale"', () => {
  beforeEach(() => {
    sinon.stub(connection, 'execute').resolves(noResults);
  })
  afterEach(() => {
    connection.execute.restore();
  })

  it('não tem retorno', async () => {
    const data = await salesModel.deleteProductSale(1);
    expect(data).to.be.undefined;
  })
});