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

// describe('ProductsService: a função "getAll" retorna os dados corretos', () => {
//   describe('quando não há produtos salvos no db', () => {
//     before(() => {
//       sinon.stub(productsModel, 'getAll').resolves(noResults);
//     })
//     after(() => {
//       productsModel.getAll.restore();
//     })

//     it('retorna um array vazio', async () => {
//       const data = await productsService.getAll();
//       expect(data).to.be.an('array');
//       expect(data).to.be.empty;
//     })
//   });

//   describe('quando há produtos cadastrados no db', () => {
//     before(() => {
//       sinon.stub(productsModel, 'getAll').resolves(oneResult);
//     })
//     after(() => {
//       productsModel.getAll.restore();
//     })

//     it('retorna um array', async () => {
//       const data = await productsService.getAll();
//       expect(data).to.be.an('array');
//     })

//     it('o array contém objetos', async () => {
//       const data = await productsService.getAll();
//       data.forEach((product) => {
//         expect(product).to.be.an('object');
//       })
//     })

//     it('os objetos têm as propriedades: id, name, quantity', async () => {
//       const [data] = await productsService.getAll();
//       expect(data).to.have.all.keys('id', 'name', 'quantity');
//     })
//   });
// });

// describe('ProductsService: a função "findProduct"', () => {
//   describe('quando existe um produto com id buscado', () => {
//     before(() => {
//       sinon.stub(productsModel, 'findProduct').resolves(oneResult);
//     })
//     after(() => {
//       productsModel.findProduct.restore();
//     })

//     it('retorna um objeto', async () => {
//       const data = await productsService.findProduct(1);
//       expect(data).to.be.an('object');
//     })

//     it('o objeto têm as propriedades: id, name, quantity', async () => {
//       const data = await productsService.findProduct(1);
//       expect(data).to.have.all.keys('id', 'name', 'quantity');
//     })
//   });

//   describe('quando não há nenhum produto com o id pedido', () => {
//     // before(() => {
//     //   sinon.stub(productsModel, 'findProduct').resolves(noResults);
//     // })
//     // after(() => {
//     //   productsModel.findProduct.restore();
//     // })

//     const error = { status: 404, message: 'Product not found' };
//     it('gera o erro: "Product not found"', async () => {
//       // try {
//       //   await productsService.findProduct(1);
//       // } catch(err) {
//       //   expect(err).to.eql(error);
//       // }
//     })
//   });
// });

// describe('ProductsService: a função "registerProduct"', () => {
//   describe('quando a requisição é válida', () => {
//     before(() => {
//       sinon.stub(productsModel, 'registerProduct').resolves(postResult);
//       sinon.stub(productsModel, 'getProductByName').resolves(noResults);
//     })
//     after(() => {
//       productsModel.registerProduct.restore();
//       productsModel.getProductByName.restore();
//     })

//     const params = ['hakuna matata', 10];
//     it('retorna um objeto', async () => {
//       const data = await productsService.registerProduct(...params);
//       expect(data).to.be.an('object');
//     })

//     it('o objeto têm as propriedades: id, name, quantity', async () => {
//       const data = await productsService.registerProduct(...params);
//       expect(data).to.have.all.keys('id', 'name', 'quantity');
//     })
//   });

//   describe('quando a requisição é inválida (nome já existe)', () => {
//     // before(() => {
//     //   sinon.stub(productsModel, 'registerProduct').resolves(postResult);
//     //   sinon.stub(productsModel, 'getProductByName').resolves(oneResult);
//     // })
//     // after(() => {
//     //   productsModel.registerProduct.restore();
//     //   productsModel.getProductByName.restore();
//     // })

//     it('gera o erro: "Product already exists"', async () => {
//       // try {
//       //   await productsService.registerProduct();
//       // } catch(err) {
//       //   const error = { status: 409, message: 'Product already exists' };
//       //   expect(err).to.eql(error);
//       // }
//     })
//   });
// });

// describe('ProductsService: a função "updateProduct"', () => {
//   describe('quando há um produto com o id passado', () => {
//     before(() => {
//       sinon.stub(productsModel, 'findProduct').resolves(oneResult);
//       sinon.stub(productsModel, 'updateProduct').resolves(postResult);
//     })
//     after(() => {
//       productsModel.findProduct.restore();
//       productsModel.updateProduct.restore();
//     })

//     it('retorna um objeto com as propriedades: id, name, quantity', async () => {
//       const data = await productsService.updateProduct();
//       expect(data).to.be.an('object');
//       expect(data).to.have.all.keys('id', 'name', 'quantity');
//     })
//   });

//   describe('quando não há nenhum produto com id passado', () => {
//     // before(() => {
//     //   sinon.stub(productsModel, 'findProduct').resolves(noResults);
//     //   sinon.stub(productsModel, 'updateProduct').resolves(postResult);
//     // })
//     // after(() => {
//     //   productsModel.findProduct.restore();
//     //   productsModel.updateProduct.restore();
//     // })

//     it('gera o erro: "Product not found"', async () => {
//       // try {
//       //   await productsService.updateProduct();
//       // } catch(err) {
//       //   const error = { status: 404, message: 'Product not found' };
//       //   expect(err).to.eql(error)
//       // }
//     })
//   });
// });

// describe('ProductsService: a função "deleteProduct"', () => {
//   describe('quando o produto existe no db', () => {
//     before(() => {
//       sinon.stub(productsModel, 'findProduct').resolves(oneResult);
//       sinon.stub(productsModel, 'deleteProduct').resolves();
//     })
//     after(() => {
//       productsModel.findProduct.restore();
//       productsModel.deleteProduct.restore();
//     })

//     it('não tem retorno', async () => {
//       const data = await productsService.deleteProduct();
//       expect(data).to.be.undefined;
//     })
//   });

//   describe('quando o produto não existe', () => {
//     // before(() => {
//     //   sinon.stub(productsModel, 'findProduct').resolves(noResults);
//     //   sinon.stub(productsModel, 'deleteProduct').resolves();
//     // })
//     // after(() => {
//     //   productsModel.findProduct.restore();
//     //   productsModel.deleteProduct.restore();
//     // })

//     it('gera o erro: "Product not found"', async () => {
//       // try {
//       //   await productsService.deleteProduct();
//       // } catch(err) {
//       //   const error = { status: 404, message: 'Product not found' };
//       //   expect(err).to.eql(error);
//       // }
//     })
//   });
// });