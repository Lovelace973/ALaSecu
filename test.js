var $jq = jQuery.noConflict();
var meteo = null;
var lat = 48.000;
var long = 0.200;
var meteo_url = "http://www.prevision-meteo.ch/services/json/mans";
var city_url = "http://api.geonames.org/findNearbyPlaceName?lat=0.19&lng=48.00&username=alasecu";
$jq(document).ready(function(){

	$jq(".caseJeu").click(changeGame);

	$jq("#carouselExampleIndicators").hide();

  $jq.ajax({
    type:'POST',
    url : "https://id.twitch.tv/oauth2/token?client_id=hdiebqr67mptvyg1v6ayhbry1njc5q&client_secret=u3j0i8gj4ci24qydbmjr8o2idqdze8&grant_type=client_credentials",
    data : "scope=user:read:email",
    async:false,
    cache:false,
    dataType:"json",
    success:function(data){
      token = JSON.stringify(data).split(',')[0].split(":")[1].substring(1,60);
      token = token.substring(0,token.length-1);
      console.log(token);
    },
  });



	$jq.ajax({
				type:'GET',
				url : "https://api.twitch.tv/helix/users?login=monkikiwi",
				headers :{
					"Authorization":"Bearer "+token
				},
				data : "",
				async:false,
				cache:false,
				dataType:"json",
				success:function(data){
					userID = data.data[0].id;
				},
				error:function(error){
					console.log(error);
				}
	});

	var followed = [];

	$jq.ajax({
				type:'GET',
				url : "https://api.twitch.tv/helix/users/follows?from_id="+userID,
				headers :{
						"Client-ID":"hdiebqr67mptvyg1v6ayhbry1njc5q"
				},
				data : "&first=100",
				async:false,
				cache:false,
				dataType:"json",
				success:function(data){
					console.log(data);
					data.data.forEach(function(element){
						followed.push(element.to_id)
					});
				},
				error:function(error){
					console.log(error);
				}
	});

	var streamsFromFollowers = "";
	followed.forEach(function(element){
		streamsFromFollowers +="&user_id="+element;
	});

	var liveFollowed = [];
	var liveFollowedViewers = [];
	var liveFollowedGameId =[];

	$jq.ajax({
				type:'GET',
				url : "https://api.twitch.tv/helix/streams",
				headers :{
						"Client-ID":"hdiebqr67mptvyg1v6ayhbry1njc5q"
				},
				data : streamsFromFollowers,
				async:false,
				cache:false,
				dataType:"json",
				success:function(data){
					console.log(data);
					data.data.forEach(function(element){
						liveFollowed.push(element.user_id);
						liveFollowedViewers.push(element.viewer_count);
						liveFollowedGameId.push(element.game_id);
					});
				},
				error:function(error){
					console.log(error);
				}
	});

	var liveFollowedGame =[];

	$jq.ajax({
				type:'GET',
				url : "https://api.twitch.tv/helix/games",
				headers :{
						"Client-ID":"hdiebqr67mptvyg1v6ayhbry1njc5q"
				},
				data : "&id=" + liveFollowedGameId.join("&id="),
				async:false,
				cache:false,
				dataType:"json",
				success:function(data){
					console.log(data);
					data.data.forEach(function(element){
						liveFollowedGame.push(element.name);
					});
				},
				error:function(error){
					console.log(error);
				}
	});


	var usersFromLiveFollowers = "";
	liveFollowed.forEach(function(element){
		usersFromLiveFollowers +="&id="+element;
	});

	var usersLiveDisplayName = [];
	var usersLiveProfileImage = [];

	$jq.ajax({
				type:'GET',
				url : "https://api.twitch.tv/helix/users",
				headers :{
					"Authorization":"Bearer "+token
				},
				data : usersFromLiveFollowers,
				async:false,
				cache:false,
				dataType:"json",
				success:function(data){
					data.data.forEach(function(element){
						usersLiveDisplayName.push(element.display_name);
						usersLiveProfileImage.push(element.profile_image_url);
					});
				},
				error:function(error){
					console.log(error);
				}
	});

	var usersFromFollowers = "";
	followed.forEach(function(element){
		usersFromFollowers +="&id="+element;
	});

	var usersProfileImage = [];
	var usersDisplayName = [];

	$jq.ajax({
				type:'GET',
				url : "https://api.twitch.tv/helix/users",
				headers :{
					"Authorization":"Bearer "+token
				},
				data : usersFromFollowers,
				async:false,
				cache:false,
				dataType:"json",
				success:function(data){
					data.data.forEach(function(element){
						usersProfileImage.push(element.profile_image_url);
						usersDisplayName.push(element.display_name);
					});
				},
				error:function(error){
					console.log(error);
				}
	});

	var html = [];
	var i = 0
	liveFollowed.forEach(function(element){
			html.push('<ul class="nav navbar-nav">');
			html.push('<img src ='+usersLiveProfileImage[i]+'>');
			//html.push('<h5>'+liveFollowedGame[i]+'\n</h5>');
			//html.push('<h5>'+liveFollowedViewers[i]+'</h5>');
			html.push('<h3 class="menu-title">'+usersLiveDisplayName[i]+'</h3>');
			html.push('</ul>');
			i++;
	});


	var i = 0;

	followed.forEach(function(element){
		if(!liveFollowed.includes(followed[i])){
				html.push('<div class = >');
				html.push('<img class ="offline" src ='+usersProfileImage[i]+'>');
				html.push('<h3 class="menu-title">'+usersDisplayName[i]+'</h3>');
				html.push('</div>');
			}
				i++;
	});

	$jq("#followed-menu").append(html.join("\n"));

$jq.ajax({
			type:'GET',
			url : "http://localhost:3000/?tweets=ZeratoR",
			data : "",
			async:false,
			cache:false,
			dataType:"json",
			xhrFields: {
				withCredentials: true
			},
			success:function(data){
				console.log(data);
			},
			error:function(error){
				console.log(error);
			}
});
  var top = null;

  $jq.ajax({
        type:'GET',
        url : "http://localhost:3000/?topStreams=true",
        headers :{
          "Client-ID":"hdiebqr67mptvyg1v6ayhbry1njc5q"
        },
        data : "",
        async:false,
        cache:false,
        dataType:"json",
				xhrFields: {
    			withCredentials: true
				},
        success:function(data){
					console.log(data);
          var viewer = 0;
          top = data.top;
          data.top.forEach(function(element) {
            viewer+=element.viewers;
          });


          /*
          $("#viewer-count").text(viewer);
          console.log(data.top[0].viewers);
          $("#first_game_count").text(data.top[0].viewers);
          $("#first_game_name").text(data.top[0].game.name);*/

          var ite = 0;

          $jq(".game-name").each(function(num){
            $jq('.game-name').eq(ite).text(data.top[ite].game.name);
            $jq('.viewer-count').eq(ite).text(data.top[ite].viewers);
						var img = data.top[ite].game.box.template;
						img = img.replace("{width}",	$jq('.game-name').eq(ite).siblings(".chart-wrapper").width());
						img = img.replace("{height}",	$jq('.game-name').eq(ite).siblings(".chart-wrapper").height());
						console.log(img);
						$jq('.game-name').eq(ite).siblings(".chart-wrapper").css("background-image","url("+img+")");
						$jq('.game-name').eq(ite).siblings(".chart-wrapper").css("opacity","0.70");
            ite++;
          });
        }
  });

  $jq.ajax({
	  type:'GET',
	  url : ""+meteo_url,
	  data : "",
	  async:false,
	  cache:false,
	  dataType:"json",
	  success:function(data){
		  $jq("#city_info").text(data.city_info.name);
		  $jq("#temp").text("Maintenant "+data.current_condition.tmp+"°C - Max ");
		  $jq("#tempmax").text(data.fcst_day_0.tmax+"°C");
		  $jq("#temps_actuel").attr("src",data.current_condition.icon_big);
		  $jq("#ville").text("Le Mans");
			meteo = data;
	  }
  });

  $jq("#j0").click(function(){
	  		  $jq("#city_info").text(meteo.city_info.name);
	  		  $jq("#temp").text("Maintenant "+meteo.current_condition.tmp+"°C - Max ");
	  		  $jq("#tempmax").text(meteo.fcst_day_0.tmax+"°C");
	  		  $jq("#temps_actuel").attr("src",meteo.current_condition.icon_big);
 });

	$jq("#j1").click(function(){

			  $jq("#city_info").text(meteo.city_info.name);
			  $jq("#temp").text("Min "+meteo.fcst_day_1.tmin+"°C - Max ");
			  $jq("#tempmax").text(meteo.fcst_day_1.tmax+"°C");
			  $jq("#temps_actuel").attr("src",meteo.fcst_day_1.icon_big);
	});

	$jq("#j2").click(function(){
			  $jq("#city_info").text(meteo.city_info.name);
			  $jq("#temp").text("Min "+meteo.fcst_day_2.tmin+"°C - Max ");
			  $jq("#tempmax").text(meteo.fcst_day_2.tmax+"°C");
			  $jq("#temps_actuel").attr("src",meteo.fcst_day_2.icon_big);
	});

	$jq("#j3").click(function(){
			  $jq("#city_info").text(meteo.city_info.name);
			  $jq("#temp").text("Min "+meteo.fcst_day_3.tmin+"°C - Max ");
			  $jq("#tempmax").text(meteo.fcst_day_3.tmax+"°C");
			  $jq("#temps_actuel").attr("src",meteo.fcst_day_3.icon_big);
	});
});

