# 🚀 G. Sai Harshith — Personal Developer Portfolio

Modern, high-performance developer portfolio built with a **Dark Minimalist Bento Grid** aesthetic, **Live GitHub Integration**, an **Interactive CLI Terminal drawer**, and a **Direct Contact Form**.

![Portfolio Preview Banner](https://img.shields.io/badge/Status-Live-emerald?style=for-the-badge)
![Tech](https://img.shields.io/badge/Stack-TailwindCSS_|_Lucide_|_JavaScript_ES6-cyan?style=for-the-badge)

---

## ✨ Features & Extensions Included

1. **Bento Grid Architecture**:
   - Apple-style modern modular layout.
   - Dynamic mouse-following spotlight glow effect on all cards.
   - Fully responsive across desktop, tablet, and mobile displays.

2. **Live GitHub Integration**:
   - Directly fetches repository stats, languages, and public projects from [`@Unknownknowns1`](https://github.com/Unknownknowns1) via the GitHub REST API.
   - Shows public repo counters and direct repository links.

3. **Interactive CLI / Terminal Mode**:
   - Accessible via the **CLI Mode** button in the header or by pressing `~` (tilde) / `Ctrl+K`.
   - Supports shell commands: `help`, `about`, `projects`, `skills`, `experience`, `contact`, `github`, `clear`, `date`, `exit`.
   - Command history navigation with `ArrowUp` and `ArrowDown`.

4. **Dynamic Role Cycler**:
   - Typewriter animation highlighting specialties (AI/ML, Low-Level Kernel Tweaks, 3D Spatial Dashboards).

5. **Contact & Social Hub**:
   - 1-Click Copy Email to clipboard with toast notifications.
   - Working contact form with auto-fallback to prefilled email client drafts.
   - Direct links to GitHub and LinkedIn profiles.

6. **Interactive Constellation Canvas**:
   - Lightweight, 60fps interactive particle background responding gently to cursor movements.

---

## 💻 Local Preview & Testing

You can preview the portfolio immediately in any web browser.

### Option A: Direct Open
Double-click `index.html` in your file explorer to launch it in your default browser.

### Option B: Local Python Server (Recommended)
Open PowerShell in this folder and run:
```powershell
python -m http.server 3000
```
Then visit: [http://localhost:3000](http://localhost:3000)

---

## 🌐 1-Click Free Deployment

### Deploy to GitHub Pages (Recommended)
1. Initialize git in this directory (if not already done):
   ```bash
   git init
   git add .
   git commit -m "feat: initial portfolio release"
   ```
2. Create a repository on your GitHub named `Unknownknowns1.github.io` (or `portfolio`).
3. Push your code:
   ```bash
   git remote add origin https://github.com/Unknownknowns1/Unknownknowns1.github.io.git
   git branch -M main
   git push -u origin main
   ```
4. Go to **Settings > Pages** in your repo, choose the `main` branch, and click **Save**.
5. Your custom domain is pre-configured via the included `CNAME` file to go live at:
   **`https://gsaiharshith.is-a.dev`** (and also accessible at `https://Unknownknowns1.github.io`).

---

## 🛠️ Personal Customization

- **Profile Picture**: If you want to use a local photo, place an image file (e.g. `avatar.jpg`) in this directory and update `src="avatar.jpg"` on line 125 of `index.html`.
- **Contact Form Email Access Key**: For instant automated serverless delivery through Web3Forms, grab a free access key at [web3forms.com](https://web3forms.com) and replace `YOUR_WEB3FORMS_ACCESS_KEY` in `app.js` (line 392). Even without the key, it automatically opens the user's prefilled email draft with one click!
