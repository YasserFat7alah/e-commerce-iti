// Show custom IAAM loader
export function showLoader() {
  let loader = document.getElementById("app-loader");

  if (!loader) {
    loader = document.createElement("div");
    loader.id = "app-loader";
    loader.innerHTML = `
      <div class="loader-container">
        <div class="loader-logo"><img src="/assets/images/logo/circle-bg-orange-lg.png" width="100" height="auto" alt="AYAAM Logo"></div>
        <div class="loader">
          <div class="dot"></div>
          <div class="dot"></div>
          <div class="dot"></div>
        </div>
        <div class="loading-text">
          Please wait, <span>AYAAM</span> is loading...
        </div>
        <div class="loading-subtext">
          Empowering sellers & shoppers.
        </div>
      </div>
    `;
    loader.style.cssText = `
      position: fixed; inset: 0;
      display: none; align-items: center; justify-content: center;
      background: linear-gradient(135deg, #fff7f0, #ffffff);
      z-index: 9999;
      transition: opacity 0.3s ease;
    `;
    document.body.appendChild(loader);

    // Inject styles once
    const style = document.createElement("style");
    style.innerHTML = `
      :root {
        --brand: #f97316;
        --text: #222;
      }
      #app-loader .loader-container {
        text-align: center;
        animation: fadeIn 0.6s ease-in-out;
        font-family: 'Roboto'
        color: var(--text);
      }
      #app-loader .loader-logo {
        font-size: 3rem;
        margin-bottom: 5rem;
        color: var(--brand);
        animation: pulse 1.5s infinite;
      }
      #app-loader .loader {
        display: flex;
        justify-content: center;
        align-items: center;
        margin-bottom: 1.5rem;
      }
      #app-loader .dot {
        width: 18px; height: 18px;
        margin: 0 6px;
        background: var(--brand);
        border-radius: 50%;
        animation: bounce 0.6s infinite alternate;
      }
      #app-loader .dot:nth-child(2) { animation-delay: 0.2s; }
      #app-loader .dot:nth-child(3) { animation-delay: 0.4s; }

      #app-loader .loading-text {
        font-size: 1.2rem;
        font-weight: 600;
        letter-spacing: 1px;
        margin-bottom: 0.5rem;
      }
      #app-loader .loading-text span {
        color: var(--brand);
      }
      #app-loader .loading-subtext {
        font-size: 0.9rem;
        color: #666;
        font-style: italic;
      }

      @keyframes fadeIn {
        from { opacity: 0; transform: translateY(20px); }
        to { opacity: 1; transform: translateY(0); }
      }
      @keyframes pulse {
        0% { transform: scale(1); opacity: 0.8; }
        50% { transform: scale(1.15); opacity: 1; }
        100% { transform: scale(1); opacity: 0.8; }
      }
      @keyframes bounce {
        from { transform: translateY(0); opacity: 0.6; }
        to { transform: translateY(-18px); opacity: 1; }
      }
    `;
    document.head.appendChild(style);
  }

  // Fade in loader
  loader.style.display = "flex";
  requestAnimationFrame(() => {
    loader.style.opacity = "1";
  });
}

// Hide custom loader
export function hideLoader(_time = 500) {
  const loader = document.getElementById("app-loader");
  if (loader) {

    
    window.setTimeout(() => {
      loader.style.opacity = "0";
    }, _time);
    window.setTimeout(() => {
      loader.style.display = "none";
      loader.remove()
    }, _time+300);

    
  }
}