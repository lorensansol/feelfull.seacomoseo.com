const d = document
// AÑADIR CLASE LOADED A BODY TRAS UN INSTANTE
setTimeout(() => d.body.classList.add('loaded'), 500)

// SCROLL BEHAVIOR SMOOTH EN NAVEGADORES INCOMPATIBLES (SAFARI) IMPORTANDO smoothscroll.min.js
if (!('scrollBehavior' in d.documentElement.style)) {
  function smoothScroll () {
    const anchorOffset = 48
    const links = d.querySelectorAll("[href^='#']")
    links.forEach(link => {
      link.addEventListener('click', click => {
        click.preventDefault()
        const target = d.querySelector(link.getAttribute('href'))
        target.scrollIntoView({ behavior: 'smooth' })
        // target.setAttribute("tabindex", "-1");
        // target.focus();
      })
    })
  }
  function loadScript (url, callback) {
    const s = d.createElement('script')
    s.onload = callback
    s.src = url
    d.querySelector('head').appendChild(s)
  }
  loadScript('js/smoothscroll.min.js', smoothScroll)
}

// FUNCIÓN SCROLL-SHOT
function scrollShot (windowMarginTop, windowMarginBottom, selectorCSS, doAfterPre, doBefore = () => undefined, doAfterPost = 0) {
  const callbackScroll = (entries, observer) =>
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        doAfterPre(entry.target)
        if (!doAfterPost) {
          observer.unobserve(entry.target)
        }
      } else if (doAfterPost) {
        doAfterPost(entry.target)
      }
    })
  const observerScroll = new IntersectionObserver(callbackScroll, {
    rootMargin: windowMarginTop + ' 0px ' + windowMarginBottom + ' 0px'
  })
  d.querySelectorAll(selectorCSS).forEach(nodo => {
    observerScroll.observe(nodo)
    doBefore(nodo)
  })
}

// MENÚ Y BOTÓN SUBIR CON SCROLL
function menuCambio () {
  d.querySelector('nav').classList.toggle('bg-white')
  d.querySelector('nav button').classList.toggle('cerrar')
  d.querySelector('#menu').classList.toggle('oculto')
  d.querySelectorAll('nav .btn-transparent').forEach(x => x.classList.toggle('btn-white'))
}
function menuCel () {
  if (window.innerWidth < 1024) {
    menuCambio()
  }
}
function menuScroll () {
  if (window.innerWidth < 1024) {
    d.querySelector('nav button').classList.toggle('btn-transparent')
  } else {
    menuCambio()
  }
}
function btnTop () {
  d.querySelector('.top').classList.toggle('oculto')
}
scrollShot(
  '-48px',
  '0px',
  'header',
  () => { menuScroll(); btnTop() },
  () => { if (scrollY <= d.querySelector('header').scrollHeight - 48) { menuScroll(); btnTop() } },
  () => { menuScroll(); btnTop() }
)

// APARECER CON SCROLL
scrollShot(
  '-10%',
  '-10%',
  '[data-aparecer]',
  nodo => nodo.classList.remove('aparecer'),
  nodo => nodo.classList.add('aparecer')
)

// LAZY-LOAD DATA-SRC
scrollShot(
  '0px',
  '0px',
  '[data-src]',
  nodo => {
    nodo.src = nodo.dataset.src
    //    nodo.srcset = nodo.dataset.srcset;
    //    nodo.sizes = nodo.dataset.sizes;
    nodo.classList.remove('lazyload')
  },
  nodo => {
    nodo.classList.add('lazyload')
    const width = nodo.getAttribute('width')
    const height = nodo.getAttribute('height')
    nodo.setAttribute('src', "data:image/svg+xml,%3csvg%20width='" + width + "'%20height='" + height + "'%20viewBox='0%200%2016%2016'%20xmlns='http://www.w3.org/2000/svg'%3e%3ccircle%20fill='none'%20stroke='gray'%20stroke-width='1'%20stroke-miterlimit='10'%20cx='8'%20cy='8'%20r='7.5'/%3e%3cpolyline%20fill='none'%20stroke='gray'%20stroke-width='1'%20stroke-linecap='round'%20stroke-linejoin='round'%20stroke-miterlimit='10'%20points='8,3 8,8 10,10'/%3e%3c/svg%3e")
  }
)

// LAZY-LOAD DATA-STYLE
scrollShot(
  '0px',
  '160px',
  '[data-style]',
  nodo => nodo.style = nodo.dataset.style
)

// QUITAR - AÑADIR CLASE OCULTO
function mostrar (id) {
  const nodo = d.getElementById(id).classList
  nodo.toggle('oculto')
  nodo.remove('entrada')
}

