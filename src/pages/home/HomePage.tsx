import React, {
  useState,
  useCallback,
  useEffect,
  useRef,
  useMemo,
} from "react";
import routes from "../../routes";
import { Link } from "react-router-dom";
import CSS from "csstype";
//  import {} from 'antd'
// import './HomePage.less'
// import  {log} from ''
interface Props {}

const HomePage: React.FC<Props> = (props) => {
  // const [loading, setLoading] = useState(false)
  return (
    <div className="HomePage">
      {/* <h3 style={styles.title}>home page</h3> */}
      {routes.map((x) => {
        return (
          <Link to={x.path} style={styles.linkRow}>
            <div>{x?.name}</div>
          </Link>
        );
      })}
    </div>
  );
};

const styles: Record<string, CSS.Properties> = {
  title: {},
  linkRow: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    fontSize: "24px",
    lineHeight: 2,
  },
};

export default HomePage;
