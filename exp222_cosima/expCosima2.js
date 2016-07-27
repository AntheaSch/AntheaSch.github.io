/*
Experiment on the proportional use of quantifiers in neutral contexts
Mixed priors, urn contains 25,50, 75 or 90 blue balls 
Draw 10 balls, blue and red
for FEW: present 1-5 blue balls
for MANY: present 4-9 blue balls
16 items, 4xFEW, 4xMANY, 8xFILLER (surprising, unexpected, expected, impossible)
*/


/*
Structure of experiment
Introduction page
Short description
    Picture of urn
    Items+fillers
Subject info
Thanks
*/


/*
Structure of this .js File
several helper functions
arrays containing names and items. Each items in an object with several properties, like tag, gender, backstory etc
functions like get_items creating an array containing all items and assigns each item's character a name and its corresponding measure; this function will be called only later, when the actual slides are built

the function make_slides builds the slides (it is not defined as a variable, so it runs right away)
within make slides, the function slide from stream-V2.js builds the slides, shows the right one and guides through the items. The items are drawn from the respective get-item function and shown one after each other by using the function stream which is also defined in stream-V2.js
slide takes an object with the following structure (at least needs name)
name    (of slide in html, to show right one)
start (only introduction slide)
present (calls function get_items)
present_handle (tells what to do with items, for example where to show what, prepares df to save input in)
measure1
measure2 (carries name of measure, if this measure is active, this is how to build sentences)
...
button (what to do onclick)
log_responses (which data to save and where)
init_sliders (if sliders are present, what are sliders like)

at the very end on this file, the function init creates the experiment and specifies general properties
*/


var clone = function(obj) {
    return JSON.parse(JSON.stringify(obj));
} //turn data into json string, replace elements if replcacer has been specified

var lowercase = function(str) {
	if (str[0] == "T") {
		return "t" + str.slice(1,str.length);
	} else  if (str[0] == "H") {
		return "h" + str.slice(1,str.length);
	} else  if (str[0] == "S") {
		return "s" + str.slice(1,str.length);
	} else {
		return str;
	}
}

//check whether input is numeric
function IsNumeric(n) {
    return !isNaN(n);
} 


var names = {
	"male" : _.shuffle([
		"James", "John", "Robert", "Michael", "William", "David",
		"Richard", "Joseph", "Charles", "Thomas", "Christopher",
		"Daniel", "Matthew", "Donald", "Anthony", "Paul", "Mark",
		"George", "Steven", "Kenneth", "Andrew", "Edward", "Joshua",
		"Brian", "Kevin", "Ronald", "Timothy", "Jason", "Jeffrey",
		"Gary", "Ryan", "Nicholas", "Eric", "Jacob", "Jonathan", "Larry",
		"Frank", "Scott", "Justin", "Brandon", "Raymond", "Gregory",
		"Samuel", "Benjamin", "Patrick", "Jack", "Dennis", "Jerry",
		"Alexander", "Tyler"
	]),
	"female" : _.shuffle([
		"Mary", "Jennifer", "Elizabeth", "Linda", "Emily", "Susan",
		"Margaret", "Jessica", "Dorothy", "Sarah", "Karen", "Nancy",
		"Betty", "Lisa", "Sandra", "Helen", "Ashley", "Donna", "Kimberly",
		"Carol", "Michelle", "Emily", "Amanda", "Melissa", "Deborah",
		"Laura", "Stephanie", "Rebecca", "Sharon", "Cynthia", "Kathleen",
		"Ruth", "Anna", "Shirley", "Amy", "Angela", "Virginia", "Brenda",
		"Catherine", "Nicole", "Christina", "Janet", "Samantha", "Carolyn",
		"Rachel", "Heather", "Diane", "Joyce", "Julie", "Emma"
	])
}

