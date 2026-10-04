// Portfolio Application Logic for G. Sai Harshith
// Modern Dual Light/Dark Minimalist Bento Grid + CLI Terminal + Live GitHub Integration

document.addEventListener('DOMContentLoaded', () => {
  // Initialize Lucide Icons
  if (window.lucide) {
    lucide.createIcons();
  }

  // Update dynamic year
  const yearEl = document.getElementById('year');
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }

  // 1. Theme Switcher (Light / Dark Mode with Persistence)
  initThemeToggle();

  // 2. Role Cycler (Typewriter effect)
  initRoleCycler();

  // 3. Mouse-follow spotlight effect for Bento cards
  initCardSpotlight();

  // 4. Interactive Floating Particle Canvas
  initParticleCanvas();

  // 5. Live GitHub Data Fetching (Unknownknowns1)
  fetchGitHubData();

  // 6. Interactive CLI Terminal Drawer
  initTerminal();

  // 7. Copy to Clipboard Handlers
  initCopyButtons();

  // 8. Contact Form Handling
  initContactForm();
});

/* ==========================================================================
   1. Theme Switcher (Light / Dark Mode)
   ========================================================================== */
function initThemeToggle() {
  const toggleBtn = document.getElementById('theme-toggle-btn');
  if (!toggleBtn) return;

  toggleBtn.addEventListener('click', () => {
    toggleTheme();
  });
}

function toggleTheme() {
  const isDark = document.documentElement.classList.toggle('dark');
  const currentTheme = isDark ? 'dark' : 'light';
  localStorage.setItem('portfolio-theme', currentTheme);

  if (window.lucide) {
    lucide.createIcons();
  }

  showToast(`Switched to ${isDark ? 'Dark 🌙' : 'Light ☀️'} mode`);
  return currentTheme;
}

/* ==========================================================================
   2. Role Cycler (Typewriter style)
   ========================================================================== */
function initRoleCycler() {
  const roles = [
    "Artificial Intelligence & Machine Learning",
    "System Optimization & Kernel Tuning",
    "Predictive 3D Spatial Dashboards",
    "Android GSI & Low-Level Tweaks",
    "High-Performance Algorithmic Engineering"
  ];

  const roleEl = document.getElementById('role-cycler');
  if (!roleEl) return;

  let roleIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  let typingSpeed = 80;

  function type() {
    const currentRole = roles[roleIndex];

    if (isDeleting) {
      roleEl.textContent = currentRole.substring(0, charIndex - 1);
      charIndex--;
      typingSpeed = 40;
    } else {
      roleEl.textContent = currentRole.substring(0, charIndex + 1);
      charIndex++;
      typingSpeed = 80;
    }

    if (!isDeleting && charIndex === currentRole.length) {
      typingSpeed = 2200; // Pause at end of text
      isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      roleIndex = (roleIndex + 1) % roles.length;
      typingSpeed = 400; // Pause before typing next role
    }

    setTimeout(type, typingSpeed);
  }

  setTimeout(type, 800);
}

/* ==========================================================================
   3. Bento Card Spotlight Tracking
   ========================================================================== */
function initCardSpotlight() {
  const cards = document.querySelectorAll('.bento-card');
  cards.forEach(card => {
    card.addEventListener('mousemove', e => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      card.style.setProperty('--mouse-x', `${x}px`);
      card.style.setProperty('--mouse-y', `${y}px`);
    });
  });
}

/* ==========================================================================
   4. Interactive Particle Background Canvas
   ========================================================================== */
