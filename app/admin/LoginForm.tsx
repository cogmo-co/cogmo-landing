"use client";

import { useState } from "react";
import { login } from "./services";

interface LoginFormProps {
  onSuccess: () => void;
}

export default function LoginForm({ onSuccess }: LoginFormProps) {
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit() {
    setError("");
    setLoading(true);
    try {
      const ok = await login(id, password);
      if (!ok) {
        setError("ID 또는 비밀번호가 틀렸습니다");
        return;
      }
      onSuccess();
    } catch {
      setError("로그인 실패");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-surface p-6">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSubmit();
        }}
        className="flex w-full max-w-sm flex-col gap-3 rounded-2xl border border-hairline bg-white p-8 shadow-[0_10px_30px_rgba(0,0,0,0.04)]"
      >
        <h1 className="mb-3 text-center text-xl font-extrabold text-ink">
          관리자 로그인
        </h1>

        <input
          type="text"
          placeholder="ID"
          value={id}
          onChange={(e) => setId(e.target.value)}
          autoComplete="username"
          autoFocus
          className="w-full rounded-lg border border-hairline px-4 py-3 text-sm outline-none transition focus:border-primary"
        />

        <input
          type="password"
          placeholder="비밀번호"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          autoComplete="current-password"
          className="w-full rounded-lg border border-hairline px-4 py-3 text-sm outline-none transition focus:border-primary"
        />

        {error && <p className="m-0 text-sm text-red-600">{error}</p>}

        <button
          type="submit"
          disabled={loading}
          className="rounded-lg bg-primary px-5 py-3 text-sm font-semibold text-white transition hover:bg-primary-dark disabled:cursor-not-allowed disabled:opacity-50"
        >
          {loading ? "로그인 중..." : "로그인"}
        </button>
      </form>
    </div>
  );
}
