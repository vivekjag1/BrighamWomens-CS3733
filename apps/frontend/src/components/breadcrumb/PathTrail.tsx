import Breadcrumb from "./Breadcrumb.tsx";
import DoubleArrowIcon from "@mui/icons-material/DoubleArrow";

interface pathTrailProps {
  floorSequence: number[];
}

function PathTrail(props: pathTrailProps) {
  const floorSequenceElements = props.floorSequence.map((floor) => (
    <p>
      {floor}
      <DoubleArrowIcon />
    </p>
  ));

  return <Breadcrumb>{floorSequenceElements}</Breadcrumb>;
}

export default PathTrail;
