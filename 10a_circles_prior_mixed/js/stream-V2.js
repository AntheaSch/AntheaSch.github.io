/// Stream ///

//creates slides
//goes through list of items, shows one after another 
//if no items present (intro slide) or all have been shown, exp.go

var slide = function (_slide, _private) {   //_slide is an object with properties name, present,...
                                            // I don't know what private is doing, never given as argument
  var s = _slide || {}, p = _private || {}; // argument || "blah"; gives put blah if argument is FALSE
  s.phaseid=0;
  s.init = function() {
    utils.showSlide(this.name);  //shows slide of object passed to function (_slide), for example slides.i0
    this.phaseid++;              
    if (this.start) {this.start();};  //if object has property start(?)/is defined run this function
    if(this.handle) this.handle();    //if object has property handle(?)/is defined run this function
    _stream.apply(this);              //apply stream to the object slides.i0, slides.trial etc
  };

  //what to do when done presenting all the slides
  s.callback = s.callback !== undefined ? s.callback : function() {exp.go();};
  return(s);
};

var _stream = function() {
  if (exp.nQs) {
    //if number of total questions is defined, then show progress bar
    $('.bar').css('width', ( (exp.phase / exp.nQs)*100 + "%")); //change width of progress bar 
  } else {
    $(".progress").hide();
  }
  if (this.present == undefined) {  //if object (e.g. slide.trial) has does not have property present 
    exp.phase++;
    //not a presented slide (i.e. there are not multiple trials using the same slide), go to next phase
  } else {
    var presented_stims = this.present || []; //get list of items, created by get_items etcs

    if (presented_stims.length === 0) {
      //done with slide
      if (this.end) {this.end();}; //jQuery command: End the most recent filtering operation in the current chain and return the set of matched elements to its previous state
      this.callback();
    } else if (this.present_handle) { //if present_handle available... use present_handle to create items and measure specific stuff
      exp.phase++;
      var stim = presented_stims.shift();  //go through items
      if (this.catch_trial_handle && stim.catchT) {  //??catch_trial_handle ??catchT
        //Catch Trial                                //there is probably code in which one measure is called catch trial
        this.catch_trial_handle(stim);          //
      } else {
        //Normal Trial
        this.present_handle(stim);
      }
    }
  }
};