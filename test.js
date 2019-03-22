jQuery(document).ready(function($){

$("#carouselExampleIndicators").hide();


$("#lecteurTwitch1").attr("src","ton src");


  var top = null;

  $(".col-sm-6").each(function(i, obj) {
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
});
