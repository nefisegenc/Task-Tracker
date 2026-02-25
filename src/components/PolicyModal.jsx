import { useState } from 'react'
import { useLanguage } from '../context/LanguageContext'

const CONTENT = {
  tr: {
    disclosure: {
      title: 'Aydınlatma Metni',
      sections: [
        {
          heading: 'Veri Sorumlusu',
          body: 'Bu uygulama, Nefise Genç tarafından eğitim amaçlı geliştirilmiş bir React + Tailwind CSS demo projesidir. Herhangi bir ticari amaç taşımamakta olup KVKK kapsamında "veri sorumlusu" sıfatıyla hareket eden gerçek veya tüzel bir kişilik bulunmamaktadır.',
        },
        {
          heading: 'İşlenen Kişisel Veriler',
          body: 'Uygulama; ad soyad ve e-posta adresi bilgilerini yalnızca oturum yönetimi amacıyla kullanmaktadır. Bu veriler yalnızca tarayıcınızdaki localStorage alanında saklanır; hiçbir sunucuya, üçüncü taraf hizmetine veya harici kaynağa aktarılmaz.',
        },
        {
          heading: 'Veri İşleme Amacı ve Hukuki Dayanağı',
          body: 'Toplanan veriler; uygulamaya erişim, kullanıcı oturumu ve görev yönetimi işlevlerinin yerine getirilmesi amacıyla işlenmektedir. Yasal bir zorunluluk ya da ticari bir amaç söz konusu olmadığından, veriler yalnızca uygulamanın çalışması için zorunlu olan minimum düzeyde tutulmaktadır.',
        },
        {
          heading: 'Verilerin Saklanma Süresi',
          body: 'Veriler, kullanıcı tarafından açıkça silinene veya tarayıcının localStorage\'ı temizlenene kadar saklanır. Kullanıcı, tarayıcı geliştirici araçları aracılığıyla istediği zaman tüm verileri silebilir.',
        },
        {
          heading: 'Haklarınız',
          body: 'Verilerinize erişme, düzeltme ve silme hakkına sahipsiniz. Bu haklarınızı kullanmak için tarayıcınızın localStorage\'ını temizlemeniz yeterlidir. Gerçek bir kişisel veri işleme söz konusu olmadığından resmi bir başvuru süreci uygulanmamaktadır.',
        },
      ],
    },    terms: {
      title: 'Kullanım Koşulları',
      sections: [
        {
          heading: 'Kabulün Anlamı',
          body: 'Bu uygulamayı kullanarak aşağıdaki koşulları okuduğunuzu ve kabul ettiğinizi beyan etmiş olursunuz. Kabul etmiyorsanız uygulamayı kullanmaktan vazgeçiniz.',
        },
        {
          heading: 'Hizmetin Niteliği',
          body: 'Görev Takibi; Nefise Genç tarafından yalnızca eğitim ve akademik değerlendirme amacıyla geliştirilmiş, ticari faaliyete konu olmayan ücretsiz bir demo uygulamasıdır. Hizmet "olduğu gibi" sunulmakta olup herhangi bir süreklilik, kesintisiz erişim veya hata-serbestlik garantisi verilmemektedir.',
        },
        {
          heading: 'Kullanıcı Sorumlulukları',
          body: 'Kullanıcı; girdiği bilgilerin doğruluğundan, hesap güvenliğinin sağlanmasından ve uygulamayı yasalara uygun biçimde kullanmaktan bizzat sorumludur. Başkasına ait kimlik bilgileri ile kayıt olmak, uygulamayı kötüye kullanmak veya tersine mühendislik yapmak yasaktır.',
        },
        {
          heading: 'Fikri Mülkiyet',
          body: 'Uygulamada kullanılan kaynak kodu, tasarım ve içerik Nefise Genç\'e aittir. Kaynak kod, MIT Lisansı kapsamında kişisel, eğitimsel ve ticari olmayan kullanım için serbest bırakılmıştır. Ticari amaçla dağıtım için yazılı izin gerekmektedir.',
        },
        {
          heading: 'Sorumluluk Reddi',
          body: 'Uygulama sahibi; veri kaybı, tarayıcı güvenlik açıkları, hizmet kesintisi veya kullanım sırasında doğabilecek herhangi bir maddi ya da manevi zarardan sorumlu tutulamaz. Uygulama tamamen kullanıcı tarayıcısında çalıştığından üçüncü taraf riskleri kullanıcıya aittir.',
        },
        {
          heading: 'Değişiklik Hakkı',
          body: 'Bu kullanım koşulları, önceden bildirim yapılmaksızın güncellenebilir. Güncel koşullara uygulama üzerinden erişilebilir. Uygulamayı kullanmaya devam etmek, güncel koşulların kabul edildiği anlamına gelir.',
        },
        {
          heading: 'Uygulanacak Hukuk',
          body: 'Bu koşullar Türkiye Cumhuriyeti kanunlarına tabidir. Doğabilecek uyuşmazlıklarda Türkiye mahkemeleri yetkilidir.',
        },
      ],
    },    privacy: {
      title: 'Gizlilik Politikası',
      sections: [
        {
          heading: 'Genel Bakış',
          body: 'Görev Takibi, kullanıcıların görevlerini organize etmesine yardımcı olan, tamamen istemci taraflı çalışan bir web uygulamasıdır. Uygulama herhangi bir arka uç sunucu, veritabanı veya üçüncü taraf analitik servisi kullanmamaktadır.',
        },
        {
          heading: 'Toplanan Veriler',
          body: 'Uygulama yalnızca aşağıdaki verileri toplar:\n• Kayıt sırasında girilen ad soyad ve e-posta adresi\n• Oluşturulan görev içerikleri (başlık, açıklama, öncelik, kategori, tarih)\n• Seçilen arayüz dili tercihi',
        },
        {
          heading: 'Verilerin Depolanması',
          body: 'Tüm veriler yalnızca kullanıcının kendi tarayıcısındaki localStorage mekanizmasında tutulmaktadır. İnternet bağlantısı gerektirmez ve herhangi bir sunucuyla eşitleme yapılmaz. Farklı bir cihaz veya tarayıcıdan verilerinize erişilemez.',
        },
        {
          heading: 'Üçüncü Taraflarla Paylaşım',
          body: 'Hiçbir kişisel veri üçüncü taraflarla paylaşılmaz, satılmaz veya aktarılmaz. Uygulama; çerez (cookie), yeniden hedefleme pikseli veya herhangi bir izleme aracı kullanmamaktadır.',
        },
        {
          heading: 'Veri Güvenliği',
          body: 'Veriler şifrelenmeden localStorage\'da tutulduğundan, aynı cihazı kullanan başka kişilerin bu verilere erişebileceğini unutmayın. Şifrenizi başkalarıyla paylaşmayın ve güvendiğiniz cihazlar dışında oturum açık bırakmayın.',
        },
        {
          heading: 'Verilerin Silinmesi',
          body: 'Tarayıcınızın "Site verileri" veya "localStorage" bölümünü temizleyerek tüm uygulama verilerini kalıcı olarak silebilirsiniz. Ayrıca uygulamadan çıkış yaptıktan sonra yeni bir kayıt oluşturarak da hesabınızı sıfırlayabilirsiniz.',
        },
        {
          heading: 'İletişim',
          body: 'Bu gizlilik politikasına ilişkin sorularınız için GitHub üzerinden proje deposuna ulaşabilirsiniz. Uygulama eğitim amaçlı geliştirildiğinden resmi bir iletişim kanalı sunulmamaktadır.',
        },
      ],
    },
  },

  en: {
    disclosure: {
      title: 'Disclosure Notice',
      sections: [
        {
          heading: 'Data Controller',
          body: 'This application is a demo project developed by Nefise Genç for educational purposes using React + Tailwind CSS. It has no commercial intent and there is no legal entity acting as a formal "data controller."',
        },
        {
          heading: 'Personal Data Processed',
          body: 'The application collects only a full name and email address for the purpose of session management. These are stored exclusively in your browser\'s localStorage and are never transmitted to any server, third-party service, or external resource.',
        },
        {
          heading: 'Purpose and Legal Basis',
          body: 'Collected data is processed solely to enable application access, user sessions, and task management features. Since there is no legal obligation or commercial purpose, only the minimum data required for the application to function is retained.',
        },
        {
          heading: 'Data Retention Period',
          body: 'Data is retained until the user explicitly deletes it or clears the browser\'s localStorage. Users can delete all data at any time via browser developer tools.',
        },
        {
          heading: 'Your Rights',
          body: 'You have the right to access, correct, and delete your data. Clearing your browser\'s localStorage is sufficient to exercise these rights. Since no real personal data processing takes place in a formal sense, no official application process is applicable.',
        },
      ],
    },
    privacy: {
      title: 'Privacy Policy',
      sections: [
        {
          heading: 'Overview',
          body: 'Task Tracker is a fully client-side web application designed to help users organize their tasks. It uses no backend server, database, or third-party analytics service.',
        },
        {
          heading: 'Data Collected',
          body: 'The application collects only the following:\n• Full name and email address entered during registration\n• Task content created by the user (title, description, priority, category, date)\n• Selected UI language preference',
        },
        {
          heading: 'Data Storage',
          body: 'All data is stored exclusively in the user\'s own browser via localStorage. No internet connection is needed for storage and no server synchronization occurs. Data cannot be accessed from a different device or browser.',
        },
        {
          heading: 'Third-Party Sharing',
          body: 'No personal data is shared with, sold to, or transferred to any third party. The application does not use cookies, retargeting pixels, or any tracking tools.',
        },
        {
          heading: 'Data Security',
          body: 'Since data is stored in localStorage without encryption, be aware that other people using the same device may be able to access it. Do not share your password and do not leave a session open on untrusted devices.',
        },
        {
          heading: 'Deleting Your Data',
          body: 'You can permanently delete all application data by clearing "Site data" or "localStorage" in your browser settings. You can also reset your account by logging out and creating a new registration.',
        },
        {
          heading: 'Contact',
          body: 'For questions about this privacy policy, you can reach the project repository on GitHub. Since the application is for educational purposes, no official support channel is provided.',
        },
      ],
    },
    terms: {
      title: 'Terms of Use',
      sections: [
        {
          heading: 'Acceptance',
          body: 'By using this application, you confirm that you have read and agree to the following terms. If you do not agree, please discontinue use of the application.',
        },
        {
          heading: 'Nature of the Service',
          body: 'Task Tracker is a free demo application developed by Nefise Genç for educational and academic evaluation purposes only. It has no commercial intent. The service is provided "as is" with no guarantees of continuity, uninterrupted access, or freedom from errors.',
        },
        {
          heading: 'User Responsibilities',
          body: 'Users are solely responsible for the accuracy of the information they enter, for maintaining the security of their account, and for using the application in compliance with applicable laws. Registering with another person\'s identity, misusing the application, or reverse engineering it is prohibited.',
        },
        {
          heading: 'Intellectual Property',
          body: 'The source code, design, and content of this application belong to Nefise Genç. The source code is released under the MIT License for personal, educational, and non-commercial use. Written permission is required for commercial distribution.',
        },
        {
          heading: 'Disclaimer of Liability',
          body: 'The application owner shall not be held liable for data loss, browser security vulnerabilities, service interruptions, or any material or moral damages arising from use. Since the application runs entirely in the user\'s browser, third-party risks are the user\'s responsibility.',
        },
        {
          heading: 'Right to Amend',
          body: 'These terms may be updated without prior notice. The current terms are always accessible within the application. Continued use of the application constitutes acceptance of the updated terms.',
        },
        {
          heading: 'Governing Law',
          body: 'These terms are governed by the laws of the Republic of Turkey. Turkish courts shall have jurisdiction over any disputes that may arise.',
        },
      ],
    },
  },
}

