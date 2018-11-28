var firstLoad = true;
var ignoreClick = false;
var currentPage = 'home';
var tvPage = $('#commercials');
var aboutPage = $('#about-section');
var gallery = $('.gallery');
var shouldGetAds = true;


$("#mainContent").on("click", function() { 
  if(gallery.is(":visible")){
    gallery.flickity('playPlayer'); 
  }
});

$('body').bind('keyup', function(e) {
  var code = e.keyCode || e.which;
  if(code == 37 || code == 39) {
    gallery.flickity('playPlayer'); 
  }
});

$('body').bind('touchend', function(e) {
  if(gallery.is(":visible")){
    gallery.flickity('playPlayer'); 
  }
});

setUp('home','72157681248857616');


$(document).on('click', '.nav-item', function() {
  var elem = document.getElementById(this.id);
  var id = elem.id;

  switch(id){
    case 'home': setUp(id,"72157681248857616"); break;
    case 'portrait': setUp(id,"72157681248748016"); break;
    case 'children': setUp(id,"72157681237985246"); break;
    case 'location': setUp(id,"72157681346879345"); break;
    case 'events': setUp(id,"72157681244392066"); break;
    case 'macro': setUp(id,"72157681238710886"); break;
    case 'nature': setUp(id,"72157681248660906"); break;
    case 'corporate': setUp(id,"72157677949388593"); break;
    case 'fashion': setUp(id,"72157677949555753"); break;
    case 'wire': setUp(id,"72157681242651086"); break;
    case 'tv': setupTv(id); break;
    case 'about':setupAbout(id); break;
  }

});

function setUp(id,flickrId) {
  if(ignoreClick || (currentPage === id && !firstLoad)) {
    return;
  }

  if (currentPage === 'tv') {
    tvPage.hide();
  }

  if (currentPage === 'about') {
    aboutPage.hide();
  };

  $('#main').show();

  ignoreClick = true;
  currentPage = id;

  if (!firstLoad) {
    gallery.show();
    destroyFlickity();
  }
  $('#loading').show();

  $('.arrow').show();
  firstLoad = false;

  setupPageText(id);
  getFlickrFeed(flickrId);
}

function getFlickrFeed(id) {
  var settings = {
    "async": true,
    "crossDomain": true,
    "url": "https://api.flickr.com/services/rest/?method=flickr.photosets.getPhotos&api_key=d596bb973ad1c8e06236b4394b75c8dd&photoset_id="+id+"&user_id=147605372%40N07&format=json&nojsoncallback=1",
    "method": "GET",
    "headers": {}
  }

  ajax = $.ajax(settings).done(function (data) {

    $.each( data.photoset.photo, function( i, item ) {
      var farmId = item.farm;
      var serverId = item.server;
      var id = item.id;
      var secret = item.secret;

      gallery.append('<div class="gallery-cell"><img src="https://farm' + farmId + '.staticflickr.com/' + serverId + '/' + id + '_' + secret + '_b.jpg"/></div>');
    });

    gallery.flickity(getFlickitySettings());
    waitForImagesToLoad();
  });

  gallery.on( "focusout", function (){
    if(gallery.is(":visible")){
      gallery.flickity('playPlayer'); 
    }
  });

  $('body').click(function() {
    gallery.focus();
  });
}

function destroyFlickity() {
  gallery.hide();
  gallery.flickity('destroy');
  gallery.empty();
}

function setupPageText(id) {
 $('#loadingPercentage').text("Loading...");
 $('.nav-item img').css("outline", "none");
 $("#" + id + " img").css("outline","3px solid #DBBC37");

 if($(".nav-item img").is(":visible") == false ) {  
   $('.nav-item').css("border", "none");
   $("#" + id).css("border","3px solid #DBBC37");    
 }

 $('#page').html(getPageTitle(id));
 $('.main').text(getPageInfo(id));
}

function getPageTitle(id) {
  var pageText = [];  
  pageText["home"] ='<span class="capital text-gold">H</span>ome';
  pageText["portrait"] ='<span class="capital text-gold">P</span>ortraits';
  pageText["children"] ='<span class="capital text-gold">C</span>hildren';
  pageText["location"] ='<span class="capital text-gold">L</span>ocation';
  pageText["events"] ='<span class="capital text-gold">E</span>vents';
  pageText["macro"] ='<span class="capital text-gold">M</span>acro';
  pageText["nature"] ='<span class="capital text-gold">N</span>ature';
  pageText["corporate"] ='<span class="capital text-gold">C</span>orporate';
  pageText["fashion"] ='<span class="capital text-gold">F</span>ashion';
  pageText["wire"] ='<span class="capital text-gold">W</span>ire';
  pageText["tv"] ='<span class="capital text-gold">TV</span> Commercials';
  pageText["about"] ='<span class="capital text-gold">A</span>bout';
  return pageText[id];
}

