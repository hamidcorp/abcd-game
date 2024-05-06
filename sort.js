$(document).ready(function() {
    alphabets = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 
                 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];
    order = []

    addRandomBlocks();
    $('#blocksContainer').sortable({
        connectWith: '#blocksContainer',
        tolerance: 'pointer',
        revert: 100,
        delay: 0,
    });
    $("#blocksContainer").disableSelection();

    $('#wsubmit').hide();

    $('#wsubmit').on('click', function(){
        $('#submit').show();
        $('#wsubmit').hide();
        $('.wmessage').remove();
        $('.wheading').remove();
        addRandomBlocks();
    });

    $('#submit').on('click', function() {

        var blockContainer = document.getElementById('blocksContainer');
        var blockElements = blockContainer.getElementsByClassName('block');
    
        var lettersInOrder = true;
    
        for (var i = 0; i < blockElements.length - 1; i++) {
            var currentLetter = blockElements[i].innerText;
            var nextLetter = blockElements[i + 1].innerText;
    
            if (currentLetter.localeCompare(nextLetter) > 0) {
                // Letters are not in order
                lettersInOrder = false;
                break;
            }
        }
    
        if (lettersInOrder) {
            correctAnswer();
        } else {
            wrongAnswer(order);
        }
    });

    function addRandomBlocks() {
        $('.block').remove();
       
        var selectedIndexes = [];
        while (selectedIndexes.length < 3) {
            var randomIndex = getRandomIndex();

            if (!selectedIndexes.includes(randomIndex)) {
                selectedIndexes.push(randomIndex);
            }
        }

        addActiveBlocks(selectedIndexes);
    }

    function addActiveBlocks(indexes) {
        order = [];
        for (var i = 0; i < indexes.length; i++) {
            $('#blocksContainer').append('<div class="block active">' + alphabets[indexes[i]] + '</div>')
            order.push(alphabets[indexes[i]]);
        }
        $('.active').show();
    }

    function getRandomIndex() {
        return Math.floor(Math.random() * 26);
    }

    // function initializeSortable() {
    //     var sortable = new Sortable(document.getElementById('blocksContainer'), {
    //         animation: 150, 
    //         ghostClass: 'sortable-ghost', 
    //     });
    // }

    function correctAnswer() {
        $('.block').remove();
        $('#submit').hide();
        
        var appreciativeWords = ['Excellent!', 'Fantastic!', 'Awesome!', 'Great Job!', 'Well Done!'];
    
        
        var randomAppreciation = appreciativeWords[Math.floor(Math.random() * appreciativeWords.length)];
    
        
        var message = '<div class="message">' +
                      '<span class="tick">&#10004;</span>' +
                      '<span>&nbsp;</span>'+
                      '<span>' + randomAppreciation + '</span>' +
                      '</div>';
    
        $('#blocksContainer').append(message);
    
        
        setTimeout(function() {
            $('.message').remove(); 
            addRandomBlocks();
            $('#submit').show();
        }, 1500); 
    }

    function wrongAnswer(originalOrder) {
        let userOrder = getUserOrder();
        $('#submit').hide();
        $('#wsubmit').show();
        $('.block').remove();

        $('#wrongAnswer').append('<h1 class="wheading">Sorry, incorrect...</h1>');
        
        displayOrder(originalOrder, "The Question");
    
        displayOrder(userOrder, "Your Answer");

        stepByStepGuidance(originalOrder);

        displayOrder(order.sort(), "Solution");
    }
    
    function displayOrder(order, heading) {
        var message = '<div class="wmessage">' +
                      '<h3>' + heading + '</h3>' +
                      '<div class="container">'+
                      '<div class="block">' + order[0] + '</div>' +
                      '<div class="block">' + order[1] + '</div>' +
                      '<div class="block">' + order[2] + '</div>' +
                      '</div>' +
                      '</div>';
    
        $('#wrongAnswer').append(message);
    }
    
    function getUserOrder() {
        var userOrder = [];
        $('.block').each(function() {
            userOrder.push($(this).text());
        });
        console.log(userOrder);
        return userOrder;
    }
    
    function stepByStepGuidance(originalOrder) {
        var guidanceMessage = '<div class="wmessage">' +
                              '<h3>Solve</h3>' +
                              '<p>Look at the alphabet. Find the letters ';
        for(var i=0; i<originalOrder.length; i++) {
            guidanceMessage += '<b>' + originalOrder[i] + '</b>';
            guidanceMessage += ', ';
        }

        guidanceMessage = guidanceMessage.slice(0, guidanceMessage.length - 2);
        guidanceMessage += '.</p>';
    
        // Display correct alphabetical order for guidance
        guidanceMessage += '<p>';
        for(var i=0; i<alphabets.length; i++) {
            if(originalOrder.includes(alphabets[i])){
                guidanceMessage += '<b><u>' +alphabets[i] + '</u></b>';
            } else {
                guidanceMessage += alphabets[i];
            }
            guidanceMessage += ' ';
           
        }
        guidanceMessage += '</p>';
        
        originalOrder.sort();

        guidanceMessage += '<p>The letter ' + originalOrder[0] + ' goes first. </p>';
        guidanceMessage += '<p>The letter ' + originalOrder[1] + ' goes next. </p>';
        guidanceMessage += '<p>The letter ' + originalOrder[2] + ' goes last. </p>';
    
        guidanceMessage += '</div>';
    
        $('#wrongAnswer').append(guidanceMessage);


    }
    
    
});
