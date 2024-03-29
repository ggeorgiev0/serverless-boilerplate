const schema = {
  properties: {
    body: {
      type: 'object',
      properties: {
        product: {
          type: 'object',
          properties: {
            productName: {
              type: 'string',
            },
            quantity: {
              type: 'number',
            },
            productType: {
              type: 'string',
            },
            isActive: {
              type: 'boolean',
            },
            isInKilos: {
              type: 'boolean',
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
          required: ['productName', 'quantity', 'productType', 'isActive', 'isInKilos'],
        }
      },
      required: ['product'],
    },
  },
  required: ['body'],
};

export default schema;
