import React, {
  useState,
  useCallback,
  useEffect,
  useRef,
  useMemo,
} from "react";
import routes from "../../routes";
import { Link } from "react-router-dom";
//  import {} from 'antd'
// import './HomePage.less'
// import  {log} from ''
interface Props {}

const HomePage: React.FC<Props> = (props) => {
  // const [loading, setLoading] = useState(false)
  return (
    <div className="HomePage">
      <h3>home page</h3>
      {routes.map((x) => {
        return (
          <Link to={x.path}>
            <div>{x?.name}</div>
          </Link>
        );
      })}
    </div>
  );
};

export default HomePage;
