path = "components/SiteFooter.tsx"
with open(path, "r") as f:
    content = f.read()

old = '''          Síguenos en Facebook
        </a>
        <p className="mt-4">© 2026 Altar del Tata Bombori · Maestro Juan Santiago</p>'''

new = '''          Síguenos en Facebook
        </a>
        <a
          href="https://maps.app.goo.gl/cRwJzs7ADLNs1UQC7"
          target="_blank"
          rel="noopener noreferrer"
          className="mt-3 block hover:text-[#c9a24b] transition"
        >
          📍 América 528-538, Villa Imperial de Potosí, Bolivia
        </a>
        <p className="mt-4">© 2026 Altar del Tata Bombori · Maestro Juan Santiago</p>'''

assert content.count(old) == 1
content = content.replace(old, new)

with open(path, "w") as f:
    f.write(content)

print("OK")