function getPageInfo(id) {
  var pageText = [];  
  pageText["home"] = "A good photo is one that makes you look - and then look again. I like them to be beautiful as well. I'm known mainly as a TV Commercials Film Director, but Photography has always been a passion of mine - and I do take commissions.";
  pageText["portrait"] = "I absolutely love doing portraits - I like to see the best in everybody - Some say I have a tendancy to flatter my sitters - but then wouldn’t most sitters want that from their portrait photographer?";
  pageText["children"] = "Children can be wonderful portrait subjects - losing their attention can be a problem - but its precisely at those times they often come up with an expression or pose you’d never have thought of.";
  pageText["location"] = "Locations are all about finding the best angle and waiting for the best light - Oh yes, and always bring your tripod!";
  pageText["events"] = "Events, and in particular, weddings are all about capturing the moment - nearly every moment in fact - and without getting in the way - such a terrific responsibility.";
  pageText["macro"] = "Macro is probably my favourite area of photography - it can be painstaking and fiddly and there’s never really enough light - but the results are nearly always revelatory.";
  pageText["nature"] = "Nature is nearly always beautiful - the task is to take photos that do it justice - dedication is the most important ingredient in the nature photographer’s skill set.";
  pageText["corporate"] = "Taking photos for business clients - in other words, ‘proper work’.";
  pageText["fashion"] = "Fashion and Photography are two words that definitely belong together. Personally I spend a lot more time pointing movie cameras at models than stills cameras but its an area I would like to deveolp further.";
  pageText["wire"] = "Wire Sculpture is like drawing in three dimensions - In each of these examples I have deliberately used just one continuous (but lengthy) piece of wire to delineate my subject.";
  pageText["tv"] = "When I’m not taking photographs I’m a TV Commercials Film Director - Here are some examples of my recent work. For more information go to my company website ";
  pageText["about"] = "If you’re interested in potentially hiring my services please contact me directly and I will be happy to discuss any projects, rates and timings.";
  return pageText[id];
}

function setupTv(id) { 
  if (currentPage === 'tv' || ignoreClick)
    return;

  $('#main').hide();

  if (currentPage === 'about' ) {
    aboutPage.hide();
  } else {
    destroyFlickity();
  }

  firstLoad = true;
  ignoreClick = false;
  currentPage = id;
  var videos ='';

  $('.arrow').hide();
  setupPageText(id);

  $('.main').append("<a href='http://www.adontv.co.uk' target='_blank'>http://adontv.co.uk</a>");
  if(shouldGetAds){
    getFeaturedAd();
    getAds();
    shouldGetAds=false;
  }

  tvPage.show();
}

$(document).on('click', '.load-ad', function () {
  var video = videos[this.id];

  var uri = video.uri;
  uri = uri.replace("/videos/", "");

  var newLink = 'https://player.vimeo.com/video/' + uri;
  $('iframe').attr('src', newLink);
  document.getElementById("videoTitle").innerHTML = video.name;   
});

function getFeaturedAd(){ 
  $.ajax({
    url:'https://api.vimeo.com/users/juliankronfli/albums/5061857/videos?sort=manual&per_page=1', 
    method: 'GET',
    dataType: 'json',
    beforeSend: function(xhr){
      xhr.setRequestHeader("Authorization", "Bearer 9e5c7589cd5807010eb00472fee4c0fd");
    },
    success: function(data){
      setupFeatureAd(data.data[0]);
    }
  });
  
}

function setupFeatureAd(video){
  var uri = video.uri;
  uri = uri.replace("/videos/", "");

  var newLink = 'https://player.vimeo.com/video/' + uri;
  $('iframe').attr('src', newLink);
  document.getElementById("videoTitle").innerHTML = video.name;   
}

function getAds(){
  $.ajax({
    url:'https://api.vimeo.com/users/juliankronfli/albums/5057845/videos?sort=manual&per_page=8', 
    method: 'GET',
    dataType: 'json',
    beforeSend: function(xhr){
      xhr.setRequestHeader("Authorization", "Bearer 9e5c7589cd5807010eb00472fee4c0fd");
    },
    success: function(data){
      createTiles(data);
    }
  });
}

function createTiles(data){
  videos = data.data;

  for (var i = 0; i < videos.length; i++) {
    var video = videos[i];
    
    if(i < 4) {
      createFirstColumnAds(video,i);
    } else {
      createSecondColumnAds(video, i);
    }
  }
}

function createFirstColumnAds(video, i){
  console.log(video)
  $(".first-column").append(
    '<div class="row h-25 p-1">' +
    '<a href="#" class="load-ad" id="'+i+'">' +
    '<img src ="'+video.pictures.sizes[3].link+'" alt"" height="100%" width="90%" />' +
    '</a>' +
    '</div>'
    );  
}

function createSecondColumnAds(video, i){
  $(".second-column").append(
    '<div class="row h-25 p-1">' +
    '<a href="#" class="load-ad" id="'+i+'">' +
    '<img src ="'+video.pictures.sizes[3].link+'" alt"" height="100%" width="90%" />' +
    '</a>' +
    '</div>'
    );  
}

function setupAbout(id) { 
  if (currentPage === 'about' || ignoreClick) {
    return;
  }

  $('#main').hide();

  if (currentPage === 'tv') {
    tvPage.hide();
  } else {
    destroyFlickity();
  }

  firstLoad = true;
  ignoreClick = false;
  currentPage = id;

  $('.arrow').hide();
  setupPageText(id);
  aboutPage.show();
}

function playVideo(id, title) {
  var vimeoLink = 'https://player.vimeo.com/video/' + id;
  $('#iframe').attr('src', vimeoLink);
  $('#videoTitle').text(title);
}

function getFlickitySettings() {
  var settings  = {
    draggable: true,
    freeScroll: true,
    wrapAround:true,
    pageDots: false,
    prevNextButtons:false,
    imagesLoaded: true,
    cellAlign: 'left',
    selectedAttraction:0.01,
    autoPlay:true,
    pauseAutoPlayOnHover: false
  };
  
  return settings;
}

function waitForImagesToLoad(){
  gallery.waitForImages(function() {
    gallery.show();       
    gallery.flickity('resize');
    gallery.flickity().focus();
    
    $('#loading').hide();

    ignoreClick = false;
  },function(loaded,count,success){
    $('#loadingPercentage').text(Math.round(loaded/count*100) + "%");
  });
}