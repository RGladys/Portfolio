'use strict';

var projects = [];
var about = $('#about');
var skills = $('#skills');
var portfolio = $('#portfolio');
var contact = $('#contact');
var portfolioContainer = $('.portfolio-container');
var portfolioSearch = $('#portfolio-search');
var portfolioExit = $('.portfolio-exit');
var aboutNav = $('#navigation-about');
var skillsNav = $('#navigation-skills');
var portfolioNav = $('#navigation-portfolio');
var contactNav = $('#navigation-contact');
var link = $('.navigation-list-item');

//Search in database
function search(tag) {
  if (tag == 'all') {
    portfolioSearch.html('Moje projekty');
  } else {
    var title = tag.charAt(0).toUpperCase() + tag.slice(1);
    portfolioSearch.html('Moje projekty: ' + title + '<span class="portfolio-exit"> \u2716</span>');
  }
  $.ajax({
    url: 'server.php?find=' + tag,
    success: function success(result) {
      projects = JSON.parse(result).reverse();
      var tags = void 0;
      portfolioContainer.children().remove();

      var _loop = function _loop(i) {
        portfolioContainer.append('\n          <article class="portfolio-project">\n            <div class="portfolio-image" style=\'background-image: url("' + projects[i].image + '")\'}></div>\n            <header>\n              <h1 class="portfolio-name">\n                ' + projects[i].name + '\n              </h1>\n            </header>\n            <section>\n              <p class="portfolio-description">\n                ' + projects[i].description + '\n              </p>\n              <a href=' + projects[i].linkgit + ' target="_blank"><div class="link link-git"></div></a>\n              <a href=' + projects[i].linklive + ' target="_blank"><div class="link link-live"></div></a>\n            </section>\n            <footer id=footer-' + projects[i].id + '></footer>\n          </article>\n          ');

        $.ajax({
          url: 'server.php?tags=' + projects[i].id,
          success: function success(res) {
            var tags = JSON.parse(res);
            for (var j in tags) {
              $('#footer-' + projects[i].id).append('\n                    <p class="portfolio-tag">#' + tags[j].tag + '</p>\n                ');
            }
          }
        });
      };

      for (var i in projects) {
        _loop(i);
      }
    }
  });
};
search('all');

//Search tag
portfolio.on('click', '.portfolio-tag', function () {
  search($(this).text().slice(1));
});

portfolio.on('click', '.portfolio-exit', function () {
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