//BARRE DE RECHERCHE VILLE :
  // OnKeyDown Function
$jq("#zipForm input").keypress(function(event){
	var keycode = (event.keyCode ? event.keyCode : event.which);
	if(keycode == '13'){
     var zip_in = $jq(this);
     var zip_box = $jq('#zipbox');
        // Make HTTP Request
        $jq.ajax({
           url: "http://api.zippopotam.us/fr/" + $jq(this).val(),
			  data:"",
			  async:false,
           cache: false,
           dataType: "json",
           type: "GET",
           success: function(result, success) {
					lat = result.places[0].latitude;
					lat = Math.round(lat*1000)/1000;
					long = result.places[0].longitude;
					long = Math.round(long*1000)/1000;
					meteo_url = "http://www.prevision-meteo.ch/services/json/lat="+lat+"lng="+long;
					city_url = "http://api.geonames.org/findNearbyPlaceName?lat="+lat+"&lng="+long+"&username=alasecu";
					$jq.ajax({
						type:'GET',
						url : ""+meteo_url,
						data : "",
						async:false,
						cache:false,
						dataType:"json",
						success:function(data){
							$jq("#city_info").text(data.city_info.name);
							$jq("#temp").text("Maintenant "+data.current_condition.tmp+"°C - Max ");
							$jq("#tempmax").text(data.fcst_day_0.tmax+"°C");
							$jq("#temps_actuel").attr("src",data.current_condition.icon_big);
							meteo = data;
						}
					});
					$jq.ajax({
						type:'GET',
						url : ""+city_url,
						data : "",
						async:false,
						cache:false,
						dataType:"xml",
						success:function(data){
							$jq("#ville").text(data.getElementsByTagName("name")[0].childNodes[0].data);
						}
					});
			  	}
        });
	}
});

