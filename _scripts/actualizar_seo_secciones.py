path = "app/page.tsx"
with open(path, "r") as f:
    content = f.read()

old1 = '''          <h2 className="mb-4 text-4xl font-bold text-white" style={{ fontFamily: "var(--font-cinzel)" }}>
            Bienvenido al Altar del Tata Bombori
          </h2>
        </RevealOnScroll>
          <p className="mx-auto max-w-md text-[#f5e6d3]/90">
            Donde la sabiduría ancestral de las Sagradas Hojas de Coca y la verdad revelada por las Cartas del Tarot se unen para ver tu situación, orientarte y trabajar con justicia y fe verdadera.
          </p>'''

new1 = '''          <h2 className="mb-2 text-4xl font-bold text-white" style={{ fontFamily: "var(--font-cinzel)" }}>
            Amarres de Amor desde Potosí — Altar del Tata Bombori
          </h2>
        </RevealOnScroll>
          <p className="mb-4 text-sm uppercase tracking-widest text-[#c9a24b]">
            Maestro Juan Santiago, heredero de la fuerza sagrada ancestral
          </p>
          <p className="mx-auto max-w-md text-[#f5e6d3]/90">
            Donde la sabiduría ancestral de las Sagradas Hojas de Coca y la verdad revelada por las Cartas del Tarot se unen para ver tu situación, orientarte y trabajar con justicia y fe verdadera.
          </p>'''

assert content.count(old1) == 1
content = content.replace(old1, new1)

old2 = '''              <p className="text-sm text-[#f5e6d3]/90">🕯️ Trabajamos desde el Altar del Tata Bombori</p>'''
new2 = '''              <p className="text-sm text-[#f5e6d3]/90">🕯️ Trabajamos desde Potosí, con la fuerza sagrada del Tata Bombori</p>'''

assert content.count(old2) == 1
content = content.replace(old2, new2)

old3 = '''          <h2 className="mb-2 text-center text-4xl font-bold text-white" style={{ fontFamily: "var(--font-cinzel)" }}>
            Servicios del Altar del Tata Bombori
          </h2>'''
new3 = '''          <h2 className="mb-2 text-center text-4xl font-bold text-white" style={{ fontFamily: "var(--font-cinzel)" }}>
            Servicios de Amarres y Rituales — Altar del Tata Bombori
          </h2>'''

assert content.count(old3) == 1
content = content.replace(old3, new3)

with open(path, "w") as f:
    f.write(content)

print("OK")
