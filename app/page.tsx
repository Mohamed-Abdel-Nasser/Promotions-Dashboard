'use client';

import React, { useState, useMemo, useEffect, useRef } from 'react';
import { Search, ChevronDown, MoreVertical, Gift, CalendarDays, Tag, Clock, Zap, Plus, Filter, Layers, Star, X, ChevronLeft, Check } from 'lucide-react';
import Link from 'next/link';

type Promotion = {
  id: string;
  icon: React.ElementType;
  title: string;
  subtitle: string;
  discount: string;
  bookingPeriod: string;
  stayPeriod: string;
  bookings: number | string;
  roomNights: number | string;
  adr: string;
  revenue: string;
};

const allPromotions: Promotion[] = [
  {
    id: 'h1',
    icon: Gift,
    title: 'عرض العطلة',
    subtitle: '20% - عرض العطلة المبكر',
    discount: '20%',
    bookingPeriod: '12 مارس 2026 - 30 سبتمبر 2026',
    stayPeriod: '26 مارس 2026 - 30 سبتمبر 2026',
    bookings: 15,
    roomNights: 42,
    adr: 'SAR 350.00',
    revenue: 'SAR 14,700.00',
  },
  {
    id: 'h2',
    icon: Gift,
    title: 'عرض العطلة',
    subtitle: '25% - عرض العطلة الخاص',
    discount: '25%',
    bookingPeriod: '12 مارس 2026 - 30 سبتمبر 2026',
    stayPeriod: '26 مارس 2026 - 30 سبتمبر 2026',
    bookings: 8,
    roomNights: 24,
    adr: 'SAR 320.00',
    revenue: 'SAR 7,680.00',
  },
  {
    id: 'w1',
    icon: CalendarDays,
    title: 'عرض أهلاً 2026',
    subtitle: '20% - عرض أهلاً 2026',
    discount: '20%',
    bookingPeriod: '6 ديسمبر 2025 - 1 أبريل 2026',
    stayPeriod: '1 يناير 2026 - 1 أبريل 2026',
    bookings: 32,
    roomNights: 96,
    adr: 'SAR 410.00',
    revenue: 'SAR 39,360.00',
  },
  {
    id: 'b1',
    icon: Tag,
    title: 'عرض أساسي',
    subtitle: '10% - عرض أساسي - 14 يناير 2025',
    discount: '10%',
    bookingPeriod: '14 يناير 2025 - 14 أبريل 2025',
    stayPeriod: '14 يناير 2025 - 13 أبريل 2025',
    bookings: 3124,
    roomNights: 6901,
    adr: 'SAR 30.59',
    revenue: 'SAR 211,112.38',
  },
  {
    id: 'b2',
    icon: Tag,
    title: 'عرض أساسي',
    subtitle: '15% - عرض الصيف',
    discount: '15%',
    bookingPeriod: '1 يونيو 2025 - 31 أغسطس 2025',
    stayPeriod: '1 يونيو 2025 - 31 أغسطس 2025',
    bookings: 850,
    roomNights: 2100,
    adr: 'SAR 45.00',
    revenue: 'SAR 94,500.00',
  },
  {
    id: 'lm1',
    icon: Clock,
    title: 'عرض اللحظة الأخيرة',
    subtitle: '15% - اللحظة الأخيرة (يوم واحد)',
    discount: '15%',
    bookingPeriod: 'مستمر',
    stayPeriod: 'مستمر',
    bookings: 145,
    roomNights: 210,
    adr: 'SAR 280.00',
    revenue: 'SAR 58,800.00',
  },
  {
    id: 'eb1',
    icon: Zap,
    title: 'عرض الحجز المبكر',
    subtitle: '12% - حجز مبكر (30 يوم)',
    discount: '12%',
    bookingPeriod: 'مستمر',
    stayPeriod: 'مستمر',
    bookings: 420,
    roomNights: 1250,
    adr: 'SAR 310.00',
    revenue: 'SAR 387,500.00',
  },
  {
    id: 'w2',
    icon: CalendarDays,
    title: 'عرض الشتاء',
    subtitle: '30% - خصم الشتاء الدافئ',
    discount: '30%',
    bookingPeriod: '1 نوفمبر 2025 - 28 فبراير 2026',
    stayPeriod: '15 نوفمبر 2025 - 15 مارس 2026',
    bookings: 120,
    roomNights: 350,
    adr: 'SAR 380.00',
    revenue: 'SAR 133,000.00',
  },
  {
    id: 'b3',
    icon: Tag,
    title: 'عرض أساسي',
    subtitle: '5% - خصم الأعضاء',
    discount: '5%',
    bookingPeriod: 'مستمر',
    stayPeriod: 'مستمر',
    bookings: 5400,
    roomNights: 12000,
    adr: 'SAR 400.00',
    revenue: 'SAR 4,800,000.00',
  },
  {
    id: 'h3',
    icon: Gift,
    title: 'عرض العطلة',
    subtitle: '15% - عطلة نهاية الأسبوع',
    discount: '15%',
    bookingPeriod: 'مستمر',
    stayPeriod: 'الخميس - السبت',
    bookings: 890,
    roomNights: 1780,
    adr: 'SAR 450.00',
    revenue: 'SAR 801,000.00',
  },
  {
    id: 'lm2',
    icon: Clock,
    title: 'عرض اللحظة الأخيرة',
    subtitle: '25% - حجز نفس اليوم',
    discount: '25%',
    bookingPeriod: 'مستمر',
    stayPeriod: 'مستمر',
    bookings: 320,
    roomNights: 320,
    adr: 'SAR 250.00',
    revenue: 'SAR 80,000.00',
  },
  {
    id: 'eb2',
    icon: Zap,
    title: 'عرض الحجز المبكر',
    subtitle: '18% - حجز مبكر (60 يوم)',
    discount: '18%',
    bookingPeriod: 'مستمر',
    stayPeriod: 'مستمر',
    bookings: 210,
    roomNights: 840,
    adr: 'SAR 290.00',
    revenue: 'SAR 243,600.00',
  },
  {
    id: 'w3',
    icon: CalendarDays,
    title: 'عرض الربيع',
    subtitle: '20% - إجازة الربيع',
    discount: '20%',
    bookingPeriod: '1 فبراير 2026 - 30 أبريل 2026',
    stayPeriod: '1 مارس 2026 - 31 مايو 2026',
    bookings: 45,
    roomNights: 180,
    adr: 'SAR 420.00',
    revenue: 'SAR 75,600.00',
  },
  {
    id: 'b4',
    icon: Tag,
    title: 'عرض أساسي',
    subtitle: 'الإقامة الطويلة (7+ ليالي)',
    discount: '20%',
    bookingPeriod: 'مستمر',
    stayPeriod: 'مستمر',
    bookings: 150,
    roomNights: 1200,
    adr: 'SAR 300.00',
    revenue: 'SAR 360,000.00',
  },
  {
    id: 'h4',
    icon: Gift,
    title: 'عرض العطلة',
    subtitle: 'عرض العيد الوطني',
    discount: '30%',
    bookingPeriod: '1 سبتمبر 2025 - 23 سبتمبر 2025',
    stayPeriod: '20 سبتمبر 2025 - 25 سبتمبر 2025',
    bookings: 500,
    roomNights: 1500,
    adr: 'SAR 500.00',
    revenue: 'SAR 750,000.00',
  },
  {
    id: 'lm3',
    icon: Clock,
    title: 'عرض اللحظة الأخيرة',
    subtitle: '10% - حجز خلال 3 أيام',
    discount: '10%',
    bookingPeriod: 'مستمر',
    stayPeriod: 'مستمر',
    bookings: 600,
    roomNights: 1200,
    adr: 'SAR 350.00',
    revenue: 'SAR 420,000.00',
  },
  {
    id: 'eb3',
    icon: Zap,
    title: 'عرض الحجز المبكر',
    subtitle: '25% - حجز مبكر (90 يوم)',
    discount: '25%',
    bookingPeriod: 'مستمر',
    stayPeriod: 'مستمر',
    bookings: 85,
    roomNights: 425,
    adr: 'SAR 270.00',
    revenue: 'SAR 114,750.00',
  },
  {
    id: 'w4',
    icon: CalendarDays,
    title: 'عرض الخريف',
    subtitle: '15% - ألوان الخريف',
    discount: '15%',
    bookingPeriod: '1 أغسطس 2025 - 31 أكتوبر 2025',
    stayPeriod: '1 سبتمبر 2025 - 30 نوفمبر 2025',
    bookings: 230,
    roomNights: 690,
    adr: 'SAR 360.00',
    revenue: 'SAR 248,400.00',
  },
  {
    id: 'b5',
    icon: Tag,
    title: 'عرض أساسي',
    subtitle: 'عرض الشركات',
    discount: '15%',
    bookingPeriod: 'مستمر',
    stayPeriod: 'الأحد - الأربعاء',
    bookings: 1200,
    roomNights: 3600,
    adr: 'SAR 380.00',
    revenue: 'SAR 1,368,000.00',
  },
  {
    id: 'h5',
    icon: Gift,
    title: 'عرض العطلة',
    subtitle: 'عرض شهر العسل',
    discount: '10%',
    bookingPeriod: 'مستمر',
    stayPeriod: 'مستمر',
    bookings: 40,
    roomNights: 200,
    adr: 'SAR 600.00',
    revenue: 'SAR 120,000.00',
  }
];