function initParticleCanvas() {
  const canvas = document.getElementById('particle-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');

  let width = (canvas.width = window.innerWidth);
  let height = (canvas.height = window.innerHeight);

  window.addEventListener('resize', () => {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
  });

  const particles = [];
  const particleCount = Math.min(Math.floor(window.innerWidth / 25), 45);

  for (let i = 0; i < particleCount; i++) {
    particles.push({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 0.4,
      vy: (Math.random() - 0.5) * 0.4,
      radius: Math.random() * 1.5 + 0.8
    });
  }

  let mouseX = -1000;
  let mouseY = -1000;

  window.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
  });

  function render() {
    ctx.clearRect(0, 0, width, height);

    const isDark = document.documentElement.classList.contains('dark');
    const particleColor = isDark ? 'rgba(6, 182, 212, 0.5)' : 'rgba(8, 145, 178, 0.45)';
    const lineColorBase = isDark ? '6, 182, 212' : '8, 145, 178';
    const lineAlphaMax = isDark ? 0.15 : 0.12;

    // Draw connecting lines
    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const dx = particles[i].x - particles[j].x;
        const dy = particles[i].y - particles[j].y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < 130) {
          ctx.beginPath();
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          ctx.strokeStyle = `rgba(${lineColorBase}, ${lineAlphaMax * (1 - dist / 130)})`;
          ctx.lineWidth = 0.7;
          ctx.stroke();
        }
      }
    }

    // Draw and update particles
    particles.forEach(p => {
      p.x += p.vx;
      p.y += p.vy;

      if (p.x < 0) p.x = width;
      if (p.x > width) p.x = 0;
      if (p.y < 0) p.y = height;
      if (p.y > height) p.y = 0;

      // Slight mouse repulsion
      const mdx = p.x - mouseX;
      const mdy = p.y - mouseY;
      const mdist = Math.sqrt(mdx * mdx + mdy * mdy);
      if (mdist < 80) {
        p.x += (mdx / mdist) * 1.2;
        p.y += (mdy / mdist) * 1.2;
      }

      ctx.beginPath();
      ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
      ctx.fillStyle = particleColor;
      ctx.fill();
    });

    requestAnimationFrame(render);
  }

  render();
}

/* ==========================================================================
   5. Live GitHub Data Fetching (User: Unknownknowns1)
   ========================================================================== */
async function fetchGitHubData() {
  const username = 'Unknownknowns1';
  const container = document.getElementById('github-repos-container');
  const repoCountEl = document.getElementById('gh-repos-count');
  const bioEl = document.getElementById('gh-bio');
  const avatarEl = document.getElementById('gh-avatar');

  // Fallback curated repositories in case of GitHub rate limiting
  const fallbackRepos = [
    {
      name: "DRK-hackathon-1",
      description: "Predictive Cybercrime Location Dashboard with 3D PyDeck and scikit-learn models.",
      language: "Python",
      html_url: "https://github.com/Unknownknowns1/DRK-hackathon-1",
      stargazers_count: 0
    },
    {
      name: "gsi-action_toolkit",
      description: "Android Generic System Image (GSI) automation, thermal optimizations, and kernel scripts.",
      language: "Shell",
      html_url: "https://github.com/Unknownknowns1/gsi-action_toolkit",
      stargazers_count: 0
    },
    {
      name: "sql-agent-sai",
      description: "Intelligent autonomous Natural Language to SQL query agent with schema validation.",
      language: "Python",
      html_url: "https://github.com/Unknownknowns1/sql-agent-sai",
      stargazers_count: 0
    },
    {
      name: "TGS_WEB_INFO-1",
      description: "Automated web data ingestion, information processing, and analysis pipeline.",
      language: "Python",
      html_url: "https://github.com/Unknownknowns1/TGS_WEB_INFO-1",
      stargazers_count: 0
    },
    {
      name: "TGS_1",
      description: "Core algorithmic and automation modules for data extraction and system tools.",
      language: "Python",
      html_url: "https://github.com/Unknownknowns1/TGS_1",
      stargazers_count: 0
    }
  ];

  try {
    // Fetch user profile info
    const userRes = await fetch(`https://api.github.com/users/${username}`);
    if (userRes.ok) {
      const userData = await userRes.json();
      if (repoCountEl && userData.public_repos !== undefined) {
        repoCountEl.textContent = userData.public_repos;
      }
      if (bioEl && userData.bio) {
        bioEl.textContent = userData.bio;
      }
      if (avatarEl && userData.avatar_url) {
        avatarEl.src = userData.avatar_url;
      }
    }

    // Fetch user repositories
    const reposRes = await fetch(`https://api.github.com/users/${username}/repos?sort=updated&per_page=6`);
    if (reposRes.ok) {
      const repos = await reposRes.json();
      if (Array.isArray(repos) && repos.length > 0) {
        renderRepos(repos, container);
        return;
      }
    }
    // Fallback if empty or failed
    renderRepos(fallbackRepos, container);
  } catch (err) {
    console.warn('GitHub API rate limited or network issue, using curated repositories:', err);
    renderRepos(fallbackRepos, container);
  }
}

