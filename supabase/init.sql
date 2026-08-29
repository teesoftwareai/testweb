-- =====================================================================
--  Brightly CMS - Supabase Schema + Seed Data (SQL)
--  Run this in the Supabase SQL Editor.
--
--  Tables
--    settings          : site branding, hero text, contact info, footer text
--    features          : 'เหตุผลที่เลือกเรา' section
--    services          : 'บริการของเรา' section
--    process_steps     : 'วิธีทำงาน' section
--    stats             : ตัวเลขสถิติ
--    testimonials      : รีวิวลูกค้า
--    logos             : โลโก้แบรนด์ลูกค้า (logo bar)
--    messages          : ข้อความจากแบบฟอร์มติดต่อ
--    admin_roles       : ตรวจว่า user ได้รับสิทธิ์ admin หรือไม่
--
--  RLS (Row Level Security):
--    - anon          : SELECT เนื้อหาสาธารณะ, INSERT messages (ส่งแบบฟอร์ม)
--    - authenticated : CRUD เนื้อหา (เข้าใช้งานหลังบ้าน)
-- =====================================================================

-- ---------- EXTENSIONS ----------
create extension if not exists "uuid-ossp";

-- ---------- SETTINGS ----------
create table if not exists public.settings (
  id uuid primary key default uuid_generate_v4(),
  key text unique not null,
  value jsonb not null default '{}'::jsonb,
  updated_at timestamptz default now()
);

-- ---------- FEATURES ----------
create table if not exists public.features (
  id uuid primary key default uuid_generate_v4(),
  icon text,
  title text not null,
  description text,
  sort_order int default 0,
  created_at timestamptz default now()
);

-- ---------- SERVICES ----------
create table if not exists public.services (
  id uuid primary key default uuid_generate_v4(),
  icon text,
  title text not null,
  description text,
  tag text default '',
  sort_order int default 0,
  created_at timestamptz default now()
);

-- ---------- PROCESS STEPS ----------
create table if not exists public.process_steps (
  id uuid primary key default uuid_generate_v4(),
  step_number int not null,
  icon text,
  title text not null,
  description text,
  sort_order int default 0,
  created_at timestamptz default now()
);

-- ---------- STATS ----------
create table if not exists public.stats (
  id uuid primary key default uuid_generate_v4(),
  value text not null,
  label text not null,
  sort_order int default 0,
  created_at timestamptz default now()
);

-- ---------- TESTIMONIALS ----------
create table if not exists public.testimonials (
  id uuid primary key default uuid_generate_v4(),
  quote text not null,
  name text not null,
  role text,
  initials text,
  avatar_url text,
  color text,
  sort_order int default 0,
  created_at timestamptz default now()
);

-- ---------- LOGOS ----------
create table if not exists public.logos (
  id uuid primary key default uuid_generate_v4(),
  name text not null,
  sort_order int default 0,
  created_at timestamptz default now()
);

-- ---------- MESSAGES (contact form) ----------
create table if not exists public.messages (
  id uuid primary key default uuid_generate_v4(),
  name text not null,
  email text not null,
  phone text default '',
  message text not null,
  is_read boolean default false,
  created_at timestamptz default now()
);

-- ---------- ADMIN ROLES ----------
create table if not exists public.admin_roles (
  id uuid primary key default uuid_generate_v4(),
  user_id uuid not null references auth.users(id) on delete cascade,
  email text,
  role text default 'admin',
  created_at timestamptz default now()
);

-- =====================================================================
--  SEED DATA  (ต้นแบบจากหน้าเว็บปัจจุบัน)
-- =====================================================================

