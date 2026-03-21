import React, { useState, useRef } from "react";
import { useNavigate } from 'react-router';
import { motion, AnimatePresence } from "motion/react";
import {
  ChevronDown,
  ChevronRight,
  Phone,
  MessageCircle,
  Share2,
  Heart,
  Camera,
  MapPin,
  ImageIcon,
  X,
  Palette,
  QrCode,
  Train,
  Car,
  Plus,
  CheckCircle,
} from "lucide-react";

// ─────────────────────────────────────────────────────────────────────────────
// Registration 자동 불러오기
// ─────────────────────────────────────────────────────────────────────────────
const registrationData = {
  groomName: "김성민",
  brideName: "이지은",
  groomPhone: "010-1234-5678",
  bridePhone: "010-9876-5432",
  groomFather: "김철수",
  groomMother: "박영희",
  brideFather: "이동국",
  brideMother: "최수진",
  groomRelation: "장남",
  brideRelation: "차녀",
  weddingDate: "2026-05-24",
  weddingTime: "13:00",
  venueName: "서울 신라호텔 영빈관 1층",
  venueAddress: "서울 중구 동호로 249",
  venueDetail: "신라호텔 영빈관 1층",
  venueMapQuery: "서울 신라호텔",
};

// ─────────────────────────────────────────────────────────────────────────────
// Motion Variants
// ─────────────────────────────────────────────────────────────────────────────
const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8 } },
};
const fadeUpDelay = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, delay: 0.2 } },
};
const fadeIn = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.9 } },
};
const viewport = { once: true, margin: "-80px" };

// ─────────────────────────────────────────────────────────────────────────────
// Theme Colors
// ─────────────────────────────────────────────────────────────────────────────
const THEME_COLORS = [
  { name: "베이지", value: "#d6cfc5" },
  { name: "로즈", value: "#e8c4c4" },
  { name: "세이지", value: "#b8d0be" },
  { name: "라벤더", value: "#c8c0e0" },
  { name: "스카이", value: "#b8cfe0" },
  { name: "아이보리", value: "#ede8dc" },
  { name: "모브", value: "#c4a8b4" },
  { name: "딥로즈", value: "#8b5a62" },
];

// 갤러리 제목 선택지
const GALLERY_TITLE_OPTIONS = ["ALBUM", "GALLERY", "우리의 순간"];

// ─────────────────────────────────────────────────────────────────────────────
// Helpers
// ─────────────────────────────────────────────────────────────────────────────
function formatDate(dateStr: string): string {
  if (!dateStr) return "";
  const d = new Date(dateStr);
  const days = ["일", "월", "화", "수", "목", "금", "토"];
  return `${d.getFullYear()}년 ${d.getMonth() + 1}월 ${d.getDate()}일 ${days[d.getDay()]}요일`;
}
function formatTime(timeStr: string): string {
  if (!timeStr) return "";
  const [h] = timeStr.split(":");
  const hour = parseInt(h);
  const ampm = hour >= 12 ? "오후" : "오전";
  const h12 = hour > 12 ? hour - 12 : hour;
  return `${ampm} ${h12}시`;
}

// ─────────────────────────────────────────────────────────────────────────────
// Toggle Switch
// ─────────────────────────────────────────────────────────────────────────────
function ToggleSwitch({ value, onChange }: { value: boolean; onChange: (v: boolean) => void }) {
  return (
    <div
      onClick={(e) => { e.stopPropagation(); onChange(!value); }}
      className={`relative w-10 h-5 rounded-full cursor-pointer flex-shrink-0 transition-colors duration-200 ${value ? "bg-rose-400" : "bg-gray-200"}`}
    >
      <div className={`absolute top-0.5 w-4 h-4 bg-white rounded-full shadow-sm transition-transform duration-200 ${value ? "translate-x-5" : "translate-x-0.5"}`} />
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Accordion Item
// ─────────────────────────────────────────────────────────────────────────────
function AccordionItem({
  title, icon, children, defaultOpen = false,
  showToggle = false, toggleValue = false, onToggle,
}: {
  title: string; icon?: React.ReactNode; children?: React.ReactNode;
  defaultOpen?: boolean; showToggle?: boolean; toggleValue?: boolean;
  onToggle?: (v: boolean) => void;
}) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div className="border-b border-gray-100 last:border-b-0">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between px-4 py-3.5 hover:bg-gray-50 transition-colors text-left"
      >
        <div className="flex items-center gap-2.5">
          {icon && <span className="text-gray-400 flex-shrink-0">{icon}</span>}
          <span className="text-sm font-semibold text-gray-700">{title}</span>
        </div>
        <div className="flex items-center gap-2 flex-shrink-0">
          {showToggle && onToggle && <ToggleSwitch value={toggleValue} onChange={onToggle} />}
          {open ? <ChevronDown className="w-3.5 h-3.5 text-gray-400" /> : <ChevronRight className="w-3.5 h-3.5 text-gray-400" />}
        </div>
      </button>
      {open && children && <div className="px-4 pb-4 space-y-3 bg-white">{children}</div>}
    </div>
  );
}

function Label({ text }: { text: string }) {
  return <p className="text-[11px] font-semibold text-gray-500 uppercase tracking-wide mb-1.5">{text}</p>;
}

// ─────────────────────────────────────────────────────────────────────────────
// CalendarPicker — MaterialRequestSection.tsx 디자인 그대로
// ─────────────────────────────────────────────────────────────────────────────
const WEDDING_DATE = registrationData.weddingDate; // 결혼식 당일 이후 선택 불가
const CAL_DAYS   = ["일","월","화","수","목","금","토"];
const CAL_MONTHS = ["1월","2월","3월","4월","5월","6월","7월","8월","9월","10월","11월","12월"];

function getTodayStr(): string { return new Date().toISOString().split("T")[0]; }
function fmtDate(str: string): string {
  if (!str) return "";
  return new Date(str + "T00:00:00").toLocaleDateString("ko-KR", {
    year:"numeric", month:"long", day:"numeric", weekday:"short",
  });
}

