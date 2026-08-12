path = "app/page.tsx"
with open(path, "r") as f:
    content = f.read()

old = '''      <SeccionTarot />

      <SeccionCitas />'''

new = '''      <SeccionTarot />

      <SeparadorSeccion />

      <SeccionCitas />'''

assert content.count(old) == 1
content = content.replace(old, new)

with open(path, "w") as f:
    f.write(content)

print("OK")
