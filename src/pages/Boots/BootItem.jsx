import { useParams } from "react-router-dom";
import { CartContext } from "../../context/cartContext";
import React, { useState, useContext } from "react";
import { v4 as uuidv4 } from "uuid";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import SizeSquare from "./SizeSquare";
import {
  ATCBTN,
  AccDiv,
  BootName,
  ColorWay,
  DesDiv,
  DesTitle,
  Description,
  Img,
  LeftDiv,
  MainDiv,
  Price,
  RightDiv,
  SecondDiv,
  SelectText,
  SizeDiv,
} from "./BootItemStyles";
import styled from "styled-components";

import Accordion2 from "../../ui/Accordion2";

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

function BootItem({ bootData }) {
  const { bootId } = useParams();
  const [selectedSize, setSelectedSize] = useState(null);
  const slider = React.useRef(null);
  const { addToCart } = useContext(CartContext);
  const uniqueId = uuidv4();

  const boot = bootData.find((boot) => boot.bootId === parseInt(bootId));

  function handleSizeClick(size) {
    setSelectedSize(size === selectedSize ? null : size);
  }

  if (!boot) {
    return <div>Boot not found</div>;
  }

  const isSizeSelected = selectedSize !== null;

  const sizeSquares = Object.keys(boot.size).map((size) => (
    <SizeSquare
      key={size}
      size={size}
      available={boot.size[size]}
      selected={size === selectedSize}
      onClick={() => handleSizeClick(size)}
    ></SizeSquare>
  ));

  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 250,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  return (
    <>
      <MainDiv>
        <LeftDiv>
          <Slider ref={slider} {...sliderSettings}>
            {Object.values(boot.image).map((image, index) => (
              <div key={index}>
                <Img src={image} alt={`Boot ${index + 1}`} />
              </div>
            ))}
          </Slider>
        </LeftDiv>
        <RightDiv>
          <BootName>{boot.name}</BootName>
          <ColorWay>{boot.colorway}</ColorWay>
          <Price>£{boot.price}.00</Price>
          <SelectText>Select a size (UK)</SelectText>
          <SizeDiv>{sizeSquares}</SizeDiv>
          <ATCBTN
            disabled={!isSizeSelected}
            onClick={() => addToCart({ ...boot, id: uniqueId }, selectedSize)}
          >
            Add to cart
          </ATCBTN>
          <KlarnaDiv>
            <KlIcon src="/svg/klarna-svgrepo-com.svg" />
            <KlTextDiv>
              <KlText>Make 3 payments of £{(boot.price / 3).toFixed(2)}</KlText>
              <KlText2>18+, T&C apply, Credit subject to status</KlText2>
            </KlTextDiv>
          </KlarnaDiv>
        </RightDiv>
      </MainDiv>
      <SecondDiv>
        <DesDiv>
          <DesTitle>{boot.name}</DesTitle>
          <Description
            dangerouslySetInnerHTML={{ __html: boot.description }}
          ></Description>
        </DesDiv>
        <AccDiv>
          <Accordion2 />
        </AccDiv>
      </SecondDiv>
    </>
  );
}

export default BootItem;
