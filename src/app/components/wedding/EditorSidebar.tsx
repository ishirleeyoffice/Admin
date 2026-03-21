import React from 'react';
import { useState } from 'react';
import { ChevronDown, ChevronUp, Image as ImageIcon, Users, MessageSquare, MapPin, CreditCard, Palette, Type } from 'lucide-react';
import { InvitationData, PersonInfo } from '../../types/invitation';

interface Props {
  data: InvitationData;
  updateData: (updates: Partial<InvitationData>) => void;
}

export function EditorSidebar({ data, updateData }: Props) {
  const [openSection, setOpenSection] = useState<string | null>('basic');

  const toggleSection = (section: string) => {
    setOpenSection(openSection === section ? null : section);
  };

  const updatePerson = (type: 'groom' | 'bride', field: keyof PersonInfo, value: string) => {
    updateData({
      [type]: {
        ...data[type],
        [field]: value
      }
    });
  };

  const Section = ({ id, icon: Icon, title, children }: { id: string, icon: any, title: string, children: React.ReactNode }) => {
    const isOpen = openSection === id;
    return (
      <div className="border-b border-gray-200 last:border-b-0 bg-white">
        <button
          onClick={() => toggleSection(id)}
          className={`w-full flex items-center justify-between px-6 py-4 transition-colors ${isOpen ? 'bg-gray-50/50' : 'hover:bg-gray-50'}`}
        >
          <div className="flex items-center gap-3">
            <Icon className={`w-5 h-5 ${isOpen ? 'text-rose-500' : 'text-gray-400'}`} />
            <span className={`text-[15px] font-semibold ${isOpen ? 'text-gray-900' : 'text-gray-700'}`}>{title}</span>
          </div>
          {isOpen ? <ChevronUp className="w-4 h-4 text-gray-400" /> : <ChevronDown className="w-4 h-4 text-gray-400" />}
        </button>
        {isOpen && (
          <div className="px-6 pb-6 pt-2 space-y-5 animate-in fade-in slide-in-from-top-2 duration-200">
            {children}
          </div>
        )}
      </div>
    );
  };

  const InputGroup = ({ label, children }: { label: string, children: React.ReactNode }) => (
    <div className="flex flex-col gap-1.5">
      <label className="text-[13px] font-medium text-gray-700">{label}</label>
      {children}
    </div>
  );

  return (
    <div className="w-full lg:w-[420px] h-full overflow-y-auto bg-white border-r border-gray-200 shrink-0 custom-scrollbar shadow-sm z-10">
      
      {/* Design Settings */}
      <Section id="design" icon={Palette} title="디자인 및 메인 설정">
        <InputGroup label="메인 사진 URL">
          <input 
            type="text" 
            value={data.mainPhoto}
            onChange={(e) => updateData({ mainPhoto: e.target.value })}
            className="w-full p-2.5 text-sm bg-gray-50 border border-gray-200 rounded outline-none focus:border-rose-400 focus:bg-white transition-colors"
            placeholder="https://..."
          />
        </InputGroup>
        <InputGroup label="테마 색상">
          <div className="flex items-center gap-3">
            <input 
              type="color" 
              value={data.themeColor}
              onChange={(e) => updateData({ themeColor: e.target.value })}
              className="w-10 h-10 rounded cursor-pointer border-0 p-0"
            />
            <span className="text-sm text-gray-500 uppercase">{data.themeColor}</span>
          </div>
        </InputGroup>
      </Section>

      {/* Info Settings */}
      <Section id="basic" icon={Users} title="기본 및 신랑신부 정보">
        <div className="grid grid-cols-2 gap-4">
          <InputGroup label="예식 날짜">
            <input 
              type="date" 
              value={data.weddingDate}
              onChange={(e) => updateData({ weddingDate: e.target.value })}
              className="w-full p-2.5 text-sm bg-gray-50 border border-gray-200 rounded outline-none focus:border-rose-400 focus:bg-white"
            />
          </InputGroup>
          <InputGroup label="예식 시간">
            <input 
              type="time" 
              value={data.weddingTime}
              onChange={(e) => updateData({ weddingTime: e.target.value })}
              className="w-full p-2.5 text-sm bg-gray-50 border border-gray-200 rounded outline-none focus:border-rose-400 focus:bg-white"
            />
          </InputGroup>
        </div>

        <div className="pt-4 border-t border-gray-100 mt-4">
          <h4 className="text-[14px] font-semibold text-blue-600 mb-3">신랑측 정보</h4>
          <div className="grid grid-cols-2 gap-3 mb-3">
             <InputGroup label="신랑 이름">
                <input type="text" value={data.groom.name} onChange={(e) => updatePerson('groom', 'name', e.target.value)} className="w-full p-2 text-sm bg-gray-50 border border-gray-200 rounded" />
             </InputGroup>
             <InputGroup label="연락처">
                <input type="text" value={data.groom.phone} onChange={(e) => updatePerson('groom', 'phone', e.target.value)} className="w-full p-2 text-sm bg-gray-50 border border-gray-200 rounded" />
             </InputGroup>
             <InputGroup label="아버지">
                <input type="text" value={data.groom.father} onChange={(e) => updatePerson('groom', 'father', e.target.value)} className="w-full p-2 text-sm bg-gray-50 border border-gray-200 rounded" />
             </InputGroup>
             <InputGroup label="어머니">
                <input type="text" value={data.groom.mother} onChange={(e) => updatePerson('groom', 'mother', e.target.value)} className="w-full p-2 text-sm bg-gray-50 border border-gray-200 rounded" />
             </InputGroup>
             <InputGroup label="관계">
                <input type="text" value={data.groom.relation} onChange={(e) => updatePerson('groom', 'relation', e.target.value)} className="w-full p-2 text-sm bg-gray-50 border border-gray-200 rounded" placeholder="예: 장남" />
             </InputGroup>
          </div>
        </div>

        <div className="pt-4 border-t border-gray-100">
          <h4 className="text-[14px] font-semibold text-rose-500 mb-3">신부측 정보</h4>
          <div className="grid grid-cols-2 gap-3">
             <InputGroup label="신부 이름">
                <input type="text" value={data.bride.name} onChange={(e) => updatePerson('bride', 'name', e.target.value)} className="w-full p-2 text-sm bg-gray-50 border border-gray-200 rounded" />
             </InputGroup>
             <InputGroup label="연락처">
                <input type="text" value={data.bride.phone} onChange={(e) => updatePerson('bride', 'phone', e.target.value)} className="w-full p-2 text-sm bg-gray-50 border border-gray-200 rounded" />
             </InputGroup>
             <InputGroup label="아버지">
                <input type="text" value={data.bride.father} onChange={(e) => updatePerson('bride', 'father', e.target.value)} className="w-full p-2 text-sm bg-gray-50 border border-gray-200 rounded" />
             </InputGroup>
             <InputGroup label="어머니">
                <input type="text" value={data.bride.mother} onChange={(e) => updatePerson('bride', 'mother', e.target.value)} className="w-full p-2 text-sm bg-gray-50 border border-gray-200 rounded" />
             </InputGroup>
             <InputGroup label="관계">
                <input type="text" value={data.bride.relation} onChange={(e) => updatePerson('bride', 'relation', e.target.value)} className="w-full p-2 text-sm bg-gray-50 border border-gray-200 rounded" placeholder="예: 장녀" />
             </InputGroup>
          </div>
        </div>
      </Section>

      {/* Greeting */}
      <Section id="greeting" icon={MessageSquare} title="인사말">
        <InputGroup label="인사말 제목">
          <input 
            type="text" 
            value={data.greetingTitle}
            onChange={(e) => updateData({ greetingTitle: e.target.value })}
            className="w-full p-2.5 text-sm bg-gray-50 border border-gray-200 rounded outline-none focus:border-rose-400"
          />
        </InputGroup>
        <InputGroup label="인사말 내용">
          <textarea 
            rows={5}
            value={data.greetingContent}
            onChange={(e) => updateData({ greetingContent: e.target.value })}
            className="w-full p-2.5 text-sm bg-gray-50 border border-gray-200 rounded outline-none focus:border-rose-400 resize-none"
          />
        </InputGroup>
      </Section>

      {/* Location */}
      <Section id="location" icon={MapPin} title="예식장 정보">
        <InputGroup label="예식장 이름">
          <input 
            type="text" 
            value={data.venueName}
            onChange={(e) => updateData({ venueName: e.target.value })}
            className="w-full p-2.5 text-sm bg-gray-50 border border-gray-200 rounded outline-none focus:border-rose-400"
          />
        </InputGroup>
        <InputGroup label="도로명/지번 주소">
          <input 
            type="text" 
            value={data.venueAddress}
            onChange={(e) => updateData({ venueAddress: e.target.value })}
            className="w-full p-2.5 text-sm bg-gray-50 border border-gray-200 rounded outline-none focus:border-rose-400"
          />
        </InputGroup>
        <InputGroup label="상세 주소 (층/홀)">
          <input 
            type="text" 
            value={data.venueDetail}
            onChange={(e) => updateData({ venueDetail: e.target.value })}
            className="w-full p-2.5 text-sm bg-gray-50 border border-gray-200 rounded outline-none focus:border-rose-400"
          />
        </InputGroup>
      </Section>

      {/* Accounts */}
      <Section id="account" icon={CreditCard} title="마음 전하실 곳">
         <div className="space-y-4">
           <div className="p-4 bg-blue-50/50 rounded-lg border border-blue-100">
             <h4 className="text-[13px] font-bold text-blue-800 mb-2">신랑측 계좌</h4>
             <div className="grid grid-cols-2 gap-2">
                <input type="text" placeholder="은행명" value={data.groom.bank} onChange={(e) => updatePerson('groom', 'bank', e.target.value)} className="p-2 text-sm border border-blue-200 rounded" />
                <input type="text" placeholder="예금주" value={data.groom.accountHolder} onChange={(e) => updatePerson('groom', 'accountHolder', e.target.value)} className="p-2 text-sm border border-blue-200 rounded" />
                <input type="text" placeholder="계좌번호" value={data.groom.account} onChange={(e) => updatePerson('groom', 'account', e.target.value)} className="col-span-2 p-2 text-sm border border-blue-200 rounded" />
             </div>
           </div>

           <div className="p-4 bg-rose-50/50 rounded-lg border border-rose-100">
             <h4 className="text-[13px] font-bold text-rose-800 mb-2">신부측 계좌</h4>
             <div className="grid grid-cols-2 gap-2">
                <input type="text" placeholder="은행명" value={data.bride.bank} onChange={(e) => updatePerson('bride', 'bank', e.target.value)} className="p-2 text-sm border border-rose-200 rounded" />
                <input type="text" placeholder="예금주" value={data.bride.accountHolder} onChange={(e) => updatePerson('bride', 'accountHolder', e.target.value)} className="p-2 text-sm border border-rose-200 rounded" />
                <input type="text" placeholder="계좌번호" value={data.bride.account} onChange={(e) => updatePerson('bride', 'account', e.target.value)} className="col-span-2 p-2 text-sm border border-rose-200 rounded" />
             </div>
           </div>
         </div>
      </Section>
      
      {/* Spacer for bottom */}
      <div className="h-10"></div>
    </div>
  );
}
