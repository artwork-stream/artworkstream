
// FAB Toggle
document.getElementById('fabMenuToggle')?.addEventListener('click', () => {
  document.getElementById('menuToggle')?.click();
});
document.getElementById('fabSettingsToggle')?.addEventListener('click', () => {
  document.getElementById('settingsToggle')?.click();
});
document.getElementById('fabMusicToggle')?.addEventListener('click', () => {
  document.getElementById('musicToggle')?.click();
});

const fabMain = document.getElementById('fabMain');
const fabSub = document.getElementById('fabSub');

fabMain.addEventListener('click', (e) => {
  e.stopPropagation();
  fabSub.classList.toggle('hidden');
});

document.addEventListener('click', (e) => {
  if (!fabSub.contains(e.target) && !fabMain.contains(e.target)) {
    fabSub.classList.add('hidden');
  }
});

// Menu Toggle & Section Switch
const menuPanel = document.getElementById('menuPanel');
const menuBtns = document.querySelectorAll('.menu-btn');
const sections = document.querySelectorAll('.home-section, .about-section, .shop-section, .business-section, .services-section, .contact-section');

menuToggle.addEventListener('click', (e) => {
  e.stopPropagation();
  menuPanel.classList.toggle('hidden');
});

menuBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    const target = btn.getAttribute('data-target');
    sections.forEach(sec => sec.classList.add('hidden'));
    document.querySelector(target)?.classList.remove('hidden');
    menuPanel.classList.add('hidden');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
});

document.addEventListener('click', (e) => {
  if (!menuPanel.contains(e.target) && !menuToggle.contains(e.target)) {
    menuPanel.classList.add('hidden');
  }
});

// Product Carousel, Category Filter & Cart
let allItems = [];
let currentCategory = 'clothes';
let currentIndex = 0;

const productScroll = document.getElementById('productScroll');
const buttons = document.querySelectorAll('.shop-categories button');
const cartList = document.getElementById('cart-list');
const emptyCartMsg = document.getElementById('empty-cart');
const cartTotal = document.getElementById('cart-total');
const whatsappLink = document.getElementById('whatsapp-link');
const clearCartBtn = document.getElementById('clear-cart');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');

function renderProducts(data) {
  productScroll.innerHTML = '';
  data.forEach(product => {
    const div = document.createElement('div');
    div.className = 'product-item';
    div.dataset.category = product.category;
    div.innerHTML = `
      <img src="${product.image}" alt="${product.name}">
      <h3>${product.name}</h3>
      <p>IDR ${product.price.toLocaleString('id-ID')}</p>
      <a href="#" class="order-btn neumorphic add-to-cart-btn">Add to Cart</a>
    `;
    productScroll.appendChild(div);
  });

  allItems = Array.from(document.querySelectorAll('.product-item'));
  setupAddToCartButtons();
  showCurrentItem();
}

function showCurrentItem() {
  const filtered = allItems.filter(item => item.dataset.category === currentCategory);
  allItems.forEach(item => item.style.display = 'none');
  if (filtered[currentIndex]) filtered[currentIndex].style.display = 'flex';

  prevBtn.disabled = currentIndex === 0;
  nextBtn.disabled = currentIndex >= filtered.length - 1;
}

function searchItems() {
  const input = document.getElementById('searchInput').value.toLowerCase();
  allItems.forEach(item => {
    const name = item.querySelector('h3').textContent.toLowerCase();
    item.style.display = name.includes(input) ? 'flex' : 'none';
  });
}

function setupAddToCartButtons() {
  document.querySelectorAll('.add-to-cart-btn').forEach(btn => {
    btn.addEventListener('click', e => {
      e.preventDefault();
      const product = btn.closest('.product-item');
      const name = product.querySelector('h3').textContent;
      const price = parseInt(product.querySelector('p').textContent.replace(/\D/g, ''));

      const li = document.createElement('li');
      li.setAttribute('data-name', name);
      li.setAttribute('data-price', price);
      li.innerHTML = `${name} - IDR ${price.toLocaleString('id-ID')} <button class="remove-btn neumorphic">Cancel</button>`;

      li.querySelector('.remove-btn').addEventListener('click', () => {
        li.remove();
        updateCart();
      });

      cartList.appendChild(li);
      updateCart();
    });
  });
}

