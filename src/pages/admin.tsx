import { useEffect, useState } from "react";
import Head from "next/head";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { supabase } from "@/integrations/supabase/client";

interface AppointmentRow {
  id: string;
  first_name: string;
  last_name: string;
  service_type: string;
  appointment_date: string;
  appointment_time: string;
  created_at: string;
}

export default function AdminPage() {
  const [rows, setRows] = useState<AppointmentRow[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [sessionReady, setSessionReady] = useState(false);
  const [isAuthed, setIsAuthed] = useState(false);

  useEffect(() => {
    const init = async () => {
      const { data } = await supabase.auth.getSession();
      const hasSession = Boolean(data.session?.access_token);
      setIsAuthed(hasSession);
      setSessionReady(true);
      if (hasSession) {
        void loadAppointments();
      }
    };
    void init();

    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      const hasSession = Boolean(session?.access_token);
      setIsAuthed(hasSession);
      if (hasSession) {
        void loadAppointments();
      } else {
        setRows([]);
      }
    });

    return () => {
      listener.subscription.unsubscribe();
    };
  }, []);

  const loadAppointments = async () => {
    setLoading(true);
    setError(null);
    try {
      const { data: sessionData } = await supabase.auth.getSession();
      const token = sessionData.session?.access_token;
      if (!token) {
        throw new Error("Oturum bulunamadı");
      }

      const res = await fetch("/api/admin/appointments", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        throw new Error(body?.error || "Request failed");
      }

      const data = await res.json();
      setRows(data.data || []);
    } catch (err) {
      setRows([]);
      setError(err instanceof Error ? err.message : "Unknown error");
    } finally {
      setLoading(false);
    }
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim() || !password) {
      setError("E-posta ve şifre gerekli");
      return;
    }
    setLoading(true);
    setError(null);
    try {
      const { error: signInError } = await supabase.auth.signInWithPassword({
        email: email.trim(),
        password,
      });
      if (signInError) {
        throw signInError;
      }
      await loadAppointments();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unknown error");
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setRows([]);
  };

  return (
    <>
      <Head>
        <title>Admin | Yusuf Nail Art</title>
      </Head>
      <div className="min-h-screen bg-background px-4 py-10">
        <div className="mx-auto max-w-5xl space-y-8">
          <Card className="border-none shadow-xl">
            <CardHeader>
              <CardTitle>Randevular - Admin</CardTitle>
            </CardHeader>
            <CardContent>
              {!sessionReady ? null : isAuthed ? (
                <div className="flex items-center gap-3">
                  <Button type="button" onClick={() => loadAppointments()} disabled={loading}>
                    {loading ? "Yükleniyor..." : "Yenile"}
                  </Button>
                  <Button type="button" variant="outline" onClick={handleLogout}>
                    Çıkış Yap
                  </Button>
                </div>
              ) : (
                <form onSubmit={handleLogin} className="flex flex-col gap-3 sm:flex-row">
                  <Input
                    type="email"
                    placeholder="Admin e-posta"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                  <Input
                    type="password"
                    placeholder="Şifre"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <Button type="submit" disabled={loading}>
                    {loading ? "Giriş yapılıyor..." : "Giriş Yap"}
                  </Button>
                </form>
              )}
              {error && <p className="mt-3 text-sm text-destructive">{error}</p>}
            </CardContent>
          </Card>

          <Card className="border-none shadow-xl">
            <CardHeader>
              <CardTitle>Randevu Listesi</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full text-left text-sm">
                  <thead>
                    <tr className="border-b">
                      <th className="py-2 pr-4">Ad</th>
                      <th className="py-2 pr-4">Soyad</th>
                      <th className="py-2 pr-4">Hizmet</th>
                      <th className="py-2 pr-4">Tarih</th>
                      <th className="py-2 pr-4">Saat</th>
                      <th className="py-2 pr-4">Oluşturma</th>
                    </tr>
                  </thead>
                  <tbody>
                    {rows.length === 0 && !loading ? (
                      <tr>
                        <td className="py-4 text-muted-foreground" colSpan={6}>
                          Kayıt yok.
                        </td>
                      </tr>
                    ) : (
                      rows.map((row) => (
                        <tr key={row.id} className="border-b last:border-b-0">
                          <td className="py-2 pr-4">{row.first_name}</td>
                          <td className="py-2 pr-4">{row.last_name}</td>
                          <td className="py-2 pr-4">{row.service_type}</td>
                          <td className="py-2 pr-4">{row.appointment_date}</td>
                          <td className="py-2 pr-4">{row.appointment_time}</td>
                          <td className="py-2 pr-4">{new Date(row.created_at).toLocaleString("tr-TR")}</td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  );
}
