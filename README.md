<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Portfolio - Aviv Shaked</title>
    <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=JetBrains+Mono:wght@300;400;500&display=swap">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <style>
      * {
        outline: none;
        box-sizing: border-box;
      }
  
      :root {
        /* Modern Monochrome Glass Theme */
        --bg-primary: #0a0a0a;
        --bg-secondary: #111111;
        --bg-tertiary: #1a1a1a;
        --glass-primary: rgba(255, 255, 255, 0.03);
        --glass-secondary: rgba(255, 255, 255, 0.05);
        --glass-tertiary: rgba(255, 255, 255, 0.08);
        --glass-hover: rgba(255, 255, 255, 0.12);
        
        --border-subtle: rgba(255, 255, 255, 0.08);
        --border-medium: rgba(255, 255, 255, 0.15);
        --border-strong: rgba(255, 255, 255, 0.25);
        
        --text-primary: #ffffff;
        --text-secondary: #b4b4b4;
        --text-tertiary: #888888;
        --text-muted: #666666;
        
        --accent-primary: #ffffff;
        --accent-secondary: #f0f0f0;
        --accent-glow: rgba(255, 255, 255, 0.4);
        
        --shadow-soft: 0 4px 24px rgba(0, 0, 0, 0.3);
        --shadow-medium: 0 8px 40px rgba(0, 0, 0, 0.4);
        --shadow-strong: 0 16px 64px rgba(0, 0, 0, 0.5);
        
        --font-primary: "Inter", system-ui, -apple-system, sans-serif;
        --font-mono: "JetBrains Mono", "Menlo", "Monaco", monospace;
        
        --transition-fast: 0.15s cubic-bezier(0.4, 0, 0.2, 1);
        --transition-smooth: 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        --transition-gentle: 0.5s cubic-bezier(0.25, 0.8, 0.25, 1);
      }
  
      .light-mode {
        --bg-primary: #fafafa;
        --bg-secondary: #ffffff;
        --bg-tertiary: #f5f5f5;
        --glass-primary: rgba(255, 255, 255, 0.7);
        --glass-secondary: rgba(255, 255, 255, 0.8);
        --glass-tertiary: rgba(255, 255, 255, 0.9);
        --glass-hover: rgba(0, 0, 0, 0.05);
        
        --border-subtle: rgba(0, 0, 0, 0.08);
        --border-medium: rgba(0, 0, 0, 0.15);
        --border-strong: rgba(0, 0, 0, 0.25);
        
        --text-primary: #0a0a0a;
        --text-secondary: #4b4b4b;
        --text-tertiary: #777777;
        --text-muted: #999999;
        
        --accent-primary: #0a0a0a;
        --accent-secondary: #0f0f0f;
        --accent-glow: rgba(0, 0, 0, 0.4);
      }
  
      html {
        box-sizing: border-box;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
      }
  
      body {
        cursor: none;
        font-family: var(--font-primary);
        background: var(--bg-primary);
        background-image: url('TODO_BACKGROUND_IMAGE_URL');
        background-size: cover;
        background-position: center;
        background-attachment: fixed;
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
        padding: 2rem;
        width: 100%;
        min-height: 100vh;
        overflow-x: hidden;
        overflow-y: auto;
        position: relative;
      }
      
      /* Subtle Background Particles */
      body::before {
        content: '';
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-image: 
          radial-gradient(circle at 20% 80%, rgba(255, 255, 255, 0.02) 0%, transparent 50%),
          radial-gradient(circle at 80% 20%, rgba(255, 255, 255, 0.015) 0%, transparent 50%);
        pointer-events: none;
        z-index: -1;
      }
  
      /* Clean Cursor System */
      .cursor {
        position: fixed;
        border-radius: 50%;
        pointer-events: none;
        z-index: 9999;
        mix-blend-mode: difference;
      }
  
      .cursor--small {
        width: 4px;
        height: 4px;
        background: var(--accent-primary);
        transform: translate(-50%, -50%);
        transition: none;
      }
  
      .cursor--large {
        width: 32px;
        height: 32px;
        border: 1px solid var(--accent-primary);
        background: transparent;
        transform: translate(-50%, -50%);
        transition: all var(--transition-smooth);
        opacity: 0.6;
      }
  
      .cursor--large.morphed {
        background: var(--glass-hover);
        opacity: 0.8;
        border-radius: 12px;
      }
  
      /* Video Background */
      .video-bg {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        z-index: -2;
        opacity: 0.3;
      }
  
      .video-bg video {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }
  
      /* Theme Toggle */
      .theme-toggle {
        position: fixed;
        bottom: 2rem;
        right: 2rem;
        width: 48px;
        height: 48px;
        background: var(--glass-secondary);
        backdrop-filter: blur(20px);
        border: 1px solid var(--border-subtle);
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: none;
        transition: all var(--transition-smooth);
        z-index: 100;
      }
  
      .theme-toggle:hover {
        background: var(--glass-hover);
        border-color: var(--border-medium);
        transform: scale(1.05);
      }
  
      .theme-toggle svg {
        width: 20px;
        height: 20px;
        color: var(--text-secondary);
        transition: all var(--transition-smooth);
      }
  
      /* Main App Container */
      .app {
        background: var(--glass-primary);
        backdrop-filter: blur(24px);
        border: 1px solid var(--border-subtle);
        border-radius: 20px;
        width: 100%;
        max-width: 1400px;
        height: 90vh;
        min-height: 800px;
        display: flex;
        flex-direction: column;
        overflow: hidden;
        box-shadow: var(--shadow-strong);
        position: relative;
      }
  
      /* Header */
      .header {
        display: flex;
        align-items: center;
        height: 64px;
        padding: 0 2rem;
        background: var(--glass-secondary);
        backdrop-filter: blur(20px);
        border-bottom: 1px solid var(--border-subtle);
        position: relative;
        z-index: 10;
      }
  
      .traffic-lights {
        display: flex;
        gap: 8px;
        margin-right: 2rem;
      }
  
      .traffic-light {
        width: 12px;
        height: 12px;
        border-radius: 50%;
        transition: all var(--transition-smooth);
        cursor: none;
      }
  
      .traffic-light.red { 
        background: #ff5f56;
      }
      .traffic-light.yellow { 
        background: #ffbd2e;
      }
      .traffic-light.green { 
        background: #27ca3f;
      }
  
      .traffic-light:hover {
        transform: scale(1.2);
        box-shadow: 0 0 15px currentColor;
      }
  
      .header-title {
        font-weight: 600;
        font-size: 1rem;
        color: var(--text-primary);
        letter-spacing: -0.01em;
      }
  
      .header-profile {
        margin-left: auto;
        display: flex;
        align-items: center;
        gap: 1rem;
      }
  
      .notification-icon {
        position: relative;
        width: 20px;
        height: 20px;
        color: var(--text-secondary);
        cursor: none;
        transition: all var(--transition-smooth);
      }
  
      .notification-icon:hover {
        color: var(--text-primary);
        transform: scale(1.1);
      }
  
      .notification-badge {
        position: absolute;
        top: -4px;
        right: -4px;
        width: 12px;
        height: 12px;
        background: var(--accent-primary);
        color: var(--bg-primary);
        border-radius: 50%;
        font-size: 8px;
        font-weight: 600;
        display: flex;
        align-items: center;
        justify-content: center;
      }
  
      .profile-avatar {
        width: 32px;
        height: 32px;
        border-radius: 50%;
        border: 2px solid var(--border-medium);
        object-fit: cover;
        cursor: none;
        transition: all var(--transition-smooth);
      }
  
      .profile-avatar:hover {
        border-color: var(--accent-primary);
        transform: scale(1.05);
      }
  
      /* Layout */
      .main-layout {
        display: flex;
        flex: 1;
        overflow: hidden;
      }
  
      /* Sidebar */
      .sidebar {
        width: 280px;
        background: var(--glass-secondary);
        backdrop-filter: blur(20px);
        border-right: 1px solid var(--border-subtle);
        padding: 2rem;
        overflow-y: auto;
        display: flex;
        flex-direction: column;
        gap: 2rem;
      }
  
      .sidebar-section {
        display: flex;
        flex-direction: column;
        gap: 0.5rem;
      }
  
      .sidebar-title {
        font-size: 0.75rem;
        font-weight: 600;
        color: var(--text-tertiary);
        text-transform: uppercase;
        letter-spacing: 0.05em;
        margin-bottom: 0.5rem;
      }
  
      .sidebar-item {
        display: flex;
        align-items: center;
        gap: 0.75rem;
        padding: 0.75rem;
        border-radius: 12px;
        color: var(--text-secondary);
        text-decoration: none;
        transition: all var(--transition-smooth);
        cursor: none;
        font-weight: 500;
        font-size: 0.9rem;
        position: relative;
        overflow: hidden;
      }
      
      .sidebar-item::before {
        content: '';
        position: absolute;
        left: 0;
        top: 0;
        width: 3px;
        height: 100%;
        background: var(--accent-primary);
        transform: scaleY(0);
        transition: transform var(--transition-smooth);
      }
  
      .sidebar-item:hover,
      .sidebar-item.active {
        background: var(--glass-hover);
        color: var(--text-primary);
        transform: translateX(4px);
      }
      
      .sidebar-item:hover::before,
      .sidebar-item.active::before {
        transform: scaleY(1);
      }
  
      .sidebar-item svg {
        width: 16px;
        height: 16px;
        opacity: 0.8;
        transition: all var(--transition-smooth);
      }
  
      .sidebar-item:hover svg {
        opacity: 1;
        transform: scale(1.05);
      }
  
      /* Main Content */
      .content {
        flex: 1;
        overflow-y: auto;
        padding: 2rem;
        display: flex;
        flex-direction: column;
        gap: 2rem;
      }
  
      /* Content Sections */
      .content-section {
        background: var(--glass-secondary);
        backdrop-filter: blur(20px);
        border: 1px solid var(--border-subtle);
        border-radius: 16px;
        padding: 2rem;
        transition: all var(--transition-smooth);
      }
  
      .content-section:hover {
        border-color: var(--border-medium);
        box-shadow: var(--shadow-soft);
      }
  
      .section-header {
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin-bottom: 1.5rem;
      }
  
      .section-title {
        font-size: 1.5rem;
        font-weight: 600;
        color: var(--text-primary);
        letter-spacing: -0.02em;
      }
  
      .section-subtitle {
        color: var(--text-secondary);
        font-size: 0.9rem;
        margin-top: 0.25rem;
      }
  
      /* Hero Section */
      .hero {
        display: grid;
        grid-template-columns: 1fr auto;
        gap: 3rem;
        align-items: center;
      }
  
      .hero-content h1 {
        font-size: clamp(2rem, 5vw, 3rem);
        font-weight: 700;
        color: var(--text-primary);
        margin-bottom: 1rem;
        letter-spacing: -0.03em;
        line-height: 1.2;
      }
  
      .hero-description {
        font-size: 1.1rem;
        color: var(--text-secondary);
        line-height: 1.6;
        margin-bottom: 2rem;
      }
  
      .hero-stats {
        display: flex;
        gap: 2rem;
        margin-bottom: 2rem;
      }
  
      .stat-item {
        text-align: center;
      }
  
      .stat-number {
        font-size: 1.5rem;
        font-weight: 700;
        color: var(--text-primary);
        display: block;
      }
  
      .stat-label {
        font-size: 0.8rem;
        color: var(--text-tertiary);
        text-transform: uppercase;
        letter-spacing: 0.05em;
      }
  
      .hero-visual {
        width: 200px;
        height: 200px;
        background: var(--glass-tertiary);
        border: 1px solid var(--border-subtle);
        border-radius: 20px;
        display: flex;
        align-items: center;
        justify-content: center;
        position: relative;
        overflow: hidden;
        transition: all var(--transition-smooth);
      }
      
      .hero-visual:hover {
        transform: scale(1.02);
        box-shadow: 0 0 30px rgba(255, 255, 255, 0.1);
      }
  
      .hero-visual svg {
        width: 80px;
        height: 80px;
        color: var(--text-secondary);
        z-index: 2;
        transition: all var(--transition-smooth);
      }
      
      .hero-visual:hover svg {
        transform: scale(1.05);
        color: var(--text-primary);
      }
  
      /* Clean Buttons */
      .btn {
        display: inline-flex;
        align-items: center;
        gap: 0.5rem;
        padding: 0.75rem 1.5rem;
        background: var(--glass-tertiary);
        border: 1px solid var(--border-medium);
        border-radius: 12px;
        color: var(--text-primary);
        text-decoration: none;
        font-weight: 500;
        font-size: 0.9rem;
        cursor: none;
        transition: all var(--transition-smooth);
        backdrop-filter: blur(20px);
        position: relative;
        overflow: hidden;
      }
      
      .btn::before {
        content: '';
        position: absolute;
        top: 0;
        left: -100%;
        width: 100%;
        height: 100%;
        background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.1), transparent);
        transition: left 0.6s ease;
      }
  
      .btn:hover {
        background: var(--glass-hover);
        border-color: var(--border-strong);
        transform: translateY(-2px);
        box-shadow: var(--shadow-soft);
      }
      
      .btn:hover::before {
        left: 100%;
      }
  
      .btn-primary {
        background: var(--accent-primary);
        color: var(--bg-primary);
        border-color: var(--accent-primary);
      }
  
      .btn-primary:hover {
        background: var(--accent-secondary);
        box-shadow: 0 8px 32px var(--accent-glow);
      }
  
      /* Cards */
      .card-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
        gap: 1.5rem;
      }
  
      .card {
        background: var(--glass-secondary);
        backdrop-filter: blur(20px);
        border: 1px solid var(--border-subtle);
        border-radius: 16px;
        padding: 1.5rem;
        transition: all var(--transition-smooth);
        cursor: none;
        position: relative;
        overflow: hidden;
      }
      
      .card::before {
        content: '';
        position: absolute;
        top: 0;
        left: -100%;
        width: 100%;
        height: 100%;
        background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.05), transparent);
        transition: left 0.6s ease;
      }
      
      .card::after {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        height: 2px;
        background: linear-gradient(90deg, var(--accent-primary), var(--accent-secondary));
        transform: scaleX(0);
        transition: transform var(--transition-smooth);
      }
  
      .card:hover::before {
        left: 100%;
      }
      
      .card:hover::after {
        transform: scaleX(1);
      }
  
      .card:hover {
        background: var(--glass-hover);
        border-color: var(--border-medium);
        transform: translateY(-4px);
        box-shadow: var(--shadow-medium);
      }
  
      .card-header {
        display: flex;
        align-items: flex-start;
        gap: 1rem;
        margin-bottom: 1rem;
      }
  
      .card-icon {
        width: 40px;
        height: 40px;
        background: var(--glass-tertiary);
        border-radius: 10px;
        display: flex;
        align-items: center;
        justify-content: center;
        flex-shrink: 0;
        transition: all var(--transition-smooth);
      }
      
      .card:hover .card-icon {
        background: var(--glass-hover);
        transform: scale(1.05);
      }
  
      .card-icon svg {
        width: 20px;
        height: 20px;
        color: var(--text-secondary);
        transition: all var(--transition-smooth);
      }
      
      .card:hover .card-icon svg {
        color: var(--text-primary);
      }
  
      .card-title {
        font-weight: 600;
        color: var(--text-primary);
        margin-bottom: 0.25rem;
      }
  
      .card-subtitle {
        font-size: 0.85rem;
        color: var(--text-tertiary);
      }
  
      .card-description {
        color: var(--text-secondary);
        line-height: 1.6;
        margin-bottom: 1rem;
      }
  
      .card-tags {
        display: flex;
        flex-wrap: wrap;
        gap: 0.5rem;
      }
  
      .tag {
        background: var(--glass-tertiary);
        border: 1px solid var(--border-subtle);
        color: var(--text-secondary);
        padding: 0.25rem 0.75rem;
        border-radius: 20px;
        font-size: 0.75rem;
        font-weight: 500;
        font-family: var(--font-mono);
      }
  
      /* Status Badges */
      .status-badge {
        display: inline-flex;
        align-items: center;
        gap: 0.25rem;
        padding: 0.25rem 0.75rem;
        background: var(--glass-tertiary);
        border: 1px solid var(--border-subtle);
        border-radius: 20px;
        font-size: 0.75rem;
        font-weight: 600;
        text-transform: uppercase;
        letter-spacing: 0.05em;
      }
  
      .status-badge.active { 
        background: rgba(39, 202, 63, 0.1);
        border-color: rgba(39, 202, 63, 0.3);
        color: #27ca3f;
      }
  
      .status-badge.development { 
        background: rgba(255, 189, 46, 0.1);
        border-color: rgba(255, 189, 46, 0.3);
        color: #ffbd2e;
      }
  
      .status-badge.winner { 
        background: rgba(255, 95, 86, 0.1);
        border-color: rgba(255, 95, 86, 0.3);
        color: #ff5f56;
      }
  
      /* List Items */
      .list-item {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 1rem;
        background: var(--glass-secondary);
        border: 1px solid var(--border-subtle);
        border-radius: 12px;
        transition: all var(--transition-smooth);
        cursor: none;
        position: relative;
        overflow: hidden;
      }
      
      .list-item::before {
        content: '';
        position: absolute;
        top: 0;
        left: -100%;
        width: 100%;
        height: 100%;
        background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.05), transparent);
        transition: left 0.6s ease;
      }
  
      .list-item:hover {
        background: var(--glass-hover);
        border-color: var(--border-medium);
        transform: translateX(4px);
        box-shadow: var(--shadow-soft);
      }
      
      .list-item:hover::before {
        left: 100%;
      }
  
      .list-item + .list-item {
        margin-top: 0.75rem;
      }
  
      .list-content {
        display: flex;
        align-items: center;
        gap: 1rem;
      }
  
      .list-icon {
        width: 32px;
        height: 32px;
        background: var(--glass-tertiary);
        border-radius: 8px;
        display: flex;
        align-items: center;
        justify-content: center;
        flex-shrink: 0;
        transition: all var(--transition-smooth);
      }
      
      .list-item:hover .list-icon {
        background: var(--glass-hover);
        transform: scale(1.05);
      }
  
      .list-icon svg {
        width: 16px;
        height: 16px;
        color: var(--text-secondary);
        transition: all var(--transition-smooth);
      }
      
      .list-item:hover .list-icon svg {
        color: var(--text-primary);
      }
  
      .list-text h4 {
        font-weight: 600;
        color: var(--text-primary);
        margin-bottom: 0.25rem;
        transition: all var(--transition-smooth);
      }
  
      .list-text p {
        font-size: 0.85rem;
        color: var(--text-secondary);
        transition: all var(--transition-smooth);
      }
      
      .list-item:hover .list-text p {
        color: var(--text-primary);
      }
  
      /* Responsive Design */
      @media (max-width: 1024px) {
        .sidebar {
          width: 240px;
        }
      }
  
      @media (max-width: 768px) {
        .sidebar {
          display: none;
        }
        
        .hero {
          grid-template-columns: 1fr;
          text-align: center;
        }
        
        .hero-stats {
          justify-content: center;
        }
        
        .app {
          height: 100vh;
          border-radius: 0;
        }
        
        body {
          padding: 0;
        }
      }
  
      /* Scrollbar */
      ::-webkit-scrollbar {
        width: 6px;
      }
  
      ::-webkit-scrollbar-track {
        background: transparent;
      }
  
      ::-webkit-scrollbar-thumb {
        background: var(--border-medium);
        border-radius: 3px;
      }
  
      ::-webkit-scrollbar-thumb:hover {
        background: var(--border-strong);
      }
  
      /* Selection */
      ::selection {
        background: var(--accent-glow);
        color: var(--bg-primary);
      }
  
      /* Focus states for accessibility */
      .btn:focus,
      .sidebar-item:focus {
        outline: 2px solid var(--accent-primary);
        outline-offset: 2px;
      }

      /* Smooth entrance animations */
      .fade-in {
        opacity: 0;
        transform: translateY(20px);
        animation: fadeInUp 0.6s ease forwards;
      }

      @keyframes fadeInUp {
        to {
          opacity: 1;
          transform: translateY(0);
        }
      }
    </style>
