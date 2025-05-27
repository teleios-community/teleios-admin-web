interface CustomTickProps {
  x: number;
  y: number;
  payload: {
    value: string | number;
  };
}

export const renderCustomAxisTick = ({ x, y, payload }: CustomTickProps) => {
  const maxCharsPerLine = 12;
  const rawWords = String(payload.value).split(/[\s-]/); // ensure it's a string

  const lines: string[] = [];

  rawWords.forEach((word) => {
    if (word.length <= maxCharsPerLine) {
      lines.push(capitalize(word));
    } else {
      for (let i = 0; i < word.length; i += maxCharsPerLine) {
        lines.push(capitalize(word.slice(i, i + maxCharsPerLine)));
      }
    }
  });

  return (
    <g transform={`translate(${x},${y + 10})`}>
      {lines.map((line, index) => (
        <text
          key={index}
          x={0}
          y={index * 12}
          textAnchor='middle'
          fontSize={10}
          fill='#999999'
        >
          {line}
        </text>
      ))}
    </g>
  );
};

const capitalize = (str: string) =>
  str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();

export const colors = [
  '#154B82',
  '#EEB815BB',
  '#218838',
  '#8884d8',
  '#82ca9d',
  '#ffc658',
  '#ff7f50',
  '#a28bd4',
];
