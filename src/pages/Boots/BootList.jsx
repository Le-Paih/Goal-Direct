import BootCard from "./BootCard";
import { useSearchParams } from "react-router-dom";
import { GridDiv } from "../../styles/GridStyle";
import Pagination from "../../ui/Pagination";
import { PAGE_SIZE } from "../../../utils/constants";

import { useState } from "react";
import {
  MainDivList,
  SelectDiv,
  StyledOption,
  StyledSelect,
  TopMain,
} from "./BootListStyle";
import BrandSelect from "./BrandSelect";
// import SortBoots from "./SortBoots";

function BootList({ bootData }) {
  const [searchParams] = useSearchParams();
  const [sortBy, setSortBy] = useState("");

  if (!bootData) {
    return null;
  }

  const currentPage = !searchParams.get("page")
    ? 1
    : Number(searchParams.get("page"));

  const lastPostIndex = currentPage * PAGE_SIZE;
  const firstPostIndex = lastPostIndex - PAGE_SIZE;

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

  const sortedBootData = sortBootData(bootData);

  return (
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
        {sortedBootData.slice(firstPostIndex, lastPostIndex).map((boot) => {
          return (
            <BootCard
              key={boot.bootId}
              id={boot.bootId}
              image={boot.image.image1}
              name={boot.name}
              price={boot.price}
            />
          );
        })}
      </GridDiv>
      <Pagination count={bootData.length} />
    </MainDivList>
  );
}

export default BootList;
