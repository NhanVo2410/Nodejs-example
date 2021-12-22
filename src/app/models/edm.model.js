const model = {
  namespace: 'test',
  entityTypes: {
    tblhelpdesk_user: {
      _id: { type: 'Edm.String', key: true },
      local: { type: 'Edm.String' },
      info: { type: 'Edm.String' },
      tickets: { type: 'Edm.String' },
      createdAt: { type: 'Edm.DateTime' },
      updatedAt: { type: 'Edm.DateTime' },
    },
    product: {
      _id: { type: 'Edm.String', key: true },
      name: { type: 'Edm.String' },
      price: { type: 'Edm.Int32' },
    },
  },
  entitySets: {
    tblhelpdesk_users: {
      entityType: 'test.tblhelpdesk_user',
    },
    products: {
      entityType: 'test.product',
    },
  },
};

module.exports = model;
