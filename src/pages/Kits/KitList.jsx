import KitCard from "./KitCard";
import styled from "styled-components";
import { useSearchParams } from "react-router-dom";
import Pagination from "../../ui/Pagination";
import { PAGE_SIZE } from "../../../utils/constants";
import { useState } from "react";
import { GridDivKit, MainDivKit } from "./KitListStyle";
import { TopMain } from "../Boots/BootListStyle";
import LeagueSel from "./LeagueSel";

const SelectK = styled.div`
  display: flex;
  font-size: 16px;
  font-weight: 400;
  margin-left: auto;
  margin-right: 2rem;
  margin-top: auto;
  margin-bottom: auto;
  border-radius: 3px;

  @media (max-width: 700px) {
    margin-top: 15px;
    display: flex;
    margin-right: auto;
    margin-left: 2rem;
    justify-content: left;
    font-size: 14px;
  }
`;

const Selectk = styled.select`
  margin-left: 10px;
  border: none;
`;
const Optionk = styled.option`
  /* border: 0.1px solid var(--color-red-400); */
  border-radius: 15px;
  /* margin-left: 10px; */
`;

function KitList({ kitData }) {
  const [searchParams] = useSearchParams();
  const [sortBy, setSortBy] = useState("");

  if (!kitData) {
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

  function sortKitData(data) {
    if (sortBy === "lowest") {
      return data.sort((a, b) => a.price - b.price);
    } else if (sortBy === "highest") {
      return data.sort((a, b) => b.price - a.price);
    } else {
      return data;
    }
  }

  const sortedKitData = sortKitData(kitData);

  return (
    <MainDivKit>
      <TopMain>
        <LeagueSel />
        <SelectK>
          <label htmlFor="sortBy">Sort by: </label>
          <Selectk id="sortBy" value={sortBy} onChange={handleSortByChange}>
            <Optionk value="">-- Select --</Optionk>
            <Optionk value="lowest">Low to High</Optionk>
            <Optionk value="highest">High to Low</Optionk>
          </Selectk>
        </SelectK>
      </TopMain>
      <GridDivKit>
        {sortedKitData.slice(firstPostIndex, lastPostIndex).map((kit) => {
          return (
            <KitCard
              key={kit.kitId}
              id={kit.kitId}
              image={kit.image.image1}
              name={kit.name}
              price={kit.price}
            />
          );
        })}
      </GridDivKit>
      <Pagination count={kitData.length} />
    </MainDivKit>
  );
}

export default KitList;
