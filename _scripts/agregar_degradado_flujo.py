path = "components/SeccionHoroscopo.tsx"
with open(path, "r") as f:
    content = f.read()

old = '''      <div className="relative z-10 mt-8 flex items-center justify-center pb-6">
        <div className="flex items-center gap-3 opacity-80">
          <span className="h-px w-14 bg-gradient-to-r from-transparent to-[#c9a24b]" />
          <span className="text-xl text-[#c9a24b]" style={{ textShadow: "0 0 12px rgba(201,162,75,0.8)" }}>☽ ✦ ☾</span>
          <span className="h-px w-14 bg-gradient-to-l from-transparent to-[#c9a24b]" />
        </div>
      </div>'''

new = '''      <div
        className="relative z-10 mt-8 flex items-center justify-center pb-8 pt-6"
        style={{ background: "linear-gradient(to bottom, transparent, #1a0f30 70%)" }}
      >
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
