path = "components/ScrollVideo.tsx"
with open(path, "r") as f:
    content = f.read()

old = '''        preload="auto"'''
new = '''        preload="metadata"'''

assert content.count(old) == 1
content = content.replace(old, new)

with open(path, "w") as f:
    f.write(content)

print("OK")
