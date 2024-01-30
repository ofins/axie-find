type SortOrder = 'asc' | 'desc';

export function customSortArray<T>(arr: T[], sortOrder: SortOrder = 'asc'): T[] {
  return arr.slice().sort((a, b) => {
    if (sortOrder === 'asc') {
      // Ascending order
      if (a < b) return -1;
      if (a > b) return 1;
      return 0;
    } else {
      // Descending order
      if (a > b) return -1;
      if (a < b) return 1;
      return 0;
    }
  });
}