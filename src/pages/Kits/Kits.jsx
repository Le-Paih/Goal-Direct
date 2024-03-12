import KitList from "./KitList";
import KitsIntro from "./KitsIntro";

function Kits({ kitData }) {
  return (
    <h1>
      <KitsIntro />
      <KitList kitData={kitData} />
    </h1>
  );
}

export default Kits;
