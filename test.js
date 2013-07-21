
// !addtrigger "seen (\N+)" t=nicks($1).lastactiontime?s "I last saw $1 $t " + nicks($1).lastaction:s "I've never seen $1"

var triggers = [];

var Sandbox = require("sandbox");

function addtrigger(match, statement) {
	triggers.push({"match": new RegExp(match), "func": statement});
}

function processmessage(message, cb) {
	// See if we have a special trigger
	var cmds = message.split(/ +/);
	if(cmds[0] == "!addtrigger") {
		// find the slashes and seperate
		var trigger = message.split("/");
		// push a new trigger
		triggers.push({"match": new RegExp(trigger[1]), "func": trigger[2]});
		return;
	}
	triggers.map(function (trigger, index) {
		if (arr = trigger.match.exec(message)) {
			var s = new Sandbox();
			s.global.users = ['Dickie'];
			s.run('var a=' + JSON.stringify(arr) + ';'
				+ trigger.func, function (output) {
				cb(output.result);
			});
		}
	});
}

processmessage("!addtrigger /seen (.*)/ 'who is ' + a[1] + '?'", console.log);
processmessage("!addtrigger /env/ env", console.log);

processmessage("!seen brimstone", console.log);
processmessage("env", console.log);