// CAMBIAR TEXTO BOTÓN
function cambiar (nodo, original, cambio) {
  nodo.style = 'display:block;animation:chicle 1s'
  setTimeout(x => {
    if (nodo.innerHTML == cambio) {
      nodo.innerHTML = original
    } else {
      nodo.innerHTML = cambio
    }
  }, 300)
  setTimeout(x => {
    nodo.removeAttribute('style')
  }, 1000)
}

// TEMA OSCURO
let contadorThemeDark = 0
function themeDark () {
  if (contadorThemeDark == 0) {
    d.querySelector('head').insertAdjacentHTML('beforeend', '<link rel="stylesheet" href="theme-dark.css">')
  }
  d.body.classList.toggle('theme-dark')
  contadorThemeDark++
}

// VALIDAR FORMULARIO
function validar () {
  if (!d.querySelector("input[name='consiento']").checked) {
    alert('¡Debes marcar la casilla de consentimiento! ✔')
    return false
  }
  if (!d.querySelector("input[name='nombre']").value) {
    alert('¡Debes indicar un nombre! ✍️ Para saber a quién referirme... ¡Qué menos! 🤷')
    return false
  }
  if (!d.querySelector("input[name='email']").value) {
    alert('¡Debes indicar un eMail! ✍️ Si no, ¿Cómo podré responderte? 🤷')
    return false
  }
  if (!d.querySelector("textarea[name='mensaje']").value) {
    alert('¡Debes añadir un texto al mensaje! ✍️ Si no, ¿Para qué envías un formulario? 🤷')
    return false
  }
  return true
}

// COOKIES MENSAJE
localStorage.controlcookie > 0 && cookiesms.classList.add('oculto'), cookiesms.classList.remove('entrada')
function aceptarCookies () {
  localStorage.controlcookie = localStorage.controlcookie || 0, localStorage.controlcookie++, cookiesms.classList.toggle('oculto')
}