$jq("#zipForm").submit(function(event){
	event.preventDefault();
});
$jq.ajax({
	type:'GET',
	url:"http://api.zippopotam.us/FR/"+zip,
	data:"",
	async:false,
	cache:false,
	datatype:"json",
	success:function(data) {
		console.log(data);
	}
});

function changeGame(){
					//console.log($("."+$(this).attr("class")).children());
				var game_name = ((($jq(this).find(".card")).find(".card-body")).find("p").text());
				$jq.ajax({
							type:'GET',
							url : "http://localhost:3000/?stream="+game_name,
							headers :{
								"Client-ID":"hdiebqr67mptvyg1v6ayhbry1njc5q"
							},
							async:false,
							cache:false,
							dataType:"json",
							success:function(data){
								console.log(data);
								$jq("#lecteurTwitch1").attr("src","https://player.twitch.tv/?channel="+data.streams[0].channel.name+"&muted=true");
								$jq("#lecteurTwitch2").attr("src","https://player.twitch.tv/?channel="+data.streams[1].channel.name+"&muted=true");
								$jq("#lecteurTwitch3").attr("src","https://player.twitch.tv/?channel="+data.streams[2].channel.name+"&muted=true");
							}
						});
				$jq("#carouselExampleIndicators").css("display","inline-block");
				$jq("#carouselExampleIndicators").carousel();
}

/*
var Twit = require('twit');

var T = new Twit({
  consumer_key:         'BEXhqTckFvyOtXhJmeJNIN9O2',
  consumer_secret:      'iWjczPSD9L8DnbZ9efzlPgDZuJtsZkJV6vmr3ENNTPaiyXqDYY',
  access_token:         '4517086245-9v5U2JrNoaoFu2zHxHx8JDPgmBLxE6klAgfQOfU',
  access_token_secret:  'KvaQO4OQaw8rLc2TgXzUmQQ3oAien6A5L2MlJw4W3wb4v',
  timeout_ms:           60*1000,  // optional HTTP request timeout to apply to all requests.
  strictSSL:            true,     // optional - requires SSL certificates to be valid.
})
T.get('followers/ids', { screen_name: 'tolga_tezel' },  function (err, data, response) {
  console.log(data)
})
*/
