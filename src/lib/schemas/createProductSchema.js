const schema = {
  properties: {
    body: {
      type: 'object',
      properties: {
        name: {
          type: 'string',
        },
        quantity: {
          type: 'number',
        },
        productType: {
          type: 'string',
        },
        costInRealCurrency: {
          type: 'number',
          default: 0,
        },
        costInVirtualCurrency: {
          type: 'number',
          default: 0,
        },
      },
      required: ['name', 'quantity', 'productType'],
    },
  },
  required: ['body'],
};

export default schema;
