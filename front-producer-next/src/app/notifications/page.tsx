"use client";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { useCallback, useMemo, useState } from "react";

export default function NotificationsPage() {
  const types = useMemo(
    () => [
      "Success",
      "Error",
      "Warning",
      "Information",
      "Confirmation",
      "Progress",
      "Alert",
      "Request",
    ],
    []
  );
  const formInitialState = useMemo(
    () => ({ title: "", message: "", type: types[0] }),
    [types]
  );
  const [form, setForm] = useState(formInitialState);
  const [status, setStatus] = useState("");
  const searchParams = useSearchParams();
  const user = searchParams.get("user");
  const token = searchParams.get("token");
  const router = useRouter();

  const sendNotification = async () => {
    try {
      const response = await fetch("http://localhost:4000/notifications", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bear ${token}`,
        },
        body: JSON.stringify({
          ...form,
        }),
      });

      if (!response.ok) {
        setStatus("Erro ao enviar notificacao!");
        throw new Error("error when sending notification");
      }

      setStatus("Notificacao enviada com sucesso!");

      setForm(formInitialState);
    } catch (error) {
      setStatus("Erro ao enviar notificacao!");
      console.log(error);
    }
  };

  const handleFormChange = useCallback((field: string, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  }, []);

  return (
    <>
      <h2 className="text-2xl text-center">Envie notificacoes para a fila!</h2>
      <div className="flex flex-col justify-center items-center gap-2">
        <span>Nome da sua aplicação:</span>
        <span className="font-semibold text-center">{user}</span>
      </div>

      <div className="flex flex-col gap-2">
        <h2 className="text-2xl text-center">Configure sua notificacao</h2>
        <label htmlFor="title">Titulo:</label>
        <input
          id="title"
          type="text"
          className="border-2"
          value={form.title}
          onChange={({ target }) => handleFormChange("title", target.value)}
        />
        <label htmlFor="type-select">Tipo:</label>
        <select
          name="type"
          id="type-select"
          className="border-2"
          required
          value={form.type}
          onChange={({ target }) => handleFormChange("type", target.value)}
        >
          {types.map((type) => (
            <option key={type} value={type} className="text-black">
              {type}
            </option>
          ))}
        </select>

        <label htmlFor="message">Mensagem:</label>
        <textarea
          id="message"
          className="border-2 min-w-2xs min-h-56"
          value={form.message}
          onChange={({ target }) => handleFormChange("message", target.value)}
        />
        <span>{status}</span>
        <div className="flex gap-2 justify-center items-center">
          <button
            className="bg-blue-950 rounded-sm py-2 px-4 cursor-pointer"
            onClick={() => router.push("/login")}
          >
            Voltar para o Login
          </button>
          <button
            className="bg-blue-950 rounded-sm py-2 px-4 cursor-pointer"
            onClick={() => sendNotification()}
          >
            Enviar Notificacao
          </button>
        </div>
      </div>
    </>
  );
}