export default function PromotionsPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilters, setActiveFilters] = useState<string[]>([]);
  const [groupBy, setGroupBy] = useState<string[]>([]);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [collapsedGroups, setCollapsedGroups] = useState<Record<string, boolean>>({});
  const searchContainerRef = useRef<HTMLDivElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (searchContainerRef.current && !searchContainerRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const toggleFilter = (filter: string) => {
    setActiveFilters(prev => 
      prev.includes(filter) ? prev.filter(f => f !== filter) : [...prev, filter]
    );
  };

  const toggleGroupBy = (field: string) => {
    setGroupBy(prev => 
      prev.includes(field) ? prev.filter(f => f !== field) : [...prev, field]
    );
  };

  const handleInputKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') {
      setIsDropdownOpen(false);
      inputRef.current?.blur();
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (!isDropdownOpen) setIsDropdownOpen(true);
      setTimeout(() => {
        const firstButton = dropdownRef.current?.querySelector('button');
        if (firstButton) (firstButton as HTMLElement).focus();
      }, 0);
    }
  };

  const handleDropdownKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') {
      setIsDropdownOpen(false);
      inputRef.current?.focus();
    } else if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
      e.preventDefault();
      const buttons = Array.from(dropdownRef.current?.querySelectorAll('button') || []);
      const currentIndex = buttons.indexOf(document.activeElement as HTMLButtonElement);
      
      let nextIndex = currentIndex;
      if (e.key === 'ArrowDown') {
        nextIndex = currentIndex < buttons.length - 1 ? currentIndex + 1 : 0;
      } else {
        nextIndex = currentIndex > 0 ? currentIndex - 1 : buttons.length - 1;
      }
      
      if (buttons[nextIndex]) {
        (buttons[nextIndex] as HTMLElement).focus();
      }
    }
  };

  const filteredPromotions = useMemo(() => {
    return allPromotions.filter(promo => {
      // Search query
      if (searchQuery && !promo.title.includes(searchQuery) && !promo.subtitle.includes(searchQuery)) {
        return false;
      }
      
      // Filters
      if (activeFilters.includes('High Discount')) {
        const discountVal = parseInt(promo.discount.replace('%', ''));
        if (discountVal <= 20) return false;
      }
      if (activeFilters.includes('High Revenue')) {
        const revenueVal = parseFloat(promo.revenue.replace(/[^0-9.-]+/g,""));
        if (revenueVal <= 100000) return false;
      }
      if (activeFilters.includes('Active')) {
        const bookingsVal = typeof promo.bookings === 'string' ? parseInt(promo.bookings) : promo.bookings;
        if (bookingsVal <= 0) return false;
      }
      
      return true;
    });
  }, [searchQuery, activeFilters]);

  const groupedPromotions = useMemo(() => {
    if (groupBy.length === 0) return null;
    
    const groups: Record<string, Promotion[]> = {};
    filteredPromotions.forEach(promo => {
      const keyParts = groupBy.map(field => {
        if (field === 'type') return promo.title;
        if (field === 'discount') return promo.discount;
        if (field === 'bookingPeriod') return promo.bookingPeriod;
        if (field === 'stayPeriod') return promo.stayPeriod;
        if (field === 'roomNights') return promo.roomNights.toString();
        return '';
      });
      const key = keyParts.join(' • ');
      if (!groups[key]) groups[key] = [];
      groups[key].push(promo);
    });
    return groups;
  }, [filteredPromotions, groupBy]);

  const toggleGroup = (key: string) => {
    setCollapsedGroups(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const renderTable = (promotions: Promotion[]) => (
    <div className="overflow-x-auto">
      <table className="w-full text-right text-sm">
        <thead className="text-gray-500 bg-gray-50/50 border-b border-gray-100">
          <tr>
            <th className="px-6 py-4 font-medium w-[25%] text-right whitespace-nowrap">الاسم</th>
            <th className="px-6 py-4 font-medium text-center whitespace-nowrap">نسبة الخصم</th>
            <th className="px-6 py-4 font-medium text-right whitespace-nowrap">فترة إجراء الحجز</th>
            <th className="px-6 py-4 font-medium text-right whitespace-nowrap">تواريخ الإقامة</th>
            <th className="px-6 py-4 font-medium text-center whitespace-nowrap">الحجوزات</th>
            <th className="px-6 py-4 font-medium text-center whitespace-nowrap">ليالي الإقامة</th>
            <th className="px-6 py-4 font-medium text-right whitespace-nowrap">معدل السعر اليومي</th>
            <th className="px-6 py-4 font-medium text-right whitespace-nowrap">الإيرادات</th>
            <th className="px-4 py-4 font-medium"></th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100">
          {promotions.map((promo) => (
            <tr key={promo.id} className="hover:bg-gray-50 transition-colors group bg-white">
              <td className="px-6 py-4">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center text-blue-500 shrink-0 relative">
                    <promo.icon className="w-5 h-5" strokeWidth={1.5} />
                    <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-orange-500 rounded-full border-2 border-white flex items-center justify-center">
                      <div className="w-1.5 h-1.5 bg-white rounded-full"></div>
                    </div>
                  </div>
                  <div>
                    <div className="text-xs text-gray-500 mb-0.5">{promo.title}</div>
                    <div className="text-sm font-semibold text-blue-600 hover:underline cursor-pointer">{promo.subtitle}</div>
                  </div>
                </div>
              </td>
              <td className="px-6 py-4 font-bold text-gray-900 text-center">{promo.discount}</td>
              <td className="px-6 py-4 text-gray-600 text-xs leading-relaxed max-w-[140px] whitespace-normal">{promo.bookingPeriod}</td>
              <td className="px-6 py-4 text-gray-600 text-xs leading-relaxed max-w-[140px] whitespace-normal">{promo.stayPeriod}</td>
              <td className="px-6 py-4 text-center text-gray-900">{promo.bookings}</td>
              <td className="px-6 py-4 text-center text-gray-900">{promo.roomNights}</td>
              <td className="px-6 py-4 text-gray-900 text-xs whitespace-nowrap">{promo.adr}</td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="font-bold text-gray-900 text-xs mb-0.5">{promo.revenue.split(' ')[0]}</div>
                <div className="font-bold text-gray-900 text-sm">{promo.revenue.split(' ')[1]}</div>
              </td>
              <td className="px-4 py-4 text-left">
                <button className="text-gray-400 hover:text-gray-600 p-1.5 rounded-md hover:bg-gray-200 opacity-0 group-hover:opacity-100 transition-opacity">
                  <MoreVertical className="w-5 h-5" />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#f7f9fa] text-gray-900" dir="rtl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* Header */}
        <div className="mb-8 flex justify-start">
          <h1 className="text-3xl font-bold text-gray-900">عروضك الترويجية</h1>
        </div>

        {/* Search Bar & Add Button */}
        <div className="mb-10 flex justify-center items-center gap-3">
          <div className="relative w-full max-w-2xl" ref={searchContainerRef}>
            <div className={`flex items-center bg-white border rounded-lg px-3 py-2 shadow-sm transition-all ${isDropdownOpen ? 'ring-2 ring-blue-100 border-blue-400' : 'border-gray-200 focus-within:ring-2 focus-within:ring-blue-100 focus-within:border-blue-400'}`}>
              <Search className="w-4 h-4 text-gray-400 ml-2" />
              
              {/* Active Filters / Group By Chips */}
              <div className="flex flex-wrap gap-1 items-center">
                {groupBy.length > 0 && (
                  <div className="flex items-center bg-gray-800 text-white text-xs px-2 py-1 rounded gap-1">
                    <Layers className="w-3 h-3" />
                    {groupBy.map(g => 
                     g === 'type' ? 'نوع العرض' : 
                     g === 'discount' ? 'نسبة الخصم' : 
                     g === 'bookingPeriod' ? 'فترة إجراء الحجز' : 
                     g === 'stayPeriod' ? 'تواريخ الإقامة' : 
                     g === 'roomNights' ? 'ليالي الإقامة' : ''
                    ).join(' + ')}
                    <button onClick={() => setGroupBy([])} className="mr-1 focus:outline-none focus:ring-1 focus:ring-white rounded"><X className="w-3 h-3 hover:text-gray-300" /></button>
                  </div>
                )}
                {activeFilters.map(filter => (
                  <div key={filter} className="flex items-center bg-gray-100 text-gray-800 text-xs px-2 py-1 rounded gap-1 border border-gray-200">
                    {filter === 'High Discount' ? 'خصم عالي (> 20%)' : 
                     filter === 'High Revenue' ? 'إيرادات عالية' :
                     filter === 'Active' ? 'نشط' : filter}
                    <button onClick={() => toggleFilter(filter)} className="mr-1 focus:outline-none focus:ring-1 focus:ring-gray-400 rounded"><X className="w-3 h-3 hover:text-gray-500" /></button>
                  </div>
                ))}
              </div>

              <input
                ref={inputRef}
                type="text"
                placeholder={activeFilters.length === 0 && groupBy.length === 0 ? "البحث باسم العرض..." : ""}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onFocus={() => setIsDropdownOpen(true)}
                onKeyDown={handleInputKeyDown}
                className="flex-1 bg-transparent border-none focus:ring-0 text-gray-900 placeholder-gray-400 outline-none text-right text-sm min-w-[100px] px-2"
              />
              <div 
                className="border-r border-gray-200 pr-3 flex items-center cursor-pointer hover:bg-gray-50 rounded p-1"
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              >
                <ChevronDown className={`w-4 h-4 text-gray-500 transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`} />
              </div>
            </div>

            {/* Dropdown */}
            {isDropdownOpen && (
              <div 
                ref={dropdownRef}
                onKeyDown={handleDropdownKeyDown}
                className="absolute top-full right-0 mt-1 w-full bg-white border border-gray-200 rounded-lg shadow-lg z-50 p-4 grid grid-cols-3 gap-4 text-right"
              >
                <div>
                  <h3 className="text-xs font-semibold text-gray-500 mb-3 flex items-center gap-2">
                    <Filter className="w-3 h-3" /> الفلاتر
                  </h3>
                  <ul className="space-y-2 text-sm">
                    <li>
                      <button 
                        className={`hover:text-blue-600 w-full text-right focus:outline-none focus:bg-blue-50 px-2 py-1 rounded ${activeFilters.includes('High Discount') ? 'text-blue-600 font-medium' : 'text-gray-700'}`}
                        onClick={() => toggleFilter('High Discount')}
                      >
                        <div className="flex items-center justify-between">
                          <span>خصم عالي (&gt; 20%)</span>
                          {activeFilters.includes('High Discount') && <Check className="w-4 h-4" />}
                        </div>
                      </button>
                    </li>
                    <li>
                      <button 
                        className={`hover:text-blue-600 w-full text-right focus:outline-none focus:bg-blue-50 px-2 py-1 rounded ${activeFilters.includes('High Revenue') ? 'text-blue-600 font-medium' : 'text-gray-700'}`}
                        onClick={() => toggleFilter('High Revenue')}
                      >
                        <div className="flex items-center justify-between">
                          <span>إيرادات عالية (&gt; 100,000 ريال)</span>
                          {activeFilters.includes('High Revenue') && <Check className="w-4 h-4" />}
                        </div>
                      </button>
                    </li>
                    <li>
                      <button 
                        className={`hover:text-blue-600 w-full text-right focus:outline-none focus:bg-blue-50 px-2 py-1 rounded ${activeFilters.includes('Active') ? 'text-blue-600 font-medium' : 'text-gray-700'}`}
                        onClick={() => toggleFilter('Active')}
                      >
                        <div className="flex items-center justify-between">
                          <span>نشط (يوجد حجوزات)</span>
                          {activeFilters.includes('Active') && <Check className="w-4 h-4" />}
                        </div>
                      </button>
                    </li>
                  </ul>
                </div>
                <div className="border-r border-gray-100 pr-4">
                  <h3 className="text-xs font-semibold text-gray-500 mb-3 flex items-center gap-2">
                    <Layers className="w-3 h-3" /> تجميع حسب
                  </h3>
                  <ul className="space-y-2 text-sm">
                    <li>
                      <button 
                        className={`hover:text-blue-600 w-full text-right focus:outline-none focus:bg-blue-50 px-2 py-1 rounded ${groupBy.includes('type') ? 'text-blue-600 font-medium' : 'text-gray-700'}`}
                        onClick={() => toggleGroupBy('type')}
                      >
                        <div className="flex items-center justify-between">
                          <span>نوع العرض</span>
                          {groupBy.includes('type') && <Check className="w-4 h-4" />}
                        </div>
                      </button>
                    </li>
                    <li>
                      <button 
                        className={`hover:text-blue-600 w-full text-right focus:outline-none focus:bg-blue-50 px-2 py-1 rounded ${groupBy.includes('discount') ? 'text-blue-600 font-medium' : 'text-gray-700'}`}
                        onClick={() => toggleGroupBy('discount')}
                      >
                        <div className="flex items-center justify-between">
                          <span>نسبة الخصم</span>
                          {groupBy.includes('discount') && <Check className="w-4 h-4" />}
                        </div>
                      </button>
                    </li>
                    <li>
                      <button 
                        className={`hover:text-blue-600 w-full text-right focus:outline-none focus:bg-blue-50 px-2 py-1 rounded ${groupBy.includes('bookingPeriod') ? 'text-blue-600 font-medium' : 'text-gray-700'}`}
                        onClick={() => toggleGroupBy('bookingPeriod')}
                      >
                        <div className="flex items-center justify-between">
                          <span>فترة إجراء الحجز</span>
                          {groupBy.includes('bookingPeriod') && <Check className="w-4 h-4" />}
                        </div>
                      </button>
                    </li>
                    <li>
                      <button 
                        className={`hover:text-blue-600 w-full text-right focus:outline-none focus:bg-blue-50 px-2 py-1 rounded ${groupBy.includes('stayPeriod') ? 'text-blue-600 font-medium' : 'text-gray-700'}`}
                        onClick={() => toggleGroupBy('stayPeriod')}
                      >
                        <div className="flex items-center justify-between">
                          <span>تواريخ الإقامة</span>
                          {groupBy.includes('stayPeriod') && <Check className="w-4 h-4" />}
                        </div>
                      </button>
                    </li>
                    <li>
                      <button 
                        className={`hover:text-blue-600 w-full text-right focus:outline-none focus:bg-blue-50 px-2 py-1 rounded ${groupBy.includes('roomNights') ? 'text-blue-600 font-medium' : 'text-gray-700'}`}
                        onClick={() => toggleGroupBy('roomNights')}
                      >
                        <div className="flex items-center justify-between">
                          <span>ليالي الإقامة</span>
                          {groupBy.includes('roomNights') && <Check className="w-4 h-4" />}
                        </div>
                      </button>
                    </li>
                  </ul>
                </div>
                <div className="border-r border-gray-100 pr-4">
                  <h3 className="text-xs font-semibold text-gray-500 mb-3 flex items-center gap-2">
                    <Star className="w-3 h-3" /> المفضلة
                  </h3>
                  <ul className="space-y-2 text-sm">
                    <li>
                      <button className="text-gray-700 hover:text-blue-600 w-full text-right focus:outline-none focus:bg-blue-50 px-2 py-1 rounded">
                        حفظ البحث الحالي
                      </button>
                    </li>
                  </ul>
                </div>
              </div>
            )}
          </div>
          <Link href="/add-promotion">
            <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors flex items-center gap-1.5 shadow-sm whitespace-nowrap text-sm">
              <Plus className="w-4 h-4" />
              أضف عرض ترويجي جديد
            </button>
          </Link>
        </div>

        {/* Promotions List */}
        {groupedPromotions ? (
          <div className="space-y-4">
            {Object.entries(groupedPromotions).map(([key, groupPromos]) => (
              <div key={key} className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm">
                <button 
                  className="w-full px-6 py-4 flex items-center justify-between bg-white hover:bg-gray-50 transition-colors"
                  onClick={() => toggleGroup(key)}
                >
                  <div className="flex items-center gap-2">
                    {!collapsedGroups[key] ? (
                      <ChevronDown className="w-5 h-5 text-gray-500" />
                    ) : (
                      <ChevronLeft className="w-5 h-5 text-gray-500" />
                    )}
                    <span className="font-bold text-gray-900">{key}</span>
                    <span className="text-gray-500 text-sm">({groupPromos.length})</span>
                  </div>
                </button>
                {!collapsedGroups[key] && (
                  <div className="border-t border-gray-200">
                    {renderTable(groupPromos)}
                  </div>
                )}
              </div>
            ))}
            {Object.keys(groupedPromotions).length === 0 && (
              <div className="text-center py-10 text-gray-500 bg-white rounded-xl border border-gray-200">
                لا توجد نتائج مطابقة للبحث
              </div>
            )}
          </div>
        ) : (
          <div className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm">
            {filteredPromotions.length > 0 ? (
              renderTable(filteredPromotions)
            ) : (
              <div className="text-center py-10 text-gray-500">
                لا توجد نتائج مطابقة للبحث
              </div>
            )}
          </div>
        )}

        {/* Footer Link */}
        <div className="mt-8 text-sm text-right">
          <a href="#" className="text-blue-600 hover:underline font-medium">
            هل تحتاج للمساعدة بخصوص هذه الصفحة؟ ابدأ الجولة التعريفية.
          </a>
        </div>
      </div>
    </div>
  );
}
