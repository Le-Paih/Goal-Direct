import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const LeagueSelector = styled.div`
  display: flex;
  margin-left: 2rem;
  flex-direction: row;
  justify-content: center;

  @media (max-width: 600px) {
    flex-direction: column;
    justify-content: left;
    width: 84%;
    margin-left: 2rem;
  }
`;

const MobileDiv = styled.div`
  display: flex;
  @media (max-width: 600px) {
    justify-content: center;

    &:nth-child(2) {
      margin-top: 15px;
    }
  }
`;

const LeagueBtn = styled.p`
  /* border: 1px solid var(--color-red-500);
  border-radius: 15px; */
  background-color: white;
  font-weight: 600;
  font-size: 16px;
  padding: 8px;
  margin: auto;
  margin-right: 5px;
  cursor: pointer;

  &:hover {
    color: var(--color-red-500);
  }

  @media (max-width: 400px) {
    font-size: 12px;
    margin: 0;
  }
`;

function LeagueSel() {
  const navigate = useNavigate();

  return (
    <LeagueSelector>
      <MobileDiv>
        <LeagueBtn onClick={() => navigate("/kits")}>All</LeagueBtn>
        <LeagueBtn onClick={() => navigate("/kits/premierleague")}>
          Premier League
        </LeagueBtn>
        <LeagueBtn onClick={() => navigate("/kits/Ligue1")}>Ligue 1</LeagueBtn>
        <LeagueBtn onClick={() => navigate("/kits/laliga")}>La Liga</LeagueBtn>
      </MobileDiv>
      <MobileDiv>
        <LeagueBtn onClick={() => navigate("/kits/Seriea")}>Serie A</LeagueBtn>
        <LeagueBtn onClick={() => navigate("/kits/mls")}>MLS</LeagueBtn>
        <LeagueBtn onClick={() => navigate("/kits/international")}>
          International
        </LeagueBtn>
      </MobileDiv>
    </LeagueSelector>
  );
}

export default LeagueSel;
