import { registerRootComponent } from 'expo';

import App from './App';
import { StoreProvider } from './context/Store';

// registerRootComponent calls AppRegistry.registerComponent('main', () => App);
// It also ensures that whether you load the app in Expo Go or in a native build,
// the environment is set up appropriately

const MainApp = () =>{
    return(
        <StoreProvider>
            <App/>
        </StoreProvider>
    )
}

registerRootComponent(MainApp);
