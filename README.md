<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
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
  
      html {
        box-sizing: border-box;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        overflow-x: hidden;
      }
  
      body {
        cursor: none;
        font-family: var(--font-primary);
        background: var(--bg-primary);
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

      /* Loading Screen */
      .loading-screen {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: var(--bg-primary);
        display: flex;
        align-items: center;
        justify-content: center;
        flex-direction: column;
        z-index: 10000;
        transition: opacity 0.8s ease, transform 0.8s ease;
      }

      .loading-screen.hidden {
        opacity: 0;
        transform: scale(1.1);
        pointer-events: none;
      }

      .loading-logo {
        font-size: 2rem;
        font-weight: 700;
        color: var(--text-primary);
        margin-bottom: 2rem;
        opacity: 0;
        animation: fadeInUp 0.8s ease 0.5s forwards;
      }

      .loading-progress {
        width: 200px;
        height: 2px;
        background: var(--border-subtle);
        border-radius: 1px;
        overflow: hidden;
        opacity: 0;
        animation: fadeInUp 0.8s ease 0.7s forwards;
      }

      .loading-bar {
        height: 100%;
        background: linear-gradient(90deg, var(--accent-primary), var(--accent-secondary));
        border-radius: 1px;
        transform: translateX(-100%);
        animation: loadingProgress 2s ease 0.8s forwards;
      }

      @keyframes loadingProgress {
        to { transform: translateX(0); }
      }

      /* Scroll Progress Indicator */
      .scroll-progress {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 3px;
        z-index: 1000;
        background: var(--border-subtle);
      }

      .scroll-progress-bar {
        height: 100%;
        background: linear-gradient(90deg, var(--accent-primary), var(--accent-secondary));
        width: 0;
        transition: width 0.1s ease;
      }

      /* Animated Background Particles */
      .particles-container {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        pointer-events: none;
        z-index: -1;
        overflow: hidden;
      }

      .particle {
        position: absolute;
        width: 2px;
        height: 2px;
        background: var(--text-muted);
        border-radius: 50%;
        opacity: 0.3;
        animation: float 20s infinite linear;
      }

      @keyframes float {
        0% {
          transform: translateY(100vh) translateX(0);
          opacity: 0;
        }
        10% {
          opacity: 0.3;
        }
        90% {
          opacity: 0.3;
        }
        100% {
          transform: translateY(-10vh) translateX(100px);
          opacity: 0;
        }
      }

      /* Parallax Background */
      .parallax-bg {
        position: fixed;
        top: 0;
        left: 0;
        width: 120%;
        height: 120%;
        background: radial-gradient(circle at 20% 80%, rgba(255, 255, 255, 0.02) 0%, transparent 50%),
                    radial-gradient(circle at 80% 20%, rgba(255, 255, 255, 0.015) 0%, transparent 50%);
        pointer-events: none;
        z-index: -2;
        will-change: transform;
      }
      
      /* Enhanced Cursor System */
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
        border: 2px solid var(--accent-primary);
      }

      .cursor--large.magnetic {
        background: rgba(255, 255, 255, 0.1);
        transform: translate(-50%, -50%) scale(1.2);
        border: 2px solid var(--accent-primary);
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
        opacity: 0;
        transform: translateY(30px);
        animation: appEntrance 1s ease 2.5s forwards;
      }

      @keyframes appEntrance {
        to {
          opacity: 1;
          transform: translateY(0);
        }
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
        opacity: 0;
        animation: slideInDown 0.8s ease 3s forwards;
      }

      @keyframes slideInDown {
        from {
          opacity: 0;
          transform: translateY(-20px);
        }
        to {
          opacity: 1;
          transform: translateY(0);
        }
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
        position: relative;
        overflow: hidden;
      }

      .traffic-light::before {
        content: '';
        position: absolute;
        top: 50%;
        left: 50%;
        width: 0;
        height: 0;
        border-radius: 50%;
        background: inherit;
        transform: translate(-50%, -50%);
        transition: all 0.3s ease;
      }

      .traffic-light:hover::before {
        width: 150%;
        height: 150%;
        opacity: 0.3;
      }
  
      .traffic-light.red { 
        background: #ff5f56;
        box-shadow: 0 0 10px rgba(255, 95, 86, 0.3);
      }
      .traffic-light.yellow { 
        background: #ffbd2e;
        box-shadow: 0 0 10px rgba(255, 189, 46, 0.3);
      }
      .traffic-light.green { 
        background: #27ca3f;
        box-shadow: 0 0 10px rgba(39, 202, 63, 0.3);
      }
  
      .traffic-light:hover {
        transform: scale(1.2);
        box-shadow: 0 0 20px currentColor;
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

      .notification-icon svg {
        animation: pulse 2s infinite;
      }

      @keyframes pulse {
        0%, 100% { transform: scale(1); }
        50% { transform: scale(1.05); }
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
        animation: bounce 1s infinite;
      }

      @keyframes bounce {
        0%, 20%, 50%, 80%, 100% { transform: translateY(0); }
        40% { transform: translateY(-3px); }
        60% { transform: translateY(-2px); }
      }
  
      .profile-avatar {
        width: 32px;
        height: 32px;
        border-radius: 50%;
        border: 2px solid var(--border-medium);
        object-fit: cover;
        cursor: none;
        transition: all var(--transition-smooth);
        position: relative;
        overflow: hidden;
      }

      .profile-avatar::before {
        content: '';
        position: absolute;
        top: 0;
        left: -100%;
        width: 100%;
        height: 100%;
        background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.3), transparent);
        transition: left 0.6s ease;
      }

      .profile-avatar:hover::before {
        left: 100%;
      }
  
      .profile-avatar:hover {
        border-color: var(--accent-primary);
        transform: scale(1.05);
        box-shadow: 0 0 20px rgba(255, 255, 255, 0.2);
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
        opacity: 0;
        transform: translateX(-30px);
        animation: slideInLeft 0.8s ease 3.2s forwards;
      }

      @keyframes slideInLeft {
        to {
          opacity: 1;
          transform: translateX(0);
        }
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

      .sidebar-item::after {
        content: '';
        position: absolute;
        top: 0;
        left: -100%;
        width: 100%;
        height: 100%;
        background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.05), transparent);
        transition: left 0.6s ease;
      }
  
      .sidebar-item:hover,
      .sidebar-item.active {
        background: var(--glass-hover);
        color: var(--text-primary);
        transform: translateX(4px);
      }

      .sidebar-item:hover::after {
        left: 100%;
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
        opacity: 0;
        transform: translateY(30px);
        will-change: transform, opacity;
      }

      .content-section.reveal {
        opacity: 1;
        transform: translateY(0);
      }
  
      .content-section:hover {
        border-color: var(--border-medium);
        box-shadow: var(--shadow-soft);
        transform: translateY(-2px);
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
        opacity: 0;
        transform: translateY(20px);
        animation: revealText 0.8s ease forwards;
      }

      .section-title.animate {
        animation-delay: 0.2s;
      }

      @keyframes revealText {
        to {
          opacity: 1;
          transform: translateY(0);
        }
      }
  
      .section-subtitle {
        color: var(--text-secondary);
        font-size: 0.9rem;
        margin-top: 0.25rem;
        opacity: 0;
        transform: translateY(15px);
        animation: revealText 0.8s ease 0.3s forwards;
      }
  
      /* Hero Section */
      .hero {
        display: grid;
        grid-template-columns: 1fr 400px;
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
        opacity: 0;
        transform: translateY(30px);
        animation: revealText 1s ease 0.5s forwards;
      }
  
      .hero-description {
        font-size: 1.1rem;
        color: var(--text-secondary);
        line-height: 1.6;
        margin-bottom: 2rem;
        opacity: 0;
        transform: translateY(20px);
        animation: revealText 0.8s ease 0.7s forwards;
      }
  
      .hero-stats {
        display: flex;
        gap: 2rem;
        margin-bottom: 2rem;
      }
  
      .stat-item {
        text-align: center;
        opacity: 0;
        transform: translateY(20px);
        animation: revealText 0.6s ease forwards;
      }

      .stat-item:nth-child(1) { animation-delay: 0.9s; }
      .stat-item:nth-child(2) { animation-delay: 1.1s; }
      .stat-item:nth-child(3) { animation-delay: 1.3s; }
  
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
  
      /* Hero Code Window */
      .hero-visual {
        position: relative;
        display: flex;
        justify-content: center;
        align-items: center;
        opacity: 0;
        transform: scale(0.8) rotate(-3deg);
        animation: heroVisualEntrance 1s ease 1.2s forwards;
        width: 100%;
        max-width: 400px;
        margin: 0 auto;
      }

      @keyframes heroVisualEntrance {
        to {
          opacity: 1;
          transform: scale(1) rotate(0deg);
        }
      }

      .code-window {
        background: var(--bg-secondary);
        border-radius: 16px;
        border: 1px solid var(--border-subtle);
        overflow: hidden;
        width: 100%;
        max-width: 400px;
        box-shadow: var(--shadow-strong);
        position: relative;
        backdrop-filter: blur(20px);
        transition: all var(--transition-smooth);
        z-index: 10;
        min-height: 280px;
      }

      .code-window:hover {
        transform: translateY(-8px) rotate(1deg);
        box-shadow: 0 20px 60px rgba(0, 0, 0, 0.6), 0 0 30px rgba(255, 255, 255, 0.1);
        border-color: var(--border-medium);
      }

      .code-window::before {
        content: '';
        position: absolute;
        top: 0;
        left: -100%;
        width: 100%;
        height: 100%;
        background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.05), transparent);
        transition: left 0.8s ease;
        z-index: 1;
      }

      .code-window:hover::before {
        left: 100%;
      }

      .code-header {
        background: var(--bg-tertiary);
        padding: 1rem 1.5rem;
        display: flex;
        align-items: center;
        gap: 0.75rem;
        border-bottom: 1px solid var(--border-subtle);
        position: relative;
        z-index: 2;
      }

      .code-dots {
        display: flex;
        gap: 6px;
      }

      .code-dot {
        width: 12px;
        height: 12px;
        border-radius: 50%;
        transition: all var(--transition-smooth);
        cursor: none;
        position: relative;
        overflow: hidden;
      }

      .code-dot::before {
        content: '';
        position: absolute;
        top: 50%;
        left: 50%;
        width: 0;
        height: 0;
        border-radius: 50%;
        background: inherit;
        transform: translate(-50%, -50%);
        transition: all 0.3s ease;
      }

      .code-dot:hover::before {
        width: 150%;
        height: 150%;
        opacity: 0.3;
      }

      .code-dot.red { 
        background: #ff5f56;
        box-shadow: 0 0 8px rgba(255, 95, 86, 0.3);
      }
      .code-dot.yellow { 
        background: #ffbd2e;
        box-shadow: 0 0 8px rgba(255, 189, 46, 0.3);
      }
      .code-dot.green { 
        background: #27ca3f;
        box-shadow: 0 0 8px rgba(39, 202, 63, 0.3);
      }

      .code-dot:hover {
        transform: scale(1.2);
        box-shadow: 0 0 15px currentColor;
      }

      .code-title {
        font-family: var(--font-mono);
        font-size: 0.85rem;
        color: var(--text-secondary);
        font-weight: 500;
        opacity: 0;
        animation: fadeInText 0.6s ease 1.8s forwards;
      }

      @keyframes fadeInText {
        to { opacity: 1; }
      }

      .code-content {
        padding: 1.5rem;
        font-family: var(--font-mono);
        font-size: 0.8rem;
        line-height: 1.6;
        color: var(--text-secondary);
        position: relative;
        z-index: 2;
        background: var(--bg-secondary);
      }

      .code-line {
        opacity: 0;
        transform: translateX(-10px);
        animation: slideInCode 0.4s ease forwards;
        margin-bottom: 0.2rem;
        transition: all var(--transition-smooth);
        padding: 0.1rem 0;
        border-radius: 4px;
      }

      .code-line:hover {
        background: rgba(255, 255, 255, 0.02);
        transform: translateX(4px);
      }

      .code-line:nth-child(1) { animation-delay: 2s; }
      .code-line:nth-child(2) { animation-delay: 2.1s; }
      .code-line:nth-child(3) { animation-delay: 2.2s; }
      .code-line:nth-child(4) { animation-delay: 2.3s; }
      .code-line:nth-child(5) { animation-delay: 2.4s; }
      .code-line:nth-child(6) { animation-delay: 2.5s; }
      .code-line:nth-child(7) { animation-delay: 2.6s; }
      .code-line:nth-child(8) { animation-delay: 2.7s; }
      .code-line:nth-child(9) { animation-delay: 2.8s; }

      @keyframes slideInCode {
        to {
          opacity: 1;
          transform: translateX(0);
        }
      }

      /* Syntax Highlighting */
      .code-keyword { 
        color: var(--accent-primary);
        font-weight: 600;
      }
      .code-string { 
        color: #10b981;
      }
      .code-comment { 
        color: var(--text-muted);
        font-style: italic;
      }
      .code-function { 
        color: #f59e0b;
        font-weight: 500;
      }
      .code-type {
        color: #06b6d4;
      }
      .code-number {
        color: #ec4899;
      }
  
      /* Enhanced Buttons */
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
        opacity: 0;
        transform: translateY(20px);
        animation: revealText 0.6s ease 1.5s forwards;
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

      .btn::after {
        content: '';
        position: absolute;
        top: 50%;
        left: 50%;
        width: 0;
        height: 0;
        background: rgba(255, 255, 255, 0.1);
        border-radius: 50%;
        transform: translate(-50%, -50%);
        transition: all 0.3s ease;
      }

      .btn:hover::after {
        width: 300px;
        height: 300px;
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
  
      /* Enhanced Cards */
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
        opacity: 0;
        transform: translateY(30px);
        will-change: transform, opacity;
      }

      .card.reveal {
        opacity: 1;
        transform: translateY(0);
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
        position: relative;
        overflow: hidden;
      }

      .card-icon::before {
        content: '';
        position: absolute;
        top: 50%;
        left: 50%;
        width: 0;
        height: 0;
        background: rgba(255, 255, 255, 0.1);
        border-radius: 50%;
        transform: translate(-50%, -50%);
        transition: all 0.3s ease;
      }

      .card:hover .card-icon::before {
        width: 100px;
        height: 100px;
      }
      
      .card:hover .card-icon {
        background: var(--glass-hover);
        transform: scale(1.05) rotate(5deg);
      }
  
      .card-icon svg {
        width: 20px;
        height: 20px;
        color: var(--text-secondary);
        transition: all var(--transition-smooth);
        z-index: 2;
      }
      
      .card:hover .card-icon svg {
        color: var(--text-primary);
        transform: scale(1.1);
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
        transition: all var(--transition-smooth);
        position: relative;
        overflow: hidden;
      }

      .tag::before {
        content: '';
        position: absolute;
        top: 0;
        left: -100%;
        width: 100%;
        height: 100%;
        background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.1), transparent);
        transition: left 0.4s ease;
      }

      .tag:hover::before {
        left: 100%;
      }

      .tag:hover {
        background: var(--glass-hover);
        border-color: var(--border-medium);
        color: var(--text-primary);
        transform: translateY(-2px);
      }
  
      /* Enhanced Status Badges */
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
        position: relative;
        overflow: hidden;
      }

      .status-badge::before {
        content: '';
        position: absolute;
        left: 0;
        top: 0;
        width: 6px;
        height: 100%;
        background: currentColor;
        opacity: 0.3;
        animation: pulse-badge 2s infinite;
      }

      @keyframes pulse-badge {
        0%, 100% { opacity: 0.3; }
        50% { opacity: 0.6; }
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
  
      /* Enhanced List Items */
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
        opacity: 0;
        transform: translateX(-30px);
        will-change: transform, opacity;
      }

      .list-item.reveal {
        opacity: 1;
        transform: translateX(0);
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

      .list-item::after {
        content: '';
        position: absolute;
        left: 0;
        top: 0;
        width: 4px;
        height: 100%;
        background: var(--accent-primary);
        transform: scaleY(0);
        transition: transform var(--transition-smooth);
      }
  
      .list-item:hover {
        background: var(--glass-hover);
        border-color: var(--border-medium);
        transform: translateX(8px);
        box-shadow: var(--shadow-soft);
      }

      .list-item:hover::after {
        transform: scaleY(1);
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
        position: relative;
        overflow: hidden;
      }

      .list-icon::before {
        content: '';
        position: absolute;
        top: 50%;
        left: 50%;
        width: 0;
        height: 0;
        background: rgba(255, 255, 255, 0.2);
        border-radius: 50%;
        transform: translate(-50%, -50%);
        transition: all 0.3s ease;
      }

      .list-item:hover .list-icon::before {
        width: 80px;
        height: 80px;
      }
      
      .list-item:hover .list-icon {
        background: var(--glass-hover);
        transform: scale(1.05) rotate(-5deg);
      }
  
      .list-icon svg {
        width: 16px;
        height: 16px;
        color: var(--text-secondary);
        transition: all var(--transition-smooth);
        z-index: 2;
      }
      
      .list-item:hover .list-icon svg {
        color: var(--text-primary);
        transform: scale(1.1);
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
        
        .hero {
          grid-template-columns: 1fr 350px;
          gap: 2rem;
        }
      }
  
      @media (max-width: 768px) {
        .sidebar {
          display: none;
        }
        
        .hero {
          grid-template-columns: 1fr;
          text-align: center;
          gap: 2rem;
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

        .card-grid {
          grid-template-columns: 1fr;
        }

        .hero-visual {
          width: 100%;
          max-width: 350px;
        }
        
        .code-window {
          max-width: 100%;
          margin: 0 auto;
        }
        
        .code-content {
          font-size: 0.75rem;
          padding: 1rem;
        }
        
        .code-header {
          padding: 0.75rem 1rem;
        }
      }
  
      /* Enhanced Scrollbar */
      ::-webkit-scrollbar {
        width: 6px;
      }
  
      ::-webkit-scrollbar-track {
        background: transparent;
      }
  
      ::-webkit-scrollbar-thumb {
        background: var(--border-medium);
        border-radius: 3px;
        transition: background 0.3s ease;
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
      @keyframes fadeInUp {
        from {
          opacity: 0;
          transform: translateY(30px);
        }
        to {
          opacity: 1;
          transform: translateY(0);
        }
      }
    </style>
</head>
<body>
    <!-- Loading Screen -->
    <div class="loading-screen" id="loadingScreen">
        <div class="loading-logo">Aviv Shaked</div>
        <div class="loading-progress">
            <div class="loading-bar"></div>
        </div>
    </div>

    <!-- Scroll Progress -->
    <div class="scroll-progress">
        <div class="scroll-progress-bar" id="scrollProgress"></div>
    </div>

    <!-- Animated Particles -->
    <div class="particles-container" id="particles"></div>

    <!-- Parallax Background -->
    <div class="parallax-bg" id="parallaxBg"></div>

    <!-- Custom Cursor -->
    <div class="cursor cursor--small"></div>
    <div class="cursor cursor--large"></div>
    
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
                <section id="home" class="content-section">
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
                                    <span class="stat-number" data-count="2">2nd</span>
                                    <span class="stat-label">AI4Y World</span>
                                </div>
                                <div class="stat-item">
                                    <span class="stat-number" data-count="5">5+</span>
                                    <span class="stat-label">Major Projects</span>
                                </div>
                                <div class="stat-item">
                                    <span class="stat-number" data-count="3">3+</span>
                                    <span class="stat-label">Years Experience</span>
                                </div>
                            </div>
                            <div style="display: flex; gap: 1rem; flex-wrap: wrap;">
                                <a href="#projects" class="btn btn-primary magnetic-btn">View Projects</a>
                                <a href="https://drive.google.com/file/d/1cUoF--q94LtUQKox5eGfMYom70GJoIGc/view?usp=sharing" target="_blank" class="btn magnetic-btn">Resume</a>
                            </div>
                        </div>
                        <div class="hero-visual">
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
                                    <div class="code-line"><span class="code-comment">// Network Steganography System</span></div>
                                    <div class="code-line"><span class="code-keyword">class</span> <span class="code-function">HitchHiker</span> {</div>
                                    <div class="code-line">&nbsp;&nbsp;<span class="code-keyword">private</span>:</div>
                                    <div class="code-line">&nbsp;&nbsp;&nbsp;&nbsp;<span class="code-type">std::mutex</span> <span class="code-function">_mutex</span>;</div>
                                    <div class="code-line">&nbsp;&nbsp;&nbsp;&nbsp;<span class="code-type">PacketHandler</span> <span class="code-function">_handler</span>;</div>
                                    <div class="code-line">&nbsp;&nbsp;<span class="code-keyword">public</span>:</div>
                                    <div class="code-line">&nbsp;&nbsp;&nbsp;&nbsp;<span class="code-keyword">void</span> <span class="code-function">transmitCovert</span>();</div>
                                    <div class="code-line">&nbsp;&nbsp;&nbsp;&nbsp;<span class="code-keyword">bool</span> <span class="code-function">isUndetectable</span>();</div>
                                    <div class="code-line">};</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                <!-- Expertise Section -->
                <section id="expertise" class="content-section">
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
                <section id="experience" class="content-section">
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
                <section id="projects" class="content-section">
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
                <section id="about" class="content-section">
                    <div class="section-header">
                        <div>
                            <h2 class="section-title">About Me</h2>
                            <p class="section-subtitle">Passionate about cybersecurity, innovation, and building the future</p>
                        </div>
                    </div>
                    <div class="card">
                        <div class="card-header">
                            <div style="width: 60px; height: 60px; border-radius: 12px; overflow: hidden; border: 2px solid var(--border-medium);">
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
        // Loading Screen
        window.addEventListener('load', () => {
            setTimeout(() => {
                document.getElementById('loadingScreen').classList.add('hidden');
            }, 2800);
        });

        // Particle System
        function createParticles() {
            const container = document.getElementById('particles');
            const particleCount = 50;
            
            for (let i = 0; i < particleCount; i++) {
                const particle = document.createElement('div');
                particle.className = 'particle';
                particle.style.left = Math.random() * 100 + 'vw';
                particle.style.animationDelay = Math.random() * 20 + 's';
                particle.style.animationDuration = (15 + Math.random() * 10) + 's';
                container.appendChild(particle);
            }
        }

        // Scroll Progress
        function updateScrollProgress() {
            const content = document.querySelector('.content');
            const scrollProgress = document.getElementById('scrollProgress');
            const scrollTop = content.scrollTop;
            const scrollHeight = content.scrollHeight - content.clientHeight;
            const progress = (scrollTop / scrollHeight) * 100;
            scrollProgress.style.width = progress + '%';
        }

        // Parallax Effect
        function updateParallax() {
            const content = document.querySelector('.content');
            const scrollTop = content.scrollTop;
            const parallaxBg = document.getElementById('parallaxBg');
            parallaxBg.style.transform = `translateY(${scrollTop * 0.1}px)`;
        }

        // Enhanced Cursor System
        const cursorSmall = document.querySelector('.cursor--small');
        const cursorLarge = document.querySelector('.cursor--large');
        
        let mouseX = 0;
        let mouseY = 0;
        let largeCursorX = 0;
        let largeCursorY = 0;
        
        document.addEventListener('mousemove', (e) => {
            mouseX = e.clientX;
            mouseY = e.clientY;
            
            cursorSmall.style.left = mouseX + 'px';
            cursorSmall.style.top = mouseY + 'px';
        });
        
        let isHovering = false;
        let hoverTarget = null;
        
        function animateLargeCursor() {
            if (isHovering && hoverTarget) {
                const rect = hoverTarget.getBoundingClientRect();
                const targetX = rect.left + rect.width / 2;
                const targetY = rect.top + rect.height / 2;
                
                largeCursorX += (targetX - largeCursorX) * 0.25;
                largeCursorY += (targetY - largeCursorY) * 0.25;
            } else {
                largeCursorX += (mouseX - largeCursorX) * 0.15;
                largeCursorY += (mouseY - largeCursorY) * 0.15;
            }
            
            cursorLarge.style.left = largeCursorX + 'px';
            cursorLarge.style.top = largeCursorY + 'px';
            
            requestAnimationFrame(animateLargeCursor);
        }
        animateLargeCursor();
        
        // Enhanced cursor morphing with magnetic effect
        const magneticElements = document.querySelectorAll('.magnetic-btn');
        const interactiveElements = document.querySelectorAll('a, button, .card, .list-item, .sidebar-item, .traffic-light, .hero-visual, .card-icon, .list-icon, .profile-avatar, .notification-icon, .tag, .code-window, .code-dot, .code-line');
        
        magneticElements.forEach(el => {
            el.addEventListener('mouseenter', () => {
                cursorLarge.classList.add('magnetic');
            });
            
            el.addEventListener('mouseleave', () => {
                cursorLarge.classList.remove('magnetic');
            });
        });
        
        interactiveElements.forEach(el => {
            el.addEventListener('mouseenter', () => {
                isHovering = true;
                hoverTarget = el;
                cursorLarge.classList.add('morphed');
                
                const rect = el.getBoundingClientRect();
                let newWidth, newHeight;
                
                if (el.classList.contains('traffic-light') || el.classList.contains('profile-avatar')) {
                    const size = Math.max(rect.width, rect.height) + 24;
                    newWidth = Math.min(size, 60);
                    newHeight = newWidth;
                    cursorLarge.style.borderRadius = '50%';
                } else if (el.classList.contains('card-icon') || el.classList.contains('list-icon')) {
                    const size = Math.max(rect.width, rect.height) + 16;
                    newWidth = Math.min(size, 56);
                    newHeight = newWidth;
                    cursorLarge.style.borderRadius = '12px';
                } else if (el.classList.contains('sidebar-item')) {
                    newWidth = Math.min(rect.width + 16, 200);
                    newHeight = Math.min(rect.height + 8, 50);
                    cursorLarge.style.borderRadius = '8px';
                } else if (el.classList.contains('card')) {
                    newWidth = Math.min(rect.width * 0.95, 320);
                    newHeight = Math.min(rect.height * 0.95, 240);
                    cursorLarge.style.borderRadius = '16px';
                } else if (el.classList.contains('tag')) {
                    newWidth = rect.width + 12;
                    newHeight = rect.height + 8;
                    cursorLarge.style.borderRadius = '20px';
                } else if (el.classList.contains('code-window')) {
                    newWidth = Math.min(rect.width * 0.98, 400);
                    newHeight = Math.min(rect.height * 0.98, 300);
                    cursorLarge.style.borderRadius = '16px';
                } else if (el.classList.contains('code-dot')) {
                    const size = Math.max(rect.width, rect.height) + 20;
                    newWidth = Math.min(size, 50);
                    newHeight = newWidth;
                    cursorLarge.style.borderRadius = '50%';
                } else if (el.classList.contains('code-line')) {
                    newWidth = Math.min(rect.width + 20, 350);
                    newHeight = rect.height + 8;
                    cursorLarge.style.borderRadius = '6px';
                } else {
                    newWidth = Math.min(rect.width + 16, 120);
                    newHeight = Math.min(rect.height + 16, 80);
                    cursorLarge.style.borderRadius = '12px';
                }
                
                newWidth = Math.max(newWidth, 36);
                newHeight = Math.max(newHeight, 36);
                
                cursorLarge.style.width = newWidth + 'px';
                cursorLarge.style.height = newHeight + 'px';
                cursorLarge.style.transition = 'width 0.3s cubic-bezier(0.25, 0.8, 0.25, 1), height 0.3s cubic-bezier(0.25, 0.8, 0.25, 1), border-radius 0.3s ease';
            });
            
            el.addEventListener('mouseleave', () => {
                isHovering = false;
                hoverTarget = null;
                cursorLarge.classList.remove('morphed');
                cursorLarge.style.width = '32px';
                cursorLarge.style.height = '32px';
                cursorLarge.style.borderRadius = '50%';
            });
        });

        // Code window interactions
        const codeDots = document.querySelectorAll('.code-dot');
        const codeWindow = document.querySelector('.code-window');
        const codeLines = document.querySelectorAll('.code-line');
        
        codeDots.forEach((dot, index) => {
            dot.addEventListener('click', () => {
                if (index === 0) {
                    // Red dot - minimize effect
                    codeWindow.style.transform = 'scale(0.95) rotate(-2deg)';
                    setTimeout(() => {
                        codeWindow.style.transform = 'scale(1) rotate(0deg)';
                    }, 300);
                } else if (index === 1) {
                    // Yellow dot - typewriter effect
                    codeLines.forEach((line, lineIndex) => {
                        line.style.opacity = '0';
                        setTimeout(() => {
                            line.style.opacity = '1';
                            line.style.animation = 'slideInCode 0.2s ease forwards';
                        }, lineIndex * 100);
                    });
                } else {
                    // Green dot - glow effect
                    codeWindow.style.boxShadow = '0 0 40px rgba(59, 130, 246, 0.4), 0 20px 60px rgba(0, 0, 0, 0.6)';
                    setTimeout(() => {
                        codeWindow.style.boxShadow = '';
                    }, 1000);
                }
            });
        });

        // Code line hover effects
        codeLines.forEach(line => {
            line.addEventListener('mouseenter', () => {
                line.style.background = 'rgba(59, 130, 246, 0.05)';
                line.style.borderLeft = '3px solid var(--accent-primary)';
                line.style.paddingLeft = '8px';
            });
            
            line.addEventListener('mouseleave', () => {
                line.style.background = '';
                line.style.borderLeft = '';
                line.style.paddingLeft = '';
            });
        });
        
        // Intersection Observer for animations
        const observerOptions = {
            threshold: 0.2,
            rootMargin: '0px 0px -50px 0px'
        };
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry, index) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('reveal');
                    
                    // Staggered animations for cards and list items
                    if (entry.target.classList.contains('card') || entry.target.classList.contains('list-item')) {
                        const siblings = [...entry.target.parentElement.children];
                        const currentIndex = siblings.indexOf(entry.target);
                        entry.target.style.transitionDelay = `${currentIndex * 0.1}s`;
                    }
                    
                    // Animate section titles
                    const sectionTitle = entry.target.querySelector('.section-title');
                    if (sectionTitle && !sectionTitle.classList.contains('animate')) {
                        sectionTitle.classList.add('animate');
                    }
                }
            });
        }, observerOptions);
        
        // Observe elements for animation
        document.querySelectorAll('.content-section, .card, .list-item').forEach(el => {
            observer.observe(el);
        });
        
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
        
        // Combined scroll listener
        let ticking = false;
        const content = document.querySelector('.content');
        
        content.addEventListener('scroll', () => {
            if (!ticking) {
                requestAnimationFrame(() => {
                    updateActiveNav();
                    updateScrollProgress();
                    updateParallax();
                    ticking = false;
                });
                ticking = true;
            }
        });
        
        // Initialize
        createParticles();
        
        // Keyboard navigation
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Tab') {
                document.body.classList.add('keyboard-nav');
            }
        });
        
        document.addEventListener('mousedown', () => {
            document.body.classList.remove('keyboard-nav');
        });
    </script>
</body>
</html>
