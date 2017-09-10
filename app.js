/* jshint esversion: 6 */

const app = new Vue({
  el: '#app',
  data: {
    current: '0',
    concat: '0',
  },
  methods: {
    clearAll: function() {
      this.current = 0;
      this.concat = 0;
    },
    clearEntry: function() {
      var len = this.current.length;
      var entryCleared = this.concat.substring(0, this.concat.length-len);
      this.concat = entryCleared;
      this.current = '0';
    },
    typeNumber: function(n) {
      var num = n.toString();
      if (this.current == '*' || this.current == '/' || this.current == '+' || this.current == '-') {
        this.current = num;
        this.concat += num;
      } else if (this.concat != 0 && this.concat.length > 0 ) {
        if (this.current == 0) {
          this.current = num;
          this.concat += num;
        } else {
          this.current += num;
          this.concat += num;
        }
      } else {
        this.current = num;
        this.concat = num;
      }
    },
    typeOperator: function(op) {
      var operator = op.toString();
      this.current = operator;
      this.concat += operator;
    }
  }
});
// TO DO: decimal & equal buttons
// TO DO: actual calculation!
