path = "app/layout.tsx"
with open(path, "r") as f:
    content = f.read()

old = '''import MenuNav from "@/components/MenuNav";'''
new = '''import MenuNav from "@/components/MenuNav";
import { Analytics } from "@vercel/analytics/next";'''
assert content.count(old) == 1
content = content.replace(old, new)

old2 = '''      <body className="min-h-full flex flex-col">
        <MenuNav />
        {children}
      </body>'''
new2 = '''      <body className="min-h-full flex flex-col">
        <MenuNav />
        {children}
        <Analytics />
      </body>'''
assert content.count(old2) == 1
content = content.replace(old2, new2)

with open(path, "w") as f:
    f.write(content)

print("OK")
