export const mapMatrix = (map, mapFn) => {
  const mapped: any[] = [];
  
  for (let y = 0; y < map.length; y++) {
    mapped[y] = [];
    for (let x = 0; x < map[y].length; x++) {
        mapped[y][x] = mapFn(map[y][x], [x,y], map);
    }
  }

  return mapped;
}