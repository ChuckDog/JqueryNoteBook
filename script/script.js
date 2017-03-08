$(document).ready(function() {
	
	var notes = [];
	var listNumber = 0;
	var storedNote = localStorage.getItem("note");
	storedNote = JSON.parse(storedNote);

	if(storedNote == null) {

		storedNote = [];
	} else {

		notes = storedNote;
	}
	
	if(storedNote.length == 0) {
		$('#create').addClass('hide');
		$('#note').addClass('hide');
		$('#edite').addClass('hide');
		$('#delete').addClass('hide');
	} else {
		$('#create').addClass('hide');
		$('#delete').addClass('hide');
		$('#edite').addClass('hide');
		show();
	}
	
	$('ol').click(function(e) {
		var n = $(e.target).index() + this.start;
		listNumber = n;
	});
	
	$('#createButton').on('click', function() {
		$('#create').removeClass('hide');
		$('#note').addClass('hide');
		$('#edite').addClass('hide');
		$('#delete').addClass('hide');
	});

	$('.Edite').on('click', function() {
		console.log("edit");
		$('#edite').removeClass('hide');
		$('#note').addClass('hide');
		$('#create').addClass('hide');
		$('#delete').addClass('hide');
	});
	
	$('.delete').on('click', function() {
		$('#delete').removeClass('hide');
		$('#note').addClass('hide');
		$('#create').addClass('hide');
		$('#edit').addClass('hide');
	});
	
	$('#submit').on('click', function() {
		var newNote = $('#createInput').val();
		if(newNote == '') {
			alert('Please input something!');
		} else {
			notes.push(newNote);
			store(notes);
			read();
			show();
			$('#create').addClass('hide');
			$('#note').removeClass('hide');
			$('#edite').addClass('hide');
			$('#delete').addClass('hide');
			location.reload();
			//$('#odlist').listview('refresh');
		}
	});
	
	$('#sub').on('click', function() {
		var newNote = $('#editInput').val();
		var temp = 0;
		if(newNote == '') {
			alert('Please input something!');
		} else {
			temp = (listNumber+1)/3;
			notes.splice(temp-1, 1, newNote);
			listNumber = 0;
			store(notes);
			read();
			show();
			$('#create').addClass('hide');
			$('#note').removeClass('hide');
			$('#edite').addClass('hide');
			$('#delete').addClass('hide');
			location.reload();
			//$('ol').listView('refresh');
		}
	});
	
	function store(storeNote) {
		localStorage["note"] = JSON.stringify(storeNote);
	}
	
	$('#Delete').on('click', function() {
		var temp = listNumber/3;
		notes.splice(temp-1, 1);
		listNumber = 0;
		store(notes);
		read();
		show();
		$('#create').addClass('hide');
		$('#note').removeClass('hide');
		$('#edite').addClass('hide');
		$('#delete').addClass('hide');
		location.reload();
	});
	
	function read() {
		var storedNote = localStorage.getItem("note");
		var notes = storedNote;
	}
	
	function show() {
		$('#odlist').empty();
		for(var i=0; i<storedNote.length; i++) {
			$('#odlist').append('<li>' + storedNote[i] +'</li><button type="button" class="Edite">Edite</button>    </li><button type="button" class="delete">Delete</button>');	
		}
	}
});