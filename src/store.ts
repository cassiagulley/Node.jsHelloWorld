import data from './cats.json';
interface Cat {
  id: number;
  name: string;
}

// loading JSON cat storage
const cats = data.cats as Cat[];

export function findCatName(id: number): string | undefined {
  // filtering JSON data to find matching cat
  const matchingCat = cats.filter((cat) => cat.id === id)[0];
  // returning cat name if found
  const matchingCatName = matchingCat ? matchingCat.name : undefined;
  return matchingCatName;
}
