"use client";
import { useSearchParams } from "next/navigation";

export default function NotificationsPage() {
  const searchParams = useSearchParams();
  const user = searchParams.get("user");
  const queue = searchParams.get("queue");
  const pk = searchParams.get("pk");

  const sendNotification = () => {};

  return (
    <>
      <h1 className="text-4xl text-center">Envie notificacoes para a fila!</h1>
      <div className="flex flex-col justify-center items-center gap-2">
        <span>Nome da sua aplicação:</span>
        <span className="font-semibold text-center">{user}</span>
        <span>Nome da sua fila:</span>
        <span className="font-semibold text-center">{queue}</span>
        <span>Sua chave publica:</span>
        <span className="font-semibold text-center">{pk}</span>
      </div>

      <div className="flex flex-col gap-2">
        <textarea className="border-2 min-w-2xs min-h-56" />
        <button
          className="bg-blue-950 rounded-sm py-2 px-4 cursor-pointer"
          onClick={() => sendNotification}
        >
          Enviar Notificacao!
        </button>
      </div>
    </>
  );
}
