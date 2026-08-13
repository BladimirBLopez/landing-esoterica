path = "components/ChatAsistente.tsx"
with open(path, "r") as f:
    content = f.read()

old = '''  const [mensajes, setMensajes] = useState<Mensaje[]>([
    { de: "bot", texto: "Hola, soy Sofía, la asistente del Maestro Juan Santiago 🙏 ¿En qué puedo ayudarte hoy?", hora: horaActual() },
  ]);'''

new = '''  const [mensajes, setMensajes] = useState<Mensaje[]>([]);
  const [cargandoBienvenida, setCargandoBienvenida] = useState(true);'''

assert content.count(old) == 1
content = content.replace(old, new)

old2 = '''  useEffect(() => {
    fetch(`${API_BASE}/api/configuracion`)
      .then((res) => res.json())
      .then((data) => {
        const mensajeConfigurado = data?.config?.mensaje_bienvenida;
        if (mensajeConfigurado) {
          setMensajes([{ de: "bot", texto: mensajeConfigurado, hora: horaActual() }]);
        }
      })
      .catch(() => {});
  }, []);'''

new2 = '''  useEffect(() => {
    fetch(`${API_BASE}/api/configuracion`)
      .then((res) => res.json())
      .then((data) => {
        const mensajeConfigurado = data?.config?.mensaje_bienvenida;
        const textoFinal = mensajeConfigurado || "Hola, soy Sofía, la asistente del Maestro Juan Santiago 🙏 ¿En qué puedo ayudarte hoy?";
        setMensajes([{ de: "bot", texto: textoFinal, hora: horaActual() }]);
      })
      .catch(() => {
        setMensajes([{ de: "bot", texto: "Hola, soy Sofía, la asistente del Maestro Juan Santiago 🙏 ¿En qué puedo ayudarte hoy?", hora: horaActual() }]);
      })
      .finally(() => setCargandoBienvenida(false));
  }, []);'''

assert content.count(old2) == 1
content = content.replace(old2, new2)

with open(path, "w") as f:
    f.write(content)

print("OK")
