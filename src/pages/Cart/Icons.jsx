import { useContext } from "react";
import styled from "styled-components";
import { CartContext } from "../../context/cartContext";

const IconDiv = styled.div`
  width: 91.7%;
  display: flex;

  flex-wrap: wrap;
  margin-top: 1rem;
  margin-left: 1rem;
  margin-right: 1rem;
  justify-content: center;
`;

const Icon = styled.img`
  width: 30px;
  margin-left: 1rem;
  margin-right: 1rem;
`;

const KlarnaDiv = styled.div`
  width: 100%;
  margin: auto 2rem;
  /* margin-right: 4rem; */
  display: flex;
  flex-direction: row;
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
  font-size: 11px;
  margin-bottom: 5px;
  color: #202020;
`;
const KlText2 = styled.p`
  margin-top: 0px;
  font-size: 11px;
  color: #202020;
`;

function Icons() {
  const { getCartTotal } = useContext(CartContext);

  return (
    <>
      <IconDiv>
        <Icon src="/public/svg/american-express-svgrepo-com.svg" />
        <Icon src="/public/svg/apple-pay-svgrepo-com.svg" />
        <Icon src="/public/svg/jcb-svgrepo-com.svg" />
        <Icon src="/public/svg/cb-svgrepo-com.svg" />
        <Icon src="/public/svg/klarna-svgrepo-com.svg" />
        <Icon src="/public/svg/maestro-svgrepo-com.svg" />
        <Icon src="/public/svg/mastercard-svgrepo-com.svg" />
        <Icon src="/public/svg/paypal-svgrepo-com.svg" />
        <Icon src="/public/svg/visa-classic-svgrepo-com.svg" />
      </IconDiv>
      <KlarnaDiv>
        <KlIcon src="/public/svg/klarna-svgrepo-com.svg" />
        <KlTextDiv>
          <KlText>Make 3 payments of £{(getCartTotal() / 3).toFixed(2)}</KlText>
          <KlText2>18+, T&C apply, Credit subject to status</KlText2>
        </KlTextDiv>
      </KlarnaDiv>
    </>
  );
}

export default Icons;
