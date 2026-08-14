path = "app/page.tsx"
with open(path, "r") as f:
    content = f.read()

old = '''          <h2 className="mb-2 text-4xl font-bold text-white" style={{ fontFamily: "var(--font-cinzel)" }}>
            Amarres de Amor desde Potosí — Altar del Tata Bombori
          </h2>'''
new = '''          <h2 className="mb-2 text-4xl font-bold text-white" style={{ fontFamily: "var(--font-cinzel)" }}>
            Trabajos Espirituales de Amor desde Potosí — Altar del Tata Bombori
          </h2>'''
assert content.count(old) == 1
content = content.replace(old, new)

with open(path, "w") as f:
    f.write(content)

print("OK 7")
