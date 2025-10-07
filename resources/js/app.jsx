import '../css/app.css';

import { createInertiaApp } from '@inertiajs/react'
import { createRoot } from 'react-dom/client'
import { resolvePageComponent } from 'laravel-vite-plugin/inertia-helpers';
import '@ant-design/v5-patch-for-react-19';

createInertiaApp({
  resolve: (name) =>
      resolvePageComponent(
          `./Pages/${name}.jsx`,
          import.meta.glob('./Pages/**/*.jsx'),
      ),
  setup({ el, App, props }) {
    createRoot(el).render(<App {...props} />)
  },
})