"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Home() {
  const [publicKey, setPublicKey] = useState("");
  const [privateKey, setPrivateKey] = useState("");
  const [inputValue, setInputValue] = useState("");
  const [status, setStatus] = useState("");
  const router = useRouter();

  async function register() {
    if (!inputValue || !publicKey) return;

    try {
      const response = await fetch("http://localhost:4000/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: inputValue,
          publicKey: publicKey,
        }),
      });

      if (!response.ok) {
        setStatus("Erro ao efetuar o cadastro!");
        throw new Error("error when registering");
      }

      setStatus("Cadastro efetuado com sucesso!");

      const data = await response.json();

      router.push(
        `/notifications?user=${inputValue}&queue=${data.queueName}&pk=${publicKey}`
      );
    } catch (error) {
      setStatus("Erro ao efetuar o cadastro!");
      console.log(error);
    }
  }

  async function generateKey() {
    try {
      const response = await fetch("http://localhost:4000/crypto/keys", {
        method: "GET",
      });

      if (!response.ok) {
        throw new Error("error generating key pair");
      }

      const data = await response.json();

      setPrivateKey(data.privateKey);
      setPublicKey(data.publicKey);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <>
      <h1 className="text-4xl text-center">
        Exemplo de aplicação produtora de mensagens
      </h1>
      <div className="flex flex-col items-center justify-center gap-4">
        <span>Cadastrar-se no micro-servico de push notification:</span>
        <div className="flex flex-col items-center justify-center">
          <label htmlFor="name">Nome do Aplicativo:</label>
          <input
            id="name"
            className="border-sky-100 border-2"
            type="text"
            onChange={(event) => setInputValue(event.target.value)}
            value={inputValue}
          />
        </div>

        <button
          className="bg-blue-950 rounded-sm py-2 px-4 cursor-pointer"
          onClick={() => register()}
        >
          Cadastrar
        </button>
        <span>{status}</span>
      </div>
      {!privateKey && (
        <button
          className="bg-blue-950 rounded-sm py-2 px-4 cursor-pointer"
          onClick={() => generateKey()}
        >
          Gerar meu par de chaves para autenticação
        </button>
      )}

      {publicKey && (
        <div className="flex flex-col items-center justify-center gap-4">
          <span className="text-xl">Sua chave publica:</span>
          <span id="public" className="bg-green-800 p-2">
            {publicKey}
          </span>
        </div>
      )}

      {privateKey && (
        <div className="flex flex-col items-center justify-center gap-4">
          <span className="text-xl">Sua chave privada:</span>
          <span id="private" className="bg-red-800 p-2">
            {privateKey}
          </span>
        </div>
      )}
    </>
  );
}
