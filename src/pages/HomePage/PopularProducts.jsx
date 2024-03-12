import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import popular from "./../../../public/data/items.json";
import Product from "./Product";
import styled from "styled-components";

const PopTitle = styled.h1`
  text-align: center;
  margin: 2rem;
  margin-bottom: -0.5rem;
  font-size: 35px;
  font-weight: 700;
`;

const product = popular.map((pop) => (
  <Product
    key={pop.id}
    name={pop.bootName}
    img={pop.image.image1}
    price={pop.price}
    popular={pop.popular}
    brand={pop.brand}
    id={pop.id}
  />
));

function PopularProducts() {
  const responsive = {
    superLargeDesktop: {
      // the naming can be any, depends on you.
      breakpoint: { max: 4000, min: 1024 },
      items: 4,
    },
    desktop: {
      breakpoint: { max: 1024, min: 800 },
      items: 3,
    },
    tablet: {
      breakpoint: { max: 800, min: 464 },
      items: 2,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
    },
  };

  return (
    <div>
      <PopTitle>Popular Products</PopTitle>
      <Carousel responsive={responsive}>{product}</Carousel>
    </div>
  );
}

export default PopularProducts;