function updateCart() {
  const cartItems = cartList.querySelectorAll('li');
  let total = 0;
  const orderText = [];

  cartItems.forEach(item => {
    const name = item.getAttribute('data-name');
    const price = parseInt(item.getAttribute('data-price'));
    total += price;
    orderText.push(`- ${name} (IDR ${price.toLocaleString('id-ID')})`);
  });

  cartTotal.textContent = `Total : IDR ${total.toLocaleString('id-ID')}`;
  emptyCartMsg.style.display = cartItems.length ? 'none' : 'block';

  if (cartItems.length > 0) {
    const message = encodeURIComponent(`Halo, saya ingin memesan:\n\n${orderText.join('\n')}\n\nTotal : IDR ${total.toLocaleString('id-ID')}`);
    whatsappLink.href = `https://wa.me/+15555555555?text=${message}`;
  } else {
    whatsappLink.href = '#';
  }
}

buttons.forEach(btn => {
  btn.addEventListener('click', () => {
    currentCategory = btn.dataset.category;
    currentIndex = 0;
    showCurrentItem();
  });
});

prevBtn.addEventListener('click', () => {
  if (currentIndex > 0) {
    currentIndex--;
    showCurrentItem();
  }
});

nextBtn.addEventListener('click', () => {
  const filtered = allItems.filter(item => item.dataset.category === currentCategory);
  if (currentIndex < filtered.length - 1) {
    currentIndex++;
    showCurrentItem();
  }
});

clearCartBtn.addEventListener('click', () => {
  cartList.innerHTML = '';
  updateCart();
});

document.getElementById('searchInput').addEventListener('input', searchItems);

