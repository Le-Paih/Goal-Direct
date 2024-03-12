import { useState } from "react";
import { GridDiv } from "../../styles/GridStyle";
import BootCard from "./BootCard";
import {
  MainDivList,
  SelectDiv,
  StyledOption,
  StyledSelect,
  TopMain,
} from "./BootListStyle";
import BootsIntro from "./BootsIntro";
import BrandSelect from "./BrandSelect";

function PumaBoot({ bootData }) {
  const pumaBoots = bootData.filter((boot) => boot.brand === "puma");
  const [sortBy, setSortBy] = useState("");

  function handleSortByChange(e) {
    setSortBy(e.target.value);
  }

  function sortBootData(data) {
    if (sortBy === "lowest") {
      return data.sort((a, b) => a.price - b.price);
    } else if (sortBy === "highest") {
      return data.sort((a, b) => b.price - a.price);
    } else {
      return data;
    }
  }

  const sortedBootData = sortBootData(pumaBoots);

  return (
    <>
      <BootsIntro />
      <MainDivList>
        <TopMain>
          <BrandSelect />
          <SelectDiv>
            <label htmlFor="sortBy">Sort by: </label>
            <StyledSelect
              id="sortBy"
              value={sortBy}
              onChange={handleSortByChange}
            >
              <StyledOption value="">-- Select --</StyledOption>
              <StyledOption value="lowest">Low to High</StyledOption>
              <StyledOption value="highest">High to Low</StyledOption>
            </StyledSelect>
          </SelectDiv>
        </TopMain>
        <GridDiv>
          {sortedBootData.map((boot, index) => (
            <BootCard
              key={index}
              id={boot.bootId}
              image={boot.image.image1}
              name={boot.name}
              price={boot.price}
            />
          ))}
        </GridDiv>
      </MainDivList>
    </>
  );
}

export default PumaBoot;
