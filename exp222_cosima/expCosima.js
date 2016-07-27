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

{"label": "roller-coaster",
"context1": "Anna and John are siblings. Anna is 9 years old and John is 12 years old.  Last weekend, they went to an  entertainment park. To enter the roller-coaster one had to be at least 1.30m tall.",
"comparative1": "John was taller than Mary was, that's why he was able to enter the roller-coaster.",
"context2": "Anna and John are siblings. Anna is 9 years old and John is 12 years old.  Last weekend, they went to an  entertainment park. To enter the roller-coaster one had to be at least 1.30m tall.",
"comparative2": "John was taller than Mary, that's why he was able to enter the roller-coaster.",
"context3": "Anna and John are siblings. John is 9 years old and already 1.40 m tall. His sister, despite being 2 years older, is only 1.25 m tall.  Last weekend, they went to an entertainment park. To enter the roller-coaster one had to be at least 1.30m tall.",
"baseline3": "John was tall before Anna was, that's why he was allowed to enter the roller-coaster.",
"context4": "Anna and John are siblings. John is 9 years old and already 1.40 m tall. His sister, despite being 2 years older, is only 1.25 m tall.  Last weekend, they went to an entertainment park. To enter the roller-coaster one had to be at least 1.30m tall.",
"baseline4": "John was tall before Anna, that's why he was allowed to enter the roller-coaster.",
},

{"label": "basketball",
"context1": "As teenagers Scot and Mark  played basketball in a sports club. Scot was 1.90m tall whereas Mark was only 1.75m.Their coach at that time thought that people only count as tall when they are at least 1.80m tall.  ",
"comparative1": "Scot was taller than Mark was, that's why  their coach preferred Scot.",
"context2": "As teenagers Scot and Mark  played basketball in a sports club. Scot was 1.90m tall whereas Mark was only 1.75m.Their coach at that time thought that people only count as tall when they are at least 1.80m tall.  ",
"comparative2": "Scot was taller than Mark, that's why their coach preferred Scot.",
"context3": "Scot and Mark  played basketball in the school team. Scot was 1.90m tall whereas Mark was only 1.75m. Their coach at that time thought that people only counted as tall when they were at least 1.80m tall.  ",
"baseline3": "Scot was tall before Mark was, that's why their coach preferred Scot.",
"context4": "Scot and Mark  played basketball in the school team. Scot was 1.90m tall whereas Mark was only 1.75m. Their coach at that time thought that people only counted as tall when they were at least 1.80m tall.  ",
"baseline4": "Scot was tall before Mark, that's why their coach preferred Scot.",
},

{"label": "laptop",
"context1": "At an online sales platform the price of articles drops every hour untill a user buys the article. Yesterday, Ryan visited the platform to buy a new laptop and a new camera.",
"comparative1": "The laptop was cheaper than the camera was, that's why he bought the laptop.",
"context2": "At an online sales platform the price of articles drops every hour untill a user buys the article. Yesterday, Ryan visited the platform to buy a new laptop and a new camera.",
"comparative2": "The laptop was cheaper than the camera, that's why he bought the laptop.",
"context3": "At an online sales platform the price of articles drops every hour untill a user buys the article. Yesterday, Ryan visited the platform to buy a new laptop and a new camera.",
"baseline3": "The laptop was cheap before the camera was, that's why he bought the laptop.",
"context4": "At an online sales platform the price of articles drops every hour untill a user buys the article. Yesterday, Ryan visited the platform to buy a new laptop and a new camera.",
"baseline4": "The laptop was cheap before the camera, that's why he bought the laptop.",
},

