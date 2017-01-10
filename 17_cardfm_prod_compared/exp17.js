/*
Experiment on the cardinal use of few and many
follow-up on Linguistic Vanguard, adding suprisingly
production study
8 bins per item presented
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


var items = [

    {"context": "A friend’s favorite book has been published only recently and has __ pages.",
    "description": "recently published books,__ the book has __ pages.",
    "bins_few": ["0-40", "81-120","161-200","241-280"],
    "bins_many": ["321-360","401-440","481-520","560 or more"],
    /* "bins": ["0-40", "41-80","81-120","121-160","161-200","201-240","241-280","281-320","321-360","361-400","401-440","441-480","481-520","521-560","560 or more"],*/
    "label": "book" },

    {"context": "Nick is a man from the US who saw __ movies last year.",
    "description": "men from the US,__ Nick saw __ movies last year.",
    "bins_few": ["0-2", "6-8","12-14","18-20"],
    "bins_many": ["24-26","30-32","36-38","42 or more"],
    /*"bins": ["0-2", "3-5","6-8","9-11","12-14","15-17","18-20","21-23","24-26","27-29","30-32","33-35","36-38","39-41","42 or more"],*/
     "label": "movie" },

    {"context": "A friend wants to read you her favorite poem which has __ lines.",
    "description": "poems,__ the poem has __ lines.", 
     "bins_few": ["0-3", "8-11","16-19","24-27"],
     "bins_many": ["32-35","40-43","48-51","56 or more"],
     /*"bins": ["0-3", "4-7","8-11","12-15","16-19","20-23","24-27","28-31","32-35","36-39","40-43","44-47","48-51","52-55","56 or more"],*/
     "label": "poem" },

    {"context": "Joseph is a man from the US who ate __ burgers last month.",
    "description": "men from the US,__ Joseph ate __ burgers last month.", 
     "bins_few": ["0-1", "4-5","8-9","12-13"],
     "bins_many": ["16-17","20-21","24-25","28 or more"],
     /*"bins": ["0-1", "2-3","4-5","6-7","8-9","10-11","12-13","14-15","16-17","18-19","20-21","22-23","24-25","26-27","28 or more"],*/
     "label": "burger" },

    {"context": "Melanie is a woman from the US who owns __ pairs of shoes.",
    "description": "women from the US,__ Melanie owns __ pairs of shoes.", 
     "bins_few": ["0-2", "6-8","12-14","18-20"],
     "bins_many": ["24-26","30-32","36-38","42 or more"],
    /* "bins": ["0-2", "3-5","6-8","9-11","12-14","15-17","18-20","21-23","24-26","27-29","30-32","33-35","36-38","39-41","42 or more"],*/
     "label": "shoes" },

    {"context": "Vehicle No. 102 is a school bus which has seats for __ passengers.",
    "description": "school busses,__ the bus has seats for __ passengers.", 
     "bins_few": ["0-4", "10-14","20-24","30-34"],
     "bins_many": ["40-44","50-54","60-64","70 or more"],
    /* "bins": ["0-4", "5-9","10-14","15-19","20-24","25-29","30-34","35-39","40-44","45-49","50-54","55-59","60-64","65-69","70 or more"],*/
     "label": "bus" },

    {"context": "Erin is a first grade student in primary school. There are __ children in Erin’s class.",
    "description": "primary school classes,__ there are __ children in Erin’s class.", 
     "bins_few": ["0-2", "6-8","12-14","18-20"], 
     "bins_many": ["24-26","30-32","36-38","42 or more"], 
     /*"bins": ["0-2", "3-5","6-8","9-11","12-14","15-17","18-20","21-23","24-26","27-29","30-32","33-35","36-38","39-41","42 or more"], */
    "label": "class" },

    {"context": "Betty is a woman from the US who washed her hair __ times last month.",
    "description": "women from the US,__ Betty washed her hair __ times last month.", 
     "bins_few": ["0-2", "6-8","12-14","18-20"], 
     "bins_meny": ["24-26","30-32","36-38","42 or more"], 
     /*"bins": ["0-2", "3-5","6-8","9-11","12-14","15-17","18-20","21-23","24-26","27-29","30-32","33-35","36-38","39-41","42 or more"], */
     "label": "hair" },

    {"context": "Lelia is a woman from the US who has __ friends.",
    "description": "women from the US,__ Lelia has __ friends.",
     "bins_few": ["0-1","4-5","8-9","12-13"],
     "bins_many": ["16-17","20-21","24-25","28 or more"],
     /*"bins": ["0-1", "2-3","4-5","6-7","8-9","10-11","12-13","14-15","16-17","18-19","20-21","22-23","24-25","26-27","28 or more"],*/
     "label": "friends" },

    {"context": "Tony is a man from the US who cooked himself __ meals at home last month.",
    "description": "men from the US,__ Tony cooked himself __ meals at home last month.", 
     "bins_few": ["0-3", "8-11","16-19","24-27"],
     "bins_many": ["32-35","40-43","48-51","56 or more"],
     /*"bins": ["0-3", "4-7","8-11","12-15","16-19","20-23","24-27","28-31","32-35","36-39","40-43","44-47","48-51","52-55","56 or more"],*/
     "label": "cook" },

    {"context": "Liam is a man from the US who has __ T-shirts.",
    "description": "men from the US,__ Liam has __ T-shirts.", 
     "bins_few": ["0-2", "6-8","12-14","18-20"],
     "bins_many": ["24-26","30-32","36-38","42 or more"],
     /*"bins": ["0-2", "3-5","6-8","9-11","12-14","15-17","18-20","21-23","24-26","27-29","30-32","33-35","36-38","39-41","42 or more"],*/
     "label": "tshirts" },

    {"context": "Judith is a woman from the US who has __ Facebook friends.",
    "description": "women from the US,__ Judith has __ Facebook friends.", 
     "bins_few": ["0-69", "140-209","280-349","420-489"],
     "bins_many": ["560-629","700-769","840-909","980 or more"],
//     "bins": ["0-69", "70-139","140-209","210-279","280-349","350-419","420-489","490-559","560-629","630-699","700-769","770-839","840-909","910-979","980 or more"],
     "label": "facebook" },

    {"context": "Andy is man from the US who drank __ cups of coffee last week.",
    "description": "men from the US,__ Andy drank __ cups of coffee last week.",
     "bins_few": ["0-1", "4-5","8-9","12-13"], 
     "bins_many": ["16-17","20-21","24-25","28 or more"], 
     /*"bins": ["0-1", "2-3","4-5","6-7","8-9","10-11","12-13","14-15","16-17","18-19","20-21","22-23","24-25","26-27","28 or more"],*/ 
    "label": "coffee"}, 

    {"context": "Lisa is a woman from the US who made __ phone calls last week.",
    "description": "women from the US,__ Lisa made __ phone calls last week.",
     "bins_few": ["0-4", "10-14","20-24","30-34"],
     "bins_many": ["40-44","50-54","60-64","70 or more"],
     /*"bins": ["0-4", "5-9","10-14","15-19","20-24","25-29","30-34","35-39","40-44","45-49","50-54","55-59","60-64","65-69","70 or more"],*/
     "label": "calls" }, 

    {"context": "Sarah is a woman from the US who went to __ restaurants last year.",
    "description": "women from the US,__ Sarah went to __ restaurants last year.", 
     "bins_few": ["0-3", "8-11","16-19","24-27"],
     "bins_many": ["32-35","40-43","48-51","56 or more"],
     /*"bins": ["0-3", "4-7","8-11","12-15","16-19","20-23","24-27","28-31","32-35","36-39","40-43","44-47","48-51","52-55","56 or more"],*/
    "label": "restaurants" },
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

