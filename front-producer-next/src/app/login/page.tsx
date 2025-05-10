"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Home() {
  const [inputNameValue, setInputNameValue] = useState("");
  const [inputPasswordValue, setInputPasswordValue] = useState("");
  const [status, setStatus] = useState("");
  const router = useRouter();

  async function login() {
    if (!inputNameValue || !inputPasswordValue) return;

    try {
      const response = await fetch("http://localhost:4000/auth", {
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
        setStatus("Erro ao efetuar o Login!");
        throw new Error("error when login");
      }

      setStatus("Login efetuado com sucesso!");

      const { access_token } = await response.json();
      router.push(
        `/notifications?token=${access_token}&user=${inputNameValue}`
      );
    } catch (error) {
      setStatus("Erro ao efetuar o Login");
      console.log(error);
    }
  }

  return (
    <>
      <div className="flex flex-col items-center justify-center gap-4">
        <span>Efetue o Login no micro-servico de push notification:</span>
        <div className="flex flex-col items-center justify-center">
          <label htmlFor="name">Usuario:</label>
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
            onClick={() => router.push("/")}
          >
            Voltar para o Registro
          </button>
          <span>ou</span>
          <button
            className="bg-blue-950 rounded-sm py-2 px-4 cursor-pointer"
            onClick={() => login()}
          >
            Login
          </button>
        </div>
        <span>{status}</span>
      </div>
    </>
  );
}
