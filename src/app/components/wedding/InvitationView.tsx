import React from 'react';
import { isValid } from 'date-fns';
import { Phone, MessageCircle, Map, Heart, Share2, MapPin, Navigation } from 'lucide-react';
import { InvitationData } from '../../types/invitation';

export function InvitationView({ data }: { data: InvitationData }) {
  // Date and Time parsing
  const dateObj = new Date(data.weddingDate);
  const year = dateObj.getFullYear();
  const month = dateObj.getMonth() + 1;
  const date = dateObj.getDate();
  const days = ['일', '월', '화', '수', '목', '금', '토'];
  const day = isValid(dateObj) ? days[dateObj.getDay()] : '';
  const isValidDate = !isNaN(dateObj.getTime());

  const formattedDate = isValidDate ? `${year}.${String(month).padStart(2, '0')}.${String(date).padStart(2, '0')}` : '';
  const dateLabel = isValidDate ? `${year}년 ${month}월 ${date}일 ${day}요일` : '';

  let formattedTime = '';
  if (data.weddingTime) {
    let [hourStr, minStr] = data.weddingTime.split(':');
    let hour = parseInt(hourStr, 10);
    let ampm = "오전";
    if (hour >= 12) {
      ampm = "오후";
      if (hour > 12) hour -= 12;
    } else if (hour === 0) {
      hour = 12;
    }
    formattedTime = `${ampm} ${hour}시 ${minStr === '00' ? '' : minStr + '분'}`;
  }

  // Helper styles based on theme
  const themeMain = data.themeColor || '#d6cfc5';
  
  return (
    <div className="w-full flex flex-col pb-20 text-gray-800 bg-[#FAF9F7]" style={{ fontFamily: "'Nanum Myeongjo', 'Pretendard', serif" }}>
      
      {/* 1. Hero Cover */}
      <div className="relative w-full aspect-[3/4] overflow-hidden bg-gray-100">
        <img 
          src={data.mainPhoto} 
          alt="Main Wedding" 
          className="w-full h-full object-cover animate-in fade-in duration-700"
        />
        {/* Gradient Overlay for text readability */}
        <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black/60 to-transparent"></div>
        
        <div className="absolute bottom-8 left-0 w-full text-center text-white px-6">
          <p className="text-[15px] font-light tracking-widest mb-4 opacity-90">{formattedDate}</p>
          <div className="flex items-center justify-center gap-4 text-3xl font-serif tracking-widest mb-6">
            <span>{data.groom.name}</span>
            <span className="text-xl opacity-70">&</span>
            <span>{data.bride.name}</span>
          </div>
          <p className="text-[13px] opacity-80 font-light">{dateLabel} {formattedTime}</p>
          <p className="text-[13px] opacity-80 font-light mt-1">{data.venueName}</p>
        </div>
      </div>

      {/* 2. Greeting Message */}
      <div className="py-20 px-8 text-center bg-white flex flex-col items-center">
        <h2 className="text-lg font-serif mb-10 tracking-widest text-gray-900 flex flex-col items-center gap-4">
          <Heart className="w-5 h-5 fill-rose-400 stroke-none opacity-50" />
          {data.greetingTitle}
        </h2>
        
        <div className="text-[14px] leading-relaxed text-gray-600 font-light whitespace-pre-wrap mb-12">
          {data.greetingContent}
        </div>

        <div className="w-full max-w-[240px] mx-auto space-y-4">
          <div className="flex justify-between items-center text-[15px]">
            <span className="font-bold w-20 text-right">{data.groom.father} · {data.groom.mother}</span>
            <span className="text-gray-400 text-xs">의</span>
            <span className="w-12 text-center text-gray-500 text-sm">{data.groom.relation}</span>
            <span className="font-bold w-12 text-left">{data.groom.name}</span>
          </div>
          <div className="flex justify-between items-center text-[15px]">
            <span className="font-bold w-20 text-right">{data.bride.father} · {data.bride.mother}</span>
            <span className="text-gray-400 text-xs">의</span>
            <span className="w-12 text-center text-gray-500 text-sm">{data.bride.relation}</span>
            <span className="font-bold w-12 text-left">{data.bride.name}</span>
          </div>
        </div>

        {/* Contact Buttons */}
        <div className="flex gap-4 w-full justify-center mt-10 border-t border-gray-100 pt-8">
          <div className="flex flex-col items-center gap-2">
            <span className="text-xs text-gray-400">신랑에게 연락하기</span>
            <div className="flex gap-2">
              <button className="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center text-gray-600 hover:bg-blue-50 hover:text-blue-500 transition-colors">
                <Phone className="w-4 h-4" />
              </button>
              <button className="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center text-gray-600 hover:bg-blue-50 hover:text-blue-500 transition-colors">
                <MessageCircle className="w-4 h-4" />
              </button>
            </div>
          </div>
          <div className="w-[1px] bg-gray-100 h-16 mx-2"></div>
          <div className="flex flex-col items-center gap-2">
            <span className="text-xs text-gray-400">신부에게 연락하기</span>
            <div className="flex gap-2">
              <button className="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center text-gray-600 hover:bg-rose-50 hover:text-rose-500 transition-colors">
                <Phone className="w-4 h-4" />
              </button>
              <button className="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center text-gray-600 hover:bg-rose-50 hover:text-rose-500 transition-colors">
                <MessageCircle className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* 3. Calendar */}
      <div className="py-16 px-8 bg-[#FAF9F7] text-center">
        <h3 className="text-[13px] tracking-[0.2em] font-bold text-gray-900 mb-8 uppercase" style={{ color: themeMain }}>Date</h3>
        <p className="text-lg mb-8 text-gray-800">{dateLabel} {formattedTime}</p>
        
        {/* Simple mock calendar visual */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100/50 max-w-[280px] mx-auto">
          <div className="grid grid-cols-7 gap-2 text-xs mb-3 text-gray-400 pb-2 border-b border-gray-100">
            <span className="text-rose-400">일</span><span>월</span><span>화</span><span>수</span><span>목</span><span>금</span><span>토</span>
          </div>
          <div className="grid grid-cols-7 gap-y-4 text-sm font-light text-gray-600">
            {/* Mock layout: putting 23rd on Saturday arbitrarily for display if date matches */}
            <span className="text-gray-300">26</span><span className="text-gray-300">27</span><span className="text-gray-300">28</span><span className="text-gray-300">29</span><span className="text-gray-300">30</span><span className="text-gray-300">1</span><span>2</span>
            <span className="text-rose-400">3</span><span>4</span><span>5</span><span>6</span><span>7</span><span>8</span><span>9</span>
            <span className="text-rose-400">10</span><span>11</span><span>12</span><span>13</span><span>14</span><span>15</span><span>16</span>
            <span className="text-rose-400">17</span><span>18</span><span>19</span><span>20</span><span>21</span><span>22</span>
            <span className="w-6 h-6 rounded-full flex items-center justify-center mx-auto text-white" style={{ backgroundColor: themeMain }}>23</span>
            <span className="text-rose-400">24</span><span>25</span><span>26</span><span>27</span><span>28</span><span>29</span><span>30</span>
            <span className="text-rose-400">31</span>
          </div>
        </div>
      </div>

      {/* 4. Gallery Preview (Simple Grid) */}
      <div className="py-16 px-6 bg-white">
        <h3 className="text-[13px] tracking-[0.2em] font-bold text-gray-900 mb-8 uppercase text-center" style={{ color: themeMain }}>Gallery</h3>
        <div className="grid grid-cols-2 gap-2">
          {data.gallery.map((img, i) => (
            <div key={i} className={`relative overflow-hidden ${i === 0 ? 'col-span-2 aspect-video' : 'aspect-square'}`}>
              <img src={img} alt={`Gallery ${i+1}`} className="w-full h-full object-cover bg-gray-100" />
            </div>
          ))}
        </div>
      </div>

      {/* 5. Location */}
      <div className="py-16 px-8 bg-[#FAF9F7] flex flex-col items-center">
        <h3 className="text-[13px] tracking-[0.2em] font-bold text-gray-900 mb-8 uppercase" style={{ color: themeMain }}>Location</h3>
        <h4 className="text-lg font-medium text-gray-800 mb-2">{data.venueName}</h4>
        <p className="text-sm text-gray-500 mb-1">{data.venueAddress}</p>
        <p className="text-sm text-gray-500 mb-6">{data.venueDetail}</p>
        
        {/* Mock Map View */}
        <div className="w-full aspect-video bg-gray-200 rounded-lg relative overflow-hidden flex items-center justify-center border border-gray-300/50">
           <div className="absolute inset-0 bg-[url('https://maps.googleapis.com/maps/api/staticmap?center=Seoul&zoom=15&size=600x300&maptype=roadmap&style=feature:all|element:labels.text.fill|color:0x9c9c9c&style=feature:landscape|color:0xf5f5f5&style=feature:poi|color:0xdcdcdc&style=feature:road.highway|color:0xffffff&style=feature:road.arterial|color:0xffffff&style=feature:road.local|color:0xffffff&style=feature:water|color:0xc9c9c9')] bg-cover bg-center opacity-60 mix-blend-multiply"></div>
           <MapPin className="w-8 h-8 text-rose-500 absolute z-10 drop-shadow-md" />
           <span className="absolute text-[10px] text-gray-400 bottom-2 right-2 z-10 bg-white/80 px-1">지도 API 연결 필요</span>
        </div>

        <div className="flex gap-2 w-full mt-4">
          <button className="flex-1 py-3 bg-white border border-gray-200 rounded-md text-[13px] text-gray-600 font-medium flex justify-center items-center gap-1 hover:bg-gray-50">
             <Navigation className="w-4 h-4" /> 네이버지도
          </button>
          <button className="flex-1 py-3 bg-white border border-gray-200 rounded-md text-[13px] text-gray-600 font-medium flex justify-center items-center gap-1 hover:bg-gray-50">
             <Map className="w-4 h-4" /> 카카오맵
          </button>
        </div>
      </div>

      {/* 6. Gift Accounts */}
      <div className="py-16 px-6 bg-white text-center">
        <h3 className="text-[13px] tracking-[0.2em] font-bold text-gray-900 mb-8 uppercase" style={{ color: themeMain }}>마음 전하실 곳</h3>
        <p className="text-sm text-gray-500 font-light mb-8">
          참석이 어려우신 분들을 위해<br/>계좌번호를 기재하였습니다.<br/>너른 양해 부탁드립니다.
        </p>

        <div className="space-y-3">
          {/* Groom Account Expandable */}
          <details className="group bg-gray-50 rounded-lg border border-gray-100 overflow-hidden text-left">
            <summary className="flex items-center justify-between p-4 cursor-pointer font-medium text-[15px] text-gray-700 list-none">
              <span>신랑측 계좌번호</span>
              <span className="text-xl text-gray-400 group-open:rotate-180 transition-transform">+</span>
            </summary>
            <div className="px-4 pb-4 pt-1 border-t border-gray-100 bg-white">
              <div className="flex justify-between items-center mb-1">
                <span className="text-[13px] text-gray-500">{data.groom.bank} (예금주: {data.groom.accountHolder})</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-base font-medium tracking-wide text-gray-800">{data.groom.account}</span>
                <button className="px-3 py-1 bg-gray-100 text-[11px] text-gray-600 rounded hover:bg-gray-200">복사</button>
              </div>
            </div>
          </details>

          {/* Bride Account Expandable */}
          <details className="group bg-gray-50 rounded-lg border border-gray-100 overflow-hidden text-left">
            <summary className="flex items-center justify-between p-4 cursor-pointer font-medium text-[15px] text-gray-700 list-none">
              <span>신부측 계좌번호</span>
              <span className="text-xl text-gray-400 group-open:rotate-180 transition-transform">+</span>
            </summary>
            <div className="px-4 pb-4 pt-1 border-t border-gray-100 bg-white">
              <div className="flex justify-between items-center mb-1">
                <span className="text-[13px] text-gray-500">{data.bride.bank} (예금주: {data.bride.accountHolder})</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-base font-medium tracking-wide text-gray-800">{data.bride.account}</span>
                <button className="px-3 py-1 bg-gray-100 text-[11px] text-gray-600 rounded hover:bg-gray-200">복사</button>
              </div>
            </div>
          </details>
        </div>
      </div>

      {/* Share Footer */}
      <div className="py-8 bg-[#FAF9F7] flex justify-center">
        <button className="flex items-center gap-2 px-6 py-3 bg-gray-900 text-white rounded-full text-sm font-medium shadow-lg shadow-gray-300">
           <Share2 className="w-4 h-4" />
           카카오톡으로 공유하기
        </button>
      </div>
      
    </div>
  );
}
