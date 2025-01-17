// App.js veya index.js
import { registerRootComponent } from 'expo';
import { Provider } from 'react-redux';
import { store } from './redux/store';
import App from './App'; // Uygulamanın ana componentini import et

registerRootComponent(() => (
    <Provider store={store} >
        <App />
    </Provider>
));