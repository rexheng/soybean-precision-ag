export default function SectionLabel({
  number,
  title,
}: {
  number: string;
  title: string;
}) {
  return (
    <div className="flex items-center gap-4 mb-8">
      <span className="font-mono text-xs tracking-widest text-soybean">
        {number}
      </span>
      <div className="h-px flex-1 bg-forest/20" />
      <span className="font-mono text-xs tracking-widest uppercase text-text-light">
        {title}
      </span>
    </div>
  );
}
