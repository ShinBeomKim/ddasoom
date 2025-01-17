import React, { useEffect } from 'react';

interface CalendarModalProps {
  year: number;
  month: number;
  onClose: () => void;
  onYearChange: (newYear: number) => void;
  onMonthSelect: (newMonth: number) => void;
}

export default function CalendarModal({ year, month, onClose, onYearChange, onMonthSelect }: CalendarModalProps) {
  const currentYear = new Date().getFullYear();
  const currentMonth = new Date().getMonth() + 1;

  useEffect(() => {
    // 모달이 열릴 때 body에 overflow:hidden 적용
    document.body.style.overflow = 'hidden';
    return () => {
      // 모달이 닫힐 때 원래 상태로 복구
      document.body.style.overflow = '';
    };
  }, []);

  const handlePreviousYear = () => onYearChange(year - 1);
  const handleNextYear = () => onYearChange(year + 1);

  const handleClickOutside = (event: React.MouseEvent<HTMLDivElement>) => {
    if ((event.target as HTMLDivElement).id === 'modal-overlay') {
      onClose();
    }
  };

  return (
    <div
      id="modal-overlay"
      className="fixed inset-0 bg-black bg-opacity-65 flex items-center justify-center z-50"
      onClick={handleClickOutside}>
      <div className="bg-gray1 p-4 py-8 rounded-2xl w-80 text-gray5">
        <div className="flex justify-between items-center mb-6 font-nanumExtraBold">
          <p className="text-2xl ml-2">{year}년</p>
          <div className="text-lg flex gap-4 text-main1">
            <button onClick={handlePreviousYear}>{'<'}</button>
            <button
              onClick={handleNextYear}
              disabled={year >= currentYear} // 미래 연도로 이동 비활성화
              className={`${year >= currentYear ? 'text-gray3 cursor-not-allowed' : ''}`}>
              {'>'}
            </button>
          </div>
        </div>
        <div className="grid grid-cols-4 gap-3">
          {Array.from({ length: 12 }, (_, i) => i + 1).map(m => {
            const isDisabled =
              (year === currentYear && m > currentMonth) || // 이번 년도에서 현재 월 이후의 월 비활성화
              year > currentYear; // 미래 년도 전체 비활성화

            return (
              <button
                key={m}
                className={`py-3 px-4 rounded-xl text-sm font-nanumBold ${
                  m === month && !isDisabled ? 'bg-main1 text-gray1' : 'bg-gray2 text-gray5'
                } ${isDisabled ? 'cursor-not-allowed opacity-50' : ''}`}
                onClick={() => {
                  if (!isDisabled) {
                    onMonthSelect(m);
                    onClose(); // 달 선택 시 모달 닫기
                  }
                }}
                disabled={isDisabled} // 버튼 비활성화
              >
                {m}월
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
