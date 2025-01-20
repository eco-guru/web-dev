import Color from "../../../const/color";
// import Th from "./th";

export default function Thead({children}) {
  return (
    <thead style={{ backgroundColor: Color.primary, color: "white" }}>
      {children}
    </thead>
  );
}
