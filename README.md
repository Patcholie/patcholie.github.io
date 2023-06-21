<!-- Important Notes: while running the code on a local host or internal server there are no errors, Currently some methods are not accepted because of some encryption -->
<head>
  <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto+Mono&display=swap">
  <style>
    * {
      outline: none;
      box-sizing: border-box;
    }

    :root {
      --theme-bg-color: rgba(16 18 27 / 40%);
      --border-color: rgba(113 119 144 / 25%);
      --theme-color: #f9fafb;
      --inactive-color: rgb(113 119 144 / 78%);
      --body-font: "Roboto Mono", Monospace;
      --hover-menu-bg: rgba(12 15 25 / 30%);
      --content-title-color: #999ba5;
      --content-bg: rgb(146 151 179 / 13%);
      --button-inactive: rgb(249 250 251 / 55%);
      --search-bg: #0e0e0e;
      --overlay-bg: rgba(36, 39, 59, 0.3);
      --scrollbar-bg: rgb(1 2 3 / 40%);
      --text_gradient: linear-gradient(to right, #e6e5e5, #f5f5f5);
      --large_cursor_color: white;
      --small_cursor_color: rgb(150, 150, 150);
    }

    .light-mode {
      --theme-bg-color: rgb(255 255 255 / 31%);
      --theme-color: #3c3a3a;
      --inactive-color: #333333;
      --button-inactive: #3c3a3a;
      --search-bg: rgb(255 255 255 / 31%);
      --dropdown-bg: #f7f7f7;
      --overlay-bg: rgb(255 255 255 / 30%);
      --border-color: rgb(255 255 255 / 35%);
      --hover-menu-bg: rgba(255 255 255 / 35%);
      --scrollbar-bg: rgb(255 253 253 / 57%);
      --content-title-color: --theme-color;
      --text_gradient: linear-gradient(to right, rgb(10, 10, 10), #131313);
      --large_cursor_color: black;
      --small_cursor_color: rgb(32, 32, 32);

    }

    html {
      box-sizing: border-box;
      -webkit-font-smoothing: antialiased;
    }

    body {
      cursor: none;
      font-family: var(--body-font);
      background-image: url(https://cdn.discordapp.com/attachments/597497464211243028/1121114691175985242/background.png);
      background-size: cover;
      background-position: center;
      display: flex;
      justify-content: center;
      align-items: center;
      flex-direction: column;
      padding: 2em;
      width: 100%;
      height: 100vh;
      overflow-x: hidden;
      overflow-y: hidden;
    }

    .cursor {
      width: var(--size);
      height: var(--size);
      border-radius: 50%;
      position: absolute;
      left: 0;
      top: 0;
      pointer-events: none;
      z-index: 100;
    }

    .cursor--large {
      --size: 40px;
      border: 1px solid var(--large_cursor_color);
      ;
    }

    .cursor--small {
      --size: 10px;
      background: var(--small_cursor_color);
      transform: translate(-50%, -50%);
    }

    @media screen and (max-width: 480px) {
      body {
        padding: 0.8em;
      }
    }

    .video-bg {
      position: fixed;
      right: 0;
      top: 0;
      width: 100%;
      height: 100%;
    }

    .video-bg video {
      width: 100%;
      height: 100%;
      -o-object-fit: cover;
      object-fit: cover;
    }

    img {
      max-width: 100%;
    }

    .dark-light {
      position: fixed;
      bottom: 50px;
      right: 30px;
      background-color: var(--dropdown-bg);
      box-shadow: -1px 3px 8px -1px rgba(0, 0, 0, 0.2);
      padding: 8px;
      border-radius: 50%;
      z-index: 3;

    }

    .dark-light svg {
      width: 24px;
      flex-shrink: 0;
      fill: #ffce45;
      stroke: #ffce45;
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
      margin-top: -100px;
      background-color: var(--theme-bg-color);
      max-width: 1250px;
      max-height: 860px;
      height: 90vh;
      display: flex;
      flex-direction: column;
      overflow: hidden;
      position: relative;
      width: 100%;
      border-radius: 14px;
      backdrop-filter: blur(20px);
      -webkit-backdrop-filter: blur(20px);
      font-size: 15px;
      font-weight: 500;
    }

    .header {
      display: flex;
      align-items: center;
      flex-shrink: 0;
      height: 58px;
      width: 100%;
      border-bottom: 1px solid var(--border-color);
      padding: 0 30px;
      white-space: nowrap;
    }

    @media screen and (max-width: 480px) {
      .header {
        padding: 0 16px;
      }
    }

    .header-menu {
      display: flex;
      align-items: center;
    }

    .header-menu a {
      padding: 20px 30px;
      text-decoration: none;
      color: var(--inactive-color);
      border-bottom: 2px solid transparent;
      transition: 0.3s;
    }

    @media screen and (max-width: 610px) {
      .header-menu a:not(.main-header-link) {
        display: none;
      }
    }

    .header-menu a.is-active,
    .header-menu a:hover {
      color: var(--theme-color);
      border-bottom: 2px solid var(--theme-color);
    }

    .notify {
      position: relative;
    }

    .notify:before {
      content: "";
      position: absolute;
      background-color: #272727;
      width: 6px;
      height: 6px;
      border-radius: 50%;
      right: 20px;
      top: 16px;
    }

    @media screen and (max-width: 1055px) {
      .notify {
        display: none;
      }
    }

    .menu-circle {
      width: 15px;
      height: 15px;
      background-color: #f96057;
      border-radius: 50%;
      box-shadow: 24px 0 0 0 #f8ce52, 48px 0 0 0 #5fcf65;
      margin-right: 195px;
      flex-shrink: 0;
    }

    @media screen and (max-width: 945px) {
      .menu-circle {
        display: none;
      }
    }

    @keyframes glowing-button-85 {
      0% {
        background-position: 0 0;
      }

      50% {
        background-position: 400% 0;
      }

      100% {
        background-position: 0 0;
      }
    }

    .button-85:after {
      z-index: -1;
      content: "";
      position: absolute;
      width: 100%;
      height: 100%;
      background: #222;
      left: 0;
      top: 0;
      border-radius: 10px;
    }

    .search-bar {
      height: 40px;
      display: flex;
      width: 100%;
      max-width: 400px;
      padding-left: 16px;
      border-radius: 2px;
    }

    .search-bar input {
      width: 100%;
      height: 100%;
      border: none;
      background-color: var(--search-bg);
      border-radius: 4px;
      font-family: var(--body-font);
      font-size: 15px;
      font-weight: 1000;
      padding: 0 20px 0 40px;
      box-shadow: 0 0 0 2px rgba(134, 140, 160, 0.02);
      background-size: 14px;
      background-repeat: no-repeat;
      background-position: 16px 48%;
      color: var(--theme-color);
    }

    .search-bar input::-moz-placeholder {
      font-family: var(--body-font);
      color: var(--inactive-color);
      font-size: 15px;
      font-weight: 500;
    }

    .search-bar input:-ms-input-placeholder {
      font-family: var(--body-font);
      color: var(--inactive-color);
      font-size: 15px;
      font-weight: 500;
    }

    .search-bar input::placeholder {
      font-family: var(--body-font);
      color: var(--inactive-color);
      font-size: 15px;
      font-weight: 500;
    }

    .header-profile {
      display: flex;
      align-items: center;
      padding: 0 16px 0 40px;
      margin-left: auto;
      flex-shrink: 0;
    }

    .header-profile svg {
      width: 22px;
      color: #f9fafb;
      flex-shrink: 0;
    }

    .notification {
      position: relative;
    }

    .notification-number {
      position: absolute;
      background-color: #161616;
      width: 16px;
      height: 16px;
      border-radius: 50%;
      font-size: 10px;
      display: flex;
      align-items: center;
      justify-content: center;
      color: #fff;
      right: -6px;
      top: -6px;
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
      width: 32px;
      height: 32px;
      border-radius: 50%;
      -o-object-fit: cover;
      object-fit: cover;
      border: 2px solid var(--theme-color);
      margin-left: 22px;
    }

    .wide .header-menu,
    .wide .header-profile {
      display: none;
    }

    .wide .search-bar {
      max-width: 600px;
      margin: auto;
      transition: 0.4s;
      box-shadow: 0 0 0 1px var(--border-color);
      padding-left: 0;
    }

    .wide .menu-circle {
      margin-right: 0;
    }

    .wrapper {
      display: flex;
      flex-grow: 1;
      overflow: hidden;
    }

    .left-side {
      overflow-x: hidden;
      flex-basis: 240px;
      border-right: 1px solid var(--border-color);
      padding: 26px;
      overflow: auto;
      flex-shrink: 0;
    }

    @media screen and (max-width: 945px) {
      .left-side {
        display: none;
      }
    }

    .side-wrapper+.side-wrapper {
      margin-top: 20px;
    }

    .side-title {
      color: var(--inactive-color);
      margin-bottom: 14px;
    }

    .side-menu {
      display: flex;
      flex-direction: column;
      white-space: nowrap;
    }

    .side-menu a {
      text-decoration: none;
      color: var(--theme-color);
      display: flex;
      align-items: center;
      font-weight: 400;
      padding: 10px;
      font-size: 14px;
      border-radius: 6px;
      transition: 0.3s;
    }

    .side-menu a:hover {
      background-color: var(--hover-menu-bg);
    }

    .side-menu svg {
      width: 16px;
      margin-right: 8px;
    }

    .updates {
      position: relative;
      top: 0;
      right: 0;
      margin-left: auto;
      width: 18px;
      height: 18px;
      font-size: 11px;
    }

    .main-header {
      display: flex;
      align-items: center;
      border-bottom: 1px solid var(--border-color);
      height: 58px;
      flex-shrink: 0;
    }

    .main-header .header-menu {
      margin-left: 150px;
    }

    @media screen and (max-width: 1055px) {
      .main-header .header-menu {
        margin: auto;
      }
    }

    .main-header .header-menu a {
      padding: 20px 24px;
    }

    .main-container {
      display: flex;
      flex-direction: column;
      flex-grow: 1;
    }

    .menu-link-main {
      text-decoration: none;
      color: var(--theme-color);
      padding: 0 30px;
    }

    @media screen and (max-width: 1055px) {
      .menu-link-main {
        display: none;
      }
    }

    .content-wrapper {
      display: flex;
      flex-direction: column;
      color: var(--theme-color);
      padding: 20px 40px;
      height: 100%;
      overflow: auto;
      background-color: var(--theme-bg-color);
    }

    @media screen and (max-width: 510px) {
      .content-wrapper {
        padding: 20px;
      }
    }

    .content-wrapper-header {
      display: flex;
      align-items: center;
      width: 100%;
      justify-content: space-between;
      border-radius: 14px;
      padding: 20px 40px;
    }

    @media screen and (max-width: 415px) {
      .content-wrapper-header {
        padding: 20px;
      }
    }





    .content-wrapp-header {
      display: flex;
      align-items: center;
      width: 100%;
      font-size: 16px;
      background-color: var(--content-bg);
      border-radius: 14px;
      border: 1px solid var(--theme-bg-color);
      padding: 20px;

      transition: 0.3s ease;
      justify-content: space-between;

      padding: 20px 40px;
    }

    @media screen and (max-width: 415px) {
      .content-wrapp-header {
        padding: 20px;
      }
    }



    .content-wrapper.overlay {
      pointer-events: none;
      transition: 0.3s;
      background-color: var(--overlay-bg);
    }

    .overlay-app {
      width: 100%;
      height: 100%;
      position: fixed;
      left: 0;
      top: 0;
      pointer-events: all;
      background-color: rgba(36, 39, 59, 0.8);
      opacity: 0;
      visibility: hidden;
      transition: 0.3s;
    }

    .overlay-app.is-active {
      visibility: visible;
      opacity: 1;
    }

    .img-content {
      font-weight: 500;
      font-size: 17px;
      display: flex;
      align-items: center;
      margin: 0;
    }

    .img-content svg {
      width: 28px;
      margin-right: 14px;
    }

    .content-text {
      font-weight: 400;
      font-size: 14px;
      margin-top: 16px;
      line-height: 1.7em;
      color: #ebecec;
      width: 150%;
      background-image: var(--text_gradient);
      display: -webkit-box;
      -webkit-line-clamp: 4;
      -webkit-box-orient: vertical;
      overflow: hidden;
      text-overflow: ellipsis;
      -webkit-background-clip: text;
      -moz-background-clip: text;
      -webkit-text-fill-color: transparent;
      -moz-text-fill-color: transparent;
    }

    .content-tt {
      font-weight: 400;
      font-size: 14px;
      margin-top: 16px;
      line-height: 1.7em;
      width: 250%;
      color: #ebecec;
      background-image: var(--text_gradient);
      display: -webkit-box;
      -webkit-line-clamp: 4;
      -webkit-background-clip: text;
      -moz-background-clip: text;
      -webkit-text-fill-color: transparent;
      -moz-text-fill-color: transparent;
    }

    .content-wrapper-context {
      max-width: 350px;
    }

    .content-button {
      cursor: none;
      background-color: #1f1f1f;
      border: none;
      padding: 8px 26px;
      color: #fff;
      border-radius: 5px;
      margin-top: 16px;
      transition: 0.3s;
      margin-left: 10px;
      white-space: nowrap;
    }

    .content-wrapper-img {
      width: 150px;
      -o-object-fit: cover;
      object-fit: cover;
      margin-top: -25px;
      -o-object-position: center;
      object-position: center;
    }

    @media screen and (max-width: 520px) {
      .content-wrapper-img {
        width: 90px;
      }
    }

    .content-section {
      margin-top: 30px;
      display: flex;
      flex-direction: column;
    }

    .content-section-title {
      color: var(--content-title-color);
      margin-bottom: 14px;
    }

    .content-section ul {
      display: flex;
      flex-direction: column;
      width: 100%;
      height: 100%;
      justify-content: space-around;
      background-color: var(--content-bg);
      padding-left: 0;
      margin: 0;
      border-radius: 14px;
      border: 1px solid var(--theme-bg-color);
    }

    .content-section ul li {
      list-style: none;
      padding: 10px 18px;
      display: flex;
      align-items: center;
      font-size: 16px;
      width: 100%;
      height: 100%;
      white-space: nowrap;
      transition: 0.3s;
    }

    .content-section ul li:hover {
      background-color: var(--theme-bg-color);
    }

    .content-section ul li:hover:first-child {
      border-radius: 13px 13px 0 0;
    }

    .content-section ul li:hover:last-child {
      border-radius: 0 0 13px 13px;
    }

    .content-section ul li+li {
      border-top: 1px solid var(--border-color);
    }

    .content-section ul svg {
      width: 28px;
      border-radius: 6px;
      margin-right: 16px;
      flex-shrink: 0;
    }

    .products {
      display: flex;
      align-items: center;
      width: 150px;
    }

    @media screen and (max-width: 480px) {
      .products {
        width: 120px;
      }
    }

    .status {
      margin-left: auto;
      width: 140px;
      font-size: 15px;
      position: relative;
    }

    @media screen and (max-width: 700px) {
      .status {
        display: none;
      }
    }

    .status-circle {
      width: 6px;
      height: 6px;
      background-color: #2b2b2b;
      position: absolute;
      border-radius: 50%;
      top: 4px;
      left: -20px;
    }

    .status-button {
      font-size: 15px;
      margin-top: 0;
      padding: 6px 24px;
    }



    @media screen and (max-width: 390px) {
      .status-button {
        padding: 6px 14px;
      }
    }

    .status-button.open {
      background: none;
      color: var(--button-inactive);
      border: 1px solid var(--button-inactive);
    }

    .status-button:not(.open):hover {
      color: #fff;
      border-color: #fff;
    }

    .content-button:not(.open):hover {
      cursor: none;
      background: #939394;
    }

    .menu {
      width: 5px;
      height: 5px;
      background-color: var(--button-inactive);
      border-radius: 50%;
      box-shadow: 7px 0 0 0 var(--button-inactive), 14px 0 0 0 var(--button-inactive);
      margin: 0 12px;
    }

    @media screen and (max-width: 415px) {
      .adobe-product .menu {
        display: none;
      }
    }

    .dropdown {
      position: relative;
      height: 53px;
      width: 40px;
      top: -24px;
      display: flex;
      left: -5px;
      background: transparent;
      border: none;
    }

    .dropdown ul {
      position: absolute;
      background: var(--dropdown-bg);
      height: 110px;
      width: 120px;
      right: 0;
      top: 20px;
      pointer-events: none;
      opacity: 0;
      transform: translatey(10px);
      transition: all 0.4s ease;
    }

    .dropdown ul li a {
      text-decoration: none;
      color: var(--theme-color);
      font-size: 12px;
    }

    .dropdown.is-active ul {
      opacity: 1;
      pointer-events: all;
      transform: translatey(25px);
    }

    .dropdown.is-active ul li:hover {
      background-color: var(--dropdown-hover);
    }

    .button-wrapper {
      display: flex;
      align-items: center;
      justify-content: flex-end;
      width: 187px;
      margin-left: auto;
    }

    @media screen and (max-width: 480px) {
      .button-wrapper {
        width: auto;
      }
    }







    .content-button-wrapper .content-button.status-button.open.close {
      width: auto;
    }

    .content-section .close {
      margin-right: 0;
      width: 24px;
    }

    .checkbox-wrapper {
      display: flex;
      align-items: center;
      font-size: 14px;
      font-weight: 400;
    }

    .checkbox-wrapper+.checkbox-wrapper {
      margin: 20px 0 40px;
    }

    .checkbox {
      display: none;
    }

    .checkbox+label {
      display: flex;
      align-items: center;
    }

    .checkbox+label:before {
      content: "";
      margin-right: 10px;
      width: 15px;
      height: 15px;
      border: 1px solid var(--theme-color);
      border-radius: 4px;
      flex-shrink: 0;
    }

    .checkbox:checked+label:before {
      background-color: #414141;
      border-color: #414141;
      background-image: url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none' stroke='%23fff' stroke-width='3' stroke-linecap='round' stroke-linejoin='round' class='feather feather-check'%3e%3cpath d='M20 6L9 17l-5-5'/%3e%3c/svg%3e");
      background-position: 50%;
      background-size: 12px;
      background-repeat: no-repeat;
    }

    .content-button-wrapper {
      margin-top: auto;
      margin-left: auto;
    }

    .content-button-wrapper .open {
      margin-right: 8px;
    }

    .apps-card {
      display: flex;
      align-items: center;
      flex-wrap: wrap;
      width: calc(100% + 20px);
    }

    .app-card {
      display: flex;
      flex-direction: column;
      width: calc(33.3% - 20px);
      font-size: 16px;
      background-color: var(--content-bg);
      border-radius: 14px;
      border: 1px solid var(--theme-bg-color);
      padding: 20px;
      transition: 0.3s ease;
    }

    .app-card:hover {
      transform: scale(1.02);
      background-color: var(--theme-bg-color);
    }

    .app-card svg {
      width: 28px;
      border-radius: 6px;
      margin-right: 12px;
      flex-shrink: 0;
    }

    .app-card+.app-card {
      margin-left: 20px;
    }

    .app-card span {
      display: flex;
      align-items: center;
    }

    .app-card__subtext {
      font-size: 14px;
      font-weight: 400;
      line-height: 1.6em;
      margin-top: 20px;
      border-bottom: 1px solid var(--border-color);
      padding-bottom: 20px;
    }

    .app-card-buttons {
      display: flex;
      align-items: center;
      margin-left: auto;
      margin-top: 16px;
    }

    @media screen and (max-width: 1110px) {
      .app-card {
        width: calc(50% - 20px);
      }

      .app-card:last-child {
        margin-top: 20px;
        margin-left: 0px;
      }
    }

    @media screen and (max-width: 565px) {
      .app-card {
        width: calc(100% - 20px);
        margin-top: 20px;
      }

      .app-card+.app-card {
        margin-left: 0;
      }
    }

    ::-webkit-scrollbar {
      width: 6px;
      border-radius: 10px;
    }

    ::-webkit-scrollbar-thumb {
      background: var(--scrollbar-bg);
      border-radius: 10px;
    }
  </style>
</head>

<body>
  <div class="cursor cursor--large"></div>
  <div class="cursor cursor--small"></div>
  <!DOCTYPE html>
  <html lang="en">

  <head>
    <meta charset="UTF-8">
    <title>Portfolio - Aviv Shaked</title>
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/js/bootstrap.min.js"
      integrity="sha384-QJHtvGhmr9XOIpI6YVutG+2QOK9T+ZnN4kzFN1RtK3zEFEIsxhlmWl5/YESvpZ13"
      crossorigin="anonymous"></script>
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css"
      integrity="sha384-1BmE4kWBq78iYhFldvKuhfTAU6auU8tT94WrHftjDbrCEXSU1oBoqyl2QvZ6jIW3" crossorigin="anonymous">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/normalize/5.0.0/normalize.min.css">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">

  </head>

  <body>
    <div class="video-bg">
      <video width="1920 " height="1080" autoplay loop muted>
        <source src="https://cdn.discordapp.com/attachments/597497464211243028/1121114690601369670/waves.mp4"
          type="video/mp4">
        Your browser does not support the video tag.
      </video>
    </div>
    <div class="dark-light">
      <svg viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5" fill="none" stroke-linecap="round"
        stroke-linejoin="round">
        <path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z" />
      </svg>
    </div>
    <div class="app">
      <div class="header">
        <div class="menu-circle"></div>
        <div class="header-menu">
          <a class="menu-link is-active" href="#">Portfolio</a>
        </div>
        <div class="header-profile">
          <div class="notification">
            <span class="notification-number">0 </span>
            <svg viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" stroke-width="2" stroke-linecap="round"
              stroke-linejoin="round" class="feather feather-bell">
              <path d="M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9M13.73 21a2 2 0 01-3.46 0" />
            </svg>
          </div>
          <svg viewBox="0 0 512 512" fill="currentColor">
            <path
              d="M448.773 235.551A135.893 135.893 0 00451 211c0-74.443-60.557-135-135-135-47.52 0-91.567 25.313-115.766 65.537-32.666-10.59-66.182-6.049-93.794 12.979-27.612 19.013-44.092 49.116-45.425 82.031C24.716 253.788 0 290.497 0 331c0 7.031 1.703 13.887 3.006 20.537l.015.015C12.719 400.492 56.034 436 106 436h300c57.891 0 106-47.109 106-105 0-40.942-25.053-77.798-63.227-95.449z" />
          </svg>
          <img class="profile-img"
            src="https://media.licdn.com/dms/image/D4E03AQET697eb0jtIQ/profile-displayphoto-shrink_800_800/0/1681474065656?e=1692835200&v=beta&t=qXTMtCKD3VZD0J8ZqFVVo2eSkWAlrHczbsA0qF3dU_o"
            alt="">
        </div>
      </div>
      <div class="wrapper">
        <div class="left-side">
          <div class="side-wrapper">
            <div class="side-menu">
              <a href="#home">
                <svg viewBox="0 0 512 512">
                  <g xmlns="http://www.w3.org/2000/svg" fill="currentColor">
                    <path d="M0 0h128v128H0zm0 0M192 0h128v128H192zm0 0M384 0h128v128H384zm0 0M0 192h128v128H0zm0 0"
                      data-original="#bfc9d1" />
                  </g>
                  <path xmlns="http://www.w3.org/2000/svg" d="M192 192h128v128H192zm0 0" fill="currentColor"
                    data-original="#82b1ff" />
                  <path xmlns="http://www.w3.org/2000/svg"
                    d="M384 192h128v128H384zm0 0M0 384h128v128H0zm0 0M192 384h128v128H192zm0 0M384 384h128v128H384zm0 0"
                    fill="currentColor" data-original="#bfc9d1" />
                </svg>
                HOME
              </a>
              <a href="#what">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-grid"
                  viewBox="0 0 16 16">
                  <path
                    d="M1 2.5A1.5 1.5 0 0 1 2.5 1h3A1.5 1.5 0 0 1 7 2.5v3A1.5 1.5 0 0 1 5.5 7h-3A1.5 1.5 0 0 1 1 5.5v-3zM2.5 2a.5.5 0 0 0-.5.5v3a.5.5 0 0 0 .5.5h3a.5.5 0 0 0 .5-.5v-3a.5.5 0 0 0-.5-.5h-3zm6.5.5A1.5 1.5 0 0 1 10.5 1h3A1.5 1.5 0 0 1 15 2.5v3A1.5 1.5 0 0 1 13.5 7h-3A1.5 1.5 0 0 1 9 5.5v-3zm1.5-.5a.5.5 0 0 0-.5.5v3a.5.5 0 0 0 .5.5h3a.5.5 0 0 0 .5-.5v-3a.5.5 0 0 0-.5-.5h-3zM1 10.5A1.5 1.5 0 0 1 2.5 9h3A1.5 1.5 0 0 1 7 10.5v3A1.5 1.5 0 0 1 5.5 15h-3A1.5 1.5 0 0 1 1 13.5v-3zm1.5-.5a.5.5 0 0 0-.5.5v3a.5.5 0 0 0 .5.5h3a.5.5 0 0 0 .5-.5v-3a.5.5 0 0 0-.5-.5h-3zm6.5.5A1.5 1.5 0 0 1 10.5 9h3a1.5 1.5 0 0 1 1.5 1.5v3a1.5 1.5 0 0 1-1.5 1.5h-3A1.5 1.5 0 0 1 9 13.5v-3zm1.5-.5a.5.5 0 0 0-.5.5v3a.5.5 0 0 0 .5.5h3a.5.5 0 0 0 .5-.5v-3a.5.5 0 0 0-.5-.5h-3z" />
                </svg>
                EXPERTISE
              </a>
            </div>
          </div>
          <div class="side-wrapper">
            <div class="side-title">Categories</div>
            <div class="side-menu">
              <a href="#work">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                  class="bi bi-list-check" viewBox="0 0 16 16">
                  <path fill-rule="evenodd"
                    d="M5 11.5a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1-.5-.5zM3.854 2.146a.5.5 0 0 1 0 .708l-1.5 1.5a.5.5 0 0 1-.708 0l-.5-.5a.5.5 0 1 1 .708-.708L2 3.293l1.146-1.147a.5.5 0 0 1 .708 0zm0 4a.5.5 0 0 1 0 .708l-1.5 1.5a.5.5 0 0 1-.708 0l-.5-.5a.5.5 0 1 1 .708-.708L2 7.293l1.146-1.147a.5.5 0 0 1 .708 0zm0 4a.5.5 0 0 1 0 .708l-1.5 1.5a.5.5 0 0 1-.708 0l-.5-.5a.5.5 0 0 1 .708-.708l.146.147 1.146-1.147a.5.5 0 0 1 .708 0z" />
                </svg>
                Work ( No Record )
              </a>
              <a href="#project">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                  class="bi bi-code-slash" viewBox="0 0 16 16">
                  <path
                    d="M10.478 1.647a.5.5 0 1 0-.956-.294l-4 13a.5.5 0 0 0 .956.294l4-13zM4.854 4.146a.5.5 0 0 1 0 .708L1.707 8l3.147 3.146a.5.5 0 0 1-.708.708l-3.5-3.5a.5.5 0 0 1 0-.708l3.5-3.5a.5.5 0 0 1 .708 0zm6.292 0a.5.5 0 0 0 0 .708L14.293 8l-3.147 3.146a.5.5 0 0 0 .708.708l3.5-3.5a.5.5 0 0 0 0-.708l-3.5-3.5a.5.5 0 0 0-.708 0z" />
                </svg>
                Projects
              </a>
              <a href="#about">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                  class="bi bi-flag-fill" viewBox="0 0 16 16">
                  <path
                    d="M14.778.085A.5.5 0 0 1 15 .5V8a.5.5 0 0 1-.314.464L14.5 8l.186.464-.003.001-.006.003-.023.009a12.435 12.435 0 0 1-.397.15c-.264.095-.631.223-1.047.35-.816.252-1.879.523-2.71.523-.847 0-1.548-.28-2.158-.525l-.028-.01C7.68 8.71 7.14 8.5 6.5 8.5c-.7 0-1.638.23-2.437.477A19.626 19.626 0 0 0 3 9.342V15.5a.5.5 0 0 1-1 0V.5a.5.5 0 0 1 1 0v.282c.226-.079.496-.17.79-.26C4.606.272 5.67 0 6.5 0c.84 0 1.524.277 2.121.519l.043.018C9.286.788 9.828 1 10.5 1c.7 0 1.638-.23 2.437-.477a19.587 19.587 0 0 0 1.349-.476l.019-.007.004-.002h.001" />
                </svg>
                About
              </a>
            </div>
          </div>
          <div class="side-wrapper">
            <div class="side-title">Social Links</div>
            <div class="side-menu">
              <a target="_blank" href="https://www.linkedin.com/in/aviv-shaked-59a4b7271/">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                  class="bi bi-linkedin" viewBox="0 0 16 16">
                  <path
                    d="M0 1.146C0 .513.526 0 1.175 0h13.65C15.474 0 16 .513 16 1.146v13.708c0 .633-.526 1.146-1.175 1.146H1.175C.526 16 0 15.487 0 14.854V1.146zm4.943 12.248V6.169H2.542v7.225h2.401zm-1.2-8.212c.837 0 1.358-.554 1.358-1.248-.015-.709-.52-1.248-1.342-1.248-.822 0-1.359.54-1.359 1.248 0 .694.521 1.248 1.327 1.248h.016zm4.908 8.212V9.359c0-.216.016-.432.08-.586.173-.431.568-.878 1.232-.878.869 0 1.216.662 1.216 1.634v3.865h2.401V9.25c0-2.22-1.184-3.252-2.764-3.252-1.274 0-1.845.7-2.165 1.193v.025h-.016a5.54 5.54 0 0 1 .016-.025V6.169h-2.4c.03.678 0 7.225 0 7.225h2.4z" />
                </svg>
                LinkedIn
              </a>
              <a target="_blank" href="https://github.com/Patcholie">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-github"
                  viewBox="0 0 16 16">
                  <path
                    d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.012 8.012 0 0 0 16 8c0-4.42-3.58-8-8-8z" />
                </svg>
                Github
              </a>
              <a target="_blank" href="https://www.instagram.com/_avivshaked_/">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                  class="bi bi-instagram" viewBox="0 0 16 16">
                  <path
                    d="M8 0C5.829 0 5.556.01 4.703.048 3.85.088 3.269.222 2.76.42a3.917 3.917 0 0 0-1.417.923A3.927 3.927 0 0 0 .42 2.76C.222 3.268.087 3.85.048 4.7.01 5.555 0 5.827 0 8.001c0 2.172.01 2.444.048 3.297.04.852.174 1.433.372 1.942.205.526.478.972.923 1.417.444.445.89.719 1.416.923.51.198 1.09.333 1.942.372C5.555 15.99 5.827 16 8 16s2.444-.01 3.298-.048c.851-.04 1.434-.174 1.943-.372a3.916 3.916 0 0 0 1.416-.923c.445-.445.718-.891.923-1.417.197-.509.332-1.09.372-1.942C15.99 10.445 16 10.173 16 8s-.01-2.445-.048-3.299c-.04-.851-.175-1.433-.372-1.941a3.926 3.926 0 0 0-.923-1.417A3.911 3.911 0 0 0 13.24.42c-.51-.198-1.092-.333-1.943-.372C10.443.01 10.172 0 7.998 0h.003zm-.717 1.442h.718c2.136 0 2.389.007 3.232.046.78.035 1.204.166 1.486.275.373.145.64.319.92.599.28.28.453.546.598.92.11.281.24.705.275 1.485.039.843.047 1.096.047 3.231s-.008 2.389-.047 3.232c-.035.78-.166 1.203-.275 1.485a2.47 2.47 0 0 1-.599.919c-.28.28-.546.453-.92.598-.28.11-.704.24-1.485.276-.843.038-1.096.047-3.232.047s-2.39-.009-3.233-.047c-.78-.036-1.203-.166-1.485-.276a2.478 2.478 0 0 1-.92-.598 2.48 2.48 0 0 1-.6-.92c-.109-.281-.24-.705-.275-1.485-.038-.843-.046-1.096-.046-3.233 0-2.136.008-2.388.046-3.231.036-.78.166-1.204.276-1.486.145-.373.319-.64.599-.92.28-.28.546-.453.92-.598.282-.11.705-.24 1.485-.276.738-.034 1.024-.044 2.515-.045v.002zm4.988 1.328a.96.96 0 1 0 0 1.92.96.96 0 0 0 0-1.92zm-4.27 1.122a4.109 4.109 0 1 0 0 8.217 4.109 4.109 0 0 0 0-8.217zm0 1.441a2.667 2.667 0 1 1 0 5.334 2.667 2.667 0 0 1 0-5.334z" />
                </svg>
                Instagram
              </a>
            </div>
          </div>
        </div>
        <div class="main-container">
          <div class="content-wrapper">
            <div id="home" class="content-wrapper-header">
              <div class="content-wrapper-context">
                <h1>
                  Aviv Shaked
                </h1>
                <div class="content-text"> Based in Haifa, Israel, I have a deep love for programming and thrive in
                  team-based environments. With ample free time available, I'm eager to explore and master new
                  programming languages.
                </div>
                <a target="_blank" href="https://example.com/work-in-progress"><button class="content-button">Show
                    Resume</button></a>
              </div>
              <svg xmlns="http://www.w3.org/2000/svg" width="256" height="256" fill="currentColor" class="bi bi-code" viewBox="0 0 16 16"> <path d="M5.854 4.854a.5.5 0 1 0-.708-.708l-3.5 3.5a.5.5 0 0 0 0 .708l3.5 3.5a.5.5 0 0 0 .708-.708L2.707 8l3.147-3.146zm4.292 0a.5.5 0 0 1 .708-.708l3.5 3.5a.5.5 0 0 1 0 .708l-3.5 3.5a.5.5 0 0 1-.708-.708L13.293 8l-3.147-3.146z"/> </svg>
            </div>
            <div id="what" class="content-section">
              <div class="content-section-title">Subjects I am well-versed in</div>
              <ul>
                <li class="adobe-product">
                  <div class="products">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
                      <path
                        d="M439.8 200.5c-7.7-30.9-22.3-54.2-53.4-54.2h-40.1v47.4c0 36.8-31.2 67.8-66.8 67.8H172.7c-29.2 0-53.4 25-53.4 54.3v101.8c0 29 25.2 46 53.4 54.3 33.8 9.9 66.3 11.7 106.8 0 26.9-7.8 53.4-23.5 53.4-54.3v-40.7H226.2v-13.6h160.2c31.1 0 42.6-21.7 53.4-54.2 11.2-33.5 10.7-65.7 0-108.6zM286.2 404c11.1 0 20.1 9.1 20.1 20.3 0 11.3-9 20.4-20.1 20.4-11 0-20.1-9.2-20.1-20.4.1-11.3 9.1-20.3 20.1-20.3zM167.8 248.1h106.8c29.7 0 53.4-24.5 53.4-54.3V91.9c0-29-24.4-50.7-53.4-55.6-35.8-5.9-74.7-5.6-106.8.1-45.2 8-53.4 24.7-53.4 55.6v40.7h106.9v13.6h-147c-31.1 0-58.3 18.7-66.8 54.2-9.8 40.7-10.2 66.1 0 108.6 7.6 31.6 25.7 54.2 56.8 54.2H101v-48.8c0-35.3 30.5-66.4 66.8-66.4zm-6.7-142.6c-11.1 0-20.1-9.1-20.1-20.3.1-11.3 9-20.4 20.1-20.4 11 0 20.1 9.2 20.1 20.4s-9 20.3-20.1 20.3z" />
                    </svg>
                    Backend Development (JavaScript/Python)
                  </div>
                  <div class="button-wrapper">
                    <a href="https://github.com/Patcholie/Analisis/blob/Backend" target="_blank"><button
                        class="content-button status-button open">Analisis AI</button></a>
                  </div>
                </li>
                <li class="adobe-product">
                  <div class="products">
                    <svg role="img" viewBox="-100 -100 1150 1150" xmlns="http://www.w3.org/2000/svg">
                      <title>Analisis Web</title>
                      <path
                        d="M1.3 6.2c.4 3.5 18 201.6 39.3 440.3 21.2 238.7 38.7 434.1 38.8 434.2s79.2 22.5 175.8 49.7L430.9 980l176.8-49.5c97.2-27.3 176.8-49.7 176.9-49.8s17.6-195.5 38.8-434.2C844.7 207.8 862.3 9.7 862.7 6.2l.6-6.2H.7l.6 6.2zm701.1 178c-.4 3.9-9.4 101-9.4 102.3 0 .3-93 .5-206.6.5H279.9l.6 5.2c.7 6.7 8.5 101.3 8.5 103.9 0 1.9 2.6 1.9 197.5 1.9h197.4l-.5 4.7c-.3 2.7-7.2 77.6-15.4 166.6-8.1 89-14.9 161.9-15.1 162.1S604.6 744.9 546 761s-108.2 29.8-110.4 30.5c-3.7 1.3-7.3.4-114.5-29.2-60.8-16.8-111-30.9-111.4-31.2-.7-.7-13.7-158.9-13.7-166.8V561h107v2.7c.2 6 7.6 82.3 8.2 82.8.3.3 27.4 7.8 60.1 16.7l59.6 16.1 58.8-15.8c32.3-8.7 59.5-16.1 60.3-16.6 1.3-.6 2.7-12.9 7.9-66.6 3.4-36.2 6.5-67.5 6.8-69.6l.6-3.7H377.6c-103.2 0-187.6-.3-187.6-.6 0-1.2-27.9-319.1-28.4-322.7l-.4-3.7H703l-.6 4.2z" />
                    </svg>
                    Web Design.
                  </div>
                  <div class="button-wrapper">
                    <a href="https://github.com/Patcholie/Analisis/blob/Frontend" target="_blank"> <button
                        class="content-button status-button open">Analisis Web</button></a>

                  </div>
                </li>
                <li class="adobe-product">
                  <div class="products">
                    <svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <title>Marketing/Sales</title>
                      <path
                        d="M8.12 1.744.015 10.009 0 10.023l11.986 12.219.014.015 11.986-12.22.014-.014-8.115-8.273-.006-.006Zm1.207 1.02h5.326L11.99 5.41zm3.422 3.43 3.027-3.053L22.081 9.5h-6.054ZM8.211 3.14l3.04 3.072L7.999 9.5h-6.08Zm.62 6.977L12 6.876l3.169 3.242L12 19.842zm7.328.402h5.862l-8.793 9.005Zm-14.24 0h5.915l2.958 9.006Z" />
                    </svg>
                    Marketing/Sales
                  </div>
                  <div class="button-wrapper">
                    <a href="https://www.fiverr.com/aquamarined/teach-you-basic-to-intermediate-level-python-programming"
                      target="_blank"> <button class="content-button status-button open">Basic Example</button></a>
                  </div>
                </li>
              </ul>
            </div>

            <div id="project" class="content-section">
              <div class="content-section-title">Some of my projects</div>
              <div class="apps-card">
                <div class="app-card">
                  <span>
                    Analisis ( Latest Project )
                  </span>
                  <div class="app-card__subtext">A cutting-edge website specifically designed to assist individuals in
                    recognizing and treating a wide range of wounds. Whether you're dealing with a basic scratch or a
                    pesky splinter, severe burns, allergies, or even more complex injuries, our advanced AI-powered
                    platform is here to provide you with accurate diagnoses and effective treatment suggestions.
                  </div>
                  <div class="app-card-buttons">
                    <a href="https://github.com/Patcholie/Analisis" target="_blank"> <button
                        class="content-button status-button">Open</button></a>
                  </div>
                </div>
                <div class="app-card">
                  <span>
                    Auto Slides (First Project)
                  </span>
                  <div class="app-card__subtext">An interface which creates automatic presentations using OpenAI,
                    Dall-E, Unsplash and other API. I am currenly not working on this project, because of Analisis</div>
                  <div class="app-card-buttons">
                    <a href="https://github.com/Patcholie/Auto-Slides" target="_blank"><button
                        class="content-button status-button">Open</button></a>
                  </div>
                </div>
                <div class="app-card">
                  <span>
                    Eyes Class ( Challenge )
                  </span>
                  <div class="app-card__subtext">A very basic project which was done in 24 hours, It is an OCR system
                    using API's and Fine tuning.</div>
                  <div class="app-card-buttons">
                    <a href="https://github.com/Patcholie/Eyes-Class" target="_blank"> <button
                        class="content-button status-button">Open</button></a>
                  </div>
                </div>
              </div>
            </div>
            <div id="about" class="content-section">
              <div class="content-section-title">About</div>
              <div class="apps-card">
                <div id="home" class="content-wrapp-header">
                  <div class="content-wrapper-context">
                      <img src="https://avatars.githubusercontent.com/u/116463487?v=4"
                        style="max-width: 48px; border-radius: 2px; margin-right: 10px;">
                      Patchol ( Aviv Shaked )
                      <div class="content-tt">I'm Aviv Shaked, a 16-year-old from Israel, and I'm excitedly on the
                        lookout
                        for a job opportunity. Learning is my passion, and coding is my absolute favorite. I'm actively
                        involved in a couple of prestigious programs like INTEL AI4Y, which is a world competition, and
                        UNISTREAM. I've also applied for Magshimim, an incredible program that teaches AI programming
                        and is offered by the army.
                        I've been honing my programming skills through various courses and experiences, always eager to
                        expand my knowledge. Harvard Public Speaking and Google Advertising are among the courses I've
                        completed, allowing me to excel not just in coding, but also in effective communication and
                        creative marketing strategies.
                        While programming is my main focus, I have a genuine interest in advertising, suggesting fresh
                        ideas, and organizing things to perfection. Problem-solving is something I truly enjoy.
                        If you need more information or would like to connect, feel free to reach out. I'd be delighted
                        to chat and share more about myself. Looking forward to hearing from you!
                      </div>
                  </div>
                </div>


              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    </div>
    <div class="overlay-app"></div>
    </div>
    </div>
    </div>
    </div>
    <div class="overlay-app"></div>
    </div>



    </div>
    </div>
    </div>
    <div class="overlay-app"></div>
    </div>
    </div>
    </div>
    </div>
    <div class="overlay-app"></div>
    </div>
  </body>

  </html>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.9.1/gsap.min.js"></script>
  <script>

    const { gsap } = window;
    const cursorOuter = document.querySelector(".cursor--large");
    const cursorInner = document.querySelector(".cursor--small");
    let isStuck = false;
    let mouse = {
      x: -100,
      y: -100,
    };

    // Just in case you need to scroll
    let scrollHeight = 0;
    window.addEventListener('scroll', function (e) {
      scrollHeight = window.scrollY
    })

    let cursorOuterOriginalState = {
      width: cursorOuter.getBoundingClientRect().width,
      height: cursorOuter.getBoundingClientRect().height,
    };

    document.body.addEventListener("pointermove", updateCursorPosition);
    document.body.addEventListener("pointerdown", () => {
      gsap.to(cursorInner, 0.15, {
        scale: 2,
      });
    });
    document.body.addEventListener("pointerup", () => {
      gsap.to(cursorInner, 0.15, {
        scale: 1,
      });
    });

    function updateCursorPosition(e) {
      mouse.x = e.pageX;
      mouse.y = e.pageY;
    }

    function updateCursor() {
      gsap.set(cursorInner, {
        x: mouse.x,
        y: mouse.y,
      });

      if (!isStuck) {
        gsap.to(cursorOuter, {
          duration: 0.15,
          x: mouse.x - cursorOuterOriginalState.width / 2,
          y: mouse.y - cursorOuterOriginalState.height / 2,
        });
      }

      requestAnimationFrame(updateCursor);
    }

    updateCursor();

    function handleMouseEnter(e) {
      isStuck = true;
      const targetBox = e.currentTarget.getBoundingClientRect();
      gsap.to(cursorOuter, 0.2, {
        x: targetBox.left,
        y: targetBox.top + scrollHeight,
        width: targetBox.width,
        height: targetBox.width,
        borderRadius: 0,
        backgroundColor: "rgba(255, 255, 255, 0.1)",
      });
    }

    function handleMouseLeave(e) {
      isStuck = false;
      gsap.to(cursorOuter, 0.2, {
        width: cursorOuterOriginalState.width,
        height: cursorOuterOriginalState.width,
        borderRadius: "50%",
        backgroundColor: "transparent",
      });
    }

    const toggleButton = document.querySelector('.dark-light');

    toggleButton.addEventListener('click', () => {
      document.body.classList.toggle('light-mode');
    });


  </script>
</body>

</html>

