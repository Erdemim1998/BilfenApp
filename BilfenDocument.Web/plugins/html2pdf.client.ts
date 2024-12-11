export default defineNuxtPlugin(() => {
    if (process.client) {
      return {
        provide: {
          html2pdf: async () => {
            if (!(window as any).html2pdf) {
              // Script'i dinamik olarak yükle
              await new Promise<void>((resolve, reject) => {
                const script = document.createElement("script");
                script.src =
                  "https://cdnjs.cloudflare.com/ajax/libs/html2pdf.js/0.10.1/html2pdf.bundle.min.js";
                script.async = true;
                script.onload = () => {
                  if ((window as any).html2pdf) {
                    resolve();
                  } else {
                    reject(new Error("html2pdf yüklendi fakat obje bulunamadı."));
                  }
                };
                script.onerror = () => reject(new Error("html2pdf yüklenemedi."));
                document.head.appendChild(script);
              });
            }
            return (window as any).html2pdf;
          },
        },
      };
    }
  });
  