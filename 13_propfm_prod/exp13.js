/*
Experiment on the proportional use of few and many in real-world contexts
production study
7 bins per item presented
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
   {"context": 'There were 12 muffins on the kitchen table in Ed\'s flat.', 
    "amount": "12",
     "N": 'N_high',
     "high": 'Ed arrived __ feeling hungry', 
     "low": "Ed arrived __ feeling full",
     "number_sentence": "He ate __ of the muffins.",
    "quantifier_sentence": "For a guy who was __, Ed ate __ of the muffins.",
     "bins": ["1", "3", "5", "6", "7", "9", "11"],
     "event": 'dependent',
     "topic": 'muffins'}, 
    
    {"context": "Carla won 12 vouchers for rollercoaster rides on a fair.", 
     "amount": "12",
     "N": 'N_high',
     "high":"Carla is __ an adventurous person",
     "low": "Carla is __ a fearful person",
     "number_sentence": "She used __ of the vouchers.",
     "quantifier_sentence":"For __, Carla used __ of the vouchers.",
     "bins": ["1", "3", "5", "6", "7", "9", "11"],
     "event": 'dependent',
     "topic":"vouchers"},
    
    {"context": "Bruno played 12 tennis matches last season.", 
     "amount": "12",
     "N": 'N_low',
     "high":"Bruno is __ an unathletic person",
     "low": "Bruno is __ a fit person",
     "number_sentence": "He lost __ of the matches.",
     "quantifier_sentence":"For __, Bruno lost __ of the matches.",
     "bins": ["1", "3", "5", "6", "7", "9", "11"],
     "event": 'dependent',
     "topic":"tennis"},
    
    {"context": "When moving to a new flat, Martha packed 15 boxes.", 
     "amount": "15",
     "N": 'N_low',
     "high":"Martha is __ a strong woman",
     "low": "Martha is __ a weak woman",
     "number_sentence": "She carried __ of the boxes herself.",
     "quantifier_sentence":"For __, Martha carried __ of the boxes.",
     "bins": ["1", "3", "5", "8", "10", "12", "14" ],
     "event": 'dependent',
     "topic":"boxes"},
    
    {"context": "Melanie had to choose which among 12 pairs of shoes to bring on holiday.",
     "amount": "12",
     "N": 'N_high',
     "high":"Melanie __ loves fashion",
     "low": "Melanie __ doesn't care about fashion",
     "number_sentence": "She packed __ of the pairs of shoes.",
     "quantifier_sentence":"For a woman who __, Melanie packed __ of the pairs of shoes.",
     "bins": ["1", "3", "5", "6", "7", "9", "11"],
     "event": 'dependent',
     "topic":"shoes"},
        
    {"context": "For a memory test 9 three-digit numbers were read out to Chris.", 
     "amount": "9",
     "N": 'N_low',
     "high":"Chris has __ a great memory",
     "low": "Chris has __ a bad memory",
     "number_sentence": "He memorized __ of the numbers.",
     "quantifier_sentence":"For a guy who has __, Chris memorized __ of the numbers.",
     "bins": ["1", "2", "3", "4", "5", "6", "8"],
     "event": 'dependent',
     "topic":"memory"},
            
    {"context": "Jim had 15 trees in his garden.", 
     "amount": "15",
     "N": 'N_low',
     "high":"Jim is __ a strong man",
     "low": "Jim is __ a weak man",
     "number_sentence": "He cut down __ of the trees.",
     "quantifier_sentence":"For __, Jim cut down __ of the trees.",
     "bins": ["1", "3", "5", "8", "10", "12", "14" ],
     "event": 'dependent',
     "topic":"trees"},
        
    
    {"context":'Alex took part in a basketball competition and was allowed 9 shots from the three-point line.',
     "amount": "9",
     "N": 'N_low',
     "high":'Alex is __ a professional player',
    "low": 'Alex is __ an amateur player',
     "number_sentence": "He made __ of the shots.",
     "quantifier_sentence":"For __, Alex made __ of the shots.",
     "bins": ["1", "2", "3", "4", "5", "6", "8"],
     "event": 'independent',
    "topic":'basketball'},

    {"context": "In a music quiz the beginnings of 9 pop songs were played.", 
     "amount": "9",
     "N": 'N_low',
     "high":"Heidi __ loves pop songs",
     "low": "Heidi __ hates pop songs",
     "number_sentence": "She recognized __ of the songs.",
     "quantifier_sentence":"For a woman who __, Heidi recognized __ of the songs.",
     "bins": ["1", "2", "3", "4", "5", "6", "8"],
     "event": 'independent',
     "topic":"songs"},
    
    
    {"context": "A math teacher presented a tricky problem to the 24 students in his course.", 
     "amount": "24",
     "N": 'N_high',
     "high":"The course __ focuses on problem-solving strategies",
     "low": "The course __ does not teach problem-solving strategies",
     "number_sentence": "__ of the students could solve the problem.",
     "quantifier_sentence":"For a course which __, __ of the students could solve the problem.",
     "bins": ["2-3", "6-7", "10-11", "12-13", "14-15", "18-19", "22-23"],
     "event": 'independent',
     "topic":"math"},
    
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

var prior = "null"; 
var number = 0;

////////
// function creating ITEMS
//for each item, create necessary bits, can add tags like measure, choose a name from a different array, add random number etc  
var get_quant_items = function() {
    items = _.shuffle(items) //random order
    var quant_items = [];  //empty array to save items in
//NOTE: item length is 15, but we want to show 20 images, show non-fillers twice
    //create quantifier sentences, in position 0-4 of items array, each twice
	for (var i=0; i<items.length; i++) {     
        
        //var p = prob[0] //choose one probability of which to create samples of binomial distribution
        var quantifier = _.shuffle(["few", "many"])[0];
        var quant_prop = clone(items[i]); //turn into json file, replace XKN
        quant_prop["quantifier"] = quantifier;
		//quant_prop["prob"] = p;
//        quant_prop["selected_range"] = int;
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
        $("#context").html(stim.context);  //from items array, use property item
        //random choice of LP or HP
        condition = _.sample([1,2]);
        if (condition == 1){
            prior = "high";
            var prior_sentence = stim.high;
        } else {
            prior = "low";
            var prior_sentence = stim.low;};
        var prior_elements = prior_sentence.split("__"); //split context at __
        var prior_begin = prior_elements[0]; 
        var prior_end = prior_elements[1]; 
        var prior_present = prior_begin+""+prior_end;
        $("#prior").html(prior_present);
        
        number =_.shuffle(stim.bins)[0];
        console.log("number "+number);
        var number_elements = stim.number_sentence.split("__"); //split context at __
        var number_begin = number_elements[0]; 
        var number_end = number_elements[1]; 
        console.log("num begin "+number_begin);
        var number_present = number_begin+number+number_end;
        $("#number_sentence").html(number_present);
        
        var quantifier_elements = stim.quantifier_sentence.split("__"); //split context at __
        var quantifier_begin = quantifier_elements[0]; 
        var quantifier_middle = quantifier_elements[1]; 
        var quantifier_end = quantifier_elements[2]; 
        var quantifier_present = quantifier_begin+prior_end+quantifier_middle+stim.quantifier+quantifier_end;
        $("#quantifier_sentence").html(quantifier_present);
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
      //change this!!
            _s.this_trial_data["prior"] = prior;
            _s.this_trial_data["number"] = number;
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