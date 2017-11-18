var projects = [];
let about = $('#about');
let skills = $('#skills');
let portfolio = $('#portfolio');
let contact = $('#contact');
let portfolioContainer = $('.portfolio-container');
let portfolioSearch = $('#portfolio-search');
let portfolioExit = $('.portfolio-exit');
let aboutNav = $('#navigation-about');
let skillsNav = $('#navigation-skills');
let portfolioNav = $('#navigation-portfolio');
let contactNav = $('#navigation-contact');
let link = $('.navigation-list-item');

//Search in database
function search(tag) {
  if (tag == 'all') {
    portfolioSearch.html('Moje projekty')
  } else {
    let title = tag.charAt(0).toUpperCase() + tag.slice(1);
    portfolioSearch.html(`Moje projekty: ${title}<span class="portfolio-exit"> ✖</span>`);
  }
  $.ajax({
    dataType: 'json',
    url: 'server.php?find=' + tag,
    success: function success(result) {
      projects = JSON.parse(result).reverse();
      var tags = void 0;
      portfolioContainer.children().remove();
      for (let i in projects) {
        portfolioContainer.append(`
          <article class="portfolio-project">
            <div class="portfolio-image" style='background-image: url("${projects[i].image}")'}></div>
            <header>
              <h1 class="portfolio-name">
                ${projects[i].name}
              </h1>
            </header>
            <section>
              <p class="portfolio-description">
                ${projects[i].description}
              </p>
              <a href=${projects[i].linkgit} target="_blank"><div class="link link-git"></div></a>
              <a href=${projects[i].linklive} target="_blank"><div class="link link-live"></div></a>
            </section>
            <footer id=footer-${projects[i].id}></footer>
          </article>
          `);

        $.ajax({
          url: 'server.php?tags=' + projects[i].id,
          success: function(res) {
            let tags = JSON.parse(res);
            for (let j in tags) {
              $(`#footer-${projects[i].id}`).append(`
                    <p class="portfolio-tag">#${tags[j].tag}</p>
                `)
            }
          }
        });
      }
    }
  });
};
search('all');

//Search tag
portfolio.on('click', '.portfolio-tag', function() {
  search($(this).text().slice(1));
});

portfolio.on('click', '.portfolio-exit', function() {
  search('all');
});


//Navbar links
link.on('click', function () {
  var offset = $('#' + $(this).attr('data')).offset().top;
  $('HTML, BODY').animate({ scrollTop: offset }, 400);
});

//Navbar links style
$(window).scroll(function () {
  var off = $(window).scrollTop();
  var aboutOff = about.offset().top - 10;
  var skillsOff = skills.offset().top - 10;
  var portfolioOff = portfolio.offset().top - 10;

  if (off >= aboutOff && off < skillsOff) {
    link.removeClass('navigation-active');
    aboutNav.addClass('navigation-active');
  } else if (off >= skillsOff && off < portfolioOff) {
    link.removeClass('navigation-active');
    skillsNav.addClass('navigation-active');
  } else if (off >= portfolioOff && off < $(document).height() - window.innerHeight) {
    link.removeClass('navigation-active');
    portfolioNav.addClass('navigation-active');
  } else {
    link.removeClass('navigation-active');
    contactNav.addClass('navigation-active');
  }
});