{"label": "factory",
"context1": "Megan and Katy both work in a factory. Last year, the factory made a profit. Therefore, their boss increased their salary. Megan got 40 euro and Katy got 75 euro extra in their usual salary.",
"comparative1": "Katy was happier than Megan was, that's why she smiled the whole day.",
"context2": "Megan and Katy both work in a factory. Last year, the factory made a profit. Therefore, their boss increased their salary. Megan got 40 euro and Katy got 75 euro extra in their usual salary.",
"comparative2": "Katy was happier than Megan, that's why she smiled the whole day.",
"context3": "Megan and Katy both work in a factory. Last year, they made a profit. Therefore, their boss increased their salary. Katy already got the good news  on Friday, whereas Megan had to wait till Monday.",
"baseline3": "Katy was happy before Megan was, that's why she already celebrated at the weekend.",
"context4": "Megan and Katy both work in a factory. Last year, they made a profit. Therefore, their boss increased their salary. Katy already got the good news  on Friday, whereas Megan had to wait till Monday.",
"baseline4": "Katy was happy before Megan, that's why she already celebrated at the weekend.",
},

{"label": "golf",
"context1": "Jessica and Rebecca play golf. Jessica started to play 15 years ago and her handicap is 10. Rebecca started to play last year and her handicap is only 28. The lower your handicap, the better you are. In the local tournament last weekend only players with a handicap of less than 12 could participate.",
"comparative1": "Jessica was better than Rebecca was, that's why she was able to take part in the tournament.",
"context2": "Jessica and Rebecca play golf. Jessica started to play 15 years ago and her handicap is 10. Rebecca started to play last year and her handicap is only 28. The lower your handicap, the better you are. In the local tournament last weekend only players with a handicap of less than 12 could participate.",
"comparative2": "Jessica was better than Rebecca, that's why she was able to take part in the tournament.",
"context3": "Jessica and Rebecca play golf. Jessica started to play 15 years ago and her handicap is 10. Rebecca started to play last year and her handicap is only 28. The lower your handicap, the better you are. To count as a good player you have to have a handicap of less than 12 and then you can take part in tournaments.",
"baseline3": "Jessica was good before Rebecca was, that's why she could take part in the tournament earlier.",
"context4": "Jessica and Rebecca play golf. Jessica started to play 15 years ago and her handicap is 10. Rebecca started to play last year and her handicap is only 28. The lower your handicap, the better you are. To count as a good player you have to have a handicap of less than 12 and then you can take part in tournaments.",
"baseline4": "Jessica was good before Rebecca, that's why she could take part in the tournament earlier.",
},

{"label": "cars",
"context1": "George and Lewis like fast cars. George owns a Ferrari and Lewis owns a Porsche. Last weekend, they compared the speed of their cars in a safe driving training.",
"comparative1": "The Ferrari was faster than the Porsche was, that's why George was happy.",
"context2": "George and Lewis like fast cars. George owns a Ferrari and Lewis owns a Porsche. Last weekend, they compared the speed of their cars in a safe driving training.",
"comparative2": "The Ferrari was faster than the Porsche, that's why George was happy.",
"context3": "George and Lewis like fast cars. George owns a Ferrari and Lewis owns a Porsche. Last weekend, they compared the time their cars took to accelerate to 100km/h.",
"baseline3": "The Ferrari was fast before the Porsche was, that's why George was very happy.",
"context4": "George and Lewis like fast cars. George owns a Ferrari and Lewis owns a Porsche. Last weekend, they compared the time their cars took to accelerate to 100km/h.",
"baseline4": "The Ferrari was fast before the Porsche, that's why George was very happy.",
},

