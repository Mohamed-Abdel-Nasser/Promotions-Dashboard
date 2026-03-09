'use client';

import React, { useState } from 'react';
import { Info, Check, ChevronDown, ChevronUp, ChevronLeft } from 'lucide-react';
import Link from 'next/link';
import { DateRangePicker } from '@/components/date-range-picker';

const RATE_PLANS = [
  'Standard Rate',
  'Non-refundable Rate',
  'Weekly rate',
  'Monthly rate',
  'Test',
  'Mohamed Nasser',
  'Mo Nasser2',
  'Fully flexible'
];

const ROOM_TYPES = [
  'غرفة ثلاثية',
  'غرفة توأم',
  'غرفة مزدوجة',
  'Mo Nasser',
  'غرفة رباعية'
];

const AccordionSection = ({ 
  title, 
  description, 
  children, 
  defaultExpanded = false 
}: { 
  title: string, 
  description?: string, 
  children: React.ReactNode, 
  defaultExpanded?: boolean 
}) => {
  const [isExpanded, setIsExpanded] = useState(defaultExpanded);

  return (
    <div className="bg-white border border-gray-200 rounded-sm shadow-sm overflow-hidden">
      <button 
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full text-right p-6 flex justify-between items-center hover:bg-gray-50 transition-colors"
      >
        <div>
          <h2 className="text-xl font-bold text-gray-900">{title}</h2>
          {description && <p className="text-sm text-gray-700 mt-1">{description}</p>}
        </div>
        {isExpanded ? <ChevronUp className="w-5 h-5 text-gray-500 shrink-0 mr-4" /> : <ChevronDown className="w-5 h-5 text-gray-500 shrink-0 mr-4" />}
      </button>
      {isExpanded && (
        <div className="p-6 pt-0">
          {children}
        </div>
      )}
    </div>
  );
};

