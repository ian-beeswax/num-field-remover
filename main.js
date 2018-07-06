var bidInput = $('#bid-input');
var regex = /^\s*?\d+(\:\s?.*\n?|\s*?\{[\s\w\W]*?\}\n?)/gm;
$('#submit').on('click', submit);

function submit(e) {
  var rawBidRequest = bidInput[0].value;
  var output = rawBidRequest.replace(regex, function(match) {
    return "<span class='deletion'>"+match+"</span>";
  });
  var newProto = rawBidRequest.replace(regex, "");
  $("pre").html("");
  $("pre").append(newProto);
  var container = $(".output");
  var label = $("#output-label");
  if (container.length > 0) { $(container).remove(); }
  if (label) { $(label).remove(); }
  $("body").append(
    "<label id='output-label'>Output:&ensp;"
    + "<i class='fa fa-copy copy' id='copy'></i>&nbsp<i style='font-size:12px'>"
    + "(deletions highlighted in <span class='deletion'>red </span>)</i>"
    + "</label>"
  );
  $("body").append($("<div class='output'>"+output+"</div>"));
  $("#copy").on('click', copy);
}

function copy(e) {
  var pre = $("pre");
  window.getSelection().selectAllChildren(pre[0]);
  document.execCommand("copy");
  window.getSelection().empty();
  showToolTip(e);
}

function showToolTip(e) {
  var x = e.clientX - 20 + "px",
    y = e.clientY - 50 + "px",
    toolTip = $('<div class="copied-tooltip">Copied to Clipboard</div>')
    .css("top", y).css("left", x);
  $(document.body).append(toolTip)
  setTimeout(function(){ $(".copied-tooltip").css("opacity", 0); }, 750);
  setTimeout(function(){ $(".copied-tooltip").remove(); }, 1250);
}
