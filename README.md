# ✅ Görev Takibi — Checklist App

Nefise Genç tarafından Web Geliştirme dersi ödevi kapsamında geliştirilmiştir.

## 🚀 Kullanılan Teknolojiler

| Teknoloji | Amaç |
|-----------|------|
| **React 18** | UI kütüphanesi (Vite ile) |
| **Tailwind CSS 3** | Stil / tasarım |
| **localStorage** | Verinin tarayıcıda kalıcı saklanması |

## 📁 Proje Yapısı

```
src/
├── components/
│   ├── TaskForm.jsx      # Görev ekleme & güncelleme formu
│   ├── TaskItem.jsx      # Tek görev satırı
│   ├── TaskList.jsx      # Görev listesi
│   └── TaskFilter.jsx    # Arama & filtre çubuğu
├── interfaces/
│   └── Task.js           # Task veri modeli & sabitleri
├── pages/
│   └── HomePage.jsx      # Ana sayfa (CRUD yönetimi)
├── App.jsx
├── main.jsx
└── index.css
```

## ⚙️ Kurulum

```bash
npm install
npm run dev
```

## 🌐 Netlify İle Yayına Alma

Projeyi GitHub'a push ettikten sonra Netlify'e bağlandıysa otomatik deploy gerçekleşir. Aşağıdaki adımları elle de yapabilirsiniz:

```bash
npm run build
# ardından dist/ içeriğini Netlify dashboard üzerinden ya da CLI (`netlify deploy --prod`) ile aktarın
```

Canlı sürüm: **https://<kendi-site-adınız>.netlify.app/**  *(Netlify dashboard'dan kopyalayın)*

## 🔑 Özellikler (CRUD)

- ➕ **Ekle** — Başlık, açıklama, öncelik, kategori ve bitiş tarihi ile görev ekle
- 📋 **Listele** — Tüm görevleri listele; arama, durum ve kategori filtrele
- ✏️ **Güncelle** — Mevcut görevi düzenle ve kaydet
- 🗑️ **Sil** — Görevi kalıcı olarak kaldır

## 📸 Ekran Görüntüleri

### Ana Sayfa (Boş)
![Home Empty](public/screenshots/home.png)

### Ana Sayfa (Görevler ile)
![Home With Tasks](public/screenshots/home_2.png)

### Görev Listesi
![Task List](public/screenshots/home_3.png)

### Politika Modalı
![Policy Modal](public/screenshots/home_4.png)

---

Made with ❤️ by Nefise Genç
