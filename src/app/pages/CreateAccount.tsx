import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import { Eye, EyeOff, CheckCircle2, Heart } from 'lucide-react';

type Tab = 'email' | 'phone';

interface FormState {
  email: string;
  password: string;
  passwordConfirm: string;
  name: string;
  phone: string;
  verifyCode: string;
  agreeAll: boolean;
  agreeTerms: boolean;
  agreePrivacy: boolean;
  agreeMarketing: boolean;
}

export default function CreateAccount() {
  const navigate = useNavigate();
  const [tab, setTab] = useState<Tab>('email');
  const [showPw, setShowPw] = useState(false);
  const [showPwConfirm, setShowPwConfirm] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [codeSent, setCodeSent] = useState(false);

  const [form, setForm] = useState<FormState>({
    email: '',
    password: '',
    passwordConfirm: '',
    name: '',
    phone: '',
    verifyCode: '',
    agreeAll: false,
    agreeTerms: false,
    agreePrivacy: false,
    agreeMarketing: false,
  });

  const set = (field: keyof FormState) =>
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setForm(prev => ({
        ...prev,
        [field]: e.target.type === 'checkbox' ? e.target.checked : e.target.value,
      }));
    };

  const handleAgreeAll = (checked: boolean) => {
    setForm(prev => ({
      ...prev,
      agreeAll: checked,
      agreeTerms: checked,
      agreePrivacy: checked,
      agreeMarketing: checked,
    }));
  };

  const handleSingleAgree = (
    field: 'agreeTerms' | 'agreePrivacy' | 'agreeMarketing',
    checked: boolean
  ) => {
    const next = { ...form, [field]: checked };
    setForm({ ...next, agreeAll: next.agreeTerms && next.agreePrivacy && next.agreeMarketing });
  };

  const isEmailValid =
    form.email.includes('@') &&
    form.password.length >= 8 &&
    form.password === form.passwordConfirm &&
    form.name !== '' &&
    form.agreeTerms &&
    form.agreePrivacy;

  const isPhoneValid =
    form.phone.length >= 10 &&
    form.verifyCode.length >= 4 &&
    form.agreeTerms &&
    form.agreePrivacy;

  const isValid = tab === 'email' ? isEmailValid : isPhoneValid;

  const handleSubmit = () => {
    if (!isValid) return;
    setSubmitted(true);
    setTimeout(() => navigate('/registration'), 1200);
  };

  const Checkbox = ({
    checked,
    onChange,
    label,
    required,
  }: {
    checked: boolean;
    onChange: (v: boolean) => void;
    label: React.ReactNode;
    required?: boolean;
  }) => (
    <label className="flex items-center gap-2.5 cursor-pointer select-none">
      <div
        onClick={() => onChange(!checked)}
        className={`w-5 h-5 rounded flex items-center justify-center flex-shrink-0 border transition-colors ${
          checked ? 'bg-rose-500 border-rose-500' : 'border-gray-300 hover:border-rose-300'
        }`}
      >
        {checked && (
          <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </svg>
        )}
      </div>
      <span className="text-sm text-gray-700 leading-snug">
        {label}
        {required && <span className="text-rose-500 ml-0.5">(필수)</span>}
      </span>
    </label>
  );

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-start py-12 px-4 font-sans">

      {/* 완료 오버레이 */}
      {submitted && (
        <div className="fixed inset-0 bg-white/90 backdrop-blur-sm z-[100] flex flex-col items-center justify-center gap-4">
          <CheckCircle2 className="w-16 h-16 text-rose-500" />
          <p className="text-lg font-bold text-gray-900">회원가입 완료!</p>
          <p className="text-sm text-gray-400">잠시 후 이동합니다…</p>
        </div>
      )}

      {/* 로고 — 클릭 시 홈으로 */}
      <div
        className="flex items-center gap-2 mb-8 cursor-pointer hover:opacity-80 transition-opacity"
        onClick={() => navigate('/')}
      >
        <Heart className="w-4 h-4 text-rose-500 fill-rose-500" />
        <span className="text-2xl font-black text-gray-900 tracking-tight">
          서비스이름
        </span>
      </div>

      {/* 메인 카드 */}
      <div className="w-full max-w-[400px] bg-white border border-gray-200 rounded-lg shadow-sm overflow-hidden">

        {/* 탭 */}
        <div className="flex border-b border-gray-200">
          {(['email', 'phone'] as Tab[]).map(t => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={`flex-1 py-3.5 text-sm font-semibold transition-colors ${
                tab === t
                  ? 'text-rose-500 border-b-2 border-rose-500 bg-white'
                  : 'text-gray-400 hover:text-gray-600 bg-gray-50'
              }`}
            >
              {t === 'email' ? '이메일로 가입' : '핸드폰 번호로 가입'}
            </button>
          ))}
        </div>

        <div className="p-7 space-y-3">

          {/* ── 이메일 탭 ── */}
          {tab === 'email' && (
            <>
              <input
                type="text"
                placeholder="이름"
                value={form.name}
                onChange={set('name')}
                className="w-full px-4 py-3 border border-gray-300 rounded text-sm outline-none focus:border-rose-400 transition-colors placeholder-gray-400"
              />
              <input
                type="email"
                placeholder="이메일"
                value={form.email}
                onChange={set('email')}
                className="w-full px-4 py-3 border border-gray-300 rounded text-sm outline-none focus:border-rose-400 transition-colors placeholder-gray-400"
              />
              <div className="relative">
                <input
                  type={showPw ? 'text' : 'password'}
                  placeholder="비밀번호 (8자 이상)"
                  value={form.password}
                  onChange={set('password')}
                  className="w-full px-4 py-3 border border-gray-300 rounded text-sm outline-none focus:border-rose-400 transition-colors placeholder-gray-400 pr-11"
                />
                <button type="button" onClick={() => setShowPw(v => !v)} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">
                  {showPw ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
              {form.password && form.password.length < 8 && (
                <p className="text-xs text-rose-500 px-1">비밀번호는 8자 이상이어야 합니다</p>
              )}
              <div className="relative">
                <input
                  type={showPwConfirm ? 'text' : 'password'}
                  placeholder="비밀번호 확인"
                  value={form.passwordConfirm}
                  onChange={set('passwordConfirm')}
                  className={`w-full px-4 py-3 border rounded text-sm outline-none transition-colors placeholder-gray-400 pr-11 ${
                    form.passwordConfirm && form.password !== form.passwordConfirm
                      ? 'border-rose-400'
                      : 'border-gray-300 focus:border-rose-400'
                  }`}
                />
                <button type="button" onClick={() => setShowPwConfirm(v => !v)} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">
                  {showPwConfirm ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
              {form.passwordConfirm && form.password !== form.passwordConfirm && (
                <p className="text-xs text-rose-500 px-1">비밀번호가 일치하지 않습니다</p>
              )}
            </>
          )}

          {/* ── 핸드폰 탭 ── */}
          {tab === 'phone' && (
            <>
              <div className="flex gap-2">
                <input
                  type="tel"
                  placeholder="핸드폰 번호 (-없이 입력)"
                  value={form.phone}
                  onChange={set('phone')}
                  className="flex-1 px-4 py-3 border border-gray-300 rounded text-sm outline-none focus:border-rose-400 transition-colors placeholder-gray-400"
                />
                <button
                  onClick={() => setCodeSent(true)}
                  className="px-4 py-3 bg-gray-800 text-white text-sm font-semibold rounded hover:bg-black transition-colors whitespace-nowrap"
                >
                  인증번호
                </button>
              </div>
              {codeSent && (
                <div>
                  <input
                    type="text"
                    placeholder="인증번호 입력"
                    value={form.verifyCode}
                    onChange={set('verifyCode')}
                    className="w-full px-4 py-3 border border-gray-300 rounded text-sm outline-none focus:border-rose-400 transition-colors placeholder-gray-400"
                  />
                  <p className="text-xs text-gray-400 mt-1.5 px-1">인증번호가 발송되었습니다</p>
                </div>
              )}
            </>
          )}

          {/* ── 약관 동의 ── */}
          <div className="border border-gray-200 rounded p-4 space-y-3 mt-1">
            <Checkbox
              checked={form.agreeAll}
              onChange={handleAgreeAll}
              label={<span className="font-bold text-gray-900">전체 동의</span>}
            />
            <hr className="border-gray-100" />
            <Checkbox checked={form.agreeTerms} onChange={v => handleSingleAgree('agreeTerms', v)} label="이용약관 동의" required />
            <Checkbox checked={form.agreePrivacy} onChange={v => handleSingleAgree('agreePrivacy', v)} label="개인정보 수집 및 이용 동의" required />
            <Checkbox checked={form.agreeMarketing} onChange={v => handleSingleAgree('agreeMarketing', v)} label="마케팅 정보 수신 동의 (선택)" />
          </div>

          {/* 가입 버튼 */}
          <button
            onClick={handleSubmit}
            disabled={!isValid}
            className={`w-full py-3.5 rounded font-bold text-sm transition-all ${
              isValid
                ? 'bg-rose-500 text-white hover:bg-rose-600 active:scale-[0.99]'
                : 'bg-gray-100 text-gray-300 cursor-not-allowed'
            }`}
          >
            회원가입
          </button>

          {/* SNS 간편가입 */}
          <div className="relative flex items-center gap-3 py-1">
            <div className="flex-1 h-px bg-gray-200" />
            <span className="text-xs text-gray-400 whitespace-nowrap">SNS 간편가입</span>
            <div className="flex-1 h-px bg-gray-200" />
          </div>

          <div className="flex gap-3">
            <button
              className="flex-1 flex items-center justify-center gap-2 py-3 rounded text-sm font-semibold transition-all active:scale-[0.98]"
              style={{ backgroundColor: '#FEE500', color: '#3A1D1D' }}
            >
              <svg width="16" height="16" viewBox="0 0 18 18" fill="none">
                <path fillRule="evenodd" clipRule="evenodd"
                  d="M9 1.5C4.858 1.5 1.5 4.134 1.5 7.374c0 2.07 1.368 3.888 3.426 4.932l-.87 3.24a.225.225 0 00.342.243l3.78-2.493c.27.036.546.054.822.054 4.142 0 7.5-2.634 7.5-5.874C16.5 4.134 13.142 1.5 9 1.5z"
                  fill="#3A1D1D" />
              </svg>
              카카오
            </button>
            <button
              className="flex-1 flex items-center justify-center gap-2 py-3 rounded text-sm font-semibold text-white transition-all active:scale-[0.98]"
              style={{ backgroundColor: '#03C75A' }}
            >
              <span className="text-base font-black leading-none" style={{ fontFamily: 'Arial Black, sans-serif' }}>N</span>
              네이버
            </button>
          </div>
        </div>
      </div>

      {/* 하단 링크 */}
      <div className="mt-5 flex items-center gap-3 text-sm text-gray-500">
        <span>이미 계정이 있으신가요?</span>
        <span className="text-gray-300">|</span>
        <button onClick={() => navigate('/')} className="text-rose-500 font-semibold hover:underline transition-colors">
          로그인
        </button>
      </div>
    </div>
  );
}
