
export const DEFAULT_COLORS = ['#FF0000','#FFCC00','#FFFF00', '#00AA00', '#00AACC', '#00CCEE', '#FF00FF'];

export function randomColor(){
  return DEFAULT_COLORS[Math.round(Math.random() * (DEFAULT_COLORS.length - 1))];
}

export function parseHex(color: string) {
  return [
    parseInt(color.substring(1, 3), 16),
    parseInt(color.substring(3, 5), 16),
    parseInt(color.substring(5, 7), 16)
  ]
}

export function isDark(color: string) {
  const colors = parseHex(color).map((col: number) => {
    col /= 255;
    return (col <= 0.03928) ? (col / 12.92) : Math.pow((col + 0.055) / 1.055, 2.4);
  });
  var luminance = (0.2126 * colors[0]) + (0.7152 * colors[1]) + (0.0722 * colors[2]);
  return (luminance <= 0.179);
}