function renderRepos(repos, container) {
  if (!container) return;
  container.innerHTML = '';

  repos.slice(0, 6).forEach(repo => {
    const lang = repo.language || 'Code';
    let langColor = 'bg-cyan-500';
    if (lang === 'Python') langColor = 'bg-yellow-500';
    if (lang === 'Shell') langColor = 'bg-emerald-500';
    if (lang === 'C' || lang === 'C++') langColor = 'bg-blue-500';

    const card = document.createElement('a');
    card.href = repo.html_url;
    card.target = '_blank';
    card.rel = 'noopener noreferrer';
    card.className = 'group p-5 rounded-2xl bg-slate-50 hover:bg-slate-100 dark:bg-slate-800/40 dark:hover:bg-slate-800/80 border border-slate-200 dark:border-white/5 hover:border-cyan-500/50 transition-all flex flex-col justify-between shadow-sm';

    card.innerHTML = `
      <div>
        <div class="flex items-center justify-between text-xs font-mono mb-2">
          <span class="flex items-center gap-1.5 text-cyan-700 dark:text-cyan-400 font-semibold group-hover:text-cyan-600 dark:group-hover:text-cyan-300">
            <i data-lucide="folder-git-2" class="w-4 h-4"></i>
            ${repo.name}
          </span>
          <i data-lucide="arrow-up-right" class="w-3.5 h-3.5 text-slate-400 group-hover:text-cyan-600 dark:group-hover:text-cyan-400 transition-colors"></i>
        </div>
        <p class="text-xs text-slate-600 dark:text-slate-400 line-clamp-2 leading-relaxed">
          ${repo.description || 'Public open-source repository and experimental modules by Sai Harshith.'}
        </p>
      </div>

      <div class="flex items-center gap-4 text-[11px] font-mono text-slate-500 dark:text-slate-400 pt-3 mt-2 border-t border-slate-200 dark:border-white/5">
        <span class="flex items-center gap-1.5">
          <span class="w-2 h-2 rounded-full ${langColor}"></span>
          ${lang}
        </span>
        <span class="flex items-center gap-1">
          <i data-lucide="star" class="w-3 h-3 text-amber-500 dark:text-amber-400"></i>
          ${repo.stargazers_count || 0}
        </span>
      </div>
    `;

    container.appendChild(card);
  });

  if (window.lucide) {
    lucide.createIcons();
  }
}

/* ==========================================================================
   6. Interactive CLI Terminal Drawer / Modal
   ========================================================================== */
