interface KeyFactsCardProps {
  title?: string;
  facts: string[];
  accentColor?: string;
}

export default function KeyFactsCard({ title = "Key Facts", facts, accentColor = "#22c55e" }: KeyFactsCardProps) {
  return (
    <div className="bg-white border-2 border-black rounded-2xl p-5 shadow-sm">
      <div className="text-xs font-black uppercase tracking-widest text-gray-400 mb-4">{title}</div>
      <ul className="space-y-2.5">
        {facts.map((f, i) => (
          <li key={i} className="flex items-start gap-2.5">
            <span className="text-green-500 font-black mt-0.5 text-sm flex-shrink-0">✓</span>
            <span className="text-sm text-gray-700 leading-snug">{f}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
