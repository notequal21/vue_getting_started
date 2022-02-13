import { createApp } from 'vue'
import App from './App.vue'
import VIntersection from '@/directives/VIntersection'
import components from '@/components/UI'
import router from '@/router/router';

const app = createApp(App)

components.forEach(component => {
  app.component(component.name, component)
});

app.directive('intersection', VIntersection)

app
  .use(router)
  .mount('#app')