var interval = 0;
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
    

    rating_task: function(stim) {           //id of div element, if same item is to be shown on different slides (with different tasks, for example  //from items array, use property item
        //random choice of LP or HP
        
        var context_sentence = stim.context;
        var context_elements = context_sentence.split("__"); //split context at __
        var context_begin = context_elements[0]; 
        var context_end = context_elements[1]; 
        
        if (stim.quantifier == "few"){
            number =_.shuffle(stim.bins_few)[0];
            interval = stim.bins_few.indexOf(number)+1;    
        }
        else {
            number =_.shuffle(stim.bins_many)[0]; //only choose first or last number in range since these data points are missing
            interval = stim.bins_many.indexOf(number)+5;
        }
        //number =_.shuffle(stim.bins)[0];
        console.log("number "+number);
        console.log("interval "+interval);
        var context_present = context_begin+""+number+context_end;
        $("#context").html(context_present);
        
        var quantifier_elements = stim.description.split("__"); //split context at __
        var quantifier_begin = quantifier_elements[0]; 
        var quantifier_middle = quantifier_elements[1]; 
        var quantifier_end = quantifier_elements[2]; 
        /*var quantifier_present1 = "Compared to what you would expect from "+quantifier_begin;
        var quantifier_present2 = quantifier_middle+stim.quantifier+quantifier_end;*/
        var quantifier_present = "Compared to what you would expect from "+quantifier_begin+ "<br>" +quantifier_middle+stim.quantifier+quantifier_end;
        $("#quantifier_sentence").html(quantifier_present);
        $("#quantifier_sentence2").html(quantifier_present2);
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
            _s.this_trial_data["number"] = number;
            _s.this_trial_data["interval"] = interval;
            _s.this_trial_data["modifier"] = "compared to";
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