import { useParams } from "react-router-dom";

import RES from "../../config/result";
import styles from "./DetailRecipePage.module.scss";

const DetailRecipePage = () => {
  const { id } = useParams();
  return (
    <div>
      {/*<div>{"newPage"}</div>*/}
      {"New page!"}
    </div>
  );
};

export default DetailRecipePage;
