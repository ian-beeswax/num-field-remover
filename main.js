var bidInput = $('#bid-input');
var regex = /^\s*?\d+(\:.*\n|\s*?\{[\s\w\W]*?\}\n)/gm;

function submit() {
  var rawBidRequest = bidInput[0].value;
  var output = rawBidRequest.replace(regex, "");
  var pre = $("pre");
  var label = $("#output-label");
  if (pre.length > 0) { $(pre).remove(); }
  if (label) { $(label).remove(); }
  $("body").append(
    "<label id='output-label'>Output:&emsp;"
    + "<i class='fa fa-copy' onclick='copy()'></i>&emsp;"
    + "<i class='fa fa-download'></label>"
  );
  $("body").append($(`<pre>${output}</pre>`));
}

function copy() {
  var pre = $("pre");
  window.getSelection().selectAllChildren(pre[0]);
  document.execCommand("copy");
  window.getSelection().empty();
}
