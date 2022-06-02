export const dataLayerMixin = {
  methods: {
    pushToDataLayer(event = '', customProps = {}) {
      // Clear the previous ecommerce object.
      if (typeof customProps === 'object') {
        const keys = Object.keys(customProps);
        if (keys.includes('ecommerce')) {
          window.dataLayer.push({ ecommerce: null });
        }
      }

      window.dataLayer.push({ event, ...customProps });
    },
  },
};
