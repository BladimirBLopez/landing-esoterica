path = "app/page.tsx"
with open(path, "r") as f:
    content = f.read()

old = '''Amarres de Amor · Norte de Potosí, Bolivia'''
new = '''Amarres de Amor · Endulzamiento · Unión de Parejas'''

assert content.count(old) == 1
content = content.replace(old, new)

with open(path, "w") as f:
    f.write(content)

print("OK")
