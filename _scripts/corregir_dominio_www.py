path = "app/layout.tsx"
with open(path, "r") as f:
    content = f.read()

old = 'const SITE_URL = "https://juansantiagoamarres.online";'
new = 'const SITE_URL = "https://www.juansantiagoamarres.online";'

assert content.count(old) == 1
content = content.replace(old, new)

with open(path, "w") as f:
    f.write(content)

print("OK")
