import express, {Request, Response, Application} from 'express';
import { findCat } from './store';

const app : Application = express();
const PORT = process.env.PORT || 3000;

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
    const matchingCat = findCat(id);
    
    matchingCat ? res.send({name: matchingCat.name }) : res.status(404).send();
  });

app.listen(PORT, () : void => {
    console.log(`Server Running on https://localhost:${PORT}`);
});