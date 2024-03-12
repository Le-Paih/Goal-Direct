import { useContext } from "react";
import styled from "styled-components";
import { CartContext } from "../../context/cartContext";
import CartItem from "./CartItem";
import { CgClose } from "react-icons/cg";
import Icons from "./Icons";
// import { useNavigate } from "react-router-dom";
// import { loadStripe } from "@stripe/stripe-js";

const CartWrapper = styled.div`
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  z-index: 9999;
  width: 400px;
  height: 100vh;
  /* margin-right: -400px; */
  background-color: white;
  backdrop-filter: blur(15px);
  right: ${({ showSidebar }) => (showSidebar ? "0" : "-400px")};
  transition: right 0.3s ease-in;

  overflow: scroll;
  overflow-x: hidden;

  /* @media (max-width: 390px) {
    width: 100vw;
    margin-left: 0;
  } */
  @media (max-width: 550px) {
    height: 100%;
    width: 100%;
    /* margin-right: 0; */
    /* margin-left: -350px; */
  }

  /* @media (max-width: 320px) {
    width: 100vw;
    right: ${({ showSidebar }) => (showSidebar ? "0" : "-100vw")};
  } */
`;

const EmptyDiv = styled.div`
  text-align: center;
  margin-top: 13rem;
`;

const EmptyClose = styled.button`
  color: white;
  background-color: black;
  border: 1px solid white;
  border-radius: 10px;
  padding: 10px 30px;

  &:hover {
    background-color: white;
    color: black;
    border: 1px solid black;
    transition: 0.25s ease-in-out;
  }
`;

const EmptyCart = styled.h1`
  text-align: center;
  margin-top: 4rem;
`;

const CartTop = styled.div``;

const SumBut = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;

const Summary = styled.h1`
  margin-left: 1rem;
`;

const CloseBtn = styled.button`
  margin-left: auto;
  margin-right: 1rem;
  font-size: 20px;
  background-color: white;
  border: none;
`;

const Top2 = styled.div`
  display: flex;
  flex-direction: column;
  padding: 0 1rem;
`;

const Subtotal = styled.h3`
  font-size: 15px;
  display: flex;

  & > span {
    margin-left: auto;
    /* margin-right: 1rem; */
  }
`;

const TopBtns = styled.div`
  /* display: grid;
  grid-template-columns: 49.5% 1% 49.5%; */
  display: flex;
  justify-content: center;
`;

const CheckoutNow = styled.button`
  color: white;
  background-color: black;
  border: 1px solid white;
  border-radius: 10px;
  width: 75%;
  padding: 15px;
`;

// const stripePromise = loadStripe(
//   "sk_test_51OqvJgRtAkJi9pdv2uG97jfoJt4o6P39syaivTOoJki9Uj4Y72Bfyt4C2VezO4bEMfmiJr5BTyFt4ucJ7gq5cPCo00UDZrqlUo"
// );

function Cart({ showSidebar, toggle }) {
  const { cartItems, getCartTotal } = useContext(CartContext);

  const totalQuantity = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  return (
    showSidebar && (
      <CartWrapper showSidebar={showSidebar}>
        {cartItems.length === 0 ? (
          <EmptyDiv>
            <EmptyCart>Your Cart is Empty</EmptyCart>
            <p>Keep shopping to find what you need!</p>
            <EmptyClose
              onClick={() => {
                toggle();
              }}
            >
              Close
            </EmptyClose>
          </EmptyDiv>
        ) : (
          <>
            <CartTop>
              <SumBut>
                <Summary>Cart ({totalQuantity})</Summary>
                <CloseBtn onClick={toggle}>
                  <CgClose />
                </CloseBtn>
              </SumBut>

              <Top2>
                <Subtotal>
                  Subtotal <span>£{getCartTotal()}</span>
                </Subtotal>
                <TopBtns>
                  <CheckoutNow>Checkout Now</CheckoutNow>
                </TopBtns>
              </Top2>
            </CartTop>
            <Icons />
            <CartItem />
          </>
        )}
      </CartWrapper>
    )
  );

  // return <Main>{cartItems.length === 0 && <div>Your cart is empty</div>}</Main>;
}

export default Cart;
