// Cyberpunk Hacker Portfolio Logic Engine
// Binds config.js data to HTML structure and manages interactive terminals

document.addEventListener("DOMContentLoaded", () => {
  const config = window.portfolioConfig;
  if (!config) {
    console.error("Configuration file (config.js) not loaded properly.");
    return;
  }

  // --- 1. DOM INITIALIZATION & DATA RENDERING ---
  initSystemHeader(config);
  initOverview(config);
  initExperience(config);
  initProjects(config);
  initSkills(config);
  initCertifications(config);
  initContact(config);
  initArticles(config);

  // --- 2. TAB CONTROL SYSTEM ---
  initTabs();

  // --- 3. PARTICLES.JS BACKGROUND ---
  initParticlesJSBackground();

  // --- 4. TERMINAL SHELL EMULATOR ---
  initTerminal(config);
});

// --- 1. DOM INITIALIZATION FUNCTIONS ---

function initSystemHeader(config) {
  document.getElementById("system-hostname").textContent = `${config.systemStatus.hostName}::${config.personal.statusText}`;
  document.getElementById("ping-value").textContent = config.systemStatus.ping;
  document.getElementById("threat-value").textContent = config.systemStatus.threatLevel;
  document.getElementById("firewall-value").textContent = config.systemStatus.firewallStatus === "BYPASSED" ? "BYPASSED" : "ACTIVE";
  document.getElementById("version-value").textContent = config.systemStatus.agentVersion;
}

function initOverview(config) {
  document.getElementById("hero-role-title").textContent = config.personal.title;
  document.getElementById("hero-subtagline").textContent = config.personal.tagline;
  document.getElementById("overview-greeting").textContent = config.about.greeting;
  
  if (config.personal.avatar) {
    const wrapper = document.getElementById("hero-avatar-container");
    if (wrapper) {
      wrapper.innerHTML = `
        <img src="${config.personal.avatar}" alt="Shariq Malik Avatar" class="cyber-avatar" id="avatar-image">
        <img src="${config.personal.avatar}" alt="Shariq Malik Avatar" class="cyber-avatar cyber-avatar-g1">
        <img src="${config.personal.avatar}" alt="Shariq Malik Avatar" class="cyber-avatar cyber-avatar-g2">
        <div class="cyber-avatar-glitch" id="avatar-glitch-layer"></div>
      `;
    }
  }

  const cvBtn = document.getElementById("download-cv-btn");
  if (cvBtn && config.personal.resumeUrl) {
    cvBtn.href = config.personal.resumeUrl;
  }
  
  const bioContainer = document.getElementById("overview-bio-text");
  bioContainer.innerHTML = "";
  config.about.bio.forEach(para => {
    const p = document.createElement("p");
    p.className = "bio-paragraph";
    p.textContent = para;
    bioContainer.appendChild(p);
  });

  // Create achievements element dynamically if it doesn't exist
  const parent = document.getElementById("panel-overview");
  let achBlock = document.getElementById("overview-achievements-block");
  if (!achBlock && config.achievements) {
    achBlock = document.createElement("div");
    achBlock.className = "terminal-block";
    achBlock.id = "overview-achievements-block";
    achBlock.innerHTML = `
      <div class="terminal-title">TACTICAL ACHIEVEMENTS</div>
      <ul class="timeline-bullets" id="overview-achievements-list" style="list-style:none; margin-top:10px; padding:0;"></ul>
    `;
    parent.appendChild(achBlock);
  }

  const achList = document.getElementById("overview-achievements-list");
  if (achList) {
    achList.innerHTML = "";
    config.achievements.forEach(ach => {
      const li = document.createElement("li");
      li.style.fontSize = "0.9rem";
      li.style.color = "var(--text-secondary)";
      li.style.position = "relative";
      li.style.paddingLeft = "15px";
      li.style.marginBottom = "6px";
      li.innerHTML = `<span style="position:absolute; left:0; color:var(--accent-red); font-family:var(--font-mono); font-size:0.8rem;">&gt;</span> ${ach}`;
      achList.appendChild(li);
    });
  }
}

function initExperience(config) {
  const timeline = document.getElementById("experience-timeline");
  timeline.innerHTML = "";

  config.experience.forEach(companyBlock => {
    const companyDiv = document.createElement("div");
    companyDiv.className = "company-block";
    companyDiv.style.marginBottom = "30px";
    companyDiv.style.position = "relative";
    
    let rolesHtml = "";
    companyBlock.roles.forEach(role => {
      const bulletsHtml = role.bullets.map(b => `<li>${b}</li>`).join("");
      rolesHtml += `
        <div class="timeline-role-item" style="margin-top: 15px; position: relative;">
          <div class="timeline-dot" style="left: -21px; top: 6px; width: 6px; height: 6px; background: var(--accent-red); border-radius: 50%; position: absolute; border: 1px solid var(--bg-primary); box-shadow: var(--glow-shadow-small);"></div>
          <div style="display: flex; justify-content: space-between; align-items: baseline; flex-wrap: wrap; gap: 5px;">
            <h4 style="font-size: 1.05rem; font-weight: 700; color: var(--text-primary);">${role.title}</h4>
            <span class="timeline-period" style="font-family: var(--font-mono); font-size: 0.75rem; color: var(--text-secondary);">${role.period}</span>
          </div>
          <ul class="timeline-bullets" style="margin-top: 8px;">
            ${bulletsHtml}
          </ul>
        </div>
      `;
    });

    companyDiv.innerHTML = `
      <div class="timeline-company-header" style="position: relative;">
        <h3 style="font-size: 1.25rem; font-weight: 700; color: var(--accent-red); font-family: var(--font-sans); border-bottom: 1px dashed rgba(255, 0, 60, 0.25); padding-bottom: 4px;">
          ${companyBlock.company} <span style="font-size: 0.85rem; color: var(--text-muted); font-weight: normal; margin-left: 8px;">— ${companyBlock.location}</span>
        </h3>
      </div>
      ${rolesHtml}
    `;
    timeline.appendChild(companyDiv);
  });
}

function initProjects(config) {
  const grid = document.getElementById("projects-container-grid");
  if (!grid) return;
  grid.innerHTML = "";

  config.projects.forEach(proj => {
    const card = document.createElement("div");
    card.className = "project-card";

    let tagsHtml = proj.tags
      .map(tag => `<span class="project-tag">${tag}</span>`)
      .join("");

    // Check visibility state
    const isPrivate = proj.visibility === "private";
    
    // Set badge style
    const badgeText = isPrivate ? "PRIVATE // SECURE" : "PUBLIC";
    const badgeStyle = isPrivate
      ? "color: var(--accent-red); border: 1px solid var(--accent-red); background: rgba(255, 0, 60, 0.05);"
      : "color: var(--color-green); border: 1px solid var(--color-green); background: rgba(0, 255, 136, 0.05);";

    // Set action element (disabled state for private, active download for public)
    const actionHtml = isPrivate
      ? `<span class="project-link" style="color: var(--text-muted); cursor: not-allowed; opacity: 0.65; text-shadow: none;">
          <i class="fa-solid fa-lock"></i> ACCESS_RESTRICTED
         </span>`
      : `<a href="${proj.url}" target="_blank" class="project-link" rel="noopener noreferrer">
          <i class="fa-solid fa-code-fork"></i> LOAD_PAYLOAD
         </a>`;

    if (isPrivate) {
      card.style.borderColor = "rgba(255, 0, 60, 0.2)";
    }

    card.innerHTML = `
      <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 8px;">
        <span class="project-category">${proj.category}</span>
        <span style="font-family: var(--font-mono); font-size: 0.62rem; padding: 2px 8px; border-radius: 2px; text-transform: uppercase; letter-spacing: 0.5px; ${badgeStyle}">${badgeText}</span>
      </div>
      <h3 class="project-title" style="${isPrivate ? 'color: var(--text-secondary); opacity: 0.9;' : ''}">${proj.title}</h3>
      <p class="project-description">${proj.description}</p>
      <div class="project-tags">
        ${tagsHtml}
      </div>
      ${actionHtml}
    `;
    grid.appendChild(card);
  });
}

