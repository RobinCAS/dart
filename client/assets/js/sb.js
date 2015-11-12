/*
	create_searchbar(display_element_div, function_in)
		display_element_div	:	div where searchbar will be built
		function_in			:	function which is called when a searchbar option is chosen
	author	:	Seth DeSantis
	created	:	5/5/13
	modified:	9/24/13
*/
function create_searchbar(display_element_div, function_in){
	//create array to hold search bar items
	var ary_obj_sb_items = new Array();


	var de_searchbar_div = document.getElementById('div_smart_search');

	/*
	de_searchbar_div.className = 'form-control'; //de_searchbar_div
	display_element_div.appendChild(de_searchbar_div);
*/

	var de_sb_input = document.getElementById('input_smart_search');
	de_sb_input.clicked = 0;



	//BEGIN	:	onkeydown:	handle user pressing down or up on input box
	de_sb_input.onkeydown = function(){
		//BEGIN	:	IF there are any results to naviagate through
		if(obj_searchbar.de_sb_result.ary_results){
			//BEGIN	:	SWITCH on button pressed (up or down)
			switch (window.event.keyCode) {
				case 13:

					//function call using above breakdown
					obj_searchbar.de_sb_result.select_function(obj_searchbar.de_sb_result.ary_results[obj_searchbar.de_sb_result.result_selected].select_value);

					//clear box and reset search:
					de_sb_result.className="de_sb_result_off";
					//alert(de_sb_result.className);
					//de_sb_input.className = 'de_sb_input_unclicked';
					//de_sb_input.value = "search applications";
					//de_sb_input.clicked=0;

					//IF the array containing the previous found search results exists, empty it
					if(obj_searchbar.de_sb_result.ary_results){
						obj_searchbar.de_sb_result.ary_results = [];
					}

					//obj_searchbar.de_sb_result.select_function(this.select_value);
				break;
				//BEGIN	:	IF 'up' is pressed
				case 38:
					if(obj_searchbar.de_sb_result.result_selected < 1){
						obj_searchbar.de_sb_result.ary_results[0].className="search_result_div";
						obj_searchbar.de_sb_result.result_selected = obj_searchbar.de_sb_result.ary_results.length-1;
						obj_searchbar.de_sb_result.ary_results[obj_searchbar.de_sb_result.result_selected].className="search_result_div_selected";
					} else {
						obj_searchbar.de_sb_result.ary_results[obj_searchbar.de_sb_result.result_selected].className="search_result_div";
						obj_searchbar.de_sb_result.result_selected--;
						obj_searchbar.de_sb_result.ary_results[obj_searchbar.de_sb_result.result_selected].className="search_result_div_selected";
					}
					//BEGIN	:	adjust scroll position if necesary
					//get elements we are working with
					var sb_result = $(obj_searchbar.de_sb_result.de_sb_result_matches);
					var cur_selected = $(obj_searchbar.de_sb_result.ary_results[obj_searchbar.de_sb_result.result_selected]);
					//get visible height of scrolling window
					var result_height = sb_result.height();
					//see where scroll window is scrolled to
					var result_scrollTop = sb_result.scrollTop();
					//get location of element just selected within scrolling div
					var cur_selected_position = cur_selected.position();
					var cur_selected_position = cur_selected_position.top;
					//get height of selected element
					var cur_selected_height = cur_selected.outerHeight();
					//IF/ELSE to determine what height we are comparing against, to see if scrollTop needs to be adjusted

					if(result_scrollTop==0){
						compare_height = result_height;
					} else {
						//compare_height=result_scrollTop;
						compare_height=result_height;
					}


					//see if scrollTop needs to be adjusted
					//if((cur_selected_position + cur_selected_height+ result_scrollTop)<(compare_height)){
					if(obj_searchbar.de_sb_result.result_selected ==  obj_searchbar.de_sb_result.ary_results.length-1){
						sb_result.scrollTop(cur_selected_position);
						//c.innerHTML += "</br>** FIRST to: "+sb_result.scrollTop();
					}
					else if((cur_selected_position - cur_selected_height)<(0)){
						sb_result.scrollTop(result_scrollTop - cur_selected_height);
					}
					//END	:	adjust scroll position if necesary


				break;
				//END	:	IF 'up' is pressed
				//BEGIN	:	IF 'down' is pressed
				case 40:
					if(obj_searchbar.de_sb_result.result_selected == obj_searchbar.de_sb_result.ary_results.length -1 ){
						//IF last element is selected
						obj_searchbar.de_sb_result.ary_results[obj_searchbar.de_sb_result.result_selected].className="search_result_div";
						obj_searchbar.de_sb_result.result_selected = 0;
						obj_searchbar.de_sb_result.ary_results[obj_searchbar.de_sb_result.result_selected].className="search_result_div_selected";
					} else {
						//ELSE, last element not currently selected
						if(obj_searchbar.de_sb_result.result_selected != -1){
							//IF an element has already been selected, deselect current element before selecting a new one
							obj_searchbar.de_sb_result.ary_results[obj_searchbar.de_sb_result.result_selected].className="search_result_div";
						}
						obj_searchbar.de_sb_result.result_selected++;;
						obj_searchbar.de_sb_result.ary_results[obj_searchbar.de_sb_result.result_selected].className="search_result_div_selected";
					}
					//BEGIN	:	adjust scroll position if necesary
					//get elements we are working with
					var sb_result = $(obj_searchbar.de_sb_result.de_sb_result_matches);
					var cur_selected = $(obj_searchbar.de_sb_result.ary_results[obj_searchbar.de_sb_result.result_selected]);
					//get visible height of scrolling window
					var result_height = sb_result.height();
					//see where scroll window is scrolled to
					var result_scrollTop = sb_result.scrollTop();
					//get location of element just selected within scrolling div
					var cur_selected_position = cur_selected.position();
					var cur_selected_position = cur_selected_position.top;
					//get height of selected element
					var cur_selected_height = cur_selected.outerHeight();
					//IF/ELSE to determine what height we are comparing against, to see if scrollTop needs to be adjusted
					if(result_scrollTop==0){
						compare_height = result_height;
					} else {
						//compare_height=result_scrollTop;
						compare_height=result_height;
					}

					//see if scrollTop needs to be adjusted
					if(obj_searchbar.de_sb_result.result_selected == 0){
						sb_result.scrollTop(0);
					} else if((cur_selected_position + cur_selected_height)>(compare_height)){
						sb_result.scrollTop(result_scrollTop +cur_selected_height );
					}

					//END	:	adjust scroll position if necesary
				break;
				//END	:	IF 'down' is pressed
				default:
					//IF tyhe input is in the state of prompting the user to 'enter text', will clear that value, change class, and update state
					if(de_sb_input.clicked == 0){
						obj_searchbar.de_sb_input.clicked = 1;
						//obj_searchbar.de_sb_input.className = 'de_sb_input';
						//obj_searchbar.de_sb_input.value ='';
					}
				break;
			}
			//END	:	SWITCH on button pressed (up or down)
		}
		//END	:	IF there are any results to naviagate through
	}
	//END	:	onkeydown:	handle user pressing down or up on input box

	//BEGIN	:	onkeyup:	handle user entering a value in input box
	de_sb_input.onkeyup = function(){
		if (window.event.keyCode != 38 && window.event.keyCode!= 40 && window.event.keyCode!= 13) {
			searchbar_active(this.value, obj_searchbar);
		}

	}
	//BEGIN	:	onkeyup:	handle user entering a value in input box

	//de_searchbar_div.appendChild(de_sb_input);

	var spacer=document.createElement('div');
	spacer.className="spacer";
	de_searchbar_div.appendChild(spacer);


	var de_sb_result= document.createElement('div');
	de_sb_result.className="de_sb_result_off";
	de_sb_result.select_function = function_in;		//append function that is called when an option is selected
	de_searchbar_div.appendChild(de_sb_result);

	//create an object with info for this instance of the searchbar
	obj_searchbar = new Object();
	obj_searchbar.ary_obj_sb_items = ary_obj_sb_items;
	obj_searchbar.de_sb_result = de_sb_result;
	obj_searchbar.de_sb_input = de_sb_input;

	//BEGIN	:	add code to handle clicking on screen other than search bar (will retract searchbar)	-----------------------------
    //BEGIN : on a click
    document.body.onclick = function (e) {
        if (!e) e = window.event;


        // alert(e.srcElement.id + " - " + e.target.id);
        //BEGIN : IF search bar is being displayed
        if (de_sb_result.style.display == "") {
            //BEGIN : IF/ELSE click inside search div
            if (((e.target || e.srcElement) == de_searchbar_div) || ((e.target || e.srcElement) == de_sb_input)) {
                //CLICK inside search box
				//alert('no action');
            } else {
                //CLICK not inside search box
                de_sb_result.className="de_sb_result_off";
				//de_sb_input.className = 'de_sb_input_unclicked';
                //de_sb_input.value = "search applications";
				de_sb_input.clicked=0;
            }
            //END : IF/ELSE click inside search div
        }
        //END : IF search bar is being displayed
    }
    //END : on a click
	//END	:	add code to handle clicking on screen other than search bar (will retract searchbar)	-----------------------------



	return obj_searchbar;

}


