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
   {"context": 'There were __ muffins on the kitchen table in Ed\'s flat.', 
     "N_low": '9',
     "N_high": '12',
     "high": 'Ed, who arrived feeling hungry, ate many __ muffins.', 
     "low": "Ed, who arrived feeling full, ate many __ muffins.",
     "question":'How many __ muffins do you think Ed ate?',
     "event": 'dependent',
     "topic": 'muffins'}, 
    
    {"context": "Carla won __ vouchers for rollercoaster rides on a fair.", 
     "N_low": '9',
     "N_high": '12',
     "high":"Carla, who is an adventurous person, used many __ vouchers.",
     "low": "Carla, who is a fearful person, used many __ vouchers.",
     "question":"How many __ vouchers do you think Carla used?",
     "event": 'dependent',
     "topic":"vouchers"},
    
    {"context": "Bruno played __ tennis matches last season.", 
     "N_low": '12',
     "N_high": '16',
     "high":"Bruno, who is an unathletic person, lost many __ matches.",
     "low": "Bruno, who is a fit person, lost many __ matches.",
     "question":"How many __ matches do you think Bruno lost?",
     "event": 'dependent',
     "topic":"tennis"},
    
    {"context": "When moving to a new flat, Martha packed __ boxes.", 
     "N_low": '15',
     "N_high": '20',
     "high":"Martha, who is a strong woman, carried many __ boxes herself.",
     "low": "Martha, who is a weak woman, carried many __ boxes herself.",
     "question":"How many __boxes do you think Martha carried?",
     "event": 'dependent',
     "topic":"boxes"},
    
    {"context": "Melanie had to choose which among __ pairs of shoes to bring on holiday.",
     "N_low": '9',
     "N_high": '12',
     "high":"Melanie, who loves fashion, packed many __ pairs of shoes.",
     "low": "Melanie, who doesn't care about fashion, packed many __ pairs of shoes.",
     "question":"How many __ pairs of shoes do you think Melanie packed?",
     "event": 'dependent',
     "topic":"shoes"},
        
    {"context": "For a memory test __ three-digit numbers were read out to Chris.", 
     "N_low": '9',
     "N_high": '12',
     "high":"Chris, who has a great memory, memorized many __ numbers.",
     "low": "Chris, who has a bad memory, memorized many __ numbers.",
     "question":"How many __ numbers do you think Chris memorized?",
     "event": 'dependent',
     "topic":"memory"},
            
    {"context": "Jim had __ trees in his garden.", 
     "N_low": '15',
     "N_high": '20',
     "high":"Jim, who is a strong man, cut down many __ trees.",
     "low": "Jim, who is a weak man, cut down many __ trees.",
     "question":"How many __ trees do you think Jim cut down?",
     "event": 'dependent',
     "topic":"trees"},
        
    {"context": "On a camping trip __ tents had to be put up.",
     "N_low": '15',
     "N_high": '20',
     "high":"Dave, who loves camping, pitched many __ tents.",
     "low": "Dave, who doesn't like camping, pitched many __ tents.",
     "question":"How many __ tents do you think Dave pitched?",
     "event": 'dependent',
     "topic":"tents"},
    
    {"context":'Alex took part in a basketball competition and was allowed __ shots from the three-point line.',
     "N_low": '9',
     "N_high": '12',
     "high":'Alex, who is a professional player, made many __ shots.',
    "low": 'Alex, who is an amateur player, made many __ shots.',
    "question":'How many __ shots do you think Alex made?',
     "event": 'independent',
    "topic":'basketball'},
    
    {"context": "A football coach named Max invited __ boys to come to practice training.", 
     "N_low": '12',
     "N_high": '16',
     "high":"Max, who is an easy-going coach, allowed many __ boys to come back in the next week.",
     "low": "Max, who is a strict coach, allowed many __ boys to come back in the next week.",
     "question":"How many __ boys do you think were allowed to come back in the next week?",
     "event": 'independent',
     "topic":"training"},
    
    {"context": "Jimmy jumped onto grandma's old slatted bed frame which only had __ slats left.", 
     "N_low": '18',
     "N_high": '24',
     "high":"Jimmy, who is a fat boy, broke many __ slats.",
     "low": "Jimmy, who is a skinny boy, broke many __ slats.",
     "question":"How many __ slats do you think Jimmy broke?",
     "event": 'independent',
     "topic":"slats"},
    
    {"context": "In a music quiz the beginnings of __ pop songs were played.", 
     "N_low": '9',
     "N_high": '12',
     "high":"Heidi, who loves pop songs, recognized many __ songs.",
     "low": "Heidi, who hates pop songs, recognized many __ songs.",
     "question":"How many __ songs do you think Heidi recognized?",
     "event": 'independent',
     "topic":"songs"},
    
    {"context": "__ people attended the late-night performance in a small cinema.", 
     "N_low": '30',
     "N_high": '40',
     "high":"At the end of the movie, which was very boring, many __ people had fallen asleep.",
     "low": "At the end of the movie, which was very exciting, many __ people had fallen asleep.",
     "question":"How many __ people do you think fell asleep?",
     "event": 'independent',
     "topic":"cinema"},
    
    {"context": "Walter is a door-to-door salesman. Yesterday he presented a vacuum cleaner in __ households.", 
     "N_low": '18',
     "N_high": '24',
     "high":"Walter, who offered his product at a low price, sold a vacuum cleaner to many __ households.",
     "low": "Walter, who offered his product at a high price, sold a vacuum cleaner to many __ households.",
     "question":"To how many __ households do you think Walter sold a vacuum cleaner?",
     "event": 'independent',
     "topic":"vacuum_cleaner"},
    
    {"context": "Deborah bought __ tickets in a raffle.", 
     "N_low": '9',
     "N_high": '12',
     "high":"Many __ tickets bought by Deborah, who is always lucky, were winning tickets.",
     "low": "Many __ tickets bought by Deborah, who is never lucky, were winning tickets.",
     "question":"How many __ tickets that Deborah bought do you think were winning tickets?",
     "event": 'independent',
     "topic":"raffle"},
    
    {"context": "A math teacher presented a tricky problem to the __ students in his course.", 
     "N_low": '18',
     "N_high": '24',
     "high":"Many __ students in his course, who all got good grades in the last test, could solve the problem.",
     "low": "Many __ students in his course, who all got bad grades in the last test, could solve the problem.",
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
        //get number in context
        var number = shuffle(["N_low", "N_high"])[0]; //randomly decide whether low or high number in context, vector count starts with 0
        trialdata.number = number;
        var amount = item[number];
        trialdata.amount = amount;
         //get level
        var level = shuffle(["low", "high"])[0]; //randomly decide whether low or high probability, vector count starts with 0
        trialdata.level = level;
        
        var context = item.context; 
        var context_elements = context.split("__"); //split context at __
        var beginning_context = context_elements[0];
        var end_context = context_elements.length > 1 ? context_elements[1] : "";
        //console.log(item); in eg Chrome console value of variable is shown, helps debugging
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
        trialdata.context = beginning_context +" "+amount+" " + end_context;

           if (part == 0){
        trialdata.cause = beginning_stim + " " + end_stim;
        trialdata.quest = beginning_quest+ " " +end_quest;
        }
        else if (part ==1) {
        trialdata.cause = beginning_stim + " of the " + end_stim;
        trialdata.quest = beginning_quest+ " of the " +end_quest;
        }
        
        $('#context').html(trialdata.context);
        $('#cause').html(trialdata.cause);
        $('#question').html(trialdata.quest);
        //$('#currentStim').html(trialdata.stimulus);
            // then, write it into 'currentStim' HTML placeholder
        $('#itemError').hide();
        $('#item_number').html(trialdata.trialnum);
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