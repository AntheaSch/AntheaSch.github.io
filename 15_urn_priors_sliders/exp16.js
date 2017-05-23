var clone = function(obj) {
    return JSON.parse(JSON.stringify(obj));
}

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
		urn: 25,
		//bins: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
        min: 0,
        max: 10
	},
	{
        urn: 50,
		//bins: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
        min: 0,
        max: 10
	},
    {
        urn: 75,
		//bins: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
        min: 0,
        max: 10
	},
    {
        urn: 90,
		//bins: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
        min: 0,
        max: 10
	},
/*	{
		type: "event",
		similar_to_whose_experiment: "judith",
		tag: "marbles",
		backstory: "X threw N marbles into a pool",
		give_number_question: "How many of the marbles do you think sank?",
		binned_histogram_prompt: "Please rate how likely it is that the following numbers of marbles sank.",
		story: "K of the marbles sank",
		gender: "female",
		min: 0,
		max: 14,
        urn: 1,
		bins: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
	},*/
];



var nbins = 11;
var repXN = function(str, name, k) {
	var newstr = str.replace(" N ", " " + (nbins-1) + " ");
	newstr = newstr.replace("K", k);
	return newstr.replace("X", name);
}

var urn = 0;

var get_items = function() {



	var trials = [];

	for (var i=0; i<items.length; i++) {
        var gender = _.shuffle(["male", "female"])[0];
        if (gender == "male"){
            var pronoun = "he"}
            else {var pronoun = "she"};
        var name = names[gender].shift();

	
		var bins_item = clone(items[i]);
		bins_item["measure"] = "binned_histogram";
        bins_item["pronoun"] = pronoun;
		bins_item["name"] = name;
		trials.push(bins_item);
		//lightning round //temperature, duration, price, sinking marbles
	}

	return _.shuffle(trials);
}