var items = [

{"label": "models",
"context1": "To be a top model one has to be at least 1.75m tall. Emily and Olivia are very beautiful teenagers and dream of becoming models. Last month, they measured their respective heights and Emily was 1.70m tall, whereas Olivia was only 1,60m.",
"comparative1": "Emily was taller than Olivia was, that's why she has a good chance of becoming a model.",
"context2": "To be a top model one has to be at least 1.75m tall. Emily and Olivia are very beautiful teenagers and dream of becoming models. Last month, they measured their respective heights and Emily was 1.70m tall, whereas Olivia was only 1,60m.",
"comparative2": "Emily was taller than Olivia,  that's why she has a good chance of becoming a model.",
"context3": "To be a top model one has to be at least 1.75m tall. Emily and Olivia are very beautiful teenagers and dream of becoming models. Last month, they measured their respective heights and Emily was 1.70m tall, whereas Olivia was only 1,60m.",
"baseline3": "Emily was tall before Olivia was,  that's why she has a good chance of becoming a model.",
"context4": "To be a top model one has to be at least 1.75m tall. Emily and Olivia are very beautiful teenagers and dream of becoming models. Last month, they measured their respective heights and Emily was 1.70m tall, whereas Olivia was only 1,60m.",
"baseline4": "Emily was tall before Olivia,  that's why she has a good chance of becoming a model.",
},

{"label": "mobile phone",
"context1": "Oliver lost his mobile phone and therefore he had to buy a new one, but he only had a little money. The new mobile phone from Samsung cost 00 euro whereas the iPhone cost 150 euro.",
"comparative1": "The Samsung device was cheaper than the iPhone was, that's why Oliver bought the Samsung device.",
"context2": "Oliver lost his mobile phone and therefore he had to buy a new one, but he only had a little money. The new mobile phone from Samsung cost 100 euro whereas the iPhone cost 150 euro.",
"comparative2": "The Samsung device was cheaper than the iPhone, that's why Oliver bought the Samsung device.",
"context3": "Oliver lost his mobile phone and therefore he had to buy a new one, but he  had  only little money. The new mobile from Samsung cost 100 euro whereas the iPhone cost 150 euro. After a while the price of both devices dropped.",
"baseline3": "The Samsung device was cheap before the iPhone was, that's why Oliver bought the Samsung.",
"context4": "Oliver lost his mobile phone and therefore he had to buy a new one, but he  had  only little money. The new mobile from Samsung cost 100 euro whereas the iPhone cost 150 euro. After a while the price of both devices dropped.",
"baseline4": "The Samsung device was cheap before the iPhone, that's why Oliver bought the Samsung.",
},


{"label": "football",
"context1": "David and Chris play football in a club. David started to play when he was 5 years old whereas Chris joined the team much later. In thelast training session David performed well, whereas Chrisperformed badly",
"comparative1": "David was better than Chris was, that's why he was allowed to play the match on Sunday.",
 "context2": "David and Chris play football in a club. David started to play when he was 5 years old whereas Chris joined the team much later. In the last training session David performed well, whereas Chrisperformed badly",
 "comparative2": "David was better than Chris, that's why he was able to play the match on Sunday.",
"context3": "David and Chris play football in a club. David started to play when he was 5 years old whereas Chris joined the team much later. In their last junior year, David already had a lot of experience, whereas Chris was quite inexperienced.",
"baseline3": "David was good before Chris was, that's why he was able to join the men's team.",
"context4": "David and Chris play football in a club. David started to play when he was 5 years old whereas Chris joined the team much later. In their last junior year, David already had a lot of experience, whereas Chris was quite inexperienced.",
"baseline4": "David was good before Chris, that's why he was able to join the men's team.",
},


{"label": "essay",
"context1": "Shane and Finn are students and they had to write an essay for their history course. Shane achieved 85%, whereas Finn only got 60%.",
"comparative1": "Shane was happier than Finn was, that's why he celebrated wholeheartedly.",
"context2": "Shane and Finn are students and they had to write an essay for their history course. Shane achieved 85%, whereas Finn only got 60%.",
"comparative2": "Shane was happier than Finn, that's why he celebrated wholeheartedly.",
"context3": "Shane and Finn are students and they had to write an essay for their history course. Both were very excited about the grade. Shane  got his grade  at the end of the semester, whereas Finn had to wait untill after the holidays, but both of them passed.",
"baseline3": "Shane was happy before Finn was, that's why he celebrated in the holidays.",
"context4": "Shane and Finn are students and they had to write an essay for their history course. Both were very excited about the grade. Shane  got his grade  at the end of the semester, whereas Finn had to wait untill after the holidays, but both of them passed.",
"baseline4": "Shane was happy before Finn, that's why he celebrated in the holidays.",
},


{"label": "berries",
"context1": "Adam is a farmer. Last year, he cultivated strawberries and currants. For his cup of coffee in the afternoon he likes to have a cake with fruits.",
"comparative1": "The strawberry was sweeter than the currant was, that's why he preferred a strawberry cake.",
"context2": "Adam is a farmer. Last year, he cultivated strawberries and currants. For his cup of coffee in the afternoon he likes to have a cake with fruits.",
"comparative2": "The strawberry was sweeter than the currant, that's why he preferred a strawberry cake.",
"context3": "Adam is a farmer and last year he cultivated strawberries and currants. In June he tested a strawberry and a currant. The strawberry was ripe and sweet , whereas the currant was still sour.",
"baseline3": "The strawberry was sweet before the currant was, that's why he harvested the strawberries in June.",
"context4": "Adam is a farmer and last year he cultivated strawberries and currants. In June he tested a strawberry and a currant. The strawberry was ripe and sweet , whereas the currant was still sour.",
"baseline4": "The strawberry was sweet before the currant,  that's why he harvested the strawberries in June.",
},


{"label": "bicycle race",
"context1": "Last Friday, Lewis and Samuel took part in a bicycle race. Lewis had an adult bike with 26-inch wheels, whereas Samuel had to take the small junior bike that had only 24-inch wheels.",
"comparative1": "Lewis was faster than Samuel was, that's why he won the race.",
"context2": "Last Friday, Lewis and Samuel took part in a bicycle race. Lewis had an adult bike with 26-inch wheels, whereas Samuel had to take the small junior bike that had only 24-inch wheels.",
"comparative2": "Lewis was faster than Samuel, that's why he won the race.",
"context3": "Last Friday, Lewis and Samuel took part in a bicycle race. Lewis had an adult bike with 26-inch wheels, whereas Samuel had to take the small junior bike that had only 24-inch wheels.",
"baseline3": "Lewis was fast before Samuel was, that's why he won the race.",
"context4": "Last Friday, Lewis and Samuel took part in a bicycle race. Lewis had an adult bike with 26-inch wheels, whereas Samuel had to take the small junior bike that had only 24-inch wheels.",
"baseline4": "Lewis was fast before Samuel, that's why he won the race.",
},


{"label": "diet",
"context1": "After visiting the doctor for their annual check-up Hannah and Charlotte recognized that they were not fit and that they had to lose weight. To motivate each other they agreed that the one whose weight dropped to 65kg or less first was invited for  dinner by the other one.",
"comparative1": "Hannah was lighter than Charlotte was, that's why she had a good chance of winning.",
"context2": "After visiting the doctor for their annual check-up Hannah and Charlotte recognized that they were not fit and that they had to lose weight. To motivate each other they agreed that the one whose weight dropped to 65kg or less first was invited for  dinner by the other one.",
"comparative2": "Hannah was lighter than Charlotte, that's why she had a good chance of winning.",
"context3": "After visiting the doctor for their annual checkup Hannah and Charlotte recognized that they are not fit and that they had to lose weight. Hannah kept strictly to her diet whereas Charlotte did not.",
"baseline3": "Hannah was light before Charlotte was, that's why she was very happy.",
"context4": "After visiting the doctor for their annual checkup Hannah and Charlotte recognized that they are not fit and that they had to lose weight. Hannah kept strictly to her diet whereas Charlotte did not.",
"baseline4": "Hannah was light before Charlotte, that's why she was very happy.",
},


{"label": "boxing",
"context1": "John and Ben started  boxing a couple of months ago. For their first  fight they had to train very hard. John really wanted to win and therefore also did weight training at the weekend, whereas Ben did not.",
"comparative1": "John was stronger than Ben was, that's why he won his fight.",
"context2": "John and Ben started  boxing a couple of months ago. For their first  fight they had to train very hard. John really wanted to win and therefore also did weight training at the weekend, whereas Ben did not.",
"comparative2": "John was stronger than Ben, that's why he won his fight.",
"context3": "John and Ben started  boxing a couple of months ago. For their first  fight they had to train very hard. John really wanted to win and therefore also did weight training at the weekend, whereas Ben did not.",
"baseline3": "John was strong before Ben was, that's why he had also time for tactics.",
"context4": "John and Ben started  boxing a couple of months ago. For their first  fight they had to train very hard. John really wanted to win and therefore also did weight training at the weekend, whereas Ben did not.",
"baseline4": "John was strong before Ben, that's why he had also time for tactics.",
},


{"label": "wrestling",
"context1": "Dylan and Tyler do wrestling in a club. Their coach told them that boysare considered strong when they are able to do 50 pull-ups in a row. Last week in the training session, Dylan did 51 pull-ups, but Tyler only managed to do 44.",
"comparative1": "Dylan was stronger than Tyler was, that's why he was satisfied.",
"context2": "Dylan and Tyler do wrestling in a club. Their coach told them that boysare considered strong when they are able to do 50 pull-ups in a row. Last week in the training session, Dylan did 51 pull-ups, but Tyler only managed to do 44.",
"comparative2": "Dylan was stronger than Tyler, that's why he was satisfied.",
"context3": "Dylan and Tyler do wrestling in a club. Their coach told them that boys count as strong when they are able to do 50 pull-ups in a row. Last week in the training session, Dylan did 51 pull-ups, but Tyler only managed to do 44.",
"baseline3": "Dylan was strong before Tyler was, that's why he was satisfied.",
"context4": "Dylan and Tyler do wrestling in a club. Their coach told them that boys count as strong when they are able to do 50 pull-ups in a row. Last week in the training session, Dylan did 51 pull-ups, but Tyler only managed to do 44.",
"baseline4": "Dylan was strong before Tyler, that's why he was satisfied.",
},


{"label": "cook",
"context1": "Luke is a cook and needs a new cooking pot. Last Friday, he selected two pots and wanted to test the heat conduction of the two pots. Therefore, he put one  litre of water into each pot and measured the temperature after 2 minutes. In pot A the water was 70°C and in pot B it was 85°C. ",
"comparative1": "The water in pot A was warmer than the water in pot B was, that's why Luke kept pot A.",
"context2": "Luke is a cook and needs a new cooking pot. Last Friday, he selected two pots and wanted to test the heat conduction of the two pots. Therefore, he put one  litre of water into each pot and measured the temperature after 2 minutes. In pot A the water was 70°C and in pot B it was 85°C. ",
"comparative2": "The water in pot A was warmer than the water in pot B, that's why Luke kept pot A.",
"context3": "Luke is a cook and needs a new cooking pot. Last Friday, he selected two pots and wanted to test the heat conduction of the two pots. Therefore, he put one  litre of water into each pot and measured the time the water needed to get warm.",
 "baseline3": "The water in pot A was warm before the water in pot B was, therefore Luke bought pot A.",
"context4": "Luke is a cook and needs a new cooking pot. Last Friday, he selected two pots and wanted to test the heat conduction of the two pots. Therefore, he put one  litre of water into each pot and measured the time the water needed to get warm.",
"baseline4": "The water in pot A was warm before the water in pot B, therefore Luke bought pot A.",
},


{"label": "pilot",
"context1": "Samuel and George are pilots. Samuel is 36 years old and George is 50 years old. Last month, they met at a party and they talked about their job.",
"comparative1": "George was older than Samuel was, that's why he had a lot of experience.",
"context2": "Samuel and George are pilots. Samuel is 36 years old and George is 50 years old. Last month, they met at a party and they talked about their job.",
"comparative2": "George was older than Samuel, that's why he had a lot of experience.",
"context3": "Samuel and George are pilots. Samuel is 36 years old and George is 50 years old. It is in the airline's policy that pilots are considered old at the age of 50 and should therefore retire.",
"baseline3": "George was old before Samuel was, that's why he had to retire.",
"context4": "Samuel and George are pilots. Samuel is 36 years old and George is 50 years old. It is in the airline's policy that pilots are considered old at the age of 50 and should therefore retire.",
"baseline4": "George was old before Samuel, that's why he had to retire.",
},


{"label": "worker",
"context1": "Richard and George were close friends. Richard started to work two years ago, whereas George still studies at university. Last weekend, George suggested playing football.",
"comparative1": "Richard was busier than George was, that's why he couldn't play football.",
"context2": "Richard and George were close friends. Richard started to work two years ago, whereas George still studies at university. Last weekend, George suggested playing football.",
"comparative2": "Richard was busier than George, that's why he couldn't play football.",
"context3": "Richard and George were close friends. Richard started working two years ago, whereas George only recently finished his studies and started working in a company last month. Both of them have busy jobs.",
"baseline3": "Richard was busy before George was, that's why he seldom has time to play football.",
"context4": "Richard and George were close friends. Richard started working two years ago, whereas George only recently finished his studies and started working in a company last month. Both of them have busy jobs.",
"baseline4": "Richard was busy before George, that's why he seldom has time to play football. ",
},


{"label": "koala",
"context1": "In a breeding station in Australia volunteers raise motherless koala bears. Last week, two very small koalas were brought to the station and they were named Puh and Winni.",
"comparative1": "Puh was heavier than Winni was, that's why  Winni got more attention from the volunteers.",
"context2": "In a breeding station in Australia volunteers raise motherless koala bears. Last week, two very small koalas were brought to the station and they were named Puh and Winni.",
"comparative2": "Puh was heavier than Winni, that's why  Winni got more attention from the volunteers.",
"context3": "In a breeding station in Australia volunteers raise motherless koala bears. Last week, two koalas were brought to the station and they were named Puh and Winni. According to the volunteers  a Koala is considered heavy as soon as it weighs at least 8kg and then it can be released into the wild.",
"baseline3": "Puh was heavy before Winni was, that's why he was released into the nature.",
"context4": "In a breeding station in Australia volunteers raise motherless koala bears. Last week, two koalas were brought to the station and they were named Puh and Winni. According to the volunteers  a Koala is considered heavy as soon as it weighs at least 8kg and then it can be released into the wild.",
"baseline4": "Puh was heavy before Winni, that's why he was released into the nature.",
},


{"label": "football-match",
"context1": "Dennis and Matt are brothers and they play football in a club. Both of them are quite competitive and they get angry when they lose a game. Last weekend, both of them had a match. Unluckily Dennis lost 5:0 and Matt lost 1:0.",
"comparative1": "Dennis was angrier than Matt was, that's why he cried.",
"context2": "Dennis and Matt are brothers and they play football in a club. Both of them are quite competitive and they get angry when they lose a game. Last weekend, both of them had a match. Unluckily Dennis lost 5:0 and Matt lost 1:0.",
"comparative2": "Dennis was angrier than Matt, that's why he cried.",
"context3": "Dennis and Matt are brothers and they play football in a club. Both of them are quite competitive and they get angry when they lose a game. Last weekend, Dennis had a match on Saturday morning and Matt had one in the afternoon. Unluckily Dennis lost 5:0 and Matt lost 1:0.",
"baseline3": "Dennis was angry before Matt was, that's why he cried during Matt's match.",
"context4": "Dennis and Matt are brothers and they play football in a club. Both of them are quite competitive and they get angry when they lose a game. Last weekend, Dennis had a match on Saturday morning and Matt had one in the afternoon. Unluckily Dennis lost 5:0 and Matt lost 1:0.",
"baseline4": "Dennis was angry before Matt, that's why he cried during Matt's match.",
},


{"label": "ice-cream",
"context1": "Lisa and Peter like ice-cream and bought an ice cream machine. Last Sunday, they met and tested their machines. Lisa made strawberry ice-cream and Peter raspberry ice-cream. After 10 minutes in the ice cream machine the strawberry ice-cream had a temperature of -9°C, whereas the raspberry ice-cream had a temperature of -2°C.",
"comparative1": "The strawberry ice-cream was colder than the raspberry ice-cream was, that's why they preferred the strawberry ice-cream.",
 "context2": "Lisa and Peter like ice-cream and bought an ice cream machine. Last Sunday, they met and tested their machines. Lisa made strawberry ice-cream and Peter raspberry ice-cream. After 10 minutes in the ice cream machine the strawberry ice-cream had a temperature of -9°C, whereas the raspberry ice-cream had a temperature of -2°C.",
"comparative2": "The strawberry ice-cream was colder than the raspberry ice-cream, that's why they preferred the strawberry ice-cream.",
 "context3": "Lisa and Peter like ice-cream and bought an ice cream machine. Last Sunday, they met and tested their machines. Lisa made strawberry ice-cream and Peter raspberry ice-cream. After 10 minutes in the ice cream machine the strawberry ice-cream had a temperature of -9°C, whereas the raspberry ice-cream had a temperature of -2°C.",
"baseline3": "The strawberry ice-cream was cold before the raspberry ice-cream was, that's why they preferred the strawberry ice-cream.",
"context4": "Lisa and Peter like ice-cream and bought an ice cream machine. Last Sunday, they met and tested their machines. Lisa made strawberry ice-cream and Peter raspberry ice-cream. After 10 minutes in the ice cream machine the strawberry ice-cream had a temperature of -9°C, whereas the raspberry ice-cream had a temperature of -2°C.",
"baseline4": "The strawberry ice-cream was cold before the raspberry ice-cream, that's why they preferred the strawberry ice-cream.",
},


{"label": "App-developer",
"context1": "Heather and Toby developed an App. Both were very successful and sold their product. Heather got 250.000 euro, whereas Toby only got 100.000 euro.",
"comparative1": "Heather was richer than Toby was, that's why she moved to a big flat.",
"context2": "Heather and Toby developed an App. Both were very successful and sold their product. Heather got 250.000 euro, whereas Toby only got 100.000 euro.",
"comparative2": "Heather was richer than Toby, that's why she moved to a big flat earlier.",
"context3": "Heather and Toby developed an App. Both were very successful and sold their product. Heather had already found a purchaser two years ago, whereas Toby sold his App last month. Both of them got a good price and earned a lot of money.",
"baseline3": "Heather was rich before Toby was, that's why she moved to a big flat earlier.",
"context4": "Heather and Toby developed an App. Both were very successful and sold their product. Heather had already found a purchaser two years ago, whereas Toby sold his App last month. Both of them got a good price and earned a lot of money.",
"baseline4": "Heather was rich before Toby, that's why she moved to a big flat earlier.",
},



];