function CalendarPicker({ value, onChange }: { value: string; onChange: (d: string) => void }) {
  const today = new Date();
  const todayStr = getTodayStr();
  const [viewYear,  setViewYear]  = useState(today.getFullYear());
  const [viewMonth, setViewMonth] = useState(today.getMonth());

  const firstDay    = new Date(viewYear, viewMonth, 1).getDay();
  const daysInMonth = new Date(viewYear, viewMonth + 1, 0).getDate();
  const cells: (number | null)[] = [
    ...Array(firstDay).fill(null),
    ...Array.from({ length: daysInMonth }, (_, i) => i + 1),
  ];

  const prevMonth = () => { if (viewMonth===0){setViewYear(y=>y-1);setViewMonth(11);}else setViewMonth(m=>m-1); };
  const nextMonth = () => { if (viewMonth===11){setViewYear(y=>y+1);setViewMonth(0);}else setViewMonth(m=>m+1); };

  const toStr = (day: number) => `${viewYear}-${String(viewMonth+1).padStart(2,"0")}-${String(day).padStart(2,"0")}`;
  const isPast    = (day: number) => toStr(day) <= todayStr;
  const isAfterWed= (day: number) => toStr(day) >= WEDDING_DATE;
  const isSelected= (day: number) => value === toStr(day);
  const isToday   = (day: number) => toStr(day) === todayStr;

  const selectDate = (day: number) => {
    if (isPast(day) || isAfterWed(day)) return;
    onChange(toStr(day));
  };

  return (
    <div style={CS.wrap}>
      <div style={CS.header}>
        <button style={CS.navBtn} onClick={prevMonth}>‹</button>
        <span style={CS.monthTitle}>{viewYear}년 {CAL_MONTHS[viewMonth]}</span>
        <button style={CS.navBtn} onClick={nextMonth}>›</button>
      </div>
      <div style={CS.grid}>
        {CAL_DAYS.map((d, i) => (
          <div key={d} style={{ ...CS.dayLabel, color: i===0?"#e05":i===6?"#0074e4":"#999" }}>{d}</div>
        ))}
        {cells.map((day, i) => {
          if (!day) return <div key={`e-${i}`} />;
          const past = isPast(day) || isAfterWed(day);
          const sel  = isSelected(day);
          const tod  = isToday(day);
          const isSun = (i % 7 === 0); const isSat = (i % 7 === 6);
          return (
            <div key={`d-${day}`} onClick={() => selectDate(day)} style={{
              ...CS.cell,
              ...(past ? CS.cellPast : {}),
              ...(sel  ? CS.cellSelected : {}),
              ...(tod && !sel ? CS.cellToday : {}),
              color: sel?"#fff":past?"#ccc":isSun?"#e05":isSat?"#0074e4":"#2d2d2d",
              cursor: past?"default":"pointer",
            }}>{day}</div>
          );
        })}
      </div>
      {value && (
        <div style={CS.selectedBar}>📅 {fmtDate(value)} 오전 9시 발송 예정</div>
      )}
    </div>
  );
}

const CS: Record<string, React.CSSProperties> = {
  wrap:        { background:"#fff", borderRadius:14, border:"1.5px solid #e8e4e0", overflow:"hidden" },
  header:      { display:"flex", alignItems:"center", justifyContent:"space-between", padding:"14px 16px 10px", borderBottom:"1px solid #f0ece8" },
  monthTitle:  { fontSize:15, fontWeight:700, color:"#2d2d2d" },
  navBtn:      { background:"none", border:"none", fontSize:20, color:"#888", cursor:"pointer", padding:"0 8px", lineHeight:1 },
  grid:        { display:"grid", gridTemplateColumns:"repeat(7, 1fr)", gap:2, padding:"10px 10px 8px" },
  dayLabel:    { textAlign:"center", fontSize:11, fontWeight:600, padding:"4px 0 8px" } as React.CSSProperties,
  cell:        { textAlign:"center", fontSize:13, fontWeight:500, padding:"8px 4px", borderRadius:8, transition:"background .15s" } as React.CSSProperties,
  cellPast:    { opacity:0.35 },
  cellSelected:{ background:"#2d2d2d", borderRadius:8, fontWeight:700 },
  cellToday:   { border:"1.5px solid #2d2d2d", borderRadius:8 },
  selectedBar: { background:"#f5f3f0", padding:"10px 16px", fontSize:12, fontWeight:600, color:"#c9826a", textAlign:"center", borderTop:"1px solid #f0ece8" } as React.CSSProperties,
};