function initSkills(config) {
  const container = document.getElementById("skills-container-grid");
  container.innerHTML = "";

  // Group skills by category
  const categories = {
    offensive: "Adversary Simulation & Offensive Security",
    programming: "Development & Security Automation",
    monitoring: "Infrastructure, Defense & Monitoring"
  };

  Object.entries(categories).forEach(([key, title]) => {
    const section = document.createElement("div");
    section.className = "skills-section-wrapper";
    
    const catTitle = document.createElement("div");
    catTitle.className = "skill-category-title";
    catTitle.textContent = title;
    section.appendChild(catTitle);

    const list = document.createElement("div");
    list.className = "skills-list";

    const filtered = config.skills.filter(s => s.category === key);
    filtered.forEach(skill => {
      const item = document.createElement("div");
      item.className = "skill-item";
      item.innerHTML = `
        <div class="skill-info">
          <span class="skill-name">${skill.name}</span>
          <span class="skill-percentage">${skill.level}%</span>
        </div>
        <div class="skill-bar-container">
          <div class="skill-bar-fill" data-level="${skill.level}"></div>
        </div>
      `;
      list.appendChild(item);
    });

    section.appendChild(list);
    container.appendChild(section);
  });
}

function initCertifications(config) {
  const container = document.getElementById("certifications-container-list");
  if (!container) return;
  container.innerHTML = "";

  config.certifications.forEach(cert => {
    const card = document.createElement("div");
    
    // Check if in progress
    const isInProgress = cert.status === "in-progress";
    
    card.className = "cert-card";
    if (isInProgress) {
      card.style.borderColor = "rgba(255, 170, 0, 0.25)";
      card.style.background = "rgba(255, 170, 0, 0.01)";
    }

    const badgeText = isInProgress ? "IN PROGRESS" : "GRANTED";
    const badgeIcon = isInProgress ? "fa-spinner fa-spin" : "fa-circle-check";
    const badgeStyle = isInProgress 
      ? "color: #ffaa00; border-color: #ffaa00; background: rgba(255, 170, 0, 0.05);" 
      : "";

    card.innerHTML = `
      <div class="cert-info">
        <h3 class="cert-name" style="${isInProgress ? 'color: var(--text-secondary); opacity: 0.85;' : ''}">${cert.name}</h3>
        <span class="cert-issuer">${cert.issuer}</span>
      </div>
      <div class="cert-badge" style="${badgeStyle}"><i class="fa-solid ${badgeIcon}"></i> ${badgeText}</div>
    `;
    container.appendChild(card);
  });
}