// Load JSON data
fetch('library/products.json')
  .then(res => res.json())
  .then(data => renderProducts(data));

  // Music Player
  const musicToggle = document.getElementById('musicToggle');
  const musicSection = document.getElementById('musicSection');

  musicToggle.addEventListener('click', (e) => {
    e.stopPropagation();
    musicSection.style.display = musicSection.style.display === 'block' ? 'none' : 'block';
  });

  document.addEventListener('click', (e) => {
    if (!musicSection.contains(e.target) && !musicToggle.contains(e.target)) {
      musicSection.style.display = 'none';
    }
  });

  const songs = [
  {
    title: "AW's - Chill Vibes",
    src: "audio/music-01.mp3"
  },
  {
    title: "AW's - Night Drive",
    src: "audio/music-02.mp3"
  },
  {
    title: "AW's - Mood Swing",
    src: "audio/music-03.mp3"
  }
]; 

  let currentSongIndex = 0;

  const audio = new Audio();
  const playBtn = document.getElementById("btnPlayPause");
  const iconPlay = document.getElementById("iconPlay");
  const iconPause = document.getElementById("iconPause");
  const btnPrev = document.getElementById("btnPrev");
  const btnNext = document.getElementById("btnNext");
  const songTitle = document.getElementById("songTitle");
  const progress = document.getElementById("progress");
  const progressContainer = document.getElementById("progressContainer");
  const currentTimeEl = document.getElementById("currentTime");
  const durationEl = document.getElementById("duration");

  function loadSong(index) {
    const song = songs[index];
    audio.src = song.src;
    songTitle.textContent = song.title;
    audio.load();
  }

  function togglePlayPause() {
    if (audio.paused) {
      audio.play();
      iconPlay.style.display = "none";
      iconPause.style.display = "inline";
    } else {
      audio.pause();
      iconPlay.style.display = "inline";
      iconPause.style.display = "none";
    }
  }

  function prevSong() {
    currentSongIndex = (currentSongIndex - 1 + songs.length) % songs.length;
    loadSong(currentSongIndex);
    audio.play();
    togglePlayPauseIcons(true);
  }

  function nextSong() {
    currentSongIndex = (currentSongIndex + 1) % songs.length;
    loadSong(currentSongIndex);
    audio.play();
    togglePlayPauseIcons(true);
  }

  function togglePlayPauseIcons(isPlaying) {
    iconPlay.style.display = isPlaying ? "none" : "inline";
    iconPause.style.display = isPlaying ? "inline" : "none";
  }

  audio.addEventListener("timeupdate", () => {
    const { currentTime, duration } = audio;
    const progressPercent = (currentTime / duration) * 100;
    progress.style.width = `${progressPercent}%`;

    currentTimeEl.textContent = formatTime(currentTime);
    durationEl.textContent = formatTime(duration);
  });

  progressContainer.addEventListener("click", (e) => {
    const width = progressContainer.clientWidth;
    const clickX = e.offsetX;
    const duration = audio.duration;

    audio.currentTime = (clickX / width) * duration;
  });

  function formatTime(time) {
    if (isNaN(time)) return "00:00";
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes < 10 ? "0" + minutes : minutes}:${seconds < 10 ? "0" + seconds : seconds}`;
  }

  audio.addEventListener("ended", nextSong);

  loadSong(currentSongIndex);

  playBtn.addEventListener("click", togglePlayPause);
  btnPrev.addEventListener("click", prevSong);
  btnNext.addEventListener("click", nextSong);

  // Settings Panel Toggle
  const settingsToggle = document.getElementById("settingsToggle");
  const settingsPanel = document.getElementById("settingsPanel");

  settingsToggle.addEventListener("click", (e) => {
    e.stopPropagation();
    settingsPanel.classList.toggle("hidden");
  });

  document.addEventListener("click", (e) => {
    if (!settingsPanel.contains(e.target) && !settingsToggle.contains(e.target)) {
      settingsPanel.classList.add("hidden");
    }
  });

  // Theme Selector
  const themeSelector = document.getElementById("themeSelector");
  themeSelector.addEventListener("change", () => {
    const theme = themeSelector.value;
    document.body.classList.remove("dark", "light");
    document.body.classList.add(theme);
  });

  // Font Selector
  const fontSelector = document.getElementById("fontSelector");
  fontSelector.addEventListener("change", () => {
    const font = fontSelector.value;
    document.documentElement.style.setProperty("--font-main", font);
  });

  // Color Swatch
  document.querySelectorAll('.color-swatch').forEach(swatch => {
    swatch.addEventListener('click', () => {
      const colorClass = swatch.getAttribute("data-color");
      const colorValue = getComputedStyle(document.documentElement).getPropertyValue(`--${colorClass}`);
      document.documentElement.style.setProperty("--theme-color", colorValue.trim());

      document.querySelectorAll('.color-swatch').forEach(s => s.classList.remove('active'));
      swatch.classList.add('active');
    });
  });

  // Neumorphic Press Effect
  document.querySelectorAll('.neumorphic').forEach(el => {
    el.addEventListener('mousedown', () => el.classList.add('pressed'));
    el.addEventListener('mouseup', () => el.classList.remove('pressed'));
    el.addEventListener('mouseleave', () => el.classList.remove('pressed'));
  });

  // Preloader
  document.addEventListener("DOMContentLoaded", () => {
    const delay = 1000; 
    document.body.classList.add("no-scroll");

    setTimeout(() => {
      document.body.classList.remove("no-scroll");
      document.body.classList.add("loaded");
      window.scrollTo(0, 0);
    }, delay);
  });

  // Typed.js
  if (typeof Typed !== 'undefined') {
    new Typed("#typed", {
      strings: ["Tech Explorer", "Digital Enthusiast", "Creative Development"],
      typeSpeed: 60,
      backSpeed: 40,
      backDelay: 1500,
      loop: true,
    });
  }

  // Tab Switching
  document.addEventListener('DOMContentLoaded', () => {
    const tabItems = document.querySelectorAll('.tab-item');
    const tabContents = document.querySelectorAll('.tab-content');

    tabItems.forEach(item => {
      item.addEventListener('click', () => {
        const target = document.querySelector(item.dataset.target);

        tabItems.forEach(i => i.classList.remove('active'));
        tabContents.forEach(tc => tc.classList.remove('active'));

        item.classList.add('active');
        target.classList.add('active');
      });
    });
  });

  // Contact Form Submission
  const form = document.getElementById("contactForm");
  if (form) {
    form.addEventListener("submit", function(e) {
      e.preventDefault();

      const nama = document.getElementById("name").value;
      const email = document.getElementById("email").value;
      const subjek = document.getElementById("subject").value;
      const pesan = document.getElementById("message").value;

      alert(`Thank you, ${nama}!\nYour message has been sent.\n\nEmail : ${email}\nSubject : ${subjek}\nMessage : ${pesan}`);

      form.reset();
    });
  }
  
  document.querySelector('.typed-text').setAttribute('translate', 'no');
  document.querySelector('footer').setAttribute('translate', 'no');
        
  // Disable right-click, text select and copy
  document.addEventListener("contextmenu", e => e.preventDefault());
  document.addEventListener("selectstart", e => e.preventDefault());
  document.addEventListener("copy", e => e.preventDefault());