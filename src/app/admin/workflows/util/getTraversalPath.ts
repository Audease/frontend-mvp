export function getTraversalPath(rows, cols) {
  let path = [];
  for (let r = 0; r < rows; r++) {
    if (r % 2 === 0) {
      // Even row: left to right
      for (let c = 0; c < cols; c++) {
        path.push({ row: r, col: c, index: r * cols + c });
      }
    } else {
      // Odd row: right to left
      for (let c = cols - 1; c >= 0; c--) {
        path.push({ row: r, col: c, index: r * cols + c });
      }
    }
  }
  return path;
}