-- SETTINGS
insert into public.settings (key, value) values
  ('site', '{
      "name": "Brightly",
      "logoLetter": "B",
      "tagline": "โซลูชันธุรกิจครบวงจร",
      "badge": "เปิดตัวโซลูชันใหม่ล่าสุดปี 2026",
      "heroTitle1": "ขับเคลื่อนธุรกิจของคุณให้",
      "heroTitleHighlight": "เติบโตอย่างก้าวกระโดด",
      "heroSubtitle": "Brightly รวบรวมเครื่องมือและทีมผู้เชี่ยวชาญไว้ในที่เดียว ช่วยให้คุณโฟกัสกับสิ่งที่ทำได้ดีที่สุด เราจัดการส่วนที่เหลือให้ทั้งหมด",
      "heroPerks": ["ไม่มีค่าใช้จ่ายแฝง", "เริ่มได้ใน 7 วัน", "ยกเลิกได้ตลอด"],
      "heroHighlight1Label": "รายได้เพิ่มขึ้น",
      "heroHighlight1Value": "+38%",
      "heroHighlight2Label": "ความพึงพอใจลูกค้า",
      "heroHighlight2Value": "96%",
      "heroCustomers": "ลูกค้า 1,200+"
    }'::jsonb),
  ('contact', '{
      "addressLines": ["123 ถนนสุขุมวิท แขวงคลองเตย", "เขตคลองเตย กรุงเทพฯ 10110"],
      "phoneLines": ["02-123-4567", "08x-xxx-xxxx (มือถือ)"],
      "emailLines": ["hello@brightly.co.th", "support@brightly.co.th"],
      "hoursLines": ["จันทร์ - ศุกร์ 9:00 - 18:00", "เสาร์ - อาทิตย์ ปิดทำการ"],
      "contactHeadline": "เริ่มต้นบทสนทนากับเรา",
      "contactIntro": "มีคำถาม หรืออยากได้คำแนะนำสำหรับธุรกิจของคุณ? ทิ้งข้อความไว้ แล้วทีมงานจะติดต่อกลับภายใน 24 ชั่วโมง",
      "footerText": "โซลูชันครบวงจรสำหรับธุรกิจยุคใหม่ ช่วยให้คุณเติบโตอย่างยั่งยืนด้วยทีมผู้เชี่ยวชาญและเทคโนโลยีที่ทันสมัย",
      "copyright": "© 2026 Brightly Co., Ltd. สงวนลิขสิทธิ์",
      "footerColumns": [
        {"title": "บริการ", "links": ["ที่ปรึกษาธุรกิจ", "ออกแบบแบรนด์", "พัฒนาเว็บไซต์", "การตลาดดิจิทัล", "วิเคราะห์ข้อมูล"]},
        {"title": "บริษัท", "links": ["เกี่ยวกับเรา", "ทีมงาน", "ผลงาน", "บล็อก", "ร่วมงานกับเรา"]},
        {"title": "สนับสนุน", "links": ["ศูนย์ช่วยเหลือ", "เอกสาร", "นโยบายความเป็นส่วนตัว", "ข้อกำหนดการใช้งาน"]}
      ]
    }'::jsonb),
  ('cta', '{
      "eyebrow": "พร้อมเริ่มต้นหรือยัง?",
      "title": "พร้อมพาธุรกิจของคุณไปอีกขั้นแล้วหรือยัง?",
      "subtitle": "ทดลองใช้ฟรี ไม่มีบัตรเครดิต ไม่มีข้อผูกมัด ทีมงานพร้อมตอบทุกคำถามของคุณ",
      "primaryLabel": "เริ่มต้นใช้งานฟรี",
      "secondaryLabel": "พูดคุยกับทีมงาน"
    }'::jsonb);

-- FEATURES
insert into public.features (icon, title, description, sort_order) values
  ('Zap', 'รวดเร็ว ทันใจ', 'เริ่มใช้งานได้อย่างรวดเร็วภายในไม่กี่นาที โดยไม่ต้องมีความรู้ด้านเทคนิคขั้นสูง', 1),
  ('ShieldCheck', 'ปลอดภัยระดับองค์กร', 'ระบบรักษาความปลอดภัยหลายชั้น ข้อมูลของคุณถูกเข้ารหัสและสำรองข้อมูลอัตโนมัติ', 2),
  ('Users', 'ทีมดูแลใกล้ชิด', 'ทีมผู้เชี่ยวชาญพร้อมให้การสนับสนุนตลอด 24 ชั่วโมงผ่านทุกช่องทาง', 3),
  ('Rocket', 'เติบโตไม่มีสะดุด', 'ระบบออกแบบมาเพื่อรองรับการขยายตัวของธุรกิจคุณอย่างไม่จำกัด', 4);

