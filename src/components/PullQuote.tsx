export default function PullQuote({
  quote,
  source,
}: {
  quote: string;
  source?: string;
}) {
  return (
    <blockquote className="border-l-4 border-soybean pl-6 py-4 my-12">
      <p className="text-xl md:text-2xl font-light italic text-forest leading-relaxed">
        {quote}
      </p>
      {source && (
        <cite className="block mt-3 font-mono text-xs tracking-wider text-text-light not-italic">
          — {source}
        </cite>
      )}
    </blockquote>
  );
}
