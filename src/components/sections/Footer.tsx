export default function Footer() {
  return (
    <footer className="bg-forest-dark text-cream/40 py-12">
      <div className="px-6 md:px-12 lg:px-20 max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start gap-8">
          <div>
            <p className="font-mono text-xs tracking-widest uppercase text-cream/60 mb-2">
              Precision Agriculture in the Brazilian Soybean Industry
            </p>
            <p className="text-sm">
              LSE100 Research Project &middot; London School of Economics and
              Political Science
            </p>
            <p className="text-sm mt-1">
              Supported by Legacy Futures Philanthropists
            </p>
          </div>

          <div className="text-right">
            <p className="font-mono text-xs tracking-widest text-cream/60 mb-2">
              03.2025
            </p>
            <p className="text-sm">
              40+ academic &amp; industry sources
            </p>
            <p className="text-sm mt-1">
              Full bibliography available upon request
            </p>
          </div>
        </div>

        <div className="mt-8 pt-6 border-t border-cream/10 text-center text-xs text-cream/30">
          Research Intelligence Report &middot; Student Showcase Edition
        </div>
      </div>
    </footer>
  );
}
