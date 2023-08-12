import Express from "express";
import { router as skinsRoutes } from "./skins/routes.js";
import bodyParser from "body-parser";
import cors from "cors";
const app = Express();
const port = 3000;
app.use(cors({
    origin: "*"
}));
app.use(bodyParser.json());
app.use('/api/v1/skins/', skinsRoutes);
app.listen(port, () => console.log(`Servidor rodando na porta ${port}`));
//# sourceMappingURL=server.js.map