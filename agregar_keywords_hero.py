path = "app/page.tsx"
with open(path, "r") as f:
    content = f.read()

old = '''          <p className="relative z-10 mt-2 text-lg font-semibold text-[#f5e6d3]" style={{ textShadow: "0 2px 10px rgba(0,0,0,0.9)", animation: "aparecer-subir 0.8s ease-out 0.3s both" }}>Maestro Curandero · Heredero del Tatabombori</p>'''

new = '''          <p className="relative z-10 mt-2 text-lg font-semibold text-[#f5e6d3]" style={{ textShadow: "0 2px 10px rgba(0,0,0,0.9)", animation: "aparecer-subir 0.8s ease-out 0.3s both" }}>Maestro Curandero · Heredero del Tatabombori</p>
          <p className="relative z-10 mt-1 text-sm uppercase tracking-widest text-[#c9a24b]" style={{ textShadow: "0 2px 10px rgba(0,0,0,0.9)", animation: "aparecer-subir 0.8s ease-out 0.4s both" }}>Amarres de Amor · Norte de Potosí, Bolivia</p>'''

assert content.count(old) == 1
content = content.replace(old, new)

with open(path, "w") as f:
    f.write(content)

print("OK")
