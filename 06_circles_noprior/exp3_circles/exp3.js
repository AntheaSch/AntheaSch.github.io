/*
Experiment on the proportional use of quantifiers in neutral contexts
Condition 1: 
Image depicting 10 circles, blue and red
Distribution of circles: 100 circles, p(blue) = 0.5, draw 20 (10 items+10 fillers)
No info about prior
*/

/*TO DO
change prior when changing condition: number of blue balls
change in logging data: prior condition
*/


/*
Structure of experiment
Introduction page
Short description
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
    {
    quantifier: "many",
		item: "Many of the circles are blue.",
        filler: "no",
        range: [[1,3],[4,5],[6,8],[9,10]],
	},
	{
		quantifier: "few",
		item: "Few of the circles are blue.",
        filler: "no",
        range: [[0,1],[2,3],[4,4],[5,10]],
	},
    {
		quantifier: "lots",
		item: "Lots of the circles are blue.",
        filler: "no",
        range: [[1,3],[4,5],[6,8],[9,10]],
	},
	{
		quantifier: "afew",
		item: "A few of the circles are blue.",
        filler: "no",
        range: [[1,1],[2,3],[4,5],[6,10]],
	},
	{
		quantifier: "several",
		item: "Several of the circles are blue.",
        filler: "no",
        range: [[1,3],[4,6],[7,8],[9,10]],
	},
        {
    quantifier: "many",
		item: "Many of the circles are blue.",
        filler: "no",
        range: [[1,3],[4,5],[6,8],[9,10]],
	},
	{
		quantifier: "few",
		item: "Few of the circles are blue.",
        filler: "no",
        range: [[0,1],[2,3],[4,4],[5,10]],
	},
    {
		quantifier: "lots",
		item: "Lots of the circles are blue.",
        filler: "no",
        range: [[1,3],[4,5],[6,8],[9,10]],
	},
	{
		quantifier: "afew",
		item: "A few of the circles are blue.",
        filler: "no",
        range: [[1,1],[2,3],[4,5],[6,10]],
	},
	{
		quantifier: "several",
		item: "Several of the circles are blue.",
        filler: "no",
        range: [[1,3],[4,6],[7,8],[9,10]],
	},
    {
		item: "Some of the circles are white.",
        correct_answer: "no",
        filler: "yes",
        range: [[0,10]],
	},
    {
		item: "The circles have three different colors.",
        correct_answer: "no",
        filler: "yes",
        range: [[0,10]],
	},
    {
		item: "All of the circles are green.",
        correct_answer: "no",
        filler: "yes",
        range: [[0,10]],
	},
    {
		item: "There are some circles.",
        correct_answer: "yes",
        filler: "yes",
        range: [[0,10]],
	},
    {
		item: "No circle is black.",
        correct_answer: "yes",
        filler: "yes",
        range: [[0,10]],
	},
    {
		item: "There are no squares.",
        correct_answer: "yes",
        filler: "yes",
        range: [[0,10]],
	},
    {
		item: "The circles are small.",
        correct_answer: "vague",
        filler: "yes",
        range: [[0,10]],
	},    
    {
		item: "The circles are similar in size.",
        correct_answer: "vague",
        filler: "yes",
        range: [[0,10]],
	},
    {
		item: "The circles are far away from each other.",
        correct_answer: "vague",
        filler: "yes",
        range: [[0,10]],
	},
    {
		item: "The circles are red.",
        correct_answer: "vague",
        filler: "yes",
        range: [[0,10]],
	},
];
console.log("item length "+ items.length);

var measures = [
	"give_number",
	"binned histogram", //15 bins
	"lightning round"
];

var nbins = 15;
var repXN = function(str, name, k) {
	var newstr = str.replace(" N ", " " + (nbins-1) + " ");
	newstr = newstr.replace("K", k);
	return newstr.replace("X", name);
}

var num_blue = 0; //to save displayed number of blue balls in

///////
//create numbers of blue circles
//////
//var prob = _.shuffle([0.5, 0.3, 0.7]) //choose probability
//var prob = 0.25 

//condition 1
var urn_total = 100; //total number of balls in urn
var urn_blue = 50; //number of blue balls in urn
var prob = urn_blue/urn_total
console.log(prob);

/*
we assume that the outcome of the draw is binomially distributed. However, we are more interested in data from unlikely numbers. That is why we do not use this distribution. 
//create 20 samples of draw from urn WITHOUT replacing
var sample = new Array(20);
for (var i=0; i<20; i++){    
    var temp = 0; //variable saving number of blue balls drawn
    //function sampling a draw of 10 balls from urn of 100 WITHOUT replacing
    for (var j=0; j<10; j++){  
        var bern = Sampling.Bernoulli(prob); //every draw is Bernoulli distributed, p of first ball being blue is 50/100, 
        var draw = bern.draw();
            temp = temp + draw;   
        if (draw == 1){ // blue ball is drawn, p of 2nd ball is 49/99
            prob = (urn_blue - 1) / (urn_total - 1)
            } else              //if red balls is drawn, p of 2nd ball is 50/99
            {
              prob = urn_blue / (urn_total - 1)  
            }
        //console.log("prob "+prob);
        //console.log("temp "+temp);
        }
    sample[i] = temp
};    */