export default function PolicyModal({ initialTab = 'disclosure', trigger }) {
  const [open, setOpen] = useState(false)
  const [tab, setTab] = useState(initialTab)
  const { lang } = useLanguage()

  const content = CONTENT[lang] ?? CONTENT['tr']
  const current = content[tab]

  return (
    <>
      {/* Trigger */}
      <span onClick={() => { setTab(initialTab); setOpen(true) }} className="cursor-pointer">
        {trigger}
      </span>

      {/* Overlay */}
      {open && (
        <div
          className="fixed inset-0 z-50 flex items-end sm:items-center justify-center px-4 py-6 sm:py-10"
          style={{ background: 'rgba(0,0,0,0.7)', backdropFilter: 'blur(6px)' }}
          onClick={(e) => { if (e.target === e.currentTarget) setOpen(false) }}
        >
          <div
            className="w-full max-w-lg rounded-2xl overflow-hidden flex flex-col"
            style={{
              background: '#18181c',
              border: '1px solid rgba(255,255,255,0.08)',
              boxShadow: '0 24px 80px rgba(0,0,0,0.7)',
              maxHeight: '80vh',
            }}
          >
            {/* Modal Header */}
            <div className="flex items-center justify-between px-5 py-4 border-b border-white/5 flex-shrink-0">
              {/* Tabs */}
              <div className="flex gap-1">
                {['disclosure', 'privacy', 'terms'].map((t) => (
                  <button
                    key={t}
                    onClick={() => setTab(t)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all duration-200 ${
                      tab === t
                        ? 'bg-white/10 text-white/90'
                        : 'text-white/30 hover:text-white/55'
                    }`}
                  >
                    {content[t].title}
                  </button>
                ))}
              </div>
              {/* Kapat */}
              <button
                onClick={() => setOpen(false)}
                className="text-white/25 hover:text-white/60 transition-colors p-1"
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12"/>
                </svg>
              </button>
            </div>

            {/* İçerik */}
            <div className="overflow-y-auto px-5 py-5 space-y-5 flex-1">
              {current.sections.map((sec) => (
                <div key={sec.heading}>
                  <h3 className="text-xs font-bold text-white/70 uppercase tracking-wider mb-1.5">{sec.heading}</h3>
                  <p className="text-xs text-white/40 leading-relaxed whitespace-pre-line">{sec.body}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  )
}