console.log("item length "+ items.length);

var measures = [
	"give_number",
	"binned histogram", //15 bins
	"lightning round"
];

var condition = 0;
var nbins = 15;
var repXN = function(str, name, k) {
	var newstr = str.replace(" N ", " " + (nbins-1) + " ");
	newstr = newstr.replace("K", k);
	return newstr.replace("X", name);
}

var num_blue = 0;

var probs = _.shuffle([25, 25, 25, 25,  
            50, 50, 50, 50,  
            75, 75, 75, 75,  
            90, 90, 90, 90]);

var urn = 0; //to save data in

/*var urn_total = 100; //total number of balls in urn
var urn_blue = 0; //number of blue balls in urn
var prob = urn_blue/urn_total
prob = Math.round(prob * 100 ) / 100
console.log(prob);*/

////////
// function creating ITEMS
//for each item, create necessary bits, can add tags like measure, choose a name from a different array, add random number etc  
var get_quant_items = function() {
    items = _.shuffle(items) //random order
    var quant_items = [];  //empty array to save items in

	for (var i=0; i<items.length; i++) {     
        var quant_prop = clone(items[i]); //turn into json file, replace XKN
        quant_prop["measure"] = "rating_task";  //each item needs a measure because via measure id slides are presented
		quant_items.push(quant_prop);  //push to quant_items
        
    }
    //return quant_items; //output is array of items
    //quant_items = _.shuffle(quant_items);
    return quant_items;
}


