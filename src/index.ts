
import express, {Request, Response, Application} from 'express';

const app : Application = express();
const PORT = process.env.PORT || 3000;

interface Cat {
  id: number;
  name: string;
}

// loading JSON cat storage
const data = require("./cats.json") as { cats: Cat[] };

// base url
app.get("/", (req: Request, res: Response) : void => {
    res.status(404).send();
  });

app.get("/ping", (req: Request, res: Response) : void => {
    res.send("pong");
  });

// returning cats based on their id
app.get("/cats/:id", (req: Request, res: Response) : void => {
    let id: number = parseInt(req.params.id)

    // filtering JSON data to find matching cat
    const matchingCat = data.cats.filter(cat => cat.id === id)[0];

    const mactchingCatName = {name: matchingCat.name};
  
    matchingCat ? res.send(mactchingCatName) : res.status(404).send();
  });

app.listen(PORT, () : void => {
    console.log(`Server Running on https://localhost:${PORT}`);
});