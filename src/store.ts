interface Cat {
  id: number;
  name: string;
}

// loading JSON cat storage
const data = require('./cats.json') as { cats: Cat[] };

export function findCat(id: number): Cat | undefined {
  return data.cats.filter((cat) => cat.id === id)[0];
}
