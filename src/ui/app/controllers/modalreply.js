import Ember from 'ember';
export default Ember.Controller.extend({
    actions: {
        close: function(obj, y) {
          console.log(y);
          if (y) {
            // TODO : Use Emberjs process

            var $user = $('#username').val();
            var $comment = $('#comment').val();

            $.ajax({
              type: "POST",
              url: "http://localhost:8081/api/v1/comments",
              data: { user: $user, comment: $comment },
              success: function () {
                console.log('df');
              }
            })

              // obj.destroyRecord();
          }
            return this.send('closeModal');
        }
    }
});
