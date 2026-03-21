"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LeadForm({ t }: { t: (key: string) => string }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const router = useRouter();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    // Placeholder: integrate with your endpoint later
    setSubmitted(true);
    setTimeout(() => router.push("/bedankt"), 1000);
  }

  if (submitted) return <p>{t("form_success")}</p>;

  return (
    <form onSubmit={handleSubmit} className="space-y-4 max-w-md">
      <div>
        <label>{t("name")}</label>
        <input value={name} onChange={e => setName(e.target.value)} required className="input" />
      </div>
      <div>
        <label>{t("email")}</label>
        <input type="email" value={email} onChange={e => setEmail(e.target.value)} required className="input" />
      </div>
      <div>
        <label>{t("message")}</label>
        <textarea value={message} onChange={e => setMessage(e.target.value)} required className="input" />
      </div>
      <button type="submit" className="btn btn-primary">{t("submit")}</button>
    </form>
  );
}
