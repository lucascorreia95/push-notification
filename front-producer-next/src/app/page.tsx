"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Home() {
  const [inputNameValue, setInputNameValue] = useState("");
  const [inputPasswordValue, setInputPasswordValue] = useState("");
  const [status, setStatus] = useState("");
  const router = useRouter();

  async function register() {
    if (!inputNameValue || !inputPasswordValue) return;

    try {
      const response = await fetch("http://localhost:4000/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: inputNameValue,
          password: inputPasswordValue,
        }),
      });

      if (!response.ok) {
        setStatus("Erro ao efetuar o cadastro!");
        throw new Error("error when registering");
      }

      setStatus("Cadastro efetuado com sucesso!");
      router.push("/login");
    } catch (error) {
      setStatus("Erro ao efetuar o cadastro!");
      console.log(error);
    }
  }

  return (
    <>
      <div className="flex flex-col items-center justify-center gap-4">
        <span>Cadastrar-se no micro-servico de push notification:</span>
        <div className="flex flex-col items-center justify-center">
          <label htmlFor="name">Nome do Aplicativo:</label>
          <input
            id="name"
            className="border-sky-100 border-2"
            type="text"
            onChange={(event) => setInputNameValue(event.target.value)}
            value={inputNameValue}
          />
          <br />
          <label htmlFor="password">Senha:</label>
          <input
            id="password"
            className="border-sky-100 border-2"
            type="password"
            onChange={(event) => setInputPasswordValue(event.target.value)}
            value={inputPasswordValue}
          />
        </div>

        <div className="flex gap-2 justify-center items-center">
          <button
            className="bg-blue-950 rounded-sm py-2 px-4 cursor-pointer"
            onClick={() => router.push("/login")}
          >
            Ir para tela de login
          </button>
          <span>ou</span>
          <button
            className="bg-blue-950 rounded-sm py-2 px-4 cursor-pointer"
            onClick={() => register()}
          >
            Cadastrar
          </button>
        </div>
        <span>{status}</span>
      </div>
    </>
  );
}
