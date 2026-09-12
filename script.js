// Wait for the document to load before running the script 
(function ($) {
  
  // We use some Javascript and the URL #fragment to hide/show different parts of the page
  // https://developer.mozilla.org/en-US/docs/Web/HTML/Element/a#Linking_to_an_element_on_the_same_page
  $(window).on('load hashchange', function(){
    
    // First hide all content regions, then show the content-region specified in the URL hash 
    // (or if no hash URL is found, default to first menu item)
    $('.content-region').hide();
    
    // Remove any active classes on the main-menu
    $('.main-menu a').removeClass('active');
    var region = location.hash.toString() || $('.main-menu a:first').attr('href');
    
    // Now show the region specified in the URL hash
    $(region).show();
    
    // Highlight the menu link associated with this region by adding the .active CSS class
    $('.main-menu a[href="'+ region +'"]').addClass('active'); 

    // Alternate method: Use AJAX to load the contents of an external file into a div based on URL fragment
    // This will extract the region name from URL hash, and then load [region].html into the main #content div
    // var region = location.hash.toString() || '#first';
    // $('#content').load(region.slice(1) + '.html')
    
  });

 // --------------------------------------------------
  // Secret Phrase Verification Logic (Auto-Clearing Msg)
  // --------------------------------------------------
  $(document).ready(function() {
    let messageTimer = null; // Variable to track active timeout

    function checkSecretPhrase() {
      const userInput = $('#secret-input').val().trim().toLowerCase();
      const $secretMsg = $('#secret-message');
      
      // Clear any pending clear-message timer if user clicks rapidly
      if (messageTimer) {
        clearTimeout(messageTimer);
      }

      // Map each phrase to its specific HTML destination page
      const secretRoutes = {
        "p1": "gameyes.html",
        "p 1": "ansno.html",
        "secret passcode": "game.html",
        "julius": "https://youtu.be/UIjTKBaFDvY?si=CL9yUsPD0kC3XLvc"
  
      }; 

      if (userInput in secretRoutes) {
        const destinationPage = secretRoutes[userInput];
        
        $secretMsg.css('color', '#4CAF50').text('Access granted! Redirecting...');
        
        setTimeout(function() {
          window.location.href = destinationPage;
        }, 800);
      } else {
        // Show failure message
        $secretMsg.css('color', '#ff4d4d').text('Phrase not found');

        // Automatically clear the message after 3 seconds (3000ms)
        messageTimer = setTimeout(function() {
          $secretMsg.text('');
        }, 3000);
      }
    }

    $(document).on('click', '#secret-btn', function() {
      checkSecretPhrase();
    });

    $(document).on('keypress', '#secret-input', function(e) {
      if (e.which === 13) {
        checkSecretPhrase();
      }
    });

  });
  
})(jQuery);