{"label": "race",
"context1": "Last Saturday, Robert and Jacob took part in a 100m race.  The organizer measured their speed every 25 meters. At the first measuring point Robert had a speed of 35 km/h whereas Jacob had a speed of 22 km/h.",
"comparative1": "Robert was faster than Jacob was, that's why he won the race.",
"context2": "Last Saturday, Robert and Jacob took part in a 100m race.  The organizer measured their speed every 25 meters. At the first measuring point Robert had a speed of 35 km/h whereas Jacob had a speed of 22 km/h.",
"comparative2": "Robert was faster than Jacob, that's why he won the race.	",
"context3": "Last Saturday, Robert and Jacob took part in a 100m race.  The organizer measured their speed every 25 meters. At the first measuring point Robert had a speed of 35 km/h whereas Jacob had a speed of 22 km/h.",
"baseline3": "Robert was fast before Jacob was, that's why he won the race.",
"context4": "Last Saturday, Robert and Jacob took part in a 100m race.  The organizer measured their speed every 25 meters. At the first measuring point Robert had a speed of 35 km/h whereas Jacob had a speed of 22 km/h.",
"baseline4": "Robert was fast before Jacob, that's why he won the race.",
},

{"label": "bmi",
"context1": "The body mass index indicates the weight and the size of a person. With a BMI of 25 one counts as light and that's the goal that Mia and Eve wanted to achieve with their diet. Last month, when they checked their weight Mia had a BMI of 32 and Eve had 37. Both of them are 1.70m tall.",
"comparative1": "Mia was lighter than Eve was, that's why she was motivated to stick to her diet.",
"context2": "The body mass index indicates the weight and the size of a person. With a BMI of 25 one counts as light and that's the goal that Mia and Eve wanted to achieve with their diet. Last month, when they checked their weight Mia had a BMI of 32 and Eve had 37. Both of them are 1.70m tall.",
"comparative2": "Mia was lighter than Eve,  that's why she was motivated to stick to her diet.",
"context3": "The body mass index indicates the weight and the size of a person. With a BMI of 25 one counts as light and that's the goal that Mia and Eve wanted to achieve with their diet. Last month, when they checked their weight, Mia had a BMI of 32 and Eve had 37. Both of them are 1.70m tall.",
"baseline3": "Mia was light before Eve was, that's why she was motivated to keep the diet.",
"context4": "The body mass index indicates the weight and the size of a person. With a BMI of 25 one counts as light and that's the goal that Mia and Eve wanted to achieve with their diet. Last month, when they checked their weight, Mia had a BMI of 32 and Eve had 37. Both of them are 1.70m tall.",
"baseline4": "Mia was light before Eve, that's why she was motivated to keep the diet.",
},

{"label": "weight lifting",
"context1": "Steven and Nick are brothers. Steven is two years older than Nick. When they were teenagers they set a rule in their circle of friends that one is considered strong when one is able to lift 50kg.",
"comparative1": "Steven was stronger than Nick was, that's why he was satisfied.",
"context2": "Steven and Nick are brothers. Steven is two years older than Nick. When they were teenagers they set a rule in their circle of friends that one is considered strong when one is able to lift 50kg.",
"comparative2": "Steven was stronger than Nick, that's why he was satisfied.",
"context3": "Steven and Nick are brothers. Steven is two years older than Nick. When they were teenagers they set a rule in their circle of friends that one is considered strong when one is able to lift 50kg. When they tested it for the first time Steven was 15 and Nick only 13 years old.",
"baseline3": "Steven was strong before Nick was, that's why he satisfied.",
"context4": "Steven and Nick are brothers. Steven is two years older than Nick. When they were teenagers they set a rule in their circle of friends that one is considered strong when one is able to lift 50kg. When they tested it for the first time Steven was 15 and Nick only 13 years old.",
"baseline4": "Steven was strong before Nick, that's why he was satisfied.",
},

{
"label": "heating",
"context1": "Emma and Lydia are close friends. Last Saturday, they met for a coffee and talked about their flats. Emma lives in a  flat in an old building, whereas Lydia owns a house that was built last year. They talked about disadvantages of living in an old building compared to living in a new building in winter.",
"comparative1": "The house was warmer than the flat was, that's why they often met there.",
"context2": "Emma and Lydia are close friends. Last Saturday, they met for a coffee and talked about their flats. Emma lives in a  flat in an old building, whereas Lydia owns a house that was built last year. They talked about disadvantages of living in an old building compared to living in a new building in winter.",
"comparative2": "The house was warmer than the flat, that's why they often met there.",
"context3": "Emma and Lydia are close friends. Emma lives in a  flat in an old building, whereas Lydia owns a house that was built last year. In January, it was very cold and they tested their heating and compared it in the living room that had almost the same size.",
"baseline3": "The house was warm before the flat was, that's why they often met there.",
"context4": "Emma and Lydia are close friends. Emma lives in a  flat in an old building, whereas Lydia owns a house that was built last year. In January, it was very cold and they tested their heating and compared it in the living room that had almost the same size.",
"baseline4": "The house was warm before the flat, that's why they often met there.",
},

