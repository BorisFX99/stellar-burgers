import { defineConfig } from 'cypress';

export default defineConfig({
  e2e: {
    baseUrl: 'http://localhost:4000',
    setupNodeEvents(on, config) {
      // можно добавить кастомные плагины
    },
  },

  // component: { ... } // НЕ нужно, если только E2E
});
