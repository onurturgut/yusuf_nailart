export const translations = {
  tr: {
    nav: {
      home: "Ana Sayfa",
      services: "Hizmetler",
      appointment: "Randevu",
      contact: "İletişim",
    },
    hero: {
      title: "Yusuf Nail Art",
      subtitle: "Profesyonel Tırnak Bakımı & Sanatı",
      description: "Hijyenik ortamda, uzman eller ile tırnaklarınızı sanata dönüştürüyoruz.",
      cta: "Randevu Al",
    },
    services: {
      title: "Hizmetlerimiz",
      subtitle: "Profesyonel ve hijyenik ortamda sunulan hizmetlerimiz",
      gelNails: {
        title: "Jel Tırnak",
        description: "Uzun ömürlü, parlak ve dayanıklı jel tırnak uygulaması. Doğal görünümlü, kırılmaya karşı dirençli tırnaklar için ideal seçim.",
      },
      prostheticNails: {
        title: "Protez Tırnak",
        description: "Kırık veya hasarlı tırnaklarınız için profesyonel protez tırnak uygulaması. Doğal görünüm ve uzun ömürlü sonuçlar.",
      },
      manicurePedicure: {
        title: "Manikür & Pedikür",
        description: "El ve ayak tırnaklarınız için kapsamlı bakım hizmeti. Temizlik, şekillendirme ve cilt bakımı bir arada.",
      },
      nailArt: {
        title: "Tırnak Sanatı",
        description: "Özel tasarımlar, desenler ve dekoratif uygulamalar ile tırnaklarınızı sanat eserine dönüştürün.",
      },
    },
    appointment: {
      title: "Randevu Oluştur",
      subtitle: "Size uygun tarih ve saati seçin",
      firstName: "Adınız",
      lastName: "Soyadınız",
      date: "Tarih",
      time: "Saat",
      service: "Hizmet",
      selectService: "Hizmet Seçin",
      selectDate: "Tarih Seçin",
      selectTime: "Saat Seçin",
      submit: "Randevu Al",
      success: "Randevunuz başarıyla oluşturuldu!",
      successDescription: "En kısa sürede sizinle iletişime geçeceğiz.",
      error: "Bir hata oluştu. Lütfen tekrar deneyin.",
    },
    whatsapp: {
      tooltip: "WhatsApp ile iletişime geçin",
    },
    footer: {
      rights: "Tüm hakları saklıdır.",
      admin: "Admin Paneli",
    },
  },
  en: {
    nav: {
      home: "Home",
      services: "Services",
      appointment: "Appointment",
      contact: "Contact",
    },
    hero: {
      title: "Yusuf Nail Art",
      subtitle: "Professional Nail Care & Art",
      description: "We transform your nails into art with expert hands in a hygienic environment.",
      cta: "Book Now",
    },
    services: {
      title: "Our Services",
      subtitle: "Our services offered in a professional and hygienic environment",
      gelNails: {
        title: "Gel Nails",
        description: "Long-lasting, shiny and durable gel nail application. The ideal choice for natural-looking, break-resistant nails.",
      },
      prostheticNails: {
        title: "Prosthetic Nails",
        description: "Professional prosthetic nail application for broken or damaged nails. Natural appearance and long-lasting results.",
      },
      manicurePedicure: {
        title: "Manicure & Pedicure",
        description: "Comprehensive care service for your hands and feet. Cleaning, shaping and skin care all in one.",
      },
      nailArt: {
        title: "Nail Art",
        description: "Transform your nails into works of art with custom designs, patterns and decorative applications.",
      },
    },
    appointment: {
      title: "Book an Appointment",
      subtitle: "Choose a date and time that suits you",
      firstName: "First Name",
      lastName: "Last Name",
      date: "Date",
      time: "Time",
      service: "Service",
      selectService: "Select Service",
      selectDate: "Select Date",
      selectTime: "Select Time",
      submit: "Book Appointment",
      success: "Your appointment has been created successfully!",
      successDescription: "We will contact you as soon as possible.",
      error: "An error occurred. Please try again.",
    },
    whatsapp: {
      tooltip: "Contact via WhatsApp",
    },
    footer: {
      rights: "All rights reserved.",
      admin: "Admin Panel",
    },
  },
};

export type Language = "tr" | "en";
export type TranslationKey = keyof typeof translations.tr;
