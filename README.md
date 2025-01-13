This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.js`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

Taski Frontend
โปรเจกต์ Taski Frontend สำหรับจัดการงาน (Task Management) พัฒนาด้วย React และ Next.js

การติดตั้งโปรเจกต์
1. ดาวน์โหลดโปรเจกต์
Clone โปรเจกต์จาก GitHub:


git clone https://github.com/Fernlizer/task-front-meeSolutions


cd taski-frontend
2. ติดตั้ง Dependencies
ใช้คำสั่ง:

npm install
3. ตั้งค่า API URL
สร้างไฟล์ .env.local ใน root directory:


NEXT_PUBLIC_API_URL=http://127.0.0.1:4000
4. รันโปรเจกต์
ใช้คำสั่ง:

bash
Copy code
npm run dev
เปิดเว็บเบราว์เซอร์ที่ URL:


http://localhost:3000
การใช้งาน
สร้าง Task:

คลิกปุ่ม Add Task
กรอกข้อมูลในฟอร์มที่แสดงในป๊อปอัป
กด Create
แก้ไข Task:

คลิกไอคอน Edit บน Task ที่ต้องการ
แก้ไขข้อมูลในฟอร์ม
กด Save
ลบ Task:

คลิกไอคอน Delete บน Task ที่ต้องการ
ยืนยันการลบในป๊อปอัป
เปลี่ยนสถานะ Task:

คลิกไอคอน Check Circle เพื่อเปลี่ยนเป็น Completed
คลิกไอคอน Undo เพื่อเปลี่ยนเป็น Pending
ค้นหา Task:

พิมพ์คำค้นในช่อง Search tasks...
Tasks ที่ตรงกับคำค้นจะปรากฏแบบเรียลไทม์