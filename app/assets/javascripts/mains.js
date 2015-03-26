// # Place all the behaviors and hooks related to the matching controller here.
// # All this logic will automatically be available in application.js.
// # You can use CoffeeScript in this file: http://coffeescript.org/

// /return_current_user

// /usertrip = returns current user's trip

// /categories/'trip_id'.json = returns categories for a trip

// /categories/'category_id'/show = returns content of category

// /suggestion/'category_id'/all = returns all suggestions for category

// /suggestion/'suggestion_id'/getcomments = returns comments of suggestion

// /suggestion/'suggestion_id'/show = returns content of suggestion

// /suggestion/'suggestion_id'/downvote = downvote

// /suggestion/'suggestion_id'/upvote = upvote

// /suggestion/3/all

$(document).ready(function(){

//these keep track of current clicked items by their id number
var currentCategory;
var currentSuggestion;
// console.log(document.URL)

// console.log(form_authenticity_token)

// this is the current url
var current_url = document.URL;
console.log(current_url)

// This returns the user's info
var UserInfo = function(){

var url = current_url + 'return_current_user';

var xhr = new XMLHttpRequest();

xhr.addEventListener('load', function(e) {
   var d = xhr.responseText;
   var parsed = JSON.parse(d);

   // console.log(parsed);

})

xhr.open("GET", url);
xhr.send();

}

UserInfo()


// this is the current user's trip
var UserTrip = function(){

var url = current_url + 'usertrip';

var xhr = new XMLHttpRequest();

xhr.addEventListener('load', function(e) {
   var d = xhr.responseText;
   var parsed = JSON.parse(d);
   // console.log(parsed)

   //this is the header title of the trip
   // later we will have to loop through all of the trips
	var location = document.getElementById('location')
	location.innerHTML = parsed[0].location;

	TripCategories(parsed[0].id)

})

xhr.open("GET", url);
xhr.send();

}

UserTrip();




// this is all the categories from the trip
var TripCategories = function(trip_id){

var url = current_url + 'categories/' + trip_id + '.json';

var xhr = new XMLHttpRequest();

xhr.addEventListener('load', function(e) {
   var d = xhr.responseText;
   var parsed = JSON.parse(d);

   // console.log(parsed)
   var ul = document.getElementById('category_elements')

   parsed.forEach(function(category){
   	// console.log(category.name)
   	var li = document.createElement('li');
   	li.innerHTML = category.name;
   	li.className = "chats_unclicked"
   	ul.appendChild(li);

   	// when you click on a category
   	li.addEventListener('click', function(){
   		//this turns the comment input box to display none
		var comment_input = document.getElementById('comment_input');
	   	comment_input.className = "comment_unclicked";

   		//this defines what category is clicked on
   		currentCategory = category.id;
   		var input_category = document.getElementById('category_id');
   		input_category.value = currentCategory;
   		// this sets the current clicked suggestion back to undefined
   		currentSuggestion = undefined;

   		for(var i = 0; i <= ul.childNodes.length-1; i++){
 			if(ul.childNodes[i].tagName === "LI"){
 				ul.childNodes[i].className = "chats_unclicked"
 			}
 		}
 		// this turns the clicked one highlighted
   		li.className = "chats_clicked";
   		// console.log(category.id)

   		//this deletes content from other categories
   		var thread_heading = document.getElementById('thread_heading')
   		while( thread_heading.hasChildNodes() ){
			thread_heading.removeChild(thread_heading.lastChild);
		}


   		//this deletes content from other categories
		var comment_container = document.getElementById('comment_container');
   		while( comment_container.hasChildNodes() ){
			comment_container.removeChild(comment_container.lastChild);
		}


   		CategorySuggestions(category.id)
   	})

   })

})

xhr.open("GET", url);
xhr.send();

}


// these are the category suggestions, triggered when the category is clicked on
var CategorySuggestions = function(category_id){
	var url = current_url + 'suggestion/' + category_id + '/all';

	var xhr = new XMLHttpRequest();

	xhr.addEventListener('load', function(e) {
	   var d = xhr.responseText;
	   var parsed = JSON.parse(d);

	   // console.log(parsed);
	   // this is the div everything this appended to
	   var index_suggestion = document.getElementById('index_suggestion');

	   //this deletes existing nodes
	   while( index_suggestion.hasChildNodes() ){
    		index_suggestion.removeChild(index_suggestion.lastChild);
		}

		var suggestion_heading = document.createElement('div');
		suggestion_heading.id = "suggestion_heading";
		index_suggestion.appendChild(suggestion_heading);


		// this trigger a modal
		var a = document.createElement('a');
		a.innerHTML = "Create New Suggestion";
		suggestion_heading.appendChild(a);
		a.addEventListener('click', function(){
			var modal = document.getElementById('overlay');
			if(modal.style.visibility === "visible"){
				modal.style.visibility = "hidden";
			}else{
				modal.style.visibility = "visible";
			}
			var modal_close = document.getElementById('modal_close')
			modal_close.addEventListener('click', function(){
				modal.style.visibility = "hidden";
			})
		});



		//this creates aall of the suggestions
	   parsed.forEach(function(suggestion){
	   		// console.log(suggestion)
	   		var container = document.createElement('div');
	   		container.className = 'suggestion_container suggestion_unclicked'
	   		index_suggestion.appendChild(container);

	   		//creates title
	   		var div_one = document.createElement('div');
	   		container.appendChild(div_one)
	   		var title = document.createElement('h3')
	   		title.innerHTML = suggestion.title;
	   		div_one.appendChild(title);
	   		//creates content
	   		var div_two = document.createElement('div');
	   		div_two.className = "sub_heading";
	   		container.appendChild(div_two);
	   		var content = document.createElement('p');
	   		content.innerHTML = suggestion.content;
	   		div_two.appendChild(content)

	   		//creates upvote and downvote
	   		var voting_container = document.createElement('div');
	   		voting_container.className = "voting_container";
	   		container.appendChild(voting_container)
	   		// upvote
	   		var vote_one = document.createElement('div');
	   		vote_one.className = "vote";
	   		voting_container.appendChild(vote_one)
	   		var up_arrow = document.createElement('span');
	   		up_arrow.className = "fa fa-arrow-circle-o-up fa-lg green"
	   		vote_one.appendChild(up_arrow);
	   		var up_vote = document.createElement('p');
	   		up_vote.innerHTML = suggestion.upvote;
	   		vote_one.appendChild(up_vote)
	   		// downvote
	   		var vote_two = document.createElement('div');
	   		vote_two.className = "vote";
	   		voting_container.appendChild(vote_two)
	   		var down_arrow = document.createElement('span');
	   		down_arrow.className = "fa fa-arrow-circle-o-down fa-lg red"
	   		vote_two.appendChild(down_arrow);
	   		var down_vote = document.createElement('p');
	   		down_vote.innerHTML = suggestion.downvote;
	   		vote_two.appendChild(down_vote)

	   		container.addEventListener('click', function(){
	   			// this sets the current clicked suggestion to the id number
	   			currentSuggestion = suggestion.id;

	   			//this displays the comment input box when a suggestion is clicked
	   			var comment_input = document.getElementById('comment_input');
	   			comment_input.className = "comment_clicked";


	   			// this sets the value of the hidden input on the comment post to the suggestion id
	   			var suggestion_id = document.getElementById('suggestion_id');
	   			suggestion_id.value = currentSuggestion;
	   			console.log(suggestion_id.value)

	   			// unhighlights all of the suggestions
		   		for(var i = 0; i <= index_suggestion.childNodes.length-1; i++){
		 			if(index_suggestion.childNodes[i].className === "suggestion_container suggestion_clicked"){
		 				index_suggestion.childNodes[i].className = "suggestion_container suggestion_unclicked"
		 			}
	 			}
	 			// highlights clicked suggestion
	 			container.className = "suggestion_container suggestion_clicked";


	 			// updates content for clicked category
	 			var thread_heading = document.getElementById('thread_heading');

	 			// deletes existing nodes in thread_heading
			    while( thread_heading.hasChildNodes() ){
		    		thread_heading.removeChild(thread_heading.lastChild);
				}

	 			var thread_info = document.createElement('div')
	 			thread_info.id = 'thread_info';
	 			thread_heading.appendChild(thread_info);

	 			//this is the suggestion
	 			var thread_content = document.createElement('p');
	 			thread_content.innerHTML = suggestion.content;
	 			thread_info.appendChild(thread_content);

	 			//this is the link
	 			var link = document.createElement('a');
	 			link.innerHTML = "Link Here";
	 			link.href = suggestion.link;
	 			link.target = "blank";
	 			thread_info.appendChild(link);

	 			//this is the div that contains the voting
	 			var thread_vote = document.createElement('div')
	 			thread_vote.id = 'thread_vote';
	 			thread_heading.appendChild(thread_vote);

	 			// this function makes the voting dots
	 			var makeDots = function(append_div){
	 				var counter = 1;
	 				var thread_dots = document.createElement('p');
	 				thread_dots.className = "thread_dots"
	 				append_div.appendChild(thread_dots)
	 				while(counter <= 5){
	 					var dot_span = document.createElement('span');
	 					dot_span.className = 'fa fa-circle'
	 					thread_dots.appendChild(dot_span)
	 					counter++
	 				}
	 			}//end makeDots

	 			var thread_up = document.createElement('div')
	 			thread_vote.appendChild(thread_up);
	 			var arrow_up = document.createElement('p');
	 			arrow_up.className = "thread_vote_arrow";
	 			thread_up.appendChild(arrow_up)
	 			var span_up = document.createElement('span')
	 			span_up.className = "fa fa-arrow-circle-o-up fa-2x green"
	 			arrow_up.appendChild(span_up);
	 			makeDots(thread_up)

	 			// this is the ajax call for upvoting
	 			// span_up.addEventListener('click', function(){
	 			// 	/suggestion/'suggestion_id'/upvote
	 			// })

	 			var thread_down = document.createElement('div')
	 			thread_vote.appendChild(thread_down)
	 			var arrow_down = document.createElement('p');
	 			arrow_down.className = "thread_vote_arrow";
	 			thread_down.appendChild(arrow_down)
	 			var span_down = document.createElement('span')
	 			span_down.className = "fa fa-arrow-circle-o-down fa-2x red"
	 			arrow_down.appendChild(span_down);
	 			makeDots(thread_down)

	 			//call function to get comments
	 			getComments(suggestion.id)

	   		})//end even listener

	   })

	})

	xhr.open("GET", url);
	xhr.send();

}

// this gets the comments, its called from the end of the suggestion function
var getComments = function(suggestion_id){
var url = current_url + 'suggestion/' + suggestion_id + '/getcomments.json';

var xhr = new XMLHttpRequest();

xhr.addEventListener('load', function(e) {
   var d = xhr.responseText;
   var parsed = JSON.parse(d);

   // console.log(parsed);
   var comment_container = document.getElementById('comment_container')

    while( comment_container.hasChildNodes() ){
		comment_container.removeChild(comment_container.lastChild);
	}

   parsed.forEach(function(comment){
   		var comment_div = document.createElement('div');
   		comment_div.className = "comment";
   		comment_container.appendChild(comment_div);

   		var user_image = document.createElement('img');
   		user_image.src = "/assets/users.jpg";
   		comment_div.appendChild(user_image);

   		var content_div = document.createElement('div');
   		comment_div.appendChild(content_div)

   		var heading_comment = document.createElement('h2');
   		heading_comment.innerHTML = comment.content;
   		content_div.appendChild(heading_comment);

   		// load user info, need to get the username
   		var user_name = document.createElement('p');
   		user_name.innerHTML = "User: " + comment.user_id;
   		comment_div.appendChild(user_name)

   		//date created
   		var date_created = document.createElement('p');
   		date_created.innerHTML = comment.created_at.substr(0, 10)
   		comment_div.appendChild(date_created)


   	// console.log(comment)
   })

})

xhr.open("GET", url);
xhr.send();

}//end get comments


}) //end jquery