-- SERVICES
insert into public.services (icon, title, description, tag, sort_order) values
  ('Briefcase', 'ที่ปรึกษาธุรกิจ', 'วางกลยุทธ์และแผนธุรกิจที่ชัดเจน พร้อมดูแลตั้งแต่เริ่มต้นจนถึงการขยายเติบโต', 'ยอดนิยม', 1),
  ('Palette', 'ออกแบบแบรนด์', 'สร้างแบรนด์ที่จดจำได้ ทั้งโลโก้ อัตลักษณ์ และคู่มือการใช้งานสำหรับทุกช่องทาง', 'ใหม่', 2),
  ('Code2', 'พัฒนาเว็บไซต์', 'เว็บไซต์ที่ทันสมัย รองรับทุกอุปกรณ์ และโหลดเร็ว เพื่อประสบการณ์ที่ดีที่สุดของลูกค้า', '', 3),
  ('Megaphone', 'การตลาดดิจิทัล', 'วางแผนการตลาดออนไลน์แบบครบวงจร ตั้งแต่โฆษณา เนื้อหา จนถึงการวิเคราะห์ผล', '', 4),
  ('LineChart', 'วิเคราะห์ข้อมูล', 'แปลงข้อมูลให้เป็นข้อมูลเชิงลึกที่นำไปใช้ได้จริงเพื่อการตัดสินใจที่ชาญฉลาด', '', 5),
  ('HeadphonesIcon', 'ดูแลระบบต่อเนื่อง', 'บริการดูแลระบบและซัพพอร์ตหลังการส่งมอบ ให้ธุรกิจดำเนินไปได้อย่างราบรื่น', '', 6);

-- PROCESS STEPS
insert into public.process_steps (step_number, icon, title, description, sort_order) values
  (1, 'Search', 'ศึกษาปัญหา', 'เริ่มต้นด้วยการทำความเข้าใจธุรกิจ ความต้องการ และเป้าหมายของคุณอย่างลึกซึ้ง', 1),
  (2, 'Lightbulb', 'วางแผนกลยุทธ์', 'ออกแบบแนวทางและแผนการดำเนินงานที่ชัดเจน วัดผลได้จริง สอดคล้องกับงบประมาณ', 2),
  (3, 'Hammer', 'ลงมือดำเนินงาน', 'ลงมือทำอย่างเป็นระบบ พร้อมรายงานความคืบหน้าให้คุณทราบอย่างสม่ำเสมอ', 3),
  (4, 'Rocket', 'ส่งมอบและติดผล', 'ส่งมอบผลงานตามกำหนด พร้อมติดตามผลลัพธ์และปรับปรุงให้ดียิ่งขึ้นต่อเนื่อง', 4);

-- STATS
insert into public.stats (value, label, sort_order) values
  ('1,200+', 'ลูกค้าที่ไว้วางใจเรา', 1),
  ('98%', 'อัตราความพึงพอใจ', 2),
  ('8 ปี', 'ประสบการณ์การทำงาน', 3),
  ('24/7', 'สนับสนุนตลอดเวลา', 4);

-- TESTIMONIALS
insert into public.testimonials (quote, name, role, initials, color, sort_order) values
  ('ตั้งแต่ใช้บริการ Brightly ยอดขายของเราเพิ่มขึ้นเกือบเท่าตัวภายใน 6 เดือน ทีมงานดูแลกันอย่างดีมาก ไม่เคยปล่อยให้เรารอคำตอบนานเลย', 'คุณสมชาย วงศ์ไพศาล', 'CEO, บริษัท ไทยฟู้ด มาร์ท จำกัด', 'ส', 'from-amber-400 to-orange-500', 1),
  ('เป็นครั้งแรกที่รู้สึกว่าเอาใจช่วยธุรกิจเราแบบจริงจัง ทุกอย่างโปร่งใส เข้าใจง่าย และเห็นผลจริง เหนือความคาดหมายมาก ๆ', 'คุณพิมพ์ชนก รัตนมณี', 'ผู้ก่อตั้ง, กิจการ Bloom & Co.', 'พ', 'from-violet-400 to-fuchsia-500', 2),
  ('เว็บไซต์ที่ทีมออกแบบให้สวยเกินคาด ลูกค้าหลายรายชมตลอด และช่วยให้แบรนด์เราดูเป็นมืออาชีพขึ้นมาก เห็นผลเรื่องยอดเพิ่มชัดเจน', 'คุณกิตติภพ สุวรรณศรี', 'Managing Director, Skyline Digital', 'ก', 'from-brand-500 to-violet-600', 3);

