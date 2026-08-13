path = "components/SeccionHoroscopo.tsx"
with open(path, "r") as f:
    content = f.read()

old = '''      <div className="pointer-events-none absolute inset-x-0 top-0 z-10 h-64 bg-gradient-to-b from-[#1a0505] via-[#1a0505]/50 to-transparent" />
      <div className="h-[380px]" />'''

new = '''      <div className="pointer-events-none absolute inset-x-0 top-0 z-10 h-64 bg-gradient-to-b from-[#1a0505] via-[#1a0505]/50 to-transparent" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 z-10 h-40 bg-gradient-to-b from-transparent to-[#1a0f30]" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 z-20 flex items-center justify-center pb-2">
        <div className="flex items-center gap-3 opacity-80">
          <span className="h-px w-14 bg-gradient-to-r from-transparent to-[#c9a24b]" />
          <span className="text-xl text-[#c9a24b]" style={{ textShadow: "0 0 12px rgba(201,162,75,0.8)" }}>☽ ✦ ☾</span>
          <span className="h-px w-14 bg-gradient-to-l from-transparent to-[#c9a24b]" />
        </div>
      </div>
      <div className="h-[380px]" />'''

assert content.count(old) == 1
content = content.replace(old, new)

with open(path, "w") as f:
    f.write(content)

print("OK")
