import { Server } from "./class/Server.js";

const port: number = 3000;
const sv: Server   = new Server(port);

sv.addRoute("/", "GET", async(req, res) =>
{
    res.setStatus(200);
    res.send({
        message: 'test',
        alkohol: 'denaturat'
    });
});

sv.listen(() =>
{
    console.log(`API listening on http://localhost:${port}`);
});