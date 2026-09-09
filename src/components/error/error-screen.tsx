import { PayTopNav } from "@/components/pay/pay-top-nav";

// error screen ฝั่งลูกค้า — โครงเดียวกับหน้า /pay (top nav วิริยะ + การ์ดกลางจอ)
// ไม่มี directive: เรียกได้ทั้ง server (not-found) และ client (error.tsx)
// ไม่มีปุ่มนำทางไปหน้าอื่นโดยปริยาย — customer surface เปิดจาก payment link เท่านั้น

interface ErrorScreenProps {
  code?: string; // เช่น "404" — ตัวเลขใหญ่เหนือ title
  title: string;
  message: string;
  children?: React.ReactNode; // ปุ่ม action ต่อหน้า (เช่น ลองอีกครั้ง)
}

export function ErrorScreen({ code, title, message, children }: ErrorScreenProps) {
  return (
    <div className="min-h-svh bg-grey-200 font-sans">
      <PayTopNav />
      <main className="mx-auto flex max-w-lg flex-col items-center px-4 py-16 text-center">
        {code && <p className="mb-4 text-6xl font-bold text-crop-blue">{code}</p>}
        <h1 className="text-2xl font-medium text-grey-900">{title}</h1>
        <p className="mt-2 text-base text-grey-600">{message}</p>
        {children && <div className="mt-8 w-full space-y-3">{children}</div>}
      </main>
    </div>
  );
}
