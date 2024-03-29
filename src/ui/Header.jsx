import styled from "styled-components";

const StyledHeader = styled.header`
  background-color: var(--color-grey-0);
  padding: 1.2rem 4.8rem;
  border-bottom: 1px solid var(--color-grey-100);
  position: fixed;

  display: flex;
  gap: 2.4rem;
  align-items: center;
`;

function Header() {
  return (
    <StyledHeader>
      <button>Boots</button>
      <button>Kits</button>
      <button>Equipment</button>
    </StyledHeader>
  );
}

export default Header;
