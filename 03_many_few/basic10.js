// study on cardinal "few" and "many" or "many of the"
// pre-test to get feel for range of answers

//contains 5 new items, will later be used to elicit prior, production and interpretation data

//design adjusted from Judith's sinking marbles

//variables to be saved: language, comment; per trial#: trialnum, context, item, topic, response, stimulus, 


// Cocolab function
// Returns a random integer between min (included) and max (excluded)
// Using Math.round() will give you a non-uniform distribution!
function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

var items = shuffle([
   {"context": 'Vehicle No. 102 is a school bus.', 
     "question":'How many passengers do you think can safely sit in Vehicle No. 102?',
     "topic": 'bus'},   
    
    {"context":'Matthew is a man from the US who plays football for his college team.',
    "question":'How many players do you think are on Matthew\'s football team?',
    "topic":'team'},
    
    {"context": "Erin is a first grade student in primary school.", 
     "question":"How many children do you are in Erin's class?",
     "topic":"class"},
   
    {"context": "George is a man from the US who retired recently.",
     "question":"How many years do you think George worked?",
     "topic":"retire"},
         
    {"context": "Betty is a woman from the US.",
     "question":"How many times do you think Betty washed her hair last month?",
     "topic":"wash_hair"},
    
    {"context": "Beth is a woman from the US.", 
     "question":"How many times do you think Beth went grocery shopping last month?",
     "topic":"grocery"},
    
    {"context": "Lelia is a woman from the US.", 
     "question":"How many friends do you think Lelia has?",
     "topic":"grocery"},
    
    {"context": "NewTec is a company based in the US.", 
     "question":"How many employees do you think the company has?",
     "topic":"employees"},
    
    {"context": "Liam is a man from the US.", 
     "question":"How many T-shirts do you think Liam has?",
     "topic":"tshirts"},

    {"context": "Judith is a woman from the US.", 
     "question":"How many Facebook friends do you think Judith has?",
     "topic":"facebook"},
]);

//decide whether partitive in ALL items or in nones
//if partitive = 0 "many", if partitive = 1 "many of the"
var partitive = getRandomInt(0,2)


var data = {
    trials: []
    }; 
var trialnum = 0;

$(document).ready(function() {
    showSlide("intro");
    $('#gotoInstructions').click(function() {
        showSlide('instructions');
    });
    $('#startbutton').click(function() {
        stepExperiment();
    });
    //block enter key so that exp doesn't start from beginning when entering answer
    $('#stage').keypress(function(event) {
        if (event.keyCode == 13) {
        event.preventDefault();
        }
        });
    $('#endbutton').click(function() {
		var lang = $('#langBox').val();
        var comment = $('#commentBox').val();
		if (lang == '') {
			$('#langError').show();
		} else {
			data.language = lang;
            data.comment = comment;
			showSlide('finish');
			setTimeout(function() { turk.submit(data)}, 1000);
		};
	});
});

function showSlide (slideName) {
    $('.slide').hide();
    $('#' + slideName).show();
}


function stepExperiment () {
    if (items.length == 0) { // end the experiment, !! number must count down item variable!
        $('#langError').hide();
		showSlide('langInfo');
    } else { 
        trialnum += 1;
        var trialdata = {
            trialnum: trialnum
        };
    
        var random_numb = getRandomInt(8,15); //8 included, 15 excluded
        trialdata.amount = random_numb;
        var part = partitive
        trialdata.partitive = part;
     
        var item = items.shift();
        
        var context = item.context; 
     //var stim = item.level does not work here since no key in item is labelled "level". If this is to work, then need to define it earlier
        var quest = item.question;
        var topic = item.topic; //save topic of sentence for easier data evaluation
            trialdata.topic = topic;
            
            //trialdata.stimulus = begin +" "+random_numb+" " + end + stim + quest; 
        trialdata.context = context;

        trialdata.quest = quest;
        
        $('#context').html(trialdata.context);
        $('#question').html(trialdata.quest);
        //$('#currentStim').html(trialdata.stimulus);
            // then, write it into 'currentStim' HTML placeholder
        $('#itemError').hide();
        showSlide('stage'); 
            // reveal the result to participant
        //block enter eky
        $('#continue').click(function() {
            response = $('#responseForm').serialize();
            if (answer.value != "") { 
                    // check for valid answer, take textbox-id ="answer"
                $("#continue").unbind('click');
                    // make continue button available for re-use 
                $('#answer').attr("value", "");
                //$('#answer').val('');
                
                    // ensure response options unticked next time
                trialdata.response = response;
                    // record response
                //data['trial' + trialnum] = trialdata;
                data.trials.push(JSON.parse(JSON.stringify(trialdata))); //push modifies list and adds (...), JSON clone makes sure that objects are not updated every time
                    // write trial data into global data object
                stepExperiment();
                    // go to next trial
            }
            else {$('#itemError').show();};
        });
    }
}


function shuffle(v) { // non-destructive.
    newarray = v.slice(0);
    for (var j, x, i = newarray.length; i; j = parseInt(Math.random() * i), x = newarray[--i], newarray[i] = newarray[j], newarray[j] = x);
    return newarray;
}

function chooseRandom(list) {
    return list[Math.floor(Math.random() * list.length)];
    
}