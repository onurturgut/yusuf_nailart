export const translations = {
  tr: {
    common: {
      bookingIntroFirst:
        "Yusuf Nail Art olarak, güzelliği detaylarda saklı bir sanat olarak görüyoruz. Her tasarımımızda estetik, hijyen ve kişisel tarzı ön planda tutarak müşterilerimize özgün ve kaliteli nail art hizmeti sunuyoruz.",
      bookingIntroSecond:
        "Modern trendleri yakından takip ediyor, her müşterimizin stiline özel tasarımlar oluşturuyoruz. Amacımız yalnızca güzel tırnaklar değil; kendinizi özel ve özgüvenli hissetmenizi sağlayan bir deneyim sunmaktır.",
    },
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
        description: "Uzun ömürlü, parlak ve dayanıklı jel tırnak uygulaması.",
      },
      prostheticNails: {
        title: "Protez Tırnak ve Bakımı",
        description: "Kırık veya hasarlı tırnaklar için profesyonel protez tırnak uygulaması ve bakım hizmeti.",
      },
      manicurePedicure: {
        title: "Manikür ve Pedikür",
        description: "El ve ayak tırnaklarınız için kapsamlı bakım hizmeti.",
      },
      nailArt: {
        title: "Kalıcı Oje",
        description: "Uzun süre dayanıklı ve parlak görünüm sağlayan kalıcı oje uygulaması.",
      },
    },
    appointment: {
      title: "Randevu Oluştur",
      subtitle: "Size uygun tarih ve saati seçin",
      firstName: "Adınız",
      lastName: "Soyadınız",
      email: "E-posta Adresiniz",
      phone: "Telefon Numaranız",
      addons: "Ekstra Seçenekler",
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
    common: {
      bookingIntroFirst:
        "At Yusuf Nail Art, we see beauty as an art hidden in the details. In every design, we prioritize aesthetics, hygiene, and personal style to offer unique and high-quality nail art services.",
      bookingIntroSecond:
        "We closely follow modern trends and create designs tailored to each client's style. Our goal is not only beautiful nails, but also an experience that makes you feel special and confident.",
    },
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
        description: "Long-lasting, shiny and durable gel nail application.",
      },
      prostheticNails: {
        title: "Prosthetic Nails and Care",
        description: "Professional prosthetic nail application and care service for broken or damaged nails.",
      },
      manicurePedicure: {
        title: "Manicure and Pedicure",
        description: "Comprehensive care service for your hands and feet.",
      },
      nailArt: {
        title: "Permanent Gel Polish",
        description: "Long-lasting and glossy permanent gel polish application.",
      },
    },
    appointment: {
      title: "Book an Appointment",
      subtitle: "Choose a date and time that suits you",
      firstName: "First Name",
      lastName: "Last Name",
      email: "Email Address",
      phone: "Phone Number",
      addons: "Add-ons",
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
