-- =====================================================================
--  Brightly CMS - MySQL Schema + Seed Data
--  สำหรับระบบเว็บสำเร็จรูป (ระบบหลังเดียวกันกับเวอร์ชัน Supabase)
--
--  รันที่ phpMyAdmin / MySQL ได้โดยตรง
--    - สร้างฐานข้อมูลก่อน:  CREATE DATABASE brightly_cms CHARACTER SET utf8mb4;
--    - USE brightly_cms;
--    - แล้วรันสคริปต์นี้
-- =====================================================================

SET NAMES utf8mb4;
SET time_zone = '+07:00';

-- ---------- USERS (ผู้ดูแลระบบ) ----------
CREATE TABLE IF NOT EXISTS users (
  id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  email VARCHAR(255) NOT NULL UNIQUE,
  password_hash VARCHAR(255) NOT NULL COMMENT 'เก็บ bcrypt/argon2 hash ไม่เก็บรหัสผ่านชัดเจน',
  role ENUM('admin','editor') NOT NULL DEFAULT 'admin',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ---------- SETTINGS (ข้อมูลแบบ key/value + JSON) ----------
CREATE TABLE IF NOT EXISTS settings (
  id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  `key` VARCHAR(100) NOT NULL UNIQUE,
  value JSON NOT NULL,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ---------- FEATURES ----------
CREATE TABLE IF NOT EXISTS features (
  id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  icon VARCHAR(50) DEFAULT NULL,
  title VARCHAR(200) NOT NULL,
  description TEXT,
  sort_order INT DEFAULT 0,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ---------- SERVICES ----------
CREATE TABLE IF NOT EXISTS services (
  id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  icon VARCHAR(50) DEFAULT NULL,
  title VARCHAR(200) NOT NULL,
  description TEXT,
  tag VARCHAR(50) DEFAULT '',
  sort_order INT DEFAULT 0,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ---------- PROCESS STEPS ----------
CREATE TABLE IF NOT EXISTS process_steps (
  id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  step_number INT NOT NULL,
  icon VARCHAR(50) DEFAULT NULL,
  title VARCHAR(200) NOT NULL,
  description TEXT,
  sort_order INT DEFAULT 0,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ---------- STATS ----------
CREATE TABLE IF NOT EXISTS stats (
  id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  `value` VARCHAR(50) NOT NULL,
  label VARCHAR(200) NOT NULL,
  sort_order INT DEFAULT 0,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ---------- TESTIMONIALS ----------
CREATE TABLE IF NOT EXISTS testimonials (
  id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  quote TEXT NOT NULL,
  `name` VARCHAR(200) NOT NULL,
  role VARCHAR(200) DEFAULT NULL,
  initials VARCHAR(10) DEFAULT NULL,
  avatar_url VARCHAR(500) DEFAULT NULL,
  color VARCHAR(100) DEFAULT NULL,
  sort_order INT DEFAULT 0,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ---------- LOGOS ----------
CREATE TABLE IF NOT EXISTS logos (
  id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  `name` VARCHAR(200) NOT NULL,
  sort_order INT DEFAULT 0,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ---------- MESSAGES (จากแบบฟอร์มติดต่อ) ----------
CREATE TABLE IF NOT EXISTS messages (
  id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  `name` VARCHAR(200) NOT NULL,
  email VARCHAR(255) NOT NULL,
  phone VARCHAR(50) DEFAULT '',
  message TEXT NOT NULL,
  is_read TINYINT(1) NOT NULL DEFAULT 0,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- =====================================================================
--  SEED DATA  (ต้นแบบจากหน้าเว็บปัจจุบัน)
-- =====================================================================

INSERT INTO settings (`key`, value) VALUES
('site', JSON_OBJECT(
  'name', 'Brightly',
  'logoLetter', 'B',
  'badge', 'เปิดตัวโซลูชันใหม่ล่าสุดปี 2026',
  'heroTitle1', 'ขับเคลื่อนธุรกิจของคุณให้',
  'heroTitleHighlight', 'เติบโตอย่างก้าวกระโดด',
  'heroSubtitle', 'Brightly รวบรวมเครื่องมือและทีมผู้เชี่ยวชาญไว้ในที่เดียว ช่วยให้คุณโฟกัสกับสิ่งที่ทำได้ดีที่สุด เราจัดการส่วนที่เหลือให้ทั้งหมด',
  'heroPerks', JSON_ARRAY('ไม่มีค่าใช้จ่ายแฝง', 'เริ่มได้ใน 7 วัน', 'ยกเลิกได้ตลอด'),
  'heroHighlight1Label', 'รายได้เพิ่มขึ้น',
  'heroHighlight1Value', '+38%',
  'heroHighlight2Label', 'ความพึงพอใจลูกค้า',
  'heroHighlight2Value', '96%',
  'heroCustomers', 'ลูกค้า 1,200+'
)),
('contact', JSON_OBJECT(
  'addressLines', JSON_ARRAY('123 ถนนสุขุมวิท แขวงคลองเตย', 'เขตคลองเตย กรุงเทพฯ 10110'),
  'phoneLines', JSON_ARRAY('02-123-4567', '08x-xxx-xxxx (มือถือ)'),
  'emailLines', JSON_ARRAY('hello@brightly.co.th', 'support@brightly.co.th'),
  'hoursLines', JSON_ARRAY('จันทร์ - ศุกร์ 9:00 - 18:00', 'เสาร์ - อาทิตย์ ปิดทำการ'),
  'contactHeadline', 'เริ่มต้นบทสนทนากับเรา',
  'contactIntro', 'มีคำถาม หรืออยากได้คำแนะนำสำหรับธุรกิจของคุณ? ทิ้งข้อความไว้ แล้วทีมงานจะติดต่อกลับภายใน 24 ชั่วโมง',
  'footerText', 'โซลูชันครบวงจรสำหรับธุรกิจยุคใหม่ ช่วยให้คุณเติบโตอย่างยั่งยืนด้วยทีมผู้เชี่ยวชาญและเทคโนโลยีที่ทันสมัย',
  'footerColumns', JSON_ARRAY(
    JSON_OBJECT('title', 'บริการ', 'links', JSON_ARRAY('ที่ปรึกษาธุรกิจ', 'ออกแบบแบรนด์', 'พัฒนาเว็บไซต์', 'การตลาดดิจิทัล', 'วิเคราะห์ข้อมูล')),
    JSON_OBJECT('title', 'บริษัท', 'links', JSON_ARRAY('เกี่ยวกับเรา', 'ทีมงาน', 'ผลงาน', 'บล็อก', 'ร่วมงานกับเรา')),
    JSON_OBJECT('title', 'สนับสนุน', 'links', JSON_ARRAY('ศูนย์ช่วยเหลือ', 'เอกสาร', 'นโยบายความเป็นส่วนตัว', 'ข้อกำหนดการใช้งาน'))
  )
)),
('cta', JSON_OBJECT(
  'eyebrow', 'พร้อมเริ่มต้นหรือยัง?',
  'title', 'พร้อมพาธุรกิจของคุณไปอีกขั้นแล้วหรือยัง?',
  'subtitle', 'ทดลองใช้ฟรี ไม่มีบัตรเครดิต ไม่มีข้อผูกมัด ทีมงานพร้อมตอบทุกคำถามของคุณ',
  'primaryLabel', 'เริ่มต้นใช้งานฟรี',
  'secondaryLabel', 'พูดคุยกับทีมงาน'
));

INSERT INTO features (icon, title, description, sort_order) VALUES
('Zap', 'รวดเร็ว ทันใจ', 'เริ่มใช้งานได้อย่างรวดเร็วภายในไม่กี่นาที โดยไม่ต้องมีความรู้ด้านเทคนิคขั้นสูง', 1),
('ShieldCheck', 'ปลอดภัยระดับองค์กร', 'ระบบรักษาความปลอดภัยหลายชั้น ข้อมูลของคุณถูกเข้ารหัสและสำรองข้อมูลอัตโนมัติ', 2),
('Users', 'ทีมดูแลใกล้ชิด', 'ทีมผู้เชี่ยวชาญพร้อมให้การสนับสนุนตลอด 24 ชั่วโมงผ่านทุกช่องทาง', 3),
('Rocket', 'เติบโตไม่มีสะดุด', 'ระบบออกแบบมาเพื่อรองรับการขยายตัวของธุรกิจคุณอย่างไม่จำกัด', 4);

INSERT INTO services (icon, title, description, tag, sort_order) VALUES
('Briefcase', 'ที่ปรึกษาธุรกิจ', 'วางกลยุทธ์และแผนธุรกิจที่ชัดเจน พร้อมดูแลตั้งแต่เริ่มต้นจนถึงการขยายเติบโต', 'ยอดนิยม', 1),
('Palette', 'ออกแบบแบรนด์', 'สร้างแบรนด์ที่จดจำได้ ทั้งโลโก้ อัตลักษณ์ และคู่มือการใช้งานสำหรับทุกช่องทาง', 'ใหม่', 2),
('Code2', 'พัฒนาเว็บไซต์', 'เว็บไซต์ที่ทันสมัย รองรับทุกอุปกรณ์ และโหลดเร็ว เพื่อประสบการณ์ที่ดีที่สุดของลูกค้า', '', 3),
('Megaphone', 'การตลาดดิจิทัล', 'วางแผนการตลาดออนไลน์แบบครบวงจร ตั้งแต่โฆษณา เนื้อหา จนถึงการวิเคราะห์ผล', '', 4),
('LineChart', 'วิเคราะห์ข้อมูล', 'แปลงข้อมูลให้เป็นข้อมูลเชิงลึกที่นำไปใช้ได้จริงเพื่อการตัดสินใจที่ชาญฉลาด', '', 5),
('HeadphonesIcon', 'ดูแลระบบต่อเนื่อง', 'บริการดูแลระบบและซัพพอร์ตหลังการส่งมอบ ให้ธุรกิจดำเนินไปได้อย่างราบรื่น', '', 6);

INSERT INTO process_steps (step_number, icon, title, description, sort_order) VALUES
(1, 'Search', 'ศึกษาปัญหา', 'เริ่มต้นด้วยการทำความเข้าใจธุรกิจ ความต้องการ และเป้าหมายของคุณอย่างลึกซึ้ง', 1),
(2, 'Lightbulb', 'วางแผนกลยุทธ์', 'ออกแบบแนวทางและแผนการดำเนินงานที่ชัดเจน วัดผลได้จริง สอดคล้องกับงบประมาณ', 2),
(3, 'Hammer', 'ลงมือดำเนินงาน', 'ลงมือทำอย่างเป็นระบบ พร้อมรายงานความคืบหน้าให้คุณทราบอย่างสม่ำเสมอ', 3),
(4, 'Rocket', 'ส่งมอบและติดผล', 'ส่งมอบผลงานตามกำหนด พร้อมติดตามผลลัพธ์และปรับปรุงให้ดียิ่งขึ้นต่อเนื่อง', 4);

INSERT INTO stats (`value`, label, sort_order) VALUES
('1,200+', 'ลูกค้าที่ไว้วางใจเรา', 1),
('98%', 'อัตราความพึงพอใจ', 2),
('8 ปี', 'ประสบการณ์การทำงาน', 3),
('24/7', 'สนับสนุนตลอดเวลา', 4);

INSERT INTO testimonials (quote, `name`, role, initials, color, sort_order) VALUES
('ตั้งแต่ใช้บริการ Brightly ยอดขายของเราเพิ่มขึ้นเกือบเท่าตัวภายใน 6 เดือน ทีมงานดูแลกันอย่างดีมาก ไม่เคยปล่อยให้เรารอคำตอบนานเลย', 'คุณสมชาย วงศ์ไพศาล', 'CEO, บริษัท ไทยฟู้ด มาร์ท จำกัด', 'ส', 'from-amber-400 to-orange-500', 1),
('เป็นครั้งแรกที่รู้สึกว่าเอาใจช่วยธุรกิจเราแบบจริงจัง ทุกอย่างโปร่งใส เข้าใจง่าย และเห็นผลจริง เหนือความคาดหมายมาก ๆ', 'คุณพิมพ์ชนก รัตนมณี', 'ผู้ก่อตั้ง, กิจการ Bloom & Co.', 'พ', 'from-violet-400 to-fuchsia-500', 2),
('เว็บไซต์ที่ทีมออกแบบให้สวยเกินคาด ลูกค้าหลายรายชมตลอด และช่วยให้แบรนด์เราดูเป็นมืออาชีพขึ้นมาก เห็นผลเรื่องยอดเพิ่มชัดเจน', 'คุณกิตติภพ สุวรรณศรี', 'Managing Director, Skyline Digital', 'ก', 'from-brand-500 to-violet-600', 3);

INSERT INTO logos (`name`, sort_order) VALUES
('NovaTech', 1),
('Skyline Co.', 2),
('라온그룹', 3),
('Peak Digital', 4),
('Orbit Studio', 5),
('Harmony', 6),
('Vertex', 7);
