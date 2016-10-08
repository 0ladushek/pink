function initialize() {
      var mapCanvas = document.getElementById('map');	  
      var myLatLng = new google.maps.LatLng(59.936148, 30.322917);
      var mapOptions = {
        center: myLatLng,
        zoom: 16,
        mapTypeId: google.maps.MapTypeId.ROADMAP,
		disableDefaultUI: true
      }
      var map = new google.maps.Map(mapCanvas, mapOptions); 
	  
	  var image = 'img/map-marker.png';
      var beachMarker = new google.maps.Marker({
      position: myLatLng,
      map: map,
      icon: image
  });
    }
    google.maps.event.addDomListener(window, 'load', initialize);
	
  var toggler = document.getElementById('toggler');
  var header = document.getElementById('header');
  var menu = document.getElementById('menu');
    toggler.onclick = function (e) {
     e.preventDefault();
     toggler.classList.toggle('menu-toggler--close');
	 menu.classList.toggle('main-nav--vertical');
	 header.classList.toggle('page-header__menu--blue');
    } 