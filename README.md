<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Portfolio - Aviv Shaked</title>
    <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Roboto+Mono:wght@300;400;500;600;700&family=Inter:wght@300;400;500;600;700&display=swap">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <!-- 
    TODO: Replace the following media sources with your own:
    1. Background image (search for YOUR_BACKGROUND_IMAGE_URL_HERE)
    2. Video background (search for YOUR_VIDEO_URL_HERE) 
    3. Profile images (search for YOUR_PROFILE_IMAGE_URL_HERE)
    -->
    <style>
      * {
        outline: none;
        box-sizing: border-box;
      }
  
      :root {
        --theme-bg-color: rgba(16 18 27 / 45%);
        --border-color: rgba(64, 224, 208, 0.2);
        --theme-color: #f0f8ff;
        --inactive-color: rgba(176, 196, 222, 0.7);
        --body-font: "Inter", sans-serif;
        --mono-font: "Roboto Mono", monospace;
        --hover-menu-bg: rgba(64, 224, 208, 0.1);
        --content-title-color: #87ceeb;
        --content-bg: rgba(64, 224, 208, 0.08);
        --button-inactive: rgba(176, 196, 222, 0.6);
        --search-bg: rgba(16, 18, 27, 0.8);
        --overlay-bg: rgba(16, 18, 27, 0.4);
        --scrollbar-bg: rgba(64, 224, 208, 0.3);
        --text_gradient: linear-gradient(to right, #f0f8ff, #e6f3ff);
        --large_cursor_color: #40e0d0;
        --small_cursor_color: #40e0d0;
        --accent-primary: #40e0d0;
        --accent-secondary: #20b2aa;
        --accent-tertiary: #48cae4;
        --success-color: #4ade80;
        --warning-color: #fbbf24;
        --error-color: #f87171;
        --glow-primary: 0 0 20px rgba(64, 224, 208, 0.5);
        --glow-secondary: 0 0 30px rgba(64, 224, 208, 0.3);
      }
  
      .light-mode {
        --theme-bg-color: rgba(240, 248, 255, 0.4);
        --theme-color: #1e293b;
        --inactive-color: #64748b;
        --button-inactive: #64748b;
        --search-bg: rgba(240, 248, 255, 0.8);
        --dropdown-bg: rgba(255, 255, 255, 0.9);
        --overlay-bg: rgba(240, 248, 255, 0.5);
        --border-color: rgba(64, 224, 208, 0.3);
        --hover-menu-bg: rgba(64, 224, 208, 0.15);
        --scrollbar-bg: rgba(64, 224, 208, 0.4);
        --content-title-color: #0f766e;
        --text_gradient: linear-gradient(to right, #1e293b, #334155);
        --large_cursor_color: #0d9488;
        --small_cursor_color: #0d9488;
      }
  
      html {
        box-sizing: border-box;
        -webkit-font-smoothing: antialiased;
        scroll-behavior: smooth;
      }
  
      body {
        cursor: none;
        font-family: var(--body-font);
        /* TODO: Replace with your background image URL */
        background-image: url(/* YOUR_BACKGROUND_IMAGE_URL_HERE */);
        background-size: cover;
        background-position: center;
        background-attachment: fixed;
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
        padding: 2em;
        width: 100%;
        min-height: 100vh;
        overflow-x: hidden;
        margin: 0;
      }

      /* Loading Screen */
      .loading-screen {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: linear-gradient(135deg, #0a0a0a, #1a1a2e);
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 9999;
        transition: opacity 0.8s ease, visibility 0.8s ease;
      }

      .loading-screen.hidden {
        opacity: 0;
        visibility: hidden;
      }

      .loading-content {
        text-align: center;
        color: var(--accent-primary);
      }

      .loading-logo {
        width: 80px;
        height: 80px;
        border: 3px solid rgba(64, 224, 208, 0.3);
        border-top: 3px solid var(--accent-primary);
        border-radius: 50%;
        animation: spin 1s linear infinite;
        margin: 0 auto 20px;
      }

      .loading-text {
        font-family: var(--mono-font);
        font-size: 1.2rem;
        opacity: 0.8;
        animation: pulse 2s ease-in-out infinite;
      }

      @keyframes spin {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
      }

      @keyframes pulse {
        0%, 100% { opacity: 0.8; }
        50% { opacity: 1; }
      }

      /* Particle Background */
      .particles {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        pointer-events: none;
        z-index: -1;
      }

      .particle {
        position: absolute;
        width: 2px;
        height: 2px;
        background: var(--accent-primary);
        border-radius: 50%;
        opacity: 0.6;
        animation: float 6s ease-in-out infinite;
      }

      @keyframes float {
        0%, 100% { transform: translateY(0px) rotate(0deg); opacity: 0.6; }
        50% { transform: translateY(-20px) rotate(180deg); opacity: 1; }
      }
  
      .cursor {
        width: var(--size);
        height: var(--size);
        border-radius: 50%;
        position: fixed;
        left: 0;
        top: 0;
        pointer-events: none;
        z-index: 10000;
        mix-blend-mode: difference;
      }
  
      .cursor--large {
        --size: 40px;
        border: 2px solid var(--large_cursor_color);
        transition: all 0.3s ease;
        box-shadow: var(--glow-primary);
      }
  
      .cursor--small {
        --size: 8px;
        background: var(--small_cursor_color);
        transform: translate(-50%, -50%);
        box-shadow: var(--glow-secondary);
      }

      .cursor--large.active {
        --size: 60px;
        border-color: var(--accent-secondary);
      }
  
      @media screen and (max-width: 768px) {
        body {
          padding: 1em;
        }
        .cursor, .cursor--large, .cursor--small {
          display: none;
        }
      }
  
      .video-bg {
        position: fixed;
        right: 0;
        top: 0;
        width: 100%;
        height: 100%;
        z-index: -2;
      }
  
      .video-bg video {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }
  
      img {
        max-width: 100%;
      }

      /* Mobile Navigation */
      .mobile-menu-toggle {
        display: none;
        position: fixed;
        top: 20px;
        right: 20px;
        z-index: 1001;
        background: var(--theme-bg-color);
        border: 1px solid var(--border-color);
        border-radius: 8px;
        padding: 10px;
        backdrop-filter: blur(20px);
        cursor: pointer;
      }

      .mobile-menu-toggle span {
        display: block;
        width: 20px;
        height: 2px;
        background: var(--accent-primary);
        margin: 4px 0;
        transition: 0.3s;
      }

      .mobile-menu-toggle.active span:nth-child(1) {
        transform: rotate(-45deg) translate(-5px, 6px);
      }

      .mobile-menu-toggle.active span:nth-child(2) {
        opacity: 0;
      }

      .mobile-menu-toggle.active span:nth-child(3) {
        transform: rotate(45deg) translate(-5px, -6px);
      }

      @media screen and (max-width: 945px) {
        .mobile-menu-toggle {
          display: block;
        }
      }
  
      .dark-light {
        position: fixed;
        bottom: 30px;
        right: 30px;
        background-color: var(--theme-bg-color);
        box-shadow: var(--glow-primary);
        padding: 12px;
        border-radius: 50%;
        z-index: 1000;
        border: 1px solid var(--border-color);
        backdrop-filter: blur(20px);
        cursor: pointer;
        transition: all 0.3s ease;
      }

      .dark-light:hover {
        transform: scale(1.1);
        box-shadow: var(--glow-secondary);
      }
  
      .dark-light svg {
        width: 24px;
        flex-shrink: 0;
        fill: var(--accent-primary);
        stroke: var(--accent-primary);
        transition: 0.5s;
      }
  
      .light-mode .dark-light svg {
        fill: transparent;
        stroke: var(--theme-color);
      }
  
      .light-mode .profile-img {
        border: 2px solid var(--theme-bg-color);
      }
  
      .light-mode .content-section ul {
        background-color: var(--theme-bg-color);
      }
  
      .light-mode .dropdown.is-active ul {
        background-color: rgba(255, 255, 255, 0.94);
      }
  
      .app {
        margin-top: -50px;
        background-color: var(--theme-bg-color);
        max-width: 1400px;
        max-height: 900px;
        height: 90vh;
        display: flex;
        flex-direction: column;
        overflow: hidden;
        position: relative;
        width: 100%;
        border-radius: 16px;
        backdrop-filter: blur(25px);
        -webkit-backdrop-filter: blur(25px);
        font-size: 15px;
        font-weight: 500;
        border: 1px solid var(--border-color);
        box-shadow: 0 25px 50px rgba(0, 0, 0, 0.4), 
                    0 0 0 1px rgba(64, 224, 208, 0.1),
                    inset 0 1px 0 rgba(255, 255, 255, 0.1);
        animation: slideUp 1s ease-out;
      }

      @keyframes slideUp {
        from {
          opacity: 0;
          transform: translateY(50px);
        }
        to {
          opacity: 1;
          transform: translateY(0);
        }
      }

      @media screen and (max-width: 768px) {
        .app {
          height: 100vh;
          margin-top: 0;
          border-radius: 0;
          max-height: none;
        }
      }
  
      .header {
        display: flex;
        align-items: center;
        flex-shrink: 0;
        height: 70px;
        width: 100%;
        border-bottom: 1px solid var(--border-color);
        padding: 0 30px;
        white-space: nowrap;
        backdrop-filter: blur(20px);
      }
  
      @media screen and (max-width: 768px) {
        .header {
          padding: 0 20px;
          height: 60px;
        }
      }
  
      .header-menu {
        display: flex;
        align-items: center;
        gap: 2rem;
      }
  
      .header-menu a {
        padding: 20px 0;
        text-decoration: none;
        color: var(--inactive-color);
        border-bottom: 2px solid transparent;
        transition: all 0.3s ease;
        font-weight: 500;
        position: relative;
        overflow: hidden;
      }

      .header-menu a::before {
        content: '';
        position: absolute;
        top: 0;
        left: -100%;
        width: 100%;
        height: 100%;
        background: linear-gradient(90deg, transparent, rgba(64, 224, 208, 0.1), transparent);
        transition: left 0.5s;
      }

      .header-menu a:hover::before {
        left: 100%;
      }
  
      @media screen and (max-width: 945px) {
        .header-menu {
          display: none;
        }
      }
  
      .header-menu a.is-active,
      .header-menu a:hover {
        cursor: none;
        color: var(--accent-primary);
        border-bottom: 2px solid var(--accent-primary);
        text-shadow: var(--glow-primary);
      }
  
      .menu-circle {
        width: 15px;
        height: 15px;
        background-color: var(--error-color);
        border-radius: 50%;
        box-shadow: 24px 0 0 0 var(--warning-color), 48px 0 0 0 var(--success-color);
        margin-right: auto;
        flex-shrink: 0;
        animation: glow 3s ease-in-out infinite;
      }

      @keyframes glow {
        0%, 100% { opacity: 1; }
        50% { opacity: 0.7; }
      }
  
      @media screen and (max-width: 945px) {
        .menu-circle {
          margin-right: 20px;
        }
      }
  
      .header-profile {
        display: flex;
        align-items: center;
        padding: 0 16px 0 40px;
        margin-left: auto;
        flex-shrink: 0;
        gap: 1rem;
      }

      @media screen and (max-width: 768px) {
        .header-profile {
          padding: 0;
          gap: 0.5rem;
        }
      }
  
      .header-profile svg {
        width: 22px;
        color: var(--inactive-color);
        flex-shrink: 0;
        transition: all 0.3s ease;
      }

      .header-profile svg:hover {
        color: var(--accent-primary);
        filter: drop-shadow(var(--glow-primary));
      }
  
      .notification {
        position: relative;
        cursor: pointer;
      }
  
      .notification-number {
        position: absolute;
        background: linear-gradient(135deg, var(--accent-primary), var(--accent-secondary));
        width: 18px;
        height: 18px;
        border-radius: 50%;
        font-size: 10px;
        display: flex;
        align-items: center;
        justify-content: center;
        color: #ffffff;
        right: -8px;
        top: -8px;
        font-weight: 600;
        animation: bounce 2s infinite;
      }

      @keyframes bounce {
        0%, 20%, 50%, 80%, 100% { transform: translateY(0); }
        40% { transform: translateY(-5px); }
        60% { transform: translateY(-3px); }
      }
  
      .notification+svg {
        margin-left: 22px;
      }
  
      @media screen and (max-width: 945px) {
        .notification+svg {
          display: none;
        }
      }
  
      .profile-img {
        width: 36px;
        height: 36px;
        border-radius: 50%;
        object-fit: cover;
        border: 2px solid var(--accent-primary);
        margin-left: 22px;
        transition: all 0.3s ease;
        box-shadow: var(--glow-primary);
      }

      .profile-img:hover {
        transform: scale(1.1);
        border-color: var(--accent-secondary);
      }

      @media screen and (max-width: 768px) {
        .profile-img {
          width: 32px;
          height: 32px;
          margin-left: 10px;
        }
      }
  
      .wrapper {
        display: flex;
        flex-grow: 1;
        overflow: hidden;
      }
  
      .left-side {
        overflow-x: hidden;
        flex-basis: 280px;
        border-right: 1px solid var(--border-color);
        padding: 30px;
        overflow: auto;
        flex-shrink: 0;
        background: rgba(16, 18, 27, 0.1);
        transition: transform 0.3s ease;
      }

      .left-side.mobile-open {
        transform: translateX(0);
      }
  
      @media screen and (max-width: 945px) {
        .left-side {
          position: fixed;
          top: 0;
          left: 0;
          height: 100vh;
          z-index: 1000;
          background: var(--theme-bg-color);
          backdrop-filter: blur(25px);
          transform: translateX(-100%);
          width: 280px;
          border-right: 1px solid var(--border-color);
        }
      }
  
      .side-wrapper+.side-wrapper {
        margin-top: 30px;
      }
  
      .side-title {
        color: var(--content-title-color);
        margin-bottom: 16px;
        font-weight: 600;
        font-size: 0.9rem;
        text-transform: uppercase;
        letter-spacing: 1px;
      }
  
      .side-menu {
        display: flex;
        flex-direction: column;
        white-space: nowrap;
        gap: 8px;
      }
  
      .side-menu a {
        text-decoration: none;
        color: var(--theme-color);
        display: flex;
        align-items: center;
        font-weight: 500;
        padding: 12px 16px;
        font-size: 14px;
        border-radius: 10px;
        transition: all 0.3s ease;
        position: relative;
        overflow: hidden;
      }

      .side-menu a::before {
        content: '';
        position: absolute;
        top: 0;
        left: -100%;
        width: 100%;
        height: 100%;
        background: linear-gradient(90deg, transparent, var(--hover-menu-bg), transparent);
        transition: left 0.5s;
      }

      .side-menu a:hover::before {
        left: 100%;
      }
  
      .side-menu a:hover {
        cursor: none;
        background-color: var(--hover-menu-bg);
        color: var(--accent-primary);
        transform: translateX(8px);
        box-shadow: 0 4px 15px rgba(64, 224, 208, 0.2);
      }
  
      .side-menu svg {
        width: 18px;
        margin-right: 12px;
        transition: all 0.3s ease;
      }

      .side-menu a:hover svg {
        color: var(--accent-primary);
        filter: drop-shadow(var(--glow-primary));
      }
  
      .main-container {
        display: flex;
        flex-direction: column;
        flex-grow: 1;
        position: relative;
      }
  
      .content-wrapper {
        display: flex;
        flex-direction: column;
        color: var(--theme-color);
        padding: 40px;
        height: 100%;
        overflow: auto;
        background-color: var(--theme-bg-color);
        position: relative;
      }

      @media screen and (max-width: 768px) {
        .content-wrapper {
          padding: 20px;
        }
      }

      /* Page Transition Animations */
      .page-section {
        opacity: 0;
        transform: translateY(30px);
        transition: all 0.6s ease;
      }

      .page-section.active {
        opacity: 1;
        transform: translateY(0);
      }

      .page-section.slide-out {
        opacity: 0;
        transform: translateX(-50px);
      }
  
      .content-wrapper-header {
        display: flex;
        align-items: center;
        width: 100%;
        justify-content: space-between;
        border-radius: 16px;
        padding: 40px;
        margin-bottom: 30px;
        background: linear-gradient(135deg, var(--content-bg), rgba(64, 224, 208, 0.05));
        border: 1px solid var(--border-color);
        box-shadow: 0 8px 25px rgba(0, 0, 0, 0.1);
        position: relative;
        overflow: hidden;
      }

      .content-wrapper-header::before {
        content: '';
        position: absolute;
        top: 0;
        left: -100%;
        width: 100%;
        height: 100%;
        background: linear-gradient(90deg, transparent, rgba(64, 224, 208, 0.1), transparent);
        transition: left 1s;
      }

      .content-wrapper-header:hover::before {
        left: 100%;
      }

      @media screen and (max-width: 768px) {
        .content-wrapper-header {
          flex-direction: column;
          text-align: center;
          padding: 30px 20px;
        }
      }
  
      @media screen and (max-width: 415px) {
        .content-wrapper-header {
          padding: 25px 15px;
        }
      }
  
      .content-wrapp-header {
        display: flex;
        align-items: flex-start;
        width: 100%;
        font-size: 16px;
        background: linear-gradient(135deg, var(--content-bg), rgba(64, 224, 208, 0.05));
        border-radius: 16px;
        border: 1px solid var(--border-color);
        padding: 30px;
        transition: all 0.3s ease;
        justify-content: space-between;
        backdrop-filter: blur(10px);
        box-shadow: 0 8px 25px rgba(0, 0, 0, 0.1);
      }

      .content-wrapp-header:hover {
        transform: translateY(-5px);
        box-shadow: 0 15px 35px rgba(64, 224, 208, 0.15);
      }

      @media screen and (max-width: 768px) {
        .content-wrapp-header {
          padding: 20px;
        }
      }
  
      .content-text {
        font-weight: 400;
        font-size: 16px;
        margin-top: 20px;
        line-height: 1.8;
        color: var(--inactive-color);
        background-image: var(--text_gradient);
        -webkit-background-clip: text;
        -moz-background-clip: text;
        -webkit-text-fill-color: transparent;
        -moz-text-fill-color: transparent;
        max-width: 600px;
      }

      @media screen and (max-width: 768px) {
        .content-text {
          font-size: 14px;
          margin-top: 15px;
        }
      }
  
      .content-tt {
        font-weight: 400;
        font-size: 15px;
        margin-top: 20px;
        line-height: 1.7;
        color: var(--inactive-color);
        background-image: var(--text_gradient);
        -webkit-background-clip: text;
        -moz-background-clip: text;
        -webkit-text-fill-color: transparent;
        -moz-text-fill-color: transparent;
      }
  
      .content-wrapper-context {
        flex: 1;
        max-width: none;
      }

      .content-wrapper-context h1 {
        font-size: clamp(2rem, 5vw, 3rem);
        font-weight: 700;
        margin-bottom: 10px;
        background: linear-gradient(135deg, var(--accent-primary), var(--accent-secondary));
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        text-shadow: var(--glow-primary);
      }
  
      .content-button {
        cursor: none;
        background: linear-gradient(135deg, var(--accent-primary), var(--accent-secondary));
        border: none;
        padding: 14px 32px;
        color: #ffffff;
        border-radius: 10px;
        margin-top: 20px;
        transition: all 0.3s ease;
        margin-left: 0;
        white-space: nowrap;
        font-weight: 600;
        text-shadow: 0 1px 2px rgba(0, 0, 0, 0.3);
        box-shadow: 0 6px 20px rgba(64, 224, 208, 0.3);
        font-size: 14px;
        display: inline-flex;
        align-items: center;
        gap: 8px;
        position: relative;
        overflow: hidden;
      }

      .content-button::before {
        content: '';
        position: absolute;
        top: 0;
        left: -100%;
        width: 100%;
        height: 100%;
        background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
        transition: left 0.5s;
      }

      .content-button:hover::before {
        left: 100%;
      }

      .content-button:hover {
        transform: translateY(-3px);
        box-shadow: 0 10px 30px rgba(64, 224, 208, 0.4);
        background: linear-gradient(135deg, var(--accent-secondary), var(--accent-primary));
      }

      .content-button:active {
        transform: translateY(-1px);
      }
  
      .content-section {
        margin-top: 40px;
        display: flex;
        flex-direction: column;
        opacity: 0;
        transform: translateY(20px);
        animation: fadeInUp 0.8s ease forwards;
      }

      @keyframes fadeInUp {
        to {
          opacity: 1;
          transform: translateY(0);
        }
      }
  
      .content-section-title {
        color: var(--content-title-color);
        margin-bottom: 20px;
        font-size: 1.4rem;
        font-weight: 600;
        position: relative;
        padding-left: 20px;
      }

      .content-section-title::before {
        content: '';
        position: absolute;
        left: 0;
        top: 50%;
        transform: translateY(-50%);
        width: 4px;
        height: 24px;
        background: linear-gradient(135deg, var(--accent-primary), var(--accent-secondary));
        border-radius: 2px;
        box-shadow: var(--glow-primary);
      }
  
      .content-section ul {
        display: flex;
        flex-direction: column;
        width: 100%;
        background: linear-gradient(135deg, var(--content-bg), rgba(64, 224, 208, 0.05));
        padding-left: 0;
        margin: 0;
        border-radius: 16px;
        border: 1px solid var(--border-color);
        backdrop-filter: blur(15px);
        box-shadow: 0 8px 25px rgba(0, 0, 0, 0.1);
        overflow: hidden;
      }
  
      .content-section ul li {
        list-style: none;
        padding: 20px 24px;
        display: flex;
        align-items: center;
        font-size: 16px;
        width: 100%;
        transition: all 0.3s ease;
        position: relative;
        overflow: hidden;
      }

      .content-section ul li::before {
        content: '';
        position: absolute;
        top: 0;
        left: -100%;
        width: 100%;
        height: 100%;
        background: linear-gradient(90deg, transparent, var(--hover-menu-bg), transparent);
        transition: left 0.5s;
      }

      .content-section ul li:hover::before {
        left: 100%;
      }
  
      .content-section ul li:hover {
        cursor: none;
        background-color: var(--hover-menu-bg);
        transform: translateX(10px);
        box-shadow: 0 4px 15px rgba(64, 224, 208, 0.2);
      }
  
      .content-section ul li:hover:first-child {
        border-radius: 15px 15px 0 0;
      }
  
      .content-section ul li:hover:last-child {
        border-radius: 0 0 15px 15px;
      }
  
      .content-section ul li+li {
        border-top: 1px solid var(--border-color);
      }
  
      .content-section ul svg {
        width: 32px;
        height: 32px;
        border-radius: 8px;
        margin-right: 20px;
        flex-shrink: 0;
        padding: 4px;
        background: rgba(64, 224, 208, 0.1);
        transition: all 0.3s ease;
      }

      .content-section ul li:hover svg {
        background: var(--accent-primary);
        color: #ffffff;
        transform: scale(1.1);
        box-shadow: var(--glow-primary);
      }
  
      .products {
        display: flex;
        align-items: center;
        flex: 1;
        font-weight: 500;
      }

      @media screen and (max-width: 768px) {
        .products {
          font-size: 14px;
        }
      }
  
      .button-wrapper {
        display: flex;
        align-items: center;
        justify-content: flex-end;
        margin-left: auto;
        gap: 10px;
        flex-wrap: wrap;
      }

      @media screen and (max-width: 768px) {
        .button-wrapper {
          width: 100%;
          justify-content: flex-start;
          margin-top: 10px;
        }
      }
  
      .apps-card {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
        gap: 25px;
        width: 100%;
      }

      @media screen and (max-width: 768px) {
        .apps-card {
          grid-template-columns: 1fr;
          gap: 20px;
        }
      }
  
      .app-card {
        display: flex;
        flex-direction: column;
        font-size: 16px;
        background: linear-gradient(135deg, var(--content-bg), rgba(64, 224, 208, 0.05));
        border-radius: 20px;
        border: 1px solid var(--border-color);
        padding: 30px;
        transition: all 0.4s ease;
        backdrop-filter: blur(15px);
        box-shadow: 0 8px 25px rgba(0, 0, 0, 0.1);
        position: relative;
        overflow: hidden;
      }

      .app-card::before {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        height: 3px;
        background: linear-gradient(90deg, var(--accent-primary), var(--accent-secondary), var(--accent-tertiary));
        opacity: 0;
        transition: opacity 0.3s ease;
      }

      .app-card:hover::before {
        opacity: 1;
      }
  
      .app-card:hover {
        transform: translateY(-10px);
        box-shadow: 0 20px 40px rgba(64, 224, 208, 0.2);
        border-color: var(--accent-primary);
      }
  
      .app-card span {
        display: flex;
        align-items: center;
        font-weight: 600;
        font-size: 1.1rem;
        margin-bottom: 15px;
        color: var(--accent-primary);
      }
  
      .app-card__subtext {
        font-size: 14px;
        font-weight: 400;
        line-height: 1.7;
        margin-bottom: 20px;
        color: var(--inactive-color);
        border-bottom: 1px solid var(--border-color);
        padding-bottom: 20px;
      }
  
      .app-card-buttons {
        display: flex;
        align-items: center;
        margin-top: auto;
        gap: 10px;
      }

      /* Tech badges and status indicators */
      .tech-badge {
        display: inline-block;
        background: linear-gradient(135deg, rgba(64, 224, 208, 0.15), rgba(64, 224, 208, 0.1));
        color: var(--accent-primary);
        padding: 6px 12px;
        border-radius: 20px;
        font-size: 11px;
        margin: 3px;
        border: 1px solid rgba(64, 224, 208, 0.3);
        transition: all 0.3s ease;
        font-weight: 500;
        font-family: var(--mono-font);
      }

      .tech-badge:hover {
        background: linear-gradient(135deg, rgba(64, 224, 208, 0.25), rgba(64, 224, 208, 0.2));
        transform: translateY(-2px);
        box-shadow: 0 4px 12px rgba(64, 224, 208, 0.3);
      }

      .project-status {
        background: linear-gradient(135deg, var(--accent-secondary), var(--accent-primary));
        color: #ffffff;
        padding: 6px 14px;
        border-radius: 20px;
        font-size: 11px;
        font-weight: 600;
        margin-left: 10px;
        box-shadow: 0 4px 12px rgba(64, 224, 208, 0.3);
        animation: pulse-glow 3s ease-in-out infinite;
      }

      @keyframes pulse-glow {
        0%, 100% { box-shadow: 0 4px 12px rgba(64, 224, 208, 0.3); }
        50% { box-shadow: 0 6px 18px rgba(64, 224, 208, 0.5); }
      }

      .project-status.development {
        background: linear-gradient(135deg, var(--warning-color), #f59e0b);
        color: #1f2937;
        box-shadow: 0 4px 12px rgba(251, 191, 36, 0.3);
      }

      .project-status.winner {
        background: linear-gradient(135deg, var(--success-color), #22c55e);
        color: #1f2937;
        box-shadow: 0 4px 12px rgba(74, 222, 128, 0.3);
      }

      .achievement-stats {
        display: flex;
        gap: 15px;
        margin-top: 25px;
        flex-wrap: wrap;
      }

      @media screen and (max-width: 768px) {
        .achievement-stats {
          justify-content: center;
        }
      }

      .stat-item {
        background: linear-gradient(135deg, var(--content-bg), rgba(64, 224, 208, 0.05));
        border-radius: 16px;
        padding: 20px;
        text-align: center;
        border: 1px solid var(--border-color);
        transition: all 0.3s ease;
        backdrop-filter: blur(15px);
        min-width: 100px;
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
        background: linear-gradient(90deg, transparent, rgba(64, 224, 208, 0.1), transparent);
        transition: left 0.8s;
      }

      .stat-item:hover::before {
        left: 100%;
      }

      .stat-item:hover {
        transform: translateY(-8px);
        border-color: var(--accent-primary);
        box-shadow: 0 12px 30px rgba(64, 224, 208, 0.2);
      }

      .stat-number {
        font-size: 24px;
        font-weight: 700;
        color: var(--accent-primary);
        display: block;
        text-shadow: var(--glow-primary);
        font-family: var(--mono-font);
      }

      .stat-label {
        font-size: 12px;
        color: var(--inactive-color);
        font-weight: 500;
        margin-top: 5px;
      }

      /* Status buttons */
      .status-button {
        font-size: 13px;
        margin-top: 0;
        padding: 8px 16px;
        background: rgba(64, 224, 208, 0.1);
        border: 1px solid var(--border-color);
        color: var(--accent-primary);
        border-radius: 8px;
        transition: all 0.3s ease;
        font-weight: 500;
      }

      .status-button:hover {
        background: var(--accent-primary);
        color: #ffffff;
        transform: translateY(-2px);
        box-shadow: 0 6px 20px rgba(64, 224, 208, 0.3);
      }

      .status-button.open {
        background: transparent;
        color: var(--inactive-color);
        border: 1px solid var(--button-inactive);
      }

      .status-button.open:hover {
        color: var(--accent-primary);
        border-color: var(--accent-primary);
      }
  
      /* Scrollbar */
      ::-webkit-scrollbar {
        width: 8px;
        border-radius: 10px;
      }
  
      ::-webkit-scrollbar-track {
        background: rgba(64, 224, 208, 0.1);
        border-radius: 10px;
      }

      ::-webkit-scrollbar-thumb {
        background: var(--scrollbar-bg);
        border-radius: 10px;
        transition: all 0.3s ease;
      }

      ::-webkit-scrollbar-thumb:hover {
        background: var(--accent-primary);
      }

      /* Mobile Responsive Adjustments */
      @media screen and (max-width: 768px) {
        .content-wrapper-header svg {
          display: none;
        }
        
        .content-section ul li {
          padding: 15px 20px;
          font-size: 14px;
        }
        
        .content-section ul svg {
          width: 28px;
          height: 28px;
          margin-right: 15px;
        }
      }

      @media screen and (max-width: 480px) {
        .achievement-stats {
          gap: 10px;
        }
        
        .stat-item {
          padding: 15px;
          min-width: 80px;
        }
        
        .stat-number {
          font-size: 20px;
        }
        
        .stat-label {
          font-size: 10px;
        }
      }

      /* Advanced Animations */
      .floating {
        animation: floating 3s ease-in-out infinite;
      }

      @keyframes floating {
        0%, 100% { transform: translateY(0px); }
        50% { transform: translateY(-10px); }
      }

      .typewriter {
        overflow: hidden;
        border-right: 2px solid var(--accent-primary);
        white-space: nowrap;
        animation: typing 3.5s steps(40, end), blink-caret 0.75s step-end infinite;
      }

      @keyframes typing {
        from { width: 0; }
        to { width: 100%; }
      }

      @keyframes blink-caret {
        from, to { border-color: transparent; }
        50% { border-color: var(--accent-primary); }
      }

      /* Intersection Observer animations */
      .fade-in {
        opacity: 0;
        transform: translateY(30px);
        transition: all 0.8s ease;
      }

      .fade-in.visible {
        opacity: 1;
        transform: translateY(0);
      }

      .slide-in-left {
        opacity: 0;
        transform: translateX(-50px);
        transition: all 0.8s ease;
      }

      .slide-in-left.visible {
        opacity: 1;
        transform: translateX(0);
      }

      .slide-in-right {
        opacity: 0;
        transform: translateX(50px);
        transition: all 0.8s ease;
      }

      .slide-in-right.visible {
        opacity: 1;
        transform: translateX(0);
      }
    </style>
</head>
<body>
    <!-- Loading Screen -->
    <div class="loading-screen" id="loadingScreen">
        <div class="loading-content">
            <div class="loading-logo"></div>
            <div class="loading-text">Loading Portfolio...</div>
        </div>
    </div>

    <!-- Particle Background -->
    <div class="particles" id="particles"></div>

    <!-- Custom Cursor -->
    <div class="cursor cursor--large"></div>
    <div class="cursor cursor--small"></div>
    
    <!-- Video Background -->
    <div class="video-bg">
        <video width="1920" height="1080" autoplay loop muted>
            <!-- TODO: Replace with your video URL -->
            <source src="/* YOUR_VIDEO_URL_HERE */" type="video/mp4">
            Your browser does not support the video tag.
        </video>
    </div>

    <!-- Mobile Menu Toggle -->
    <div class="mobile-menu-toggle" id="mobileMenuToggle">
        <span></span>
        <span></span>
        <span></span>
    </div>
    
    <!-- Theme Toggle -->
    <div class="dark-light">
        <svg viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5" fill="none" stroke-linecap="round" stroke-linejoin="round">
            <path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z" />
        </svg>
    </div>
    
    <!-- Main App Container -->
    <div class="app" id="app">
        <!-- Header -->
        <div class="header">
            <div class="menu-circle"></div>
            <div class="header-menu">
                <a class="menu-link is-active" href="#" data-page="home">Portfolio</a>
                <a class="menu-link" href="#" data-page="projects">Projects</a>
                <a class="menu-link" href="#" data-page="about">About</a>
            </div>
            <div class="header-profile">
                <div class="notification">
                    <span class="notification-number">3</span>
                    <svg viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-bell">
                        <path d="M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9M13.73 21a2 2 0 01-3.46 0" />
                    </svg>
                </div>
                <svg viewBox="0 0 512 512" fill="currentColor">
                    <path d="M448.773 235.551A135.893 135.893 0 00451 211c0-74.443-60.557-135-135-135-47.52 0-91.567 25.313-115.766 65.537-32.666-10.59-66.182-6.049-93.794 12.979-27.612 19.013-44.092 49.116-45.425 82.031C24.716 253.788 0 290.497 0 331c0 7.031 1.703 13.887 3.006 20.537l.015.015C12.719 400.492 56.034 436 106 436h300c57.891 0 106-47.109 106-105 0-40.942-25.053-77.798-63.227-95.449z" />
                </svg>
                <!-- TODO: Replace with your profile image URL -->
                <img class="profile-img" src="/* YOUR_PROFILE_IMAGE_URL_HERE */" alt="">
            </div>
        </div>
        
        <!-- Main Wrapper -->
        <div class="wrapper">
            <!-- Sidebar Navigation -->
            <div class="left-side" id="leftSide">
                <div class="side-wrapper">
                    <div class="side-menu">
                        <a href="#" data-page="home">
                            <svg viewBox="0 0 512 512">
                                <g xmlns="http://www.w3.org/2000/svg" fill="currentColor">
                                    <path d="M0 0h128v128H0zm0 0M192 0h128v128H192zm0 0M384 0h128v128H384zm0 0M0 192h128v128H0zm0 0" />
                                </g>
                                <path xmlns="http://www.w3.org/2000/svg" d="M192 192h128v128H192zm0 0" fill="currentColor" />
                                <path xmlns="http://www.w3.org/2000/svg" d="M384 192h128v128H384zm0 0M0 384h128v128H0zm0 0M192 384h128v128H192zm0 0M384 384h128v128H384zm0 0" fill="currentColor" />
                            </svg>
                            HOME
                        </a>
                        <a href="#" data-page="expertise">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-cpu" viewBox="0 0 16 16">
                                <path d="M5 0a.5.5 0 0 1 .5.5V2h1V.5a.5.5 0 0 1 1 0V2h1V.5a.5.5 0 0 1 1 0V2h1V.5a.5.5 0 0 1 1 0V2A2.5 2.5 0 0 1 14 4.5h1.5a.5.5 0 0 1 0 1H14v1h1.5a.5.5 0 0 1 0 1H14v1h1.5a.5.5 0 0 1 0 1H14v1h1.5a.5.5 0 0 1 0 1H14a2.5 2.5 0 0 1-2.5 2.5v1.5a.5.5 0 0 1-1 0V14h-1v1.5a.5.5 0 0 1-1 0V14h-1v1.5a.5.5 0 0 1-1 0V14h-1v1.5a.5.5 0 0 1-1 0V14A2.5 2.5 0 0 1 2 11.5H.5a.5.5 0 0 1 0-1H2v-1H.5a.5.5 0 0 1 0-1H2v-1H.5a.5.5 0 0 1 0-1H2v-1H.5a.5.5 0 0 1 0-1H2A2.5 2.5 0 0 1 4.5 2V.5A.5.5 0 0 1 5 0zm-.5 3A1.5 1.5 0 0 0 3 4.5v7A1.5 1.5 0 0 0 4.5 13h7a1.5 1.5 0 0 0 1.5-1.5v-7A1.5 1.5 0 0 0 11.5 3h-7zM5 6.5A1.5 1.5 0 0 1 6.5 5h3A1.5 1.5 0 0 1 11 6.5v3A1.5 1.5 0 0 1 9.5 11h-3A1.5 1.5 0 0 1 5 9.5v-3z"/>
                            </svg>
                            EXPERTISE
                        </a>
                    </div>
                </div>
                
                <div class="side-wrapper">
                    <div class="side-title">Categories</div>
                    <div class="side-menu">
                        <a href="#" data-page="experience">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-briefcase" viewBox="0 0 16 16">
                                <path d="M6.5 1A1.5 1.5 0 0 0 5 2.5V3H1.5A1.5 1.5 0 0 0 0 4.5v8A1.5 1.5 0 0 0 1.5 14h13a1.5 1.5 0 0 0 1.5-1.5v-8A1.5 1.5 0 0 0 14.5 3H11v-.5A1.5 1.5 0 0 0 9.5 1h-3zm0 1h3a.5.5 0 0 1 .5.5V3H6v-.5a.5.5 0 0 1 .5-.5zm1.886 6.914L15 7.151V12.5a.5.5 0 0 1-.5.5h-13a.5.5 0 0 1-.5-.5V7.15l6.614 1.764a1.5 1.5 0 0 0 .772 0zM1.5 4h13a.5.5 0 0 1 .5.5v1.616L8.864 7.85a.5.5 0 0 1-.258 0L1.5 6.116V4.5a.5.5 0 0 1 .5-.5z"/>
                            </svg>
                            Experience
                        </a>
                        <a href="#" data-page="projects">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-code-slash" viewBox="0 0 16 16">
                                <path d="M10.478 1.647a.5.5 0 1 0-.956-.294l-4 13a.5.5 0 0 0 .956.294l4-13zM4.854 4.146a.5.5 0 0 1 0 .708L1.707 8l3.147 3.146a.5.5 0 0 1-.708.708l-3.5-3.5a.5.5 0 0 1 0-.708l3.5-3.5a.5.5 0 0 1 .708 0zm6.292 0a.5.5 0 0 0 0 .708L14.293 8l-3.147 3.146a.5.5 0 0 0 .708.708l3.5-3.5a.5.5 0 0 0 0-.708l-3.5-3.5a.5.5 0 0 0-.708 0z" />
                            </svg>
                            Projects
                        </a>
                        <a href="#" data-page="about">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-person-circle" viewBox="0 0 16 16">
                                <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0z"/>
                                <path fill-rule="evenodd" d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1z"/>
                            </svg>
                            About
                        </a>
                    </div>
                </div>
                
                <div class="side-wrapper">
                    <div class="side-title">Social Links</div>
                    <div class="side-menu">
                        <a target="_blank" href="https://www.linkedin.com/in/aviv-shaked-59a4b7271/">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-linkedin" viewBox="0 0 16 16">
                                <path d="M0 1.146C0 .513.526 0 1.175 0h13.65C15.474 0 16 .513 16 1.146v13.708c0 .633-.526 1.146-1.175 1.146H1.175C.526 16 0 15.487 0 14.854V1.146zm4.943 12.248V6.169H2.542v7.225h2.401zm-1.2-8.212c.837 0 1.358-.554 1.358-1.248-.015-.709-.52-1.248-1.342-1.248-.822 0-1.359.54-1.359 1.248 0 .694.521 1.248 1.327 1.248h.016zm4.908 8.212V9.359c0-.216.016-.432.08-.586.173-.431.568-.878 1.232-.878.869 0 1.216.662 1.216 1.634v3.865h2.401V9.25c0-2.22-1.184-3.252-2.764-3.252-1.274 0-1.845.7-2.165 1.193v.025h-.016a5.54 5.54 0 0 1 .016-.025V6.169h-2.4c.03.678 0 7.225 0 7.225h2.4z" />
                            </svg>
                            LinkedIn
                        </a>
                        <a target="_blank" href="https://github.com/Patcholie">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-github" viewBox="0 0 16 16">
                                <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.012 8.012 0 0 0 16 8c0-4.42-3.58-8-8-8z" />
                            </svg>
                            Github
                        </a>
                        <a target="_blank" href="https://www.instagram.com/_avivshaked_/">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-instagram" viewBox="0 0 16 16">
                                <path d="M8 0C5.829 0 5.556.01 4.703.048 3.85.088 3.269.222 2.76.42a3.917 3.917 0 0 0-1.417.923A3.927 3.927 0 0 0 .42 2.76C.222 3.268.087 3.85.048 4.7.01 5.555 0 5.827 0 8.001c0 2.172.01 2.444.048 3.297.04.852.174 1.433.372 1.942.205.526.478.972.923 1.417.444.445.89.719 1.416.923.51.198 1.09.333 1.942.372C5.555 15.99 5.827 16 8 16s2.444-.01 3.298-.048c.851-.04 1.434-.174 1.943-.372a3.916 3.916 0 0 0 1.416-.923c.445-.445.718-.891.923-1.417.197-.509.332-1.09.372-1.942C15.99 10.445 16 10.173 16 8s-.01-2.445-.048-3.299c-.04-.851-.175-1.433-.372-1.941a3.926 3.926 0 0 0-.923-1.417A3.911 3.911 0 0 0 13.24.42c-.51-.198-1.092-.333-1.943-.372C10.443.01 10.172 0 7.998 0h.003zm-.717 1.442h.718c2.136 0 2.389.007 3.232.046.78.035 1.204.166 1.486.275.373.145.64.319.92.599.28.28.453.546.598.92.11.281.24.705.275 1.485.039.843.047 1.096.047 3.231s-.008 2.389-.047 3.232c-.035.78-.166 1.203-.275 1.485a2.47 2.47 0 0 1-.599.919c-.28.28-.546.453-.92.598-.28.11-.704.24-1.485.276-.843.038-1.096.047-3.232.047s-2.39-.009-3.233-.047c-.78-.036-1.203-.166-1.485-.276a2.478 2.478 0 0 1-.92-.598 2.48 2.48 0 0 1-.6-.92c-.109-.281-.24-.705-.275-1.485-.038-.843-.046-1.096-.046-3.233 0-2.136.008-2.388.046-3.231.036-.78.166-1.204.276-1.486.145-.373.319-.64.599-.92.28-.28.546-.453.92-.598.282-.11.705-.24 1.485-.276.738-.034 1.024-.044 2.515-.045v.002zm4.988 1.328a.96.96 0 1 0 0 1.92.96.96 0 0 0 0-1.92zm-4.27 1.122a4.109 4.109 0 1 0 0 8.217 4.109 4.109 0 0 0 0-8.217zm0 1.441a2.667 2.667 0 1 1 0 5.334 2.667 2.667 0 0 1 0-5.334z" />
                            </svg>
                            Instagram
                        </a>
                    </div>
                </div>
            </div>
            
            <!-- Main Content Area -->
            <div class="main-container">
                <div class="content-wrapper" id="contentWrapper">
                    <!-- All page content will be dynamically loaded here -->
                </div>
            </div>
        </div>
    </div>

    <!-- Scripts -->
    <script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/gsap.min.js"></script>
    <script>
        // Portfolio Application Class
        class PortfolioApp {
            constructor() {
                this.currentPage = 'home';
                this.isTransitioning = false;
                this.initializeApp();
            }

            initializeApp() {
                this.setupCursor();
                this.setupParticles();
                this.setupNavigation();
                this.setupMobileMenu();
                this.setupThemeToggle();
                this.setupScrollAnimations();
                this.loadPage('home');
                this.hideLoadingScreen();
            }

            hideLoadingScreen() {
                setTimeout(() => {
                    const loadingScreen = document.getElementById('loadingScreen');
                    loadingScreen.classList.add('hidden');
                    setTimeout(() => {
                        loadingScreen.style.display = 'none';
                    }, 800);
                }, 1500);
            }

            setupCursor() {
                const cursorOuter = document.querySelector(".cursor--large");
                const cursorInner = document.querySelector(".cursor--small");
                let isStuck = false;
                let mouse = { x: -100, y: -100 };

                if (!cursorOuter || !cursorInner) return;

                let cursorOuterOriginalState = {
                    width: cursorOuter.getBoundingClientRect().width,
                    height: cursorOuter.getBoundingClientRect().height,
                };

                document.body.addEventListener("pointermove", (e) => {
                    mouse.x = e.pageX;
                    mouse.y = e.pageY;
                });

                document.body.addEventListener("pointerdown", () => {
                    gsap.to(cursorInner, 0.15, { scale: 2 });
                    cursorOuter.classList.add('active');
                });

                document.body.addEventListener("pointerup", () => {
                    gsap.to(cursorInner, 0.15, { scale: 1 });
                    cursorOuter.classList.remove('active');
                });

                const updateCursor = () => {
                    gsap.set(cursorInner, { x: mouse.x, y: mouse.y });
                    
                    if (!isStuck) {
                        gsap.to(cursorOuter, {
                            duration: 0.15,
                            x: mouse.x - cursorOuterOriginalState.width / 2,
                            y: mouse.y - cursorOuterOriginalState.height / 2,
                        });
                    }
                    requestAnimationFrame(updateCursor);
                };

                updateCursor();

                // Enhanced hover effects
                document.querySelectorAll('a, button, .app-card, .side-menu a, .tech-badge').forEach(el => {
                    el.addEventListener('mouseenter', () => {
                        isStuck = true;
                        const targetBox = el.getBoundingClientRect();
                        gsap.to(cursorOuter, 0.2, {
                            x: targetBox.left,
                            y: targetBox.top,
                            width: targetBox.width,
                            height: targetBox.height,
                            borderRadius: el.classList.contains('tech-badge') ? '20px' : '10px',
                            backgroundColor: "rgba(64, 224, 208, 0.1)",
                        });
                    });

                    el.addEventListener('mouseleave', () => {
                        isStuck = false;
                        gsap.to(cursorOuter, 0.2, {
                            width: cursorOuterOriginalState.width,
                            height: cursorOuterOriginalState.height,
                            borderRadius: "50%",
                            backgroundColor: "transparent",
                        });
                    });
                });
            }

            setupParticles() {
                const particlesContainer = document.getElementById('particles');
                const particleCount = 50;

                for (let i = 0; i < particleCount; i++) {
                    const particle = document.createElement('div');
                    particle.className = 'particle';
                    particle.style.left = Math.random() * 100 + '%';
                    particle.style.top = Math.random() * 100 + '%';
                    particle.style.animationDelay = Math.random() * 6 + 's';
                    particle.style.animationDuration = (Math.random() * 3 + 3) + 's';
                    particlesContainer.appendChild(particle);
                }
            }

            setupNavigation() {
                const navLinks = document.querySelectorAll('[data-page]');
                navLinks.forEach(link => {
                    link.addEventListener('click', (e) => {
                        e.preventDefault();
                        const page = e.target.getAttribute('data-page');
                        if (page && page !== this.currentPage && !this.isTransitioning) {
                            this.navigateToPage(page);
                        }
                    });
                });
            }

            setupMobileMenu() {
                const toggle = document.getElementById('mobileMenuToggle');
                const leftSide = document.getElementById('leftSide');

                toggle.addEventListener('click', () => {
                    toggle.classList.toggle('active');
                    leftSide.classList.toggle('mobile-open');
                });

                // Close mobile menu when clicking outside
                document.addEventListener('click', (e) => {
                    if (!leftSide.contains(e.target) && !toggle.contains(e.target)) {
                        toggle.classList.remove('active');
                        leftSide.classList.remove('mobile-open');
                    }
                });
            }

            setupThemeToggle() {
                const toggleButton = document.querySelector('.dark-light');
                toggleButton.addEventListener('click', () => {
                    document.body.classList.toggle('light-mode');
                    gsap.to(toggleButton, { rotation: 360, duration: 0.5 });
                });
            }

            setupScrollAnimations() {
                const observerOptions = {
                    threshold: 0.1,
                    rootMargin: '0px 0px -50px 0px'
                };

                const observer = new IntersectionObserver((entries) => {
                    entries.forEach(entry => {
                        if (entry.isIntersecting) {
                            entry.target.classList.add('visible');
                        }
                    });
                }, observerOptions);

                // Will observe elements after they're added to DOM
                this.observeElements = (container) => {
                    container.querySelectorAll('.fade-in, .slide-in-left, .slide-in-right').forEach(el => {
                        observer.observe(el);
                    });
                };
            }

            navigateToPage(page) {
                if (this.isTransitioning) return;
                
                this.isTransitioning = true;
                const contentWrapper = document.getElementById('contentWrapper');

                // Update active navigation
                document.querySelectorAll('.menu-link').forEach(link => {
                    link.classList.remove('is-active');
                });
                document.querySelector(`[data-page="${page}"]`).classList.add('is-active');

                // Slide out current content
                gsap.to(contentWrapper.children, {
                    duration: 0.3,
                    x: -50,
                    opacity: 0,
                    stagger: 0.05,
                    onComplete: () => {
                        this.loadPage(page);
                        // Slide in new content
                        gsap.fromTo(contentWrapper.children, {
                            x: 50,
                            opacity: 0
                        }, {
                            duration: 0.5,
                            x: 0,
                            opacity: 1,
                            stagger: 0.1,
                            ease: "power2.out",
                            onComplete: () => {
                                this.isTransitioning = false;
                                this.observeElements(contentWrapper);
                            }
                        });
                    }
                });

                this.currentPage = page;
            }

            loadPage(page) {
                const contentWrapper = document.getElementById('contentWrapper');
                let content = '';

                switch(page) {
                    case 'home':
                        content = this.getHomeContent();
                        break;
                    case 'expertise':
                        content = this.getExpertiseContent();
                        break;
                    case 'experience':
                        content = this.getExperienceContent();
                        break;
                    case 'projects':
                        content = this.getProjectsContent();
                        break;
                    case 'about':
                        content = this.getAboutContent();
                        break;
                    default:
                        content = this.getHomeContent();
                }

                contentWrapper.innerHTML = content;
            }

            getHomeContent() {
                return `
                    <div class="content-wrapper-header fade-in">
                        <div class="content-wrapper-context">
                            <h1 class="typewriter">Aviv Shaked</h1>
                            <div class="content-text">
                                18-year-old Cybersecurity Developer & Researcher from Haifa, Israel. Expert in C++, network security, and low-level programming. Currently developing revolutionary covert communication systems and building secure, high-performance applications.
                            </div>
                            <div class="achievement-stats">
                                <div class="stat-item floating">
                                    <span class="stat-number">2nd</span>
                                    <span class="stat-label">AI4Y World</span>
                                </div>
                                <div class="stat-item floating" style="animation-delay: 0.5s;">
                                    <span class="stat-number">5+</span>
                                    <span class="stat-label">Major Projects</span>
                                </div>
                                <div class="stat-item floating" style="animation-delay: 1s;">
                                    <span class="stat-number">3+</span>
                                    <span class="stat-label">Years Experience</span>
                                </div>
                            </div>
                            <a target="_blank" href="https://drive.google.com/file/d/1v5AKQbmrSW2lbF-qxyDP-BN9oiStiLwQ/view?usp=sharing">
                                <button class="content-button">
                                    <svg width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                                        <path d="M.5 9.9a.5.5 0 0 1 .5.5v2.5a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-2.5a.5.5 0 0 1 1 0v2.5a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2v-2.5a.5.5 0 0 1 .5-.5z"/>
                                        <path d="M7.646 11.854a.5.5 0 0 0 .708 0l3-3a.5.5 0 0 0-.708-.708L8.5 10.293V1.5a.5.5 0 0 0-1 0v8.793L5.354 8.146a.5.5 0 1 0-.708.708l3 3z"/>
                                    </svg>
                                    Show Resume
                                </button>
                            </a>
                        </div>
                        <svg xmlns="http://www.w3.org/2000/svg" width="200" height="200" fill="currentColor" class="bi bi-shield-lock floating" viewBox="0 0 16 16" style="opacity: 0.6;">
                            <path d="M5.338 1.59a61.44 61.44 0 0 0-2.837.856.481.481 0 0 0-.328.39c-.554 4.157.726 7.19 2.253 9.188a10.725 10.725 0 0 0 2.287 2.233c.346.244.652.42.893.533.12.057.218.095.293.118a.55.55 0 0 0 .101.025.615.615 0 0 0 .1-.025c.076-.023.174-.061.294-.118.24-.113.547-.29.893-.533a10.726 10.726 0 0 0 2.287-2.233c1.527-1.997 2.807-5.031 2.253-9.188a.48.48 0 0 0-.328-.39c-.651-.213-1.75-.56-2.837-.855C9.552 1.29 8.531 1.067 8 1.067c-.53 0-1.552.223-2.662.524zM5.072.56C6.157.265 7.31 0 8 0s1.843.265 2.928.56c1.11.3 2.229.655 2.887.87a1.54 1.54 0 0 1 1.044 1.262c.596 4.477-.787 7.795-2.465 9.99a11.775 11.775 0 0 1-2.517 2.453 7.159 7.159 0 0 1-1.048.625c-.28.132-.581.24-.829.24s-.548-.108-.829-.24a7.158 7.158 0 0 1-1.048-.625 11.777 11.777 0 0 1-2.517-2.453C1.928 10.487.545 7.169 1.141 2.692A1.54 1.54 0 0 1 2.185 1.43 62.456 62.456 0 0 1 5.072.56z"/>
                            <path d="M9.5 6.5a1.5 1.5 0 0 1-1 1.415l.385 1.99a.5.5 0 0 1-.491.595h-.788a.5.5 0 0 1-.49-.595L7.5 7.915A1.5 1.5 0 1 1 9.5 6.5z"/>
                        </svg>
                    </div>
                `;
            }

            getExpertiseContent() {
                return `
                    <div class="content-section slide-in-left">
                        <div class="content-section-title">Technical Expertise</div>
                        <ul>
                            <li class="adobe-product">
                                <div class="products">
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                                        <path d="M12 2L2 7v10c0 5.55 3.84 9.74 9 9 5.16.74 9-3.45 9-9V7l-10-5z"/>
                                        <path d="M10 10l2 2 4-4"/>
                                    </svg>
                                    Cybersecurity & Network Security
                                </div>
                                <div class="button-wrapper">
                                    <span class="tech-badge">C++20</span>
                                    <span class="tech-badge">Steganography</span>
                                    <span class="tech-badge">Network Programming</span>
                                </div>
                            </li>
                            <li class="adobe-product">
                                <div class="products">
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                                        <path d="M9.4 16.6L4.8 12l4.6-4.6L8 6l-6 6 6 6 1.4-1.4zm5.2 0L19.2 12l-4.6-4.6L16 6l6 6-6 6-1.4-1.4z"/>
                                    </svg>
                                    Low-Level Systems Programming
                                </div>
                                <div class="button-wrapper">
                                    <span class="tech-badge">C/C++</span>
                                    <span class="tech-badge">Assembly</span>
                                    <span class="tech-badge">Multi-threading</span>
                                </div>
                            </li>
                            <li class="adobe-product">
                                <div class="products">
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
                                        <path d="M439.8 200.5c-7.7-30.9-22.3-54.2-53.4-54.2h-40.1v47.4c0 36.8-31.2 67.8-66.8 67.8H172.7c-29.2 0-53.4 25-53.4 54.3v101.8c0 29 25.2 46 53.4 54.3 33.8 9.9 66.3 11.7 106.8 0 26.9-7.8 53.4-23.5 53.4-54.3v-40.7H226.2v-13.6h160.2c31.1 0 42.6-21.7 53.4-54.2 11.2-33.5 10.7-65.7 0-108.6zM286.2 404c11.1 0 20.1 9.1 20.1 20.3 0 11.3-9 20.4-20.1 20.4-11 0-20.1-9.2-20.1-20.4.1-11.3 9.1-20.3 20.1-20.3zM167.8 248.1h106.8c29.7 0 53.4-24.5 53.4-54.3V91.9c0-29-24.4-50.7-53.4-55.6-35.8-5.9-74.7-5.6-106.8.1-45.2 8-53.4 24.7-53.4 55.6v40.7h106.9v13.6h-147c-31.1 0-58.3 18.7-66.8 54.2-9.8 40.7-10.2 66.1 0 108.6 7.6 31.6 25.7 54.2 56.8 54.2H101v-48.8c0-35.3 30.5-66.4 66.8-66.4zm-6.7-142.6c-11.1 0-20.1-9.1-20.1-20.3.1-11.3 9-20.4 20.1-20.4 11 0 20.1 9.2 20.1 20.4s-9 20.3-20.1 20.3z" />
                                    </svg>
                                    Full-Stack Development & AI
                                </div>
                                <div class="button-wrapper">
                                    <span class="tech-badge">Python</span>
                                    <span class="tech-badge">AI/ML</span>
                                    <span class="tech-badge">Web Development</span>
                                </div>
                            </li>
                        </ul>
                    </div>
                `;
            }

            getExperienceContent() {
                return `
                    <div class="content-section slide-in-right">
                        <div class="content-section-title">Professional Experience</div>
                        <ul>
                            <li class="adobe-product">
                                <div class="products">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" fill="currentColor" class="bi bi-building" viewBox="0 0 16 16">
                                        <path d="M4 2.5a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5v-1Zm3 0a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5v-1Zm3.5-.5a.5.5 0 0 0-.5.5v1a.5.5 0 0 0 .5.5h1a.5.5 0 0 0 .5-.5v-1a.5.5 0 0 0-.5-.5h-1ZM4 5.5a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5v-1ZM7.5 5a.5.5 0 0 0-.5.5v1a.5.5 0 0 0 .5.5h1a.5.5 0 0 0 .5-.5v-1a.5.5 0 0 0-.5-.5h-1Zm2.5.5a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5v-1ZM4.5 8a.5.5 0 0 0-.5.5v1a.5.5 0 0 0 .5.5h1a.5.5 0 0 0 .5-.5v-1a.5.5 0 0 0-.5-.5h-1Zm2.5.5a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5v-1Zm3.5-.5a.5.5 0 0 0-.5.5v1a.5.5 0 0 0 .5.5h1a.5.5 0 0 0 .5-.5v-1a.5.5 0 0 0-.5-.5h-1Z"/>
                                        <path d="M2 1a1 1 0 0 1 1-1h10a1 1 0 0 1 1 1v14a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V1Zm11 0H3v14h3v-2.5a.5.5 0 0 1 .5-.5h3a.5.5 0 0 1 .5.5V15h3V1Z"/>
                                    </svg>
                                    AllBikes - Product Uploader & Tools Developer
                                </div>
                                <div class="button-wrapper">
                                    <span class="status-button open">2023-Present</span>
                                </div>
                            </li>
                            <li class="adobe-product">
                                <div class="products">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" fill="currentColor" class="bi bi-mortarboard" viewBox="0 0 16 16">
                                        <path d="M8.211 2.047a.5.5 0 0 0-.422 0L1.5 5.5v.92l.16.022c.141.018.276.048.404.088l-.05.095c-.073.139-.127.29-.156.451-.024.133-.03.272-.016.409l.004.026 4.5 2.258a.5.5 0 0 0 .447 0l4.5-2.258.004-.026c.014-.137.008-.276-.016-.409a1.823 1.823 0 0 0-.156-.451l-.05-.095c.128-.04.263-.07.404-.088L14.5 6.42v-.92L8.211 2.047z"/>
                                        <path d="M8 10.172 4.7 8.662l-.055.027A4.488 4.488 0 0 0 8 13a4.488 4.488 0 0 0 3.355-4.311l-.055-.027L8 10.172zM8 11 1.5 7.5v.5c0 1.657 2.686 3 6 3s6-1.343 6-3v-.5L8 11z"/>
                                    </svg>
                                    Cyber Education Center - Student & Researcher
                                </div>
                                <div class="button-wrapper">
                                    <span class="status-button open">2023-Present</span>
                                </div>
                            </li>
                            <li class="adobe-product">
                                <div class="products">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" fill="currentColor" class="bi bi-trophy" viewBox="0 0 16 16">
                                        <path d="M2.5.5A.5.5 0 0 1 3 0h10a.5.5 0 0 1 .5.5c0 .538-.012 1.05-.034 1.536a3 3 0 1 1-1.133 5.89c-.79 1.865-1.878 2.777-2.833 3.011v2.173l1.425.356c.194.048.377.135.537.255L13.3 15.1a.5.5 0 0 1-.3.9H3a.5.5 0 0 1-.3-.9l1.838-1.379c.16-.12.343-.207.537-.255L6.5 13.11v-2.173c-.955-.234-2.043-1.146-2.833-3.012a3 3 0 1 1-1.132-5.89A33.076 33.076 0 0 1 2.5.5zm.099 2.54a2 2 0 0 0 .72 3.935c-.333-1.05-.588-2.346-.72-3.935zm10.083 3.935a2 2 0 0 0 .72-3.935c-.133 1.59-.388 2.885-.72 3.935z"/>
                                    </svg>
                                    Analisis Team - AI4Y World Competition (2nd Place)
                                </div>
                                <div class="button-wrapper">
                                    <span class="status-button">2022-2023</span>
                                </div>
                            </li>
                        </ul>
                    </div>
                `;
            }

            getProjectsContent() {
                return `
                    <div class="content-section fade-in">
                        <div class="content-section-title">Featured Projects</div>
                        <div class="apps-card">
                            <div class="app-card slide-in-left">
                                <span>
                                    HitchHiker: Network Steganography Platform
                                    <span class="project-status development">In Development</span>
                                </span>
                                <div class="app-card__subtext">
                                    Revolutionary covert communication system that enables hidden data transmission without creating new network packets. 
                                    Advanced C++20 implementation with multi-threading, Docker containerization, and undetectable steganography integrated with internet traffic.
                                </div>
                                <div style="margin: 15px 0;">
                                    <span class="tech-badge">C++20</span>
                                    <span class="tech-badge">Multi-threading</span>
                                    <span class="tech-badge">Docker</span>
                                    <span class="tech-badge">CMake</span>
                                    <span class="tech-badge">Network Security</span>
                                </div>
                            </div>

                            <div class="app-card slide-in-right" style="animation-delay: 0.2s;">
                                <span>
                                    Multiplayer Trivia Game System
                                    <span class="project-status">Completed</span>
                                </span>
                                <div class="app-card__subtext">
                                    High-performance C++ server with Unity client. Handles 25+ concurrent players with custom binary protocol, 
                                    thread-safe architecture, real-time synchronization, and enterprise-level software engineering practices.
                                </div>
                                <div style="margin: 15px 0;">
                                    <span class="tech-badge">C++17</span>
                                    <span class="tech-badge">Unity</span>
                                    <span class="tech-badge">SQLite3</span>
                                    <span class="tech-badge">RAII</span>
                                    <span class="tech-badge">Network Programming</span>
                                </div>
                            </div>

                            <div class="app-card fade-in" style="animation-delay: 0.4s;">
                                <span>
                                    Analisis: AI Medical Diagnosis Platform
                                    <span class="project-status winner">World Finalist</span>
                                </span>
                                <div class="app-card__subtext">
                                    AI-powered medical platform for wound detection and treatment recommendations. Won National AI4Y Competition, 
                                    represented Israel in world competition achieving 2nd place globally.
                                </div>
                                <div style="margin: 15px 0;">
                                    <span class="tech-badge">Python</span>
                                    <span class="tech-badge">AI/ML</span>
                                    <span class="tech-badge">Computer Vision</span>
                                    <span class="tech-badge">Web Development</span>
                                </div>
                                <div class="app-card-buttons">
                                    <a href="https://github.com/Patcholie/Analisis" target="_blank">
                                        <button class="content-button">
                                            <svg width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                                                <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.012 8.012 0 0 0 16 8c0-4.42-3.58-8-8-8z"/>
                                            </svg>
                                            View Project
                                        </button>
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                `;
            }

            getAboutContent() {
                return `
                    <div class="content-section fade-in">
                        <div class="content-section-title">About Me</div>
                        <div class="content-wrapp-header">
                            <div class="content-wrapper-context">
                                <!-- TODO: Replace with your profile image URL -->
                                <img src="/* YOUR_PROFILE_IMAGE_URL_HERE */" style="max-width: 64px; border-radius: 12px; margin-right: 20px; border: 2px solid var(--accent-primary); box-shadow: var(--glow-primary);">
                                <div>
                                    <h2 style="margin: 0 0 10px 0; color: var(--accent-primary);">Aviv Shaked - Cybersecurity Developer & Researcher</h2>
                                    <div class="content-tt">
                                        I'm Aviv Shaked, an 18-year-old cybersecurity developer and researcher from Haifa, Israel. 
                                        Currently pursuing advanced studies in cybersecurity at Magshimim Cyber Center and computer science at Bosmat Technological School.
                                        <br><br>
                                        My expertise lies in building secure, high-performance systems using modern C++. I've been part of the Captain Team of Analisis, 
                                        which represented Israel in the AI4Y World Competition, and I'm currently developing revolutionary covert communication systems.
                                        <br><br>
                                        Professional experience includes building automated tools and secure data systems at AllBikes, with expertise in Python automation 
                                        and data processing. Always eager to take on challenging projects that push the boundaries of cybersecurity and software engineering.
                                        <br><br>
                                        Additional skills include marketing, public communication, and market analysis. Completed courses through Google, Coursera, and Harvard 
                                        to develop well-rounded professional capabilities.
                                    </div>
                                </div>
                            </div>
                        </div>
                        
                        <div class="achievement-stats" style="margin-top: 30px; justify-content: center;">
                            <div class="stat-item slide-in-left">
                                <span class="stat-number">🏆</span>
                                <span class="stat-label">AI4Y World Finalist</span>
                            </div>
                            <div class="stat-item slide-in-left" style="animation-delay: 0.2s;">
                                <span class="stat-number">🔒</span>
                                <span class="stat-label">Cybersecurity Expert</span>
                            </div>
                            <div class="stat-item slide-in-left" style="animation-delay: 0.4s;">
                                <span class="stat-number">🚀</span>
                                <span class="stat-label">Innovation Leader</span>
                            </div>
                            <div class="stat-item slide-in-left" style="animation-delay: 0.6s;">
                                <span class="stat-number">💻</span>
                                <span class="stat-label">C++ Specialist</span>
                            </div>
                        </div>
                    </div>
                `;
            }
        }

        // Initialize the application when DOM is loaded
        document.addEventListener('DOMContentLoaded', () => {
            new PortfolioApp();
        });

        // Additional performance optimizations
        window.addEventListener('load', () => {
            // Preload critical resources
            const preloadResources = [
                '/* YOUR_VIDEO_URL_HERE */',
                '/* YOUR_BACKGROUND_IMAGE_URL_HERE */',
                '/* YOUR_PROFILE_IMAGE_URL_HERE */'
            ];
            
            preloadResources.forEach(resource => {
                if (resource && !resource.includes('TODO')) {
                    const link = document.createElement('link');
                    link.rel = 'preload';
                    link.href = resource;
                    link.as = resource.includes('.mp4') ? 'video' : 'image';
                    document.head.appendChild(link);
                }
            });
        });

        // Smooth scroll behavior for anchor links
        document.addEventListener('click', (e) => {
            if (e.target.tagName === 'A' && e.target.getAttribute('href')?.startsWith('#')) {
                e.preventDefault();
                const target = document.querySelector(e.target.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }
            }
        });

        // Performance monitoring
        if ('serviceWorker' in navigator) {
            navigator.serviceWorker.register('/sw.js').catch(() => {
                // Service worker registration failed, continue without it
            });
        }
    </script>
</body>
</html>
