export function Logo({ className = "" }: { className?: string }) {
  return (
    <span className={`inline-flex items-center gap-2 ${className}`}>
      <svg aria-hidden="true" viewBox="0 0 28 20" className="h-4 w-auto" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <path d="M14 7V5.2a2.2 2.2 0 1 1 2.2-2.2" />
        <path d="M14 7 2.5 15.2c-.9.7-.4 2.1.7 2.1h21.6c1.1 0 1.6-1.4.7-2.1L14 7Z" />
      </svg>
      <span className="text-[15px] font-semibold tracking-[0.18em] uppercase">RayShop</span>
    </span>
  );
}
