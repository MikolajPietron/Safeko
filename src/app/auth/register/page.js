"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import "./registration.css";


export default function RegisterPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const res = await fetch("/api/auth/registration", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, password }),
    });

    const data = await res.json();

    if (!res.ok) {
      setError(data.error || "Something went wrong");
      return;
    }

    // After successful registration, auto login
    await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    router.push("/"); // redirect after login
  };

  return (
    <div className="RegContainer">
      <h1 className="Regh1">Create Account</h1>
      
          <form onSubmit={handleSubmit} className="LoginFormContainer">
            <img src='/default_logo.svg' className='LogoLogin' />
            <div className="FormInputContainer">
                <input
          type="text"
          placeholder="Nazwa Użytkownika"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full p-2 border rounded"
        />
        <input
          type="email"
          placeholder="E-mail"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-2 border rounded"
          required
        />
        <input
          type="password"
          placeholder="Hasło"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-2 border rounded"
          required
        />

        {error && <p className="text-red-500">{error}</p>}

        <button
          type="submit"
          className="RegisterButton"
        >
          Register
        </button>
            </div>
        
      </form>
      


      
    </div>
  );
}
