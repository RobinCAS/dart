
/*----------------------------------
    function    :   dart_create_catalog
    author      :   Seth DeSantis
    created     :   10/7/15
                    10/9/15
                      - adding sidebar
                      - updating ui
                    10/11/15

    description :   setup catalog

----------------------------------*/
function dart_setup_catalog(){

  //call to get catalog categories
  dart_get_categories();
}


/*----------------------------------
    function    :   dart_get_categories
    author      :   Seth DeSantis
    created     :   10/7/15
    description :   request to get categories

----------------------------------*/
function dart_get_categories(){
  $.ajax({
    dataType: "json",
    //url: 'query/json_cat.php',
    url: 'assets/json/categorys.json',
    success: dart_get_apps
  });
}

/*----------------------------------
    function    :   dart_get_apps
    author      :   Seth DeSantis
    created     :   10/7/15
    description :   request to get apps

----------------------------------*/
function dart_get_apps(json_cat){
  $.ajax({
    dataType: "json",
    //url: 'query/json_app.php',
    url: 'assets/json/a3.json',
    success: function (json_app){
      dart_create_obj_cat(json_app, json_cat);
    }
  });
}

/*----------------------------------
    function    :   dart_create_obj_cat
    author      :   Seth DeSantis
    created     :   10/7/15
                    10/9/15
                      -obj_catalog is now appened to navbar element, to be accessible by all functions
    description :   takes json from categories and applications and merges to one object

    structure   :
      obj_catalog
        .ary_categories
          obj_category
            .title    - category title
            .ary_apps - array of all applications in this category
----------------------------------*/
function dart_create_obj_cat(json_app, json_cat){
  //create object for all catalog items
  var obj_catalog = new Object();
  var ary_categories= new Array();
  obj_catalog.ary_categories = ary_categories;
  //BEGIN : for every category
  for(var c_jc=0; c_jc<json_cat.length;c_jc++){
    //create object for this category / app combination
    var obj_category = new Object();
    //add title
    obj_category.title = json_cat[c_jc].title;
    //create array for all applications for this category
    var ary_apps= new Array();
    obj_category.ary_apps =ary_apps;
    //BEGIN : loop through all application
    for(var c_ja=0; c_ja<json_app.length;c_ja++){
      //alert ('spot:'+ c_ja + ' / '+ json_app.length + ' - '+json_app[c_ja].category)
      //BEGIN : if this app is in this category
      if(json_app[c_ja].category == json_cat[c_jc].title){
        obj_category.ary_apps.push(json_app[c_ja]);
      }
      //END   : if this app is in this category
    }
    //END   : loop through all application
    obj_catalog.ary_categories.push(obj_category)
  }
  //END : for every category

  //append obj_catalog as property of navbar element
  document.getElementById('navbar').obj_catalog = obj_catalog;

  dart_search_fun();

}

/*----------------------------------
    function    :   dart_search_fun
    author      :   Seth DeSantis
    created     :   10/9/15
    description :   smart search functionality

----------------------------------*/
function dart_search_fun(){
  //get obj_catalog
  var obj_catalog = document.getElementById('navbar').obj_catalog;
  //get searchbar div
  var smart_search_div = document.getElementById('div_smart_search');

	//BEGIN : 	create serachbar

	//create function to be called on search bar selecion
	var click_fun = function(idIn){
		var a = document.createElement('a');
    var url = "http://dart.grc-apps.svc.ice.ge.com/cascade.html#/app/"+idIn;
		a.setAttribute('href',url);
		//a.setAttribute('target','_blank');
		a.click();

		//user log
		//log_insert('CLICK','SEARCHBAR | '+ url);

	};
	//create search bar
	var obj_searchbar = create_searchbar(smart_search_div,click_fun);

	//EMD 	: 	create searchbar

  //BEGIN : loops through categories/applications, add to search bar
  //BEGIN : FOR every categoruy
  for(var c_oc=0; c_oc<obj_catalog.ary_categories.length;c_oc++){
    //BEGIN : FOR every application
    for(var c_aa=0; c_aa<obj_catalog.ary_categories[c_oc].ary_apps.length;c_aa++){
      //add information to searchbar
      //alert(obj_catalog.ary_categories[c_oc].title + ' - ' + obj_catalog.ary_categories[c_oc].ary_apps[c_aa].description);
      sb_add_element(obj_catalog.ary_categories[c_oc].ary_apps[c_aa].title,obj_catalog.ary_categories[c_oc].ary_apps[c_aa].appid,obj_searchbar);
    }
    //END   : FOR every application

  }
  //END : FOR every category
  //END : loops through categories/applications, add to search bar

}
