import Typewriter2 from "../../../hooks/Typewriter/Typewriter2";
import "./catchphrase1.scss";

function Catchphrase1() {
  return (
    <>
      <div className="catchphrase1">
        <Typewriter2
          speed={50}
          text={`Je construis des sites comme on conçoit une maison \nAvec une base solide, des fondations bien pensées \nEt un design qui donne envie d’y rester`}
        ></Typewriter2>
      </div>
    </>
  );
}

export default Catchphrase1;
