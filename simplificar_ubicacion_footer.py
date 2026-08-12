path = "components/SiteFooter.tsx"
with open(path, "r") as f:
    content = f.read()

old = '''          📍 América 528-538, Villa Imperial de Potosí, Bolivia'''
new = '''          📍 Villa Imperial de Potosí, Bolivia'''

assert content.count(old) == 1
content = content.replace(old, new)

with open(path, "w") as f:
    f.write(content)

print("OK")
