# 🎯 Quick Reference Card

## 🚀 Start Local Development

### Windows
```
Double-click: START.bat
```

### macOS / Linux
```bash
chmod +x start.sh
./start.sh
```

**Opens:** http://localhost:5173  
**Password:** admin123

---

## 📋 Key Files & Locations

| File | Purpose |
|------|---------|
| `src/pages/Dashboard.tsx` | Overview & statistics |
| `src/pages/Resources.tsx` | People & roles management |
| `src/pages/Workshops.tsx` | Workshop creation & editing |
| `src/pages/Planning.tsx` | Drag & drop scheduling board |
| `src/pages/Volunteers.tsx` | Volunteer assignments |
| `src/hooks/useData.ts` | Data management & localStorage |
| `src/components/Export/` | Export/Import functionality |
| `.github/workflows/deploy.yml` | GitHub Pages automation |

---

## 🔧 Common Commands

```bash
# Start development
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Deploy to GitHub Pages
npm run deploy

# Type checking
tsc -b

# Linting
npm run lint
```

---

## 📤 Export Data

1. Go to **Dashboard**
2. Click relevant export button:
   - **Export JSON** - Full backup of all data
   - **Exporter CSV** - Excel-compatible format
   - **Exporter iCal** - Calendar format (in Planning page)

---

## 📥 Import Data

1. Go to **Dashboard**
2. Click **Importer JSON**
3. Select a `.json` backup file
4. Confirm import

---

## 🌐 Deploy to GitHub Pages

### Quick Checklist:
1. Update GitHub username in `package.json` → `homepage` field
2. Run git commands (see NEXT_STEPS.md)
3. Go to GitHub → Settings → Pages → Select "GitHub Actions"
4. Wait 2-5 minutes
5. Access at: `https://YOUR_USERNAME.github.io/festival-admin`

---

## 🎨 Customization

### Colors & Theme
- Edit: `src/index.css` or `tailwind.config.ts`
- Framework: Tailwind CSS v4

### Logo & Icons
- Logos: `public/` folder
- Icons: Via Lucide React package

### Password
- File: `src/hooks/useAuth.ts`
- Change: Search for "admin123"

### Default Data
- Location: `src/data/` (JSON files)
- Edit: Add/modify workshop, people, schedules

---

## 🐛 Quick Troubleshooting

| Issue | Solution |
|-------|----------|
| App won't start | Run: `npm clean-install` then START.bat |
| Build fails | Check TypeScript: `tsc -b` |
| GitHub Pages blank | Verify base path: `/festival-admin/` in vite.config.ts |
| Port 5173 in use | Run: `npm run dev -- --port 5174` |
| localStorage cleared | Use export/import to restore backup |

---

## 📞 Support Resources

1. **README.md** - Features and startup
2. **DEPLOYMENT.md** - Detailed deployment help
3. **NEXT_STEPS.md** - Pre-deployment checklist
4. **IMPLEMENTATION_COMPLETE.md** - Full feature list

---

## 💾 Data Backup

**Automatic:** Changes saved to browser localStorage every time  
**Manual:** Export JSON from Dashboard anytime

**Recommended:** Export weekly to have backups

---

## 👥 Team Access

**Local:** Everyone with access to the START.bat/start.sh file  
**Online:** Share GitHub Pages URL (`https://YOUR_USERNAME.github.io/festival-admin`)  
**Password:** All users share `admin123` for now

---

## 📱 Responsive Testing

1. **Desktop**: Full-width view at 1920px
2. **Tablet**: Optimized for iPad (768px)
3. **Mobile**: Responsive at 375px
4. Test via browser DevTools (F12) → Toggle device toolbar

---

## 🔄 Update Workflow

```bash
# Make changes locally
git add .
git commit -m "Description of changes"
git push origin main
# GitHub Actions automatically builds and deploys in 2-3 minutes
```

---

## ✅ Pre-Launch Checklist

- [ ] App works locally with START.bat/start.sh
- [ ] Can login with password: admin123
- [ ] All pages accessible (Resources, Workshops, Planning, Volunteers)
- [ ] Drag & drop works in Planning
- [ ] Can export JSON, CSV, iCal
- [ ] Can import JSON backup
- [ ] localStorage persists data after refresh
- [ ] GitHub repository created
- [ ] GitHub Pages enabled and deployed
- [ ] Online URL accessible and working

---

## 🎉 You're Ready!

Your Festival Admin is production-ready. Deploy with confidence!

For detailed guides, see **DEPLOYMENT.md** or **IMPLEMENTATION_COMPLETE.md**