{
"label": "roadworks",
"context1": "Last summer, Owen recognized during surface maintenance that concrete and tar heat up differently which causes problems for the workers. He measured the temperature at 11 o'clock in the morning and detected that concrete had a temperature of 37°C whereas tar had a temperature 48°C.",
"comparative1": "Tar was hotter than concrete was, that's why he had to deal with problems at the roadworks.",
"context2": "Last summer, Owen recognized during surface maintenance that concrete and tar heat up differently which causes problems for the workers. He measured the temperature at 11 o'clock in the morning and detected that concrete had a temperature of 37°C whereas tar had a temperature 48°C.",
"comparative2": "Tar was hotter than concrete, that's why he had to deal with problems at the roadworks.",
"context3": "Last summer, Owen recognized during surface maintenance  that concrete and tar heat up differently which causes problems for the workers. He measured the temperature at 11 o'clock in the morning and detected that concrete had a temperature of 37°C whereas tar had a temperature 48°C.",
"baseline3": "Tar was hot before concrete was, that's why he had to deal with problems at the roadwork.",
"context4": "Last summer, Owen recognized during surface maintenance  that concrete and tar heat up differently which causes problems for the workers. He measured the temperature at 11 o'clock in the morning and detected that concrete had a temperature of 37°C whereas tar had a temperature 48°C.",
"baseline4": "Tar was hot before concrete, that's why he had to deal with problems at the roadwork.",
},

{
"label": "cherries",
"context1": "Jonathan grows heart-cherries and sour cherries. Last week, he thought about harvesting them and therefore tried one cherry of each kind.",
"comparative1": "The sour cherry was sweeter than the heart-cherry was, that's why he harvested only the sour cherries.",
"context2": "Jonathan grows heart-cherries and sour cherries. Last week, he thought about harvesting them and therefore tried one cherry of each kind.",
"comparative2": "The sour cherry was sweeter than the heart-cherry, that's why he harvested only the sour cherries.",
"context3": "Jonathan grows heart-cherries and sour cherries. Last week, he thought about harvesting them and therefore tried one cherry of each kind.",
"baseline3": "The sour cherry was sweet before the heart cherry was, that's why he harvested the sour cherries.",
"context4": "Jonathan grows heart-cherries and sour cherries. Last week, he thought about harvesting them and therefore tried one cherry of each kind.",
"baseline4": "The sour cherry was sweet before the heart cherry, that's why he harvested the sour cherries.",
},

{
"label": "hospital",
"context1": "In the local and very small hospital, the nurse starts to work at 6 am and the doctor starts at 9 am. Yesterday there was a lot of work to do in the early morning.",
"comparative1": "The nurse was busier than the doctor was, that's why she was very tired in the afternoon.",
"context2": "In the local and very small hospital, the nurse starts to work at 6 am and the doctor starts at 9 am. Yesterday there was a lot of work to do in the early morning.",
"comparative2": "The nurse was busier than the doctor, that's why she was very tired in the afternoon.",
"context3": "In the local and very small hospital, the nurse starts to work at 6 am and the doctor starts at 9 am. Yesterday there was a lot of work to do because there were many patients.",
"baseline3": "The nurse was busy before the doctor was, that's why she already wanted to have a break at 12 o'clock.",
"context4": "In the local and very small hospital, the nurse starts to work at 6 am and the doctor starts at 9 am. Yesterday there was a lot of work to do because there were many patients.",
"baseline4": "The nurse was busy before the doctor, that's why she already wanted to have a break at 12 o'clock.",
},