function make_slides(f) {
  var   slides = {};

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


  slides.trial = slide({
    name : "trial",
    present : get_items(),

	binned_histogram: function(stim) {
		
         $(".pic").hide();
        urn = stim.urn;
        console.log("urn "+ urn);
        /*$("#" + urn).show();
        $(".pic").hide();*/
        var pic_uniform = jStat.uniform.sample(1,5);
        var pic_id = Math.round(pic_uniform);
        var picture = urn.toString()+pic_id;
        console.log("pronoun "+ stim.pronoun);
        $("#"+picture).show();
        $(".name").html(stim.name);
        $(".pronoun").html(stim.pronoun);
        $("#blue").html(urn);
        var red = 100 - urn;
        $("#red").html(red);
        $("#min").html(stim.min);
		$("#max").html(stim.max);
		
        
        $("#quantifier_sentence").html(stim.item);
        
        
/*		_s.init_sliders();
		for (var i=0; i<nbins; i++) {
			//$("#" + slider + i)
			$("#bin" + i).html(stim.bins[i]);
		}*/
        
         //start slider
        _s.init_slider_likely(stim.min, stim.max);
        _s.init_slider_min(stim.min, stim.max);
        _s.init_slider_max(stim.min, stim.max);
        $("#number_guess_likely").html("?");
        $("#number_guess_min").html("?");
        $("#number_guess_max").html("?");
            //save data in
        _s.likely_response_data = null;
        _s.min_response_data = null;
        _s.max_response_data = null;
        $("#number_guess_likely").html("?");
        $("#number_guess_min").html("?");
        $("#number_guess_max").html("?");
        
		_s.current_response_data = {};
	},
	

    present_handle : function(stim) {
    	_s.this_trial_data = clone(stim);
    	_s.measure = stim.measure;
    	_s.trial_start = Date.now();
    	$(".err").hide();
    	$(".subslide").hide();
    	$("#" + _s.measure).show();
			_s.trial_start = Date.now();
	    	_s[_s.measure](stim);
	    
    },
    button : function() {
        if (_s.likely_response_data == null || _s.min_response_data == null ||_s.max_response_data == null || _s.min_response_data >_s.likely_response_data  || _s.likely_response_data > _s.max_response_data ) {
			$("#sliders_err").show();
		} else { 
        //save data (also likely, minimum, maximum are extracted this way)    
        _s.log_responses();
         //console.log('numbers to display unique ' +numM);    
        _stream.apply(this);
        } //use exp.go() if and only if there is no "present" data.
       },    
        
		/*if (_s.current_response_data == null) {
			$("#" + _s.measure + "_err").show();
		} else {
			if (_s.measure == "binned_histogram") {
				var complete = function() {
					for (var i=0; i<nbins; i++) {
						if (_s.current_response_data["bin" + i] == undefined) {
							return false;
						}
					}
					return true;
				}();
				if (complete) {
			        _s.log_responses();
			        _stream.apply(this); //use exp.go() if and only if there is no "present" data.
			    } else {
					$("#" + _s.measure + "_err").show();
				}
			} else {
		        _s.log_responses();
		        _stream.apply(this); //use exp.go() if and only if there is no "present" data.
		    }
		}
    },*/
    init_sliders : function() {
    	$("#slider_table").empty();

    	var table_content = ""
        
        var nrows = 1;
    	//var nrows = _s.this_trial_data.type == "event" ? 1 : 3;
    	console.log(nrows);

    	var slider_index = 0;
    	var bin_index = 0;
    	var col_per_row = 5;

    	for (var i=0; i<nrows; i++) {
    		var row_nbins;
    		if (i == 0 & nrows == 1) {
    			row_nbins = nbins;
    		} else if ( i == 0 & nrows == 3) {
    			row_nbins = col_per_row;
    		} else if (i == 1 & nrows == 3) {
    			row_nbins = col_per_row;
    			table_content = table_content + "<tr><td class='omglol' colspan='" + (col_per_row+2) + "'></td></tr>";
    		} else if (i == 2) {
    			row_nbins = nbins-(2*col_per_row);
    			table_content = table_content + "<tr><td class='omglol' colspan='" + (col_per_row+2) + "'></td></tr>";
    		}

	    	table_content = table_content + "<tr> <td align='right' height='72'> Extremely likely<br> </td>";

	    	for (var j=0; j<row_nbins; j++) {
	    		table_content = table_content + "<td rowspan='5' width='200' align='center'><div class='vslider' id='slider" + slider_index + "'>&nbsp;</div></td>"
	    		slider_index++
	    	}

	    	table_content = table_content + "/tr"

	    	table_content = table_content + "<tr> <td align='right' height='72'> Very likely<br> </td> </tr>"
	    	table_content = table_content + "<tr> <td align='right' height='72'> Neutral<br> </td> </tr>"
	    	table_content = table_content + "<tr> <td align='right' height='72'> Not very likely<br> </td> </tr>"
	    	table_content = table_content + "<tr> <td align='right' height='72'> Impossible<br> </td> </tr>"

	    	table_content = table_content + "<tr> <td></td>"

	    	for (var j=0; j<row_nbins; j++) {
		    	table_content = table_content + "<td align='center' id='bin" + bin_index + "'>{{}}</td>"
		    	bin_index++;
		    }

		    table_content = table_content + "</tr>"
		}
    	$("#slider_table").html(table_content);

    	for (var i=0; i<nbins; i++) {
    		utils.make_slider("#slider" + i, function(index) {
    			return function(event, ui) {
	    			_s.current_response_data["bin" + index] = ui.value;
	    		}
    		}(i), true);
    	}
    },
    
      //one slider each
    init_slider_likely : function(min, max) {
        utils.make_slider("#likely_single_slider", function(event, ui) {
        _s.likely_response_data = Math.round(ui.value * (max - min) + min);
        $("#number_guess_likely").html(_s.likely_response_data);
      });
    },
    init_slider_min : function(min, max) {
        utils.make_slider("#min_single_slider", function(event, ui) {
        _s.min_response_data = Math.round(ui.value * (max - min) + min);
        $("#number_guess_min").html(_s.min_response_data);
      });
    },
    init_slider_max : function(min, max) {
        utils.make_slider("#max_single_slider", function(event, ui) {
        _s.max_response_data = Math.round(ui.value * (max - min) + min);
        $("#number_guess_max").html(_s.max_response_data);
      });
    },
      
    init_slider : function(min, max, prefix, suffix) {
      utils.make_slider("#give_number_single_slider", function(event, ui) {
        _s.current_response_data = Math.round(ui.value * (max - min) + min);
        $("#number_guess").html(prefix + _s.current_response_data + suffix);
      });
    },
    log_responses: function() {
    	if (_s.measure == "give_number") {
	    	_s.this_trial_data["response"] = _s.current_response_data;
	    	_s.this_trial_data["rt"] = Date.now() - _s.trial_start;
	    	exp.data_trials.push(clone(_s.this_trial_data));
	    } else if (_s.measure == "binned_histogram") {
            likely = _s.likely_response_data;
            _s.this_trial_data["likely"] = _s.likely_response_data;
            
            minimum = _s.min_response_data;
            _s.this_trial_data["minimum"] = _s.min_response_data;
            maximum = _s.max_response_data;
            _s.this_trial_data["maximum"] = _s.max_response_data;
	    	_s.this_trial_data["rt"] = Date.now() - _s.trial_start;
	    	exp.data_trials.push(clone(_s.this_trial_data));
            //reset sliders
            _s.likely_response_data = null;
            _s.min_response_data = null;
            _s.max_response_data = null;
            /*
	    	for (var i=0; i<nbins; i++) {
		    	_s.this_trial_data["response"] = _s.current_response_data["bin" + i];
		    	//_s.this_trial_data["bin"] = _s.this_trial_data.bins[i];
		    	_s.this_trial_data["rt"] = Date.now() - _s.trial_start;*/
		    //exp.data_trials.push(clone(_s.this_trial_data));
		    }
	    
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
  exp.structure=["i0", "instructions", 
  "trial", 
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