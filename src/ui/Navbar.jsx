import { FaShoppingCart } from "react-icons/fa";
import { MdClose } from "react-icons/md";
import { RxHamburgerMenu } from "react-icons/rx";

import {
  CartNum,
  LeftContainer,
  Logo,
  NavbarBtn,
  NavbarContainer,
  NavbarExtendedContainer,
  NavbarInnerContainer,
  NavbarLink,
  NavbarLinkExtended,
  OpenLinksButton,
  RightContainer,
} from "./NavbarStyles";
import { useContext, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { CartContext } from "../context/cartContext";
import Cart from "../pages/Cart/Cart";

function Navbar() {
  const [extendNavbar, setExtendNavbar] = useState(false);
  const navigate = useNavigate();
  const navbarRef = useRef(null);
  const [showSidebar, setShowSidebar] = useState(false);
  const { cartItems } = useContext(CartContext);

  const totalQuantity = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  function toggleSidebar() {
    setShowSidebar((prevState) => !prevState);
    document.body.style.overflow = showSidebar ? "auto" : "hidden";
  }

  function handleLinkClick() {
    setExtendNavbar(false);
  }

  const src = "/src/photos/Pre-logo.svg";

  return (
    <div>
      <NavbarContainer
        extendNavbar={extendNavbar}
        ref={navbarRef}
        showSidebar={showSidebar}
      >
        <NavbarInnerContainer>
          <LeftContainer>
            <OpenLinksButton onClick={() => setExtendNavbar((curr) => !curr)}>
              {extendNavbar ? <MdClose /> : <RxHamburgerMenu />}
            </OpenLinksButton>
            <Logo
              src={src}
              onClick={() => !showSidebar && navigate("/")}
              alt="Logo"
              style={{ pointerEvents: showSidebar ? "none" : "auto" }}
              showSidebar={showSidebar}
            />
          </LeftContainer>
          <RightContainer>
            <NavbarLink to="/">Homepage</NavbarLink>
            <NavbarLink to="/boots">Boots</NavbarLink>
            <NavbarLink to="/kits">Kits</NavbarLink>
            <NavbarBtn onClick={toggleSidebar}>
              <FaShoppingCart />
              <CartNum>{totalQuantity || ""}</CartNum>
            </NavbarBtn>

            <Cart onClick={toggleSidebar} />
          </RightContainer>
        </NavbarInnerContainer>
        {extendNavbar && (
          <NavbarExtendedContainer>
            <NavbarLinkExtended to="/" onClick={handleLinkClick}>
              Homepage
            </NavbarLinkExtended>
            <NavbarLinkExtended to="/boots" onClick={handleLinkClick}>
              Boots
            </NavbarLinkExtended>
            <NavbarLinkExtended to="/kits" onClick={handleLinkClick}>
              Kits
            </NavbarLinkExtended>
          </NavbarExtendedContainer>
        )}
      </NavbarContainer>
      {showSidebar && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            zIndex: 1000,
          }}
          onClick={toggleSidebar}
        />
      )}
      {showSidebar && <Cart showSidebar={showSidebar} toggle={toggleSidebar} />}
    </div>
  );
}

export default Navbar;
