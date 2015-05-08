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
    {"context": 'There were __ muffins on the kitchen table in Kim\'s flat.', 
     "high": 'Kim, who is a hungry sumo wrestler, ate many __ muffins.', 
     "low": "Kim, who is a tiny ballet dancer, ate many __ muffins.",
     "question":'How many __ muffins do you think Kim ate?',
     "topic": 'muffins'},     
    
    {"context": 'For __ home matches of the Dallas Mavericks tickets were still available.',
    "high":'Thomas, who is a rich Mavericks fan, bought tickets for many __ matches.',
     "low": "Thomas, who is broke and does not care much about sports, bought tickets for many __ matches.",
     "question":'For how many __ matches do you think Thomas bought tickets?',
    "topic":'tickets'},
    
    {"context": 'Joe got a pack of cigarettes in which __ cigarettes were left.', 
     "high":'Joe, who is a chain smoker, smoked many __ cigarettes in one hour.',
     "low": 'Joe, who is a social smoker, smoked many __ cigarettes in one hour.',
     "question":'How many __ cigarettes do you think Joe smoked?',
     "topic":'cigarettes'},
    
        {"context":'Alex took part in a basketball competition and was allowed __ shots from the three-point line.',
     "high":'Alex, who is a passionate basketball player, scored many __ shots.',
    "low": 'Alex, who is a middle-aged housewife, scored many __ shots.',
    "question":'How many __ shots do you think Alex scored?',
    "topic":'basketball'},
    
    {"context": "In a garage sale __ books about the Second World War were offered.", 
     "high":"Robert, who is a history student, bought many __ books.",
     "low": "Robert, who is a construction worker, bought many __ books.",
     "question":"How many __ books do you think Robert bought?",
     "topic":"books"},
    
    {"context": "There were __ candles on grandpa\'s birthday cake.", 
     "high":"Greg, who is his teenage grandson, blew out many __ candles at once",
     "low": "Greg, who is the asthmatic, eighty year-old grandpa, blew out many __ candles at once.",
     "question":"How many __ candles do you think Greg blew out?",
     "topic":"candles"},
    
    {"context": "Bruno played __ tennis matches in a tournament.", 
     "high":"Bruno, who is a professional player, lost many __ matches.",
     "low": "Bruno, who is a beginner, lost many __ matches.",
     "question":"How many __ matches do you think Bruno lost?",
     "topic":"tennis"},
    
    {"context": "Among __ pairs of shoes Melanie had to choose which ones to pack for a holiday.", 
     "high":"Melanie, who is a party girl, packed many __ pairs of shoes.",
     "low": "Melanie, who is a backpacker, packed many __ pairs of shoes.",
     "question":"How many __ pairs of shoes do you think Melanie packed?",
     "topic":"shoes"},
    
    {"context": "Football coach Max invited __ boys to come to practice training.", 
     "high":"Max, who is a generous man, allowed many __ boys to come back in the next week.",
     "low": "Max, who is a grumpy perfectionist, allowed many __ boys to come back in the next week.",
     "question":"How many __ boys do you think were allowed to come back in the next week?",
     "topic":"training"},
    
    {"context": "On a camping trip __ tents had to be put up.", 
     "high":"Dave, who is a camping fan, pitched many __ tents.",
     "low": "Dave, who is a city dweller, pitched many __ tents.",
     "question":"How many __ tents do you think Dave pitched?",
     "topic":"tents"},
    
    {"context": "Derek received __ texts for his birthday.", 
     "high":"Derek, who is a phone-addicted teenager, replied to many __ texts.",
     "low": "Derek, who is an uncommunicative senior, replied to many __ texts.",
     "question":"How many __ texts do you think Derek replied to?",
     "topic":"texts"},
    
    {"context": "Jim had __ trees in his garden.", 
     "high":"Jim, who is allergic to all sorts of pollen, cut down many __ trees.",
     "low": "Jim, who is a nature lover, cut down many __ trees.",
     "question":"How many __ trees do you think Jim cut down?",
     "topic":"trees"},
    
    {"context": "For a memory test __ three-digit numbers were read out to Chris.", 
     "high":"Chris, who is highly-talented student, memorized many __ numbers.",
     "low": "Chris, who is an old man suffering from dementia, memorized many __ numbers.",
     "question":"How many __ numbers do you think Chris memorized?",
     "topic":"memory"},
    
    {"context": "When moving flat, Martha packed __ boxes.", 
     "high":"Martha, who is a professional wrestler, carried many __ boxes herself.",
     "low": "Martha, who is a tiny woman, carried many __ boxes herself.",
     "question":"How many __boxes do you think Martha carried?",
     "topic":"boxes"},
    
    {"context": "Carla won __ vouchers for rollercoaster rides on a fair.", 
     "high":"Carla, who is a rollercoaster fan, used many __ vouchers.",
     "low": "Carla, who is a nervous wreck, used many __ vouchers.",
     "question":"How many __ vouchers do you think Carla used?",
     "topic":"vouchers"},
    
    {"context": "Christina blew up __ balloons for Mike\'s birthday.", 
     "high":"Mike, who is a six year-old, jumped on many __ balloons and popped them.",
     "low": "Mike, who is a sixty year-old, jumped on many __ balloons and popped them.",
     "question":"How many __ balloons do you think Mike popped?",
     "topic":"balloons"}
    
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
        //trialdata.item = item
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
            
            //trialdata.stimulus = begin +" "+random_numb+" " + end + stim + quest; 
        trialdata.context = beginning_context +" "+random_numb+" " + end_context;

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