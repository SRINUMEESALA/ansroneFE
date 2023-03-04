import { BrowserRouter, Route, Switch } from 'react-router-dom';
import './App.css';
import ProductItemDetails from './components/ProductItemDetails';
import Products from './components/Products';

const App = () => (
  <BrowserRouter>
    <Switch>
      <Route exact path="/" component={Products} />
      <Route exact path="/products/:id" component={ProductItemDetails} />
    </Switch>
  </BrowserRouter>
)

export default App;