export default function AddPromotionPage() {
  const [promotionType, setPromotionType] = useState('basic');
  const [earlyBookerDays, setEarlyBookerDays] = useState('1');
  const [lastMinuteType, setLastMinuteType] = useState('days');
  const [lastMinuteDays, setLastMinuteDays] = useState('1');
  const [lastMinuteHours, setLastMinuteHours] = useState('8');

  const [audience, setAudience] = useState('all');
  const [discount, setDiscount] = useState('10');
  const [discountError, setDiscountError] = useState('');
  
  const [dateMode, setDateMode] = useState('range');
  const [startDate, setStartDate] = useState('2026-03-07');
  const [endDate, setEndDate] = useState('2026-06-07');
  const [stayStartDate, setStayStartDate] = useState<Date | null>(new Date(2026, 2, 8));
  const [stayEndDate, setStayEndDate] = useState<Date | null>(new Date(2026, 5, 8));
  
  const formatDate = (dateString: string) => {
    if (!dateString) return '';
    try {
      const date = new Date(dateString);
      if (isNaN(date.getTime())) return dateString;
      return date.toLocaleDateString('ar-EG', { day: 'numeric', month: 'long', year: 'numeric' });
    } catch (e) {
      return dateString;
    }
  };

  const [days, setDays] = useState({
    monday: true,
    tuesday: true,
    wednesday: true,
    thursday: true,
    friday: true,
    saturday: true,
    sunday: true,
  });

  const [promoName, setPromoName] = useState('Basic Deal');

  const [ratePlansMode, setRatePlansMode] = useState('specific');
  const [selectedRatePlans, setSelectedRatePlans] = useState<string[]>([]);
  
  const [roomsMode, setRoomsMode] = useState('specific');
  const [selectedRooms, setSelectedRooms] = useState<string[]>([]);

  const [minStayMode, setMinStayMode] = useState('custom');
  const [minStayDays, setMinStayDays] = useState('1');

  const [bookableDatesMode, setBookableDatesMode] = useState('all');
  const [bookableStartDate, setBookableStartDate] = useState<Date | null>(new Date(2026, 2, 8));
  const [bookableEndDate, setBookableEndDate] = useState<Date | null>(new Date(2026, 5, 8));

  const formatBookableDate = (date: Date | null) => {
    if (!date) return '';
    const MONTH_NAMES = [
      'يناير', 'فبراير', 'مارس', 'أبريل', 'مايو', 'يونيو',
      'يوليو', 'أغسطس', 'سبتمبر', 'أكتوبر', 'نوفمبر', 'ديسمبر'
    ];
    return `${date.getDate()} ${MONTH_NAMES[date.getMonth()]} ${date.getFullYear()}`;
  };
  
  const [bookableTimesMode, setBookableTimesMode] = useState('yes');
  const [startTime, setStartTime] = useState('00:00');
  const [endTime, setEndTime] = useState('23:00');

  const handleDiscountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setDiscount(val);
    const num = parseInt(val, 10);
    if (!val) {
      setDiscountError('لا يمكن أن يكون فارغاً.');
    } else if (isNaN(num) || num < 1 || num > 99) {
      setDiscountError('يجب أن يكون بين 1 و 99.');
    } else {
      setDiscountError('');
    }
  };

  const toggleDay = (day: keyof typeof days) => {
    setDays(prev => ({ ...prev, [day]: !prev[day] }));
  };

  const toggleRatePlan = (plan: string) => {
    setSelectedRatePlans(prev => 
      prev.includes(plan) ? prev.filter(p => p !== plan) : [...prev, plan]
    );
  };

  const toggleRoom = (room: string) => {
    setSelectedRooms(prev => 
      prev.includes(room) ? prev.filter(r => r !== room) : [...prev, room]
    );
  };

  // Custom Checkbox Component to match the design
  const CustomCheckbox = ({ checked, onChange, label, disabled = false }: { checked: boolean, onChange: () => void, label: string, disabled?: boolean }) => (
    <label className={`flex items-center gap-3 ${disabled ? 'cursor-not-allowed opacity-50' : 'cursor-pointer'}`}>
      <div className={`w-5 h-5 rounded-sm border flex items-center justify-center transition-colors
        ${checked ? 'bg-blue-600 border-blue-600' : 'bg-white border-gray-300'}
        ${disabled && !checked ? 'bg-gray-100' : ''}
      `}>
        {checked && <Check className="w-3.5 h-3.5 text-white" strokeWidth={3} />}
      </div>
      <span className="text-sm text-gray-900" dir="ltr">{label}</span>
      {/* Hidden native input for accessibility */}
      <input type="checkbox" className="hidden" checked={checked} onChange={onChange} disabled={disabled} />
    </label>
  );

  const pageTitle = promotionType === 'holiday' ? 'أضف عرض العطلة 2026' : 'أنشئ عرضاً ترويجيا جديدا';
  const pageDescription = promotionType === 'holiday' 
    ? 'لدى هذا العرض بعض العناصر المحددة مسبقاً - مراجعة وتخصيص البقية' 
    : 'خصص هذا العرض الترويجي ليتناسب مع احتياجاتك. اختر التواريخ ونسبة الخصم والضيوف المؤهلين وغيرها من التفاصيل الخاصة بك.';

  return (
    <div className="min-h-screen bg-[#f7f9fa] text-gray-900 pb-24">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">{pageTitle}</h1>
          <p className="text-gray-600">{pageDescription}</p>
        </div>

        <div className="mb-6 bg-white border border-gray-200 rounded-sm p-6 shadow-sm">
          <h2 className="text-lg font-bold text-gray-900 mb-4">نوع العرض</h2>
          <select 
            value={promotionType}
            onChange={(e) => setPromotionType(e.target.value)}
            className="w-full border border-gray-300 rounded-sm px-3 py-2 focus:outline-none focus:ring-1 focus:ring-blue-500"
          >
            <option value="basic">العرض الأساسي</option>
            <option value="early_booker">عرض الحجز المبكر</option>
            <option value="last_minute">عرض اللحظة الأخيرة</option>
            <option value="holiday">عرض العطلة</option>
          </select>
        </div>

        <div className="space-y-6">
          {/* Promotion Name */}
          <AccordionSection 
            title="اسم العرض الترويجي" 
            description="هذا الاسم لاستخدامك الشخصي فقط. لن نعرضه للضيوف على Booking.com."
            defaultExpanded={true}
          >
            <input 
              type="text" 
              value={promoName}
              onChange={(e) => setPromoName(e.target.value)}
              className="w-full border border-gray-300 rounded-sm px-3 py-2 focus:outline-none focus:ring-1 focus:ring-blue-500 text-left"
              dir="ltr"
            />
          </AccordionSection>

          {/* Audience Targeting */}
          {['basic', 'early_booker', 'last_minute'].includes(promotionType) && (
            <AccordionSection 
              title="الجمهور المستهدف" 
              description="من سيتمكن من رؤية هذا العرض الترويجي؟"
              defaultExpanded={true}
            >
              <div className="space-y-3">
                <label className="flex items-center gap-3 cursor-pointer">
                  <input 
                    type="radio" 
                    name="audience" 
                    value="all" 
                    checked={audience === 'all'} 
                    onChange={() => setAudience('all')}
                    className="w-5 h-5 text-blue-600 focus:ring-blue-500 border-gray-300"
                  />
                  <span className="text-gray-900">الجميع</span>
                </label>
                <label className="flex items-center gap-3 cursor-pointer">
                  <input 
                    type="radio" 
                    name="audience" 
                    value="members" 
                    checked={audience === 'members'} 
                    onChange={() => setAudience('members')}
                    className="w-5 h-5 text-blue-600 focus:ring-blue-500 border-gray-300"
                  />
                  <span className="text-gray-900 flex items-center gap-2">
                    الأعضاء والمشتركون بالنشرة الإخبارية فقط - عرض سرّي
                    <Info className="w-4 h-4 text-gray-400" />
                  </span>
                </label>
              </div>
            </AccordionSection>
          )}

          {/* Booking Lead Time (Early Booker) */}
          {promotionType === 'early_booker' && (
            <AccordionSection 
              title="فترة إجراء الحجز" 
              description="كم من الوقت قبل تسجيل الوصول يمكن حجز هذا العرض الترويجي؟"
              defaultExpanded={true}
            >
              <div className="flex items-center gap-4">
                <span className="text-sm text-gray-700">عدد الأيام قبل تسجيل الوصول:</span>
                <input 
                  type="number" 
                  value={earlyBookerDays}
                  onChange={(e) => setEarlyBookerDays(e.target.value)}
                  min="1"
                  max="500"
                  placeholder="حدد رقماً بين 1 و 500"
                  className="w-48 border border-gray-300 rounded-sm px-3 py-2 focus:outline-none focus:ring-1 focus:ring-blue-500 text-left"
                  dir="ltr"
                />
              </div>
            </AccordionSection>
          )}

          {/* Booking Window (Last Minute) */}
          {promotionType === 'last_minute' && (
            <AccordionSection 
              title="فترة إجراء الحجز" 
              description="كم من الوقت قبل تسجيل الوصول يمكن حجز هذا العرض الترويجي؟"
              defaultExpanded={true}
            >
              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <label className="flex items-center gap-3 cursor-pointer min-w-[350px]">
                    <input 
                      type="radio" 
                      name="lastMinuteType" 
                      value="days" 
                      checked={lastMinuteType === 'days'} 
                      onChange={() => setLastMinuteType('days')}
                      className="w-5 h-5 text-blue-600 focus:ring-blue-500 border-gray-300"
                    />
                    <span className="text-gray-900">أيام (الحد الأقصى لعدد الأيام قبل تسجيل الوصول)</span>
                  </label>
                  <input 
                    type="number" 
                    value={lastMinuteDays}
                    onChange={(e) => setLastMinuteDays(e.target.value)}
                    disabled={lastMinuteType !== 'days'}
                    min="1"
                    max="1000"
                    className="w-24 border border-gray-300 rounded-sm px-3 py-2 focus:outline-none focus:ring-1 focus:ring-blue-500 text-left disabled:bg-gray-100 disabled:text-gray-400"
                    dir="ltr"
                  />
                </div>
                <div className="flex items-center gap-4">
                  <label className="flex items-center gap-3 cursor-pointer min-w-[350px]">
                    <input 
                      type="radio" 
                      name="lastMinuteType" 
                      value="hours" 
                      checked={lastMinuteType === 'hours'} 
                      onChange={() => setLastMinuteType('hours')}
                      className="w-5 h-5 text-blue-600 focus:ring-blue-500 border-gray-300"
                    />
                    <span className="text-gray-900">ساعات (الحد الأقصى لعدد الساعات قبل تسجيل الوصول)</span>
                  </label>
                  <input 
                    type="number" 
                    value={lastMinuteHours}
                    onChange={(e) => setLastMinuteHours(e.target.value)}
                    disabled={lastMinuteType !== 'hours'}
                    min="1"
                    max="24"
                    className="w-24 border border-gray-300 rounded-sm px-3 py-2 focus:outline-none focus:ring-1 focus:ring-blue-500 text-left disabled:bg-gray-100 disabled:text-gray-400"
                    dir="ltr"
                  />
                </div>
              </div>
            </AccordionSection>
          )}

          {/* Booking Window Predefined (Holiday) */}
          {promotionType === 'holiday' && (
            <AccordionSection 
              title="تواريخ الحجز" 
              defaultExpanded={true}
            >
              <div className="bg-gray-50 border border-gray-200 rounded-sm p-4">
                <p className="text-sm text-gray-700 mb-1">تواريخ الحجز:</p>
                <p className="text-sm font-bold text-gray-900">من 12 مارس 2026 إلى 30 سبتمبر 2026</p>
                <p className="text-xs text-gray-500 mt-2">تم تحديدها مسبقاً بواسطة النظام. لا يمكن تعديلها في هذه الصفحة.</p>
              </div>
            </AccordionSection>
          )}

          {/* Discount Section */}
          {['basic', 'holiday', 'last_minute', 'early_booker'].includes(promotionType) && (
            <AccordionSection 
              title="ما مقدار الخصم الذي ترغب في تقديمه؟" 
              description="يرجى إعداد عرض بين 1% و99%"
              defaultExpanded={true}
            >
            <div className="flex items-start gap-4">
              <div className="relative w-32">
                <input 
                  type="number" 
                  value={discount}
                  onChange={handleDiscountChange}
                  className={`w-full border ${discountError ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-blue-500'} rounded-sm px-3 py-2 text-left focus:outline-none focus:ring-1`}
                  dir="ltr"
                />
                <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                  <span className="text-gray-500">%</span>
                </div>
              </div>
            </div>
            {discountError && <p className="text-red-500 text-sm mt-2">{discountError}</p>}
          </AccordionSection>
          )}

          {/* Stay Dates */}
          {['basic', 'early_booker', 'last_minute'].includes(promotionType) && (
            <AccordionSection 
              title="تواريخ الإقامة" 
              description="متى يستطيع الضيوف الإقامة عند استخدام هذا العرض الترويجي؟"
              defaultExpanded={true}
            >
            <div className="flex gap-2 mb-6">
              <button 
                onClick={() => setDateMode('range')}
                className={`px-4 py-2 text-sm font-medium rounded-sm border transition-colors ${dateMode === 'range' ? 'bg-blue-600 text-white border-blue-600' : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'}`}
              >
                حدد نطاق تواريخ
              </button>
              <button 
                onClick={() => setDateMode('specific')}
                className={`px-4 py-2 text-sm font-medium rounded-sm border transition-colors ${dateMode === 'specific' ? 'bg-blue-600 text-white border-blue-600' : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'}`}
              >
                فترة محددة
              </button>
            </div>

            {dateMode === 'range' && (
              <div className="space-y-4 mb-6 max-w-md">
                <div className="flex items-center gap-4">
                  <span className="w-16 text-sm text-gray-700">يبدأ من:</span>
                  <input type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} className="flex-1 border border-gray-300 rounded-sm px-3 py-2 focus:outline-none focus:ring-1 focus:ring-blue-500" />
                </div>
                <div className="flex items-center gap-4">
                  <span className="w-16 text-sm text-gray-700">ينتهي في:</span>
                  <input type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} className="flex-1 border border-gray-300 rounded-sm px-3 py-2 focus:outline-none focus:ring-1 focus:ring-blue-500" />
                </div>
              </div>
            )}

            {dateMode === 'specific' && (
              <DateRangePicker 
                startDate={stayStartDate}
                endDate={stayEndDate}
                onChange={(start, end) => {
                  setStayStartDate(start);
                  setStayEndDate(end);
                }}
              />
            )}

            <p className="text-sm font-bold text-gray-900 mb-3">أي يوم / أيام الأسبوع تود شملها في هذا العرض الترويجي؟</p>
            <p className="text-sm text-gray-600 mb-4">أزل العلامة من مربع اليوم الذي تود إزالته من تقويم هذا العرض الترويجي</p>
            
            <div className="flex flex-wrap gap-4 mb-6">
              {[
                { id: 'monday', label: 'الاثنين' },
                { id: 'tuesday', label: 'الثلاثاء' },
                { id: 'wednesday', label: 'الأربعاء' },
                { id: 'thursday', label: 'الخميس' },
                { id: 'friday', label: 'الجمعة' },
                { id: 'saturday', label: 'السبت' },
                { id: 'sunday', label: 'الأحد' },
              ].map((day) => (
                <CustomCheckbox 
                  key={day.id}
                  checked={days[day.id as keyof typeof days]}
                  onChange={() => toggleDay(day.id as keyof typeof days)}
                  label={day.label}
                />
              ))}
            </div>

            <div className="bg-gray-50 border border-gray-200 rounded-sm p-4 flex items-start gap-3">
              <Info className="w-5 h-5 text-gray-500 shrink-0 mt-0.5" />
              <div>
                <p className="text-sm font-bold text-gray-900 mb-1">سيُطبق خصمك على الإقامات الواقعة بين التواريخ التالية:</p>
                <p className="text-sm text-gray-700">
                  {dateMode === 'range' 
                    ? `${formatDate(startDate)} - ${formatDate(endDate)}`
                    : (stayStartDate && stayEndDate)
                      ? `${formatBookableDate(stayStartDate)} - ${formatBookableDate(stayEndDate)}`
                      : 'يرجى تحديد تاريخ البدء والانتهاء'}
                </p>
              </div>
            </div>
          </AccordionSection>
          )}



          {/* Rate Plans and Rooms */}
          <AccordionSection 
            title={promotionType === 'holiday' ? "تفاصيل العرض الترويجي" : "خطط الأسعار والغرف"} 
            defaultExpanded={false}
          >
            <div className="mb-8">
              <p className="text-sm font-bold text-gray-900 mb-3">أي خطط أسعار سيطبق عليها هذا العرض الترويجي؟</p>
              <div className="space-y-3 mb-4">
                <label className="flex items-center gap-3 cursor-pointer">
                  <input type="radio" name="ratePlansMode" value="all" checked={ratePlansMode === 'all'} onChange={() => setRatePlansMode('all')} className="w-5 h-5 text-blue-600 focus:ring-blue-500 border-gray-300" />
                  <span className="text-sm text-gray-900">جميع خطط الأسعار</span>
                </label>
                <label className="flex items-center gap-3 cursor-pointer">
                  <input type="radio" name="ratePlansMode" value="specific" checked={ratePlansMode === 'specific'} onChange={() => setRatePlansMode('specific')} className="w-5 h-5 text-blue-600 focus:ring-blue-500 border-gray-300" />
                  <span className="text-sm text-gray-900">خطط أسعار محددة</span>
                </label>
              </div>
              
              {ratePlansMode === 'specific' && (
                <div className="mr-8 space-y-3">
                  <p className="text-sm text-gray-600 mb-2">حدد خطة سعر واحدة على الأقل</p>
                  {RATE_PLANS.map(plan => (
                    <CustomCheckbox 
                      key={plan}
                      checked={selectedRatePlans.includes(plan)}
                      onChange={() => toggleRatePlan(plan)}
                      label={plan}
                    />
                  ))}
                </div>
              )}
            </div>

            {promotionType !== 'holiday' && (
              <div>
                <p className="text-sm font-bold text-gray-900 mb-3">أي غرف؟</p>
                <div className="space-y-3 mb-4">
                  <label className="flex items-center gap-3 cursor-pointer">
                    <input type="radio" name="roomsMode" value="all" checked={roomsMode === 'all'} onChange={() => setRoomsMode('all')} className="w-5 h-5 text-blue-600 focus:ring-blue-500 border-gray-300" />
                    <span className="text-sm text-gray-900">جميع الغرف في خطط الأسعار المحددة</span>
                  </label>
                  <label className="flex items-center gap-3 cursor-pointer">
                    <input type="radio" name="roomsMode" value="specific" checked={roomsMode === 'specific'} onChange={() => setRoomsMode('specific')} className="w-5 h-5 text-blue-600 focus:ring-blue-500 border-gray-300" />
                    <span className="text-sm text-gray-900">تحديد الغرف</span>
                  </label>
                </div>

                {roomsMode === 'specific' && (
                  <div className="mr-8 space-y-3">
                    <p className="text-sm text-gray-600 mb-2">حدد نوع واحد من الغرف على الأقل</p>
                    {ROOM_TYPES.map(room => (
                      <CustomCheckbox 
                        key={room}
                        checked={selectedRooms.includes(room)}
                        onChange={() => toggleRoom(room)}
                        label={room}
                      />
                    ))}
                  </div>
                )}
              </div>
            )}
            
            <div className="flex justify-end gap-3 mt-6 border-t border-gray-100 pt-4">
              <button className="px-4 py-2 text-sm font-medium text-blue-600 bg-white border border-blue-600 rounded-sm hover:bg-blue-50 transition-colors">إلغاء</button>
              <button className="px-4 py-2 text-sm font-medium text-gray-400 bg-gray-200 rounded-sm cursor-not-allowed">حفظ التغييرات</button>
            </div>
          </AccordionSection>

          {/* Length of Stay */}
          {promotionType !== 'holiday' && (
            <AccordionSection 
              title="مدة الإقامة" 
              defaultExpanded={false}
            >
              <div className="mb-6">
                <p className="text-sm font-bold text-gray-900 mb-3">ما هو الحد الأدنى لمدة الإقامة لهذا العرض الترويجي؟</p>
                <div className="space-y-3">
                  <label className="flex items-center gap-3 cursor-pointer">
                    <input type="radio" name="minStayMode" value="same" checked={minStayMode === 'same'} onChange={() => setMinStayMode('same')} className="w-5 h-5 text-blue-600 focus:ring-blue-500 border-gray-300" />
                    <span className="text-sm text-gray-900 flex items-center gap-2">
                      نفس إعدادات خطط الأسعار
                      <Info className="w-4 h-4 text-gray-400" />
                    </span>
                  </label>
                  <label className="flex items-center gap-3 cursor-pointer">
                    <input type="radio" name="minStayMode" value="custom" checked={minStayMode === 'custom'} onChange={() => setMinStayMode('custom')} className="w-5 h-5 text-blue-600 focus:ring-blue-500 border-gray-300" />
                    <span className="text-sm text-gray-900">إعداد حد أدنى لمدة الإقامة</span>
                  </label>
                </div>
              </div>

              {minStayMode === 'custom' && (
                <div className="mr-8">
                  <p className="text-sm text-gray-700 mb-2">حدد رقماً بين 1 و 30</p>
                  <div className="flex items-center gap-3">
                    <input 
                      type="number" 
                      value={minStayDays}
                      onChange={(e) => setMinStayDays(e.target.value)}
                      className="w-20 border border-gray-300 rounded-sm px-3 py-2 focus:outline-none focus:ring-1 focus:ring-blue-500 text-center"
                      min="1"
                      max="30"
                    />
                    <span className="text-sm text-gray-700">ليلة (الحد الأدنى لمدة الإقامة)</span>
                  </div>
                </div>
              )}
            </AccordionSection>
          )}

          {/* Bookable Dates */}
          {promotionType !== 'holiday' && (
            <AccordionSection 
              title="التواريخ القابلة للحجز" 
              description="متى يستطيع الضيوف حجز هذا العرض الترويجي؟"
              defaultExpanded={false}
            >
              <div className="flex gap-2 mb-6">
                <button 
                  onClick={() => setBookableDatesMode('all')}
                  className={`px-4 py-2 text-sm font-medium rounded-sm border transition-colors ${bookableDatesMode === 'all' ? 'bg-blue-600 text-white border-blue-600' : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'}`}
                >
                  جميع التواريخ
                </button>
                <button 
                  onClick={() => setBookableDatesMode('specific')}
                  className={`px-4 py-2 text-sm font-medium rounded-sm border transition-colors ${bookableDatesMode === 'specific' ? 'bg-blue-600 text-white border-blue-600' : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'}`}
                >
                  فترة محددة
                </button>
              </div>

              {bookableDatesMode === 'specific' && (
                <DateRangePicker 
                  startDate={bookableStartDate}
                  endDate={bookableEndDate}
                  onChange={(start, end) => {
                    setBookableStartDate(start);
                    setBookableEndDate(end);
                  }}
                />
              )}

              <div className="bg-gray-50 border border-gray-200 rounded-sm p-4 flex items-start gap-3">
                <Info className="w-5 h-5 text-gray-500 shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm font-bold text-gray-900 mb-1">سيُطبق خصمك على الحجوزات التي يتم إجراؤها بين التواريخ التالية:</p>
                  <p className="text-sm text-gray-700">
                    {bookableDatesMode === 'all' 
                      ? 'أي تواريخ' 
                      : (bookableStartDate && bookableEndDate) 
                        ? `${formatBookableDate(bookableStartDate)} - ${formatBookableDate(bookableEndDate)}`
                        : 'يرجى تحديد تاريخ البدء والانتهاء'}
                  </p>
                </div>
              </div>
            </AccordionSection>
          )}

          {/* Bookable Times */}
          {promotionType !== 'holiday' && (
            <AccordionSection 
              title="الأوقات القابلة للحجز" 
              description="هل تريد أن يتم إجراء الحجوزات فقط في أوقات معينة من اليوم؟"
              defaultExpanded={false}
            >
            <div className="space-y-3 mb-6">
              <label className="flex items-center gap-3 cursor-pointer">
                <input type="radio" name="bookableTimesMode" value="no" checked={bookableTimesMode === 'no'} onChange={() => setBookableTimesMode('no')} className="w-5 h-5 text-blue-600 focus:ring-blue-500 border-gray-300" />
                <span className="text-sm text-gray-900">لا</span>
              </label>
              <label className="flex items-center gap-3 cursor-pointer">
                <input type="radio" name="bookableTimesMode" value="yes" checked={bookableTimesMode === 'yes'} onChange={() => setBookableTimesMode('yes')} className="w-5 h-5 text-blue-600 focus:ring-blue-500 border-gray-300" />
                <span className="text-sm text-gray-900">نعم، أود السماح بإجراء الحجوزات خلال ساعات محددة</span>
              </label>
            </div>

            {bookableTimesMode === 'yes' && (
              <div className="mr-8 mb-6">
                <p className="text-sm text-gray-700 mb-3">سيتمكن المسافرون من حجز هذا العرض الترويجي فقط بين الساعات التالية بتوقيتك:</p>
                <div className="flex items-center gap-4">
                  <select 
                    value={startTime} 
                    onChange={(e) => setStartTime(e.target.value)}
                    className="border border-gray-300 rounded-sm px-3 py-2 focus:outline-none focus:ring-1 focus:ring-blue-500 bg-white"
                    dir="ltr"
                  >
                    {Array.from({ length: 24 }).map((_, i) => {
                      const time = `${i.toString().padStart(2, '0')}:00`;
                      return <option key={`start-${time}`} value={time}>{time}</option>;
                    })}
                  </select>
                  <span className="text-sm text-gray-700">حتى</span>
                  <select 
                    value={endTime} 
                    onChange={(e) => setEndTime(e.target.value)}
                    className="border border-gray-300 rounded-sm px-3 py-2 focus:outline-none focus:ring-1 focus:ring-blue-500 bg-white"
                    dir="ltr"
                  >
                    {Array.from({ length: 24 }).map((_, i) => {
                      const time = `${i.toString().padStart(2, '0')}:00`;
                      return <option key={`end-${time}`} value={time}>{time}</option>;
                    })}
                  </select>
                </div>
              </div>
            )}
            
            <div className="flex justify-end gap-3 mt-6 border-t border-gray-100 pt-4">
              <button className="px-4 py-2 text-sm font-medium text-blue-600 bg-white border border-blue-600 rounded-sm hover:bg-blue-50 transition-colors">إلغاء</button>
              <button className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-sm hover:bg-blue-700 transition-colors">حفظ التغييرات</button>
            </div>
            </AccordionSection>
          )}

        </div>
        
        {/* Action Buttons */}
        <div className="mt-8 flex justify-start gap-3">
          <Link href="/">
            <button className="px-6 py-2.5 text-sm font-medium text-blue-600 bg-white border border-blue-600 rounded-sm hover:bg-blue-50 transition-colors">العودة</button>
          </Link>
          <button className="px-6 py-2.5 text-sm font-medium text-gray-400 bg-gray-200 rounded-sm cursor-not-allowed">مراجعة</button>
        </div>
      </div>
    </div>
  );
}