//////easier but not 100% correct: WITH replacement
        //sample n=10 balls; probability of drawing a blue ball is binomally distributed with p = prob
//var binom = SJS.Binomial(10,prob); //binomial(set size, probability)
        //sample from set of 10, not 100. Drawing with replacement. Probability per ball is roughly the same when only a small number is drawn
//var sample = binom.sample(20); //sample(number of samples)


////////
// function creating ITEMS
//for each item, create necessary bits, can add tags like measure, choose a name from a different array, add random number etc  
var get_quant_items = function() {
    items = _.shuffle(items) //random order
    var quant_items = [];  //empty array to save items in
//NOTE: item length is 15, but we want to show 20 images, show non-fillers twice
    //create quantifier sentences, in position 0-4 of items array, each twice
	for (var i=0; i<items.length; i++) {     
        
        var p = prob[0] //choose one probability of which to create samples of binomial distribution
        //var num = sample.shift(); //assign each item number of blue circles from item
        
        var int = _.shuffle(items[i].range)[0]
        
        var quant_prop = clone(items[i]); //turn into json file, replace XKN
		quant_prop["prob"] = p;
        quant_prop["selected_range"] = int;
        quant_prop["measure"] = "rating_task";  //each item needs a measure because via measure id slides are presented
		quant_items.push(quant_prop);  //push to quant_items
    }
    //return quant_items; //output is array of items
    return quant_items;
}

var quant_it = get_quant_items();
console.log("number of items to show "+quant_it.length);


/////////
/// function in shared/stream-V2.js to make and present slides

function make_slides(f) {
  var   slides = {};
    
        //block enter key for every instance of class "slide" so that exp doesn't start from beginning when entering answer
/*    $('html').bind('keypress', function(e)
    {
       if(e.keyCode == 13)
       {
          return false;
       }
    });*/

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
    
    rating_task: function(stim) {           //id of div element, if same item is to be shown on different slides (with different tasks, for example
        $("#quantifier_sentence").html(stim.item);  //from items array, use property item
        console.log("selct "+stim.selected_range);
        var intBegin= stim.selected_range[0];   //to get more data from unlikely numbers we subdivided the range [0,10]. One interval is drawn randomly and within this range we choose a number from a uniform distribution
        var intEnd = stim.selected_range[1]
        var uniform = jStat.uniform.sample(intBegin,intEnd);
        num_blue = Math.round(uniform);
        $("#uniform_number").html(num_blue);
        //var num_blue = stim.number_blue
        drawCircles(10, 10-num_blue ) //no variant needed
    },
    
    check: function(stim) {           //id of div element, if same item is to be shown on different slides (with different tasks, for example
        $("#quantifier").html(stim.quant);  //from items array, use property item
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
        if ($('input[name="response"]').is(':checked')) {
            _s.log_responses();
            $('input[name="response"]').attr('checked',false);
            _stream.apply(this);
        }
        else {
        $("#quant_err").show()
        }
    },
    
    log_responses: function() {
    	  	_s.this_trial_data["response"] = $('input[name="response"]:checked').val();
            _s.this_trial_data["prob"] = Math.round(prob * 10 ) / 10;
            _s.this_trial_data["blue_balls"] = num_blue;
      //change this!!
            _s.this_trial_data["cond"] = "no_prior";
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