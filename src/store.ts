interface Cat {
  id: number;
  name: string;
}

// loading JSON cat storage
const data = require('./cats.json') as { cats: Cat[] };

export function findCatName(id: number): string | undefined {
  // filtering JSON data to find matching cat
  const matchingCat = data.cats.filter((cat) => cat.id === id)[0];
  // returning cat name if found
  const matchingCatName = matchingCat ? matchingCat.name : undefined;
  return matchingCatName;
}
