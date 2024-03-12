import { useContext } from "react";
import { CartContext } from "../../context/cartContext";
import styled from "styled-components";

const CartDiv = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 1rem;
  margin-bottom: 2rem;
`;

const ItemDiv = styled.div`
  display: grid;
  grid-template-columns: 30% 70%;
  padding: 0 1rem;
  border-bottom: 1px solid var(--color-grey-200);
  border-top: 1px solid var(--color-grey-200);
  /* margin-bottom: -2rem; */
`;

const ImgDiv = styled.div`
  margin: auto;
  padding-top: 0.5rem;
  margin-right: -20px;
  margin-top: 3px;
`;

const Img = styled.img`
  width: 100%;
  /* height: 4rem; */
  object-fit: cover;
`;

const DetailDiv = styled.div`
  margin-left: 2rem;
`;

const Detail2 = styled.div`
  font-size: 12px;
  padding: 0;
  margin-top: -10px;
  display: flex;
  flex-direction: row;
`;

const QuanP = styled.p`
  font-size: 12px;
  font-weight: 600;

  & > span {
    margin-left: 5px;
  }
`;

const ItemName = styled.h1`
  font-size: 12px;
  margin-top: 10px;
`;

const Price = styled.p`
  font-size: 15px;
  font-weight: 700;
`;

const Size = styled.h3`
  margin-top: -5px;
  font-size: 13px;
`;

const OuterSpan = styled.span`
  color: #767676;
  margin-left: 5px;
`;
const InnerSpan = styled.span`
  color: #767676;
  margin-left: 3px;
`;

const Delete = styled.p`
  border: none;
  background-color: white;
  color: #2e71c4;
  cursor: pointer;
  margin-left: 1rem;
`;

function CartItem() {
  const { cartItems, removeFromCart } = useContext(CartContext);

  // Function to group items by name and size and aggregate their quantities
  const groupedItems = cartItems.reduce((acc, item) => {
    const key = `${item.name}_${item.size}`; // Create a key based on item name and size
    if (!acc[key]) {
      acc[key] = { ...item, quantity: 0 }; // Initialize grouped item with quantity 0
    }
    acc[key].quantity += item.quantity; // Aggregate quantity
    return acc;
  }, {});

  return (
    <CartDiv>
      {Object.values(groupedItems).map((groupedItem, index) => (
        <ItemDiv key={index}>
          <ImgDiv>
            <Img src={groupedItem.image.image1} alt={groupedItem.name} />
          </ImgDiv>
          <DetailDiv>
            <div>
              <ItemName>{groupedItem.name}</ItemName>
              <Price>£{groupedItem.price}</Price>
              <Size>
                Size:{" "}
                <OuterSpan>
                  UK <InnerSpan>{groupedItem.size}</InnerSpan>
                </OuterSpan>
              </Size>
            </div>
            <Detail2>
              <QuanP>
                Quantity: <span>{groupedItem.quantity}</span>
              </QuanP>
              <Delete onClick={() => removeFromCart(groupedItem)}>
                Delete
              </Delete>
            </Detail2>
          </DetailDiv>
        </ItemDiv>
      ))}
    </CartDiv>
  );
}

export default CartItem;
