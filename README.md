# Hamburger Menu

Скрипт адаптивного меню типа "Hamburger"

## Установка
1. Добавьте в свой javascript-код классы: HamburgerMenu и HamburgerMenus.
2. Добавьте описанные ниже CSS-стили.

## Использование
Для использования скрипта на странице в одном контейнере и на одном уровне должны быть расположены элементы: Hamburger и Menu.

Hamburger - это элемент-иконка, которая присутствует в мобильных разрешениях страницы, и при клике на которую открывается или скрывается элемент Menu. В десктопных разрешениях данный элемент скрыт. При открытом меню на мобильных разрешениях элементу Hamburger присваивается класс '.open', который можно использовать для его стилизации.

Menu - это элемент, содержащий в себе какое-либо меню сайта. В мобильных разрешениях элемент Menu по умолчанию скрыт. Он открывается по клику на элемент Hamburger, а закрывается - при клике по нему же, по любому месту на экране кроме него самого, при скроле или изменении разрешения экрана. В десктопных разрешениях Menu всегда показывается.

Пример HTML-разметки:
```html
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
```
Чтобы описанные выше элементы стали интерактивными, их CSS-селекторы необходимо передать конструктору класса HamburgerMenu. Так же стоит передать ширину экрана, разделяющую мобильную и десктопную версии страницы.

Пример инициализации:
```javascript
var menu = new HamburgerMenu({
    breakpoint : 800,
    hamburger  : '.hamburger',
    menu       : '.menu'
});
```

! ВНИМАНИЕ !

Имеется возможность создания разом множества экземляров меню. Для этого в разных контейнерах меню необходимо использовать одни и те же CSS-селекторы, например '.hamburger' и '.menu'. Но передавать CSS-селекторы нужно уже классу HamburgerMenus.

Более того, такой способ создания меню является предпочтительным в подавляющем большинстве случаев, т.к. заранее предполагает масштабирование проекта.

Поскольку управление поведением элементов строится на использовании класса 'show', то необходиомо прописать соответствующие CSS-стили для элементов. В примере ниже предполагается, что использовались следующие CSS-селекторы: '.hamburger' и '.menu'.


HTML:
```html
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
```

CSS:
```css
.menu{display: none};.menu.show{display:block};
.hamburger{display:none};.hamburger.show{display:block};
.hamburger.open{...}
```

JS:
```javascript
var menus = new HamburgerMenus({
    breakpoint : 768,
    hamburger  : '.hamburger',
    menu       : '.menu'
});
```
## Лицензия
Этот проект находится под защитой лицензии [MIT](https://opensource.org/licenses/mit-license.php).
