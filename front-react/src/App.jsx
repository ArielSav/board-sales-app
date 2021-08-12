import Router from './Router';
import ThemeProvider from './theme';
import {Provider} from './Provider'




function App() {
  return (
    <Provider>
      <ThemeProvider>
        <Router />  
      </ThemeProvider>
    </Provider>
  );
}

export default App;
