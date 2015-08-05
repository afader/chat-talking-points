var tokenize = function(string) {
  return string.toLowerCase().match(/\w+/g);
};

var flatten = function(arrays) {
  var merged = [];
  return merged.concat.apply(merged, arrays);
};

var unique = function(array) {
  var set = {};
  for (var i = 0; i < array.length; i++) {
    set[array[i]] = true;
  }
  return Object.keys(set);
};

var createIndex = function() {
  var invertedIndex = {};
  var forwardIndex = {};
  return {
    containsDocument: function(id) {
      return (id in forwardIndex);
    },
    addDocument: function(id, content) {
      if (this.containsDocument(id)) {
	return;
      }
      var tokens = unique(tokenize(content));
      forwardIndex[id] = tokens;
      for (var i = 0; i < tokens.length; i++) {
	var token = tokens[i];
	var postings = (token in invertedIndex) ? invertedIndex[token] : [];
	postings.push(id);
	invertedIndex[token] = postings;
      }
    },
    removeDocument: function(id) {
      if (!this.containsDocument(id)) {
	return;
      }
      var tokens = forwardIndex[id];
      for (var i = 0; i < tokens.length; i++) {
	var token = tokens[i];
	var postings = invertedIndex[token];
	var index = postings.indexOf(token);
	postings.splice(index, 1);
      }
      delete forwardIndex[id];
    },
    terms: function() {
      return Object.keys(invertedIndex);
    },
    search: function(term) {
      var lcTerm = term.toLowerCase();
      if (lcTerm in invertedIndex) {
        return invertedIndex[lcTerm];
      } else {
	return [];
      }
    },
    prefixSearch: function(prefix) {
      var prefixLc = prefix.toLowerCase();
      var withPrefix = this.terms().filter(function(term) {
	return term.startsWith(prefixLc);
      });
      var documentIds = withPrefix.map(this.search);
      return unique(flatten(documentIds));
    }
  };
};

module.exports = createIndex;
