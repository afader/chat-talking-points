// Applies f to each element of array, then flattens
var flatMap = function(array, f) { 
  return Array.prototype.concat.apply([], array.map(f)); 
};

// The different parts of a parsed chat message
var partTypes = {
  PLAIN: 'PLAIN',                 // plain text message
  BREAK: 'BREAK',                 // line break
  TALKING_POINT: 'TALKING_POINT'  // reference to a talking point
};

var breakPart = function() {
  return {type: partTypes.BREAK};
}

var plainPart = function(content) {
  return {
    type: partTypes.PLAIN,
    content: content
  }
};

var talkingPointPart = function(id, start, end) {
  return {
    id: id,
    type: partTypes.TALKING_POINT,
    start: start,
    end: end
  };
};

// Returns an array of message parts. Splits plain text message parts into
// plain parts and break parts.
var splitBreaks = function(part) {
  if (part.type != partTypes.PLAIN) return [part];
  var text = part.content;
  var lines = text.split('\n');
  var result = [];
  for (var i = 0; i < lines.length; i++) {
    if (i > 0) {
      result.push(breakPart());
    }
    result.push(plainPart(lines[i]));
  };
  return result;
};

// Returns an array of message parts. Searches through the contents of plain
// text message parts for references to talking points. 
var findTalkingPoints = function(part) {
  if (part.type != partTypes.PLAIN) return [part];
  var tpPattern = /#([\w-]+)/g;
  var text = part.content;
  var match = tpPattern.exec(text);
  var tps = [];
  while (match != null) {
    var tpId = match[1];
    var start = match.index;
    var end = start + tpId.length + 1;
    var tp = talkingPointPart(tpId, start, end);
    tps.push(tp);
    match = tpPattern.exec(text);
  };
  if (tps.length == 0) {
    return [plainPart(text)];
  } else {
    var result = [];
    var prevEnd = 0;
    for (var i = 0; i < tps.length; i++) {
      var tp = tps[i];
      if (tp.start > 0) {
	var leftText = text.slice(prevEnd, tp.start);
	result.push(plainPart(leftText));
      }
      result.push(tp);
      prevEnd = tp.end;
    }
    var rightText = text.slice(prevEnd);
    result.push(plainPart(rightText));
    return result;
  }
};

var parse = function(text) {
  var withBreaks = splitBreaks(plainPart(text));
  var withTps = flatMap(withBreaks, findTalkingPoints); 
  return withTps;
};

module.exports = {
  parse: parse,
  partTypes: partTypes
};
