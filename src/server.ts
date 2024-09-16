import { App } from "./app";
import { AuthRoute } from "./routes/auth.route";
import { RelationshipRoute } from "./routes/relationship.route";
import { UserRoute } from "./routes/user.route";

const app = new App([new AuthRoute(), new UserRoute(), new RelationshipRoute()]);
app.listen()