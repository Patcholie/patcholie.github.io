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
        /* Monochrome Professional Color Scheme */
        --bg-primary: #0a0a0a;
        --bg-secondary: #111111;
        --bg-tertiary: #1a1a1a;
        --bg-glass: rgba(20, 20, 20, 0.85);
        --bg-glass-light: rgba(40, 40, 40, 0.4);
        --bg-card: rgba(25, 25, 25, 0.8);
        
        --text-primary: #ffffff;
        --text-secondary: #b4b4b4;
        --text-muted: #666666;
        --text-accent: #e5e5e5;
        
        --accent-primary: #3b82f6;
        --accent-secondary: #06b6d4;
        --accent-success: #10b981;
        --accent-warning: #f59e0b;
        
        --border-primary: rgba(255, 255, 255, 0.1);
        --border-secondary: rgba(255, 255, 255, 0.05);
        --border-accent: rgba(59, 130, 246, 0.3);
        
        --shadow-sm: 0 2px 8px rgba(0, 0, 0, 0.3);
        --shadow-md: 0 4px 16px rgba(0, 0, 0, 0.4);
        --shadow-lg: 0 8px 32px rgba(0, 0, 0, 0.5);
        --shadow-accent: 0 0 20px rgba(59, 130, 246, 0.2);
        
        --blur-sm: blur(8px);
        --blur-md: blur(16px);
        --blur-lg: blur(24px);
        
        --font-primary: 'Inter', sans-serif;
        --font-mono: 'JetBrains Mono', monospace;
        
        --duration-fast: 0.15s;
        --duration-normal: 0.3s;
        --duration-slow: 0.6s;
        
        --ease-smooth: cubic-bezier(0.4, 0, 0.2, 1);
        --ease-bounce: cubic-bezier(0.68, -0.55, 0.265, 1.55);
      }
  
      .light-mode {
        --bg-primary: #fafafa;
        --bg-secondary: #ffffff;
        --bg-tertiary: #f5f5f5;
        --bg-glass: rgba(255, 255, 255, 0.85);
        --bg-glass-light: rgba(245, 245, 245, 0.6);
        --bg-card: rgba(255, 255, 255, 0.9);
        
        --text-primary: #0a0a0a;
        --text-secondary: #4b4b4b;
        --text-muted: #999999;
        --text-accent: #1a1a1a;
        
        --border-primary: rgba(0, 0, 0, 0.1);
        --border-secondary: rgba(0, 0, 0, 0.05);
        --border-accent: rgba(59, 130, 246, 0.3);
        
        --shadow-sm: 0 2px 8px rgba(0, 0, 0, 0.1);
        --shadow-md: 0 4px 16px rgba(0, 0, 0, 0.1);
        --shadow-lg: 0 8px 32px rgba(0, 0, 0, 0.15);
      }
  
      html {
        box-sizing: border-box;
        -webkit-font-smoothing: antialiased;
        scroll-behavior: smooth;
      }
  
      body {
        cursor: none;
        font-family: var(--font-primary);
        background: var(--bg-primary);
        color: var(--text-primary);
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
        padding: 2rem;
        width: 100%;
        min-height: 100vh;
        overflow-x: hidden;
        line-height: 1.6;
        font-weight: 400;
        
        /* TODO: Replace with your background image/video */
        background-image: url('TODO_BACKGROUND_IMAGE_URL');
        background-size: cover;
        background-position: center;
        background-attachment: fixed;
      }
  
      /* Ultra-smooth custom cursor */
      .cursor {
        width: var(--size);
        height: var(--size);
        border-radius: 50%;
        position: fixed;
        left: 0;
        top: 0;
        pointer-events: none;
        z-index: 9999;
        mix-blend-mode: difference;
        transition: transform var(--duration-fast) var(--ease-smooth);
      }
  
      .cursor--large {
        --size: 32px;
        border: 2px solid var(--text-primary);
        background: transparent;
        transition: all var(--duration-fast) var(--ease-smooth);
      }
  
      .cursor--small {
        --size: 4px;
        background: var(--text-primary);
        transform: translate(-50%, -50%);
        transition: all var(--duration-fast) var(--ease-smooth);
      }
  
      .cursor--large.cursor--hover {
        --size: 48px;
        background: rgba(59, 130, 246, 0.1);
        border-color: var(--accent-primary);
      }
  
      .cursor--small.cursor--hover {
        --size: 8px;
        background: var(--accent-primary);
      }
  
      /* Background video */
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
        /* TODO: Replace with your video source */
        /* source: 'TODO_VIDEO_URL' */
      }
  
      /* Animated gradient overlay */
      .bg-overlay {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        z-index: -1;
        background: linear-gradient(
          135deg,
          rgba(59, 130, 246, 0.03) 0%,
          rgba(6, 182, 212, 0.02) 50%,
          rgba(16, 185, 129, 0.03) 100%
        );
        animation: gradientShift 20s ease infinite;
      }
  
      @keyframes gradientShift {
        0%, 100% { opacity: 0.8; }
        50% { opacity: 0.4; }
      }
  
      /* Theme toggle */
      .theme-toggle {
        position: fixed;
        bottom: 2rem;
        right: 2rem;
        width: 56px;
        height: 56px;
        background: var(--bg-glass);
        backdrop-filter: var(--blur-md);
        border: 1px solid var(--border-primary);
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: none;
        transition: all var(--duration-normal) var(--ease-smooth);
        z-index: 100;
        box-shadow: var(--shadow-md);
      }
  
      .theme-toggle:hover {
        transform: translateY(-2px) scale(1.05);
        box-shadow: var(--shadow-lg);
        border-color: var(--border-accent);
      }
  
      .theme-toggle svg {
        width: 24px;
        height: 24px;
        fill: var(--accent-primary);
        transition: all var(--duration-normal) var(--ease-smooth);
      }
  
      .light-mode .theme-toggle svg {
        transform: rotate(180deg);
      }
  
      /* Main app container */
      .app {
        background: var(--bg-glass);
        backdrop-filter: var(--blur-lg);
        border: 1px solid var(--border-primary);
        max-width: 1400px;
        width: 100%;
        max-height: 90vh;
        height: 85vh;
        display: flex;
        flex-direction: column;
        overflow: hidden;
        border-radius: 20px;
        box-shadow: var(--shadow-lg);
        transition: all var(--duration-slow) var(--ease-smooth);
        position: relative;
      }
  
      .app::before {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: linear-gradient(135deg, 
          rgba(255, 255, 255, 0.05) 0%, 
          transparent 50%, 
          rgba(255, 255, 255, 0.02) 100%);
        border-radius: inherit;
        pointer-events: none;
      }
  
      /* Header */
      .header {
        display: flex;
        align-items: center;
        padding: 1.5rem 2rem;
        border-bottom: 1px solid var(--border-primary);
        backdrop-filter: var(--blur-sm);
        position: relative;
        z-index: 10;
      }
  
      .header::before {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: linear-gradient(90deg, 
          rgba(59, 130, 246, 0.02) 0%, 
          transparent 50%, 
          rgba(6, 182, 212, 0.02) 100%);
      }
  
      /* Traffic lights */
      .traffic-lights {
        display: flex;
        gap: 8px;
        margin-right: 2rem;
      }
  
      .traffic-light {
        width: 12px;
        height: 12px;
        border-radius: 50%;
        transition: all var(--duration-normal) var(--ease-smooth);
      }
  
      .traffic-light.red { background: #ff5f57; }
      .traffic-light.yellow { background: #ffbd2e; }
      .traffic-light.green { background: #28ca42; }
  
      .traffic-light:hover {
        transform: scale(1.2);
        box-shadow: 0 0 12px currentColor;
      }
  
      /* Navigation */
      .nav-menu {
        display: flex;
        gap: 2rem;
        margin-left: auto;
        margin-right: 2rem;
      }
  
      .nav-link {
        color: var(--text-secondary);
        text-decoration: none;
        font-weight: 500;
        font-size: 0.95rem;
        padding: 0.75rem 1.5rem;
        border-radius: 12px;
        transition: all var(--duration-normal) var(--ease-smooth);
        position: relative;
        overflow: hidden;
      }
  
      .nav-link::before {
        content: '';
        position: absolute;
        top: 0;
        left: -100%;
        width: 100%;
        height: 100%;
        background: linear-gradient(90deg, transparent, rgba(59, 130, 246, 0.1), transparent);
        transition: left var(--duration-slow) var(--ease-smooth);
      }
  
      .nav-link:hover::before {
        left: 100%;
      }
  
      .nav-link:hover,
      .nav-link.active {
        color: var(--text-primary);
        background: var(--bg-glass-light);
        transform: translateY(-1px);
      }
  
      /* Profile */
      .profile-section {
        display: flex;
        align-items: center;
        gap: 1rem;
      }
  
      .notification-badge {
        position: relative;
        padding: 0.5rem;
        border-radius: 50%;
        background: var(--bg-glass-light);
        transition: all var(--duration-normal) var(--ease-smooth);
      }
  
      .notification-badge:hover {
        background: var(--bg-card);
        transform: scale(1.1);
      }
  
      .notification-badge svg {
        width: 20px;
        height: 20px;
        fill: var(--text-secondary);
      }
  
      .notification-count {
        position: absolute;
        top: -2px;
        right: -2px;
        background: var(--accent-primary);
        color: white;
        font-size: 0.75rem;
        font-weight: 600;
        padding: 2px 6px;
        border-radius: 10px;
        min-width: 18px;
        text-align: center;
        animation: pulse 2s infinite;
      }
  
      @keyframes pulse {
        0%, 100% { transform: scale(1); }
        50% { transform: scale(1.1); }
      }
  
      .profile-image {
        width: 40px;
        height: 40px;
        border-radius: 50%;
        border: 2px solid var(--border-accent);
        transition: all var(--duration-normal) var(--ease-smooth);
        /* TODO: Replace with your profile image */
        /* src: 'TODO_PROFILE_IMAGE_URL' */
      }
  
      .profile-image:hover {
        transform: scale(1.1);
        box-shadow: var(--shadow-accent);
      }
  
      /* Main content area */
      .main-content {
        display: flex;
        flex: 1;
        overflow: hidden;
      }
  
      /* Sidebar */
      .sidebar {
        width: 280px;
        background: var(--bg-glass-light);
        border-right: 1px solid var(--border-primary);
        padding: 2rem;
        overflow-y: auto;
        scrollbar-width: none;
        -ms-overflow-style: none;
      }
  
      .sidebar::-webkit-scrollbar {
        display: none;
      }
  
      .sidebar-section {
        margin-bottom: 2.5rem;
      }
  
      .sidebar-title {
        font-size: 0.8rem;
        font-weight: 600;
        color: var(--text-muted);
        text-transform: uppercase;
        letter-spacing: 0.1em;
        margin-bottom: 1rem;
      }
  
      .sidebar-link {
        display: flex;
        align-items: center;
        padding: 0.75rem 1rem;
        color: var(--text-secondary);
        text-decoration: none;
        border-radius: 12px;
        margin-bottom: 0.5rem;
        transition: all var(--duration-normal) var(--ease-smooth);
        font-size: 0.95rem;
        position: relative;
        overflow: hidden;
      }
  
      .sidebar-link::before {
        content: '';
        position: absolute;
        left: 0;
        top: 0;
        height: 100%;
        width: 3px;
        background: var(--accent-primary);
        transform: scaleY(0);
        transition: transform var(--duration-normal) var(--ease-smooth);
      }
  
      .sidebar-link:hover::before,
      .sidebar-link.active::before {
        transform: scaleY(1);
      }
  
      .sidebar-link:hover,
      .sidebar-link.active {
        background: var(--bg-card);
        color: var(--text-primary);
        transform: translateX(8px);
      }
  
      .sidebar-link svg {
        width: 18px;
        height: 18px;
        margin-right: 12px;
        fill: currentColor;
      }
  
      /* Content wrapper */
      .content {
        flex: 1;
        padding: 2rem;
        overflow-y: auto;
        scrollbar-width: thin;
        scrollbar-color: var(--border-primary) transparent;
      }
  
      .content::-webkit-scrollbar {
        width: 6px;
      }
  
      .content::-webkit-scrollbar-track {
        background: transparent;
      }
  
      .content::-webkit-scrollbar-thumb {
        background: var(--border-primary);
        border-radius: 3px;
      }
  
      .content::-webkit-scrollbar-thumb:hover {
        background: var(--border-accent);
      }
  
      /* Section styles */
      .section {
        margin-bottom: 3rem;
        opacity: 0;
        transform: translateY(20px);
        animation: fadeInUp 0.8s ease forwards;
      }
  
      .section:nth-child(2) { animation-delay: 0.1s; }
      .section:nth-child(3) { animation-delay: 0.2s; }
      .section:nth-child(4) { animation-delay: 0.3s; }
      .section:nth-child(5) { animation-delay: 0.4s; }
  
      @keyframes fadeInUp {
        to {
          opacity: 1;
          transform: translateY(0);
        }
      }
  
      .section-header {
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin-bottom: 2rem;
      }
  
      .section-title {
        font-size: 2rem;
        font-weight: 700;
        color: var(--text-primary);
        margin: 0;
      }
  
      .section-subtitle {
        font-size: 1rem;
        color: var(--text-secondary);
        margin-top: 0.5rem;
      }
  
      /* Hero section */
      .hero {
        display: grid;
        grid-template-columns: 1fr 300px;
        gap: 3rem;
        align-items: center;
        margin-bottom: 4rem;
      }
  
      .hero-content h1 {
        font-size: 3.5rem;
        font-weight: 800;
        line-height: 1.1;
        margin-bottom: 1rem;
        background: linear-gradient(135deg, var(--text-primary) 0%, var(--accent-primary) 100%);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        background-clip: text;
      }
  
      .hero-content .role {
        font-size: 1.25rem;
        color: var(--accent-primary);
        font-weight: 600;
        margin-bottom: 1.5rem;
      }
  
      .hero-content .description {
        font-size: 1.1rem;
        color: var(--text-secondary);
        line-height: 1.7;
        margin-bottom: 2rem;
      }
  
      .hero-stats {
        display: flex;
        gap: 2rem;
        margin-bottom: 2rem;
      }
  
      .stat-item {
        text-align: center;
        padding: 1.5rem;
        background: var(--bg-card);
        border-radius: 16px;
        border: 1px solid var(--border-primary);
        transition: all var(--duration-normal) var(--ease-smooth);
        position: relative;
        overflow: hidden;
      }
  
      .stat-item::before {
        content: '';
        position: absolute;
        top: 0;
        left: -100%;
        width: 100%;
        height: 100%;
        background: linear-gradient(90deg, transparent, rgba(59, 130, 246, 0.05), transparent);
        transition: left var(--duration-slow) var(--ease-smooth);
      }
  
      .stat-item:hover::before {
        left: 100%;
      }
  
      .stat-item:hover {
        transform: translateY(-4px);
        box-shadow: var(--shadow-md);
        border-color: var(--border-accent);
      }
  
      .stat-number {
        font-size: 2rem;
        font-weight: 800;
        color: var(--accent-primary);
        display: block;
        line-height: 1;
      }
  
      .stat-label {
        font-size: 0.85rem;
        color: var(--text-muted);
        font-weight: 500;
        margin-top: 0.5rem;
      }
  
      .hero-actions {
        display: flex;
        gap: 1rem;
      }
  
      /* Buttons */
      .btn {
        padding: 1rem 2rem;
        border-radius: 12px;
        font-weight: 600;
        text-decoration: none;
        font-size: 0.95rem;
        transition: all var(--duration-normal) var(--ease-smooth);
        position: relative;
        overflow: hidden;
        border: none;
        cursor: none;
        display: inline-flex;
        align-items: center;
        gap: 0.5rem;
      }
  
      .btn::before {
        content: '';
        position: absolute;
        top: 0;
        left: -100%;
        width: 100%;
        height: 100%;
        background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.1), transparent);
        transition: left var(--duration-slow) var(--ease-smooth);
      }
  
      .btn:hover::before {
        left: 100%;
      }
  
      .btn-primary {
        background: linear-gradient(135deg, var(--accent-primary), var(--accent-secondary));
        color: white;
        box-shadow: var(--shadow-sm);
      }
  
      .btn-primary:hover {
        transform: translateY(-2px);
        box-shadow: var(--shadow-md);
      }
  
      .btn-secondary {
        background: var(--bg-card);
        color: var(--text-primary);
        border: 1px solid var(--border-primary);
      }
  
      .btn-secondary:hover {
        background: var(--bg-glass-light);
        border-color: var(--border-accent);
        transform: translateY(-2px);
      }
  
      /* Hero visual */
      .hero-visual {
        position: relative;
        display: flex;
        justify-content: center;
        align-items: center;
      }
  
      .code-window {
        background: var(--bg-secondary);
        border-radius: 16px;
        border: 1px solid var(--border-primary);
        overflow: hidden;
        width: 100%;
        max-width: 350px;
        box-shadow: var(--shadow-lg);
        position: relative;
      }
  
      .code-header {
        background: var(--bg-tertiary);
        padding: 1rem;
        display: flex;
        align-items: center;
        gap: 0.5rem;
        border-bottom: 1px solid var(--border-primary);
      }
  
      .code-dots {
        display: flex;
        gap: 6px;
      }
  
      .code-dot {
        width: 10px;
        height: 10px;
        border-radius: 50%;
      }
  
      .code-dot.red { background: #ff5f57; }
      .code-dot.yellow { background: #ffbd2e; }
      .code-dot.green { background: #28ca42; }
  
      .code-title {
        font-family: var(--font-mono);
        font-size: 0.8rem;
        color: var(--text-muted);
        margin-left: 1rem;
      }
  
      .code-content {
        padding: 1.5rem;
        font-family: var(--font-mono);
        font-size: 0.85rem;
        line-height: 1.6;
        color: var(--text-secondary);
      }
  
      .code-keyword { color: var(--accent-primary); }
      .code-string { color: var(--accent-success); }
      .code-comment { color: var(--text-muted); }
      .code-function { color: var(--accent-warning); }
  
      /* Cards grid */
      .cards-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
        gap: 1.5rem;
        margin-top: 2rem;
      }
  
      .card {
        background: var(--bg-card);
        border: 1px solid var(--border-primary);
        border-radius: 20px;
        padding: 2rem;
        transition: all var(--duration-normal) var(--ease-smooth);
        position: relative;
        overflow: hidden;
      }
  
      .card::before {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        height: 4px;
        background: linear-gradient(90deg, var(--accent-primary), var(--accent-secondary));
        transform: scaleX(0);
        transition: transform var(--duration-normal) var(--ease-smooth);
      }
  
      .card:hover::before {
        transform: scaleX(1);
      }
  
      .card:hover {
        transform: translateY(-8px);
        box-shadow: var(--shadow-lg);
        border-color: var(--border-accent);
      }
  
      .card-header {
        display: flex;
        align-items: flex-start;
        gap: 1rem;
        margin-bottom: 1.5rem;
      }
  
      .card-icon {
        width: 48px;
        height: 48px;
        background: linear-gradient(135deg, var(--accent-primary), var(--accent-secondary));
        border-radius: 12px;
        display: flex;
        align-items: center;
        justify-content: center;
        flex-shrink: 0;
      }
  
      .card-icon svg {
        width: 24px;
        height: 24px;
        fill: white;
      }
  
      .card-title {
        font-size: 1.3rem;
        font-weight: 700;
        color: var(--text-primary);
        margin: 0 0 0.5rem 0;
      }
  
      .card-subtitle {
        font-size: 0.9rem;
        color: var(--text-muted);
        margin: 0;
      }
  
      .card-content {
        color: var(--text-secondary);
        line-height: 1.6;
        margin-bottom: 1.5rem;
      }
  
      .card-tags {
        display: flex;
        flex-wrap: wrap;
        gap: 0.5rem;
        margin-bottom: 1.5rem;
      }
  
      .tag {
        background: var(--bg-glass-light);
        color: var(--accent-primary);
        padding: 0.5rem 1rem;
        border-radius: 20px;
        font-size: 0.8rem;
        font-weight: 500;
        border: 1px solid var(--border-accent);
        transition: all var(--duration-normal) var(--ease-smooth);
      }
  
      .tag:hover {
        background: var(--accent-primary);
        color: white;
        transform: scale(1.05);
      }
  
      .card-footer {
        display: flex;
        justify-content: space-between;
        align-items: center;
      }
  
      .status-badge {
        background: var(--accent-success);
        color: white;
        padding: 0.5rem 1rem;
        border-radius: 20px;
        font-size: 0.8rem;
        font-weight: 600;
      }
  
      .status-badge.development {
        background: var(--accent-warning);
      }
  
      .status-badge.winner {
        background: linear-gradient(135deg, var(--accent-primary), var(--accent-secondary));
      }
  
      /* Responsive design */
      @media (max-width: 1200px) {
        .sidebar {
          width: 240px;
        }
        
        .hero {
          grid-template-columns: 1fr;
          text-align: center;
        }
        
        .hero-content h1 {
          font-size: 3rem;
        }
      }
  
      @media (max-width: 768px) {
        body {
          padding: 1rem;
        }
        
        .app {
          height: 95vh;
          max-height: none;
        }
        
        .header {
          padding: 1rem;
        }
        
        .nav-menu {
          display: none;
        }
        
        .sidebar {
          display: none;
        }
        
        .content {
          padding: 1.5rem;
        }
        
        .hero-content h1 {
          font-size: 2.5rem;
        }
        
        .hero-stats {
          flex-direction: column;
          gap: 1rem;
        }
        
        .hero-actions {
          flex-direction: column;
        }
        
        .cards-grid {
          grid-template-columns: 1fr;
        }
        
        .cursor--large,
        .cursor--small {
          display: none;
        }
        
        body {
          cursor: auto;
        }
        
        .btn,
        .nav-link,
        .sidebar-link,
        .card {
          cursor: pointer;
        }
      }
  
      /* Smooth entry animations */
      .animate-fade-in {
        opacity: 0;
        animation: fadeIn 0.8s ease forwards;
      }
  
      .animate-slide-up {
        opacity: 0;
        transform: translateY(30px);
        animation: slideUp 0.8s ease forwards;
      }
  
      .animate-slide-left {
        opacity: 0;
        transform: translateX(-30px);
        animation: slideLeft 0.8s ease forwards;
      }
  
      @keyframes fadeIn {
        to { opacity: 1; }
      }
  
      @keyframes slideUp {
        to {
          opacity: 1;
          transform: translateY(0);
        }
      }
  
      @keyframes slideLeft {
        to {
          opacity: 1;
          transform: translateX(0);
        }
      }
    </style>
</head>
<body>
    <!-- Custom Cursor -->
    <div class="cursor cursor--large"></div>
    <div class="cursor cursor--small"></div>
    
    <!-- Background Video -->
    <div class="video-bg">
        <!-- TODO: Replace with your video source -->
        <!-- <video autoplay loop muted>
            <source src="TODO_VIDEO_URL" type="video/mp4">
        </video> -->
    </div>
    
    <!-- Animated Background Overlay -->
    <div class="bg-overlay"></div>
    
    <!-- Theme Toggle -->
    <div class="theme-toggle">
        <svg viewBox="0 0 24 24">
            <path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z" />
        </svg>
    </div>
    
    <!-- Main App Container -->
    <div class="app animate-fade-in">
        <!-- Header -->
        <header class="header">
            <div class="traffic-lights">
                <div class="traffic-light red"></div>
                <div class="traffic-light yellow"></div>
                <div class="traffic-light green"></div>
            </div>
            
            <nav class="nav-menu">
                <a href="#home" class="nav-link active">Home</a>
                <a href="#expertise" class="nav-link">Expertise</a>
                <a href="#projects" class="nav-link">Projects</a>
                <a href="#about" class="nav-link">About</a>
            </nav>
            
            <div class="profile-section">
                <div class="notification-badge">
                    <svg viewBox="0 0 24 24">
                        <path d="M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9M13.73 21a2 2 0 01-3.46 0" />
                    </svg>
                    <span class="notification-count">3</span>
                </div>
                <img class="profile-image" src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHZpZXdCb3g9IjAgMCA0MCA0MCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPGNpcmNsZSBjeD0iMjAiIGN5PSIyMCIgcj0iMjAiIGZpbGw9IiMzYjgyZjYiLz4KPHN2ZyB4PSI4IiB5PSI4IiB3aWR0aD0iMjQiIGhlaWdodD0iMjQiIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0ibm9uZSI+CjxwYXRoIGQ9Ik0yMCAyMXYtMmE0IDQgMCAwIDAtNC00SDhhNCA0IDAgMCAwLTQgNHYyIiBzdHJva2U9IndoaXRlIiBzdHJva2Utd2lkdGg9IjIiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIgc3Ryb2tlLWxpbmVqb2luPSJyb3VuZCIvPgo8Y2lyY2xlIGN4PSIxMiIgY3k9IjciIHI9IjQiIHN0cm9rZT0id2hpdGUiIHN0cm9rZS13aWR0aD0iMiIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIi8+Cjwvc3ZnPgo8L3N2Zz4K" alt="Profile">
                <!-- TODO: Replace with your actual profile image -->
            </div>
        </header>
        
        <!-- Main Content -->
        <div class="main-content">
            <!-- Sidebar -->
            <aside class="sidebar animate-slide-left">
                <div class="sidebar-section">
                    <div class="sidebar-title">Navigation</div>
                    <a href="#home" class="sidebar-link active">
                        <svg viewBox="0 0 24 24"><path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/></svg>
                        Home
                    </a>
                    <a href="#expertise" class="sidebar-link">
                        <svg viewBox="0 0 24 24"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
                        Expertise
                    </a>
                </div>
                
                <div class="sidebar-section">
                    <div class="sidebar-title">Categories</div>
                    <a href="#experience" class="sidebar-link">
                        <svg viewBox="0 0 24 24"><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/><polyline points="14,2 14,8 20,8"/></svg>
                        Experience
                    </a>
                    <a href="#projects" class="sidebar-link">
                        <svg viewBox="0 0 24 24"><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></svg>
                        Projects
                    </a>
                    <a href="#about" class="sidebar-link">
                        <svg viewBox="0 0 24 24"><path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
                        About
                    </a>
                </div>
                
                <div class="sidebar-section">
                    <div class="sidebar-title">Connect</div>
                    <a href="https://www.linkedin.com/in/aviv-shaked-59a4b7271/" target="_blank" class="sidebar-link">
                        <svg viewBox="0 0 24 24"><path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6z"/><rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/></svg>
                        LinkedIn
                    </a>
                    <a href="https://github.com/Patcholie" target="_blank" class="sidebar-link">
                        <svg viewBox="0 0 24 24"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 00-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0020 4.77 5.07 5.07 0 0019.91 1S18.73.65 16 2.48a13.38 13.38 0 00-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 005 4.77a5.44 5.44 0 00-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 009 18.13V22"/></svg>
                        GitHub
                    </a>
                    <a href="https://www.instagram.com/_avivshaked_/" target="_blank" class="sidebar-link">
                        <svg viewBox="0 0 24 24"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg>
                        Instagram
                    </a>
                </div>
            </aside>
            
            <!-- Content Area -->
            <main class="content">
                <!-- Hero Section -->
                <section id="home" class="section">
                    <div class="hero">
                        <div class="hero-content animate-slide-up">
                            <h1>Aviv Shaked</h1>
                            <div class="role">Cybersecurity Developer & Researcher</div>
                            <div class="description">
                                18-year-old cybersecurity expert from Haifa, Israel, specializing in C++, network security, 
                                and low-level programming. Building revolutionary covert communication systems and secure, 
                                high-performance applications that push the boundaries of what's possible.
                            </div>
                            
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
                            
                            <div class="hero-actions">
                                <a href="#projects" class="btn btn-primary">
                                    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                                        <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/>
                                    </svg>
                                    View Projects
                                </a>
                                <a href="#" target="_blank" class="btn btn-secondary">
                                    <!-- TODO: Replace with your resume link -->
                                    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                                        <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/>
                                        <polyline points="14,2 14,8 20,8"/>
                                    </svg>
                                    Resume
                                </a>
                            </div>
                        </div>
                        
                        <div class="hero-visual animate-slide-up" style="animation-delay: 0.2s;">
                            <div class="code-window">
                                <div class="code-header">
                                    <div class="code-dots">
                                        <div class="code-dot red"></div>
                                        <div class="code-dot yellow"></div>
                                        <div class="code-dot green"></div>
                                    </div>
                                    <div class="code-title">steganography.cpp</div>
                                </div>
                                <div class="code-content">
                                    <div class="code-comment">// Network Steganography</div>
                                    <div><span class="code-keyword">class</span> <span class="code-function">HitchHiker</span> {</div>
                                    <div>&nbsp;&nbsp;<span class="code-keyword">private:</span></div>
                                    <div>&nbsp;&nbsp;&nbsp;&nbsp;std::<span class="code-keyword">mutex</span> _mutex;</div>
                                    <div>&nbsp;&nbsp;&nbsp;&nbsp;<span class="code-function">PacketHandler</span> _handler;</div>
                                    <div>&nbsp;&nbsp;<span class="code-keyword">public:</span></div>
                                    <div>&nbsp;&nbsp;&nbsp;&nbsp;<span class="code-keyword">void</span> <span class="code-function">transmitCovert</span>();</div>
                                    <div>&nbsp;&nbsp;&nbsp;&nbsp;<span class="code-keyword">bool</span> <span class="code-function">isUndetectable</span>();</div>
                                    <div>};</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
                
                <!-- Expertise Section -->
                <section id="expertise" class="section">
                    <div class="section-header">
                        <div>
                            <h2 class="section-title">Technical Expertise</h2>
                            <div class="section-subtitle">Deep knowledge across multiple domains of cybersecurity and software development</div>
                        </div>
                    </div>
                    
                    <div class="cards-grid">
                        <div class="card animate-slide-up">
                            <div class="card-header">
                                <div class="card-icon">
                                    <svg viewBox="0 0 24 24">
                                        <path d="M12 1l3 6 6 1-4.5 4.5 1 6-5.5-3-5.5 3 1-6L3 8l6-1z"/>
                                    </svg>
                                </div>
                                <div>
                                    <h3 class="card-title">Cybersecurity & Network Security</h3>
                                    <p class="card-subtitle">Expert Level</p>
                                </div>
                            </div>
                            <div class="card-content">
                                Network security, penetration testing, and reverse engineering. Experience with network 
                                steganography, covert communication systems, and advanced security research.
                            </div>
                            <div class="card-tags">
                                <span class="tag">Network Security</span>
                                <span class="tag">Steganography</span>
                                <span class="tag">Reverse Engineering</span>
                                <span class="tag">C++20</span>
                            </div>
                        </div>
                        
                        <div class="card animate-slide-up" style="animation-delay: 0.1s;">
                            <div class="card-header">
                                <div class="card-icon">
                                    <svg viewBox="0 0 24 24">
                                        <polyline points="16 18 22 12 16 6"/>
                                        <polyline points="8 6 2 12 8 18"/>
                                    </svg>
                                </div>
                                <div>
                                    <h3 class="card-title">Low-Level Systems Programming</h3>
                                    <p class="card-subtitle">Expert Level</p>
                                </div>
                            </div>
                            <div class="card-content">
                                Advanced C++ development with focus on performance, memory management, and system-level 
                                programming. Expertise in multi-threading, networking, and server architecture.
                            </div>
                            <div class="card-tags">
                                <span class="tag">C/C++</span>
                                <span class="tag">Assembly</span>
                                <span class="tag">Multi-threading</span>
                                <span class="tag">RAII</span>
                            </div>
                        </div>
                        
                        <div class="card animate-slide-up" style="animation-delay: 0.2s;">
                            <div class="card-header">
                                <div class="card-icon">
                                    <svg viewBox="0 0 24 24">
                                        <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
                                    </svg>
                                </div>
                                <div>
                                    <h3 class="card-title">Full-Stack Development & AI</h3>
                                    <p class="card-subtitle">Professional</p>
                                </div>
                            </div>
                            <div class="card-content">
                                Full-stack development including AI/ML implementations, automation tools, and web 
                                development. Experience with neural networks and data processing systems.
                            </div>
                            <div class="card-tags">
                                <span class="tag">Python</span>
                                <span class="tag">AI/ML</span>
                                <span class="tag">Web Development</span>
                                <span class="tag">Automation</span>
                            </div>
                        </div>
                    </div>
                </section>
                
                <!-- Projects Section -->
                <section id="projects" class="section">
                    <div class="section-header">
                        <div>
                            <h2 class="section-title">Featured Projects</h2>
                            <div class="section-subtitle">Cutting-edge projects demonstrating expertise in cybersecurity and systems programming</div>
                        </div>
                    </div>
                    
                    <div class="cards-grid">
                        <div class="card animate-slide-up">
                            <div class="card-header">
                                <div class="card-icon">
                                    <svg viewBox="0 0 24 24">
                                        <path d="M12 1l3 6 6 1-4.5 4.5 1 6-5.5-3-5.5 3 1-6L3 8l6-1z"/>
                                    </svg>
                                </div>
                                <div>
                                    <h3 class="card-title">HitchHiker: Network Steganography</h3>
                                    <p class="card-subtitle">Revolutionary Covert Communication</p>
                                </div>
                            </div>
                            <div class="card-content">
                                Revolutionary covert communication system that enables hidden data transmission without 
                                creating new network packets. Advanced C++20 implementation with multi-threading, Docker 
                                containerization, and undetectable steganography.
                            </div>
                            <div class="card-tags">
                                <span class="tag">C++20</span>
                                <span class="tag">Multi-threading</span>
                                <span class="tag">Docker</span>
                                <span class="tag">CMake</span>
                                <span class="tag">Network Security</span>
                            </div>
                            <div class="card-footer">
                                <span class="status-badge development">In Development</span>
                            </div>
                        </div>
                        
                        <div class="card animate-slide-up" style="animation-delay: 0.1s;">
                            <div class="card-header">
                                <div class="card-icon">
                                    <svg viewBox="0 0 24 24">
                                        <path d="M21 16V8a2 2 0 00-1-1.73l-7-4a2 2 0 00-2 0l-7 4A2 2 0 003 8v8a2 2 0 001 1.73l7 4a2 2 0 002 0l7-4A2 2 0 0021 16z"/>
                                    </svg>
                                </div>
                                <div>
                                    <h3 class="card-title">Multiplayer Trivia Game System</h3>
                                    <p class="card-subtitle">High-Performance C++ Server & Unity Client</p>
                                </div>
                            </div>
                            <div class="card-content">
                                Complete multiplayer system handling 25+ concurrent players with custom binary protocol, 
                                thread-safe architecture, real-time synchronization, and enterprise-level software 
                                engineering practices.
                            </div>
                            <div class="card-tags">
                                <span class="tag">C++17</span>
                                <span class="tag">Unity</span>
                                <span class="tag">SQLite3</span>
                                <span class="tag">RAII</span>
                                <span class="tag">Network Programming</span>
                            </div>
                            <div class="card-footer">
                                <span class="status-badge">Completed</span>
                            </div>
                        </div>
                        
                        <div class="card animate-slide-up" style="animation-delay: 0.2s;">
                            <div class="card-header">
                                <div class="card-icon">
                                    <svg viewBox="0 0 24 24">
                                        <path d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"/>
                                    </svg>
                                </div>
                                <div>
                                    <h3 class="card-title">Analisis: AI Medical Platform</h3>
                                    <p class="card-subtitle">AI4Y World Competition Winner</p>
                                </div>
                            </div>
                            <div class="card-content">
                                AI-powered medical platform for wound detection and treatment recommendations. Won National 
                                AI4Y Competition and represented Israel in world competition, achieving 2nd place globally.
                            </div>
                            <div class="card-tags">
                                <span class="tag">Python</span>
                                <span class="tag">AI/ML</span>
                                <span class="tag">Computer Vision</span>
                                <span class="tag">Web Development</span>
                            </div>
                            <div class="card-footer">
                                <span class="status-badge winner">World Finalist</span>
                                <a href="https://github.com/Patcholie/Analisis" target="_blank" class="btn btn-secondary">
                                    View Project
                                </a>
                            </div>
                        </div>
                    </div>
                </section>
                
                <!-- About Section -->
                <section id="about" class="section">
                    <div class="section-header">
                        <div>
                            <h2 class="section-title">About Me</h2>
                            <div class="section-subtitle">Passionate about cybersecurity, innovation, and building the future</div>
                        </div>
                    </div>
                    
                    <div class="card animate-slide-up">
                        <div class="card-content" style="font-size: 1.1rem; line-height: 1.8;">
                            <p>
                                I'm Aviv Shaked, an 18-year-old cybersecurity developer and researcher from Haifa, Israel. 
                                Currently pursuing advanced studies in cybersecurity at <strong>Magshimim Cyber Center</strong> and 
                                computer science at <strong>Bosmat Technological School</strong>.
                            </p>
                            <p>
                                My expertise lies in building secure, high-performance systems using modern C++. I've been part of the 
                                Captain Team of Analisis, which represented Israel in the AI4Y World Competition, and I'm currently 
                                developing revolutionary covert communication systems.
                            </p>
                            <p>
                                Professional experience includes building automated tools and secure data systems at <strong>AllBikes</strong>, 
                                with expertise in Python automation and data processing. Always eager to take on challenging projects 
                                that push the boundaries of cybersecurity and software engineering.
                            </p>
                            <p>
                                Additional skills include marketing, public communication, and market analysis. Completed courses through 
                                Google, Coursera, and Harvard to develop well-rounded professional capabilities.
                            </p>
                        </div>
                    </div>
                </section>
            </main>
        </div>
    </div>

    <script>
        // Ultra-fast cursor system
        class SmoothCursor {
            constructor() {
                this.cursorLarge = document.querySelector('.cursor--large');
                this.cursorSmall = document.querySelector('.cursor--small');
                this.mouse = { x: 0, y: 0 };
                this.cursorLargePos = { x: 0, y: 0 };
                this.cursorSmallPos = { x: 0, y: 0 };
                this.isHovering = false;
                
                this.init();
            }
            
            init() {
                // Use requestAnimationFrame for smooth 60fps cursor
                document.addEventListener('mousemove', (e) => {
                    this.mouse.x = e.clientX;
                    this.mouse.y = e.clientY;
                });
                
                this.animate();
                this.setupHoverEvents();
            }
            
            animate() {
                // Smooth lerp animation
                const lerpFactor = 0.75;
                
                // Small cursor follows immediately
                this.cursorSmallPos.x = this.mouse.x;
                this.cursorSmallPos.y = this.mouse.y;
                
                // Large cursor follows with smooth delay
                this.cursorLargePos.x += (this.mouse.x - this.cursorLargePos.x) * lerpFactor;
                this.cursorLargePos.y += (this.mouse.y - this.cursorLargePos.y) * lerpFactor;
                
                // Apply transforms
                this.cursorSmall.style.transform = `translate(${this.cursorSmallPos.x}px, ${this.cursorSmallPos.y}px) translate(-50%, -50%)`;
                this.cursorLarge.style.transform = `translate(${this.cursorLargePos.x - 16}px, ${this.cursorLargePos.y - 16}px)`;
                
                requestAnimationFrame(() => this.animate());
            }
            
            setupHoverEvents() {
                const interactiveElements = document.querySelectorAll('a, button, .card, .stat-item, .tag, .traffic-light, .theme-toggle, .notification-badge');
                
                interactiveElements.forEach(el => {
                    el.addEventListener('mouseenter', () => {
                        this.cursorLarge.classList.add('cursor--hover');
                        this.cursorSmall.classList.add('cursor--hover');
                    });
                    
                    el.addEventListener('mouseleave', () => {
                        this.cursorLarge.classList.remove('cursor--hover');
                        this.cursorSmall.classList.remove('cursor--hover');
                    });
                });
            }
        }
        
        // Initialize cursor on desktop only
        if (window.innerWidth > 768) {
            new SmoothCursor();
        }
        
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
        
        // Active nav link highlighting
        const navLinks = document.querySelectorAll('.nav-link, .sidebar-link');
        const sections = document.querySelectorAll('.section');
        
        const observerOptions = {
            root: null,
            rootMargin: '-20% 0px -80% 0px',
            threshold: 0
        };
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const id = entry.target.id;
                    navLinks.forEach(link => {
                        link.classList.remove('active');
                        if (link.getAttribute('href') === `#${id}`) {
                            link.classList.add('active');
                        }
                    });
                }
            });
        }, observerOptions);
        
        sections.forEach(section => observer.observe(section));
        
        // Enhanced card interactions
        document.querySelectorAll('.card').forEach(card => {
            card.addEventListener('mouseenter', function() {
                this.style.transform = 'translateY(-12px) scale(1.02)';
            });
            
            card.addEventListener('mouseleave', function() {
                this.style.transform = 'translateY(0) scale(1)';
            });
        });
        
        // Traffic lights interaction
        document.querySelectorAll('.traffic-light').forEach((light, index) => {
            light.addEventListener('click', () => {
                if (index === 0) {
                    // Red - minimize effect
                    document.querySelector('.app').style.transform = 'scale(0.95)';
                    setTimeout(() => {
                        document.querySelector('.app').style.transform = 'scale(1)';
                    }, 200);
                } else if (index === 1) {
                    // Yellow - shake effect
                    document.querySelector('.app').style.animation = 'shake 0.5s ease-in-out';
                    setTimeout(() => {
                        document.querySelector('.app').style.animation = '';
                    }, 500);
                } else {
                    // Green - expand effect
                    document.querySelector('.app').style.transform = 'scale(1.02)';
                    setTimeout(() => {
                        document.querySelector('.app').style.transform = 'scale(1)';
                    }, 200);
                }
            });
        });
        
        // Add shake animation
        const style = document.createElement('style');
        style.textContent = `
            @keyframes shake {
                0%, 100% { transform: translateX(0); }
                25% { transform: translateX(-5px); }
                75% { transform: translateX(5px); }
            }
        `;
        document.head.appendChild(style);
        
        // Typing animation for code block
        const codeLines = document.querySelectorAll('.code-content > div');
        codeLines.forEach((line, index) => {
            line.style.opacity = '0';
            line.style.transform = 'translateX(-10px)';
            line.style.animation = `slideIn 0.3s ease forwards ${index * 0.1}s`;
        });
        
        const slideInStyle = document.createElement('style');
        slideInStyle.textContent = `
            @keyframes slideIn {
                to {
                    opacity: 1;
                    transform: translateX(0);
                }
            }
        `;
        document.head.appendChild(slideInStyle);
        
        // Performance optimizations
        // Debounce resize events
        let resizeTimeout;
        window.addEventListener('resize', () => {
            clearTimeout(resizeTimeout);
            resizeTimeout = setTimeout(() => {
                // Handle resize logic here if needed
            }, 250);
        });
        
        // Lazy load animations
        const animatedElements = document.querySelectorAll('.animate-slide-up, .animate-slide-left, .animate-fade-in');
        const animationObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.animationPlayState = 'running';
                }
            });
        }, { threshold: 0.1 });
        
        animatedElements.forEach(el => {
            el.style.animationPlayState = 'paused';
            animationObserver.observe(el);
        });
    </script>
</body>
</html>
