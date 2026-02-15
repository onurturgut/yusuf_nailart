import { useEffect, useState } from "react";
import Head from "next/head";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

interface AppointmentRow {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  service_type: string;
  appointment_date: string;
  appointment_time: string;
  addons?: string[];
  created_at: string;
}

function formatAppointmentDate(value: string) {
  const trimmed = value.trim();
  const parts = trimmed.split("-");

  if (parts.length === 3 && parts[0].length === 4) {
    const [year, month, day] = parts;
    return `${day}/${month}/${year}`;
  }

  const parsed = new Date(trimmed);
  if (Number.isNaN(parsed.getTime())) {
    return value;
  }

  return parsed.toLocaleDateString("tr-TR");
}

function formatServiceType(value: string) {
  const serviceMap: Record<string, string> = {
    prosthetic: "Protez Tırnak ve Bakımı",
    gel: "Jel Tırnak",
    "manicure-pedicure": "Manikür ve Pedikür",
    "nail-art": "Kalıcı Oje",
    "Prosthetic Nails and Care": "Protez Tırnak ve Bakımı",
    "Gel Nails": "Jel Tırnak",
    "Manicure and Pedicure": "Manikür ve Pedikür",
    "Permanent Gel Polish": "Kalıcı Oje",
  };

  return serviceMap[value] || value;
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
      await loadAppointments(true);
      setSessionReady(true);
    };
    void init();
  }, []);

  const loadAppointments = async (silentAuthError = false) => {
    setLoading(true);
    if (!silentAuthError) {
      setError(null);
    }
    try {
      const res = await fetch("/api/admin/appointments", {
        credentials: "include",
      });

      if (res.status === 401) {
        setIsAuthed(false);
        setRows([]);
        if (!silentAuthError) {
          setError("Lütfen giriş yapın");
        }
        return;
      }

      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        throw new Error(body?.error || "Request failed");
      }

      const data = await res.json();
      setIsAuthed(true);
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
      const res = await fetch("/api/admin/login", {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email.trim(),
          password,
        }),
      });

      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        throw new Error(body?.error || "Giriş başarısız");
      }

      setIsAuthed(true);
      await loadAppointments(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unknown error");
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    await fetch("/api/admin/logout", {
      method: "POST",
      credentials: "include",
    });
    setIsAuthed(false);
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
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Ad</TableHead>
                      <TableHead>Soyad</TableHead>
                      <TableHead>E-posta</TableHead>
                      <TableHead>Hizmet</TableHead>
                      <TableHead>Ekstra Seçenekler</TableHead>
                      <TableHead>Tarih</TableHead>
                      <TableHead>Saat</TableHead>
                      <TableHead>Oluşturma</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {loading ? (
                      <TableRow>
                        <TableCell colSpan={8} className="text-muted-foreground">
                          Yükleniyor...
                        </TableCell>
                      </TableRow>
                    ) : rows.length === 0 ? (
                      <TableRow>
                        <TableCell colSpan={8} className="text-muted-foreground">
                          Kayıt yok.
                        </TableCell>
                      </TableRow>
                    ) : (
                      rows.map((row) => (
                        <TableRow key={row.id}>
                          <TableCell>{row.first_name}</TableCell>
                          <TableCell>{row.last_name}</TableCell>
                          <TableCell>{row.email || "-"}</TableCell>
                          <TableCell>{formatServiceType(row.service_type)}</TableCell>
                          <TableCell>{row.addons?.length ? row.addons.join(", ") : "-"}</TableCell>
                          <TableCell>{formatAppointmentDate(row.appointment_date)}</TableCell>
                          <TableCell>{row.appointment_time}</TableCell>
                          <TableCell>{new Date(row.created_at).toLocaleString("tr-TR")}</TableCell>
                        </TableRow>
                      ))
                    )}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  );
}