-- LOGOS
insert into public.logos (name, sort_order) values
  ('NovaTech', 1),
  ('Skyline Co.', 2),
  ('라온그룹', 3),
  ('Peak Digital', 4),
  ('Orbit Studio', 5),
  ('Harmony', 6),
  ('Vertex', 7);

-- =====================================================================
--  ROW LEVEL SECURITY POLICIES
-- =====================================================================
alter table public.settings enable row level security;
alter table public.features enable row level security;
alter table public.services enable row level security;
alter table public.process_steps enable row level security;
alter table public.stats enable row level security;
alter table public.testimonials enable row level security;
alter table public.logos enable row level security;
alter table public.messages enable row level security;
alter table public.admin_roles enable row level security;

-- Public read (anon)
create policy "anon read settings" on public.settings for select using (true);
create policy "anon read features" on public.features for select using (true);
create policy "anon read services" on public.services for select using (true);
create policy "anon read process" on public.process_steps for select using (true);
create policy "anon read stats" on public.stats for select using (true);
create policy "anon read testimonials" on public.testimonials for select using (true);
create policy "anon read logos" on public.logos for select using (true);

-- Visitors can submit contact messages
create policy "anon insert messages" on public.messages for insert with check (true);
-- Only authenticated can view/update/delete messages
create policy "auth read messages" on public.messages for select using (auth.role() = 'authenticated');
create policy "auth update messages" on public.messages for update using (auth.role() = 'authenticated');
create policy "auth delete messages" on public.messages for delete using (auth.role() = 'authenticated');

-- Authenticated admin full CRUD on content tables
create policy "auth all settings" on public.settings for all using (auth.role() = 'authenticated') with check (auth.role() = 'authenticated');
create policy "auth all features" on public.features for all using (auth.role() = 'authenticated') with check (auth.role() = 'authenticated');
create policy "auth all services" on public.services for all using (auth.role() = 'authenticated') with check (auth.role() = 'authenticated');
create policy "auth all process" on public.process_steps for all using (auth.role() = 'authenticated') with check (auth.role() = 'authenticated');
create policy "auth all stats" on public.stats for all using (auth.role() = 'authenticated') with check (auth.role() = 'authenticated');
create policy "auth all testimonials" on public.testimonials for all using (auth.role() = 'authenticated') with check (auth.role() = 'authenticated');
create policy "auth all logos" on public.logos for all using (auth.role() = 'authenticated') with check (auth.role() = 'authenticated');

-- admin_roles: any authenticated user can read (to check admin status), insert to self
create policy "auth read admin_roles" on public.admin_roles for select using (auth.role() = 'authenticated');
create policy "auth insert admin_roles" on public.admin_roles for insert with check (auth.role() = 'authenticated');
create policy "auth update admin_roles" on public.admin_roles for update using (auth.role() = 'authenticated') with check (auth.role() = 'authenticated');

-- =====================================================================
--  NOTE (สำคัญ):
--  เพื่อให้ผู้ใช้รายแรกที่สมัครผ่านหน้า Admin เป็น "admin" ได้
--  ให้เพิ่ม Trigger ด้านล่าง OR รันคำสั่งนี้เพื่อให้ทุกคนที่สมัครเป็น admin
--  (ใช้ในขั้น dev / โปรเจกต์ที่สมัครเองได้)
--  ถ้าต้องการจำกัดเฉพาะบางอีเมล ให้แก้เงื่อนไขใน IF
-- =====================================================================
create or replace function public.handle_new_admin()
returns trigger
language plpgsql
security definer set search_path = public
as $$
begin
  insert into public.admin_roles (user_id, email, role)
  values (new.id, new.email, 'admin');
  return new;
end;
$$;

drop trigger if exists on_auth_user_admin on auth.users;
create trigger on_auth_user_admin
  after insert on auth.users
  for each row execute procedure public.handle_new_admin();
