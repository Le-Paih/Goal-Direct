import { useState } from "react";
import KitsIntro from "./KitsIntro";
import { GridDivKit, MainDivKit } from "./KitListStyle";
import KitCard from "./KitCard";
import {
  SelectDiv,
  StyledOption,
  StyledSelect,
  TopMain,
} from "../Boots/BootListStyle";
import LeagueSel from "./LeagueSel";

function SerieA({ kitData }) {
  const serieA = kitData.filter((kit) => kit.league === "Serie A");
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

  const sortedKitData = sortBootData(serieA);
  return (
    <>
      <KitsIntro />
      <MainDivKit>
        <TopMain>
          <LeagueSel />
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
        <GridDivKit>
          {sortedKitData.map((kit, index) => {
            return (
              <KitCard
                key={index}
                id={kit.kitId}
                image={kit.image.image1}
                name={kit.name}
                price={kit.price}
              />
            );
          })}
        </GridDivKit>
      </MainDivKit>
    </>
  );
}

export default SerieA;