</head>
<body>
    <!-- Custom Cursor -->
    <div class="cursor cursor--small"></div>
    <div class="cursor cursor--large"></div>
    
    <!-- Video Background -->
    <div class="video-bg">
        <video autoplay loop muted>
            <!-- TODO: Replace with your video source -->
            <source src="TODO_VIDEO_URL" type="video/mp4">
        </video>
    </div>
    
    <!-- Theme Toggle -->
    <button class="theme-toggle" aria-label="Toggle theme">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <circle cx="12" cy="12" r="5"/>
            <line x1="12" y1="1" x2="12" y2="3"/>
            <line x1="12" y1="21" x2="12" y2="23"/>
            <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/>
            <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/>
            <line x1="1" y1="12" x2="3" y2="12"/>
            <line x1="21" y1="12" x2="23" y2="12"/>
            <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/>
            <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/>
        </svg>
    </button>
    
    <!-- Main App -->
    <div class="app">
        <!-- Header -->
        <header class="header">
            <div class="traffic-lights">
                <div class="traffic-light red"></div>
                <div class="traffic-light yellow"></div>
                <div class="traffic-light green"></div>
            </div>
            <div class="header-title">Aviv Shaked - Portfolio</div>
            <div class="header-profile">
                <div class="notification-icon">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/>
                        <path d="M13.73 21a2 2 0 0 1-3.46 0"/>
                    </svg>
                    <span class="notification-badge">3</span>
                </div>
                <!-- TODO: Replace with your profile image -->
                <img class="profile-avatar" src="https://avatars.githubusercontent.com/u/116463487?v=4" alt="Profile">
            </div>
        </header>
        
        <!-- Main Layout -->
        <div class="main-layout">
            <!-- Sidebar -->
            <nav class="sidebar">
                <div class="sidebar-section">
                    <div class="sidebar-title">Navigation</div>
                    <a href="#home" class="sidebar-item active">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
                            <polyline points="9,22 9,12 15,12 15,22"/>
                        </svg>
                        Home
                    </a>
                    <a href="#expertise" class="sidebar-item">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <rect x="3" y="3" width="18" height="18" rx="2" ry="2"/>
                            <circle cx="8.5" cy="8.5" r="1.5"/>
                            <path d="M21 15l-5-5L5 21"/>
                        </svg>
                        Expertise
                    </a>
                    <a href="#experience" class="sidebar-item">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <rect x="2" y="7" width="20" height="14" rx="2" ry="2"/>
                            <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/>
                        </svg>
                        Experience
                    </a>
                    <a href="#projects" class="sidebar-item">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <polyline points="16,18 22,12 16,6"/>
                            <polyline points="8,6 2,12 8,18"/>
                        </svg>
                        Projects
                    </a>
                    <a href="#about" class="sidebar-item">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
                            <circle cx="12" cy="7" r="4"/>
                        </svg>
                        About
                    </a>
                </div>
                
                <div class="sidebar-section">
                    <div class="sidebar-title">Connect</div>
                    <a href="https://www.linkedin.com/in/aviv-shaked-59a4b7271/" target="_blank" class="sidebar-item">
                        <svg viewBox="0 0 24 24" fill="currentColor">
                            <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                        </svg>
                        LinkedIn
                    </a>
                    <a href="https://github.com/Patcholie" target="_blank" class="sidebar-item">
                        <svg viewBox="0 0 24 24" fill="currentColor">
                            <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                        </svg>
                        GitHub
                    </a>
                    <a href="https://www.instagram.com/_avivshaked_/" target="_blank" class="sidebar-item">
                        <svg viewBox="0 0 24 24" fill="currentColor">
                            <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                        </svg>
                        Instagram
                    </a>
                </div>
            </nav>
            
            <!-- Main Content -->
            <main class="content">
                <!-- Hero Section -->
                <section id="home" class="content-section fade-in">
                    <div class="hero">
                        <div class="hero-content">
                            <h1>Aviv Shaked</h1>
                            <p class="hero-description">
                                18-year-old Cybersecurity Developer & Researcher from Haifa, Israel. Expert in C++, network security, 
                                and low-level programming. Currently developing revolutionary covert communication systems and building 
                                secure, high-performance applications.
                            </p>
                            <div class="hero-stats">
                                <div class="stat-item">
                                    <span class="stat-number">2nd</span>
                                    <span class="stat-label">AI4Y World</span>
                                </div>
                                <div class="stat-item">
                                    <span class="stat-number">5+</span>
                                    <span class="stat-label">Major Projects</span>
                                </div>
                                <div class="stat-item">
                                    <span class="stat-number">3+</span>
                                    <span class="stat-label">Years Experience</span>
                                </div>
                            </div>
                            <div style="display: flex; gap: 1rem; flex-wrap: wrap;">
                                <a href="#projects" class="btn btn-primary">View Projects</a>
                                <a href="https://drive.google.com/file/d/1v5AKQbmrSW2lbF-qxyDP-BN9oiStiLwQ/view?usp=sharing" target="_blank" class="btn">Resume</a>
                            </div>
                        </div>
                        <div class="hero-visual">
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
                                <path d="M12 15a3 3 0 0 0 0-6m0 6a3 3 0 0 1 0-6m0 6v2a1 1 0 0 1-1 1h-4a1 1 0 0 1-1-1v-4h6m0-6V5a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v4h-6"/>
                                <path d="M6 15h12a4 4 0 0 0 0-8H6a4 4 0 0 0 0 8z"/>
                            </svg>
                        </div>
                    </div>
                </section>

                <!-- Expertise Section -->
                <section id="expertise" class="content-section fade-in">
                    <div class="section-header">
                        <div>
                            <h2 class="section-title">Technical Expertise</h2>
                            <p class="section-subtitle">Deep knowledge across multiple domains of cybersecurity and software development</p>
                        </div>
                    </div>
                    <div class="card-grid">
                        <div class="card">
                            <div class="card-header">
                                <div class="card-icon">
                                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                        <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
                                        <circle cx="12" cy="16" r="1"/>
                                        <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
                                    </svg>
                                </div>
                                <div>
                                    <h3 class="card-title">Cybersecurity & Network Security</h3>
                                    <p class="card-subtitle">Expert Level</p>
                                </div>
                            </div>
                            <p class="card-description">
                                Network security, penetration testing, and reverse engineering. Experience with network steganography, 
                                covert communication systems, and security research.
                            </p>
                            <div class="card-tags">
                                <span class="tag">C++20</span>
                                <span class="tag">Steganography</span>
                                <span class="tag">Network Programming</span>
                                <span class="tag">Penetration Testing</span>
                            </div>
                        </div>

                        <div class="card">
                            <div class="card-header">
                                <div class="card-icon">
                                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                        <polyline points="16,18 22,12 16,6"/>
                                        <polyline points="8,6 2,12 8,18"/>
                                    </svg>
                                </div>
                                <div>
                                    <h3 class="card-title">Low-Level Systems Programming</h3>
                                    <p class="card-subtitle">Expert Level</p>
                                </div>
                            </div>
                            <p class="card-description">
                                Advanced C++ development with focus on performance, memory management, and system-level programming. 
                                Expertise in multi-threading, networking, and server architecture.
                            </p>
                            <div class="card-tags">
                                <span class="tag">C/C++</span>
                                <span class="tag">Assembly</span>
                                <span class="tag">Multi-threading</span>
                                <span class="tag">RAII</span>
                            </div>
                        </div>

                        <div class="card">
                            <div class="card-header">
                                <div class="card-icon">
                                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                        <circle cx="12" cy="12" r="3"/>
                                        <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"/>
                                    </svg>
                                </div>
                                <div>
                                    <h3 class="card-title">Full-Stack Development & AI</h3>
                                    <p class="card-subtitle">Professional</p>
                                </div>
                            </div>
                            <p class="card-description">
                                Full-stack Python development including AI/ML implementations, automation tools, and web development. 
                                Experience with neural networks and data processing systems.
                            </p>
                            <div class="card-tags">
                                <span class="tag">Python</span>
                                <span class="tag">AI/ML</span>
                                <span class="tag">Web Development</span>
                                <span class="tag">Automation</span>
                            </div>
                        </div>
                    </div>
                </section>

                <!-- Experience Section -->
                <section id="experience" class="content-section fade-in">
                    <div class="section-header">
                        <div>
                            <h2 class="section-title">Professional Experience</h2>
                            <p class="section-subtitle">Building cutting-edge solutions and advancing cybersecurity research</p>
                        </div>
                    </div>
                    <div style="display: flex; flex-direction: column; gap: 0.75rem;">
                        <div class="list-item">
                            <div class="list-content">
                                <div class="list-icon">
                                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                        <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
                                    </svg>
                                </div>
                                <div class="list-text">
                                    <h4>AllBikes - Product Uploader & Tools Developer</h4>
                                    <p>Building automated tools and secure data systems with Python automation</p>
                                </div>
                            </div>
                            <span class="status-badge active">2023-Present</span>
                        </div>

                        <div class="list-item">
                            <div class="list-content">
                                <div class="list-icon">
                                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                        <path d="M22 10v6M2 10l10-5 10 5-10 5z"/>
                                        <path d="M6 12v5c3 3 9 3 12 0v-5"/>
                                    </svg>
                                </div>
                                <div class="list-text">
                                    <h4>Cyber Education Center - Student & Researcher</h4>
                                    <p>Advanced cybersecurity studies and cutting-edge research projects</p>
                                </div>
                            </div>
                            <span class="status-badge active">2023-Present</span>
                        </div>

                        <div class="list-item">
                            <div class="list-content">
                                <div class="list-icon">
                                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                        <path d="M6 9l6 6 6-6"/>
                                    </svg>
                                </div>
                                <div class="list-text">
                                    <h4>Analisis Team - AI4Y World Competition</h4>
                                    <p>Captain Team member, 2nd place globally in AI4Y World Competition</p>
                                </div>
                            </div>
                            <span class="status-badge winner">2022-2023</span>
                        </div>
                    </div>
                </section>

                <!-- Projects Section -->
                <section id="projects" class="content-section fade-in">
                    <div class="section-header">
                        <div>
                            <h2 class="section-title">Featured Projects</h2>
                            <p class="section-subtitle">Innovative solutions in cybersecurity, AI, and systems programming</p>
                        </div>
                    </div>
                    <div class="card-grid">
                        <div class="card">
                            <div class="card-header">
                                <div class="card-icon">
                                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                        <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
                                        <circle cx="12" cy="16" r="1"/>
                                        <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
                                    </svg>
                                </div>
                                <div>
                                    <h3 class="card-title">HitchHiker: Network Steganography Platform</h3>
                                    <span class="status-badge development">In Development</span>
                                </div>
                            </div>
                            <p class="card-description">
                                Revolutionary covert communication system that enables hidden data transmission without creating new network packets. 
                                Advanced C++20 implementation with multi-threading, Docker containerization, and undetectable steganography.
                            </p>
                            <div class="card-tags">
                                <span class="tag">C++20</span>
                                <span class="tag">Multi-threading</span>
                                <span class="tag">Docker</span>
                                <span class="tag">CMake</span>
                                <span class="tag">Network Security</span>
                            </div>
                        </div>

                        <div class="card">
                            <div class="card-header">
                                <div class="card-icon">
                                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                        <polygon points="13,2 3,14 12,14 11,22 21,10 12,10 13,2"/>
                                    </svg>
                                </div>
                                <div>
                                    <h3 class="card-title">Multiplayer Trivia Game System</h3>
                                    <span class="status-badge active">Completed</span>
                                </div>
                            </div>
                            <p class="card-description">
                                High-performance C++ server with Unity client. Handles 25+ concurrent players with custom binary protocol, 
                                thread-safe architecture, and real-time synchronization.
                            </p>
                            <div class="card-tags">
                                <span class="tag">C++17</span>
                                <span class="tag">Unity</span>
                                <span class="tag">SQLite3</span>
                                <span class="tag">RAII</span>
                                <span class="tag">Network Programming</span>
                            </div>
                        </div>

                        <div class="card">
                            <div class="card-header">
                                <div class="card-icon">
                                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                        <path d="M9 12l2 2 4-4"/>
                                        <path d="M21 12c-1 0-3-1-3-3s2-3 3-3 3 1 3 3-2 3-3 3"/>
                                        <path d="M3 12c1 0 3-1 3-3s-2-3-3-3-3 1-3 3 2 3 3 3"/>
                                        <path d="M3 12c0 5.5 4.5 10 10 10s10-4.5 10-10"/>
                                    </svg>
                                </div>
                                <div>
                                    <h3 class="card-title">Analisis: AI Medical Diagnosis Platform</h3>
                                    <span class="status-badge winner">World Finalist</span>
                                </div>
                            </div>
                            <p class="card-description">
                                AI-powered medical platform for wound detection and treatment recommendations. Won National AI4Y Competition, 
                                represented Israel in world competition achieving 2nd place globally.
                            </p>
                            <div class="card-tags">
                                <span class="tag">Python</span>
                                <span class="tag">AI/ML</span>
                                <span class="tag">Computer Vision</span>
                                <span class="tag">Web Development</span>
                            </div>
                        </div>
                    </div>
                </section>

                <!-- About Section -->
                <section id="about" class="content-section fade-in">
                    <div class="section-header">
                        <div>
                            <h2 class="section-title">About Me</h2>
                            <p class="section-subtitle">Passionate about cybersecurity, innovation, and building the future</p>
                        </div>
                    </div>
                    <div class="card">
                        <div class="card-header">
                            <div style="width: 60px; height: 60px; border-radius: 12px; overflow: hidden; border: 2px solid var(--border-medium);">
                                <!-- TODO: Replace with your profile image -->
                                <img src="https://avatars.githubusercontent.com/u/116463487?v=4" style="width: 100%; height: 100%; object-fit: cover;" alt="Aviv Shaked">
                            </div>
                            <div>
                                <h3 class="card-title">Aviv Shaked</h3>
                                <p class="card-subtitle">Cybersecurity Developer & Researcher</p>
                            </div>
                        </div>
                        <p class="card-description">
                            I'm an 18-year-old cybersecurity developer and researcher from Haifa, Israel. Currently pursuing advanced studies 
                            in cybersecurity at Magshimim Cyber Center and computer science at Bosmat Technological School.
                            <br><br>
                            My expertise lies in building secure, high-performance systems using modern C++. I've been part of the Captain Team 
                            of Analisis, which represented Israel in the AI4Y World Competition, and I'm currently developing revolutionary 
                            covert communication systems.
                            <br><br>
                            Professional experience includes building automated tools and secure data systems at AllBikes, with expertise in 
                            Python automation and data processing. Always eager to take on challenging projects that push the boundaries of 
                            cybersecurity and software engineering.
                        </p>
                        <div class="card-tags">
                            <span class="tag">Cybersecurity Research</span>
                            <span class="tag">C++ Expert</span>
                            <span class="tag">AI Competition Winner</span>
                            <span class="tag">Systems Programming</span>
                        </div>
                    </div>
                </section>
            </main>
        </div>
    </div>

    <script>
        // Improved Cursor System
        const cursorSmall = document.querySelector('.cursor--small');
        const cursorLarge = document.querySelector('.cursor--large');
        
        let mouseX = 0;
        let mouseY = 0;
        let largeCursorX = 0;
        let largeCursorY = 0;
        
        // Instant cursor tracking
        document.addEventListener('mousemove', (e) => {
            mouseX = e.clientX;
            mouseY = e.clientY;
            
            // Small cursor follows instantly
            cursorSmall.style.left = mouseX + 'px';
            cursorSmall.style.top = mouseY + 'px';
        });
        
        // Smooth cursor follow
        let isHovering = false;
        let hoverTarget = null;
        
        function animateLargeCursor() {
            if (isHovering && hoverTarget) {
                // Snap to element center when hovering
                const rect = hoverTarget.getBoundingClientRect();
                const targetX = rect.left + rect.width / 2;
                const targetY = rect.top + rect.height / 2;
                
                largeCursorX += (targetX - largeCursorX) * 0.3;
                largeCursorY += (targetY - largeCursorY) * 0.3;
            } else {
                // Follow mouse smoothly
                largeCursorX += (mouseX - largeCursorX) * 0.2;
                largeCursorY += (mouseY - largeCursorY) * 0.2;
            }
            
            cursorLarge.style.left = largeCursorX + 'px';
            cursorLarge.style.top = largeCursorY + 'px';
            
            requestAnimationFrame(animateLargeCursor);
        }
        animateLargeCursor();
        
        // Better cursor morphing - properly wraps around elements
        const interactiveElements = document.querySelectorAll('a, button, .card, .list-item, .sidebar-item, .traffic-light, .hero-visual, .card-icon');
        
        interactiveElements.forEach(el => {
            el.addEventListener('mouseenter', () => {
                isHovering = true;
                hoverTarget = el;
                cursorLarge.classList.add('morphed');
                
                // Get element dimensions and adjust cursor size accordingly
                const rect = el.getBoundingClientRect();
                const maxSize = 80;
                const minSize = 40;
                
                // Calculate appropriate size based on element
                let newWidth = Math.min(rect.width * 0.9, maxSize);
                let newHeight = Math.min(rect.height * 0.9, maxSize);
                
                // Ensure minimum size
                newWidth = Math.max(newWidth, minSize);
                newHeight = Math.max(newHeight, minSize);
                
                // For very wide elements, make it more proportional
                if (rect.width > rect.height * 2) {
                    newWidth = Math.min(rect.width * 0.6, maxSize);
                }
                
                cursorLarge.style.width = newWidth + 'px';
                cursorLarge.style.height = newHeight + 'px';
                
                // Adjust border radius based on element
                if (el.classList.contains('traffic-light') || el.classList.contains('profile-avatar')) {
                    cursorLarge.style.borderRadius = '50%';
                } else {
                    cursorLarge.style.borderRadius = '12px';
                }
                
                cursorLarge.style.transition = 'width 0.3s ease, height 0.3s ease, border-radius 0.3s ease';
            });
            
            el.addEventListener('mouseleave', () => {
                isHovering = false;
                hoverTarget = null;
                cursorLarge.classList.remove('morphed');
                cursorLarge.style.width = '32px';
                cursorLarge.style.height = '32px';
                cursorLarge.style.borderRadius = '50%';
                cursorLarge.style.transition = 'width 0.3s ease, height 0.3s ease, border-radius 0.3s ease';
            });
        });
        
        // Theme toggle
        const themeToggle = document.querySelector('.theme-toggle');
        themeToggle.addEventListener('click', () => {
            document.body.classList.toggle('light-mode');
            localStorage.setItem('theme', document.body.classList.contains('light-mode') ? 'light' : 'dark');
        });
        
        // Load saved theme
        const savedTheme = localStorage.getItem('theme');
        if (savedTheme === 'light') {
            document.body.classList.add('light-mode');
        }
        
        // Smooth scrolling for navigation
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });
        
        // Active navigation highlighting
        const navItems = document.querySelectorAll('.sidebar-item');
        const sections = document.querySelectorAll('.content-section');
        
        function updateActiveNav() {
            let current = '';
            sections.forEach(section => {
                const sectionTop = section.getBoundingClientRect().top;
                if (sectionTop <= 100) {
                    current = section.getAttribute('id');
                }
            });
            
            navItems.forEach(item => {
                item.classList.remove('active');
                if (item.getAttribute('href') === `#${current}`) {
                    item.classList.add('active');
                }
            });
        }
        
        // Scroll listener with throttling
        let ticking = false;
        document.querySelector('.content').addEventListener('scroll', () => {
            if (!ticking) {
                requestAnimationFrame(() => {
                    updateActiveNav();
                    ticking = false;
                });
                ticking = true;
            }
        });
        
        // Keyboard navigation
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Tab') {
                document.body.classList.add('keyboard-nav');
            }
        });
        
        document.addEventListener('mousedown', () => {
            document.body.classList.remove('keyboard-nav');
        });
        
        // Intersection Observer for fade-in animations
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.animationDelay = '0s';
                    entry.target.style.animationPlayState = 'running';
                }
            });
        }, observerOptions);
        
        // Observe sections for animations
        sections.forEach((section, index) => {
            section.style.animationDelay = `${index * 0.1}s`;
            section.style.animationPlayState = 'paused';
            observer.observe(section);
        });
        
        // Page load
        window.addEventListener('load', () => {
            // Trigger initial animations
            document.querySelectorAll('.fade-in').forEach((el, index) => {
                setTimeout(() => {
                    el.style.animationPlayState = 'running';
                }, index * 100);
            });
        });
    </script>
</body>
</html>
