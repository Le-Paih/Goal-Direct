import styled from "styled-components";

const SelectDiv = styled.div`
  display: flex;
  margin-top: auto;
  margin-bottom: auto;
  /* margin-left: 10rem; */
  margin-right: 4rem;
  /* margin-bottom: 2rem; */
  border-radius: 3px;
`;

const StyledSelect = styled.select`
  margin-left: 10px;
  border: none;
`;

const StyledOption = styled.option`
  border-radius: 15px;
`;

function SortBoots({}) {
  return (
    <SelectDiv>
      <label htmlFor="sortBy">Sort by: </label>
      <StyledSelect id="sortBy" value={sortBy} onChange={handleSortByChange}>
        <StyledOption value="">-- Select --</StyledOption>
        <StyledOption value="lowest">Low to High</StyledOption>
        <StyledOption value="highest">High to Low</StyledOption>
      </StyledSelect>
    </SelectDiv>
  );
}

export default SortBoots;
