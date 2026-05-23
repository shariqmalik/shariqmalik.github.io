// Shariq Malik - Cyberpunk Hacker Portfolio Configuration
window.portfolioConfig = {
  personal: {
    name: "Shariq Malik",
    title: "Senior Security Consultant (AppSec) - Wipro Arabia",
    tagline: "Cybersecurity enthusiast with 9+ years of experience in Penetration Testing, Application Security, Red Teaming, and Network Security.",
    avatar: "profile_pic.png", // Easily change your profile picture here
    resumeUrl: "Shariq_CV.pdf",
    location: "Jubail, Eastern, Saudi Arabia",
    statusText: "OPERATIONAL // SYSTEMS ACTIVE"
  },
  systemStatus: {
    hostName: "SEC-CORE-SHARIQ",
    ping: "14ms",
    threatLevel: "MINIMAL",
    firewallStatus: "ACTIVE",
    decryptionKey: "AES-256-GCM",
    agentVersion: "v4.0.9-red",
    // Custom ASCII Art Banner shown on terminal startup and clear command.
    // Can be defined as a single string (using \n) or an array of lines.
    // Note: Backslashes (\) must be double-escaped (\\) within strings.
    welcomeBanner: [
      " __    __     _                            _ ",
      "/ / /\\ \\ \\___| | ___ ___  _ __ ___   ___  / \\",
      "\\ \\/  \\/ / _ \\ |/ __/ _ \\| '_ ` _ \\ / _ \\/  /",
      " \\  /\\  /  __/ | (_| (_) | | | | | |  __/\\_/ ",
      "  \\/  \\/ \\___|_|\\___\\___/|_| |_| |_|\\___\\/   "
    ]
  },
  socials: {
    email: "malikshariq07@gmail.com",
    phones: ["+92 345 4730838", "+966 545 727238"],
    github: "shariqmalik",
    linkedin: "malikshariq",
    fiverr: "https://www.fiverr.com/shariqmalik_",
    hackthebox: "5992",  
    // tryhackme: "shariqmalik",
    // hackerone: "shariqmalik",
    // Uncomment these (or add custom ones) to display them on the website.
    // They will automatically render in the GUI and CLI when defined here.
    // yeswehack: "shariqmalik",
    // twitter: "shariqmalik",
    discord: "MagnitoMac",
    // telegram: "shariqmalik",
    // youtube: "shariqmalik",
    // medium: "shariqmalik",
    // devto: "shariqmalik",
    // hashnode: "shariqmalik",
    // upwork: "shariqmalik"
  },
  about: {
    greeting: "INITIALIZING DECRYPT SEQUENCE...",
    bio: [
      "I am a Technical Lead and Senior Security Consultant with over 9 years of hands-on experience directing advanced penetration testing, secure code review, and adversary simulation exercises.",
      "My professional background spans delivering high-impact application security assessments for Fortune Global 500 enterprises, managing large security engineering teams, and building custom tooling to automate security auditing.",
      "An active participant in the security research community, I contribute to open-source security projects like hoaxshell, seeker, and CrackMapExec, and have been recognized as an Elite Hacker on HackTheBox and acknowledged by ESET SMART Security for vulnerability reporting."
    ]
  },
  skills: [
    { name: "Web Application Pentest", level: 95, category: "offensive" },
    { name: "Mobile Application Pentest", level: 92, category: "offensive" },
    { name: "LLM / AI Application Pentesting", level: 75, category: "offensive" },
    { name: "API Pentest", level: 90, category: "offensive" },
    { name: "Red Teaming Operations", level: 92, category: "offensive" },
    { name: "Network Pentest", level: 90, category: "offensive" },
    { name: "Cloud Assessment", level: 85, category: "offensive" },
    { name: "SAST (Static Application Security Testing)", level: 82, category: "offensive" },
    { name: "Scripting & Automation", level: 90, category: "programming" },
    { name: "Programming Language", level: 80, category: "programming" },
    { name: "Vulnerability Assessment", level: 92, category: "monitoring" }
  ],
  experience: [
    {
      company: "Wipro Arabia",
      location: "Jubail, Eastern, Saudi Arabia",
      roles: [
        {
          title: "Technical Lead / Senior Security Consultant",
          period: "Oct 2024 - Present",
          bullets: [
            "Delivering advanced web, API, and mobile application penetration testing services for a Fortune Global 500 chemical manufacturing enterprise.",
            "Conducting detailed secure code reviews across Java, .NET, and JavaScript stacks ensuring compliance with OWASP Top 10 guidelines.",
            "Creating custom scripts, exploits, and automated scanner helpers to streamline continuous vulnerability assessments.",
            "Providing technical remediation guidance and actionable executive-level reports detailing proofs-of-concept for internal developer teams."
          ]
        }
      ]
    },
    {
      company: "Ebryx LLC",
      location: "Lahore, Pakistan",
      roles: [
        {
          title: "Lead Security Engineer",
          period: "Mar 2023 - Oct 2024",
          bullets: [
            "Managed and led a high-performance team of 30+ cybersecurity engineers.",
            "Conducted end-to-end web, mobile, network, and cloud penetration tests, identifying and mitigating 95% of critical attack vectors.",
            "Directed full-scope Red Teaming operations and adversary simulations including custom social engineering campaigns.",
            "Developed custom scripting tools and wrappers to automate repetitive auditing jobs, saving 100+ team hours monthly."
          ]
        },
        {
          title: "Security Engineer",
          period: "Dec 2021 - Mar 2023",
          bullets: [
            "Conducted web and mobile application penetration testing for more than 200 customers.",
            "Evaluated network and infrastructure vulnerabilities and conducted penetration testing.",
            "Reviewed source code for corporate and consumer web applications.",
            "Identified methods and entry points for potential exploitation of vulnerabilities.",
            "Introduced new testing rules to uncover vulnerabilities, increasing detection rates by 20%."
          ]
        }
      ]
    },
    {
      company: "DFRSC (Digital Forensics Research Center)",
      location: "Lahore, Pakistan",
      roles: [
        {
          title: "Team Lead Cyber Security",
          period: "Jan 2020 - Dec 2021",
          bullets: [
            "Managed a security operations team of 25 engineers executing vulnerability checks and incident planning.",
            "Prepared and implemented security plans, and delegated tasks related to security operations.",
            "Developed indigenous security tools, custom automation utilities, and OSINT scripts.",
            "Delivered cyber defense and ethical hacking trainings for 80+ security professionals and university candidates."
          ]
        },
        {
          title: "Security Engineer",
          period: "Dec 2016 - Jan 2020",
          bullets: [
            "Conducted web application penetration testing, network pentesting, and performed vulnerabilities remediation.",
            "Assessed network/infrastructure vulnerabilities and performed pen-testing.",
            "Automated various in-house tasks, including daily summaries and reports.",
            "Created social media OSINT and offensive security tools."
          ]
        }
      ]
    }
  ],
  projects: [
    {
      title: "Hoaxshell",
      description: "A highly acclaimed, unconventional Windows reverse shell payload generator operating over HTTP(S) protocol, widely studied for bypassing modern AV and EDR solutions.",
      category: "offensive",
      visibility: "public",
      url: "https://github.com/t3l3machus/hoaxshell",
      tags: ["Python", "Offensive", "HTTP/S", "AV Bypass"]
    },
    {
      title: "Seeker",
      description: "An advanced social engineering OSINT utility designed to gather precise device and smartphone location coordinates using HTML5 Geolocation API.",
      category: "offensive",
      visibility: "public",
      url: "https://github.com/thewhiteh4t/seeker",
      tags: ["Python", "OSINT", "Social Eng"]
    },
    {
      title: "CrackMapExec",
      description: "Contributed to this post-exploitation utility designed to automate security assessments of large Active Directory networks.",
      category: "offensive",
      visibility: "public",
      url: "https://github.com/Porchetta-Industries/CrackMapExec",
      tags: ["Python", "AD Pentest", "Automation"]
    },
    {
      title: "ReportGenie",
      description: "Custom internal tool that automates template-based pentest report generation, integrated with OpenAI models to craft executive write-ups.",
      category: "utility",
      visibility: "private",
      url: "https://github.com/shariqmalik",
      tags: ["Python", "OpenAI API", "Reporting", "Automation"]
    }
  ],
  certifications: [
    { name: "COAE - Certified Offensive AI Expert", issuer: "HackTheBox", status: "in-progress" },
    { name: "CRTP - Certified Red Team Professional", issuer: "Altered Security ", status: "in-progress" },
    { name: "CPSA - CREST Practitioner Security Analyst", issuer: "CREST", status: "in-progress" },
    { name: "CRT - CREST Registered Penetration Tester", issuer: "CREST", status: "in-progress" },
    { name: "OSCP - Offensive Security Certified Professional", issuer: "OffSec", status: "passed" },
    { name: "Offshore (HTB Pro Lab Certified)", issuer: "HackTheBox", status: "passed" },
    { name: "Jr Penetration Tester (PT1)", issuer: "TryHackMe", status: "passed" },
    { name: "Certified AppSec Practitioner (CAP)", issuer: "The SecOps Group", status: "passed" },
    { name: "Certified Network Security Practitioner (CNSP)", issuer: "The SecOps Group", status: "passed" },
    { name: "Huawei Certified Network Professional (HCNP)", issuer: "Huawei", status: "passed" },
    { name: "Huawei Certified Network Associate (HCNA)", issuer: "Huawei", status: "passed" }
  ],
  achievements: [
    "Secured 1st position in CyberHackathon Pakistan 2022 (Regional Finals).",
    "Secured 2nd position in 2 categories in CyberHackathon Pakistan 2021 (Regional Finals).",
    "Rated as an Elite Hacker on HackTheBox after solving numerous advanced CTF boxes.",
    "Secured 2nd position in Huawei ICT Skill Competition Global Final 2018.",
    "Secured 2nd position in Huawei ICT Skill Competition Middle-East Final 2017.",
    "Top 10 National Finalists in Huawei ICT Skills Competition 2016.",
    "Acknowledged by ESET SMART Security™ for reporting a vulnerability."
  ],
  articles: [
    
  ]
};
