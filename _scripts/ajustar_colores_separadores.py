path = "app/page.tsx"
with open(path, "r") as f:
    content = f.read()

# Separador 1: entre SeccionTarot y SeccionCitas
old1 = '''      <SeccionTarot />

      <SeparadorSeccion />

      <SeccionCitas />'''
new1 = '''      <SeccionTarot />

      <SeparadorSeccion from="#1a0505" to="#2a1a4a" />

      <SeccionCitas />'''
assert content.count(old1) == 1
content = content.replace(old1, new1)

# Separador 2: entre SeccionCitas y seccion "Resumen final"
old2 = '''      <SeccionCitas />

      <SeparadorSeccion />

      {/* Resumen final + CTA (estilo caja con borde) */}'''
new2 = '''      <SeccionCitas />

      <SeparadorSeccion from="#1a0505" to="#4a0916" />

      {/* Resumen final + CTA (estilo caja con borde) */}'''
assert content.count(old2) == 1
content = content.replace(old2, new2)

# Separador 3: entre seccion "Resumen final" y "Frase de garantia"
old3 = '''      </section>

      <SeparadorSeccion />

      {/* Frase de garantia */}'''
new3 = '''      </section>

      <SeparadorSeccion from="#2e0a1c" to="#2e0a1c" />

      {/* Frase de garantia */}'''
assert content.count(old3) == 1
content = content.replace(old3, new3)

with open(path, "w") as f:
    f.write(content)

print("OK")
