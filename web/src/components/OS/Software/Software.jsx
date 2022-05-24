import Explorer from "./Explorer/Explorer";
import Browser from "./Browser/Browser";
import Calculator from "./Calculator/Calculator";
import ToDo from "./Todo/ToDo";

const Software = ({ task, rank }) => {
  switch (true) {
    case task.name === "explorer":
      return <Explorer rank={rank} name={task.name} />;
    case task.name === "browser":
      return <Browser rank={rank} name={task.name} />;
    case task.name === "calculator":
      return <Calculator rank={rank} name={task.name} />;
    case task.name[0] === "t":
      return <ToDo rank={rank} name={task.name} />;
    default:
      return <div></div>;
  }
};
export default Software;
