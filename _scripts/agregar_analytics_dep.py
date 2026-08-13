path = "package.json"
with open(path, "r") as f:
    content = f.read()

old = '''  "dependencies": {
    "@hookform/resolvers": "^5.7.1",'''
new = '''  "dependencies": {
    "@vercel/analytics": "^1.3.1",
    "@hookform/resolvers": "^5.7.1",'''

assert content.count(old) == 1
content = content.replace(old, new)

with open(path, "w") as f:
    f.write(content)

print("OK")
