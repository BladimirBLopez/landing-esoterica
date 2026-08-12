export default function SeparadorSeccion({ color = "#c9a24b" }: { color?: string }) {
  return (
    <div className="relative z-10 flex items-center justify-center py-6">
      <div className="flex items-center gap-4 opacity-90">
        <span
          className="h-px w-16 sm:w-24"
          style={{ background: `linear-gradient(to right, transparent, ${color})` }}
        />
        <span
          className="text-2xl"
          style={{ color, textShadow: `0 0 14px ${color}99` }}
        >
          ✦
        </span>
        <span
          className="h-px w-16 sm:w-24"
          style={{ background: `linear-gradient(to left, transparent, ${color})` }}
        />
      </div>
    </div>
  );
}
