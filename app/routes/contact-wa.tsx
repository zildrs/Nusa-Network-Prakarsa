
import React, { useEffect } from 'react';
import { createMetaFunction, seoData } from "~/lib/meta";
const WHATSAPP_URL = 'https://wa.me/6289683711115?text=Halo,%20saya%20melihat%20informasi%20ini%20di%20website%20dan%20ingin%20mengetahui%20detail%20solusinya.%20Terima%20kasih';

export const meta = createMetaFunction(seoData.contact);

export default function Contact() {

  useEffect(() => {
    window.open(WHATSAPP_URL, '_blank');

  }, []);

  return (
    <div style={{ padding: '20px', textAlign: 'center' }}>
      <h1>Mengalihkan...</h1>
      <p>Anda akan diarahkan ke WhatsApp untuk menghubungi kami.</p>
    </div>
  );
  
  }
