window.onload = function () {
  // defin globel variables
  const sections = document.querySelectorAll('section');
  const fragment = document.createDocumentFragment();
  const menuBtn = document.querySelector('#menu-btn');
  const linksList = document.querySelector('#links-list');
  const goUpBtn = document.querySelector('#go-up');

  // build navigation elements dynamicaly
  function createNavList () {
    for (let i = 0 ; i < sections.length ; i++){
      const listElement = document.createElement('li');
      const sectionId = sections[i].getAttribute('id');
      const sectionName = sections[i].getAttribute('data-name');
      listElement.innerHTML = `<a class ="nav-link" data-id="${sectionId}">${sectionName}</a>`;
      fragment.appendChild(listElement);
    }
    linksList.appendChild(fragment);
  }

  createNavList ();

  // after buliding navigation elements group them in an array
  const navItemsList = Array.from(document.querySelectorAll('.nav-link'));
  // add event listener for every nav list anchor that scroll to corresponding section
  navItemsList.forEach((item, i) => {
    item.addEventListener('click',function(e) {
      const id = item.getAttribute('data-id');
      const section = document.getElementById(id);
      const offset = section.offsetTop;
      window.scroll(0,(offset - 56));  // -56 for nav height
    })
  });

  // hide/show scroll to top button on scroll Y less than 100
  function hideGoUpBtn() {
    if (window.scrollY >= 100) {
      goUpBtn.style.display = "block";
    } else {
      goUpBtn.style.display = "none";
    }
  }

  // set active nav link anchor that corresponding active section
  function isActiveLink(section) {
    const activeSectionId = section.getAttribute('id');
    const links = Array.from(document.querySelectorAll('.nav-link'));
    links.forEach((link) => {
      if (link.getAttribute('data-id') === activeSectionId) {
        link.classList.add('active-link');
      } else {
        link.classList.remove('active-link');
      }
    });
  }

  // scroll window event listerner
  window.addEventListener("scroll", event => {
    hideGoUpBtn();
    // set active section class on window scroll
    let topScroll = window.scrollY + 300; //position where section set or reset active section class
    sections.forEach(section => {
      // checking which section is in viewport
      if (section.offsetTop <= topScroll && section.offsetTop + section.offsetHeight > topScroll) {
        section.classList.add("active"); //set active section
        isActiveLink(section);
      } else {
        section.classList.remove("active"); // reset active sections
      }
    });
  });

  // make home section active by default when page fist load
  document.getElementById('home').classList.add('active');
  const homeLink = document.querySelector('.nav-link');
  homeLink.classList.add('active-link');


  // change menu icone when show or hide nav list on mobile screens
  function changeIcone() {
    if (menuBtn.classList.contains('fa-bars')){
      menuBtn.className = 'fas fa-times';
    } else {
      menuBtn.className = 'fas fa-bars';
    }
  }

  // show or hide nav list menu on mobile screens
  function showHideNavList() {
    {
      linksList.classList.toggle('showed');
      changeIcone();
    }
  }

  // add active link class for active link
  const navLinks = document.querySelectorAll('.nav-link');
  navLinks.forEach((link) => {
    link.addEventListener('click',(e)=>{
      showHideNavList();
      navLinks.forEach((link) =>{
          link.classList.remove('active-link');
      });
      link.classList.add('active-link');
    });
  });

  // event listener to show/hide nav list on clicking menu button
  menuBtn.addEventListener('click',showHideNavList);
  // scroll to top on clicking goUpBtn
  goUpBtn.addEventListener('click',() => {
    window.scroll(0,0);
  });
}