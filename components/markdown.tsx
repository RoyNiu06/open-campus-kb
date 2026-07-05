export function SimpleMarkdown({ text }: { text: string }) {
  const lines = text.split(/\r?\n/);
  return (
    <div className="markdown">
      {lines.map((line, index) => {
        if (!line.trim()) return <br key={index} />;
        if (line.startsWith("- ")) return <p key={index}>• {line.slice(2)}</p>;
        return <p key={index}>{line}</p>;
      })}
    </div>
  );
}
