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

## 🌐 Netlify ile Yayına Alma

```bash
npm run build
# dist/ klasörünü Netlify'a yükle
```

## 🔑 Özellikler (CRUD)

- ➕ **Ekle** — Başlık, açıklama, öncelik, kategori ve bitiş tarihi ile görev ekle
- 📋 **Listele** — Tüm görevleri listele; arama, durum ve kategori filtrele
- ✏️ **Güncelle** — Mevcut görevi düzenle ve kaydet
- 🗑️ **Sil** — Görevi kalıcı olarak kaldır

## 📸 Ekran Görüntüsü

> `screenshot.png` — Proje klasörüne ekleyebilirsin.

---

Made with ❤️ by Nefise Genç
