/* Faculty of Nursing UM — shared nav/footer injector + interactions */
(function(){
  // --- Detect ROOT from the already-resolved CSS link URL. ---
  // Every page includes <link href="…/assets/site.css">. The browser resolves that
  // to an absolute URL, so stripping "assets/site.css" gives us the site base —
  // works whether we're at the domain root (local) or a subpath (GitHub Pages
  // project site like /FacultyOfNursingUM/).
  var cssLink = document.querySelector('link[href*="assets/site.css"]');
  var ROOT = './';
  if (cssLink){
    try {
      var cssPath = new URL(cssLink.href).pathname;
      ROOT = cssPath.replace(/assets\/site\.css.*$/, '');
    } catch(e){}
  }

  var NAV = [
    { label: 'Home', href: ROOT + 'index.html' },
    { label: 'About', href: ROOT + 'about/index.html', children: [
      { label: 'Top Management', href: ROOT + 'about/top-management.html' },
      { label: 'Meet Our Team',  href: ROOT + 'about/meet-our-team.html' },
      { label: 'Vision & Mission', href: ROOT + 'about/vision-mission.html' },
      { label: 'History', href: ROOT + 'about/history.html' }
    ]},
    { label: 'Study', href: ROOT + 'study/index.html', children: [
      { label: 'Undergraduate', href: ROOT + 'study/undergraduate.html' },
      { label: 'Postgraduate',  href: ROOT + 'study/postgraduate.html' }
    ]},
    { label: 'Department', href: ROOT + 'department/index.html', children: [
      { label: 'Medical-Surgical Nursing', href: ROOT + 'department/medical-surgical.html' },
      { label: 'Community & Mental Health Nursing', href: ROOT + 'department/community-mental-health.html' }
    ]},
    { label: 'Others', href: ROOT + 'others/events.html', children: [
      { label: 'Events', href: ROOT + 'others/events.html' },
      { label: 'News',   href: ROOT + 'others/news.html' }
    ]}
  ];

  function isActive(href){
    if (!href || href === '#') return false;
    var here = window.location.pathname.replace(/index\.html$/, '');
    var target = href.replace(/index\.html$/, '');
    if (target === ROOT) return here === ROOT;
    return here.indexOf(target.replace(/\.html$/,'')) === 0;
  }

  function renderNav(){
    var linksHTML = NAV.map(function(item){
      if (item.children){
        var childLinks = item.children.map(function(c){
          return '<a href="'+c.href+'">'+c.label+'</a>';
        }).join('');
        var groupActive = item.children.some(function(c){return isActive(c.href);}) || (item.href !== '#' && isActive(item.href));
        return ''
          + '<div class="nav-group">'
          +   '<a class="top-link '+(groupActive?'active':'')+'" href="'+item.href+'">'+item.label+' <i class="fa-solid fa-chevron-down" style="font-size:10px; margin-left:4px; color:var(--um-gold-2)"></i></a>'
          +   '<div class="nav-menu">'+childLinks+'</div>'
          + '</div>';
      }
      return '<a class="top-link '+(isActive(item.href)?'active':'')+'" href="'+item.href+'">'+item.label+'</a>';
    }).join('');

    var mobileHTML = NAV.map(function(item){
      if (item.children){
        return '<details>'
          + '<summary>'+item.label+'</summary>'
          + (item.href !== '#' ? '<a href="'+item.href+'">Overview</a>' : '')
          + item.children.map(function(c){return '<a href="'+c.href+'">'+c.label+'</a>';}).join('')
          + '</details>';
      }
      return '<a href="'+item.href+'" style="display:block; padding:12px 0; font-weight:600; color:var(--um-blue); border-bottom:1px solid var(--line);">'+item.label+'</a>';
    }).join('');

    return ''
      + '<div class="topstrip">'
      +   '<div class="container" style="display:flex; justify-content:space-between; align-items:center; padding:8px 24px; flex-wrap:wrap; gap:8px;">'
      +     '<div style="display:flex; gap:22px; align-items:center; flex-wrap:wrap;">'
      +       '<span><i class="fa-regular fa-envelope" style="margin-right:6px; color:var(--um-gold-soft)"></i> <a href="mailto:fonadmin@um.edu.my">fonadmin@um.edu.my</a></span>'
      +     '</div>'
      +     '<div style="display:flex; gap:14px; align-items:center;">'
      +       '<a href="https://www.facebook.com/share/15xqKU3GeZ4/?mibextid=wwXIfr" target="_blank" aria-label="Facebook"><i class="fa-brands fa-facebook-f"></i></a>'
      +       '<a href="https://www.instagram.com/fonursingum?utm_source=qr" target="_blank" aria-label="Instagram"><i class="fa-brands fa-instagram"></i></a>'
      +       '<a href="https://vt.tiktok.com/ZSCnw5p7K/" target="_blank" aria-label="TikTok"><i class="fa-brands fa-tiktok"></i></a>'
      +       '<a href="https://www.linkedin.com/in/faculty-of-nursing-um-695563420" target="_blank" aria-label="LinkedIn"><i class="fa-brands fa-linkedin-in"></i></a>'
      +     '</div>'
      +   '</div>'
      + '</div>'
      + '<nav class="mainnav" id="mainnav">'
      +   '<div class="container" style="display:flex; justify-content:space-between; align-items:center; padding:14px 24px; position:relative;">'
      +     '<a href="'+ROOT+'index.html" style="display:flex; align-items:center; gap:14px; text-decoration:none;">'
      +       '<img src="'+ROOT+'assets/logo.jpeg" alt="Faculty of Nursing UM" style="height:64px; width:auto; object-fit:contain;">'
      +       '<div style="line-height:1.1; border-left:2px solid var(--um-gold); padding-left:14px;">'
      +         '<div style="font-family:\'Cormorant Garamond\',serif; font-size:22px; color:var(--um-blue); font-weight:600;">Faculty of Nursing</div>'
      +         '<div style="font-size:11px; letter-spacing:.14em; text-transform:uppercase; color:var(--um-gold-2); font-weight:600;">Universiti Malaya</div>'
      +       '</div>'
      +     '</a>'
      +     '<div class="nav-links">'
      +       linksHTML
      +       '<a href="'+ROOT+'study/index.html" class="btn-gold" style="margin-left:8px;"><i class="fa-solid fa-graduation-cap"></i> Apply Now</a>'
      +     '</div>'
      +     '<button class="mobile-toggle" id="mtoggle" aria-label="Toggle menu"><i class="fa-solid fa-bars"></i></button>'
      +     '<div class="mobile-panel" id="mpanel">' + mobileHTML + '<a href="'+ROOT+'study/index.html" class="btn-gold" style="margin-top:14px; display:inline-flex;">Apply Now</a></div>'
      +   '</div>'
      + '</nav>';
  }

  function renderFooter(){
    return ''
      + '<footer class="footer">'
      +   '<div class="container">'
      +     '<div class="grid">'
      +       '<div>'
      +         '<div class="brand">Faculty of <span>Nursing</span></div>'
      +         '<p style="margin:0 0 14px; line-height:1.7;">Universiti Malaya<br>50603 Kuala Lumpur, Malaysia</p>'
      +         '<p style="color:var(--um-gold-soft); font-style:italic; margin:0; font-family:\'Cormorant Garamond\',serif; font-size:18px;">"Caring today, leading tomorrow."</p>'
      +       '</div>'
      +       '<div>'
      +         '<h5>Explore</h5>'
      +         '<ul style="list-style:none; padding:0; margin:0; display:flex; flex-direction:column; gap:10px;">'
      +           '<li><a href="'+ROOT+'about/index.html">About the Faculty</a></li>'
      +           '<li><a href="'+ROOT+'about/vision-mission.html">Vision &amp; Mission</a></li>'
      +           '<li><a href="'+ROOT+'about/history.html">Our History</a></li>'
      +           '<li><a href="'+ROOT+'about/top-management.html">Leadership</a></li>'
      +         '</ul>'
      +       '</div>'
      +       '<div>'
      +         '<h5>Academic</h5>'
      +         '<ul style="list-style:none; padding:0; margin:0; display:flex; flex-direction:column; gap:10px;">'
      +           '<li><a href="'+ROOT+'study/undergraduate.html">Undergraduate</a></li>'
      +           '<li><a href="'+ROOT+'study/postgraduate.html">Postgraduate</a></li>'
      +           '<li><a href="'+ROOT+'department/index.html">Departments</a></li>'
      +           '<li><a href="'+ROOT+'others/events.html">Events</a></li>'
      +         '</ul>'
      +       '</div>'
      +       '<div>'
      +         '<h5>Connect</h5>'
      +         '<ul style="list-style:none; padding:0; margin:0; display:flex; flex-direction:column; gap:10px;">'
      +           '<li><a href="mailto:fonadmin@um.edu.my">fonadmin@um.edu.my</a></li>'
      +           '<li><a href="https://www.facebook.com/share/15xqKU3GeZ4/?mibextid=wwXIfr" target="_blank">Facebook</a></li>'
      +           '<li><a href="https://www.instagram.com/fonursingum?utm_source=qr" target="_blank">Instagram</a></li>'
      +           '<li><a href="https://www.linkedin.com/in/faculty-of-nursing-um-695563420" target="_blank">LinkedIn</a></li>'
      +         '</ul>'
      +       '</div>'
      +     '</div>'
      +     '<div class="bottom">'
      +       '<span>&copy; 2026 Faculty of Nursing, Universiti Malaya. All rights reserved.</span>'
      +       '<span>Fakulti Kejururawatan • Established 6 March 2026</span>'
      +     '</div>'
      +   '</div>'
      + '</footer>';
  }

  function mount(){
    var navSlot = document.getElementById('site-nav');
    var footSlot = document.getElementById('site-footer');
    if (navSlot) navSlot.innerHTML = renderNav();
    if (footSlot) footSlot.innerHTML = renderFooter();

    // Mobile toggle
    var toggle = document.getElementById('mtoggle');
    var panel = document.getElementById('mpanel');
    if (toggle && panel){
      toggle.addEventListener('click', function(){ panel.classList.toggle('open'); });
    }

    // Safety net: any <a href="#"> should be treated as a no-op so it doesn't
    // scroll to top of page or dirty the URL with a trailing #.
    document.addEventListener('click', function(e){
      var a = e.target.closest && e.target.closest('a');
      if (!a) return;
      var raw = a.getAttribute('href');
      if (raw === '#') e.preventDefault();
    });

    // Sticky-nav shadow
    var mainnav = document.getElementById('mainnav');
    if (mainnav){
      window.addEventListener('scroll', function(){
        if (window.scrollY > 20) mainnav.classList.add('scrolled');
        else mainnav.classList.remove('scrolled');
      });
    }

    // Reveal on scroll
    var els = document.querySelectorAll('.reveal');
    if ('IntersectionObserver' in window){
      var io = new IntersectionObserver(function(entries){
        entries.forEach(function(en){ if (en.isIntersecting){ en.target.classList.add('in'); io.unobserve(en.target); } });
      }, { threshold: 0.12 });
      els.forEach(function(el){ io.observe(el); });
    } else { els.forEach(function(el){ el.classList.add('in'); }); }

    // Carousel (home only)
    var track = document.querySelector('.hero-track');
    if (track){
      var slides = track.children.length;
      var i = 0;
      var dotsWrap = document.querySelector('.hero-dots');
      for (var d=0; d<slides; d++){
        var b = document.createElement('button');
        b.className = 'hero-dot' + (d===0?' active':'');
        b.setAttribute('aria-label','Slide '+(d+1));
        (function(idx){ b.addEventListener('click', function(){ go(idx); }); })(d);
        dotsWrap.appendChild(b);
      }
      function go(n){
        i = (n + slides) % slides;
        track.style.transform = 'translateX(-'+(i*100)+'%)';
        Array.prototype.forEach.call(dotsWrap.children, function(dot, idx){ dot.classList.toggle('active', idx===i); });
      }
      var prev = document.querySelector('.hero-arrow.prev');
      var next = document.querySelector('.hero-arrow.next');
      var INTERVAL_MS = 2000;
      var timer = null;
      function start(){ stop(); timer = setInterval(function(){ go(i+1); }, INTERVAL_MS); }
      function stop(){ if (timer){ clearInterval(timer); timer = null; } }
      function restart(){ start(); }
      if (prev) prev.addEventListener('click', function(){ go(i-1); restart(); });
      if (next) next.addEventListener('click', function(){ go(i+1); restart(); });
      Array.prototype.forEach.call(dotsWrap.children, function(dot){
        dot.addEventListener('click', restart);
      });
      // pause on hover, resume when the pointer leaves
      var hero = track.parentElement;
      hero.addEventListener('mouseenter', stop);
      hero.addEventListener('mouseleave', start);
      // pause when the tab is hidden so we don't drift while backgrounded
      document.addEventListener('visibilitychange', function(){
        if (document.hidden) stop(); else start();
      });
      start();
    }
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', mount);
  else mount();
})();
