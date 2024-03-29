import { useState } from "react";

function AccordionContent({ title, content }) {
  const [isActive, setIsActive] = useState(false);
  return (
    <div>
      <div onClick={() => setIsActive(!isActive)}>
        <div>{title}</div>
        <div>{isActive ? "-" : "+"}</div>
      </div>
      {isActive && <div>{content}</div>}
    </div>
  );
}

export default AccordionContent;
