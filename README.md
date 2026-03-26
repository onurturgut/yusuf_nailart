# Yusuf Nail Art

`Yusuf Nail Art`, Next.js tabanli bir tirnak bakim ve randevu yonetim projesidir. Uygulama; hizmet tanitimi, online randevu formu, e-posta bildirimi ve admin paneli akisini tek repo icinde toplar.

## Ozellikler

- Ana sayfada hizmetler, tanitim alani ve iletisim odakli kurgu
- Randevu olusturma formu
- MongoDB uzerinden randevu kaydi
- Musteriye ve admine e-posta bildirimi
- `/admin` uzerinden randevu listeleme ve yonetim girisi
- Turkce ve Ingilizce dil destegi

## Teknolojiler

- Next.js 14
- React 18
- TypeScript
- Tailwind CSS
- shadcn/ui
- MongoDB
- Nodemailer / Brevo

## Proje Yapisi

- `src/pages/index.tsx`: Ana sayfa
- `src/components/*`: Arayuz bilesenleri
- `src/pages/api/appointments.ts`: Randevu olusturma API'si
- `src/pages/admin.tsx`: Admin paneli
- `src/pages/api/admin/*`: Admin giris ve randevu API'leri
- `src/lib/mongodb.ts`: MongoDB baglantisi
- `src/lib/server/mailer.ts`: E-posta gonderim mantigi

## Kurulum

```bash
npm install
```

Ardindan `.env` dosyanizi olusturup gerekli ortam degiskenlerini tanimlayin:

```env
MONGODB_URI=
MONGODB_DB=yusuf_nailart

ADMIN_EMAIL=
ADMIN_EMAILS=
ADMIN_PASSWORD=
ADMIN_SESSION_SECRET=

EMAIL_PROVIDER=smtp

SMTP_HOST=
SMTP_PORT=587
SMTP_USER=
SMTP_PASS=
SMTP_FROM=

BREVO_API_KEY=
BREVO_FROM_EMAIL=
BREVO_FROM_NAME=Yusuf Nail Art
```

Notlar:

- `ADMIN_EMAIL` veya `ADMIN_EMAILS` alanlarindan en az biri tanimli olmalidir.
- `EMAIL_PROVIDER=brevo` kullanilacaksa `BREVO_*` alanlari doldurulmalidir.
- `EMAIL_PROVIDER` bos birakilirsa varsayilan olarak SMTP kullanilir.

## Gelistirme

```bash
npm run dev
```

Uygulama varsayilan olarak `http://localhost:3000` adresinde calisir.

## Komutlar

```bash
npm run dev
npm run build
npm run start
npm run lint
```

## Admin Erisimi

- Admin paneli: `http://localhost:3000/admin`
- Giris icin `.env` icindeki `ADMIN_EMAIL` veya `ADMIN_EMAILS` ve `ADMIN_PASSWORD` kullanilir.

## Dagitim

Uretim ortamina cikmadan once asagidaki alanlarin dogru tanimli oldugundan emin olun:

- MongoDB baglanti bilgileri
- Admin oturum bilgileri
- SMTP veya Brevo e-posta ayarlari

Ardindan standart Next.js dagitim akisiyla yayinlayabilirsiniz:

```bash
npm run build
npm run start
```
