import { FC, useEffect, useState } from 'react';
import { getProducts } from './services/api';
import { useNavigate } from 'react-router-dom';
import Loader from './components/Loader';

import Style from './styles/pages/ProductList.module.scss';

interface Product {
  id: number;
  name: string;
  colors: {
    id: number;
    name: string;
    images: string[];
    description: string;
    sizes: number[];
  }[];
}

interface ProductCardProps {
  product: Product;
}

const ProductCard: FC<ProductCardProps> = ({ product }) => {
  const navigate = useNavigate();

  const handleCardClick = () => {
    navigate(`/ProjectUkraineTest/product/${product.id}`);
  };

  return (
    <li className={Style.Card} onClick={handleCardClick}>
      <span>{product.name}</span>
      <img src={product.colors[0].images[0]} alt={product.name} />
    </li>
  );
};

const ProductList: FC = () => {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const products = await getProducts();
      setProducts(products);
    };
    fetchData();
  }, []);

  if (!products) {
    return <Loader />;
  }

  return (
    <ul className={Style.Wrapper}>
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </ul>
  );
};

export default ProductList;
