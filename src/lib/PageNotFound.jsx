import { useLocation } from 'react-router-dom';
import { base44 } from '@/api/base44Client';
import { useQuery } from '@tanstack/react-query';
import { useLang } from "@/lib/i18n/LanguageContext";

export default function PageNotFound({}) {
    const { t } = useLang();
    const location = useLocation();
    const pageName = location.pathname.substring(1);

    const { data: authData, isFetched } = useQuery({
        queryKey: ['user'],
        queryFn: async () => {
            try {
                const user = await base44.auth.me();
                return { user, isAuthenticated: true };
            } catch (error) {
                return { user: null, isAuthenticated: false };
            }
        }
    });
    
    return (
        <div className="min-h-screen flex items-center justify-center p-6" style={{ backgroundColor: '#F8F6F2' }}>
            <div className="max-w-md w-full">
                <div className="text-center space-y-6">
                    {/* 404 Error Code */}
                    <div className="space-y-2">
                        <h1 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '120px', fontWeight: 300, color: '#E0DDD9', lineHeight: 1 }}>404</h1>
                        <div style={{ height: '1px', width: '60px', backgroundColor: '#C9A36A', margin: '0 auto' }}></div>
                    </div>
                    
                    {/* Main Message */}
                    <div className="space-y-3">
                        <h2 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '32px', fontWeight: 300, color: '#111111' }}>
                            {t("pageNotFound.title")}
                        </h2>
                        <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '14px', fontWeight: 300, lineHeight: 1.7, color: '#777777' }}>
                            {t("pageNotFound.description").replace('{page}', pageName)}
                        </p>
                    </div>
                    
                    {/* Admin Note */}
                    {isFetched && authData.isAuthenticated && authData.user?.role === 'admin' && (
                        <div className="mt-8 p-4 rounded-lg" style={{ backgroundColor: '#FFFFFF', border: '1px solid #E8E8E8' }}>
                            <div className="flex items-start space-x-3">
                                <div style={{ flexShrink: 0, width: '20px', height: '20px', borderRadius: '50%', backgroundColor: '#F0EEEA', display: 'flex', alignItems: 'center', justifyContent: 'center', marginTop: '2px' }}>
                                    <div style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#C9A36A' }}></div>
                                </div>
                                <div className="text-left space-y-1">
                                    <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '13px', fontWeight: 400, color: '#111111' }}>{t("pageNotFound.adminNote")}</p>
                                    <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '13px', fontWeight: 300, lineHeight: 1.6, color: '#666666' }}>
                                        {t("pageNotFound.adminDesc")}
                                    </p>
                                </div>
                            </div>
                        </div>
                    )}
                    
                    {/* Action Button */}
                    <div className="pt-6">
                        <button 
                            onClick={() => window.location.href = '/'} 
                            style={{
                                fontFamily: 'Inter, sans-serif',
                                fontSize: '10px',
                                fontWeight: 400,
                                letterSpacing: '0.2em',
                                textTransform: 'uppercase',
                                color: '#F8F6F2',
                                backgroundColor: '#111111',
                                padding: '14px 32px',
                                border: 'none',
                                cursor: 'pointer',
                                transition: 'background-color 0.4s',
                            }}
                            onMouseEnter={e => { e.currentTarget.style.backgroundColor = '#C9A36A'; }}
                            onMouseLeave={e => { e.currentTarget.style.backgroundColor = '#111111'; }}
                        >
                            {t("pageNotFound.goHome")}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}