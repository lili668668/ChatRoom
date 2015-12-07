var socket = io();
$('form').submit(function(){
    var m = $('#talk').val();
    socket.emit('message', m);
    $('#messages').append(
        $('<div class="frame-right">').append(
            $('<div class="me">').text(m)
        )
    );
    $('#talk').val('');
    return false;
});
socket.on('message', function(msg){
    $('#messages').append(
        $('<div class="frame-left">').append(
            $('<div class="text">').text(msg)
        )
    );
});

socket.on('bot', function(msg){
    $('#messages').append(
        $('<div class="frame-left">').append(
            $('<div class="text">').text(msg)
        )
    );
});