// COOKIES CONFIGURAR
let contadorConfigurarCookies = 0
function configurarCookies () {
  if (contadorConfigurarCookies == 0) {
    const popupConfigurarCookies = `
      <div id="configurar-cookies" class="popup oculto">
      <article class="text-justify bg-white rounded p-2 m-auto my-0">
        <span class="cerrar" onclick="mostrar('configurar-cookies')">×</span>
        <h2 class="text-center">Configuración de Cookies</h2>
        <p>Una cookie o galleta informática es un pequeño archivo de información que se guarda en tu ordenador, “smartphone” o tableta cada vez que visitas nuestra página web. Algunas cookies son nuestras y otras pertenecen a empresas externas que prestan servicios para nuestra página web.</p>
        <p>Las cookies pueden ser de varios tipos: las cookies técnicas son necesarias para que nuestra página web pueda funcionar y no necesitan de tu autorización.</p>
        <p>El resto de cookies sirven para mejorar nuestra página, para personalizarla en base a tus preferencias, o para poder mostrarte publicidad ajustada a tus búsquedas, gustos e intereses personales. Todas ellas las tenemos activadas por defecto, pero puedes desactivarlas a continuación.</p>
        <p><strong>Toma el control y disfruta de una navegación personalizada en nuestra página, con un paso tan sencillo y rápido como la marcación de las casillas que tú quieras</strong>.</p>
        <p>Si quieres más información, consulta la <span onclick="window.open('https://seacomoseo.com/legal#cookies','_blank')">política de cookies</span> de nuestra página web.</p>
        <button class="btn-2 mt-2" onclick="mostrar('cookies-tecnicas')">✚ Técnicas Necesarias</button>
        <div id="cookies-tecnicas" class="oculto">
        <p><strong>Para que nuestra página web pueda funcionar.</strong></p>
          <p>Las cookies técnicas son estrictamente necesarias para que nuestra página web funcione y puedas navegar por la misma. Este tipo de cookies son las que, por ejemplo, nos permiten identificarte, darte acceso a determinadas partes restringidas de la página si fuese necesario, o recordar diferentes opciones o servicios ya seleccionados por ti, como tus preferencias de privacidad. Por ello, <strong>están activadas por defecto, no siendo necesaria tu autorización al respecto</strong>.</p>
          <p>A través de la configuración de tu navegador, puedes bloquear o alertar de la presencia de este tipo de cookies, si bien dicho bloqueo afectará al correcto funcionamiento de las distintas funcionalidades de nuestra página web.</p>
        </div>
        <button class="btn-2 mt-2" onclick="mostrar('cookies-analisis')">✚ De Análisis</button>
        <div id="cookies-analisis" class="oculto">
        <p><strong>Para la mejora continua de nuestra página web.</strong></p>
          <p>Las cookies de análisis nos permiten estudiar la navegación de los usuarios de nuestra página web en general (por ejemplo, qué secciones de la página son las más visitadas, qué servicios se usan más y si funcionan correctamente, etc.).</p>
          <p>A partir de la información estadística sobre la navegación en nuestra página web, podemos mejorar tanto el propio funcionamiento de la página como los distintos servicios que ofrece. Por tanto, estas cookies <strong>no tienen una finalidad publicitaria</strong>, sino que únicamente sirven para que nuestra página web funcione mejor, adaptándose a nuestros usuarios en general. Dejándolas activas contribuirás a dicha mejora continua.</p>
          <p class="m-auto"><label class="check-x"><input name="activar[]" type="checkbox" value="1" checked><span></span></label></p>
        </div>
        <button class="btn-2 mt-2" onclick="mostrar('cookies-funcionalidad')">✚ De Funcionalidad y Personalización</button>
        <div id="cookies-funcionalidad" class="oculto">
        <p><strong>Para mejorar la funcionalidad y personalización de nuestra página web en base a tus preferencias.</strong></p>
          <p>Las cookies de funcionalidad nos permiten recordar tus preferencias, para personalizar a tu medida determinadas características y opciones generales de nuestra página web, cada vez que accedas a la misma (por ejemplo, el idioma en que se te presenta la información, las secciones marcadas como favoritas, tu tipo de navegador, etc.).</p>
          <p>Por tanto, este tipo de cookies <strong>no tienen una finalidad publicitaria</strong>, sino que dejándolas activas mejorarás la funcionalidad de la página web (por ejemplo, adaptándose a tu tipo de navegador) y la personalización de la misma en base a tus preferencias (por ejemplo, presentando la información en el idioma que hayas escogido en anteriores ocasiones), lo cual contribuirá a la facilidad, usabilidad y comodidad de nuestra página durante tu navegación.</p>
          <p class="m-auto"><label class="check-x"><input name="activar[]" type="checkbox" value="2" checked><span></span></label></p>
        </div>
        <button class="btn-2 mt-2" onclick="mostrar('cookies-publicidad')">✚ De Publicidad</button>
        <div id="cookies-publicidad" class="oculto">
        <p><strong>Para mejorar la gestión de la publicidad mostrada en nuestra página web, a fin de que sea más útil y diversa, y menos repetitiva.</strong></p>
          <p>Las cookies de publicidad nos permiten la gestión de los espacios publicitarios incluidos en nuestra página web en base a criterios como el contenido mostrado o la frecuencia en la que se muestran los anuncios.</p>
          <p>Así por ejemplo, si se te ha mostrado varias veces un mismo anuncio en nuestra página web, y no has mostrado un interés personal haciendo clic sobre él, este no volverá a aparecer. En resumen, dejándo activas este tipo de cookies, la publicidad mostrada en nuestra página web será más útil y diversa, y menos repetitiva.</p>
          <p class="m-auto"><label class="check-x"><input name="activar[]" type="checkbox" value="3" checked><span></span></label></p>
        </div>
        <button class="btn-2 mt-2" onclick="mostrar('cookies-publicidad-comportamental')">✚ De Publicidad Comportamental</button>
        <div id="cookies-publicidad-comportamental" class="oculto">
        <p><strong>Para mostrarte publicidad ajustada a tus búsquedas, gustos e intereses personales.</strong></p>
          <p>Las cookies de publicidad comportamental nos permiten obtener información basada en la observación de tus hábitos y comportamientos de navegación en la web, a fin de poder mostrarte contenidos publicitarios que se ajusten mejor a tus gustos e intereses personales.</p>
          <p>Para que lo entiendas de manera muy sencilla, te pondremos un ejemplo ficticio: si tus últimas búsquedas en la web estuviesen relacionadas con literatura de suspense, te mostraríamos publicidad sobre libros de suspense.</p>
          <p>Por tanto, dejándo activas este tipo de cookies, la publicidad que te mostremos en nuestra página web no será genérica, sino que estará orientada a tus búsquedas, gustos e intereses, ajustándose por tanto exclusivamente a ti.</p>
          <p class="m-auto"><label class="check-x"><input name="activar[]" type="checkbox" value="4" checked><span></span></label></p>
        </div>
        <button class="mt-2" onclick="guardarPreferenciasCookies();mostrar('configurar-cookies')">◉ Guardar preferencias</button>
      </article>
      </div>
    `
    d.body.insertAdjacentHTML('beforeend', popupConfigurarCookies)
    contadorConfigurarCookies++
    setTimeout(x => mostrar('configurar-cookies'), 1)
  } else {
    mostrar('configurar-cookies')
  }
}
function guardarPreferenciasCookies () {
//  if(cookie-desactivar-analytics){
//    window['ga-disable-UA-2157126-25'] = true;
//  }
}