function initTerminal() {
  const openBtn = document.getElementById('open-terminal-btn');
  const closeBtn = document.getElementById('close-terminal-btn');
  const closeDot = document.getElementById('term-close-dot');
  const modal = document.getElementById('terminal-modal');
  const input = document.getElementById('terminal-input');
  const output = document.getElementById('terminal-output');

  if (!modal || !input || !output) return;

  const commandHistory = [];
  let historyIndex = -1;

  function openTerminal() {
    modal.classList.remove('hidden');
    modal.classList.add('flex');
    input.focus();
  }

  function closeTerminal() {
    modal.classList.add('hidden');
    modal.classList.remove('flex');
  }

  if (openBtn) openBtn.addEventListener('click', openTerminal);
  if (closeBtn) closeBtn.addEventListener('click', closeTerminal);
  if (closeDot) closeDot.addEventListener('click', closeTerminal);

  // Close when clicking modal backdrop
  modal.addEventListener('click', (e) => {
    if (e.target === modal) closeTerminal();
  });

  // Global Keyboard shortcut listener (~ or Ctrl+K or ESC)
  window.addEventListener('keydown', (e) => {
    if (e.key === '`' || e.key === '~') {
      // Don't trigger if typing in a form input
      if (document.activeElement.tagName !== 'INPUT' && document.activeElement.tagName !== 'TEXTAREA') {
        e.preventDefault();
        if (modal.classList.contains('hidden')) {
          openTerminal();
        } else {
          closeTerminal();
        }
      }
    } else if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
      closeTerminal();
    } else if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
      e.preventDefault();
      if (modal.classList.contains('hidden')) {
        openTerminal();
      } else {
        closeTerminal();
      }
    }
  });

  // Command History & Execution
  input.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
      const rawCmd = input.value.trim();
      if (!rawCmd) return;

      commandHistory.push(rawCmd);
      historyIndex = commandHistory.length;

      executeCommand(rawCmd);
      input.value = '';
      output.scrollTop = output.scrollHeight;
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (historyIndex > 0) {
        historyIndex--;
        input.value = commandHistory[historyIndex];
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (historyIndex < commandHistory.length - 1) {
        historyIndex++;
        input.value = commandHistory[historyIndex];
      } else {
        historyIndex = commandHistory.length;
        input.value = '';
      }
    }
  });

  function executeCommand(cmd) {
    const cleanCmd = cmd.toLowerCase().trim();

    // Echo command line
    const echoLine = document.createElement('div');
    echoLine.className = 'flex items-center gap-2 text-slate-400 mt-2';
    echoLine.innerHTML = `<span class="text-emerald-400 font-bold">sai@portfolio:~$</span> <span>${escapeHtml(cmd)}</span>`;
    output.appendChild(echoLine);

    const responseDiv = document.createElement('div');
    responseDiv.className = 'text-slate-300 pl-4 py-1';

    switch (cleanCmd) {
      case 'help':
        responseDiv.innerHTML = `
          <div class="text-cyan-400 font-bold mb-1">Available System Commands:</div>
          <div class="grid grid-cols-2 gap-x-4 gap-y-1 text-slate-300">
            <div><span class="text-emerald-400">help</span> - List all shell commands</div>
            <div><span class="text-emerald-400">theme</span> - Toggle light/dark theme</div>
            <div><span class="text-emerald-400">about</span> - Background & engineering bio</div>
            <div><span class="text-emerald-400">projects</span> - View featured projects</div>
            <div><span class="text-emerald-400">skills</span> - Inspect technical stack</div>
            <div><span class="text-emerald-400">experience</span> - View hackathon & roles</div>
            <div><span class="text-emerald-400">contact</span> - Get direct email & LinkedIn</div>
            <div><span class="text-emerald-400">github</span> - Open official GitHub profile</div>
            <div><span class="text-emerald-400">clear</span> - Clear terminal window</div>
            <div><span class="text-emerald-400">date</span> - Print system timestamp</div>
            <div><span class="text-emerald-400">exit</span> - Close terminal drawer</div>
          </div>
        `;
        break;

      case 'theme':
      case 'mode':
        const newTheme = toggleTheme();
        responseDiv.innerHTML = `<span class="text-emerald-400">Theme switched to <strong>${newTheme}</strong> mode.</span>`;
        break;

      case 'about':
      case 'bio':
        responseDiv.innerHTML = `
          <p class="text-slate-300 leading-relaxed">
            <span class="text-cyan-400 font-bold">G. Sai Harshith</span><br/>
            Computer Science undergraduate specializing in Artificial Intelligence & Machine Learning (CSM) at DRK Institute of Science and Technology, Hyderabad.
            Passionate about bridging high-performance AI models with low-level Linux/Android hardware optimizations.
          </p>
        `;
        break;

      case 'projects':
        responseDiv.innerHTML = `
          <div class="text-cyan-400 font-bold mb-1">Featured Repositories & Dashboards:</div>
          <div class="space-y-2 mt-1">
            <div>
              <span class="text-emerald-400 font-bold">1. Predictive Cybercrime Dashboard (SIH Prototype)</span><br/>
              <span class="text-slate-400">Stack: Python, Streamlit, PyDeck 3D, scikit-learn</span><br/>
              <a href="https://github.com/Unknownknowns1/DRK-hackathon-1" target="_blank" class="text-cyan-400 underline">github.com/Unknownknowns1/DRK-hackathon-1</a>
            </div>
            <div>
              <span class="text-emerald-400 font-bold">2. Custom Android System & GSI Optimization</span><br/>
              <span class="text-slate-400">Stack: Shell Scripting, ADB, Linux, Termux, Kernel Governors</span><br/>
              <a href="https://github.com/Unknownknowns1/gsi-action_toolkit" target="_blank" class="text-cyan-400 underline">github.com/Unknownknowns1/gsi-action_toolkit</a>
            </div>
            <div>
              <span class="text-emerald-400 font-bold">3. Autonomous Natural Language SQL Agent</span><br/>
              <span class="text-slate-400">Stack: Python, MySQL, LLM Agents</span><br/>
              <a href="https://github.com/Unknownknowns1/sql-agent-sai" target="_blank" class="text-cyan-400 underline">github.com/Unknownknowns1/sql-agent-sai</a>
            </div>
          </div>
        `;
        break;

      case 'skills':
        responseDiv.innerHTML = `
          <div class="text-cyan-400 font-bold mb-1">Technical Stack Summary:</div>
          <div class="space-y-1">
            <div><strong class="text-slate-200">Languages:</strong> Python, SQL, C, C++, Shell Scripting</div>
            <div><strong class="text-slate-200">AI / ML & Data:</strong> scikit-learn, pandas, NumPy, Streamlit, PyDeck 3D, Ollama, LM Studio</div>
            <div><strong class="text-slate-200">Systems & Kernel:</strong> Linux, Termux, Android GSI, ADB, Thermal/RAM Governors</div>
            <div><strong class="text-slate-200">Tools:</strong> Git, GitHub, MySQL, VS Code, Google Colab</div>
          </div>
        `;
        break;

      case 'experience':
        responseDiv.innerHTML = `
          <div class="text-cyan-400 font-bold mb-1">Experience & Achievements:</div>
          <ul class="list-disc list-inside space-y-1 text-slate-300">
            <li><span class="text-emerald-400">Smart India Hackathon:</span> Developed 3D predictive spatial cybercrime dashboard prototype.</li>
            <li><span class="text-emerald-400">Open-Source Developer:</span> Engineered Android system tuning scripts & GSI deployment toolkits.</li>
            <li><span class="text-emerald-400">Academic:</span> B.Tech in CSE (AI & ML) at DRK Institute of Science & Technology.</li>
          </ul>
        `;
        break;

      case 'contact':
      case 'email':
        responseDiv.innerHTML = `
          <div class="space-y-1">
            <div>Email: <a href="mailto:saiharshith54321@gmail.com" class="text-cyan-400 underline">saiharshith54321@gmail.com</a></div>
            <div>GitHub: <a href="https://github.com/Unknownknowns1" target="_blank" class="text-cyan-400 underline">github.com/Unknownknowns1</a></div>
            <div>LinkedIn: <a href="https://www.linkedin.com/in/sai-harshith-gunjapadega-769a702a3" target="_blank" class="text-cyan-400 underline">linkedin.com/in/sai-harshith-gunjapadega-769a702a3</a></div>
            <div>Location: Hyderabad, India (IST / Remote)</div>
          </div>
        `;
        break;

      case 'github':
        window.open('https://github.com/Unknownknowns1', '_blank');
        responseDiv.innerHTML = `<span class="text-emerald-400">Opening https://github.com/Unknownknowns1 in a new tab...</span>`;
        break;

      case 'date':
        responseDiv.innerHTML = `<span>${new Date().toString()}</span>`;
        break;

      case 'clear':
        output.innerHTML = '';
        return;

      case 'exit':
      case 'quit':
        closeTerminal();
        return;

      case 'sudo':
        responseDiv.innerHTML = `<span class="text-rose-400">Permission denied: Guest user cannot execute root commands on Sai's workstation :)</span>`;
        break;

      default:
        responseDiv.innerHTML = `
          <span class="text-rose-400">command not found: ${escapeHtml(cleanCmd)}</span>. 
          Type <span class="text-cyan-400 font-bold">help</span> to view all commands.
        `;
        break;
    }

    output.appendChild(responseDiv);
  }
}

