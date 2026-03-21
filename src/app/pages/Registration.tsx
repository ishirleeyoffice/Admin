import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import { 
  ChevronRight, ChevronLeft, Landmark, 
  MapPin, Clock, CreditCard, CheckCircle2, X, Plus, Share2, QrCode, Phone
} from 'lucide-react';

// --- Types ---
interface AccountInfo { name: string; bank: string; accountNum: string; holder: string; side: 'groom' | 'bride'; }
interface VenueInfo { name: string; floor: string; time: string; }
interface PaymentInfo { cardNum: string; expiry: string; cvc: string; cardName: string; }
interface RegistrationData {
  accounts: AccountInfo[];
  venue: VenueInfo;
  payment: PaymentInfo;
  message: string;
  groomPhone: string;
  bridePhone: string;
}

const Registration: React.FC = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [isBankModalOpen, setIsBankModalOpen] = useState<boolean>(false);
  const [activePersonIndex, setActivePersonIndex] = useState<number | null>(null);
  const [openGroom, setOpenGroom] = useState(false);
  const [openBride, setOpenBride] = useState(false);

  const [formData, setFormData] = useState<RegistrationData>({
    accounts: [
      { name: "신랑", bank: '', accountNum: '', holder: '', side: 'groom' },
      { name: "신부", bank: '', accountNum: '', holder: '', side: 'bride' },
      { name: "신랑 아버지", bank: '', accountNum: '', holder: '', side: 'groom' },
      { name: "신부 아버지", bank: '', accountNum: '', holder: '', side: 'bride' },
      { name: "신랑 어머니", bank: '', accountNum: '', holder: '', side: 'groom' },
      { name: "신부 어머니", bank: '', accountNum: '', holder: '', side: 'bride' },
    ],
    venue: { name: '', floor: '', time: '' },
    payment: { cardNum: '', expiry: '', cvc: '', cardName: '' },
    message: '',
    groomPhone: '',
    bridePhone: '',
  });

  const banks = ["국민은행", "신한은행", "우리은행", "하나은행", "농협", "카카오뱅크", "토스뱅크", "기업은행"];

  const updateAccount = (index: number, field: keyof AccountInfo, value: string) => {
    const newAccounts = [...formData.accounts];
    newAccounts[index] = { ...newAccounts[index], [field]: value };
    setFormData({ ...formData, accounts: newAccounts });
  };

  const groomAccounts = formData.accounts.filter(a => a.side === 'groom');
  const brideAccounts = formData.accounts.filter(a => a.side === 'bride');

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col font-sans text-gray-900">
      {/* Header */}
      <header className="bg-white border-b px-6 py-4 flex justify-between items-center sticky top-0 z-50">
        <h1
          className="text-xl font-bold text-rose-500 cursor-pointer hover:opacity-80 transition-opacity"
          onClick={() => navigate('/')}
        >
          서비스이름
          <span className="text-gray-300 font-light mx-2">|</span>
          <span className="text-gray-500 text-sm font-normal">회원정보 입력</span>
        </h1>
        <button className="px-5 py-2 bg-rose-500 text-white rounded-full font-bold text-sm">임시 저장</button>
      </header>

      <main className="flex-1 flex flex-col lg:flex-row">
        {/* Left: Input Form */}
        <div className="flex-1 p-6 lg:p-10 max-w-6xl mx-auto w-full">

          {/* 상단 단계 표시바 (Stepper) — padding 축소 */}
          <div className="flex items-center justify-between mb-6 max-w-2xl mx-auto">
            {[1, 2, 3, 4, 5].map((num) => (
              <div key={num} className="flex flex-col items-center relative flex-1">
                <div className={`w-9 h-9 rounded-full flex items-center justify-center z-10 transition-all text-sm font-bold ${currentStep >= num ? 'bg-rose-500 text-white shadow-md' : 'bg-white border-2 border-gray-200 text-gray-300'}`}>
                  {currentStep > num ? <CheckCircle2 className="w-5 h-5" /> : num}
                </div>
                <div className={`text-[10px] mt-1.5 font-bold ${currentStep >= num ? 'text-rose-500' : 'text-gray-400'}`}>
                  {['계좌정보', '식장정보', '서비스결제', '축하멘트', '최종확인'][num - 1]}
                </div>
                {num < 5 && (
                  <div className={`absolute top-[18px] left-1/2 w-full h-[2px] -z-0 ${currentStep > num ? 'bg-rose-500' : 'bg-gray-200'}`} />
                )}
              </div>
            ))}
          </div>

          <div className="bg-white rounded-[2.5rem] shadow-xl border border-gray-100 p-8 min-h-[550px] flex flex-col">

            {/* 단계 1: 예금주 정보 */}
            {currentStep === 1 && (
              <section className="animate-in fade-in duration-500">
                <h2 className="text-2xl font-black mb-6">단계 1. 예금주 정보 입력</h2>

                {/* ── 신랑 · 신부 핸드폰 번호 (계좌 위) ── */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                  <div className="p-5 rounded-[1.5rem] bg-blue-50/40 border border-blue-100">
                    <h3 className="text-blue-600 font-bold mb-3 flex items-center gap-1.5">
                      <Phone className="w-4 h-4" /> 신랑 연락처
                    </h3>
                    <input
                      type="tel"
                      placeholder="010-0000-0000"
                      value={formData.groomPhone}
                      onChange={(e) => setFormData({ ...formData, groomPhone: e.target.value })}
                      className="w-full p-3 border border-blue-200 rounded-xl text-sm outline-none focus:ring-2 focus:ring-blue-200 bg-white placeholder-gray-400"
                    />
                  </div>
                  <div className="p-5 rounded-[1.5rem] bg-rose-50/40 border border-rose-100">
                    <h3 className="text-rose-500 font-bold mb-3 flex items-center gap-1.5">
                      <Phone className="w-4 h-4" /> 신부 연락처
                    </h3>
                    <input
                      type="tel"
                      placeholder="010-0000-0000"
                      value={formData.bridePhone}
                      onChange={(e) => setFormData({ ...formData, bridePhone: e.target.value })}
                      className="w-full p-3 border border-rose-200 rounded-xl text-sm outline-none focus:ring-2 focus:ring-rose-200 bg-white placeholder-gray-400"
                    />
                  </div>
                </div>

                {/* ── 계좌 정보 ── */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-4 p-6 rounded-[2rem] bg-blue-50/40 border border-blue-100">
                    <h3 className="text-blue-600 font-bold mb-4 px-2">신랑측 계좌</h3>
                    {groomAccounts.map((acc) => {
                      const idx = formData.accounts.findIndex(a => a.name === acc.name);
                      return (
                        <div key={acc.name} className="bg-white p-4 rounded-2xl shadow-sm space-y-3">
                          <p className="text-xs font-bold text-gray-500">{acc.name}</p>
                          <div className="flex gap-2">
                            <button onClick={() => { setActivePersonIndex(idx); setIsBankModalOpen(true); }} className="flex-1 text-left p-2 border rounded-lg text-xs bg-gray-50 truncate">{acc.bank || '은행'}</button>
                            <input type="text" placeholder="계좌번호" value={acc.accountNum} onChange={(e) => updateAccount(idx, 'accountNum', e.target.value)} className="flex-[2] p-2 border rounded-lg text-xs outline-none focus:ring-1 focus:ring-blue-300" />
                            <input type="text" placeholder="예금주" value={acc.holder} onChange={(e) => updateAccount(idx, 'holder', e.target.value)} className="flex-1 p-2 border rounded-lg text-xs outline-none focus:ring-1 focus:ring-blue-300" />
                          </div>
                        </div>
                      );
                    })}
                  </div>
                  <div className="space-y-4 p-6 rounded-[2rem] bg-rose-50/40 border border-rose-100">
                    <h3 className="text-rose-500 font-bold mb-4 px-2">신부측 계좌</h3>
                    {brideAccounts.map((acc) => {
                      const idx = formData.accounts.findIndex(a => a.name === acc.name);
                      return (
                        <div key={acc.name} className="bg-white p-4 rounded-2xl shadow-sm space-y-3">
                          <p className="text-xs font-bold text-gray-500">{acc.name}</p>
                          <div className="flex gap-2">
                            <button onClick={() => { setActivePersonIndex(idx); setIsBankModalOpen(true); }} className="flex-1 text-left p-2 border rounded-lg text-xs bg-gray-50 truncate">{acc.bank || '은행'}</button>
                            <input type="text" placeholder="계좌번호" value={acc.accountNum} onChange={(e) => updateAccount(idx, 'accountNum', e.target.value)} className="flex-[2] p-2 border rounded-lg text-xs outline-none focus:ring-1 focus:ring-rose-300" />
                            <input type="text" placeholder="예금주" value={acc.holder} onChange={(e) => updateAccount(idx, 'holder', e.target.value)} className="flex-1 p-2 border rounded-lg text-xs outline-none focus:ring-1 focus:ring-rose-300" />
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </section>
            )}

            {/* 단계 2: 식장 정보 */}
            {currentStep === 2 && (
              <section className="animate-in fade-in duration-500">
                <h2 className="text-2xl font-black mb-6">단계 2. 식장 정보 입력</h2>
                <div className="space-y-6 max-w-xl">
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-gray-700 flex items-center gap-2"><MapPin className="w-4 h-4 text-rose-400" /> 식장 이름</label>
                    <input type="text" placeholder="예: 신라호텔 영빈관" value={formData.venue.name} onChange={(e) => setFormData({ ...formData, venue: { ...formData.venue, name: e.target.value } })} className="w-full p-4 border rounded-2xl outline-none focus:border-rose-400" />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-sm font-bold text-gray-700">층수/홀 이름</label>
                      <input type="text" placeholder="예: 1층 에메랄드홀" value={formData.venue.floor} onChange={(e) => setFormData({ ...formData, venue: { ...formData.venue, floor: e.target.value } })} className="w-full p-4 border rounded-2xl outline-none focus:border-rose-400" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-bold text-gray-700 flex items-center gap-2"><Clock className="w-4 h-4 text-rose-400" /> 예식 시간</label>
                      <input type="time" value={formData.venue.time} onChange={(e) => setFormData({ ...formData, venue: { ...formData.venue, time: e.target.value } })} className="w-full p-4 border rounded-2xl outline-none focus:border-rose-400" />
                    </div>
                  </div>
                </div>
              </section>
            )}

            {/* 단계 3: 서비스 결제 */}
            {currentStep === 3 && (
              <section className="animate-in fade-in duration-500">
                <div className="flex justify-between items-end mb-6">
                  <h2 className="text-2xl font-black">단계 3. 서비스 결제</h2>
                  <div className="text-right">
                    <p className="text-sm text-gray-500 font-bold">결제 금액</p>
                    <p className="text-2xl font-black text-rose-500">100,000원</p>
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                  <div className="space-y-6">
                    <div className="space-y-2">
                      <label className="text-sm font-bold text-gray-700">결제 알림 이메일</label>
                      <input type="email" placeholder="example@email.com" className="w-full p-4 border rounded-2xl outline-none focus:ring-2 focus:ring-rose-100" />
                    </div>
                    <div className="space-y-3">
                      <label className="text-sm font-bold text-gray-700">결제 방법</label>
                      <div className="grid grid-cols-3 gap-2">
                        <button className="py-3 border-2 border-gray-900 rounded-xl text-xs font-bold bg-white">신용·체크카드</button>
                        <button className="py-3 border border-gray-100 rounded-xl text-xs font-bold bg-gray-50 text-gray-400">계좌이체</button>
                        <button className="py-3 border border-gray-100 rounded-xl text-xs font-bold bg-gray-50 text-gray-400">휴대폰</button>
                      </div>
                      <div className="grid grid-cols-3 gap-2">
                        <button className="py-2 border border-gray-100 rounded-xl flex items-center justify-center bg-gray-50 opacity-60">
                          <span className="text-[10px] font-bold text-blue-500">toss</span><span className="text-[10px] font-bold">pay</span>
                        </button>
                        <button className="py-2 border border-gray-100 rounded-xl flex items-center justify-center bg-gray-50 opacity-60">
                          <span className="text-[10px] font-bold text-green-600">N</span><span className="text-[10px] font-bold ml-1">Pay</span>
                        </button>
                        <button className="py-2 border border-gray-100 rounded-xl flex items-center justify-center bg-gray-50 opacity-60">
                          <span className="text-[10px] font-bold bg-yellow-400 px-1 rounded">talk</span><span className="text-[10px] font-bold ml-1">pay</span>
                        </button>
                      </div>
                    </div>
                    <div className="pt-4 space-y-3 border-t border-dashed">
                      <p className="text-xs font-bold text-gray-400">카드 정보 입력</p>
                      <input type="text" placeholder="카드 번호 (16자리)" value={formData.payment.cardNum} onChange={(e) => setFormData({ ...formData, payment: { ...formData.payment, cardNum: e.target.value } })} className="w-full p-4 border rounded-xl outline-none focus:ring-2 focus:ring-rose-100" />
                      <div className="grid grid-cols-2 gap-4">
                        <input type="text" placeholder="유효기간 (MM/YY)" value={formData.payment.expiry} onChange={(e) => setFormData({ ...formData, payment: { ...formData.payment, expiry: e.target.value } })} className="w-full p-4 border rounded-xl outline-none focus:ring-2 focus:ring-rose-100" />
                        <input type="password" placeholder="CVC" value={formData.payment.cvc} onChange={(e) => setFormData({ ...formData, payment: { ...formData.payment, cvc: e.target.value } })} className="w-full p-4 border rounded-xl outline-none focus:ring-2 focus:ring-rose-100" />
                      </div>
                    </div>
                  </div>
                  <div className="hidden md:flex flex-col justify-center">
                    <div className="bg-gray-900 p-8 rounded-3xl shadow-2xl text-white aspect-[1.6/1] flex flex-col justify-between relative overflow-hidden">
                      <div className="absolute top-0 right-0 w-32 h-32 bg-rose-500/10 rounded-full -mr-16 -mt-16"></div>
                      <div className="w-12 h-10 bg-yellow-400/80 rounded-lg shadow-inner z-10"></div>
                      <div className="text-xl tracking-widest font-mono z-10">{formData.payment.cardNum || "0000 0000 0000 0000"}</div>
                      <div className="flex justify-between text-[10px] opacity-70 z-10">
                        <span>{formData.payment.cardName.toUpperCase() || "HOLDER NAME"}</span>
                        <span>{formData.payment.expiry || "MM/YY"}</span>
                      </div>
                    </div>
                    <p className="text-center text-xs text-gray-400 mt-4">안전한 보안 결제 시스템이 적용 중입니다.</p>
                  </div>
                </div>
              </section>
            )}

            {/* 단계 4: 축하 멘트 */}
            {currentStep === 4 && (
              <section className="animate-in fade-in duration-500">
                <h2 className="text-2xl font-black mb-6">단계 4. 축하 감사 멘트 작성</h2>
                <div className="space-y-4">
                  <div className="relative">
                    <textarea maxLength={100} value={formData.message} onChange={(e) => setFormData({ ...formData, message: e.target.value })} placeholder="따뜻한 감사 인사를 작성해 보세요." className="w-full h-40 p-5 border-2 border-rose-50 rounded-3xl focus:border-rose-400 outline-none resize-none bg-rose-50/10 text-lg" />
                    <div className="absolute bottom-4 right-6 text-sm font-medium text-rose-400">{formData.message.length} / 100자</div>
                  </div>
                  <div className="p-4 bg-amber-50 rounded-2xl border border-amber-100">
                    <p className="text-amber-700 text-sm leading-6 font-medium">
                      ※ 100자 내 작성 가능<br />
                      ※ 식 하루 전까지 수정 가능
                    </p>
                  </div>
                </div>
              </section>
            )}

            {/* 단계 5: 최종 확인 */}
            {currentStep === 5 && (
              <section className="animate-in fade-in duration-500">
                <h2 className="text-2xl font-black mb-6">단계 5. 정보 최종 확인</h2>
                <div className="space-y-6">
                  {/* 연락처 확인 */}
                  <div className="grid grid-cols-2 gap-4">
                    <div className="p-5 bg-blue-50/40 border border-blue-100 rounded-3xl">
                      <p className="text-[10px] font-bold text-blue-500 mb-1">신랑 연락처</p>
                      <p className="text-sm font-bold">{formData.groomPhone || "미입력"}</p>
                    </div>
                    <div className="p-5 bg-rose-50/40 border border-rose-100 rounded-3xl">
                      <p className="text-[10px] font-bold text-rose-500 mb-1">신부 연락처</p>
                      <p className="text-sm font-bold">{formData.bridePhone || "미입력"}</p>
                    </div>
                  </div>
                  <div className="p-6 bg-gray-50 rounded-3xl border border-gray-100">
                    <h3 className="font-bold text-gray-400 text-xs mb-4 uppercase tracking-widest">Wedding Venue</h3>
                    <p className="text-xl font-bold">{formData.venue.name || "미입력"} <span className="text-rose-500 text-sm ml-2">{formData.venue.floor}</span></p>
                    <p className="text-gray-500 mt-1">{formData.venue.time || "시간 미정"}</p>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="p-5 border rounded-3xl">
                      <p className="text-[10px] font-bold text-blue-500 mb-2">신랑측 대표계좌</p>
                      <p className="text-sm font-bold">{formData.accounts[0].bank || "-"} {formData.accounts[0].accountNum}</p>
                    </div>
                    <div className="p-5 border rounded-3xl">
                      <p className="text-[10px] font-bold text-rose-500 mb-2">신부측 대표계좌</p>
                      <p className="text-sm font-bold">{formData.accounts[1].bank || "-"} {formData.accounts[1].accountNum}</p>
                    </div>
                  </div>
                  <div className="p-6 bg-rose-50/30 rounded-3xl border border-rose-100 italic text-gray-600">
                    "{formData.message || "감사 인사가 작성되지 않았습니다."}"
                  </div>
                </div>
              </section>
            )}

            {/* 하단 네비게이션 버튼 */}
            <div className="mt-auto pt-10 flex gap-4">
              {currentStep > 1 && (
                <button onClick={() => setCurrentStep(prev => prev - 1)} className="flex-1 py-4 border-2 rounded-2xl font-bold text-gray-500 hover:bg-gray-50 transition-all flex items-center justify-center gap-2">
                  <ChevronLeft className="w-5 h-5" /> 이전
                </button>
              )}
              <button
                onClick={() => currentStep < 5 ? setCurrentStep(prev => prev + 1) : alert('가입이 완료되었습니다!')}
                className="flex-[2] py-4 bg-gray-900 text-white rounded-2xl font-bold hover:bg-black transition-all shadow-lg flex items-center justify-center gap-2"
              >
                {currentStep === 5 ? "가입 완료" : "다음 단계"} <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>

        {/* Right: Mobile / Ticket Preview 영역 */}
        <div className="lg:w-[450px] bg-gray-100 p-8 flex justify-center items-start lg:sticky lg:top-[73px] lg:h-[calc(100vh-73px)]">
          {currentStep === 5 ? (
            <div className="relative w-[300px] bg-white p-8 rounded-sm shadow-2xl flex flex-col items-center text-center animate-in zoom-in-95 duration-500 border-b-[12px] border-gray-200 mt-10">
              <div className="w-full border-t-2 border-b-2 border-gray-900 py-3 mb-8">
                <h4 className="font-bold text-lg">축하 감사 인사 멘트 작성 란</h4>
              </div>
              <div className="w-40 h-40 border-4 border-gray-900 p-2 mb-8 shadow-inner">
                <QrCode className="w-full h-full text-gray-900" />
              </div>
              <div className="space-y-1 mb-8">
                <p className="text-xl font-black">
                  신랑 {formData.accounts[0].holder || "OOO"}, 신부 {formData.accounts[1].holder || "OOO"}
                </p>
                <p className="text-xl font-black">{formData.venue.time || "1:00pm"}</p>
              </div>
              <div className="text-gray-500 text-sm font-bold leading-relaxed">
                현장 식권 QR 발급용<br />(하객용)
              </div>
              <div className="absolute -right-4 top-10 w-4 h-full bg-black/5 -skew-y-12"></div>
            </div>
          ) : (
            <div className="relative w-[320px] h-[640px] bg-white rounded-[3.5rem] border-[10px] border-gray-900 shadow-2xl overflow-hidden flex flex-col">
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-36 h-7 bg-gray-900 rounded-b-3xl z-20"></div>
              <div className="flex-1 overflow-y-auto pt-14 px-6 space-y-10 custom-scrollbar">
                <div className="text-center">
                  <p className="text-[10px] text-rose-300 font-bold tracking-[0.2em]">INVITATION</p>
                  <h4 className="text-lg font-serif mt-2">마음 전하실 곳</h4>
                  <p className="text-[11px] text-gray-400 mt-4 leading-relaxed">참석이 어려우신 분들을 위해<br />계좌번호를 기재하였습니다. 너른 양해 부탁드립니다.</p>
                </div>
                <div className="space-y-4">
                  <div className="border border-gray-100 rounded-2xl overflow-hidden shadow-sm">
                    <button onClick={() => setOpenGroom(!openGroom)} className="w-full p-4 flex justify-between items-center bg-white">
                      <span className="text-sm font-medium text-gray-700">신랑측 계좌번호</span>
                      <Plus className={`w-4 h-4 text-gray-400 transition-transform ${openGroom ? 'rotate-45' : ''}`} />
                    </button>
                    {openGroom && (
                      <div className="bg-gray-50/50 p-4 space-y-3">
                        {groomAccounts.map((acc, i) => (
                          <div key={i} className="text-[11px] border-b border-white pb-2 last:border-0">
                            <p className="text-gray-400 mb-1">{acc.name}</p>
                            <div className="flex justify-between items-center">
                              <p className="font-bold">{acc.bank || '미설정'} <span className="text-gray-500 font-normal">{acc.accountNum}</span></p>
                              <button className="bg-white border text-[9px] px-2 py-1 rounded">복사</button>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                  <div className="border border-gray-100 rounded-2xl overflow-hidden shadow-sm">
                    <button onClick={() => setOpenBride(!openBride)} className="w-full p-4 flex justify-between items-center bg-white">
                      <span className="text-sm font-medium text-gray-700">신부측 계좌번호</span>
                      <Plus className={`w-4 h-4 text-gray-400 transition-transform ${openBride ? 'rotate-45' : ''}`} />
                    </button>
                    {openBride && (
                      <div className="bg-gray-50/50 p-4 space-y-3">
                        {brideAccounts.map((acc, i) => (
                          <div key={i} className="text-[11px] border-b border-white pb-2 last:border-0">
                            <p className="text-gray-400 mb-1">{acc.name}</p>
                            <div className="flex justify-between items-center">
                              <p className="font-bold">{acc.bank || '미설정'} <span className="text-gray-500 font-normal">{acc.accountNum}</span></p>
                              <button className="bg-white border text-[9px] px-2 py-1 rounded">복사</button>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
                <div className="pt-10">
                  <button className="w-full bg-[#1A1A1B] text-white py-4 rounded-2xl flex items-center justify-center gap-3 shadow-xl active:scale-95 transition-all">
                    <Share2 className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                    <span className="text-sm font-bold">카카오톡으로 공유하기</span>
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>

      {/* 은행 선택 모달 */}
      {isBankModalOpen && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-[100] p-4">
          <div className="bg-white w-full max-w-sm rounded-[2.5rem] overflow-hidden shadow-2xl">
            <div className="p-6 border-b flex justify-between items-center bg-gray-50">
              <h3 className="font-bold">은행 선택</h3>
              <button onClick={() => setIsBankModalOpen(false)}><X className="w-5 h-5" /></button>
            </div>
            <div className="grid grid-cols-3 gap-3 p-6">
              {banks.map((bank) => (
                <button
                  key={bank}
                  onClick={() => { if (activePersonIndex !== null) updateAccount(activePersonIndex, 'bank', bank); setIsBankModalOpen(false); }}
                  className="p-3 text-xs border rounded-2xl hover:border-rose-400 hover:bg-rose-50 transition-all flex flex-col items-center gap-2"
                >
                  <div className="w-10 h-10 bg-gray-100 rounded-xl flex items-center justify-center"><Landmark className="w-5 h-5 text-gray-400" /></div>
                  {bank}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Registration;
