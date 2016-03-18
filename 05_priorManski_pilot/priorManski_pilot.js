// study on the acceptance (simulating production) of "compared to" in comination with "many" or "tall, long, expensive"

//contains 7 items in three conditions (different nouns with corresponding different priors) and different numbers pairs  {5,8}, {12,15}, {12,19}
//each participant see each item, noun and number pair are assigned ramdomly

//design adjusted from Judith's sinking marbles

//variables to be saved:

//to do
// control enter key, jumps back to beginning when pressed
// num25, num50, num75 are not calculated properly
//error messages, max must be higher than min, if not, alert
//percent chances must be in ascending order. If one answer is 100, don't ask for other guesses


// Cocolab funcion
// Returns a random integer between min (included) and max (excluded)
// Using Math.round() will give you a non-uniform distribution!
function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

//check whether input is numeric
function IsNumeric(n) {
    return !isNaN(n);
} 

//var numb = shuffle([10, 11, 12, 14, 10, 11, 12, 14, 10, 11, 12, 14,10, 11, 12, 14]); //must equal number of items!!

var items = shuffle([
    
    {"context": 'Joe is a man from the US.',
    "question": "How many __ do you think Joe ate last month?",
     "noun": 'burgers',
     "level_noun": 'middle',
     "Qlikely":'Last month Joe probably ate __ __.',
     "Qmin": 'Last month Joe ate at least  __ __.',
     "Qmax": 'Last month Joe ate at most __ __.',
     "perc_chance": "number of __ Joe ate last month",
     "predicate": 'many',
     "topic": 'food'}, 
    
    {"context": 'Chris is a man from the US.',
     "question": "How many __ do you think Chris has?",
     "noun": 'friends',
     "level_noun": 'middle',
     "Qlikely":'Chris probably has __ __.',
     "Qmin": 'Chris has at least  __ __.',
     "Qmax": 'Chris has at most __ __.',
     "perc_chance": "number of __ Chris has",
     "predicate": 'many',
     "topic": 'relations'}, 
    
    {"context": 'Chris is a man from the US.',
     "question": "How many __ do you think Chris has?",
     "noun": 'Facebook friends',  
     "level_noun": 'high',
     "Qlikely":'Chris probably has __ __.',
     "Qmin": 'Chris has at least  __ __.',
     "Qmax": 'Chris has at most __ __.',
     "perc_chance": "number of __ Chris has",
     "predicate": 'many',
     "topic": 'relations'}, 
    
    {"context": 'Chris is a man from the US.',
     "question": "How many __ do you think Chris has?",
     "noun": 'children',  
     "level_noun": 'low',
     "Qlikely":'Chris probably has __ __.',
     "Qmin": 'Chris has at least  __ __.',
     "Qmax": 'Chris has at most __ __.',
     "perc_chance": "number of __ Chris has",
     "predicate": 'many',
     "topic": 'relations'}, 
    
     {"context": 'Anna is a woman from the US who discovered a new __ yesterday.',
    "question": "What do you think is the length in minutes of the __ ?",
     "noun": 'song',
      "level_noun": 'low',
     "Qlikely":'It was probably __ minutes long.',
     "Qmin": 'At least __ minutes was the length of the __.',
     "Qmax": 'At most __ minutes was the length of the __.',
     "perc_chance": "length in minutes of the __ ",
     "predicate": 'long',
     "topic": 'length'}, 
    
     {"context": 'Anna is a woman from the US who discovered a new __ yesterday.',
    "question": "What do you think is the length in minutes of the __ ?",
     "noun": 'movie',
     "level_noun": 'high',
     "Qlikely":'It was probably __ minutes long.',
     "Qmin": 'At least __ minutes was the length of the __.',
     "Qmax": 'At most __ minutes was the length of the __.',
     "perc_chance": "length in minutes of the __ ",
     "predicate": 'long',
     "topic": 'length'}, 
    
/*    {"context": 'Chris is a man from the US.',
     "question": "How many __ do you think Chris has?",
     "noun_low": 'siblings',
     "noun_middle": 'friends',    
     "noun_high": 'Facebook friends',
     "Qlikely":'Chris probably has __ __.',
     "Qmin": 'Chris has at least  __ __.',
     "Qmax": 'Chris has at most __ __.',
     "perc_chance": "number of __ Chris has",
     "predicate": 'many',
     "topic": 'relations'}, 
    
    {"context": 'Melanie is a woman from the US. ',
     "question": "How many __ do you think Melanie bought yesterday?",
     "noun_low": 'pairs of shoes',
     "noun_middle": 'apples',    
     "noun_high": 'tissues',
     "Qlikely":'Melanie probably bought __ __.',
     "Qmin": 'Melanie bought at least  __ __.',
     "Qmax": 'Melanie bought at most __ __.',
     "perc_chance": "number of __ Melanie bought",
     "predicate": 'many',
     "topic": 'buy'}, 
    
    {"context": 'Martha is a woman from the US.',
    "question": "What do you think is the price in dollars that Martha paid for a  __ yesterday?",
     "noun_low": 'loaf of white bread',
     "noun_middle": 'bottle of wine',    
     "noun_high": 'pair of running shoes',
     "Qlikely":'Martha probably paid __ dollars.',
     "Qmin": 'Martha paid at least __ dollars.',
     "Qmax": 'Martha paid at most __ dollars.',
    "perc_chance": "price in dollars of the __ ",
    "predicate": 'expensive',
     "topic": 'cost'},
    
    {"context": 'Anna is a woman from the US who discovered a new __ yesterday.',
    "question": "What do you think is the length in minutes of the __ ?",
     "noun_low": 'song',
     "noun_middle": 'newscast',    
     "noun_high": 'movie',
     "Qlikely":'It was probably __ minutes long.',
     "Qmin": 'At least __ minutes was the length of the __.',
     "Qmax": 'At most __ minutes was the length of the __.',
     "perc_chance": "length in minutes of the __ ",
     "predicate": 'long',
     "topic": 'length'}, */
    
/*       
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
 */

    
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
    //block enter key for every instance of class "slide" so that exp doesn't start from beginning when entering answer
    $('html').bind('keypress', function(e)
{
   if(e.keyCode == 13)
   {
      return false;
   }
});
/*    $('#stage', '#low', '#middle', '#high').keypress(function(event) {
        if (event.keyCode == 13) {
        event.defaultPrevented();
        }
        });
        $('#low').keypress(function(event) {
        if (event.keyCode == 13) {
        event.defaultPrevented();
        }
        });
        $('#middle').keypress(function(event) {
        if (event.keyCode == 13) {
        event.defaultPrevented();
        }
        });
        $('#high').keypress(function(event) {
        if (event.keyCode == 13) {
        event.preventDefault();
        }
        });*/
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
                
        //get noun
        //var nounlevel = shuffle(["noun_low", "noun_middle", "noun_high"])[0]; //randomly decide which noun, vector count starts with 0
        //var noun = item[nounlevel];
        var noun = item.noun;
        trialdata.noun = noun;
        var lev = item.level_noun;
        trialdata.level_noun = lev;
        var pred = item.predicate;
        trialdata.predicate = pred;
        var top = item.topic;
        trialdata.topic = top;
        
         //context sentence
        var cont = item.context
        var context_elements = cont.split("__"); //split context at __
        var beginning_context = context_elements[0];
        console.log(beginning_context)
        var middle_context = context_elements[1];
        console.log(middle_context)
        var end_context = context_elements.length > 2 ? context_elements[2] : "";
        //console.log(item); in eg Chrome console value of variable is shown, helps debugging
        if (context_elements.length == 1){
        trialdata.context = beginning_context;}
        else { trialdata.context = beginning_context + " "+noun+" " + middle_context ;};
        console.log(trialdata.context)
        
        //question
        var quest = item.question
        var quest_elements = quest.split("__"); //split context at __
        var beginning_quest = quest_elements[0];
        var middle_quest = quest_elements[1];
        var end_quest = quest_elements.length > 2 ? quest_elements[2] : "";
        //console.log(item); in eg Chrome console value of variable is shown, helps debugging
        if (quest_elements.length == 1){
        trialdata.question = beginning_quest;}
        else { trialdata.question = beginning_quest + " "+noun+" " + middle_quest ;};
            
        //Question most likely
        var Qlike = item.Qlikely
        var Qlike_elements = Qlike.split("__"); //split context at __
        var beginning_Qlike = Qlike_elements[0];
        trialdata.beginning_Qlike = beginning_Qlike;
        var middle_Qlike = Qlike_elements[1];
        var end_Qlike = Qlike_elements.length > 2 ? Qlike_elements[2] : "";
        //console.log(item); in eg Chrome console value of variable is shown, helps debugging
        if (Qlike_elements.length == 2){
         trialdata.Qlike1 = beginning_Qlike+" ";
         trialdata.Qlike2 = " "+middle_Qlike;
        }
        else { trialdata.Qlike1 = beginning_Qlike+" ";
              trialdata.Qlike2 = noun+" " + end_Qlike;
            };
        
        
       /* if (context_elements.length == 2){
        var liketemp = '${trialdata.beginning_Qlike} + <input type="text" name="likely" class='response' value="" id="likelyform" required/> + ${middle_Qlike}';
         trialdata.Qlike = liketemp;}
        else { trialdata.Qlike == '${beginning_Qlike} + <input type="text" name="likely" class='response' value="" id="likelyform" required/>  +${noun}+" " + ${end_Qlike}';};
        */
        
        //question for percent chances
        var perc_chance = item.perc_chance;
        var perc_elements = perc_chance.split("__"); //split context at __
        var beginning_perc = perc_elements[0];
        var middle_perc = perc_elements[1];
        var end_perc = perc_elements.length > 2 ? perc_elements[2] : "";
        
    //Questions for minimum and maximum number (after perc_chance because this will be used to build the questions    
        //Question minimum
        trialdata.Qmin1 = "The lowest possible "+beginning_perc +" "+noun + " " + middle_perc+" is ";
        trialdata.Qmin2 = " ";
        
        //Question maximum
        trialdata.Qmax1 = "The highest possible "+beginning_perc +" "+noun + " " + middle_perc+" is ";
        trialdata.Qmax2 = " ";
        
        /*var Qmini = item.Qmin
        var Qmini_elements = Qmini.split("__"); //split context at __
        var beginning_Qmini = Qmini_elements[0];
        var middle_Qmini = Qmini_elements[1];
        var end_Qmini = Qmini_elements.length > 2 ? Qmini_elements[2] : "";
        //console.log(item); in eg Chrome console value of variable is shown, helps debugging
        if (Qmini_elements.length == 2){
        trialdata.Qmin1 = beginning_Qmini+" ";
        trialdata.Qmin2 = " "+middle_Qmini;}
        else { trialdata.Qmin1 = beginning_Qmini+" ";
              trialdata.Qmin2 = " "+noun+" " + end_Qmini;};
        
        //Question maximum
        var Qmaxi = item.Qmax
        var Qmaxi_elements = Qmaxi.split("__"); //split context at __
        var beginning_Qmaxi = Qmaxi_elements[0];
        var middle_Qmaxi = Qmaxi_elements[1];
        var end_Qmaxi = Qmaxi_elements.length > 2 ? Qmaxi_elements[2] : "";
        //console.log(item); in eg Chrome console value of variable is shown, helps debugging
        if (Qmaxi_elements.length == 2){
        trialdata.Qmax1 = beginning_Qmaxi+" ";
        trialdata.Qmax2 =  " "+middle_Qmaxi;}
        else { trialdata.Qmax1 = beginning_Qmaxi+" ";
              trialdata.Qmax2 = " "+noun+" " + end_Qmaxi;};*/
        

        $('#context').html(trialdata.context);
        $('#cause').html(trialdata.question);
        //$('#Qlike').html(trialdata.Qlike);
        $('#Qlike1').html(trialdata.Qlike1);
        $('#Qlike2').html(trialdata.Qlike2);
        //$('#Qmin').html(trialdata.Qmin);
        $('#Qmin1').html(trialdata.Qmin1);
        $('#Qmin2').html(trialdata.Qmin2);
        //$('#Qmax').html(trialdata.Qmax);
        $('#Qmax1').html(trialdata.Qmax1);
        $('#Qmax2').html(trialdata.Qmax2);
        /*$('#checkPlausLow').html(trialdata.checkPlausLow);
        $('#checkPlausHigh').html(trialdata.checkPlausHigh);*/
        
        //$('#currentStim').html(trialdata.stimulus);
            // then, write it into 'currentStim' HTML placeholder
        $('#itemError').hide();
        $('#itemError1').hide();
        $('#item_number').html(trialdata.trialnum);
        showSlide('stage'); 
            // reveal the result to participant
        //block enter key
        
 //first slide per item, ask for minimal and maximal value    
        $('#continuehalfway').click(function() {
        //collect data from forms with respective ID
        like = $('#likelyform').serialize();
        min= $('#minform').serialize();
        max= $('#maxform').serialize();
        console.log(like)
    //check if input is numeric
        //like, min and max are string (e.g 'likely=2'), cut away unnecessary characters
        var likely = like.substr(7);
        var minimum = min.substr(8);
        var maximum = max.substr(8);
        console.log(likely)
    if (IsNumeric(likely) & likely.length > 0 & Number(maximum) > Number(minimum)) { 
          // make continue button available for re-use 
        $("#continuehalfway").unbind('click');
        //save input data
        trialdata.likely = likely;
        trialdata.minimum = minimum;
        trialdata.maximum = maximum;
        //give last number entered in error message
        //caculate cardinalities closest to 25,50 and 75 % between minimum and maximum
        //make sure to use variables as numbers, otherwise strings will be used and added
        var num20 = Math.round( Number(minimum)+(0.20*(maximum-minimum)) );
        //var num25 = minimum +Math.round(( 0.25*(maximum-minimum)) ) ;
        console.log(num20)
        var num40 = Math.round( Number(minimum)+(0.4*(maximum-minimum)) );
        console.log(num40)
        var num60 = Math.round( Number(minimum)+(0.6*(maximum-minimum)) );
        console.log(num60)
        var num80 = Math.round( Number(minimum)+(0.8*(maximum-minimum)) );
        trialdata.num20 =num20;
        trialdata.num40 =num40;
        trialdata.num60 =num60;
        trialdata.num80 =num80;
        //make text for next slide containing input from boxes
        trialdata.question20 = "What do you think is the percent chance (or what are the chances out of 100) that the " +beginning_perc +" "+noun + " " + middle_perc+" will be "+num20+" or less?";
        $('#question20').html(trialdata.question20);
        trialdata.question40 = "What do you think is the percent chance (or what are the chances out of 100) that the " +beginning_perc +" "+noun + " " + middle_perc+" will be "+num40+" or less?";
        $('#question40').html(trialdata.question40);
        trialdata.question60 = "What do you think is the percent chance (or what are the chances out of 100) that the " +beginning_perc +" "+noun + " " + middle_perc+" will be "+num60+" or less?";
        $('#question60').html(trialdata.question60);
        trialdata.question80 = "What do you think is the percent chance (or what are the chances out of 100) that the " +beginning_perc +" "+noun + " " + middle_perc+" will be "+num80+" or less?";
        $('#question80').html(trialdata.question80);
        
        //clear text fields    
        $('#minimum').attr("value", "");
        $('#maximum').attr("value", "");
        $('#likely').attr("value", "");
/*        $('#low').show();
        $('#middle').hide();
        $('#high').hide();*/
        $('#itemError1').hide();
        $('#itemError').hide();
        showSlide('chance20');
    }
    else {
        $('#itemError').show();
        // $("#continuehalfway").unbind('click');
            }; 
        });
//go to second slide of same item                                    
                                    
        $('#continue1').click(function() {
           P20 = $('#20form').serialize(); 
            console.log(P20)
           var p20 = P20.substr(7); 
        console.log(p20)
        // if (answer.value != "" ) { 
        //if first percent chance is 100, go to next item    
        if ( p20 == 100){
            $("#continue1").unbind('click');
            // name is name of input
            //clear text fields    
                $('#perc20').attr("value", "");
                trialdata.perc20 = p20;
                trialdata.perc40 = NaN;
                trialdata.perc60 = NaN;
                trialdata.perc80 = NaN;
                data.trials.push(JSON.parse(JSON.stringify(trialdata))); //push modifies list and adds (...), JSON clone makes sure that objects are not updated every time
                    // write trial data into global data object
                stepExperiment();
                    // go to next trial
        }
        else 
        //make sure all forms are checked and only numbers are entered which make sense
        if (IsNumeric(p20) & p20.length > 0 & p20<101) { 
            $("#continue1").unbind('click');
            trialdata.perc20 = p20;
            console.log(trialdata.perc20)
             $('#20_number').html(trialdata.perc20);
            $('#itemError2').hide();
            showSlide('chance40');              
           }
            else {
        $('#itemError1').show();
        // $("#continuehalfway").unbind('click');
            };
        });
        
        $('#continue2').click(function() {
           P40 = $('#40form').serialize();
        console.log(P40)
           var p40 = P40.substr(7); 
            console.log(p40)
           // if (answer.value != "" ) { 
        //if 100 percent is already reached   
        if ( p40 == 100){
            $("#continue2").unbind('click');
            // name is name of input
            //clear text fields    
                $('#perc20').attr("value", "")
                $('#perc40').attr("value", "");
                 trialdata.perc40 = p40;
                 trialdata.perc60 = NaN;
                 trialdata.perc80 = NaN;
                data.trials.push(JSON.parse(JSON.stringify(trialdata))); //push modifies list and adds (...), JSON clone makes sure that objects are not updated every time
                    // write trial data into global data object
                stepExperiment();
                    // go to next trial
        }
        else    
             //make sure all forms are checked
            if (IsNumeric(p40) & p40.length > 0 & p40<101 & p40>=Number(trialdata.perc20)) { 
            $("#continue2").unbind('click');
             trialdata.perc40 = p40;
            $('#40_number').html(trialdata.perc40);
            $('#itemError3').hide();
            showSlide('chance60');
           }
            else {
        $('#itemError2').show();
        // $("#continuehalfway").unbind('click');
            }; ;
        });
        
     $('#continue3').click(function() {
           P60 = $('#60form').serialize();
        console.log(P60)
           var p60 = P60.substr(7); 
            console.log(p60)
           // if (answer.value != "" ) { 
        //if 100 percent is already reached   
        if ( p60 == 100){
            $("#continue3").unbind('click');
            // name is name of input
            //clear text fields    
                $('#perc20').attr("value", "")
                $('#perc40').attr("value", "");
                $('#perc60').attr("value", "");
                 trialdata.perc60 = p60;
                 trialdata.perc80 = NaN;
                data.trials.push(JSON.parse(JSON.stringify(trialdata))); //push modifies list and adds (...), JSON clone makes sure that objects are not updated every time
                    // write trial data into global data object
                stepExperiment();
                    // go to next trial
        }
        else    
             //make sure all forms are checked
            if (IsNumeric(p60) & p60.length > 0 & p60<101 & p60>=Number(trialdata.perc40)) { 
            $("#continue3").unbind('click');
             trialdata.perc60 = p60;
            $('#60_number').html(trialdata.perc60);
            $('#itemError4').hide();
            showSlide('chance80');
           }
            else {
        $('#itemError3').show();
        // $("#continuehalfway").unbind('click');
            }; ;
        });
        
        $('#continue4').click(function() {
           P80 = $('#80form').serialize(); 
           var p80 = P80.substr(7); 
           if (IsNumeric(p80) & p80.length > 0 & p80<101 &p80>=Number(trialdata.perc60) ) { 
        //if (response.length > 0 & plauslow.length > 0  & plaushigh.length > 0 ) { 
            //if (answer.value != "" & plausible_low.value != "" & plausible_high.value != "" ) { 
                    // check for valid answer, take radio-id ="answer"
                $("#continue4").unbind('click');
                    // make continue button available for re-use 
                //reset radio buttons
                // name is name of input
            //clear text fields    
                $('#perc20').attr("value", "");
                $('#perc40').attr("value", "");
                $('#perc60').attr("value", "");
                $('#perc80').attr("value", "");
                 trialdata.perc80 = p80;
            //    $('#answer').attr("value", "");
            //    $('#answer').val('');
                    // ensure response options unticked next time
                
               // trialdata.response = response; safe input from data forms (radio button, text field etc
                    // record response
                //data['trial' + trialnum] = trialdata;
                data.trials.push(JSON.parse(JSON.stringify(trialdata))); //push modifies list and adds (...), JSON clone makes sure that objects are not updated every time
                    // write trial data into global data object
                stepExperiment();
                    // go to next trial
            }
            else {$('#itemError4').show();};
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