/* ==========================================================================
   7. Copy to Clipboard & Toast
   ========================================================================== */
function initCopyButtons() {
  const email = "saiharshith54321@gmail.com";
  const btn1 = document.getElementById('copy-email-btn');
  const btn2 = document.getElementById('copy-email-btn-2');

  function copyEmail() {
    navigator.clipboard.writeText(email).then(() => {
      showToast(`Copied ${email} to clipboard!`);
    }).catch(() => {
      showToast(`Email: ${email}`);
    });
  }

  if (btn1) btn1.addEventListener('click', copyEmail);
  if (btn2) btn2.addEventListener('click', copyEmail);
}

function showToast(message) {
  const toast = document.getElementById('toast');
  const msgEl = document.getElementById('toast-message');
  if (!toast || !msgEl) return;

  msgEl.textContent = message;
  toast.classList.remove('hidden');
  toast.classList.add('flex');

  setTimeout(() => {
    toast.classList.add('hidden');
    toast.classList.remove('flex');
  }, 3000);
}

/* ==========================================================================
   8. Working Contact Form
   ========================================================================== */
function initContactForm() {
  const form = document.getElementById('contact-form');
  const statusEl = document.getElementById('form-status');
  const submitBtn = document.getElementById('submit-btn');

  if (!form) return;

  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const name = form.name.value.trim();
    const email = form.email.value.trim();
    const subject = form.subject.value.trim();
    const message = form.message.value.trim();

    if (!name || !email || !message) {
      if (statusEl) statusEl.textContent = "Please fill in all required fields.";
      return;
    }

    // Set sending state
    submitBtn.disabled = true;
    const originalText = submitBtn.innerHTML;
    submitBtn.innerHTML = `<span>Sending...</span>`;
    if (statusEl) statusEl.textContent = "Dispatching message...";

    try {
      // Using Formspree / Web3Forms endpoint or mailto fallback
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json"
        },
        body: JSON.stringify({
          access_key: "YOUR_WEB3FORMS_ACCESS_KEY", // Free access key or user can add their own
          name: name,
          email: email,
          subject: subject || "Portfolio Inquiry for G. Sai Harshith",
          message: message,
          to_email: "saiharshith54321@gmail.com"
        })
      });

      const result = await response.json();

      if (result.success) {
        showToast("Message sent successfully! Sai will reply soon.");
        if (statusEl) {
          statusEl.textContent = "Message sent successfully!";
          statusEl.className = "text-xs font-mono text-emerald-500";
        }
        form.reset();
      } else {
        // Fallback to mailto link if API key is unconfigured
        const mailtoUrl = `mailto:saiharshith54321@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent("Name: " + name + "\nEmail: " + email + "\n\n" + message)}`;
        window.location.href = mailtoUrl;
        showToast("Opening default email client...");
        if (statusEl) {
          statusEl.textContent = "Opened mail draft in your email client.";
          statusEl.className = "text-xs font-mono text-cyan-600 dark:text-cyan-400";
        }
      }
    } catch (err) {
      // Direct mailto fallback
      const mailtoUrl = `mailto:saiharshith54321@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent("Name: " + name + "\nEmail: " + email + "\n\n" + message)}`;
      window.location.href = mailtoUrl;
      showToast("Opened mail draft in your email client.");
      if (statusEl) {
        statusEl.textContent = "Draft opened in email client.";
        statusEl.className = "text-xs font-mono text-cyan-600 dark:text-cyan-400";
      }
    } finally {
      submitBtn.disabled = false;
      submitBtn.innerHTML = originalText;
      if (window.lucide) lucide.createIcons();
    }
  });
}

function escapeHtml(str) {
  return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}
