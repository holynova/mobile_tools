import "./App.css";

import { createBrowserRouter, RouterProvider } from "react-router-dom";
import routes from "./routes";

interface Props {}

const router = createBrowserRouter(routes);

const App: React.FC<Props> = (props) => {
  // const [loading, setLoading] = useState(false)r
  return (
    <div className="App">
      <RouterProvider router={router} />
    </div>
  );
};

export default App;
