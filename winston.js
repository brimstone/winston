// setup our depends
var irc = require('irc'),
// setup our client
	client = new irc.Client('chat.freenode.net', 'Callback', {
	   channels: ['##gen'],
	}),
// setup our sandbox
	Sandbox = require("sandbox"),
// setup our triggers
	triggers = [];

// catch errors
client.addListener('error', function(message) {
    console.log('error: ', message);
});

// handle messages
client.addListener('message', function (from, to, message) {
    console.log(from + ' => ' + to + ': ' + message);
	// See if we have a special trigger
	var channel = client.chans[to];
	var cmds = message.split(/ +/);
	switch(cmds[0]) {
		case "!on": 
			// find the slashes and seperate
			var trigger = message.split("/");
			// push a new trigger
			triggers.push({"match": new RegExp(trigger[1]), "func": trigger[2]});
			return;
			break;
		case "!help":
			if (cmd[1] == "on") {
				client.say(to, "Usage: !on /regex/ <javascript>");
			}
		default:
				console.log(channel);
		triggers.map(function (trigger, index) {
			if (arr = trigger.match.exec(message)) {
				var s = new Sandbox();
				s.env.users = channel.users;
				s.run(	'var a=' + JSON.stringify(arr) + ';'
						+ 'var n=' + JSON.stringify(channel.users) + ';'
						+ trigger.func, function (output) {
					// return our text to our channel
					client.say(to, ""+output.result);
				});
			}
		});
		break;
	}
});