// ─────────────────────────────────────────────────────────────────────────────
// Preview Section Divider
// ─────────────────────────────────────────────────────────────────────────────
function PreviewSection({ children }: { children: React.ReactNode }) {
  return (
    <>
      <div className="h-px bg-gray-100" />
      <div className="bg-white">{children}</div>
    </>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// RSVP Modal (matches RsvpSection.tsx design exactly)
// ─────────────────────────────────────────────────────────────────────────────
function RsvpModal({ onClose }: { onClose: () => void }) {
  const [name, setName] = useState("");
  const [attending, setAttending] = useState("yes");
  const [guestCount, setGuestCount] = useState("1");
  const [isLoading, setIsLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;
    setIsLoading(true);
    // 실제 서버 연동 시 여기에 fetch 추가
    await new Promise((r) => setTimeout(r, 800));
    setIsLoading(false);
    setSubmitted(true);
    setTimeout(onClose, 1800);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center px-4 pointer-events-auto">
      {/* Backdrop */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="fixed inset-0 bg-black/60 backdrop-blur-sm"
      />
      {/* Modal */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        className="relative w-full max-w-[90%] sm:max-w-[400px] bg-white rounded-lg shadow-xl overflow-hidden z-10 font-['Gowun_Dodum'] text-left"
      >
        <div className="flex justify-between items-center p-5 border-b border-gray-100">
          <h2 className="text-lg font-bold text-gray-800" style={{ fontFamily: "'Noto Serif KR', Georgia, serif" }}>
            참석 여부
          </h2>
          <button onClick={onClose} className="p-1 rounded-full text-gray-400 hover:text-gray-800">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6">
          {submitted ? (
            <div className="flex flex-col items-center gap-3 py-6 text-center">
              <CheckCircle className="w-10 h-10 text-pink-400" />
              <p className="text-sm font-medium text-gray-700">참석 정보가 전달되었습니다. 감사합니다!</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* 참석 여부 */}
              <div className="space-y-2">
                <label className="text-sm text-gray-700 font-semibold block">참석 여부</label>
                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={() => setAttending("yes")}
                    className={`flex-1 py-3 rounded-md border text-sm font-medium transition-colors ${
                      attending === "yes"
                        ? "border-pink-300 bg-pink-50 text-pink-700"
                        : "border-gray-200 text-gray-500 bg-gray-50"
                    }`}
                  >
                    참석할게요
                  </button>
                  <button
                    type="button"
                    onClick={() => setAttending("no")}
                    className={`flex-1 py-3 rounded-md border text-sm font-medium transition-colors ${
                      attending === "no"
                        ? "border-gray-800 bg-gray-800 text-white"
                        : "border-gray-200 text-gray-500 bg-gray-50"
                    }`}
                  >
                    마음만 전할게요
                  </button>
                </div>
              </div>

              {/* 성함 */}
              <div className="space-y-2">
                <label className="text-sm text-gray-700 font-semibold block">성함</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="성함을 입력해주세요"
                  className="w-full border border-gray-200 p-3 rounded-md focus:outline-none focus:ring-1 focus:ring-gray-300 text-sm"
                />
              </div>

              {/* 동행 인원 */}
              {attending === "yes" && (
                <div className="space-y-2">
                  <label className="text-sm text-gray-700 font-semibold block">동행 인원</label>
                  <select
                    value={guestCount}
                    onChange={(e) => setGuestCount(e.target.value)}
                    className="w-full border border-gray-200 p-3 rounded-md focus:outline-none focus:ring-1 focus:ring-gray-300 text-sm"
                  >
                    <option value="1">본인 (1명)</option>
                    <option value="2">2명</option>
                    <option value="3">3명</option>
                    <option value="4">4명</option>
                    <option value="5">5명 이상</option>
                  </select>
                </div>
              )}

              <button
                type="submit"
                disabled={isLoading || !name.trim()}
                className="w-full bg-black text-white font-medium py-4 rounded-md mt-4 disabled:bg-gray-300 transition-colors"
              >
                {isLoading ? "전송 중..." : "참석 정보 전달하기"}
              </button>
            </form>
          )}
        </div>
      </motion.div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Main WeddingBuilder Component
// ─────────────────────────────────────────────────────────────────────────────
export function WeddingBuilder() {
  const [themeColor, setThemeColor] = useState("#d6cfc5");
  const [mainPhoto, setMainPhoto] = useState(
    "https://images.unsplash.com/photo-1660294502608-d65e5c62f244?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080&q=80"
  );
  const [greetingTitle, setGreetingTitle] = useState("초대합니다");
  const [greetingContent, setGreetingContent] = useState(
    "서로가 마주보며 다져온 사랑을\n이제 함께 한 곳을 바라보며 걸어갈 수 있게\n큰 약속을 하려 합니다.\n\n저희 두 사람이 사랑의 이름으로\n지켜나갈 수 있게 앞날을\n축복해 주시면 감사하겠습니다."
  );

  // ── 갤러리
  const [galleryTitle, setGalleryTitle] = useState("우리의 순간");
  const [galleryPhotos, setGalleryPhotos] = useState<string[]>([
    "https://images.unsplash.com/photo-1660294502608-d65e5c62f244?w=400&q=80",
    "https://images.unsplash.com/photo-1606203947280-002271a37eb2?w=400&q=80",
    "https://images.unsplash.com/photo-1769868628482-528d35164ae9?w=400&q=80",
    "https://images.unsplash.com/photo-1521543387600-c745f8e83d77?w=400&q=80",
  ]);
  const galleryInputRef = useRef<HTMLInputElement>(null);

  // ── 리마인더 폼 상태 (MaterialRequestSection 방식)
  const [reminderName,    setReminderName]    = useState("");
  const [reminderEmail,   setReminderEmail]   = useState("");
  const [reminderDate,    setReminderDate]    = useState("");
  const [reminderPhase,   setReminderPhase]   = useState<"idle"|"loading"|"success"|"error">("idle");
  const [reminderErrMsg,  setReminderErrMsg]  = useState("");

  const handleReminderSubmit = async () => {
    if (!reminderName.trim() || !reminderEmail.trim() || !reminderDate) return;
    setReminderPhase("loading");
    await new Promise(r => setTimeout(r, 800));
    setReminderPhase("success");
  };

  // ── 오시는 길 추가 메모
  const [locationNote, setLocationNote] = useState("");

  // ── 섹션 노출 토글
  const [showReminder, setShowReminder] = useState(true);
  const [showAttendance, setShowAttendance] = useState(true);
  const [showGuestbook, setShowGuestbook] = useState(true);
  const [showContact, setShowContact] = useState(true);

  // ── RSVP 모달
  const [rsvpOpen, setRsvpOpen] = useState(false);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) setMainPhoto(URL.createObjectURL(file));
  };

  const handleGalleryAdd = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    const remaining = 10 - galleryPhotos.length;
    const toAdd = files.slice(0, remaining).map((f) => URL.createObjectURL(f));
    setGalleryPhotos((prev) => [...prev, ...toAdd]);
    if (e.target) e.target.value = "";
  };

  const removeGalleryPhoto = (idx: number) => {
    setGalleryPhotos((prev) => prev.filter((_, i) => i !== idx));
  };

  const formattedDate = formatDate(registrationData.weddingDate);
  const formattedTime = formatTime(registrationData.weddingTime);
  const navigate = useNavigate();

  return (
    <div className="flex flex-col h-screen overflow-hidden bg-white font-['Gowun_Dodum'] text-gray-800">

      {/* ── Header ── */}
      <header className="flex items-center justify-between px-6 py-3 border-b border-gray-200 bg-white z-20 flex-shrink-0">
        <div className="flex items-center gap-3">
          <Heart className="w-4 h-4 text-rose-400 fill-rose-400" />
          <span className="font-bold text-gray-800 text-sm cursor-pointer hover:opacity-80 transition-opacity" onClick={() => navigate('/')}>청첩장 빌더</span>
          <span className="text-gray-300 mx-1 text-xs">|</span>
          <span className="text-xs text-gray-400">실시간 미리보기</span>
        </div>
        <div className="flex items-center gap-2">
          <button className="px-4 py-1.5 text-xs border border-gray-200 rounded-full text-gray-500 hover:bg-gray-50 transition-colors">임시저장</button>
          <button className="px-4 py-1.5 text-xs bg-rose-500 text-white rounded-full font-bold hover:bg-rose-600 transition-colors">발행하기</button>
        </div>
      </header>

      <div className="flex flex-1 overflow-hidden">

        {/* ──────────────────────────────────────
            Left Sidebar
        ────────────────────────────────────── */}
        <aside className="w-72 xl:w-80 bg-white border-r border-gray-200 overflow-y-auto flex-shrink-0">
          <div className="px-4 py-2.5 bg-gray-50 border-b border-gray-200 sticky top-0 z-10">
            <p className="text-[11px] text-gray-400 font-semibold tracking-wider uppercase">편집 메뉴</p>
          </div>

          {/* 1. 디자인 및 메인설정 */}
          <AccordionItem title="디자인 및 메인설정" icon={<Palette className="w-4 h-4" />} defaultOpen={true}>
            <div>
              <Label text="테마 색상" />
              <div className="flex flex-wrap gap-2.5">
                {THEME_COLORS.map((c) => (
                  <button key={c.value} onClick={() => setThemeColor(c.value)} title={c.name}
                    className={`w-7 h-7 rounded-full transition-all duration-150 hover:scale-110 ${themeColor === c.value ? "ring-2 ring-offset-1 ring-gray-500 scale-110" : "ring-1 ring-gray-200"}`}
                    style={{ backgroundColor: c.value }}
                  />
                ))}
              </div>
            </div>
            <div>
              <Label text="메인 사진 (1장)" />
              <div onClick={() => fileInputRef.current?.click()}
                className="border-2 border-dashed border-gray-200 rounded-xl p-4 text-center cursor-pointer hover:border-rose-300 hover:bg-rose-50/40 transition-all">
                <Camera className="w-5 h-5 mx-auto mb-1.5 text-gray-300" />
                <p className="text-xs text-gray-400">클릭하여 사진 업로드</p>
                <p className="text-[10px] text-gray-300 mt-0.5">JPG · PNG · WEBP</p>
              </div>
              <input ref={fileInputRef} type="file" accept="image/*" className="hidden" onChange={handlePhotoUpload} />
              {mainPhoto && (
                <div className="mt-2 relative rounded-xl overflow-hidden h-24">
                  <img src={mainPhoto} alt="main" className="w-full h-full object-cover" />
                  <button onClick={() => setMainPhoto("")} className="absolute top-1.5 right-1.5 bg-black/50 text-white rounded-full p-0.5 hover:bg-black/70">
                    <X className="w-3 h-3" />
                  </button>
                </div>
              )}
            </div>
            <div className="bg-blue-50/60 border border-blue-100 rounded-xl p-3 space-y-2">
              <p className="text-[10px] font-bold text-blue-500 flex items-center gap-1.5"><span>📋</span>Registration에서 자동으로 불러온 정보</p>
              <div className="space-y-1.5">
                {[["신랑",registrationData.groomName],["신부",registrationData.brideName],["날짜",formattedDate],["시간",formattedTime],["장소",registrationData.venueName]].map(([label, val]) => (
                  <div key={label} className="flex items-start gap-2">
                    <span className="text-[10px] text-blue-400 w-8 flex-shrink-0">{label}</span>
                    <span className="text-[10px] text-gray-600 flex-1 leading-snug">{val}</span>
                  </div>
                ))}
              </div>
            </div>
          </AccordionItem>

          {/* 2. 인사말 */}
          <AccordionItem title="인사말" icon={<span className="text-sm">✉️</span>}>
            <div>
              <Label text="제목" />
              <input type="text" value={greetingTitle} onChange={(e) => setGreetingTitle(e.target.value)}
                className="w-full border border-gray-200 rounded-xl px-3 py-2 text-sm outline-none focus:border-rose-300 focus:ring-1 focus:ring-rose-100 font-['Gowun_Dodum']" />
            </div>
            <div>
              <Label text="내용" />
              <textarea value={greetingContent} onChange={(e) => setGreetingContent(e.target.value)} rows={6}
                className="w-full border border-gray-200 rounded-xl px-3 py-2 text-sm outline-none focus:border-rose-300 focus:ring-1 focus:ring-rose-100 resize-none leading-relaxed font-['Gowun_Dodum']" />
            </div>
          </AccordionItem>

          {/* 3. 사전 식권 QR */}
          <AccordionItem title="사전 식권 QR" icon={<span className="text-sm">🎟</span>}>
            <p className="text-xs text-gray-400 py-2 leading-relaxed">현금없는 축의대를 위한 전자식권 QR 섹션입니다.<br />상세 설정을 곧 업데이트할 예정입니다.</p>
          </AccordionItem>

          {/* 4. 리마인더 */}
          <AccordionItem title="리마인더 받기" icon={<span className="text-sm">🔔</span>} showToggle toggleValue={showReminder} onToggle={setShowReminder}>
            <p className="text-xs text-gray-400 leading-relaxed">원하는 날짜를 선택하면 그날 오전 9시에 청첩장을 이메일로 재발송합니다.</p>
          </AccordionItem>

          {/* 5. 갤러리 ── 제목 선택 + 사진 최대 10장 */}
          <AccordionItem title="갤러리" icon={<ImageIcon className="w-4 h-4" />}>
            {/* 제목 선택 */}
            <div>
              <Label text="갤러리 제목" />
              <div className="flex gap-2 flex-wrap">
                {GALLERY_TITLE_OPTIONS.map((opt) => (
                  <button key={opt} onClick={() => setGalleryTitle(opt)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-medium border transition-all ${galleryTitle === opt ? "bg-rose-50 border-rose-300 text-rose-600" : "bg-gray-50 border-gray-200 text-gray-500 hover:border-gray-300"}`}>
                    {opt}
                  </button>
                ))}
              </div>
            </div>

            {/* 사진 업로드 (최대 10장) */}
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <Label text={`사진 (${galleryPhotos.length}/10)`} />
                {galleryPhotos.length < 10 && (
                  <button onClick={() => galleryInputRef.current?.click()}
                    className="flex items-center gap-1 text-[11px] text-rose-500 hover:text-rose-600 font-medium">
                    <Plus className="w-3 h-3" /> 추가
                  </button>
                )}
              </div>
              <input ref={galleryInputRef} type="file" accept="image/*" multiple className="hidden" onChange={handleGalleryAdd} />

              {galleryPhotos.length === 0 ? (
                <div onClick={() => galleryInputRef.current?.click()}
                  className="border-2 border-dashed border-gray-200 rounded-xl p-4 text-center cursor-pointer hover:border-rose-300 hover:bg-rose-50/40 transition-all">
                  <Camera className="w-5 h-5 mx-auto mb-1.5 text-gray-300" />
                  <p className="text-xs text-gray-400">사진을 업로드하세요 (최대 10장)</p>
                </div>
              ) : (
                <div className="grid grid-cols-3 gap-1.5">
                  {galleryPhotos.map((img, i) => (
                    <div key={i} className="relative aspect-square rounded-lg overflow-hidden group">
                      <img src={img} alt={`g-${i}`} className="w-full h-full object-cover" />
                      <button onClick={() => removeGalleryPhoto(i)}
                        className="absolute top-0.5 right-0.5 bg-black/60 text-white rounded-full p-0.5 opacity-0 group-hover:opacity-100 transition-opacity">
                        <X className="w-2.5 h-2.5" />
                      </button>
                    </div>
                  ))}
                  {galleryPhotos.length < 10 && (
                    <div onClick={() => galleryInputRef.current?.click()}
                      className="aspect-square rounded-lg border-2 border-dashed border-gray-200 flex items-center justify-center cursor-pointer hover:border-rose-300 hover:bg-rose-50/40 transition-all">
                      <Plus className="w-4 h-4 text-gray-300" />
                    </div>
                  )}
                </div>
              )}
              {galleryPhotos.length >= 10 && (
                <p className="text-[10px] text-gray-400 mt-1 text-center">최대 10장까지 업로드 가능합니다</p>
              )}
            </div>
          </AccordionItem>

          {/* 6. 오시는 길 */}
          <AccordionItem title="오시는 길" icon={<MapPin className="w-4 h-4" />}>
            {/* 자동 불러온 주소 */}
            <div className="bg-green-50/60 border border-green-100 rounded-xl p-3">
              <p className="text-[10px] font-bold text-green-600 mb-1.5 flex items-center gap-1"><span>📍</span>Registration에서 자동 불러옴</p>
              <p className="text-[11px] text-gray-600">{registrationData.venueAddress}</p>
              <p className="text-[11px] text-gray-500">{registrationData.venueDetail}</p>
            </div>

            {/* 추가 메모 */}
            <div>
              <Label text="추가 안내 (인근 주차장 등)" />
              <textarea
                value={locationNote}
                onChange={(e) => setLocationNote(e.target.value)}
                placeholder={"예) 인근 공영주차장: 장충체육관 주차장 이용\n      도보 7분 거리, 주차비 최초 30분 무료"}
                rows={3}
                className="w-full border border-gray-200 rounded-xl px-3 py-2 text-xs outline-none focus:border-rose-300 focus:ring-1 focus:ring-rose-100 resize-none leading-relaxed font-['Gowun_Dodum'] text-gray-600 placeholder:text-gray-300"
              />
            </div>
          </AccordionItem>

          {/* 7. 참석여부 */}
          <AccordionItem title="참석여부 전달" icon={<span className="text-sm">✅</span>} showToggle toggleValue={showAttendance} onToggle={setShowAttendance}>
            <p className="text-xs text-gray-400 leading-relaxed">하객이 참석 여부를 전달할 수 있는 버튼을 노출합니다.</p>
          </AccordionItem>

          {/* 8. 방명록 */}
          <AccordionItem title="방명록" icon={<span className="text-sm">📖</span>} showToggle toggleValue={showGuestbook} onToggle={setShowGuestbook}>
            <p className="text-xs text-gray-400 leading-relaxed">하객이 축하 메시지를 남길 수 있는 방명록을 노출합니다.</p>
          </AccordionItem>

          {/* 9. 연락하기 */}
          <AccordionItem title="신랑·신부에게 연락하기" icon={<Phone className="w-4 h-4" />} showToggle toggleValue={showContact} onToggle={setShowContact}>
            <p className="text-xs text-gray-400 leading-relaxed">신랑·신부에게 전화/문자 버튼을 노출합니다.<br />연락처는 Registration에서 자동 불러옵니다.</p>
          </AccordionItem>
        </aside>

        {/* ──────────────────────────────────────
            Right Preview
        ────────────────────────────────────── */}
        <main className="flex-1 bg-[#f0eeeb] overflow-y-auto">
          <div className="flex flex-col items-center py-8 px-4 min-h-full">
            <p className="text-[11px] text-gray-400 mb-5 font-medium tracking-wide">
              미리보기 — 변경사항이 즉시 반영됩니다
            </p>

            <div className="w-[375px] bg-white shadow-xl overflow-hidden" style={{ borderRadius: "2px" }}>

              {/* ╔══════════════╗ COVER ╚══════════════╝ */}
              <div className="px-3 pt-10 pb-10 text-center bg-white">
                <motion.div initial="hidden" whileInView="visible" viewport={viewport} variants={fadeIn}
                  className="relative mx-auto overflow-hidden mb-8 shadow-md"
                  style={{ width: "100%", height: "420px", borderRadius: "180px 180px 0 0" }}>
                  {mainPhoto ? (
                    <img src={mainPhoto} alt="cover" className="w-full h-full object-cover" />
                  ) : (
                    <div className="w-full h-full bg-gray-100 flex flex-col items-center justify-center gap-2">
                      <Camera className="w-10 h-10 text-gray-300" />
                      <p className="text-xs text-gray-300">사진을 업로드하세요</p>
                    </div>
                  )}
                </motion.div>

                <motion.div initial="hidden" whileInView="visible" viewport={viewport} variants={fadeUp}>
                  <p className="text-[10px] tracking-[0.3em] text-gray-400 mb-4"
                    style={{ fontFamily: "'Noto Serif KR', Georgia, serif" }}>
                    WEDDING INVITATION
                  </p>
                  <div className="flex items-center justify-center gap-3 mb-5">
                    <span className="text-[28px] font-light text-gray-800 tracking-wide"
                      style={{ fontFamily: "'Noto Serif KR', Georgia, serif" }}>
                      {registrationData.groomName}
                    </span>
                    <Heart className="w-5 h-5 flex-shrink-0" style={{ fill: "#c48090", color: "#c48090" }} />
                    <span className="text-[28px] font-light text-gray-800 tracking-wide"
                      style={{ fontFamily: "'Noto Serif KR', Georgia, serif" }}>
                      {registrationData.brideName}
                    </span>
                  </div>
                  <p className="text-sm text-gray-500 leading-8">{formattedDate} {formattedTime}</p>
                  <p className="text-sm text-gray-500">{registrationData.venueName}</p>
                </motion.div>
              </div>

              {/* ╔══════════════╗ 인사말 ╚══════════════╝ */}
              <PreviewSection>
                <section className="py-12 px-8 text-center bg-white space-y-10 font-['Gowun_Dodum']">
                  <motion.div initial="hidden" whileInView="visible" viewport={viewport} variants={fadeUp}
                    className="space-y-6 text-gray-700 leading-loose">
                    <h2 className="text-xl font-medium text-gray-800 mb-8"
                      style={{ fontFamily: "'Noto Serif KR', Georgia, serif" }}>
                      {greetingTitle}
                    </h2>
                    <p className="text-sm leading-9 whitespace-pre-line text-gray-600">{greetingContent}</p>
                  </motion.div>
                  <motion.div initial="hidden" whileInView="visible" viewport={viewport} variants={fadeUpDelay}
                    className="space-y-4">
                    <div className="flex justify-center items-center space-x-2 text-base">
                      <span className="font-semibold text-gray-800">{registrationData.groomFather} · {registrationData.groomMother}</span>
                      <span className="text-sm text-gray-500">의 {registrationData.groomRelation}</span>
                      <span className="font-semibold text-gray-800 ml-2">{registrationData.groomName.slice(1)}</span>
                    </div>
                    <div className="flex justify-center items-center space-x-2 text-base">
                      <span className="font-semibold text-gray-800">{registrationData.brideFather} · {registrationData.brideMother}</span>
                      <span className="text-sm text-gray-500">의 {registrationData.brideRelation}</span>
                      <span className="font-semibold text-gray-800 ml-2">{registrationData.brideName.slice(1)}</span>
                    </div>
                  </motion.div>
                </section>
              </PreviewSection>

              {/* ╔══════════════╗ 식권 QR ╚══════════════╝ */}
              <PreviewSection>
                <motion.div initial="hidden" whileInView="visible" viewport={viewport} variants={fadeUp}
                  className="px-8 py-10 text-center">
                  <Heart className="w-5 h-5 mx-auto mb-5" style={{ color: "#c48090" }} />
                  <h3 className="text-base font-bold text-gray-800 mb-2 leading-snug">
                    현금없는 축의대 진행을 위해<br />전자식권을 사전발급 받아주세요!
                  </h3>
                  <p className="text-xs text-gray-400 mb-0.5">현금 축의금을 받지 않습니다</p>
                  <p className="text-xs text-gray-400 mb-6">식권QR코드를 사전 발급 받아주세요!</p>

                  <button className="w-full flex items-center justify-between px-5 py-4 rounded-2xl transition-all active:scale-[0.98] group"
                    style={{ background: "linear-gradient(135deg, #fdf0f3 0%, #fce4ec 100%)", border: "1px solid #f0b8c8" }}>
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0" style={{ backgroundColor: "#f8d0db" }}>
                        <QrCode className="w-4 h-4" style={{ color: "#9c4060" }} />
                      </div>
                      <div className="text-left">
                        <p className="font-semibold text-sm" style={{ color: "#9c4060" }}>식권 사전 발급받기</p>
                        <p className="text-xs mt-0.5" style={{ color: "#c4748c" }}>QR코드로 간편하게 발급</p>
                      </div>
                    </div>
                    <ChevronRight className="w-4 h-4 flex-shrink-0 transition-transform duration-200 group-hover:translate-x-1" style={{ color: "#c4748c" }} />
                  </button>

                  <p className="text-xs text-gray-400 mt-6 leading-6">참석이 어려우신 분들을 위해<br />계좌번호도 기재되어 있습니다.</p>
                </motion.div>
              </PreviewSection>

              {/* ╔══════════════╗ 리마인더 (MaterialRequestSection 디자인) ╚══════════════╝ */}
              {showReminder && (
                <PreviewSection>
                  <section style={{ padding:"48px 20px 56px", background:"#FAF9F8", borderTop:"1px solid #f0ece8", fontFamily:"'Gowun Dodum', sans-serif" }}>

                    {/* 타이틀 */}
                    <motion.div initial="hidden" whileInView="visible" viewport={viewport} variants={fadeUp}
                      style={{ textAlign:"center", marginBottom:28 }}>
                      <div style={{ display:"flex", alignItems:"center", justifyContent:"center", gap:10, marginBottom:14 }}>
                        <span style={{ display:"inline-block", width:24, height:1, background:"#d4a9a0" }} />
                        <span style={{ fontSize:10, fontWeight:600, letterSpacing:"2px", color:"#d4a9a0" }}>REMINDER</span>
                        <span style={{ display:"inline-block", width:24, height:1, background:"#d4a9a0" }} />
                      </div>
                      <h2 style={{ fontSize:22, fontWeight:700, color:"#2d2d2d", margin:"0 0 10px", letterSpacing:"-0.3px" }}>리마인더 받기</h2>
                      <p style={{ fontSize:13, color:"#888", lineHeight:1.8, margin:0 }}>
                        참석 여부가 아직 미확정이시라면 <br />
                        아래 원하는 날짜를 선택하면<br />
                        그 날 오전 9시에 이메일로 청첩장을 다시 보내드려요
                      </p>
                    </motion.div>

                    {/* 카드 */}
                    <motion.div initial="hidden" whileInView="visible" viewport={viewport} variants={fadeUp}
                      style={{ background:"#fff", borderRadius:16, padding:"24px 20px", boxShadow:"0 2px 20px rgba(0,0,0,0.06)" }}>

                      {reminderPhase === "success" ? (
                        /* 성공 화면 */
                        <div>
                          <div style={{ display:"flex", alignItems:"center", gap:14, marginBottom:20 }}>
                            <div style={{ width:48, height:48, borderRadius:"50%", background:"#4caf82", display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0, boxShadow:"0 4px 14px rgba(76,175,130,0.35)" }}>
                              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.8" strokeLinecap="round" strokeLinejoin="round">
                                <polyline points="20 6 9 17 4 12" />
                              </svg>
                            </div>
                            <div>
                              <p style={{ fontSize:10, fontWeight:700, letterSpacing:"1.5px", color:"#4caf82", marginBottom:3 }}>신청 완료</p>
                              <h3 style={{ fontSize:18, fontWeight:700, color:"#2d2d2d", margin:0 }}>자료 발송 예약됐어요!</h3>
                            </div>
                          </div>
                          <div style={{ background:"#fff", borderRadius:14, boxShadow:"0 2px 16px rgba(0,0,0,0.06)", marginBottom:16 }}>
                            {[["받는 날짜", fmtDate(reminderDate)],["발송 이메일", reminderEmail],["신청자", reminderName]].map(([label, val], i, arr) => (
                              <React.Fragment key={label}>
                                <div style={{ padding:"14px 18px", display:"flex", flexDirection:"column", gap:3 }}>
                                  <span style={{ fontSize:10, fontWeight:600, letterSpacing:"1px", color:"#bbb" }}>{label}</span>
                                  <span style={{ fontWeight:600, color:"#2d2d2d", fontSize: label==="발송 이메일"?13:15 }}>{val}</span>
                                </div>
                                {i < arr.length-1 && <div style={{ height:1, background:"#f5f3f1", margin:"0 18px" }} />}
                              </React.Fragment>
                            ))}
                          </div>
                          <p style={{ textAlign:"center", fontSize:12, color:"#aaa", margin:"0 0 20px" }}>해당 날짜 오전 9시에 자동으로 발송됩니다.</p>
                          <button style={{ width:"100%", padding:"13px", background:"transparent", border:"1.5px solid #e8e4e0", borderRadius:12, fontSize:14, color:"#999", cursor:"pointer", fontFamily:"inherit" }}
                            onClick={() => { setReminderPhase("idle"); setReminderName(""); setReminderEmail(""); setReminderDate(""); }}>
                            ← 다시 신청하기
                          </button>
                        </div>
                      ) : (
                        /* 입력 폼 */
                        <div>
                          {/* 성함 */}
                          <div style={{ marginBottom:18 }}>
                            <label style={{ display:"block", fontSize:11, fontWeight:600, color:"#555", marginBottom:7, letterSpacing:"0.5px" }}>
                              성함 <span style={{ color:"#c0392b" }}>*</span>
                            </label>
                            <input type="text" value={reminderName} onChange={e=>setReminderName(e.target.value)} placeholder="홍길동"
                              style={{ width:"100%", padding:"12px 14px", border:"1.5px solid #e8e4e0", borderRadius:10, fontSize:15, color:"#2d2d2d", background:"#fafafa", outline:"none", boxSizing:"border-box", fontFamily:"inherit" }} />
                          </div>

                          {/* 이메일 */}
                          <div style={{ marginBottom:18 }}>
                            <label style={{ display:"block", fontSize:11, fontWeight:600, color:"#555", marginBottom:7, letterSpacing:"0.5px" }}>
                              이메일 <span style={{ color:"#c0392b" }}>*</span>
                            </label>
                            <input type="email" value={reminderEmail} onChange={e=>setReminderEmail(e.target.value)} placeholder="hello@example.com"
                              style={{ width:"100%", padding:"12px 14px", border:"1.5px solid #e8e4e0", borderRadius:10, fontSize:15, color:"#2d2d2d", background:"#fafafa", outline:"none", boxSizing:"border-box", fontFamily:"inherit" }} />
                          </div>

                          {/* 달력 */}
                          <div style={{ marginBottom:22 }}>
                            <label style={{ display:"block", fontSize:11, fontWeight:600, color:"#555", marginBottom:7, letterSpacing:"0.5px" }}>
                              자료 수신 날짜 <span style={{ color:"#c0392b" }}>*</span>
                            </label>
                            <CalendarPicker value={reminderDate} onChange={setReminderDate} />
                          </div>

                          {reminderPhase === "error" && (
                            <div style={{ background:"#fff5f5", border:"1px solid #fcd4d4", borderRadius:10, padding:"10px 14px", color:"#c0392b", fontSize:13, marginBottom:14 }}>
                              ⚠️ {reminderErrMsg}
                            </div>
                          )}

                          <button onClick={handleReminderSubmit}
                            disabled={reminderPhase==="loading" || !reminderName.trim() || !reminderEmail.trim() || !reminderDate}
                            style={{ width:"100%", padding:"14px", background:"#2d2d2d", color:"#fff", border:"none", borderRadius:12, fontSize:15, fontWeight:600, cursor:"pointer", marginTop:4, fontFamily:"inherit", letterSpacing:"0.3px", opacity: (reminderPhase==="loading"||!reminderName.trim()||!reminderEmail.trim()||!reminderDate)?0.5:1 }}>
                            {reminderPhase==="loading" ? "처리 중..." : "알림 설정하기 →"}
                          </button>

                          <p style={{ textAlign:"center", fontSize:11, color:"#bbb", margin:"14px 0 0", lineHeight:1.6 }}>
                            🔒 수집된 정보는 자료 발송 목적으로만 사용됩니다
                          </p>
                        </div>
                      )}
                    </motion.div>
                  </section>
                </PreviewSection>
              )}

              {/* ╔══════════════╗ 갤러리 ╚══════════════╝ */}
              <PreviewSection>
                <motion.div initial="hidden" whileInView="visible" viewport={viewport} variants={fadeUp}
                  className="py-10 bg-white">
                  <h3 className="text-xl font-light text-center text-gray-800 mb-6"
                    style={{ fontFamily: "'Noto Serif KR', Georgia, serif" }}>
                    {galleryTitle}
                  </h3>
                  {galleryPhotos.length > 0 ? (
                    <div className="grid grid-cols-2 gap-1.5 px-5">
                      {galleryPhotos.map((img, i) => (
                        <div key={i} className="aspect-square overflow-hidden rounded-xl">
                          <img src={img} alt={`g-${i}`} className="w-full h-full object-cover hover:scale-105 transition-transform duration-300" />
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="px-5">
                      <div className="aspect-video bg-gray-50 rounded-xl flex items-center justify-center">
                        <p className="text-xs text-gray-300">사진을 추가해주세요</p>
                      </div>
                    </div>
                  )}
                </motion.div>
              </PreviewSection>

              {/* ╔══════════════╗ 오시는 길 (LocationSection.tsx 디자인) ╚══════════════╝ */}
              <PreviewSection>
                <section className="py-20 px-6 bg-white border-t border-gray-100 font-['Gowun_Dodum']">
                  <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-50px" }}
                    variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.8 } } }}
                    className="space-y-8"
                  >
                    {/* 제목 + 주소 */}
                    <div className="text-center space-y-4">
                      <h2 className="text-xl font-medium text-gray-800"
                        style={{ fontFamily: "'Noto Serif KR', Georgia, serif" }}>
                        오시는 길
                      </h2>
                      <p className="text-gray-600 leading-relaxed text-sm">
                        {registrationData.venueAddress}<br />
                        {registrationData.venueDetail}
                      </p>
                      {/* 자동 불러옴 안내 */}
                      <p className="text-[10px] text-gray-400 bg-gray-50 rounded-lg px-3 py-2 leading-relaxed">
                        회원가입시 설정하였던 예식장 장소 지도 및 교통정보를<br />자동으로 불러왔습니다
                      </p>
                    </div>

                    {/* Google Maps iframe — LocationSection.tsx 그대로 */}
                    <div className="w-full aspect-video bg-gray-100 rounded-lg overflow-hidden relative shadow-inner">
                      <iframe
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3163.090623321453!2d127.0042456!3d37.5555431!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x357ca310214a1f59%3A0xc6fbef1a8684bbd5!2sThe%20Shilla%20Seoul!5e0!3m2!1sen!2skr!4v1700000000000!5m2!1sen!2skr"
                        width="100%"
                        height="100%"
                        style={{ border: 0 }}
                        allowFullScreen={false}
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"
                        title="Google Maps"
                      />
                    </div>

                    {/* 교통 정보 — LocationSection.tsx 동일 스타일 */}
                    <div className="space-y-6 text-sm text-gray-700 pt-4">
                      <div className="flex gap-4 items-start">
                        <div className="bg-gray-50 p-2 rounded-full text-gray-400 shrink-0">
                          <Train className="w-5 h-5" />
                        </div>
                        <div>
                          <h3 className="font-semibold text-gray-800 mb-1">지하철 이용시</h3>
                          <p className="leading-relaxed">
                            3호선 동대입구역 5번 출구<br />
                            도보 5분 거리
                          </p>
                        </div>
                      </div>

                      <div className="flex gap-4 items-start">
                        <div className="bg-gray-50 p-2 rounded-full text-gray-400 shrink-0">
                          <Car className="w-5 h-5" />
                        </div>
                        <div>
                          <h3 className="font-semibold text-gray-800 mb-1">자가용 이용시</h3>
                          <p className="leading-relaxed">
                            호텔 내 주차장 이용 가능 (하객 3시간 무료)<br />
                            만차 시 인근 공영주차장 이용
                          </p>
                        </div>
                      </div>

                      {/* 추가 안내 — 입력 시 노출 */}
                      {locationNote.trim() && (
                        <div className="flex gap-4 items-start">
                          <div className="bg-gray-50 p-2 rounded-full text-gray-400 shrink-0">
                            <MapPin className="w-5 h-5" />
                          </div>
                          <div>
                            <h3 className="font-semibold text-gray-800 mb-1">추가 안내</h3>
                            <p className="leading-relaxed whitespace-pre-line">{locationNote}</p>
                          </div>
                        </div>
                      )}
                    </div>
                  </motion.div>
                </section>
              </PreviewSection>

              {/* ╔══════════════╗ 참석여부 (RsvpSection 디자인) ╚══════════════╝ */}
              {showAttendance && (
                <PreviewSection>
                  <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-50px" }}
                    variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.8 } } }}
                    className="py-10 px-6 text-center font-['Gowun_Dodum']"
                  >
                    <div className="space-y-5 max-w-sm mx-auto">
                      <h3 className="text-xl font-medium text-gray-800"
                        style={{ fontFamily: "'Noto Serif KR', Georgia, serif" }}>
                        참석 여부 전달
                      </h3>
                      <p className="text-sm text-gray-500 leading-relaxed">
                        축하해주시는 모든 분들께 감사드리며,<br />
                        원활한 예식 진행을 위해 참석 여부를 전달해주시면<br />
                        정성껏 자리를 마련하겠습니다.
                      </p>
                      <button
                        onClick={() => setRsvpOpen(true)}
                        className="w-full py-4 px-6 bg-gray-800 text-white rounded-md text-sm font-medium hover:bg-gray-900 transition-colors shadow-sm"
                      >
                        참석 여부 전달하기
                      </button>
                    </div>
                  </motion.div>
                </PreviewSection>
              )}

              {/* ╔══════════════╗ 방명록 ╚══════════════╝ */}
              {showGuestbook && (
                <PreviewSection>
                  <motion.div initial="hidden" whileInView="visible" viewport={viewport} variants={fadeUp}
                    className="px-8 py-10">
                    <h3 className="text-xl font-light text-center text-gray-800 mb-5"
                      style={{ fontFamily: "'Noto Serif KR', Georgia, serif" }}>방명록</h3>
                    <div className="border border-gray-200 rounded-2xl px-5 py-5 text-sm text-center text-gray-400 mb-4 leading-relaxed">
                      첫 번째 방명록을 남겨주세요!
                    </div>
                    <div className="flex border-b border-gray-200">
                      <button className="flex-1 flex items-center justify-center gap-1.5 text-sm text-gray-500 py-2.5 hover:text-gray-700 transition-colors">
                        <span className="text-base leading-none">☰</span> 전체보기
                      </button>
                      <button className="flex-1 flex items-center justify-center gap-1.5 text-sm text-gray-500 py-2.5 hover:text-gray-700 transition-colors">
                        <span className="text-base leading-none">✏</span> 작성하기
                      </button>
                    </div>
                  </motion.div>
                </PreviewSection>
              )}

              {/* ╔══════════════╗ 연락하기 ╚══════════════╝ */}
              {showContact && (
                <PreviewSection>
                  <motion.div initial="hidden" whileInView="visible" viewport={viewport} variants={fadeUp}
                    className="px-8 py-8">
                    <div className="grid grid-cols-2 gap-4">
                      {[
                        { label: "신랑", name: registrationData.groomName, phone: registrationData.groomPhone },
                        { label: "신부", name: registrationData.brideName, phone: registrationData.bridePhone },
                      ].map(({ label, name, phone }) => (
                        <div key={label} className="text-center">
                          <p className="text-[11px] text-gray-400 mb-1.5">{label}</p>
                          <p className="text-sm font-medium text-gray-700 mb-3"
                            style={{ fontFamily: "'Noto Serif KR', Georgia, serif" }}>{name}</p>
                          <div className="flex gap-1.5 justify-center">
                            <a href={`tel:${phone}`}
                              className="flex items-center gap-1 border border-gray-200 rounded-full px-2.5 py-1.5 text-[11px] text-gray-600 hover:bg-gray-50 transition-colors">
                              <Phone className="w-3 h-3" /> 전화
                            </a>
                            <button className="flex items-center gap-1 border border-gray-200 rounded-full px-2.5 py-1.5 text-[11px] text-gray-600 hover:bg-gray-50 transition-colors">
                              <MessageCircle className="w-3 h-3" /> 문자
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                </PreviewSection>
              )}

              {/* ╔══════════════╗ 카카오 공유 + Footer ╚══════════════╝ */}
              <div className="h-px bg-gray-100" />
              <div className="px-6 py-6 bg-white">
                <button
                  className="w-full py-4 rounded-2xl font-bold text-sm flex items-center justify-center gap-2.5 shadow-md active:scale-[0.98] transition-transform"
                  style={{ backgroundColor: "#FEE500", color: "#3A1D1D" }}>
                  <Share2 className="w-4 h-4" />
                  카카오톡으로 공유하기
                </button>
              </div>
              <div className="h-px bg-gray-100" />
              <div className="px-8 py-7 text-center bg-white">
                <p className="text-xs text-gray-400">© 2026 {registrationData.groomName.slice(1)} &amp; {registrationData.brideName.slice(1)}.</p>
                <p className="text-xs text-gray-400">Created by SHIRLEY</p>
              </div>

            </div>
            <div className="h-10" />
          </div>
        </main>
      </div>

      {/* ── RSVP Modal (AnimatePresence wraps portal-like overlay) ── */}
      <AnimatePresence>
        {rsvpOpen && <RsvpModal onClose={() => setRsvpOpen(false)} />}
      </AnimatePresence>
    </div>
  );
}