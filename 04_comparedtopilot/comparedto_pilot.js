// study on the acceptance (simulating production) of "compared to" in comination with "many" or "tall, long, expensive"

//contains 7 items in three conditions (different nouns with corresponding different priors) and different numbers pairs  {5,8}, {12,15}, {12,19}
//each participant see each item, noun and number pair are assigned ramdomly

//design adjusted from Judith's sinking marbles

//variables to be saved: language, comment; per trial#: trialnum, topic, noun amount, number condition, item, response, plausible_low, plausible_high {are the numbers presented a plausible quantity for the noun)


// Cocolab funcion
// Returns a random integer between min (included) and max (excluded)
// Using Math.round() will give you a non-uniform distribution!
function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

//var numb = shuffle([10, 11, 12, 14, 10, 11, 12, 14, 10, 11, 12, 14,10, 11, 12, 14]); //must equal number of items!!

var items = shuffle([
   {"prior_low": 'Harry and Joe are men from the US. Yesterday, Harry ate __ burgers and Joe ate __ burgers.',
     "prior_middle": 'Harry and Joe are men from the US. Yesterday, Harry ate __ M&Ms and Joe ate __ M&Ms.',
     "prior_high": 'Harry and Joe are men from the US. Yesterday, Harry ate __ cornflakes and Joe ate __ cornflakes.',
     "N_low": ['5', '8'],
     "N_high": ['12', '15'],
     "N_Weber": ['12', '19'],
     "noun_low": 'burgers',
     "noun_middle": 'M&Ms',    
     "noun_high": 'cornflakes',
     "comparedto":'Compared to Harry, Joe ate many __.',
    "plausLow": 'Is it plausible that Harry ate __ __?',
     "plausHigh": 'Is it plausible that Joe ate __ __?',
     "predicate": 'many',
     "topic": 'food'}, 
    
    {"prior_low": 'Chris and Martin are men from the US. Martin has __ siblings and Chris has __ siblings.',
     "prior_middle": 'Chris and Martin are men from the US. Martin has __ friends and Chris has __ friends.',
     "prior_high": 'Chris and Martin are men from the US. Martin has __ Facebook friends and Chris has __ Facebook friends.',
     "N_low": ['5', '8'],
     "N_high": ['12', '15'],
     "N_Weber": ['12', '19'],
     "noun_low": 'siblings',
     "noun_middle": 'friends',    
     "noun_high": 'Facebook friends',
     "comparedto":'Compared to Martin, Chris has many __.',
     "plausLow": 'Is it plausible that Martin has __ __?',
     "plausHigh": 'Is it plausible that Chris has __ __?',
     "predicate": 'many',
     "topic": 'relations'}, 
    
    {"prior_low": 'Melanie and Barbara are women from the US. Yesterday, Melanie bought __ pairs of shoes and Barbara bought __ pairs of shoes.',
     "prior_middle": 'Melanie and Barbara are women from the US. Yesterday, Melanie bought __ apples and Barbara bought __ apples.',
     "prior_high": 'Melanie and Barbara are women from the US. Yesterday, Melanie bought __ tissues and Barbara bought __ tissues.',
     "N_low": ['5', '8'],
     "N_high": ['12', '15'],
     "N_Weber": ['12', '19'],
     "noun_low": 'pairs of shoes',
     "noun_middle": 'apples',    
     "noun_high": 'tissues',
     "comparedto":'Compared to Melanie, Barbara bought many __.',
     "plausLow": 'Is it plausible that Melanie bought __ __?',
     "plausHigh": 'Is it plausible that Barbara bought __ __?',
     "predicate": 'many',
     "topic": 'buy'}, 
    
      {"prior_low": '"The Forest" and "Describing the World" are storybooks published in the USA. "The Forest" has __ pages and "Describing the World" has __ pages.',
     "prior_middle": '"The Forest" and "Describing the World" are novels published in the USA. "The Forest" has __ pages and "Describing the World" has __ pages.',
     "prior_high": '"The Forest" and "Describing the World" are encyclopedias published in the USA. "The Forest" has __ pages and "Describing the World" has __ pages.',
     "N_low": ['74', '118'],
     "N_high": ['138', '182'],
     "N_Weber": ['138', '220'],
     "noun_low": 'storybook',
     "noun_middle": 'novel',    
     "noun_high": 'encyclopedia',
     "comparedto":'Compared to "The Forest", "Describing the World"  has many pages.',
      "plausLow": 'Is __ a plausible number of pages for a __?',
     "plausHigh": 'Is __ a plausible number of pages for a __?',
     "predicate": 'many',
     "topic": 'books'}, 
    
     {"prior_low": 'Kevin and Paul are gymnasts from the US. Kevin is __ tall and Paul is __ tall.',
     "prior_middle": 'Kevin and Paul are men from the US. Kevin is __ tall and Paul is __ tall.',
     "prior_high": 'Kevin and Paul are basketball players from the US. Kevin is __ tall and Paul is __ tall.',
     "N_low": ['5ft 7in', '5ft 10in'],
     "N_high": ['6ft', '6ft 3in'],
     "N_Weber": ['6ft', '6ft 4in'],
     "noun_low": 'gymnast',
     "noun_middle": 'US male',    
     "noun_high": 'basketball player',
     "comparedto":'Compared to Kevin, Paul is tall.',
    "plausLow": 'Is __ a plausible height for a __?',
     "plausHigh": 'Is __ a plausible height for a __?',
     "predicate": 'tall',
     "topic": 'height'}, 
    
      {"prior_low": 'Martha and Emily are women from the US. They went shopping yesterday. Martha bought a loaf of white bread for __ $ and Emily bought a loaf of white bread for __ $.',
     "prior_middle": 'Martha and Emily are women from the US. They went shopping yesterday. Martha bought a bottle of wine for __ $ and Emily bought a bottle of wine for __ $.',
     "prior_high": 'Martha and Emily are women from the US. They went shopping yesterday. Martha bought a pair of running shoes for __ $ and Emily bought a pair of running shoes for __ $.',
     "N_low": ['5', '8'],
     "N_high": ['12', '15'],
     "N_Weber": ['12', '19'],
     "noun_low": 'loaf of white bread',
     "noun_middle": 'bottle of wine',    
     "noun_high": 'pair of running shoes',
     "comparedto":'Compared to Martha__, Emily__ was expensive.',
    "plausLow": 'Is it plausible that __$ is the price of a __?',
     "plausHigh": 'Is it plausible that __$ is the price of a __?',
    "predicate": 'expensive',
     "topic": 'cost'}, 
    
     {"prior_low": 'Anna and Sue are women from the US. Yesterday, Anna listened to a song which was __ minutes long and Sue listened to a song which was __ minutes long.',
     "prior_middle": 'Anna and Sue are women from the US. Yesterday, Anna watched a newscast which was __ minutes long and Sue watched a newscast which was __ minutes long.',
     "prior_high": 'Anna and Sue are women from the US. Yesterday, Anna watched a movie which was __ minutes long and Sue watched a movie which was __ minutes long.',
     "N_low": ['5', '8'],
     "N_high": ['12', '15'],
     "N_Weber": ['12', '19'],
     "noun_low": 'song',
     "noun_middle": 'newscast',    
     "noun_high": 'movie',
     "comparedto":'Compared to Anna__, Sue__ was long.',
     "plausLow": 'Are __ minutes a plausible length for a __ ?',
     "plausHigh": 'Are __ minutes a plausible length for a __ ?', 
     "predicate": 'long',
     "topic": 'length'}, 
    
  /*   {"prior_low": '',
     "prior_middle": '',
     "prior_high": '',
     "N_low": ['5', '8'],
     "N_high": ['12', '15'],
     "N_Weber": ['12', '19'],
     "noun_low": '',
     "noun_middle": '',    
     "noun_high": '',
     "comparedto":'Compared to ,  has many __.',
     "predicate": 'many',
     "topic": ''}, */

    
]);

