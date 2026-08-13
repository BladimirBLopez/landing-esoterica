path = "components/SeccionHoroscopo.tsx"
with open(path, "r") as f:
    content = f.read()

old = '''      <div className="pointer-events-none absolute inset-x-0 top-0 z-10 h-64 bg-gradient-to-b from-[#1a0505] via-[#1a0505]/50 to-transparent" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 z-10 h-40 bg-gradient-to-b from-transparent to-[#1a0f30]" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 z-20 flex items-center justify-center pb-2">
        <div className="flex items-center gap-3 opacity-80">
          <span className="h-px w-14 bg-gradient-to-r from-transparent to-[#c9a24b]" />
          <span className="text-xl text-[#c9a24b]" style={{ textShadow: "0 0 12px rgba(201,162,75,0.8)" }}>☽ ✦ ☾</span>
          <span className="h-px w-14 bg-gradient-to-l from-transparent to-[#c9a24b]" />
        </div>
      </div>
      <div className="h-[380px]" />

      <div className="relative mx-auto grid max-w-2xl grid-cols-4 gap-2 sm:grid-cols-6">
        {SIGNOS.map((s) => (
          <button
            key={s.valor}
            onClick={() => elegirSigno(s.valor)}
            className={`flex flex-col items-center gap-1 rounded-xl border p-3 shadow-[0_3px_10px_rgba(0,0,0,0.4)] transition-all duration-150 cursor-pointer active:scale-90 active:shadow-[0_1px_4px_rgba(0,0,0,0.4)] hover:-translate-y-0.5 hover:shadow-[0_5px_14px_rgba(139,92,246,0.35)] ${
              signoSeleccionado === s.valor
                ? "border-[#c9a24b] bg-[#c9a24b]/10"
                : "border-[#8b5cf6]/40 bg-[#2a1a4a]/70 hover:bg-[#3a2560]/80"
            }`}
          >
            <span className="text-2xl">{s.emoji}</span>
            <span className="text-[10px] text-[#f5e6d3]/80">{s.label}</span>
          </button>
        ))}
      </div>'''

new = '''      <div className="pointer-events-none absolute inset-x-0 top-0 z-10 h-64 bg-gradient-to-b from-[#1a0505] via-[#1a0505]/50 to-transparent" />
      <div className="h-[380px]" />

      <div className="relative mx-auto grid max-w-2xl grid-cols-4 gap-2 sm:grid-cols-6">
        {SIGNOS.map((s) => (
          <button
            key={s.valor}
            onClick={() => elegirSigno(s.valor)}
            className={`flex flex-col items-center gap-1 rounded-xl border p-3 shadow-[0_3px_10px_rgba(0,0,0,0.4)] transition-all duration-150 cursor-pointer active:scale-90 active:shadow-[0_1px_4px_rgba(0,0,0,0.4)] hover:-translate-y-0.5 hover:shadow-[0_5px_14px_rgba(139,92,246,0.35)] ${
              signoSeleccionado === s.valor
                ? "border-[#c9a24b] bg-[#c9a24b]/10"
                : "border-[#8b5cf6]/40 bg-[#2a1a4a]/70 hover:bg-[#3a2560]/80"
            }`}
          >
            <span className="text-2xl">{s.emoji}</span>
            <span className="text-[10px] text-[#f5e6d3]/80">{s.label}</span>
          </button>
        ))}
      </div>

      <div className="relative z-10 mt-8 flex items-center justify-center pb-6">
        <div className="flex items-center gap-3 opacity-80">
          <span className="h-px w-14 bg-gradient-to-r from-transparent to-[#c9a24b]" />
          <span className="text-xl text-[#c9a24b]" style={{ textShadow: "0 0 12px rgba(201,162,75,0.8)" }}>☽ ✦ ☾</span>
          <span className="h-px w-14 bg-gradient-to-l from-transparent to-[#c9a24b]" />
        </div>
      </div>'''

assert content.count(old) == 1
content = content.replace(old, new)

with open(path, "w") as f:
    f.write(content)

print("OK")
