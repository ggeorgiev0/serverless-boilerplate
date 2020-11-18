const schema = {
  properties: {
    body: {
      type: 'object',
      properties: {
        product: {
          type: 'object',
          properties: {
            quantity: {
              type: 'number',
            },
            isActive: {
              type: 'boolean',
            },
            productType: {
              type: 'string',
            },
            isInKilos: {
              type: 'boolean',
            },
            expiryDate: {
              type: 'string'
            },
            costInRealCurrency: {
              type: 'number',
            },
            costInVirtualCurrency: {
              type: 'number',
            },
            productName: {
              type: 'string',
            },
          },
          required: ['quantity']
        }
      },
      required: ['product'],
    }
  },
  required: ['body'],
}

export default schema;