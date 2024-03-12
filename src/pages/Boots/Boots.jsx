// import BootCollage from "./BootCollage";
import BootList from "./BootList";
import BootsIntro from "./BootsIntro";

function Boots({ bootData }) {
  return (
    <div>
      <BootsIntro />
      <BootList bootData={bootData} />
    </div>
  );
}

export default Boots;
