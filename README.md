# Brightly — เว็บไซต์สำเร็จรูป (CMS) with Supabase

เว็บไซต์สำเร็จรูป (Ready-made website) ที่ดัดแปลงจากหน้าเว็บต้นแบบให้เป็นระบบจัดการเนื้อหาหลังบ้าน
ข้อมูลทั้งหมดถูกเก็บไว้ที่ **Supabase** หลังบ้าน และสามารถสลับไปใช้ **MySQL** ได้จากไฟล์ SQL ที่ให้มา

## คุณสมบัติ

- **หน้าเว็บ (Public)** — ดึงข้อมูลเนื้อหาทุกส่วนจาก Supabase แบบเรียลไทม์
- **ระบบล็อกอิน admin** — เข้าใช้งานผ่าน Supabase Auth (อีเมล + รหัสผ่าน)
- **ระบบจัดการหลังบ้าน (Dashboard)** ที่ `/admin/dashboard`
  - ตั้งค่าหน้าเว็บ (แบรนด์, Hero, ข้อมูลติดต่อ, Footer, CTA)
  - จัดการเนื้อหาทุกส่วน: เหตุผลที่เลือกเรา, บริการ, วิธีทำงาน, สถิติ, รีวิวลูกค้า, โลโก้
  - จัดการรูปภาพ (Media) ผ่าน Storage bucket `images`
  - ดู/จัดการข้อความจากแบบฟอร์มติดต่อ

## เทคโนโลยี

- React 19 + Vite + Tailwind CSS v4 + react-router-dom
- @supabase/supabase-js
- Supabase: Database (Postgres) + Auth + Storage

## การติดตั้ง

```bash
npm install
```

สร้างไฟล์ `.env` (ดูได้จาก `.env.example`):

```
VITE_SUPABASE_URL=https://cbfbckrnhllgjpxtanvs.supabase.co
VITE_SUPABASE_ANON_KEY=sb_publishable_mKWA9wgVtswNbp_qnqNyeA_KxT6dWIf
```

รันโปรเจกต์:

```bash
npm run dev      # dev server
npm run build    # build production
npm run lint     # ตรวจโค้ด
```

## การตั้งค่า Supabase

1. เปิด **Supabase Dashboard** → เลือกโปรเจกต์ `cbfbckrnhllgjpxtanvs`
2. ไปที่ **SQL Editor** → รันสคริปต์ `supabase/init.sql` ทั้งหมด (สร้างตาราง + seed ข้อมูลจากหน้าเว็บต้นแบบ + RLS policies)
3. ไปที่ **Storage** → สร้าง bucket ชื่อ `images` และตั้งค่าให้ **Public** (สิทธิ์อ่านภาพสาธารณะ)
   - ตั้ง Policy: `public/` ให้ `SELECT` สำหรับทุกคน
4. ไปที่ **Authentication** → เปิดใช้งาน email/password provider (ถ้ายังไม่เปิด)
5. เปิดหน้าเว็บ → ไปที่ `/admin` → กด **สมัครสมาชิก** เพื่อสร้างบัญชี admin แรก
   - ระบบจะเพิ่มผู้ใช้ใหม่เข้าเป็น admin อัตโนมัติ (ตาม trigger ใน `init.sql`)
   - ถ้าอยากจำกัดเฉพาะอีเมล ให้แก้เงื่อนไขใน `handle_new_admin()` ใน `init.sql`

> หมายเหตุ: ถ้าสมัครแบบไม่ยืนยันอีเมล (email confirmation ปิดอยู่) จะเข้าสู่ระบบได้ทันที
> ถ้าเปิด email confirmation อยู่ ต้องยืนยันอีเมลก่อนล็อกอิน

## โครงสร้างโปรเจกต์

```
src/
  main.jsx                 # จุดเริ่มต้น + routing (/ และ /admin)
  App.jsx                  # หน้าเว็บสาธารณะ
  lib/
    supabase.js            # Supabase client + config
    content.js             # ค่าต้นแบบ + mapping ไอคอน (fallback)
  context/
    SiteContext.jsx        # โหลดเนื้อหาทุกส่วนจาก Supabase ให้หน้าเว็บ
  components/              # หน้าเว็บสาธารณะ
  admin/
    AdminLogin.jsx         # หน้า login/สมัคร (Supabase Auth)
    AdminDashboard.jsx     # หลังบ้าน + sidebar
    SettingsEditor.jsx     # แก้ไข settings
    ListEditor.jsx         # CRUD ทั่วไปสำหรับตารางเนื้อหา
    Messages.jsx           # จัดการข้อความติดต่อ
    MediaManager.jsx       # จัดการรูปภาพใน Storage
    adminUtils.jsx         # helper ร่วม

supabase/init.sql          # สคริปต์สร้างตาราง Supabase + seed + RLS
brightly_cms.sql           # SQL สำหรับ MySQL (โครงสร้าง + seed เทียบเท่า)
```

## ไฟล์ MySQL

ไฟล์ `brightly_cms.sql` ในโฟลเดอร์นี้เป็น schema ฉบับ MySQL ที่มีโครงสร้างตารางและข้อมูลต้นแบบครบ
ใช้ได้กับ phpMyAdmin/XAMPP ได้ทันที หากต้องการย้ายไปใช้ MySQL จริง (แทน Supabase)
ต้องเขียน layer การเชื่อมต่อในโค้ดให้ชี้ไปยัง MySQL ใหม่ (ปัจจุบันชี้ไปที่ Supabase)