/////////
/// function in shared/stream-V2.js to make and present slides

function make_slides(f) {
  var   slides = {};
    
        //block enter key for every instance of class "slide" so that exp doesn't start from beginning when entering answer
    $('html').bind('keypress', function(e)
    {
       if(e.keyCode == 13)
       {
          return false;
       }
    });

  slides.i0 = slide({
     name : "i0",
     start: function() {
      exp.startT = Date.now();
     }
  });

  slides.instructions = slide({
    name : "instructions",
    button : function() {
      exp.go(); //use exp.go() if and only if there is no "present" data.
    }
  });
    
slides.example = slide({
    name : "example",
    button : function() {
      exp.go(); //use exp.go() if and only if there is no "present" data.
    }
  });
    
slides.quant = slide({
  	name: "quant",       //id of div element where info should be presented
  	present: get_quant_items(),      //gets items via function
    
/*    urn_image: function(stim) {           //id of div element, if same item is to be shown on different slides (with different tasks, for example
        //show only one urn picture
        $(".pic").hide();
        var uniform = jStat.uniform.sample(1,5);
        var pic_id = Math.round(uniform);
        $("#" + pic_id).show();
        $("#name").html(stim.name);  //from items array, use property item
    },*/
    

    rating_task: function(stim) {           //id of div element, if same item is to be shown on different slides (with different tasks, for example
    
        condition = _.sample([1,2,3,4]);
        if (condition == 1){
            var story = stim.context1;
            var sentence = stim.comparative1;
        } else if (condition == 2){
            var story = stim.context2;
            var sentence = stim.comparative2;
        } else if (condition == 3){
            var story = stim.context3;
            var sentence = stim.baseline3
        } else {
            var story = stim.context4;
            var sentence = stim.baseline4;
        };
        console.log("condition "+condition);
        $("#story").html(story);
        $("#sentence").html(sentence);  //from items array, use property item
        
    },

    
    present_handle: function(stim) {
        //reset input elements
        //$("#number_guess_likely").html("?");
        //hide parts of subslides, only show after each other
        $(".subslide").hide();
        //for sliders
    	_s.this_trial_data = clone(stim);
        //stage of Manski task?
    	_s.measure = stim.measure;
        console.log('stim measure '+stim.measure);
    	_s.trial_start = Date.now();
    	_s.measure = stim.measure;
        _s.trial_start = Date.now();

        $(".err").hide();
        $("#" + _s.measure).show();
        _s[_s.measure](stim); //_s[_s.measure] calls the function inside the current measure, it basically creates the items as defined in the measure
    },
    
    button : function() {
        if (_s.measure =="urn_image"){
            _stream.apply(this);
            }
        else{           //item task
            if ($('input[name="response"]').is(':checked')) {
                _s.log_responses();
                $('input[name="response"]').attr('checked',false); //uncheck radio buttions
                _stream.apply(this);
            }
            else {
            $("#quant_err").show()
            }
        }
    },
    
    log_responses: function() {
    	  	_s.this_trial_data["response"] = $('input[name="response"]:checked').val();
            //_s.this_trial_data["prob"] = prob;
            _s.this_trial_data["condition"] = condition;
	    	_s.this_trial_data["rt"] = Date.now() - _s.trial_start;
	    	exp.data_trials.push(clone(_s.this_trial_data));
    	_s.current_response_data = null;
    }
    
    });
    

  slides.subj_info =  slide({
    name : "subj_info",
    submit : function(e){
      //if (e.preventDefault) e.preventDefault(); // I don't know what this means.
      exp.subj_data = {
        language : $("#language").val(),
        enjoyment : $("#enjoyment").val(),
        asses : $('input[name="assess"]:checked').val(),
        age : $("#age").val(),
        gender : $("#gender").val(),
        education : $("#education").val(),
        comments : $("#comments").val(),
      };
      exp.go(); //use exp.go() if and only if there is no "present" data.
    }
  });

  slides.thanks = slide({
    name : "thanks",
    start : function() {
      exp.data= {
          "trials" : exp.data_trials,
          "catch_trials" : exp.catch_trials,
          "system" : exp.system,
          "condition" : exp.condition,
          "subject_information" : exp.subj_data,
          "clicks" : exp.clicks,
          "time_in_minutes" : (Date.now() - exp.startT)/60000
      };
      setTimeout(function() {turk.submit(exp.data);}, 1000);
    }
  });

  return slides;
}

/// init ///
function init() {
  exp.clicks = [];

  exp.condition = {}; //can randomize between subject conditions here
  exp.system = {
      Browser : BrowserDetect.browser,
      OS : BrowserDetect.OS,
      screenH: screen.height,
      screenUH: exp.height,
      screenW: screen.width,
      screenUW: exp.width
    };
  //blocks of the experiment:
  exp.structure=["i0", "instructions", //"example", 
                 "quant",
                 //"Manski", 
                 //"trial", 
                 //"final_lightning", 
                'subj_info', 'thanks'];

  
  exp.data_trials = [];
  //make corresponding slides:
  exp.slides = make_slides(exp);

  exp.nQs = utils.get_exp_length(); //this does not work if there are stacks of stims (but does work for an experiment with this structure)
                    //relies on structure and slides being defined

  $('.slide').hide(); //hide everything

  //make sure turkers have accepted HIT (or you're not in mturk)
  $("#start_button").click(function() {
    if (turk.previewMode) {
      $("#mustaccept").show();
    } else {
      $("#start_button").click(function() {$("#mustaccept").show();});
      exp.go();
    }
  });

  exp.go(); //show first slide
}