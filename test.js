jQuery(document).ready(function($){

	$("#carouselExampleIndicators").hide();

  	$(".col-sm-6").click(function(){
   	$("#carouselExampleIndicators").show();
   	$("#carouselExampleIndicators").carousel();
  	})

  $.ajax({
    type:'POST',
    url : "https://id.twitch.tv/oauth2/token?client_id=hdiebqr67mptvyg1v6ayhbry1njc5q&client_secret=u3j0i8gj4ci24qydbmjr8o2idqdze8&grant_type=client_credentials",
    data : "",
    async:false,
    cache:false,
    dataType:"json",
    success:function(data){
      token = JSON.stringify(data).split(',')[0].split(":")[1].substring(1,60);
      token = token.substring(0,token.length-1);
      console.log(token);
    },
  });

  var top = null;

  $(".caseJeu").each(function(i, obj) {
    console.log(obj);
      obj.click(function(){
        console.log("ALLO ");
          //console.log($("."+$(this).attr("class")).children());
        var game_name = ((($(this).find(".card")).find(".card-body")).find("p").text());
        channelName=null;
        $.ajax({
              type:'GET',
              url : "https://api.twitch.tv/kraken/streams/?game="+game_name,
              headers :{
                "Client-ID":"hdiebqr67mptvyg1v6ayhbry1njc5q"
              },
              async:false,
              cache:false,
              dataType:"json",
              success:function(data){
                $("#lecteurTwitch1").attr("src","https://player.twitch.tv/?channel="+data.streams[0].channel.name+"&muted=true");
                $("#lecteurTwitch2").attr("src","https://player.twitch.tv/?channel="+data.streams[1].channel.name+"&muted=true");
                $("#lecteurTwitch3").attr("src","https://player.twitch.tv/?channel="+data.streams[2].channel.name+"&muted=true");
                document.getElementById('lecteurTwitch1').src = document.getElementById('lecteurTwitch1').src
                document.getElementById('lecteurTwitch2').src = document.getElementById('lecteurTwitch2').src
                document.getElementById('lecteurTwitch3').src = document.getElementById('lecteurTwitch3').src
              }
            });
        $("#carouselExampleIndicators").show();
        $("#carouselExampleIndicators").carousel();
      });
  });

  $.ajax({
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

          $(".game-name").each(function(num){
            $('.game-name').eq(ite).text(data.top[ite].game.name);
            $('.viewer-count').eq(ite).text(data.top[ite].viewers);
            ite++;
          });
        }
  });

  $.ajax({
	  type:'GET',
	  url : "https://www.prevision-meteo.ch/services/json/mans",
	  data : "",
	  async:false,
	  cache:false,
	  dataType:"json",
	  success:function(data){
		  console.log(data.city_info.name);
		  $("#city_info").text(data.city_info.name);
		  $("#temp").text(data.current_condition.tmp);
		  console.log(data.current_condition.icon);
		  $("#temps_actuel").attr("src",data.current_condition.icon);
	  }
  });
});
