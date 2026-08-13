path = "app/page.tsx"
with open(path, "r") as f:
    content = f.read()

old_import = '''import SeccionHoroscopo from "@/components/SeccionHoroscopo";'''
new_import = '''import SeccionHoroscopo from "@/components/SeccionHoroscopo";
import SeparadorSeccion from "@/components/SeparadorSeccion";'''
assert content.count(old_import) == 1
content = content.replace(old_import, new_import)

old1 = '''      <SeccionCitas />

      {/* Resumen final + CTA (estilo caja con borde) */}'''
new1 = '''      <SeccionCitas />

      <SeparadorSeccion />

      {/* Resumen final + CTA (estilo caja con borde) */}'''
assert content.count(old1) == 1
content = content.replace(old1, new1)

old2 = '''      </section>

      {/* Frase de garantia */}'''
new2 = '''      </section>

      <SeparadorSeccion />

      {/* Frase de garantia */}'''
assert content.count(old2) == 1
content = content.replace(old2, new2)

with open(path, "w") as f:
    f.write(content)

print("OK")
