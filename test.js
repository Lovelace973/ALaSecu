var $jq = jQuery.noConflict();
var meteo = null;
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
        url : "https://api.twitch.tv/kraken/games/top",
        headers :{
          "Client-ID":"hdiebqr67mptvyg1v6ayhbry1njc5q"
        },
        data : "&limit="+5,
        async:false,
        cache:false,
        dataType:"json",
        success:function(data){
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
            ite++;
          });
        }
  });

  $jq.ajax({
	  type:'GET',
	  url : "https://www.prevision-meteo.ch/services/json/mans",
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
				console.log("ALLO ");
					//console.log($("."+$(this).attr("class")).children());
				var game_name = ((($jq(this).find(".card")).find(".card-body")).find("p").text());
				$jq.ajax({
							type:'GET',
							url : "https://api.twitch.tv/kraken/streams/?game="+game_name,
							headers :{
								"Client-ID":"hdiebqr67mptvyg1v6ayhbry1njc5q"
							},
							async:false,
							cache:false,
							dataType:"json",
							success:function(data){
								$jq("#lecteurTwitch1").attr("src","https://player.twitch.tv/?channel="+data.streams[0].channel.name+"&muted=true");
								$jq("#lecteurTwitch2").attr("src","https://player.twitch.tv/?channel="+data.streams[1].channel.name+"&muted=true");
								$jq("#lecteurTwitch3").attr("src","https://player.twitch.tv/?channel="+data.streams[2].channel.name+"&muted=true");
							}
						});
				$jq("#carouselExampleIndicators").show();
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



//BARRE DE RECHERCHE VILLE :

$jq(function() {


  // OnKeyDown Function
  $jq("#zip").keyup(function() {
     var zip_in = $jq(this);
     var zip_box = $jq('#zipbox');

     if (zip_in.val().length < 5) {
        zip_box.removeClass('error success');
     } else if (zip_in.val().length > 5) {
        zip_box.addClass('error').removeClass('success');
     } else if ((zip_in.val().length == 5)) {

        // Make HTTP Request
        $jq.ajax({
           url: "http://api.zippopotam.us/fr/" + zip_in.val(),
			  data:"",
			  async:false,
           cache: false,
           dataType: "json",
           type: "GET",
           success: function(result, success) {
				  console.log(data)
			  }
        });
     }
  });
});
*/
