import {
  Zap,
  ShieldCheck,
  Users,
  Rocket,
  Briefcase,
  Megaphone,
  Palette,
  Code2,
  LineChart,
  HeadphonesIcon,
  Search,
  Lightbulb,
  Hammer,
} from 'lucide-react'

export const iconMap = {
  Zap,
  ShieldCheck,
  Users,
  Rocket,
  Briefcase,
  Megaphone,
  Palette,
  Code2,
  LineChart,
  HeadphonesIcon,
  Search,
  Lightbulb,
  Hammer,
}

export const DEFAULT_SETTINGS = {
  site: {
    name: 'Brightly',
    logoLetter: 'B',
    tagline: 'โซลูชันธุรกิจครบวงจร',
    badge: 'เปิดตัวโซลูชันใหม่ล่าสุดปี 2026',
    heroTitle1: 'ขับเคลื่อนธุรกิจของคุณให้',
    heroTitleHighlight: 'เติบโตอย่างก้าวกระโดด',
    heroSubtitle:
      'Brightly รวบรวมเครื่องมือและทีมผู้เชี่ยวชาญไว้ในที่เดียว ช่วยให้คุณโฟกัสกับสิ่งที่ทำได้ดีที่สุด เราจัดการส่วนที่เหลือให้ทั้งหมด',
    heroPerks: ['ไม่มีค่าใช้จ่ายแฝง', 'เริ่มได้ใน 7 วัน', 'ยกเลิกได้ตลอด'],
    heroHighlight1Label: 'รายได้เพิ่มขึ้น',
    heroHighlight1Value: '+38%',
    heroHighlight2Label: 'ความพึงพอใจลูกค้า',
    heroHighlight2Value: '96%',
    heroCustomers: 'ลูกค้า 1,200+',
  },
  contact: {
    addressLines: ['123 ถนนสุขุมวิท แขวงคลองเตย', 'เขตคลองเตย กรุงเทพฯ 10110'],
    phoneLines: ['02-123-4567', '08x-xxx-xxxx (มือถือ)'],
    emailLines: ['hello@brightly.co.th', 'support@brightly.co.th'],
    hoursLines: ['จันทร์ - ศุกร์ 9:00 - 18:00', 'เสาร์ - อาทิตย์ ปิดทำการ'],
    contactHeadline: 'เริ่มต้นบทสนทนากับเรา',
    contactIntro:
      'มีคำถาม หรืออยากได้คำแนะนำสำหรับธุรกิจของคุณ? ทิ้งข้อความไว้ แล้วทีมงานจะติดต่อกลับภายใน 24 ชั่วโมง',
    footerText:
      'โซลูชันครบวงจรสำหรับธุรกิจยุคใหม่ ช่วยให้คุณเติบโตอย่างยั่งยืนด้วยทีมผู้เชี่ยวชาญและเทคโนโลยีที่ทันสมัย',
    copyright: `© ${new Date().getFullYear()} Brightly Co., Ltd. สงวนลิขสิทธิ์`,
    footerColumns: [
      {
        title: 'บริการ',
        links: [
          'ที่ปรึกษาธุรกิจ',
          'ออกแบบแบรนด์',
          'พัฒนาเว็บไซต์',
          'การตลาดดิจิทัล',
          'วิเคราะห์ข้อมูล',
        ],
      },
      {
        title: 'บริษัท',
        links: ['เกี่ยวกับเรา', 'ทีมงาน', 'ผลงาน', 'บล็อก', 'ร่วมงานกับเรา'],
      },
      {
        title: 'สนับสนุน',
        links: [
          'ศูนย์ช่วยเหลือ',
          'เอกสาร',
          'นโยบายความเป็นส่วนตัว',
          'ข้อกำหนดการใช้งาน',
        ],
      },
    ],
  },
  cta: {
    eyebrow: 'พร้อมเริ่มต้นหรือยัง?',
    title: 'พร้อมพาธุรกิจของคุณไปอีกขั้นแล้วหรือยัง?',
    subtitle:
      'ทดลองใช้ฟรี ไม่มีบัตรเครดิต ไม่มีข้อผูกมัด ทีมงานพร้อมตอบทุกคำถามของคุณ',
    primaryLabel: 'เริ่มต้นใช้งานฟรี',
    secondaryLabel: 'พูดคุยกับทีมงาน',
  },
}