//if on condition is same across all items, set here

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
    
        var item = items.shift();
        //trialdata.item = item
        //get number in context
        var number = shuffle(["N_low", "N_high", "N_Weber"])[0]; //randomly decide whether low, high (same distance as low, or high_weber (same ration between numbers as low) number in context, vector count starts with 0
        trialdata.number = number;
        var amount = item[number];
        trialdata.amount = amount;
        var amount_low = amount[0];
        var amount_high = amount[1];
        
        //get level
        var level = shuffle(["prior_low", "prior_middle", "prior_high"])[0]; //randomly decide whether low or high probability, vector count starts with 0
        var priorlevel = item[level];
        
        trialdata.priorlevel = priorlevel;
                
        var context_elements = priorlevel.split("__"); //split context at __
        var beginning_context = context_elements[0];
        var middle_context = context_elements[1];
        var end_context = context_elements.length > 2 ? context_elements[2] : "";
        //console.log(item); in eg Chrome console value of variable is shown, helps debugging
        
        // choose matching noun to priorlevel
        var nouns = ["noun_low", "noun_middle", "noun_high"]
        console.log(nouns)
        
        if (level == "prior_low") {
            var noun_temp = nouns[0];
        } else if (level == "prior_middle") {
            var noun_temp = nouns[1];
        } else {
            var noun_temp = nouns[2];
        } ;
        
       console.log(noun_temp) 
 /*         var noun_temp =   if (priorlevel == "prior_low") {
            nouns[0];
        } else if (priorlevel == "prior_middle") {
            nouns[1];
        } else {
            nouns[2];
        } ; */
        
       var noun = item[noun_temp];
         //console.log(noun);
        
        trialdata.noun = noun;
        
        //compared to sentence
        var stim = item.comparedto;
        var stim_elements = stim.split("__"); //split context at __
        var beginning_stim = stim_elements[0];
        var middle_stim = stim_elements.length > 1 ? stim_elements[1] : "";
        var end_stim = stim_elements.length > 2 ? stim_elements[2] : "";
        
        
        //var stim = item.level does not work here since no key in item is labelled "level". If this is to work, then need to define it earlier
        var topic = item.topic; //save topic of sentence for easier data evaluation
            trialdata.topic = topic;
        var predicate = item.predicate; //save gradable predicate of sentence for easier data evaluation
            trialdata.predicate = predicate;
            
            //trialdata.stimulus = begin +" "+random_numb+" " + end + stim + quest; 
        trialdata.context = beginning_context +" "+amount_low+" "+middle_context+" "+amount_high+" "  + end_context;
        if (stim_elements.length == 1){
       trialdata.cause = beginning_stim ;}
         else  if (stim_elements.length == 2){
       trialdata.cause = beginning_stim + " "+noun+" " + middle_stim;}
        else {trialdata.cause = beginning_stim + "'s "+noun + middle_stim + "'s "+noun+" " +end_stim;} ;
 //        trialdata.cause = "compared to";
        
        //plausibility questions
        
        var PlausLow = item.plausLow;
        var PlausLow_elements = PlausLow.split("__");
        var beginning_PlausLow = PlausLow_elements[0];
        var middle_PlausLow = PlausLow_elements.length > 1 ? PlausLow_elements[1] : "";
        var end_PlausLow = PlausLow_elements.length > 2 ? PlausLow_elements[2] : "";
        if (PlausLow_elements.length == 3) {
        trialdata.checkPlausLow = beginning_PlausLow+" "+amount_low+" "+middle_PlausLow+" "+noun+end_PlausLow; }
        else if (PlausLow_elements.length == 2){
            trialdata.checkPlausLow = beginning_PlausLow+" "+amount_low+" "+middle_PlausLow;}
        else {trialdata.checkPlausLow = '';};
        
        var PlausHigh = item.plausHigh;
        var PlausHigh_elements = PlausHigh.split("__");
        console.log(PlausHigh_elements);
        var beginning_PlausHigh = PlausHigh_elements[0];
        var middle_PlausHigh = PlausHigh_elements[1];
        var end_PlausHigh = PlausHigh_elements.length > 2 ? PlausHigh_elements[2] : "";
        if (PlausHigh_elements.length == 3) {
        trialdata.checkPlausHigh = beginning_PlausHigh+" "+amount_high+" "+middle_PlausHigh+" "+noun+end_PlausHigh; }
        else if (PlausHigh_elements.length == 2){
            trialdata.checkPlausHigh = beginning_PlausHigh+" "+amount_high+" "+middle_PlausHigh;}
        else {trialdata.checkPlausHigh = '';};
           
        $('#context').html(trialdata.context);
        $('#cause').html(trialdata.cause);
        $('#checkPlausLow').html(trialdata.checkPlausLow);
        $('#checkPlausHigh').html(trialdata.checkPlausHigh);
        
        //$('#currentStim').html(trialdata.stimulus);
            // then, write it into 'currentStim' HTML placeholder
        $('#itemError').hide();
        $('#item_number').html(trialdata.trialnum);
        showSlide('stage'); 
            // reveal the result to participant
        //block enter key
        $('#continue').click(function() {
            //collect input from data forms (radio button)
            response = $('#responseForm').serialize();  //#responseForm is id of paragraph containing form
            plauslow = $('#checkLow').serialize();
            plaushigh = $('#checkHigh').serialize();
           // console.log(plauslow)
           // if (answer.value != "" ) { 
            //make sure all forms are checked
           if (response.length > 0 & plauslow.length > 0  & plaushigh.length > 0 ) { 
            // if (answer.checked & plausible_low.checked & plausible_high.checked ) { 
            //if (answer.value != "" & plausible_low.value != "" & plausible_high.value != "" ) { 
                    // check for valid answer, take radio-id ="answer"
                $("#continue").unbind('click');
                    // make continue button available for re-use 
                //reset radio buttons
                // name is name of input
            $('input[name=answer]').attr('checked',false);
            $('input[name=plausible_low]').attr('checked',false);  
            $('input[name=plausible_high]').attr('checked',false);  
            //    $('#answer').attr("value", "");
            //    $('#answer').val('');
                    // ensure response options unticked next time
                
                trialdata.response = response; //safe input from data forms (radio button
                trialdata.plauslow = plauslow;
                trialdata.plaushigh = plaushigh;
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