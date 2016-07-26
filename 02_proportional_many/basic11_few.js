// study on proportional "many" or "many of the"
// decide randomly at the beginning whether items are with "many" or partitive
// partitive = 0 "many", partitive = 1 "many of the"

//contains 16 items and different numbers context between 8 and 14
//each participant see each context, low or high probability sentences are assigned randomly

//design adjusted from Judith's sinking marbles

//variables to be saved: language, comment; per trial#: trialnum, condition, amount, item, topic, response, stimulus, 


// Cocolab funcion
// Returns a random integer between min (included) and max (excluded)
// Using Math.round() will give you a non-uniform distribution!
function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

//var numb = shuffle([10, 11, 12, 14, 10, 11, 12, 14, 10, 11, 12, 14,10, 11, 12, 14]); //must equal number of items!!

var items = shuffle([
   {"context": 'There were 12 muffins on the kitchen table in Ed\'s flat.',
     "amount": "12",
     "quantifier": "few",
     "high": 'Ed, who arrived feeling hungry, ate few __ muffins.', 
     "low": "Ed, who arrived feeling full, ate few __ muffins.",
     "question":'How many __ muffins do you think Ed ate?',
     "event": 'dependent',
     "topic": 'muffins'}, 
    
    {"context": "Carla won 12 vouchers for rollercoaster rides on a fair.", 
     "amount": '12',
     "quantifier": "few",
     "high":"Carla, who is an adventurous person, used few __ vouchers.",
     "low": "Carla, who is a fearful person, used few __ vouchers.",
     "question":"How many __ vouchers do you think Carla used?",
     "event": 'dependent',
     "topic":"vouchers"},
    
    {"context": "Bruno played 12 tennis matches last season.", 
     "amount": '12',
     "quantifier": "few",
     "high":"Bruno, who is an unathletic person, lost few __ matches.",
     "low": "Bruno, who is a fit person, lost few __ matches.",
     "question":"How many __ matches do you think Bruno lost?",
     "event": 'dependent',
     "topic":"tennis"},
    
    {"context": "When moving to a new flat, Martha packed 15 boxes.", 
     "amount": "15",
     "quantifier": "few",
     "high":"Martha, who is a strong woman, carried few __ boxes herself.",
     "low": "Martha, who is a weak woman, carried few __ boxes herself.",
     "question":"How many __boxes do you think Martha carried?",
     "event": 'dependent',
     "topic":"boxes"},
    
    {"context": "Melanie had to choose which among 12 pairs of shoes to bring on holiday.",
     "amount": '12',
     "quantifier": "few",
     "high":"Melanie, who loves fashion, packed few __ pairs of shoes.",
     "low": "Melanie, who doesn't care about fashion, packed few __ pairs of shoes.",
     "question":"How many __ pairs of shoes do you think Melanie packed?",
     "event": 'dependent',
     "topic":"shoes"},
        
    {"context": "For a memory test 9 three-digit numbers were read out to Chris.", 
     "amount": '9',
     "quantifier": "few",
     "high":"Chris, who has a great memory, memorized few __ numbers.",
     "low": "Chris, who has a bad memory, memorized few __ numbers.",
     "question":"How many __ numbers do you think Chris memorized?",
     "event": 'dependent',
     "topic":"memory"},
            
    {"context": "Jim had 15 trees in his garden.", 
     "amount": '15',
     "quantifier": "few",
     "high":"Jim, who is a strong man, cut down few __ trees.",
     "low": "Jim, who is a weak man, cut down few __ trees.",
     "question":"How many __ trees do you think Jim cut down?",
     "event": 'dependent',
     "topic":"trees"},
        
    {"context":'Alex took part in a basketball competition and was allowed 9 shots from the three-point line.',
     "amount": '9',
     "quantifier": "few",
     "high":'Alex, who is a professional player, made few __ shots.',
    "low": 'Alex, who is an amateur player, made few __ shots.',
    "question":'How many __ shots do you think Alex made?',
     "event": 'independent',
    "topic":'basketball'},
    
    {"context": "In a music quiz the beginnings of 9 pop songs were played.", 
     "amount": '9',
     "quantifier": "few",
     "high":"Heidi, who loves pop songs, recognized few __ songs.",
     "low": "Heidi, who hates pop songs, recognized few __ songs.",
     "question":"How many __ songs do you think Heidi recognized?",
     "event": 'independent',
     "topic":"songs"},
    
    {"context": "A math teacher presented a tricky problem to the 24 students in his course.", 
     "amount": '24',
     "quantifier": "few",
     "high":"Few __ students in his course, which focuses on problem-solving strategies, could solve the problem.",
     "low": "Few __ students in his course, which does not teach problem-solving strategies, could solve the problem.",
     "question":"How many __ students do you think could solve the problem?",
     "event": 'independent',
     "topic":"math"},
    
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
    
        var part = partitive
        trialdata.partitive = part;
     
        var item = items.shift();
        //trialdata.item = item
         //get level
        var level = shuffle(["low", "high"])[0]; //randomly decide whether low or high probability, vector count starts with 0
        trialdata.level = level;
        
       
        var stim = item[level];
        var stim_elements = stim.split("__"); //split context at __
        var beginning_stim = stim_elements[0];
        var end_stim = stim_elements.length > 1 ? stim_elements[1] : "";
        //var stim = item.level does not work here since no key in item is labelled "level". If this is to work, then need to define it earlier
        var quest = item.question;
        var quest_elements = quest.split("__"); //split context at __
        var beginning_quest = quest_elements[0];
        var end_quest = quest_elements.length > 1 ? quest_elements[1] : "";
        var topic = item.topic; //save topic of sentence for easier data evaluation
            trialdata.topic = topic;
        var event = item.event; //save topic of sentence for easier data evaluation
            trialdata.event = event;
            
            //trialdata.stimulus = begin +" "+random_numb+" " + end + stim + quest; 
        trialdata.context = item.context;
        trialdata.amount = item.amount;

           if (part == 0){
        trialdata.cause = beginning_stim + " " + end_stim;
        trialdata.quest = beginning_quest+ " " +end_quest;
        }
        else if (part ==1) {
        trialdata.cause = beginning_stim + " of the " + end_stim;
        trialdata.quest = beginning_quest+ " of the " +end_quest;
        }
        
        $('#context').html(item.context);
        $('#cause').html(trialdata.cause);
        $('#question').html(trialdata.quest);
        //$('#currentStim').html(trialdata.stimulus);
            // then, write it into 'currentStim' HTML placeholder
        $('#itemError').hide();
        $('#item_number').html(trialdata.trialnum);
        console.log("amount " +item.amount);
        showSlide('stage'); 
            // reveal the result to participant
        //block enter eky
        $('#continue').click(function() {
            response = $('#responseForm').serialize();
            if (answer.value != "" & answer.value < Number(item.amount)+1) { 
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