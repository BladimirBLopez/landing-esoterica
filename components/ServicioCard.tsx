import Image from "next/image";
import WhatsAppButton from "./WhatsAppButton";

interface ServicioCardProps {
  titulo: string;
  descripcion: string;
  imagen: string;
  numero: string;
  mensaje: string;
}

export default function ServicioCard({
  titulo,
  descripcion,
  imagen,
  numero,
  mensaje,
}: ServicioCardProps) {
  return (
    <div className="flex flex-col overflow-hidden rounded-2xl bg-white shadow-md">
      <div className="relative h-56 w-full">
        <Image src={imagen} alt={titulo} fill className="object-cover" />
      </div>
      <div className="flex flex-1 flex-col gap-3 p-6">
        <h3 className="text-xl font-semibold">{titulo}</h3>
        <p className="flex-1 text-gray-600">{descripcion}</p>
        <WhatsAppButton numero={numero} mensaje={mensaje} texto="Consultar por WhatsApp" />
      </div>
    </div>
  );
}
