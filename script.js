const hamBurger = document.querySelector(".toggle-btn");
const sidebar = document.querySelector("#sidebar");
const sidebarDropdownItems = document.querySelectorAll('.sidebar-dropdown');
const mainLinks = document.querySelectorAll('.sidebar-link-name');
const subLinks = document.querySelectorAll('.sidebar-link');

// Toggle sidebar expansion
hamBurger.addEventListener("click", function (e) {
  // Prevent the body click event from closing the sidebar when the hamburger button is clicked
  e.stopPropagation();

  sidebar.classList.toggle("expand");
  sidebarDropdownItems.forEach(item => item.classList.add('hide'));

  // Toggle visibility of sidebar links based on the sidebar state
  if (sidebar.classList.contains('expand')) {
    sidebar.classList.remove('hidden-links'); // Show links when expanded
    localStorage.setItem('sidebar-expanded', 'true');
  } else {
    sidebar.classList.add('hidden-links'); // Hide links when collapsed
    localStorage.setItem('sidebar-expanded', 'false');
  }
});

// Close sidebar if the body is clicked
document.body.addEventListener('click', function () {
  if (sidebar.classList.contains('expand')) {
    sidebar.classList.remove('expand');
    sidebar.classList.add('hidden-links'); // Hide links when collapsing
    localStorage.setItem('sidebar-expanded', 'false');
  }
});

// Prevent closing the sidebar if the click is inside the sidebar
sidebar.addEventListener('click', function (e) {
  e.stopPropagation();
});

// Activate main links and expand dropdowns
function activateMainLink(mainLink) {
  mainLink.classList.add('active');
  const parentUl = mainLink.getAttribute('data-bs-target');
  const collapseElement = document.querySelector(parentUl);
  if (collapseElement) {
    collapseElement.classList.add('show'); // Expand dropdown
    collapseElement.classList.remove('hide');
    sidebar.classList.add('expand'); // Expand sidebar
  }
}

document.addEventListener('DOMContentLoaded', function () {
  const mainLinks = document.querySelectorAll('.sidebar-link-name');
  
  mainLinks.forEach(link => {
    // Add click event listener to toggle dropdown
    link.addEventListener('click', function (e) {
      e.preventDefault(); // Prevent default behavior

      // Toggle 'collapsed' class on the clicked link (for the arrow icon effect)
      link.classList.toggle('collapsed');
      
      // Get the target dropdown element
      const target = link.getAttribute('data-bs-target');
      const collapseElement = document.querySelector(target);

      // Toggle visibility of the dropdown
      if (collapseElement) {
        collapseElement.classList.toggle('show'); // Toggle visibility
        collapseElement.classList.toggle('hide'); // Toggle hide class
      }

      // Collapse other dropdowns when one is opened
      mainLinks.forEach(otherLink => {
        if (otherLink !== link) {
          const otherTarget = otherLink.getAttribute('data-bs-target');
          const otherCollapseElement = document.querySelector(otherTarget);
          if (otherCollapseElement) {
            otherCollapseElement.classList.remove('show');
            otherCollapseElement.classList.add('hide');
            otherLink.classList.add('collapsed');
          }
        }
      });
    });
  });
});



// Handle active state and sidebar expansion
document.addEventListener('DOMContentLoaded', function () {
  const currentHTMLPage = window.location.href;

  // Reset all active states and check sub-links for activation
  mainLinks.forEach(link => link.classList.remove('active'));
  subLinks.forEach(link => link.classList.remove('active'));

  // Check sub-links for activation
  let activatedMainLink = false;
  subLinks.forEach(subLink => {
    if (currentHTMLPage.includes(subLink.getAttribute('href'))) {
      const mainLink = subLink.closest('ul').previousElementSibling;
      if (mainLink && mainLink.classList.contains('sidebar-link-name')) {
        activateMainLink(mainLink);
        activatedMainLink = true;
      }
    }

    subLink.addEventListener('click', function () {
      // Collapse sidebar and store state before navigating
      if (sidebar.classList.contains('expand')) {
        sidebar.classList.remove('expand');
        localStorage.setItem('sidebar-expanded', 'false');
        sidebar.classList.add('hidden-links'); // Hide links when collapsing
      }

      const mainLink = subLink.closest('ul').previousElementSibling;
      if (mainLink && mainLink.classList.contains('sidebar-link-name')) {
        mainLink.classList.add('active');
      }
    });
  });

  // Check main links if no sub-links were activated
  if (!activatedMainLink) {
    mainLinks.forEach(link => {
      if (currentHTMLPage.includes(link.getAttribute('href'))) {
        activateMainLink(link);
      }
    });
  }

  // Main link click event
  mainLinks.forEach(link => {
    link.addEventListener('click', function () {
      // Remove active class from all links
      mainLinks.forEach(l => l.classList.remove('active'));
      subLinks.forEach(l => l.classList.remove('active'));

      // Add active class to both sidebar-link-name and sidebar-link
      link.classList.add('active');
      const subLink = link.nextElementSibling;
      if (subLink && subLink.classList.contains('sidebar-link')) {
        subLink.classList.add('active');
      }

      if (link.classList.contains('has-dropdown')) {
        activateMainLink(link);
      } else {
        link.classList.add('active');
      }
    });
  });

  // Restore sidebar state from localStorage
  if (localStorage.getItem('sidebar-expanded') === 'true') {
    sidebar.classList.add('expand');
    sidebar.classList.remove('hidden-links'); // Ensure links are visible if expanded
  } else {
    sidebar.classList.remove('expand');
    sidebar.classList.add('hidden-links'); // Hide links if collapsed
  }
});
