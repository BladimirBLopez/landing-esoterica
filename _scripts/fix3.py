path = "app/page.tsx"
with open(path, "r") as f:
    content = f.read()

old1 = '''            <WhatsAppButton
              numero={NUMERO}
              mensaje="Hola Maestro Juan Santiago, quiero recuperar a mi pareja."
              texto="Quiero recuperar a mi pareja"
              className="text-base px-8 py-4"
            />'''
new1 = '''            <WhatsAppButton
              numero={NUMERO}
              mensaje="Hola Maestro Juan Santiago, quiero recuperar a mi pareja."
              texto="Quiero recuperar a mi pareja"
              className="text-base px-8 py-4"
              servicio="AMARRE"
            />'''
assert content.count(old1) == 1
content = content.replace(old1, new1)

old2 = '''              <WhatsAppButton
                numero={NUMERO}
                mensaje="Hola Maestro Juan Santiago, quiero empezar hoy mismo."
                texto="Escríbeme ahora y empezamos hoy mismo"
                className="text-base px-8 py-4"
              />'''
new2 = '''              <WhatsAppButton
                numero={NUMERO}
                mensaje="Hola Maestro Juan Santiago, quiero empezar hoy mismo."
                texto="Escríbeme ahora y empezamos hoy mismo"
                className="text-base px-8 py-4"
                servicio="AMARRE"
              />'''
assert content.count(old2) == 1
content = content.replace(old2, new2)

with open(path, "w") as f:
    f.write(content)

print("OK 3")
