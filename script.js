//................................ dashboard side bar toggle start .......................
document.addEventListener('DOMContentLoaded', () => {
  const hamBurgers = document.querySelectorAll('.toggle-btn');
  const sidebar = document.querySelector('#sidebar');
  const sidebarNav = document.querySelector('.sidebar-nav');
  const links = document.querySelectorAll('.sidebar-link-name, .sidebar-link');

const toggleSidebar = (state) => {
  sidebar.classList.toggle('expand', state);
  sessionStorage.setItem('sidebar-state', state ? 'expanded' : 'collapsed');
};
toggleSidebar(sessionStorage.getItem('sidebar-state') === 'expanded');


hamBurgers.forEach((hamBurger) => {
  hamBurger.addEventListener('click', (e) => {
    e.stopPropagation();
    toggleSidebar(!sidebar.classList.contains('expand'));
  });
});


document.body.addEventListener('click', function (event) {
if (window.innerWidth >= 992 && !sidebar.contains(event.target) && !sidebarToggle.contains(event.target)) {
    toggleSidebar(false);
}
});

sidebar.addEventListener('click', (e) => e.stopPropagation());

const currentURL = new URL(window.location.href);

links.forEach((link) => {
  link.addEventListener('click', (e) => {
    e.stopPropagation();
    const parentItem = link.closest('.sidebar-item');
    const hasDropdown = parentItem?.querySelector('.sidebar-dropdown');
    if (link.classList.contains('sidebar-link-name') && hasDropdown) {
      toggleSidebar(true);
    } else {
      toggleSidebar(false);
    }
    links.forEach((l) => l.classList.remove('active'));
    (parentItem?.querySelector('.sidebar-link-name') || link).classList.add('active');
  });

  const href = link.getAttribute('href');
  if (href && (currentURL.pathname === href || currentURL.href.includes(href))) {
      const parentLink = link.closest('.sidebar-item')?.querySelector('.sidebar-link-name');
      (parentLink || link).classList.add('active');
  }
});

sidebarNav.scrollTop = +sessionStorage.getItem('sidebar-scroll-position') || 0;
sidebarNav.addEventListener('scroll', () =>
  sessionStorage.setItem('sidebar-scroll-position', sidebarNav.scrollTop)
);
});
//................................ dashboard side bar toggle end .......................


//................................ sidebar toggle phone size start .......................
const sidebarToggle = document.querySelector("#sidebar-toggle");
const sidebar = document.querySelector("#sidebar");

sidebarToggle.addEventListener("click", function () {
  sidebar.classList.toggle("active");

});
//............................... sidebar toggle phone size  end .......................
