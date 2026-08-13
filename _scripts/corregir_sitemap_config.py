path = "next-sitemap.config.js"
with open(path, "r") as f:
    content = f.read()

old = 'siteUrl: "https://juansantiagoamarres.online",'
new = 'siteUrl: "https://www.juansantiagoamarres.online",'

assert content.count(old) == 1
content = content.replace(old, new)

with open(path, "w") as f:
    f.write(content)

print("OK")