export const DEFAULT_DATA = {
  features: [
    { id: 'd1', icon: 'Zap', title: 'รวดเร็ว ทันใจ', description: 'เริ่มใช้งานได้อย่างรวดเร็วภายในไม่กี่นาที โดยไม่ต้องมีความรู้ด้านเทคนิคขั้นสูง' },
    { id: 'd2', icon: 'ShieldCheck', title: 'ปลอดภัยระดับองค์กร', description: 'ระบบรักษาความปลอดภัยหลายชั้น ข้อมูลของคุณถูกเข้ารหัสและสำรองข้อมูลอัตโนมัติ' },
    { id: 'd3', icon: 'Users', title: 'ทีมดูแลใกล้ชิด', description: 'ทีมผู้เชี่ยวชาญพร้อมให้การสนับสนุนตลอด 24 ชั่วโมงผ่านทุกช่องทาง' },
    { id: 'd4', icon: 'Rocket', title: 'เติบโตไม่มีสะดุด', description: 'ระบบออกแบบมาเพื่อรองรับการขยายตัวของธุรกิจคุณอย่างไม่จำกัด' },
  ],
  services: [
    { id: 'd1', icon: 'Briefcase', title: 'ที่ปรึกษาธุรกิจ', description: 'วางกลยุทธ์และแผนธุรกิจที่ชัดเจน พร้อมดูแลตั้งแต่เริ่มต้นจนถึงการขยายเติบโต', tag: 'ยอดนิยม' },
    { id: 'd2', icon: 'Palette', title: 'ออกแบบแบรนด์', description: 'สร้างแบรนด์ที่จดจำได้ ทั้งโลโก้ อัตลักษณ์ และคู่มือการใช้งานสำหรับทุกช่องทาง', tag: 'ใหม่' },
    { id: 'd3', icon: 'Code2', title: 'พัฒนาเว็บไซต์', description: 'เว็บไซต์ที่ทันสมัย รองรับทุกอุปกรณ์ และโหลดเร็ว เพื่อประสบการณ์ที่ดีที่สุดของลูกค้า', tag: '' },
    { id: 'd4', icon: 'Megaphone', title: 'การตลาดดิจิทัล', description: 'วางแผนการตลาดออนไลน์แบบครบวงจร ตั้งแต่โฆษณา เนื้อหา จนถึงการวิเคราะห์ผล', tag: '' },
    { id: 'd5', icon: 'LineChart', title: 'วิเคราะห์ข้อมูล', description: 'แปลงข้อมูลให้เป็นข้อมูลเชิงลึกที่นำไปใช้ได้จริงเพื่อการตัดสินใจที่ชาญฉลาด', tag: '' },
    { id: 'd6', icon: 'HeadphonesIcon', title: 'ดูแลระบบต่อเนื่อง', description: 'บริการดูแลระบบและซัพพอร์ตหลังการส่งมอบ ให้ธุรกิจดำเนินไปได้อย่างราบรื่น', tag: '' },
  ],
  process_steps: [
    { id: 'd1', step_number: 1, icon: 'Search', title: 'ศึกษาปัญหา', description: 'เริ่มต้นด้วยการทำความเข้าใจธุรกิจ ความต้องการ และเป้าหมายของคุณอย่างลึกซึ้ง' },
    { id: 'd2', step_number: 2, icon: 'Lightbulb', title: 'วางแผนกลยุทธ์', description: 'ออกแบบแนวทางและแผนการดำเนินงานที่ชัดเจน วัดผลได้จริง สอดคล้องกับงบประมาณ' },
    { id: 'd3', step_number: 3, icon: 'Hammer', title: 'ลงมือดำเนินงาน', description: 'ลงมือทำอย่างเป็นระบบ พร้อมรายงานความคืบหน้าให้คุณทราบอย่างสม่ำเสมอ' },
    { id: 'd4', step_number: 4, icon: 'Rocket', title: 'ส่งมอบและติดผล', description: 'ส่งมอบผลงานตามกำหนด พร้อมติดตามผลลัพธ์และปรับปรุงให้ดียิ่งขึ้นต่อเนื่อง' },
  ],
  stats: [
    { id: 'd1', value: '1,200+', label: 'ลูกค้าที่ไว้วางใจเรา' },
    { id: 'd2', value: '98%', label: 'อัตราความพึงพอใจ' },
    { id: 'd3', value: '8 ปี', label: 'ประสบการณ์การทำงาน' },
    { id: 'd4', value: '24/7', label: 'สนับสนุนตลอดเวลา' },
  ],
  testimonials: [
    { id: 'd1', quote: 'ตั้งแต่ใช้บริการ Brightly ยอดขายของเราเพิ่มขึ้นเกือบเท่าตัวภายใน 6 เดือน ทีมงานดูแลกันอย่างดีมาก ไม่เคยปล่อยให้เรารอคำตอบนานเลย', name: 'คุณสมชาย วงศ์ไพศาล', role: 'CEO, บริษัท ไทยฟู้ด มาร์ท จำกัด', initials: 'ส', color: 'from-amber-400 to-orange-500' },
    { id: 'd2', quote: 'เป็นครั้งแรกที่รู้สึกว่าเอาใจช่วยธุรกิจเราแบบจริงจัง ทุกอย่างโปร่งใส เข้าใจง่าย และเห็นผลจริง เหนือความคาดหมายมาก ๆ', name: 'คุณพิมพ์ชนก รัตนมณี', role: 'ผู้ก่อตั้ง, กิจการ Bloom & Co.', initials: 'พ', color: 'from-violet-400 to-fuchsia-500' },
    { id: 'd3', quote: 'เว็บไซต์ที่ทีมออกแบบให้สวยเกินคาด ลูกค้าหลายรายชมตลอด และช่วยให้แบรนด์เราดูเป็นมืออาชีพขึ้นมาก เห็นผลเรื่องยอดเพิ่มชัดเจน', name: 'คุณกิตติภพ สุวรรณศรี', role: 'Managing Director, Skyline Digital', initials: 'ก', color: 'from-brand-500 to-violet-600' },
  ],
  logos: [
    { id: 'd1', name: 'NovaTech' },
    { id: 'd2', name: 'Skyline Co.' },
    { id: 'd3', name: '라온그룹' },
    { id: 'd4', name: 'Peak Digital' },
    { id: 'd5', name: 'Orbit Studio' },
    { id: 'd6', name: 'Harmony' },
    { id: 'd7', name: 'Vertex' },
  ],
}