function getSocialChannels(socialsConfig) {
  if (!socialsConfig) return [];
  const channels = [];

  const platformMeta = {
    email: {
      label: "SECURE_EMAIL",
      href: v => `mailto:${v}`,
      text: v => v,
      icon: '<i class="fa-solid fa-envelope"></i>'
    },
    github: {
      label: "GITHUB_NODE",
      href: v => v.startsWith("http") ? v : `https://github.com/${v}`,
      text: v => v.startsWith("http") ? v.replace(/https?:\/\/(www\.)?/, "") : `github.com/${v}`,
      icon: '<i class="fa-brands fa-github"></i>'
    },
    linkedin: {
      label: "LINKEDIN_PORT",
      href: v => v.startsWith("http") ? v : `https://linkedin.com/in/${v}`,
      text: v => v.startsWith("http") ? v.replace(/https?:\/\/(www\.)?/, "") : `linkedin.com/in/${v}`,
      icon: '<i class="fa-brands fa-linkedin-in"></i>'
    },
    twitter: {
      label: "TWITTER_NET",
      href: v => v.startsWith("http") ? v : `https://x.com/${v}`,
      text: v => v.startsWith("http") ? v.replace(/https?:\/\/(www\.)?/, "") : `x.com/${v}`,
      icon: '<i class="fa-brands fa-x-twitter"></i>'
    },
    fiverr: {
      label: "FIVERR_PRO",
      href: v => v.startsWith("http") ? v : `https://www.fiverr.com/${v}`,
      text: v => {
        const user = v.startsWith("http") ? v.replace(/https?:\/\/(www\.)?fiverr\.com\//, "") : v;
        return `fiverr.com/${user}`;
      },
      icon: `<svg viewBox="0 0 508.02 508.02" class="svg-inline-icon" style="width:20px; height:20px; display:block;">
        <defs><style>.fiverr-a{fill:currentColor;}.fiverr-b{fill:var(--bg-primary);}</style></defs>
        <circle class="fiverr-a" cx="254.01" cy="254.01" r="254.01"/>
        <circle class="fiverr-b" cx="315.97" cy="162.19" r="26.87"/>
        <path class="fiverr-b" d="M345.87,207.66h-123V199.6c0-15.83,15.83-16.13,23.89-16.13,9.25,0,13.44.9,13.44.9v-43.6a155.21,155.21,0,0,0-19.71-1.19c-25.68,0-73.16,7.16-73.16,61.51V208h-22.4v40.31h22.4v85.1h-20.9v40.31H247.34V333.37H222.85v-85.1H290v85.1H269.13v40.31h97.65V333.37H345.87Z" transform="translate(-1.83 -0.98)"/>
      </svg>`
    },
    upwork: {
      label: "UPWORK_PRO",
      href: v => v.startsWith("http") ? v : `https://www.upwork.com/freelancers/~${v}`,
      text: v => {
        const user = v.startsWith("http") ? v.replace(/https?:\/\/(www\.)?upwork\.com\/(freelancers\/~)?/, "") : v;
        return `upwork.com/~${user.substring(0, 10)}...`;
      },
      icon: `<svg viewBox="0 0 24 24" class="svg-inline-icon" fill="currentColor" style="width:20px; height:20px; display:block;" xmlns="http://www.w3.org/2000/svg">
        <title>Upwork icon</title>
        <path d="M18.561 13.158c-1.102 0-2.135-.467-3.074-1.227l.228-1.076.008-.042c.207-1.143.849-3.06 2.839-3.06 1.492 0 2.703 1.212 2.703 2.703-.001 1.489-1.212 2.702-2.704 2.702zm0-8.14c-2.539 0-4.51 1.649-5.31 4.366-1.22-1.834-2.148-4.036-2.687-5.892H7.828v7.112c-.002 1.406-1.141 2.546-2.547 2.548-1.405-.002-2.543-1.143-2.545-2.548V3.492H0v7.112c0 2.914 2.37 5.303 5.281 5.303 2.913 0 5.283-2.389 5.283-5.303v-1.19c.529 1.107 1.182 2.229 1.974 3.221l-1.673 7.873h2.797l1.213-5.71c1.063.679 2.285 1.109 3.686 1.109 3 0 5.439-2.452 5.439-5.45 0-3-2.439-5.439-5.439-5.439z"/>
      </svg>`
    },
    hackthebox: {
      label: "HTB_CLEARANCE",
      href: v => v.startsWith("http") ? v : `https://app.hackthebox.com/users/${v}`,
      text: v => {
        const user = v.startsWith("http") ? v.replace(/https?:\/\/(app\.|www\.)?hackthebox\.(com|eu)\/users\//, "") : v;
        return `htb/${user}`;
      },
      icon: `<svg viewBox="0 0 24 24" class="svg-inline-icon" fill="currentColor" style="width:20px; height:20px; display:block;">
        <path d="M11.996 0a1.119 1.119 0 0 0-.057.003.9.9 0 0 0-.236.05.907.907 0 0 0-.165.079L1.936 5.675a.889.889 0 0 0-.445.77v11.111a.889.889 0 0 0 .47.784l9.598 5.541.054.029v.002a.857.857 0 0 0 .083.035l.012.004c.028.01.056.018.085.024.01.001.011.003.016.004a.93.93 0 0 0 .296.015.683.683 0 0 0 .086-.015c.01 0 .011-.002.016-.004a.94.94 0 0 0 .085-.024l.012-.004a.882.882 0 0 0 .083-.035v-.002a1.086 1.086 0 0 0 .054-.029l9.599-5.541a.889.889 0 0 0 .469-.784V6.48l-.001-.026v-.008a.889.889 0 0 0-.312-.676l-.029-.024c0-.002-.01-.005-.01-.007a.899.899 0 0 0-.107-.07L12.453.127A.887.887 0 0 0 11.99 0zm.01 2.253c.072 0 .144.019.209.056l6.537 3.774a.418.418 0 0 1 0 .724l-6.537 3.774a.418.418 0 0 1-.418 0L5.26 6.807a.418.418 0 0 1 0-.724l6.537-3.774a.42.42 0 0 1 .209-.056zm-8.08 6.458a.414.414 0 0 1 .215.057l6.524 3.766a.417.417 0 0 1 .208.361v7.533a.417.417 0 0 1-.626.361l-6.523-3.766a.417.417 0 0 1-.209-.362V9.13c0-.241.196-.414.41-.418zm16.16 0c.215.004.41.177.41.418v7.532a.42.42 0 0 1-.208.362l-6.524 3.766a.417.417 0 0 1-.626-.361v-7.533c0-.149.08-.286.209-.36l6.523-3.767a.415.415 0 0 1 .216-.057z"/>
      </svg>`
    },
    tryhackme: {
      label: "THM_RANKING",
      href: v => v.startsWith("http") ? v : `https://tryhackme.com/p/${v}`,
      text: v => {
        const user = v.startsWith("http") ? v.replace(/https?:\/\/(www\.)?tryhackme\.com\/p\//, "") : v;
        return `tryhackme.com/p/${user}`;
      },
      icon: `<svg viewBox="0 0 24 24" class="svg-inline-icon" fill="currentColor" style="width:20px; height:20px; display:block;" xmlns="http://www.w3.org/2000/svg">
        <title>TryHackMe</title>
        <path d="M10.705 0C7.54 0 4.902 2.285 4.349 5.291a4.525 4.525 0 0 0 -4.107 4.5 4.525 4.525 0 0 0 4.52 4.52h6.761a0.625 0.625 0 1 0 0 -1.25H4.761a3.273 3.273 0 0 1 -3.27 -3.27A3.273 3.273 0 0 1 6.59 7.08a0.625 0.625 0 0 0 0.7 -1.035 4.488 4.488 0 0 0 -1.68 -0.69 5.223 5.223 0 0 1 5.096 -4.104 5.221 5.221 0 0 1 5.174 4.57 4.489 4.489 0 0 0 -0.488 0.305 0.625 0.625 0 1 0 0.731 1.013 3.245 3.245 0 0 1 1.912 -0.616 3.278 3.278 0 0 1 3.203 2.61 0.625 0.625 0 0 0 1.225 -0.251 4.533 4.533 0 0 0 -4.428 -3.61 4.54 4.54 0 0 0 -0.958 0.105C16.556 2.328 13.9 0 10.705 0zm5.192 10.64a0.925 0.925 0 0 0 -0.462 0.108 0.913 0.913 0 0 0 -0.313 0.29 1.27 1.27 0 0 0 -0.175 0.427 2.39 2.39 0 0 0 -0.054 0.514c0 0.181 0.018 0.353 0.054 0.517 0.036 0.164 0.095 0.307 0.175 0.43a0.899 0.899 0 0 0 0.313 0.297c0.127 0.073 0.281 0.11 0.462 0.11 0.18 0 0.334 -0.037 0.46 -0.11a0.897 0.897 0 0 0 0.309 -0.296c0.08 -0.124 0.137 -0.267 0.173 -0.431 0.036 -0.164 0.054 -0.336 0.054 -0.517 0 -0.18 -0.018 -0.352 -0.054 -0.514a1.271 1.271 0 0 0 -0.173 -0.426 0.901 0.901 0 0 0 -0.309 -0.291 0.917 0.917 0 0 0 -0.46 -0.108zm6.486 0a0.925 0.925 0 0 0 -0.462 0.108 0.913 0.913 0 0 0 -0.313 0.29 1.27 1.27 0 0 0 -0.175 0.427 2.39 2.39 0 0 0 -0.053 0.514c0 0.181 0.017 0.353 0.053 0.517 0.036 0.164 0.095 0.307 0.175 0.43a0.899 0.899 0 0 0 0.313 0.297c0.127 0.073 0.281 0.11 0.462 0.11 0.18 0 0.334 -0.037 0.46 -0.11a0.897 0.897 0 0 0 0.31 -0.296c0.078 -0.124 0.136 -0.267 0.172 -0.431 0.036 -0.164 0.054 -0.336 0.054 -0.517 0 -0.18 -0.018 -0.352 -0.054 -0.514a1.271 1.271 0 0 0 -0.173 -0.426 0.901 0.901 0 0 0 -0.308 -0.291 0.916 0.916 0 0 0 -0.461 -0.108zm-8.537 0.068 -0.84 0.618 0.313 0.43 0.476 -0.368v1.877h0.603v-2.557zm6.486 0 -0.841 0.618 0.314 0.43 0.477 -0.368v1.877h0.603v-2.557zm-4.435 0.445c0.08 0 0.143 0.028 0.193 0.084 0.05 0.057 0.087 0.127 0.114 0.21 0.026 0.083 0.044 0.173 0.054 0.269a2.541 2.541 0 0 1 0 0.533c-0.01 0.097 -0.028 0.187 -0.054 0.27a0.584 0.584 0 0 1 -0.114 0.21 0.243 0.243 0 0 1 -0.193 0.085 0.248 0.248 0 0 1 -0.195 -0.086 0.584 0.584 0 0 1 -0.118 -0.209 1.245 1.245 0 0 1 -0.056 -0.27 2.645 2.645 0 0 1 0 -0.533c0.01 -0.096 0.029 -0.186 0.056 -0.27a0.583 0.583 0 0 1 0.118 -0.209 0.25 0.25 0 0 1 0.195 -0.084zm6.486 0c0.08 0 0.144 0.028 0.193 0.084 0.05 0.057 0.087 0.127 0.114 0.21 0.027 0.083 0.044 0.173 0.054 0.269a2.541 2.541 0 0 1 0 0.533c-0.01 0.097 -0.027 0.187 -0.054 0.27a0.584 0.584 0 0 1 -0.114 0.21 0.243 0.243 0 0 1 -0.193 0.085 0.249 0.249 0 0 1 -0.195 -0.086 0.581 0.581 0 0 1 -0.117 -0.209 1.245 1.245 0 0 1 -0.056 -0.27 2.642 2.642 0 0 1 0 -0.533c0.01 -0.096 0.028 -0.186 0.056 -0.27a0.58 0.58 0 0 1 0.117 -0.209 0.25 0.25 0 0 1 0.195 -0.084zm-2.191 3.51a0.93 0.93 0 0 0 -0.463 0.109 0.908 0.908 0 0 0 -0.312 0.291c-0.08 0.122 -0.139 0.263 -0.175 0.426a2.383 2.383 0 0 0 -0.054 0.514c0 0.18 0.018 0.353 0.054 0.516 0.036 0.164 0.094 0.308 0.175 0.432a0.91 0.91 0 0 0 0.312 0.296 0.92 0.92 0 0 0 0.463 0.11c0.18 0 0.333 -0.037 0.46 -0.11a0.892 0.892 0 0 0 0.308 -0.296 1.32 1.32 0 0 0 0.174 -0.432c0.036 -0.163 0.054 -0.335 0.054 -0.516 0 -0.18 -0.018 -0.352 -0.054 -0.514a1.274 1.274 0 0 0 -0.174 -0.426 0.89 0.89 0 0 0 -0.309 -0.291 0.918 0.918 0 0 0 -0.46 -0.108zm-6.402 0.07 -0.841 0.617 0.314 0.43 0.476 -0.369v1.878h0.604v-2.557zm2.125 0 -0.841 0.617 0.314 0.43 0.477 -0.369v1.878h0.603v-2.557zm2.116 0 -0.84 0.617 0.313 0.43 0.477 -0.369v1.878h0.603v-2.557zm2.16 0.443c0.08 0 0.144 0.028 0.194 0.085a0.605 0.605 0 0 1 0.114 0.21c0.026 0.083 0.044 0.172 0.053 0.269a2.639 2.639 0 0 1 0 0.532 1.28 1.28 0 0 1 -0.053 0.27 0.585 0.585 0 0 1 -0.114 0.21 0.244 0.244 0 0 1 -0.193 0.085 0.25 0.25 0 0 1 -0.196 -0.085 0.589 0.589 0 0 1 -0.117 -0.21 1.245 1.245 0 0 1 -0.056 -0.27 2.597 2.597 0 0 1 0 -0.532c0.01 -0.097 0.028 -0.186 0.056 -0.27a0.589 0.589 0 0 1 0.117 -0.209 0.249 0.249 0 0 1 0.196 -0.085zm-6.729 3.073a0.676 0.676 0 0 0 -0.335 0.078 0.661 0.661 0 0 0 -0.227 0.211 0.91 0.91 0 0 0 -0.127 0.31c-0.027 0.118 -0.04 0.242 -0.04 0.373s0.013 0.256 0.04 0.375a0.93 0.93 0 0 0 0.127 0.313 0.65 0.65 0 0 0 0.227 0.215c0.092 0.053 0.204 0.08 0.335 0.08a0.655 0.655 0 0 0 0.334 -0.08 0.65 0.65 0 0 0 0.225 -0.215c0.057 -0.09 0.1 -0.194 0.125 -0.313a1.75 1.75 0 0 0 0.04 -0.375c0 -0.13 -0.014 -0.255 -0.04 -0.373a0.931 0.931 0 0 0 -0.125 -0.31 0.658 0.658 0 0 0 -0.225 -0.21 0.667 0.667 0 0 0 -0.334 -0.08zm3.086 0a0.675 0.675 0 0 0 -0.336 0.078 0.661 0.661 0 0 0 -0.226 0.211 0.907 0.907 0 0 0 -0.127 0.31 1.69 1.69 0 0 0 -0.04 0.373c0 0.131 0.013 0.256 0.04 0.375a0.928 0.928 0 0 0 0.127 0.313c0.058 0.09 0.134 0.162 0.226 0.215 0.093 0.053 0.205 0.08 0.336 0.08a0.655 0.655 0 0 0 0.334 -0.08 0.65 0.65 0 0 0 0.224 -0.215c0.058 -0.09 0.1 -0.194 0.126 -0.313a1.752 1.752 0 0 0 0 -0.748 0.94 0.94 0 0 0 -0.126 -0.31 0.657 0.657 0 0 0 -0.224 -0.21 0.667 0.667 0 0 0 -0.334 -0.08zm5.108 0a0.675 0.675 0 0 0 -0.336 0.078 0.661 0.661 0 0 0 -0.226 0.211 0.91 0.91 0 0 0 -0.127 0.31c-0.027 0.118 -0.04 0.242 -0.04 0.373s0.013 0.256 0.04 0.375a0.931 0.931 0 0 0 0.127 0.313c0.058 0.09 0.134 0.162 0.226 0.215 0.093 0.053 0.205 0.08 0.336 0.08 0.13 0 0.243 -0.027 0.334 -0.08a0.65 0.65 0 0 0 0.224 -0.215c0.058 -0.09 0.1 -0.194 0.126 -0.313a1.75 1.75 0 0 0 0.04 -0.375c0 -0.13 -0.014 -0.255 -0.04 -0.373a0.943 0.943 0 0 0 -0.126 -0.31 0.657 0.657 0 0 0 -0.224 -0.21 0.668 0.668 0 0 0 -0.334 -0.08zm-6.658 0.05 -0.61 0.448 0.227 0.311 0.346 -0.266v1.362h0.438v-1.856zm3.068 0 -0.61 0.448 0.227 0.311 0.346 -0.266v1.362h0.438v-1.856zm5.108 0 -0.611 0.448 0.228 0.311 0.346 -0.266v1.362h0.438v-1.856zm-9.712 0.322c0.058 0 0.105 0.02 0.14 0.062a0.421 0.421 0 0 1 0.083 0.151 0.96 0.96 0 0 1 0.04 0.196 1.932 1.932 0 0 1 0 0.386 0.954 0.954 0 0 1 -0.04 0.197 0.421 0.421 0 0 1 -0.083 0.152 0.176 0.176 0 0 1 -0.14 0.061 0.18 0.18 0 0 1 -0.141 -0.06 0.427 0.427 0 0 1 -0.085 -0.153 0.887 0.887 0 0 1 -0.041 -0.197 1.96 1.96 0 0 1 0 -0.386 0.893 0.893 0 0 1 0.04 -0.196 0.42 0.42 0 0 1 0.086 -0.151 0.181 0.181 0 0 1 0.141 -0.062zm3.086 0c0.058 0 0.104 0.02 0.14 0.062a0.421 0.421 0 0 1 0.082 0.151 0.94 0.94 0 0 1 0.04 0.196 1.906 1.906 0 0 1 0 0.386 0.93 0.93 0 0 1 -0.04 0.197 0.421 0.421 0 0 1 -0.082 0.152 0.176 0.176 0 0 1 -0.14 0.061 0.18 0.18 0 0 1 -0.141 -0.06 0.42 0.42 0 0 1 -0.086 -0.153 0.846 0.846 0 0 1 -0.04 -0.197 1.965 1.965 0 0 1 -0.011 -0.195c0 -0.057 0.004 -0.121 0.01 -0.191a0.849 0.849 0 0 1 0.041 -0.196 0.42 0.42 0 0 1 0.086 -0.151 0.182 0.182 0 0 1 0.141 -0.062zm5.108 0c0.058 0 0.104 0.02 0.14 0.062a0.421 0.421 0 0 1 0.082 0.151 0.92 0.92 0 0 1 0.04 0.196 1.963 1.963 0 0 1 0 0.386 0.943 0.943 0 0 1 -0.04 0.197 0.421 0.421 0 0 1 -0.082 0.152 0.177 0.177 0 0 1 -0.14 0.061 0.18 0.18 0 0 1 -0.142 -0.06 0.437 0.437 0 0 1 -0.085 -0.153 0.95 0.95 0 0 1 -0.04 -0.197 1.965 1.965 0 0 1 -0.011 -0.195c0 -0.057 0.004 -0.121 0.01 -0.191a0.959 0.959 0 0 1 0.04 -0.196 0.47 0.47 0 0 1 0.086 -0.151 0.181 0.181 0 0 1 0.142 -0.062zm-1.684 1.814a0.675 0.675 0 0 0 -0.336 0.079 0.66 0.66 0 0 0 -0.227 0.21 0.91 0.91 0 0 0 -0.127 0.31 1.731 1.731 0 0 0 0 0.748 0.939 0.939 0 0 0 0.127 0.314c0.059 0.09 0.134 0.162 0.227 0.215 0.093 0.053 0.205 0.08 0.336 0.08a0.66 0.66 0 0 0 0.334 -0.08 0.648 0.648 0 0 0 0.224 -0.215c0.058 -0.09 0.1 -0.195 0.126 -0.314a1.737 1.737 0 0 0 -0.001 -0.747 0.928 0.928 0 0 0 -0.125 -0.31 0.65 0.65 0 0 0 -0.224 -0.211 0.668 0.668 0 0 0 -0.334 -0.079zm3.063 0a0.676 0.676 0 0 0 -0.336 0.079 0.664 0.664 0 0 0 -0.227 0.21 0.906 0.906 0 0 0 -0.127 0.31 1.74 1.74 0 0 0 0 0.748 0.936 0.936 0 0 0 0.127 0.314 0.66 0.66 0 0 0 0.227 0.215c0.092 0.053 0.204 0.08 0.336 0.08a0.654 0.654 0 0 0 0.334 -0.08 0.648 0.648 0 0 0 0.223 -0.215c0.058 -0.09 0.1 -0.195 0.126 -0.314a1.74 1.74 0 0 0 0 -0.747 0.928 0.928 0 0 0 -0.126 -0.31 0.65 0.65 0 0 0 -0.223 -0.211 0.666 0.666 0 0 0 -0.334 -0.079zm-1.545 0.05 -0.611 0.448 0.228 0.312 0.346 -0.267v1.363h0.438v-1.856zm-1.518 0.323c0.057 0 0.104 0.02 0.14 0.061a0.42 0.42 0 0 1 0.082 0.152 0.91 0.91 0 0 1 0.04 0.195 1.966 1.966 0 0 1 0 0.387 0.951 0.951 0 0 1 -0.04 0.197 0.421 0.421 0 0 1 -0.082 0.152 0.177 0.177 0 0 1 -0.14 0.06 0.18 0.18 0 0 1 -0.142 -0.06 0.428 0.428 0 0 1 -0.085 -0.152 0.914 0.914 0 0 1 -0.04 -0.197 1.96 1.96 0 0 1 -0.011 -0.195c0 -0.058 0.003 -0.122 0.01 -0.192a0.923 0.923 0 0 1 0.041 -0.195c0.02 -0.06 0.048 -0.11 0.085 -0.152a0.181 0.181 0 0 1 0.142 -0.061zm3.063 0c0.057 0 0.104 0.02 0.14 0.061a0.42 0.42 0 0 1 0.082 0.152 0.94 0.94 0 0 1 0.04 0.195 1.91 1.91 0 0 1 0 0.387 0.93 0.93 0 0 1 -0.04 0.197 0.422 0.422 0 0 1 -0.083 0.152 0.175 0.175 0 0 1 -0.14 0.06 0.18 0.18 0 0 1 -0.141 -0.06 0.423 0.423 0 0 1 -0.085 -0.152 0.907 0.907 0 0 1 -0.04 -0.197 1.95 1.95 0 0 1 0 -0.387 0.915 0.915 0 0 1 0.04 -0.195c0.02 -0.06 0.048 -0.11 0.085 -0.152a0.182 0.182 0 0 1 0.142 -0.061zm-9.713 0.185a0.465 0.465 0 0 0 -0.232 0.055 0.456 0.456 0 0 0 -0.157 0.146 0.627 0.627 0 0 0 -0.089 0.215 1.168 1.168 0 0 0 -0.027 0.259c0 0.09 0.009 0.177 0.027 0.26a0.648 0.648 0 0 0 0.089 0.216c0.04 0.063 0.093 0.112 0.157 0.149a0.459 0.459 0 0 0 0.232 0.056c0.09 0 0.168 -0.02 0.231 -0.056a0.45 0.45 0 0 0 0.156 -0.149 0.67 0.67 0 0 0 0.087 -0.217 1.218 1.218 0 0 0 0 -0.518 0.647 0.647 0 0 0 -0.087 -0.215 0.448 0.448 0 0 0 -0.156 -0.146 0.458 0.458 0 0 0 -0.23 -0.055zm1.052 0.035 -0.423 0.31 0.158 0.217 0.24 -0.185v0.944h0.303v-1.286zm-1.052 0.224c0.04 0 0.073 0.014 0.097 0.042a0.284 0.284 0 0 1 0.057 0.105 0.69 0.69 0 0 1 0.028 0.136c0.004 0.049 0.007 0.092 0.007 0.133 0 0.04 -0.003 0.086 -0.007 0.135a0.684 0.684 0 0 1 -0.028 0.136 0.285 0.285 0 0 1 -0.057 0.105 0.123 0.123 0 0 1 -0.097 0.043 0.125 0.125 0 0 1 -0.098 -0.043 0.298 0.298 0 0 1 -0.059 -0.105 0.612 0.612 0 0 1 -0.028 -0.136 1.39 1.39 0 0 1 0 -0.268 0.62 0.62 0 0 1 0.028 -0.136 0.297 0.297 0 0 1 0.06 -0.105 0.125 0.125 0 0 1 0.097 -0.042zm3.775 1.394a0.463 0.463 0 0 0 -0.232 0.054 0.452 0.452 0 0 0 -0.157 0.146 0.621 0.621 0 0 0 -0.088 0.214 1.19 1.19 0 0 0 0 0.519 0.641 0.641 0 0 0 0.088 0.217 0.46 0.46 0 0 0 0.157 0.15 0.458 0.458 0 0 0 0.232 0.054 0.454 0.454 0 0 0 0.232 -0.055 0.45 0.45 0 0 0 0.155 -0.149 0.664 0.664 0 0 0 0.087 -0.217 1.189 1.189 0 0 0 0 -0.519 0.642 0.642 0 0 0 -0.087 -0.214 0.446 0.446 0 0 0 -0.155 -0.146 0.459 0.459 0 0 0 -0.232 -0.054zm1.052 0.034 -0.423 0.31 0.158 0.216 0.24 -0.185v0.945h0.303V22.68zm-1.052 0.223c0.04 0 0.073 0.014 0.098 0.043a0.3 0.3 0 0 1 0.057 0.105 0.643 0.643 0 0 1 0.027 0.135 1.31 1.31 0 0 1 0 0.268 0.654 0.654 0 0 1 -0.027 0.137 0.307 0.307 0 0 1 -0.057 0.105 0.124 0.124 0 0 1 -0.098 0.042 0.125 0.125 0 0 1 -0.098 -0.042 0.293 0.293 0 0 1 -0.059 -0.105 0.618 0.618 0 0 1 -0.028 -0.137 1.364 1.364 0 0 1 0 -0.268 0.612 0.612 0 0 1 0.028 -0.135 0.287 0.287 0 0 1 0.06 -0.105 0.123 0.123 0 0 1 0.097 -0.043z" fill="currentColor" stroke-width="1"></path>
      </svg>`
    },
    hackerone: {
      label: "H1_INTEL",
      href: v => v.startsWith("http") ? v : `https://hackerone.com/${v}`,
      text: v => {
        const user = v.startsWith("http") ? v.replace(/https?:\/\/(www\.)?hackerone\.com\//, "") : v;
        return `hackerone.com/${user}`;
      },
      icon: `<svg viewBox="0 0 24 24" class="svg-inline-icon" fill="currentColor" style="width:20px; height:20px; display:block;">
        <title>HackerOne icon</title>
        <path d="M7.207 0c-.4836 0-.8774.1018-1.1823.3002-.3044.2003-.4592.4627-.4592.7798v21.809c0 .2766.1581.5277.4752.7609.315.2335.7031.3501 1.1664.3501.4427 0 .8306-.1166 1.1678-.3501.3352-.231.5058-.4843.5058-.761V1.0815c0-.319-.1623-.5769-.4893-.7813C8.0644.1018 7.6702 0 7.207 0zm9.5234 8.662c-.4836 0-.8717.0981-1.1683.3007l-4.439 2.7822c-.1988.1861-.2841.4687-.2473.855.0342.3826.2108.747.5238 1.0907.3145.346.6662.5626 1.0684.6547.3963.0899.6973.041.8962-.143l1.7551-1.0951v9.7817c0 .2767.1522.5278.4607.761.3007.2335.6873.3501 1.1504.3501.463 0 .863-.1166 1.1983-.3501.3371-.2332.5058-.4843.5058-.761V9.7381c0-.3193-.165-.577-.4898-.7754-.3252-.2026-.7288-.3007-1.2143-.3007z"/>
      </svg>`
    },
    yeswehack: {
      label: "YWH_NODE",
      href: v => v.startsWith("http") ? v : `https://yeswehack.com/hunter/${v}`,
      text: v => {
        const user = v.startsWith("http") ? v.replace(/https?:\/\/(www\.)?yeswehack\.com\/hunter\//, "") : v;
        return `yeswehack.com/hunter/${user}`;
      },
      icon: `<svg viewBox="0 0 24 24" class="svg-inline-icon" fill="currentColor" style="width:20px; height:20px; display:block;">
        <path d="M12 2a10 10 0 0 0-10 10c0 5.52 4.48 10 10 10s10-4.48 10-10A10 10 0 0 0 12 2zm0 3a7 7 0 0 1 7 7c0 .65-.1 1.28-.27 1.87l-4.55-4.55a2 2 0 0 0-2.83 0L7.42 13.25c-.27-.4-.42-.88-.42-1.39a7 7 0 0 1 7-7zm0 14a7 7 0 0 1-5-2.12l4.88-4.88 4.88 4.88a7 7 0 0 1-9.76 2.12z"/>
      </svg>`
    },
    discord: {
      label: "DISCORD_CHAT",
      href: v => v.startsWith("http") ? v : `https://discord.com/users/${v}`,
      text: v => v.startsWith("http") ? v.replace(/https?:\/\/(www\.)?/, "") : `discord: ${v}`,
      icon: '<i class="fa-brands fa-discord"></i>'
    },
    telegram: {
      label: "TELEGRAM_SEC",
      href: v => v.startsWith("http") ? v : `https://t.me/${v}`,
      text: v => v.startsWith("http") ? v.replace(/https?:\/\/(www\.)?/, "") : `t.me/${v}`,
      icon: '<i class="fa-brands fa-telegram"></i>'
    },
    youtube: {
      label: "YOUTUBE_OPS",
      href: v => v.startsWith("http") ? v : `https://youtube.com/@${v}`,
      text: v => v.startsWith("http") ? v.replace(/https?:\/\/(www\.)?/, "") : `youtube.com/@${v}`,
      icon: '<i class="fa-brands fa-youtube"></i>'
    },
    medium: {
      label: "MEDIUM_INTEL",
      href: v => v.startsWith("http") ? v : `https://medium.com/@${v}`,
      text: v => v.startsWith("http") ? v.replace(/https?:\/\/(www\.)?/, "") : `medium.com/@${v}`,
      icon: '<i class="fa-brands fa-medium"></i>'
    },
    devto: {
      label: "DEVTO_STREAM",
      href: v => v.startsWith("http") ? v : `https://dev.to/${v}`,
      text: v => v.startsWith("http") ? v.replace(/https?:\/\/(www\.)?/, "") : `dev.to/${v}`,
      icon: '<i class="fa-brands fa-dev"></i>'
    },
    hashnode: {
      label: "HASHNODE_LOG",
      href: v => v.startsWith("http") ? v : `https://${v}.hashnode.dev`,
      text: v => v.startsWith("http") ? v.replace(/https?:\/\/(www\.)?/, "") : `${v}.hashnode.dev`,
      icon: '<i class="fa-solid fa-blog"></i>'
    }
  };

  Object.keys(socialsConfig).forEach(key => {
    const val = socialsConfig[key];
    if (val === undefined || val === null || val === "") return;

    if (key === "phones") {
      const phoneList = Array.isArray(val) ? val : [val];
      phoneList.forEach((phone, idx) => {
        let label = "PHONE_NODE";
        const cleanPhone = phone.replace(/\s+/g, "");
        if (cleanPhone.startsWith("+92") || cleanPhone.startsWith("03") || cleanPhone.startsWith("3")) {
          label = "PHONE_PK";
        } else if (cleanPhone.startsWith("+966") || cleanPhone.startsWith("05") || cleanPhone.startsWith("5")) {
          label = "PHONE_SA";
        } else {
          label = `PHONE_NODE_${idx + 1}`;
        }
        channels.push({
          key: `phone_${idx}`,
          label: label,
          value: phone,
          href: `tel:${cleanPhone}`,
          iconHtml: '<i class="fa-solid fa-phone"></i>'
        });
      });
    } else {
      const meta = platformMeta[key];
      if (meta) {
        channels.push({
          key: key,
          label: meta.label,
          value: meta.text(val),
          href: meta.href(val),
          iconHtml: meta.icon
        });
      } else {
        // Fallback for custom or unknown key
        channels.push({
          key: key,
          label: `${key.toUpperCase()}_NODE`,
          value: val,
          href: val,
          iconHtml: '<i class="fa-solid fa-globe"></i>'
        });
      }
    }
  });

  return channels;
}

function initContact(config) {
  const container = document.getElementById("contact-info-list");
  container.innerHTML = "";

  const channels = getSocialChannels(config.socials);

  channels.forEach(ch => {
    const card = document.createElement("div");
    card.className = "comms-card";
    
    card.innerHTML = `
      <div class="comms-icon">${ch.iconHtml}</div>
      <div class="comms-details">
        <span class="comms-label">${ch.label}</span>
        <a href="${ch.href}" target="_blank" class="comms-value" rel="noopener noreferrer">${ch.value}</a>
      </div>
    `;
    container.appendChild(card);
  });

  // Handle contact form submission
  const form = document.getElementById("cyber-contact-form");
  if (form) {
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const name = document.getElementById("form-sender-name").value;
      const email = document.getElementById("form-sender-email").value;
      const message = document.getElementById("form-message").value;

      // Log dispatch simulation in terminal
      const termOutput = document.getElementById("terminal-output-body");
      if (termOutput) {
        writeTerminalLine(termOutput, `DISPATCHING OUTBOUND COMMS ENVELOPE...`, "term-cmd-log");
        writeTerminalLine(termOutput, `SENDER: ${name} (${email})`, "term-res-output");
        writeTerminalLine(termOutput, `MESSAGE: "${message.substring(0, 45)}..."`, "term-res-output");
        writeTerminalLine(termOutput, `ENCRYPTING SYSTEM HEADER WITH AES-256-GCM...`, "term-res-output");
        
        setTimeout(() => {
          writeTerminalLine(termOutput, `[SUCCESS] Packet dispatched to Shariq Malik! Network buffer cleared.`, "term-success");
          termOutput.scrollTop = termOutput.scrollHeight;
        }, 1200);
      }

      alert(`Packet Dispatched! Thank you, ${name}. I will review your transmission shortly.`);
      form.reset();
    });
  }
}

function initArticles(config) {
  const grid = document.getElementById("articles-container-grid");
  if (!grid) return;
  grid.innerHTML = "";

  if (!config.articles || config.articles.length === 0) {
    grid.innerHTML = `<p class="bio-paragraph" style="color: var(--text-muted);">No logs found. Articles index is empty.</p>`;
    return;
  }

  config.articles.forEach(art => {
    const card = document.createElement("div");
    card.className = "project-card";
    
    let tagsHtml = art.tags
      .map(tag => `<span class="project-tag">${tag}</span>`)
      .join("");

    card.innerHTML = `
      <div class="project-category">${art.platform} // ${art.date}</div>
      <h3 class="project-title">${art.title}</h3>
      <p class="project-description">${art.description}</p>
      <div class="project-tags">
        ${tagsHtml}
      </div>
      <a href="${art.url}" target="_blank" class="project-link" rel="noopener noreferrer">
        <i class="fa-solid fa-book-open"></i> READ_INTEL
      </a>
    `;
    grid.appendChild(card);
  });
}

// --- 2. TAB CONTROL SYSTEM ---

function initTabs() {
  const tabs = document.querySelectorAll(".nav-btn");
  const sections = document.querySelectorAll(".panel-section");

  tabs.forEach(tab => {
    tab.addEventListener("click", () => {
      const targetId = tab.getAttribute("aria-controls");

      // Deactivate all
      tabs.forEach(t => {
        t.classList.remove("active");
        t.setAttribute("aria-selected", "false");
      });
      sections.forEach(s => s.classList.remove("active"));

      // Activate clicked
      tab.classList.add("active");
      tab.setAttribute("aria-selected", "true");
      
      const targetSection = document.getElementById(targetId);
      if (targetSection) {
        targetSection.classList.add("active");
        
        // Trigger skill progress bar fill if Skills tab is loaded
        if (targetId === "panel-skills") {
          animateSkillsBars();
        }
      }
    });
  });
}

function animateSkillsBars() {
  const fills = document.querySelectorAll(".skill-bar-fill");
  fills.forEach(fill => {
    const level = fill.getAttribute("data-level");
    // Temporarily reset to 0 then animate out
    fill.style.width = "0%";
    setTimeout(() => {
      fill.style.width = `${level}%`;
    }, 100);
  });
}

// --- 3. MATRIX RAIN BACKGROUND ---

function initParticlesJSBackground() {
  if (typeof particlesJS === "undefined") {
    console.error("particles.js library not loaded.");
    return;
  }

  particlesJS("particles-js", {
    particles: {
      number: {
        value: 85,
        density: {
          enable: true,
          value_area: 800
        }
      },
      color: {
        value: "#ff003c" // Matching --accent-red
      },
      shape: {
        type: "circle",
        stroke: {
          width: 0,
          color: "#000000"
        }
      },
      opacity: {
        value: 0.65, // Brighter particles
        random: false,
        anim: {
          enable: false,
          speed: 1,
          opacity_min: 0.1,
          sync: false
        }
      },
      size: {
        value: 3,
        random: true,
        anim: {
          enable: false,
          speed: 40,
          size_min: 0.1,
          sync: false
        }
      },
      line_linked: {
        enable: true,
        distance: 145,
        color: "#ff003c", // Matching --accent-red
        opacity: 0.45, // Brighter connecting lines
        width: 1.1
      },
      move: {
        enable: true,
        speed: 2,
        direction: "none",
        random: false,
        straight: false,
        out_mode: "out",
        bounce: false,
        attract: {
          enable: false,
          rotateX: 600,
          rotateY: 1200
        }
      }
    },
    interactivity: {
      detect_on: "canvas",
      events: {
        onhover: {
          enable: true,
          mode: "grab"
        },
        onclick: {
          enable: true,
          mode: "push"
        },
        resize: true
      },
      modes: {
        grab: {
          distance: 170,
          line_linked: {
            opacity: 0.95 // Maximum contrast on hover connection
          }
        },
        push: {
          particles_nb: 4
        }
      }
    },
    retina_detect: true
  });
}

// --- 4. TERMINAL SHELL EMULATOR ---

function initTerminal(config) {
  const terminal = document.getElementById("terminal-output-body");
  const input = document.getElementById("terminal-cmd-input");
  const panel = document.getElementById("cli-console-panel");

  if (!terminal || !input) return;

  const welcomeMsg = document.getElementById("term-welcome-msg");
  if (welcomeMsg && config.systemStatus.welcomeBanner) {
    const bannerText = Array.isArray(config.systemStatus.welcomeBanner)
      ? config.systemStatus.welcomeBanner.join("\n")
      : config.systemStatus.welcomeBanner;
    welcomeMsg.innerHTML = `
<span style="color: var(--accent-red); font-weight: bold; line-height: 1.1; display: block; margin-bottom: 12px; font-size: 0.78rem; text-shadow: var(--glow-shadow-small); letter-spacing: 0.5px;">${bannerText}</span>
Welcome to Shariq Shell [Version 2.4.9-red]
(c) 2026 Shariq Malik. Security Core Active.

Type 'help' to list available command payloads.`;
  }

  // Keep input focused when clicking anywhere inside the terminal panel
  panel.addEventListener("click", () => {
    input.focus();
  });

  // History tracking buffer
  const cmdHistory = [];
  let historyIndex = -1;

  input.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
      const rawCmd = input.value;
      const cleanCmd = rawCmd.trim().toLowerCase();
      input.value = "";

      if (cleanCmd.length > 0) {
        cmdHistory.push(rawCmd);
        historyIndex = cmdHistory.length;

        // Render command line
        writeTerminalLine(terminal, rawCmd, "term-cmd-log");
        
        // Interpret command
        interpretCommand(cleanCmd, terminal, config, (newInterval) => {
          if (newInterval !== undefined) {
            matrixInterval = newInterval;
          }
        });
      }
      terminal.scrollTop = terminal.scrollHeight;
    } 
    else if (e.key === "ArrowUp") {
      // Traverse history backwards
      if (cmdHistory.length > 0 && historyIndex > 0) {
        historyIndex--;
        input.value = cmdHistory[historyIndex];
      }
      e.preventDefault();
    } 
    else if (e.key === "ArrowDown") {
      // Traverse history forwards
      if (cmdHistory.length > 0 && historyIndex < cmdHistory.length - 1) {
        historyIndex++;
        input.value = cmdHistory[historyIndex];
      } else {
        historyIndex = cmdHistory.length;
        input.value = "";
      }
      e.preventDefault();
    }
  });
}

