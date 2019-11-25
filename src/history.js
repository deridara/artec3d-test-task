import { createBrowserHistory } from "history";
import { homepage as basename } from "../package.json";

const history = createBrowserHistory({ basename });

export default history;
