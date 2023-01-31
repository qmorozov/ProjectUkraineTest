import { Route, Routes } from 'react-router-dom';
import ProductList from './ProductList';
import DetailedProduct from './DetailedProduct';

const App = () => {
  return (
    <div className="container">
        <Routes>
            <Route path="ProjectUkraineTest/" element={<ProductList />} />
            <Route path="ProjectUkraineTest/product/:id" element={<DetailedProduct />} />
        </Routes>
    </div>
  );
};

export default App;
