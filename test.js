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
		  $jq("#temp").text(data.current_condition.tmp);
		  $jq("#tempmax").text(data.fcst_day_0.tmax);
		  $jq("#temps_actuel").attr("src",data.current_condition.icon);
			meteo = data;
	  }
  });

  $jq("#j0").click(function(){
	  		  $jq("#city_info").text(meteo.city_info.name);
	  		  $jq("#temp").text(meteo.current_condition.tmp);
	  		  $jq("#tempmax").text(meteo.fcst_day_0.tmax);
	  		  $jq("#temps_actuel").attr("src",meteo.current_condition.icon);
 });

	$jq("#j1").click(function(){

			  $jq("#city_info").text(meteo.city_info.name);
			  $jq("#temp").text("min : "+meteo.fcst_day_1.tmin);
			  $jq("#tempmax").text(meteo.fcst_day_1.tmax);
			  $jq("#temps_actuel").attr("src",meteo.fcst_day_1.icon);
	});

	$jq("#j2").click(function(){
			  $jq("#city_info").text(meteo.city_info.name);
			  $jq("#temp").text("min : "+meteo.fcst_day_2.tmin);
			  $jq("#tempmax").text(meteo.fcst_day_2.tmax);
			  $jq("#temps_actuel").attr("src",meteo.fcst_day_2.icon);
	});
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
