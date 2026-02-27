/* -------------------------------------------------
   script.js – affichage dynamique des chapitres
   ------------------------------------------------- */
document.addEventListener('DOMContentLoaded', () => {

    const chapters = document.querySelectorAll('.chapter');
    const select   = document.getElementById('chapterDropdown');

    /* ---------- 1️⃣  Remplir le <select> ----------
       (on récupère le texte du <h1> de chaque chapitre) */
    chapters.forEach(chap => {
        const title = chap.querySelector('h1').textContent.trim();
        const opt   = document.createElement('option');
        opt.value   = chap.id;          // ex. "chap_0"
        opt.textContent = title;
        select.appendChild(opt);
    });

    /* ---------- 2️⃣  Fonction centrale ----------
       masque tout, montre le chapitre demandé, remet le scroll à 0 */
    function showChapter(id) {
        chapters.forEach(c => c.classList.remove('active'));
        const target = document.getElementById(id);
        if (target) {
            target.classList.add('active');
            document.querySelector('.content').scrollTop = 0;
        }
    }

    /* ---------- 3️⃣  Clic sur les items du menu ----------
       chaque bouton possède data-target="chap_X" */
    document.querySelectorAll('.nav__link').forEach(btn => {
        btn.addEventListener('click', () => {
            const id = btn.dataset.target;
            showChapter(id);
            select.value = id;               // synchroniser le dropdown
        });
    });

    /* ---------- 4️⃣  Gestion du <select> ----------
       (pour les utilisateurs qui préfèrent le menu déroulant) */
    select.addEventListener('change', () => {
        if (select.value) showChapter(select.value);
    });

    /* Export (au cas où vous voudriez appeler showChapter()
       depuis le HTML directement) */
    window.showChapter = showChapter;
});
