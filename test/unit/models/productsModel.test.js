const productsModel = require('../../../models/productsModel');
const sinon = require('sinon');
const connection = require('../../../models/connection');
const { expect } = require('chai');

const noResults = [[]];
const oneResult = [[{
  id: 1,
  name: 'potato',
  quantity: 5,
}]];
const postResult = [{
  fieldCount: 0,
  affectedRows: 1,
  insertId: 5,
  info: '',
  serverStatus: 2,
  warningStatus: 0
}];
// const manyResults = [[
//   {
//     id: 1,
//     name: 'potato',
//     quantity: 5,
//   },
//   {
//     id: 2,
//     name: 'chill potato',
//     quantity: 3,
//   }
// ]]

describe('ProductsModel', () => {
  describe('A função "getAll"', () => {
    describe('quando não existe nenhum produto no banco de dados', () => {
      beforeEach(() => {
        sinon.stub(connection, 'execute').resolves(noResults);
      })

      afterEach(() => {
        connection.execute.restore();
      })

      it('retorna um array', async () => {
        const products = await productsModel.getAll();
        expect(products).to.be.an('array');
      })

      it('o array está vazio', async () => {
        const products = await productsModel.getAll();
        expect(products).to.be.empty;
      })
    });

    describe('quando existem produtos registrados no banco de dados', () => {
      beforeEach(() => {
        sinon.stub(connection, 'execute').resolves(oneResult);
      })

      afterEach(() => {
        connection.execute.restore();
      })

      it('retorna um array', async () => {
        const data = await productsModel.getAll();
        expect(data).to.be.an('array');
      })

      it('o array não está vazio', async () => {
        const data = await productsModel.getAll();
        expect(data).to.be.not.empty;
      })

      it('o array possui objetos', async () => {
        const [data] = await productsModel.getAll();
        expect(data).to.be.an('object');
      })

      it('o objeto possui os atributos id, name, quantity', async () => {
        const [data] = await productsModel.getAll();
        expect(data).to.have.all.keys('id', 'name', 'quantity');
      })
    });
  });

  describe('A função "findProduct" recebe um id', () => {
    describe('e quando o id não existe no banco de dados', () => {
      beforeEach(() => {
        sinon.stub(connection, 'execute').resolves(noResults);
      })

      afterEach(() => {
        connection.execute.restore();
      })

      it('retorna um array vazio', async () => {
        const data = await productsModel.findProduct(15);
        expect(data).to.be.an('array');
        expect(data).to.be.empty;
      })
    });

    describe('quando existe um id correspondente no banco de dados', () => {
      beforeEach(() => {
        sinon.stub(connection, 'execute').resolves(oneResult);
      })

      afterEach(() => {
        connection.execute.restore();
      })

      it('retorna um array', async () => {
        const data = await productsModel.findProduct(1);
        expect(data).to.be.an('array');
      })

      it('o array não está vazio', async () => {
        const data = await productsModel.findProduct(1);
        expect(data).to.be.not.empty;
      })

      it('o array contém apenas um objeto', async () => {
        const data = await productsModel.findProduct(1);
        expect(data).to.have.lengthOf(1);
        expect(data[0]).to.be.an('object');
      })

      it('o objeto tem as propriedades: id, name, quantity', async () => {
        const [data] = await productsModel.findProduct(1);
        expect(data).to.have.all.keys('id', 'name', 'quantity');
      })

      it('o objeto tem o id correto', async () => {
        const [data] = await productsModel.findProduct(1);
        expect(data).to.have.property('id', 1);
      })
    });
  });

  describe('A função "findAvaiableProduct" recebe um id e uma quantidade a ser vendida', () => {
    describe('quando o id não existe no banco ou a quantidade excede o estoque', () => {
      beforeEach(() => {
        sinon.stub(connection, 'execute').resolves(noResults);
      })
      afterEach(() => {
        connection.execute.restore();
      })

      it('retorna um array vazio', async () => {
        const data = await productsModel.findAvaiableProduct();
        expect(data).to.be.an('array');
        expect(data).to.be.empty;
      })
    });

    describe('quando encontra um produto com estoque suficiente', () => {
      beforeEach(() => {
        sinon.stub(connection, 'execute').resolves(oneResult);
      })
      afterEach(() => {
        connection.execute.restore();
      })

      it('retorna um array', async () => {
        const data = await productsModel.findAvaiableProduct();
        expect(data).to.be.an('array');
      })

      it('o array contém 1 objeto', async () => {
        const [data] = await productsModel.findAvaiableProduct();
        expect(data).to.be.an('object');
      })

      it('o objeto tem as propriedades: id, name, quantity', async () => {
        const [data] = await productsModel.findAvaiableProduct();
        expect(data).to.have.all.keys('id', 'name', 'quantity');
      })
    });
  });

  describe('A função "registerProduct"', () => {
    beforeEach(() => {
      sinon.stub(connection, 'execute').resolves(postResult);
    })
    afterEach(() => {
      connection.execute.restore();
    })

    
    it('retorna um objeto', async () => {
      const data = await productsModel.registerProduct('novo produto', 10);
      expect(data).to.be.an('object');
    })

    it('o objeto tem as propriedades: id, name, quantity', async () => {
      const data = await productsModel.registerProduct('novo produto', 10);
      expect(data).to.have.all.keys('id', 'name', 'quantity');
    })

    it('o objeto tem o id correto', async () => {
      const data = await productsModel.registerProduct('produto', 10);
      expect(data).to.have.property('id', postResult[0].insertId);
    })
  });

  describe('A função "getProductByName" recebe o parâmetro "name"', () => {
    describe('quando não encontra um produto com nome solicitado', () => {
      beforeEach(() => {
        sinon.stub(connection, 'execute').resolves(noResults);
      })
      afterEach(() => {
        connection.execute.restore();
      })

      it('retorna um array vazio', async () => {
        const data = await productsModel.getProductByName('tanto faz :)');
        expect(data).to.be.an('array');
        expect(data).to.be.empty;
      })
    });

    describe('quando encontra um produto com o nome desejado', () => {
      beforeEach(() => {
        sinon.stub(connection, 'execute').resolves(oneResult);
      })
      afterEach(() => {
        connection.execute.restore();
      })

      it('retorna um array', async () => {
        const data = await productsModel.getProductByName('potato');
        expect(data).to.be.an('array');
      })

      it('o array tem 1 objeto', async () => {
        const data = await productsModel.getProductByName('potato');
        expect(data).to.have.lengthOf(1);
        expect(data[0]).to.be.an('object');
      })

      it('o objeto tem as propriedades: id, name, quantity', async () => {
        const [data] = await productsModel.getProductByName('potato');
        expect(data).to.have.all.keys('id', 'name', 'quantity');
      })

      it('a chave "name" tem o mesmo valor passado à função', async () => {
        const [data] = await productsModel.getProductByName('potato');
        expect(data).to.have.property('name', 'potato');
      })
    });
  });

  describe('A função "updateProduct"', () => {
    beforeEach(() => {
      sinon.stub(connection, 'execute').resolves(noResults);
    })
    afterEach(() => {
      connection.execute.restore();
    })
    const params = [1, 'novo nome', 10];

    it('retorna um objeto', async () => {
      const data = await productsModel.updateProduct(...params);
      expect(data).to.be.an('object');
    })

    it('o objeto tem as propriedades: id, name, quantity', async () => {
      const data = await productsModel.updateProduct(...params);
      expect(data).to.have.all.keys('id', 'name', 'quantity');
    })
  });

  describe('A função "deleteProduct"', () => {
    beforeEach(() => {
      sinon.stub(connection, 'execute').resolves(noResults);
    })
    afterEach(() => {
      connection.execute.restore();
    })

    it('não retorna nada?? só deleta do banco...', async () => {
      const data = await productsModel.deleteProduct(1);
      expect(data).to.be.undefined;
    })
  });

  describe('A função "increaseQuantity"', () => {
    beforeEach(() => {
      sinon.stub(connection, 'execute').resolves(oneResult);
    })
    afterEach(() => {
      connection.execute.restore();
    })

    it('retorna um array com os produtos atualizados', async () => {
      const data = await productsModel.increaseQuantity()
      expect(data).to.be.an('array');
    })
  });

  describe('A função "decreaseQuantity"', () => {
    beforeEach(() => {
      sinon.stub(connection, 'execute').resolves(oneResult);
    })
    afterEach(() => {
      connection.execute.restore();
    })

    it('retorna um array com os produtos atualizados', async () => {
      const data = await productsModel.decreaseQuantity()
      expect(data).to.be.an('array');
    })
  });
});
