

ID = hdiebqr67mptvyg1v6ayhbry1njc5q;
secret = m3znv4j8n8rp97swljywp333zh4y6w;

$.ajax({
		type:'GET',
    url : https://id.twitch.tv/oauth2/token?client_id=uo6dggojyb8d6soh92zknwmi5ej1q2&client_secret=nyo51xcdrerl8z9m56w9w6wg&grant_type=client_credentials
    data : "IP=true",
		async:false,
		cache:false,
		dataType:"json",
		success:function(data){
			$("#champLogin").val(data[1]);
			$("#champMdp").val(data[2]);
		},
	});


https://id.twitch.tv/oauth2/token?client_id=uo6dggojyb8d6soh92zknwmi5ej1q2&client_secret=nyo51xcdrerl8z9m56w9w6wg&grant_type=client_credentials
