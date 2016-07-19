/*
Experiment on the influence of COMPARED TP phrases on production of few and many
two kids draw from urn with same content, p = 0.5 or p = 0.25
draw 10 balls

NOTE: STYLE SHEET CHANGED
change margins of div
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
    {
    quantifier: "many",
		item: "Compared to __ drew many blue balls.",
        filler: "no",
        color: "blue",
        numbers25: [ [2,5], [6,9], [1,3]],
        numbers50: [ [4,7], [6,9], [1,3]],
	},
    {
    quantifier: "many",
		item: "Compared to __ drew many blue balls.",
        filler: "no",
        color: "blue",
        numbers25: [ [2,5], [6,9], [1,3]],
        numbers50: [ [4,7], [6,9], [1,3]],
	},
    {
    quantifier: "many",
		item: "Compared to __ drew many blue balls.",
        filler: "no",
        color: "blue",
        numbers25: [ [2,5], [6,9], [1,3]],
        numbers50: [ [4,7], [6,9], [1,3]],
	},
    {
    quantifier: "many",
		item: "Compared to __ drew many blue balls.",
        filler: "no",
        color: "blue",
        numbers25: [ [2,5], [6,9], [1,3]],
        numbers50: [ [4,7], [6,9], [1,3]],
	},
	{
		quantifier: "few",
		item: "Compared to __ drew few blue balls.",
        filler: "no",
        color: "blue",
        numbers50: [ [5,2], [3,1], [9,6]],
        numbers25: [ [4,1], [2,1], [9,6]],
	},
    {
		quantifier: "few",
		item: "Compared to __ drew few blue balls.",
        filler: "no",
        color: "blue",
        numbers50: [ [5,2], [3,1], [9,6]],
        numbers25: [ [4,1], [2,1], [9,6]],
	},
    {
		quantifier: "few",
		item: "Compared to __ drew few blue balls.",
        filler: "no",
        color: "blue",
        numbers50: [ [5,2], [3,1], [9,6]],
        numbers25: [ [4,1], [2,1], [9,6]],
	},
    {
		quantifier: "few",
		item: "Compared to __ drew few blue balls.",
        filler: "no",
        color: "blue",
        numbers50: [ [5,2], [3,1], [9,6]],
        numbers25: [ [4,1], [2,1], [9,6]],
	},
    {
		quantifier: "surprising",
		item: "The number of blue balls __ drew is surprising.",
        filler: "yes",
        color: "blue",
        range: [1,10],
	},
    {
		quantifier: "surprising",
		item: "The number of red balls __ drew is surprising.",
        filler: "yes",
        color: "red",
        range: [1,10],
	},
	{
		quantifier: "unexpected",
		item: "The number of blue balls __ drew is unexpected.",
        filler: "yes",
        color: "blue",
        range: [1,10],
	},
    {
		quantifier: "unexpected",
		item: "The number of red balls __ drew is unexpected.",
        filler: "yes",
        color: "red",
        range: [1,10],
	},
	{
		quantifier: "expected",
		item: "The number of blue balls __ drew is expected.",
        filler: "yes",
        color: "blue",
        range: [1,10],
	},
    {
		quantifier: "expected",
		item: "The number of red balls __ drew is expected.",
        filler: "yes",
        color: "red",
        range: [1,10],
	},
    {
		quantifier: "impossible",
		item: "The number of blue balls __ drew is impossible.",
        filler: "yes",
        color: "blue",
        range: [1,10],
	},
    {
		quantifier: "impossible",
		item: "The number of red balls __ drew is impossible.",
        filler: "yes",
        color: "red",
        range: [1,10],
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

var urn = 0;
var num_blue = 0;
var num_blue2 = 0;
var distance = 0;
var numbers = [[0,0], [0,0], [0,0]];
var pair = [0,0];
var filler = "lol";

//vector of same length as items, randomly draw prior=urn content
var probs = _.shuffle([25, 25, 25, 25,  
            50, 50, 50, 50,  
            25, 25, 25, 25,  
            50, 50, 50, 50,  
            /*75, 75, 75, 75,  
            90, 90, 90, 90*/
                      ]);

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
//NOTE: item length is 15, but we want to show 20 images, show non-fillers twice
    //create quantifier sentences, in position 0-4 of items array, each twice
	for (var i=0; i<items.length; i++) {     
        
        //var p = prob[0] //choose one probability of which to create samples of binomial distribution
        var gender = _.shuffle(["male", "female"])[0];
        if (gender == "male"){
            var pronoun = "his"}
            else {var pronoun = "her"};
        var name = names[gender].shift();
        var name2 = names[gender].shift();
        var name3 = names[gender].shift();
        
        /*var urn_name = clone(items[i]); 
        urn_name["name"] = name;
        urn_name["measure"] = "urn_image";  //each item needs a measure because via measure id slides are presented
		quant_items.push(urn_name);*/
        
//        var int = _.shuffle(items[i].range)[0]
        
        var quant_prop = clone(items[i]); //turn into json file, replace XKN
        quant_prop["name"] = name;
        quant_prop["name2"] = name2;
        quant_prop["name3"] = name3;
        quant_prop["pronoun"] = pronoun;
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
//urn pictures and names        
        //show only one urn picture
        //show only one urn picture
        $(".pic").hide();
        urn = probs.shift();
        console.log("urn "+ urn);
        /*$("#" + urn).show();
        $(".pic").hide();*/
        var pic_uniform = jStat.uniform.sample(1,5);
        var pic_id = Math.round(pic_uniform);
        var picture = urn.toString()+pic_id;
        //console.log("pic id "+ picture);
        $("#"+picture).show();
        
        var pic_uniform2 = jStat.uniform.sample(6,10);
        var pic_id2 = Math.round(pic_uniform2);
        var picture2 = urn.toString()+pic_id2;
        //console.log("pic id "+ picture);
        $("#"+picture2).show();
        
        /*$(".pic").hide();
        var urn = probs.shift();
        console.log("urn "+ urn);
        $("#" + urn).show();
        $(".pic").hide();
        var pic_uniform = jStat.uniform.sample(1,5);
        var pic_id = Math.round(pic_uniform);
        $("#"+pic_id).show();
        var pic_uniform2 = jStat.uniform.sample(6,10);
        var pic_id2 = Math.round(pic_uniform2);
        $("#"+pic_id2).show();*/
        //show one boy at the top 
        $(".boy_top").hide();
        $(".girl_top").hide();
        var top_id = Math.round(jStat.uniform.sample(1,5));
        if (stim.pronoun == "her"){
        $("#"+"girl"+ top_id).show(); } else
            {$("#"+"boy"+ top_id).show(); };
        $(".boy_bottom").hide();
        $(".girl_bottom").hide();
        var bottom_id = Math.round(jStat.uniform.sample(6,10));
        if (stim.pronoun == "her"){
            $("#"+"girl"+ bottom_id).show(); } else
            {$("#"+"boy"+bottom_id).show();};
        $(".name").html(stim.name);
        $(".name2").html(stim.name2);
        $(".name3").html(stim.name3);
        $(".pronoun").html(stim.pronoun);
        $("#blue").html(urn);
        var red = 100 - urn;
        $("#red").html(red);
//target sentence        
        item_elements = stim.item.split("__"); //split item at __
        item1 = item_elements[0];
        item2 = item_elements[1];
        $(".item1").html(item1);  
        $(".item2").html(item2); 
        var names = 
        $("#name_random").html(_.shuffle([stim.name, stim.name2])[0]); //present random name in filler
        $(".item").hide();
        if (stim.filler=="no"){$("#target").show()} else
            { $("#filler").show() };
               
//blue balls        
        //to get more data from unlikely numbers we subdivided the range [0,10]. One interval is drawn randomly and within this range we choose a number from a uniform distribution
    //fillers: both numbers can have any value
        if (stim.filler=="yes"){
        /*var intBegin= stim.range[0];   
        var intEnd = stim.range[1]*/
        filler = "yes";
        var uniform = jStat.uniform.sample(1,10);
        num_blue = Math.round(uniform);
            console.log("num_blue "+num_blue);  
        $("#uniform_number").html(num_blue);
        //var num_blue = stim.number_blue
        drawCircles(10, 10-num_blue ) //no variant needed
        var uniform2 = jStat.uniform.sample(1,10);
        num_blue2 = Math.round(uniform2);
        //var num_blue = stim.number_blue
        drawCircles2(10, 10-num_blue2 ) //no variant needed
        }
       //target: one number higher than other   
       //intended: test several differences at once    
        /* else{
    
        var range = _.shuffle([stim.range1, stim.range2, stim.range3, stim.range4])[0];
        var intBegin= range[0];   
        var intEnd = range[1];
        distance = 10-intEnd;
        var uniform = jStat.uniform.sample(intBegin,intEnd);
        num_blue = Math.round(uniform);
            console.log("distance "+distance);
            console.log("num_blue "+num_blue);
        num_blue2 = num_blue+distance
        if(stim.quantifier=="many"){
            drawCircles(10, 10-num_blue );
            drawCircles2(10, 10-num_blue2 ); //higher number goes with many
        } else{
            drawCircles(10, 10-num_blue2);
            drawCircles2(10, 10-num_blue ); //lower number goes with few
            } */
        
    // FEW MANY    
    //have several number pairs selected, less flexibility    
        else{ 
        filler = "no";    
        if (urn == 50){
            numbers = stim.numbers50;
        }    else {numbers = stim.numbers25};
            console.log("list of pair "+stim.numbers50);    
            console.log("one of list of pair "+stim.numbers50[2]);    
        pair = _.sample(numbers)  ; 
        console.log("pair "+pair);    
        num_blue = pair[0];
        console.log("num_blue "+num_blue);   
        num_blue2 = pair[1];
        drawCircles(10, 10-num_blue );
        drawCircles2(10, 10-num_blue2 ); 
        }
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
            _s.this_trial_data["prior"] = urn;
            _s.this_trial_data["distance"] = distance;
            _s.this_trial_data["blue_balls_1"] = num_blue;
            _s.this_trial_data["blue_balls_2"] = num_blue2;
    //add experimental condition: relation between numbers and threshold
        if (filler == "no"){
            if (pair == numbers[0]){
                _s.this_trial_data["situation"] = "NOT-QUANT_QUANT";}
            else if (pair == numbers[1]){
                _s.this_trial_data["situation"] = "bothQUANT";}
            else {
                _s.this_trial_data["situation"] = "bothNOT-QUANT";}
        }
      //change this!!
            _s.this_trial_data["cond"] = "prior";
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