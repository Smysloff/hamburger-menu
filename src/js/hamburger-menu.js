/* *** СКРИПТ ДЛЯ АДАПТИВНОГО МЕНЮ ТИПА HAMBURGER

    Для использования скрипта на странице должны быть расположены в одном контейнере и на одном уровне элементы: Hamburger и Menu.

    Hamburger - элемент-иконка, которая присутствует в мобильных разрешениях страницы, и при клике на которую открывается или скрывается элемент Menu. В десктопных разрешениях данный элемент скрыт. При открытом меню на мобильных разрешениях элементу Hamburger присваивается класс '.open', который можно использовать для его стилизации.

    Menu - это элемент, содержащий в себе какое-либо меню сайта. В мобильных разрешениях элемент Menu по умолчанию скрыт. Он открывается по клику на элемент Hamburger, а закрывается - при клике по нему же, по любому месту на экране кроме него самого, при скроле или изменении разрешения экрана. В десктопных разрешениях Menu всегда показывается.

    Пример HTML-разметки:

    <div class="menu-container">
        <div class="hamburger">
            <i class="fas fa-bars"></i>
        </div>
        <div class="menu">
            <nav>
                <ul>
                    <li><a href="/some-link">some link</a></li>
                    <li><a href="/another-link">another link</a></li>
                </ul>
            </nav>
        </div>
    </div>

    Чтобы описанные выше элементы стали интерактивными, их CSS-селекторы необходимо передать конструктору класса HamburgerMenu. Так же стоит передать ширину экрана, разделяющую мобильную и десктопную версии страницы.

    Пример инициализации:

    var menu = new HamburgerMenu({
        breakpoint : 800,
        hamburger  : '.hamburger',
        menu       : '.menu'
    });


    ! ВНИМАНИЕ !

    Имеется возможность создания разом множества экземляров меню. Для этого в разных контейнерах меню необходимо использовать одни и те же CSS-селекторы, например '.hamburger' и '.menu'. Но передавать CSS-селекторы нужно уже классу HamburgerMenus.

    Более того, такой способ создания меню является предпочтительным в подавляющем большинстве случаев, т.к. заранее предполагает масштабирование проекта.

    Поскольку управление поведением элементов строится на использовании класса 'show', то необходиомо прописать соответствующие CSS-стили для элементов. В примере ниже предполагается, что использовались следующие CSS-селекторы: '.hamburger' и '.menu'.


    HTML:

    <div class="menu-container">
        <div class="hamburger">
            <i class="fas fa-bars"></i>
        </div>
        <div class="menu">
            <nav>
                <ul>
                    <li><a href="/some-link">some link</a></li>
                    <li><a href="/another-link">another link</a></li>
                </ul>
            </nav>
        </div>
    </div>

    <div class="another-menu-container">
        <div class="hamburger">
            <i></i><i></i><i></i>
        </div>
        <div class="menu">
            <nav>
                <ul>
                    <li><a href="/yet-some-link">yet some link</a></li>
                    <li><a href="/yet-another-link">yet another link</a></li>
                </ul>
            </nav>
        </div>
    </div>


    CSS:

    .menu{display: none};.menu.show{display:block};
    .hamburger{display:none};.hamburger.show{display:block};
    .hamburger.open{...}


    JS:

    var menus = new HamburgerMenus({
        breakpoint : 768,
        hamburger  : '.hamburger',
        menu       : '.menu'
    });

*** */
"use strict";

class HamburgerMenus {
    constructor(options) {
        const hamburgerMenus = [],
                hamburgers = document.body.querySelectorAll(options.hamburger);
        hamburgers.forEach(function(hamburger, i){
            hamburgerMenus[i] = new HamburgerMenu(options);
        });
        return hamburgerMenus;
    }
}

class HamburgerMenu {
    constructor(options) {

        this.breakPoint = options.breakpoint || 768;
        this.hamburger  = document.body.querySelector(options.hamburger);
        this.menu       = this.hamburger.parentElement.querySelector(options.menu);

        if (!this.menu) {
            console.error('Не найден парный элемент "menu" для элемента "hamburger"');
        }

        this.hamburger.addEventListener('click', () => this.toggle());
        window.addEventListener('click',  e  => this.closeByOuterClick(e));
        window.addEventListener('load',   () => this.toggleByResolution());
        window.addEventListener('resize', () => this.toggleByResolution());
        window.addEventListener('scroll', () => this.toggleByResolution());
    }

    close() {
        this.hamburger.classList.remove('open');
        this.menu.classList.remove('show');
    }

    open() {
        this.hamburger.classList.add('open');
        this.menu.classList.add('show');
    }

    isOpen() {
        return this.menu.classList.contains('show');
    }

    closeByOuterClick(e) {
        if (
            document.documentElement.clientWidth < this.breakPoint &&
            e.target != this.hamburger &&
            e.target.parentElement != this.hamburger &&
            e.target.parentElement.parentElement != this.hamburger &&
            e.target != this.menu &&
            e.target.parentElement != this.menu &&
            e.target.parentElement.parentElement != this.menu &&
            e.target.parentElement.parentElement.parentElement != this.menu &&
            this.isOpen()
        ) {
            this.close();
        }
    }

    toggle() {
        this.isOpen() ? this.close() : this.open();
    }

    toggleByResolution() {
        if (document.documentElement.clientWidth < this.breakPoint) {
            if (this.isOpen()) this.close();
            if (!this.hamburger.classList.contains('show')) this.hamburger.classList.add('show');
        } else {
            if (!this.isOpen()) this.open();
            if (this.hamburger.classList.contains('show')) this.hamburger.classList.remove('show');
        }
    }
}
