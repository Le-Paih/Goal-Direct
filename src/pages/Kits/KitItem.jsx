import { useContext, useState } from "react";
import { useParams } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import styled from "styled-components";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import SizeSquareKit from "./SizeSquareKit";
import { CartContext } from "../../context/cartContext";
import Accordion2 from "../../ui/Accordion2";

const MainDiv = styled.div`
  margin: 8rem 4rem;
  display: grid;
  grid-template-columns: 50% 50%;

  @media (max-width: 950px) {
    margin: 7rem 3rem;
    display: flex;
    flex-direction: column;
  }
`;

const LeftDiv = styled.div`
  /* display: flex;
  flex-basis: 100%; */
`;

const Img = styled.img`
  /* width: 20rem; */
  align-items: center;
  justify-content: center;
  height: 26em;
  object-fit: cover;
  /* @media (max-width: 550px) {
    width: 21rem;
    height: 21em;
    object-fit: cover;
  } */
  @media (min-width: 300px) and (max-width: 350px) {
    width: 15rem;
    height: 15em;
    object-fit: cover;
  }
  @media (min-width: 351px) and (max-width: 400px) {
    width: 17rem;
    height: 19em;
    object-fit: cover;
  }
  @media (min-width: 401px) and (max-width: 450px) {
    width: 20rem;
    height: 19em;
    object-fit: cover;
  }
  @media (min-width: 451px) and (max-width: 500px) {
    width: 22rem;
    height: 21em;
    object-fit: cover;
  }
  @media (min-width: 501px) and (max-width: 550px) {
    width: 24rem;
    height: 23em;
    object-fit: cover;
  }
`;

const SliderWrapper = styled.div`
  width: 26rem;
  margin: 0 auto;

  .slick-prev:before,
  .slick-next:before {
    color: var(--color-red-600);
  }

  @media (max-width: 550px) {
    width: 100%;

    .slick-prev:before,
    .slick-next:before {
      display: none;
    }
  }
`;

const RightDiv = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 6rem;

  @media (max-width: 950px) {
    margin-left: 0;
    margin-top: 2rem;
  }
`;

const KitName = styled.h1`
  font-size: 26px;
  font-weight: 900;
  margin-bottom: 0;
`;

const ColorWay = styled.h4`
  margin-top: 10px;
  color: #767676;
  font-size: 13px;
  font-weight: 500;
`;

const Price = styled.p`
  font-weight: 800;
  font-size: 18px;
  margin-top: 10px;
`;

const SizeDiv = styled.div`
  display: grid;
  grid-template-columns: auto auto auto auto auto auto;
  width: 75%;

  @media (max-width: 950px) {
    width: 100%;
    grid-template-columns: auto auto auto;
  }
`;

const SelectText = styled.h3`
  font-size: 18px;
  font-weight: 700;
`;

const ATCBTN = styled.button`
  margin-top: 2rem;
  margin-bottom: 0;
  padding: 10px 5px;
  width: 75%;

  border: none;
  border-radius: 5px;
  background-color: black;
  color: white;
  font-weight: 500;
  font-size: 18px;
  transition: all 0.5s;

  &:disabled {
    background-color: #737373;
    cursor: not-allowed;
  }

  @media (max-width: 950px) {
    width: 100%;
  }
`;

const KlarnaDiv = styled.div`
  display: flex;
  flex-direction: row;
  margin-top: 1rem;
  /* margin-left: 1rem; */
`;

const KlIcon = styled.img`
  width: 55px;
`;

const KlTextDiv = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 1rem;
  /* margin-top: 1rem; */
`;

const KlText = styled.p`
  margin-top: 15px;
  font-size: 13px;
  margin-bottom: 5px;
  color: #202020;
`;

const KlText2 = styled.p`
  margin-top: 0px;
  font-size: 13px;
  color: #202020;
`;

export const SecondDiv = styled.div`
  margin: auto 4rem;
  margin-top: -5rem;
  margin-bottom: 4rem;
  display: grid;
  grid-template-columns: 50% 50%;

  /* @media (max-width: 550px) {
    margin: 1rem 1rem;
    display: flex;
    flex-direction: column;
  } */
  @media (max-width: 699px) {
    margin: 1rem 1rem;
    display: flex;
    margin-top: -6rem;
    flex-direction: column;
  }
  @media (min-width: 700px) and (max-width: 950px) {
    margin: 2rem 2rem;
    margin-top: -6rem;
    display: flex;
    flex-direction: column;
  }
`;

export const DesTitle = styled.h1`
  padding-left: 1rem;
  font-weight: 700;
  margin-bottom: 0;
  font-size: 25px;
  /* font-style: normal; */
`;

export const DesDiv = styled.div`
  /* padding: 1rem; */
  margin-right: 1rem;
  width: 100%;
`;

export const Description = styled.p`
  padding-left: 1rem;
  padding-right: 1rem;
  font-size: 13px;
  font-weight: 400;
  /* letter-spacing: 0.1px; */
  line-height: 19px;
`;

export const AccDiv = styled.div`
  margin-left: 4rem;

  @media (max-width: 950px) {
    margin-left: 1rem;
    width: 94%;
  }
`;

function KitItem({ kitData }) {
  const { kitId } = useParams();
  const [selectedSize, setSelectedSize] = useState(null);
  const { addToCart } = useContext(CartContext);
  const uniqueId = uuidv4();

  const kit = kitData.find((kit) => kit.kitId === parseInt(kitId));

  function handleSizeClick(size) {
    setSelectedSize(size === selectedSize ? null : size);
  }

  if (!kit) {
    return <div>Kit not found</div>;
  }

  const isSizeSelected = selectedSize !== null;

  const sizeSquares = Object.keys(kit.size).map((size) => (
    <SizeSquareKit
      key={size}
      size={size}
      available={kit.size[size]}
      selected={size === selectedSize}
      onClick={handleSizeClick}
    ></SizeSquareKit>
  ));

  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    centerMode: true,
    centerPadding: "0",
  };

  return (
    <>
      <MainDiv>
        <LeftDiv>
          <SliderWrapper>
            <Slider {...sliderSettings}>
              {Object.values(kit.image).map((image, index) => (
                <div key={index}>
                  <Img src={image} alt={`Kit ${index + 1}`} />
                </div>
              ))}
            </Slider>
          </SliderWrapper>
        </LeftDiv>
        <RightDiv>
          <KitName>{kit.name}</KitName>
          <ColorWay>{kit.colorway}</ColorWay>
          <Price>Price: £{kit.price}.00</Price>
          <SelectText>Select a size</SelectText>
          <SizeDiv>{sizeSquares}</SizeDiv>
          <ATCBTN
            disabled={!isSizeSelected}
            onClick={() => addToCart({ ...kit, id: uniqueId }, selectedSize)}
          >
            Add to cart
          </ATCBTN>
          <KlarnaDiv>
            <KlIcon src="/public/svg/klarna-svgrepo-com.svg" />
            <KlTextDiv>
              <KlText>Make 3 payments of £{(kit.price / 3).toFixed(2)}</KlText>
              <KlText2>18+, T&C apply, Credit subject to status</KlText2>
            </KlTextDiv>
          </KlarnaDiv>
        </RightDiv>
      </MainDiv>
      <SecondDiv>
        <DesDiv>
          <DesTitle>{kit.name}</DesTitle>
          <Description
            dangerouslySetInnerHTML={{ __html: kit.description }}
          ></Description>
        </DesDiv>
        <AccDiv>
          <Accordion2 />
        </AccDiv>
      </SecondDiv>
    </>
  );
}

export default KitItem;
