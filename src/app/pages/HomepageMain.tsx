import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import { Heart, Sparkles, ChevronRight, Star, Play, Menu, X, UserPlus, FileText, Smartphone } from 'lucide-react';

export default function HomepageMain() {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  // 메뉴 항목 (3단계 흐름)
  const menuSteps = [
    {
      icon: <UserPlus className="w-5 h-5" />,
      step: '01',
      label: '회원가입',
      desc: '계정을 만들고 서비스를 시작하세요',
      path: '/create-account',
      color: 'text-blue-500',
      bg: 'bg-blue-50',
    },
    {
      icon: <FileText className="w-5 h-5" />,
      step: '02',
      label: '회원정보 입력',
      desc: '계좌, 식장 정보 등을 등록하세요',
      path: '/registration',
      color: 'text-rose-500',
      bg: 'bg-rose-50',
    },
    {
      icon: <Smartphone className="w-5 h-5" />,
      step: '03',
      label: '무료 청첩장 만들기',
      desc: '나만의 모바일 청첩장을 완성하세요',
      path: '/wedding-builder',
      color: 'text-emerald-500',
      bg: 'bg-emerald-50',
    },
  ];

  return (
    <div className="min-h-screen bg-white font-sans">

      {/* ── 햄버거 메뉴 드로어 ── */}
      {menuOpen && (
        <div className="fixed inset-0 z-50 flex">
          {/* 오버레이 */}
          <div
            className="absolute inset-0 bg-black/40 backdrop-blur-sm"
            onClick={() => setMenuOpen(false)}
          />
          {/* 드로어 패널 */}
          <div className="relative ml-auto w-full max-w-xs bg-white h-full shadow-2xl flex flex-col animate-in slide-in-from-right duration-200">
            <div className="flex items-center justify-between px-6 py-5 border-b border-gray-100">
              <span className="font-bold text-gray-900">이용 안내</span>
              <button onClick={() => setMenuOpen(false)} className="p-1 rounded-full hover:bg-gray-100 transition-colors">
                <X className="w-5 h-5 text-gray-500" />
              </button>
            </div>

            {/* 흐름 단계 */}
            <div className="px-5 py-6 space-y-3 flex-1">
              <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-4">서비스 이용 순서</p>
              {menuSteps.map((item, i) => (
                <button
                  key={i}
                  onClick={() => { navigate(item.path); setMenuOpen(false); }}
                  className="w-full flex items-center gap-4 p-4 rounded-2xl border border-gray-100 hover:border-gray-200 hover:bg-gray-50 transition-all text-left group"
                >
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 ${item.bg} ${item.color}`}>
                    {item.icon}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <span className={`text-[10px] font-black ${item.color}`}>{item.step}</span>
                      <span className="text-sm font-bold text-gray-900">{item.label}</span>
                    </div>
                    <p className="text-xs text-gray-400 mt-0.5 leading-snug">{item.desc}</p>
                  </div>
                  <ChevronRight className="w-4 h-4 text-gray-300 flex-shrink-0 group-hover:text-gray-500 transition-colors" />
                </button>
              ))}
            </div>

            {/* 하단 가입 버튼 */}
            <div className="px-5 pb-8 pt-2 border-t border-gray-100">
              <button
                onClick={() => { navigate('/create-account'); setMenuOpen(false); }}
                className="w-full py-3.5 bg-rose-500 text-white rounded-2xl font-bold text-sm hover:bg-rose-600 transition-colors"
              >
                무료로 시작하기
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ── 상단 네비게이션 ── */}
      <header className="sticky top-0 z-40 bg-white/90 backdrop-blur-md border-b border-gray-100">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between gap-4">

          {/* 로고 */}
          <div
            className="flex items-center gap-2 cursor-pointer flex-shrink-0"
            onClick={() => navigate('/')}
          >
            <Heart className="w-4 h-4 text-rose-500 fill-rose-500" />
            <span className="font-black text-gray-900 text-lg tracking-tight">서비스이름</span>
          </div>

          {/* 가운데 — 눈에 띄는 CTA 버튼 */}
          <div className="flex-1 flex justify-center">
            <button
              onClick={() => navigate('/wedding-builder')}
              className="group relative flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-bold text-white overflow-hidden shadow-md hover:shadow-lg transition-all active:scale-[0.97]"
              style={{
                background: 'linear-gradient(135deg, #f43f5e 0%, #fb923c 100%)',
              }}
            >
              {/* 반짝이 효과 */}
              <span className="absolute inset-0 bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity rounded-full" />
              <Sparkles className="w-3.5 h-3.5 flex-shrink-0" />
              <span>무료 모바일청첩장 제작</span>
              <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform flex-shrink-0" />
            </button>
          </div>

          {/* 오른쪽 — 회원가입 + 햄버거 */}
          <div className="flex items-center gap-2 flex-shrink-0">
            <button
              onClick={() => navigate('/create-account')}
              className="hidden sm:block px-4 py-2 bg-gray-900 text-white text-sm font-semibold rounded-full hover:bg-black transition-colors"
            >
              회원가입
            </button>
            <button
              onClick={() => setMenuOpen(true)}
              className="p-2 rounded-full hover:bg-gray-100 transition-colors"
              aria-label="메뉴 열기"
            >
              <Menu className="w-5 h-5 text-gray-700" />
            </button>
          </div>
        </div>

        {/* 모바일 — CTA 풀 너비 */}
        <div className="md:hidden px-4 pb-3">
          <button
            onClick={() => navigate('/wedding-builder')}
            className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-full text-sm font-bold text-white shadow-md"
            style={{ background: 'linear-gradient(135deg, #f43f5e 0%, #fb923c 100%)' }}
          >
            <Sparkles className="w-3.5 h-3.5" />
            무료 모바일청첩장 제작 →
          </button>
        </div>
      </header>

      {/* ── 히어로 섹션 ── */}
      <section className="relative overflow-hidden bg-gradient-to-b from-rose-50/60 to-white pt-20 pb-28 px-6">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-10 left-[10%] w-64 h-64 bg-rose-200/20 rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-[5%] w-80 h-80 bg-pink-100/30 rounded-full blur-3xl" />
        </div>

        <div className="relative max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-white border border-rose-100 rounded-full text-xs font-semibold text-rose-500 mb-6 shadow-sm">
            <Star className="w-3 h-3 fill-rose-400 text-rose-400" />
            국내 1위 모바일 청첩장 서비스
          </div>

          <h1 className="text-4xl md:text-6xl font-black text-gray-900 leading-tight mb-6 tracking-tight">
            우리의 특별한 날을<br />
            <span className="text-rose-400">아름답게</span> 전하세요
          </h1>

          <p className="text-gray-500 text-base md:text-lg leading-relaxed mb-10 max-w-xl mx-auto">
            무료로 만드는 감각적인 모바일 청첩장.<br />
            5분이면 완성되는 나만의 웨딩 인비테이션.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            {/* 메인 CTA — 그라데이션 강조 */}
            <button
              onClick={() => navigate('/wedding-builder')}
              className="group flex items-center gap-2.5 px-8 py-4 text-white font-bold rounded-full text-sm shadow-xl hover:shadow-2xl active:scale-[0.98] transition-all"
              style={{ background: 'linear-gradient(135deg, #f43f5e 0%, #fb923c 100%)' }}
            >
              <Sparkles className="w-4 h-4" />
              지금 바로 무료로 만들기
              <ChevronRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
            </button>
            <button className="flex items-center gap-2 px-6 py-4 border border-gray-200 text-gray-600 font-semibold rounded-full text-sm hover:bg-gray-50 transition-all">
              <Play className="w-3.5 h-3.5 fill-gray-400 text-gray-400" />
              샘플 보기
            </button>
          </div>
        </div>
      </section>

      {/* ── 이용 흐름 3단계 ── */}
      <section className="py-16 px-6 bg-white">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="text-2xl md:text-3xl font-black text-gray-900 mb-2">딱 3단계면 완성!</h2>
            <p className="text-gray-400 text-sm">간단한 순서를 따라 청첩장을 만들어보세요</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {menuSteps.map((item, i) => (
              <button
                key={i}
                onClick={() => navigate(item.path)}
                className="group p-6 rounded-3xl border-2 border-gray-100 hover:border-gray-200 hover:shadow-md transition-all text-left"
              >
                <div className={`w-12 h-12 rounded-2xl flex items-center justify-center mb-4 ${item.bg} ${item.color}`}>
                  {item.icon}
                </div>
                <div className={`text-xs font-black mb-1 ${item.color}`}>STEP {item.step}</div>
                <h3 className="font-black text-gray-900 mb-1">{item.label}</h3>
                <p className="text-sm text-gray-400 leading-relaxed">{item.desc}</p>
                <div className={`mt-4 flex items-center gap-1 text-xs font-bold ${item.color} opacity-0 group-hover:opacity-100 transition-opacity`}>
                  바로 가기 <ChevronRight className="w-3.5 h-3.5" />
                </div>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* ── 테마 카드 섹션 ── */}
      <section className="py-16 px-6 bg-gray-50">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl font-black text-gray-900 mb-3">
              이런 청첩장을 만들 수 있어요
            </h2>
            <p className="text-gray-400 text-sm">다양한 테마와 컬러로 나만의 스타일을 완성하세요</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { bg: '#d6cfc5', label: '베이지 클래식' },
              { bg: '#e8c4c4', label: '로즈 로맨틱' },
              { bg: '#b8d0be', label: '세이지 모던' },
              { bg: '#c8c0e0', label: '라벤더 드림' },
            ].map((theme) => (
              <div key={theme.label} className="group cursor-pointer" onClick={() => navigate('/wedding-builder')}>
                <div
                  className="w-full aspect-[3/5] rounded-3xl shadow-md group-hover:shadow-xl transition-all group-hover:scale-[1.02] overflow-hidden relative"
                  style={{ backgroundColor: theme.bg }}
                >
                  <div className="absolute inset-0 flex flex-col items-center justify-center p-4">
                    <div className="w-8 h-8 rounded-full bg-white/40 mb-3" />
                    <div className="w-14 h-1 bg-white/60 rounded mb-1.5" />
                    <div className="w-10 h-1 bg-white/40 rounded mb-4" />
                    <div className="w-16 h-16 rounded-full bg-white/30 mb-4" />
                    <div className="w-12 h-1 bg-white/50 rounded mb-1" />
                    <div className="w-16 h-1 bg-white/40 rounded mb-1" />
                    <div className="w-10 h-1 bg-white/30 rounded" />
                  </div>
                  <div className="absolute bottom-3 left-0 right-0 text-center">
                    <span className="text-[10px] font-bold text-white/80 bg-black/10 px-2 py-0.5 rounded-full">{theme.label}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 특징 섹션 ── */}
      <section className="py-16 px-6 bg-white">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-black text-gray-900 text-center mb-10">왜 선택해야 할까요?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { emoji: '✨', title: '완전 무료', desc: '기본 청첩장 제작은 100% 무료입니다. 숨겨진 비용 없음.' },
              { emoji: '⚡', title: '5분 완성', desc: '직관적인 에디터로 누구나 쉽게 아름다운 청첩장 제작.' },
              { emoji: '💌', title: '카카오톡 공유', desc: '완성 즉시 카카오톡으로 하객에게 바로 전송 가능.' },
            ].map((item) => (
              <div key={item.title} className="bg-gray-50 rounded-3xl p-8 hover:shadow-md transition-shadow">
                <div className="text-3xl mb-4">{item.emoji}</div>
                <h3 className="font-bold text-gray-900 mb-2">{item.title}</h3>
                <p className="text-sm text-gray-500 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA 섹션 ── */}
      <section className="py-24 px-6 bg-gray-900 text-white text-center">
        <h2 className="text-3xl md:text-4xl font-black mb-4">지금 바로 시작하세요</h2>
        <p className="text-gray-400 mb-10 text-sm">회원가입 후 더 많은 기능을 이용할 수 있어요</p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <button
            onClick={() => navigate('/create-account')}
            className="px-8 py-4 text-white font-bold rounded-full text-sm shadow-lg active:scale-[0.98] transition-all"
            style={{ background: 'linear-gradient(135deg, #f43f5e 0%, #fb923c 100%)' }}
          >
            무료 회원가입
          </button>
          <button
            onClick={() => navigate('/wedding-builder')}
            className="px-8 py-4 border border-white/20 text-white font-semibold rounded-full text-sm hover:bg-white/10 transition-all"
          >
            먼저 체험해보기
          </button>
        </div>
      </section>

      {/* ── 푸터 ── */}
      <footer className="py-8 px-6 bg-gray-900 border-t border-white/5 text-center">
        <p className="text-xs text-gray-500">© 2026 서비스이름. All rights reserved.</p>
      </footer>
    </div>
  );
}