{"label": "pregnancy",
"context1": "Holly and Nicole are close friends. Both of them are pregnant. Holly is in her sixth month of pregnancy, whereas Nicole is in her third month. Last Saturday, they talked about the changes in their bodies.",
"comparative1": "Holly was heavier than Nicole was, that's why most of her clothes didn't fit anymore.",
"context2": "Holly and Nicole are close friends. Both of them are pregnant. Holly is in her sixth month of pregnancy, whereas Nicole is in her third month. Last Saturday, they talked about the changes in their bodies.",
"comparative2": "Holly was heavier than Nicole, that's why most of her clothes didn't fit anymore.",
"context3": "Holly and Nicole are close friends. Both of them are pregnant. Holly is in her sixth month of pregnancy, whereas Nicole is in her third month. Last Saturday, they talked about their body change.",
"baseline3": "Holly was heavy before Nicole was, that's why most of her cloths didn't fit anymore.",
"context4": "Holly and Nicole are close friends. Both of them are pregnant. Holly is in her sixth month of pregnancy, whereas Nicole is in her third month. Last Saturday, they talked about their body change.",
"baseline4": "Holly was heavy before Nicole, that's why most of her cloths didn't fit anymore.",
},

{"label": "fired",
"context1": "Mike and Ellen worked in a factory and had been continuously late for work. Last Monday, they had a meeting with their boss who told them that Mike was fired and Ellen would be getting a warning.",
"comparative1": "Mike was angrier than Ellen was, that's why he  left the office straight away. ",
"context2": "Mike and Ellen worked in a factory and had been continuously late for work. Last Monday, they had a meeting with their boss who told them that Mike was fired and Ellen would be getting a warning.",
"comparative2": "Mike was angrier than Ellen, that's why he  left the office straight away.",
"context3": "Mike and Ellen worked in a factory and had been continuously late for work. Last Monday, they both had a meeting with their boss. Mike had an appointment in the morning which was when his boss told him that he was fired, Ellen received a written warning from her boss in the afternoon.",
"baseline3": "Mike was angry before Ellen was, that's why he  left the office straight away.",
"context4": "Mike and Ellen worked in a factory and had been continuously late for work. Last Monday, they both had a meeting with their boss. Mike had an appointment in the morning which was when his boss told him that he was fired, Ellen received a written warning from her boss in the afternoon.",
"baseline4": "Mike was angry before Ellen, that's why he  left the office straight away.",
},

{"label": "hotel owner",
"context1": "Ryan and Oscar owned hotels. Ryan's hotel was a 5-star hotel near the beach and Oscar had a small 3-star hotel in a small village. Ryan made a big profit with his hotel, whereas Oscar only made a small profit.",
"comparative1": "Ryan was richer than Oscar was, that's why he lived in the lap of luxury.",
"context2": "Ryan and Oscar owned hotels. Ryan's hotel was a 5-star hotel near the beach and Oscar had a small 3-star hotel in a small village. Ryan made a big profit with his hotel, whereas Oscar only made a small profit.",
"comparative2": "Ryan was richer than Oscar, that's why he lived in the lap of luxury.",
"context3": "Ryan and Oscar built new hotels near the beach. Ryan's hotel opened 5 years ago, whereas Oscar's hotel opened 2 years ago. Both made big profit every year. ",
"baseline3": "Ryan was rich before Oscar was, that's why he could live in the lap of luxury earlier.",
"context4": "Ryan and Oscar built new hotels near the beach. Ryan's hotel opened 5 years ago, whereas Oscar's hotel opened 2 years ago. Both made big profit every year. ",
"baseline4": "Ryan was rich before Oscar, that's why he could live in the lap of luxury earlier.",
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