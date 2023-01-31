import { useNavigate, useParams } from 'react-router-dom';
import { getProduct } from './services/api';
import { useEffect, useState } from 'react';
import Loader from './components/Loader';

import Style from './styles/pages/DetailedProduct.module.scss';

type Color = {
  id: string;
  name: string;
  images: string[];
  sizes: string[];
};

type Product = {
  name: string;
  colors: Color[];
};

const DetailedProduct = (): JSX.Element => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [product, setProduct] = useState<Product | undefined>();
  const [selectedColor, setSelectedColor] = useState<Color | undefined>();
  const [selectedSize, setSelectedSize] = useState<string | undefined>();
  const [selectedImage, setSelectedImage] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      const productData = await getProduct(id);
      setProduct(productData);
    };
    fetchData();
  }, [id]);

  useEffect(() => {
    if (product && product.colors.length) {
      setSelectedColor(product.colors[0]);
    }
  }, [product]);

  useEffect(() => {
    if (selectedColor && selectedColor.sizes.length) {
      setSelectedSize(selectedColor.sizes[0]);
    }
  }, [selectedColor]);

  const handleColorSelect = (color: Color) => {
    setSelectedColor(color);
    setSelectedSize(undefined);
    setSelectedImage(0);
  };

  const handleSizeSelect = (size: string) => {
    setSelectedSize(size);
  };

  const handleImageSelect = (index: number) => {
    setSelectedImage(index);
  };

  const extractBackOrFront = (str: string): string => {
    const match = str.match(/back|front/);
    return match ? match[0] : '';
  };

  if (!product) {
    return <Loader />;
  }

  return (
    <section className={Style.Wrapper}>
      <button onClick={() => navigate(-1)}>Back</button>
      <h1>{product.name}</h1>
      <div className={Style.Colors}>
        {product.colors.map((color) => (
          <button
            key={color.id}
            onClick={() => handleColorSelect(color)}
            disabled={selectedColor && selectedColor.id === color.id}
          >
            {color.name}
          </button>
        ))}
      </div>
      {selectedColor && (
        <div>
          <img
            src={selectedColor.images[selectedImage]}
            alt={`${product.name} in ${selectedColor.name}`}
          />
          <div className={Style.Side}>
            {selectedColor.images.map((str, index) => (
              <button
                key={index}
                onClick={() => handleImageSelect(index)}
                disabled={selectedImage === index}
              >
                {extractBackOrFront(str)}
              </button>
            ))}
          </div>
          <div className={Style.Sizes}>
            {selectedColor.sizes.map((size) => (
              <button
                key={size}
                onClick={() => handleSizeSelect(size)}
                disabled={selectedSize === size}
              >
                {size}
              </button>
            ))}
          </div>
        </div>
      )}
      {selectedSize && <span className={Style.SelectedSize}>Selected size: {selectedSize}</span>}
    </section>
  );
};

export default DetailedProduct;