function writeTerminalLine(container, text, className = "") {
  const line = document.createElement("div");
  line.className = `terminal-line ${className}`;
  line.innerHTML = text;
  container.appendChild(line);
}

function interpretCommand(cmdStr, termBody, config, updateMatrixCallback) {
  const args = cmdStr.split(" ");
  const baseCmd = args[0];

  switch (baseCmd) {
    case "help":
      writeTerminalLine(termBody, `
Available command payloads:
  <b>help</b>         - Display lists of active command options.
  <b>about</b>        - Outputs biography details from secure sector.
  <b>skills</b>       - Outputs threat level rating matrices (ASCII table).
  <b>exp</b>          - Displays operation logs from previous roles.
  <b>projects</b>     - Lists catalogued open source systems and payloads.
  <b>certs</b>        - Lists granted security clearance credentials.
  <b>intel</b>        - Lists published articles and write-up intelligence logs.
  <b>contact</b>      - Outputs verified transmission channels.
  <b>resume</b>       - Triggers secure download sequence for CV PDF.
  <b>clear</b>        - Clears current shell console.
  <b>decrypt</b>      - Simulates an emergency record override.
  <b>matrix &lt;state&gt;</b> - Toggle background streams (Options: 'on' or 'off').
      `, "term-res-output");
      break;

    case "about":
      let aboutText = `<b>BIO STREAM DECRYPTED:</b><br><br>`;
      config.about.bio.forEach(p => {
        aboutText += `${p}<br><br>`;
      });
      writeTerminalLine(termBody, aboutText, "term-res-output");
      break;

    case "skills":
      const skillCategories = {
        offensive: "Adversary Simulation & Offensive Security",
        programming: "Development & Security Automation",
        monitoring: "Infrastructure, Defense & Monitoring"
      };
      
      let skillsTable = `<br>`;
      Object.entries(skillCategories).forEach(([key, title]) => {
        const filtered = config.skills.filter(s => s.category === key);
        if (filtered.length === 0) return;
        
        skillsTable += `+----------------------------------------+-------+<br>`;
        let headerText = title.toUpperCase();
        if (headerText.length > 38) {
          headerText = headerText.substring(0, 35) + "...";
        }
        const titlePadding = "&nbsp;".repeat(38 - headerText.length);
        skillsTable += `| <b>${headerText}</b>${titlePadding} | <b>%</b>   |<br>`;
        skillsTable += `+----------------------------------------+-------+<br>`;
        
        filtered.forEach(skill => {
          const displayName = skill.name.length > 36 ? skill.name.substring(0, 33) + "..." : skill.name;
          const paddingLength = Math.max(0, 38 - displayName.length);
          const padding = ".";
          skillsTable += `| ${displayName}${padding.repeat(paddingLength)} | ${skill.level}%   |<br>`;
        });
        skillsTable += `+----------------------------------------+-------+<br><br>`;
      });
      writeTerminalLine(termBody, skillsTable, "term-res-output");
      break;

    case "exp":
      let expText = `<br><b>SYSTEM OPERATION LOGS:</b><br>`;
      config.experience.forEach(companyBlock => {
        expText += `<br>==================================================<br>`;
        expText += `COMPANY: ${companyBlock.company.toUpperCase()} // LOCATION: ${companyBlock.location.toUpperCase()}<br>`;
        companyBlock.roles.forEach(role => {
          expText += `--------------------------------------------------<br>`;
          expText += `POSITION: ${role.title.toUpperCase()}<br>`;
          expText += `DURATION: ${role.period}<br>`;
          expText += `RESPONSIBILITIES:<br>`;
          role.bullets.forEach(bullet => {
            expText += `  - ${bullet}<br>`;
          });
        });
      });
      expText += `==================================================<br>`;
      writeTerminalLine(termBody, expText, "term-res-output");
      break;

    case "projects":
      let projText = `<br><b>PAYLOAD INVENTORY INDEX:</b><br>`;
      config.projects.forEach(proj => {
        const isPrivate = proj.visibility === "private";
        projText += `<br>----------------------------------------<br>`;
        projText += `TITLE: ${proj.title}<br>`;
        projText += `TYPE: ${proj.category.toUpperCase()} // STATUS: ${isPrivate ? "PRIVATE (SECURE)" : "PUBLIC"}<br>`;
        projText += `INFO: ${proj.description}<br>`;
        projText += `TAGS: [${proj.tags.join(", ")}]<br>`;
        if (!isPrivate) {
          projText += `URL: <a href="${proj.url}" target="_blank" style="color:#ff003c">${proj.url}</a><br>`;
        } else {
          projText += `URL: [RESTRICTED ACCESS - ENCRYPTED MODULE]<br>`;
        }
      });
      projText += `----------------------------------------<br>`;
      writeTerminalLine(termBody, projText, "term-res-output");
      break;

    case "intel":
    case "articles":
    case "writeups":
      let artText = `<br><b>PUBLISHED INTEL LOGS:</b><br>`;
      if (!config.articles || config.articles.length === 0) {
        artText += `No write-ups indexed in configuration database.<br>`;
      } else {
        config.articles.forEach(art => {
          artText += `<br>----------------------------------------<br>`;
          artText += `TITLE: ${art.title}<br>`;
          artText += `SOURCE: ${art.platform.toUpperCase()} (${art.date})<br>`;
          artText += `INFO: ${art.description}<br>`;
          artText += `TAGS: [${art.tags.join(", ")}]<br>`;
          artText += `URL: <a href="${art.url}" target="_blank" style="color:#ff003c">${art.url}</a><br>`;
        });
        artText += `----------------------------------------<br>`;
      }
      writeTerminalLine(termBody, artText, "term-res-output");
      break;

    case "certs":
      let certText = `<br><b>SECURITY CLEARANCES INDEX:</b><br>`;
      config.certifications.forEach(cert => {
        const isInProgress = cert.status === "in-progress";
        const bullet = isInProgress ? "[*]" : "[+]";
        const statusLabel = isInProgress ? " [STATUS: IN PROGRESS]" : " [STATUS: GRANTED]";
        certText += `${bullet} ${cert.name} - Issued by: ${cert.issuer}${statusLabel}<br>`;
      });
      writeTerminalLine(termBody, certText, "term-res-output");
      break;

    case "contact":
      let contactText = `<br><b>COMMS PROTOCOL SPECIFICATIONS:</b><br>`;
      const termChannels = getSocialChannels(config.socials);
      termChannels.forEach(ch => {
        const paddedLabel = ch.label.padEnd(16, " ").replace(/ /g, "&nbsp;");
        contactText += `  [${paddedLabel}] - <a href="${ch.href}" target="_blank" style="color:#ff003c">${ch.value}</a><br>`;
      });
      writeTerminalLine(termBody, contactText, "term-res-output");
      break;

    case "resume":
    case "cv":
      writeTerminalLine(termBody, `Initializing secure download sequence for Shariq_Malik_CV.pdf...`, "term-cmd-log");
      const downloadLink = document.createElement("a");
      downloadLink.href = config.personal.resumeUrl || "Shariq_CV.pdf";
      downloadLink.download = "Shariq_Malik_CV.pdf";
      document.body.appendChild(downloadLink);
      downloadLink.click();
      document.body.removeChild(downloadLink);
      writeTerminalLine(termBody, `[SUCCESS] Secure packet transfer completed. Check browser downloads.`, "term-success");
      break;

    case "clear":
      const bannerText = Array.isArray(config.systemStatus.welcomeBanner)
        ? config.systemStatus.welcomeBanner.join("\n")
        : config.systemStatus.welcomeBanner;
      const banner = bannerText ? `
<span style="color: var(--accent-red); font-weight: bold; line-height: 1.1; display: block; margin-bottom: 12px; font-size: 0.78rem; text-shadow: var(--glow-shadow-small); letter-spacing: 0.5px;">${bannerText}</span>` : "";
      termBody.innerHTML = `
<div class="terminal-welcome" id="term-welcome-msg">${banner}
Welcome to Shariq Shell [Version 2.4.9-red]
(c) 2026 Shariq Malik. Security Core Active.

Type 'help' to list available command payloads.
</div>`;
      break;

    case "matrix":
      const state = args[1];
      if (state === "off" || state === "0") {
        const pDiv = document.getElementById("particles-js");
        if (pDiv) pDiv.style.display = "none";
        writeTerminalLine(termBody, "Particles background deactivated.", "term-success");
      } else if (state === "on" || state === "1") {
        const pDiv = document.getElementById("particles-js");
        if (pDiv) pDiv.style.display = "block";
        writeTerminalLine(termBody, "Particles background activated.", "term-success");
      } else {
        writeTerminalLine(termBody, "Usage: matrix [on|off]", "term-error");
      }
      break;

    case "decrypt":
      // Simulated interactive decryption sequence
      writeTerminalLine(termBody, `INITIALIZING EMERGENCY RECORD OVERRIDE...`, "term-cmd-log");
      document.body.classList.add("scanline-glitch");
      
      let progress = 0;
      const logs = [
        "Resolving core security nodes...",
        "Injecting shellcode payloads...",
        "Bypassing sandboxed directory locks...",
        "Cracking administrative SHA-256 hashes...",
        "Rebuilding system index tables...",
        "OVERRIDE SUCCESSFUL! Records decrypted."
      ];

      function stepDecryption() {
        if (progress < logs.length) {
          const isLast = progress === logs.length - 1;
          const percentage = Math.round(((progress + 1) / logs.length) * 100);
          writeTerminalLine(
            termBody, 
            `[${percentage}%] ${logs[progress]}`, 
            isLast ? "term-success" : "term-res-output"
          );
          termBody.scrollTop = termBody.scrollHeight;
          progress++;
          setTimeout(stepDecryption, 400);
        } else {
          // Finish glitch shake
          document.body.classList.remove("scanline-glitch");
          writeTerminalLine(termBody, "Secure system records are now fully synchronized.", "term-success");
          termBody.scrollTop = termBody.scrollHeight;
        }
      }
      
      setTimeout(stepDecryption, 300);
      break;

    default:
      writeTerminalLine(termBody, `shariq-shell: command not found: <b>${baseCmd}</b>. Type 'help' to audit system instructions.`, "term-error");
      break;
  }
}