/*
	author	:	Seth DeSantis
	created	:	5/5/13
	modified:	9/24/13
		value_in		:	the value to be displayed as a search element (this is what will be used against Reg Ex
		select_value_in	:	the value to be used if this option is select (what is sent to function whejn this value is selected)
		obj_searchbar	:	object containing searchbar info and elements
*/
function sb_add_element(value_in, select_value_in, obj_searchbar){
	var obj_sb_item = new Object;

	obj_sb_item.value = value_in;
	obj_sb_item.select_value = select_value_in;
	//obj_sb_item.button_function =  obj_display.search_button_function;
	//obj_sb_item.obj_getFields_return_row = obj_getFields_return_row;
	//obj_sb_item.obj_display = obj_display;

	obj_searchbar.ary_obj_sb_items.push(obj_sb_item);
}

/*
	author	:	Seth DeSantis
	created	:	5/5/13
	modified:	9/24/13
				10/2/13
				10/3/13
*/
function searchbar_active(val_in, obj_searchbar){


	de_sb_result = obj_searchbar.de_sb_result;
	obj_searchbar.de_sb_result.innerHTML = '';
	//BEGIN	:	IF/ELSE value_in
	if(val_in.length==0){
		de_sb_result.className='de_sb_result_off';
		//IF the array containing the previous found search results exists, empty it
		if(obj_searchbar.de_sb_result.ary_results){
			obj_searchbar.de_sb_result.ary_results = [];
		}
	} else {
		de_sb_result.className='de_sb_result_on';
		//get width of search bar, set as result div
		//console.log($('#input_smart_search').width());
		var nWidth = $('#input_smart_search').width();
		de_sb_result.style.width=nWidth+"px";
		var num_hits=0;

		//create div to display info on number of hits
		var de_sb_result_info = document.createElement('div');
		de_sb_result_info.className="de_sb_result_info";
		de_sb_result.appendChild(de_sb_result_info);

		//create div to contain matches
		var de_sb_result_matches = document.createElement('div');
		de_sb_result_matches.className="de_sb_result_matches";
		de_sb_result.appendChild(de_sb_result_matches);


		var ary_obj_sb_items = obj_searchbar.ary_obj_sb_items;

		//create an array that will contain all of the search_result_div elements
		obj_searchbar.de_sb_result.ary_results = new Array();

		//BEGIN	:	FOR every object in ary_obj_sb_items
		for (var c_aosi = 0; c_aosi<ary_obj_sb_items.length; c_aosi++){
			var regEx_patter = new RegExp(val_in, "ig");
            var found_index = (ary_obj_sb_items[c_aosi].value).search(regEx_patter);
            //BEGIN : IF regular expression found a match
            if (found_index >= 0) {
                //increment counter tracking hit
                num_hits++;
                //create div for this result
                var search_result_div = document.createElement("div");
                //search_result_div.GLOBAL_ary_SB_OBJ = GLOBAL_ary_SB_OBJ[a_c];
                search_result_div.className = "search_result_div";

                if (found_index == 0) {
                    var search_result_span = document.createElement("span");
                    search_result_span.className = "search_result_span_on";
                    search_result_span.innerHTML = (ary_obj_sb_items[c_aosi].value).substring(0, val_in.length);
                    search_result_div.appendChild(search_result_span);

                    var search_result_span = document.createElement("span");
                    search_result_span.className = "search_result_span";
                    search_result_span.innerHTML = (ary_obj_sb_items[c_aosi].value).substring(val_in.length);
										search_result_div.select_value = ary_obj_sb_items[c_aosi].select_value;
                    search_result_div.appendChild(search_result_span);
                } else {
                    var search_result_span = document.createElement("span");
                    search_result_span.className = "search_result_span";
                    search_result_span.innerHTML = (ary_obj_sb_items[c_aosi].value).substring(0, found_index);
                    search_result_div.appendChild(search_result_span);

                    var search_result_span = document.createElement("span");
                    search_result_span.className = "search_result_span_on";
                    search_result_span.innerHTML = (ary_obj_sb_items[c_aosi].value).substring(found_index, found_index + val_in.length);
                    search_result_div.appendChild(search_result_span);

                    var search_result_span = document.createElement("span");
                    search_result_span.className = "search_result_span";
                    search_result_span.innerHTML = (ary_obj_sb_items[c_aosi].value).substring(found_index + val_in.length);
										search_result_div.select_value = ary_obj_sb_items[c_aosi].select_value;
                    search_result_div.appendChild(search_result_span);

                }
								search_result_div.onclick = function(){
									obj_searchbar.de_sb_result.select_function(this.select_value);
									//log_insert('SEARCHBAR SUBMIT' ,this.select_value);
									//this.button_function(this.id, this.obj_getFields_return_row, this.obj_display)
									}
				obj_searchbar.de_sb_result.result_selected = -1;
				obj_searchbar.de_sb_result.ary_results.push(search_result_div);
				obj_searchbar.de_sb_result.de_sb_result_matches=de_sb_result_matches;
				de_sb_result_matches.appendChild(search_result_div);
			}
			//END : IF regular expression found a match
		}
		//END	:	FOR every object in ary_obj_sb_items

		de_sb_result_info.appendChild(document.createTextNode(num_hits + ' matches out of ' + ary_obj_sb_items.length + ' records'));
	}
	//END	:	IF/ELSE value_in
}
