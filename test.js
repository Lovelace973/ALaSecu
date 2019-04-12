var $jq = jQuery.noConflict();
var meteo = null;
var lat = 48.000;
var long = 0.200;
var meteo_url = "http://www.prevision-meteo.ch/services/json/mans";
var streamers = null;
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
			url : "https://api.twitch.tv/helix/users?login=ZeratoR",
			headers :{
				"Authorization":"Bearer "+token
			},
			data : "",
			async:false,
			cache:false,
			dataType:"json",
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
		  console.log(data.city_info.name);
		  $jq("#city_info").text(data.city_info.name);
		  $jq("#temp").text("Maintenant "+data.current_condition.tmp+"°C - Max ");
		  $jq("#tempmax").text(data.fcst_day_0.tmax+"°C");
		  $jq("#temps_actuel").attr("src",data.current_condition.icon_big);
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
		console.log($jq(this).val());
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
				  	console.log(result.places[0]);
					lat = result.places[0].latitude;
					lat = Math.round(lat*1000)/1000;
					console.log(lat);
					long = result.places[0].longitude;
					long = Math.round(long*1000)/1000;
					console.log(long);
					meteo_url = "http://www.prevision-meteo.ch/services/json/lat="+lat+"lng="+long;
					$jq.ajax({
						type:'GET',
						url : ""+meteo_url,
						data : "",
						async:false,
						cache:false,
						dataType:"json",
						success:function(data){
							console.log(data.city_info.name);
							$jq("#city_info").text(data.city_info.name);
							$jq("#temp").text("Maintenant "+data.current_condition.tmp+"°C - Max ");
							$jq("#tempmax").text(data.fcst_day_0.tmax+"°C");
							$jq("#temps_actuel").attr("src",data.current_condition.icon_big);
							meteo = data;
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
								streamers = data;
								$jq.ajax({
											type:'GET',
											url : "http://localhost:3000/?tweets="+data.streams[0].channel.name,
											data : "",
											async:false,
											cache:false,
											dataType:"json",
											xhrFields: {
												withCredentials: true
											},
											success:function(data){
												data.forEach(function(elt){
													$jq("#tweets").append('<p>'+elt.text+'</p>');
												});

											},
											error:function(error){
												console.log(error);
											}
								});
							}
						});
				$jq("#carouselExampleIndicators").css("display","inline-block");
				$jq("#carouselExampleIndicators").carousel("pause");
				$jq(".carousel-indicators").click(updateTweets);
}

function updateTweets(){
	var num = (($jq(this).find(".active")).attr("data-slide-to"));
	console.log($jq("#carouselExampleIndicators").find(".carousel-inner").find(".carousel-item").eq(num).find(".chat"));
	$jq("#carouselExampleIndicators").find(".carousel-inner").find(".carousel-item").eq(num).find(".chat").attr("src","http://www.twitch.tv/embed/"+streamers.streams[num].channel.name+"/chat");
	$jq.ajax({
				type:'GET',
				url : "http://localhost:3000/?tweets="+streamers.streams[num].channel.name,
				data : "",
				async:false,
				cache:false,
				dataType:"json",
				xhrFields: {
					withCredentials: true
				},
				success:function(data){

						$jq("#tweets").empty();
					data.forEach(function(elt){
						$jq("#tweets").append('<p>'+elt.text+'</p>');
					});

				},
				error:function(error){
					console.log(error);
				}
	});
}
