ace.define("ace/theme/dataFoundryTheme",["require","exports","module","ace/lib/dom"], function(acequire, exports, module) {

	exports.isDark = true;
	exports.cssClass = "ace-datafoundry";
	exports.cssText = `.ace-datafoundry .ace_gutter {
  background: #0f1419;
  color: #d0edf7
}

.ace-datafoundry .ace_print-margin {
  width: 1px;
  background: #0f1419;
}

.ace-datafoundry {
  background-color: #0f1419;
  color: #93A1A1
}

.ace-datafoundry .ace_entity.ace_other.ace_attribute-name,
.ace-datafoundry .ace_storage {
  color: #93A1A1
}

.ace-datafoundry .ace_cursor,
.ace-datafoundry .ace_string.ace_regexp {
  color: #D30102
}


.ace-datafoundry .ace_marker-layer .ace_selection {
  background: rgba(255, 255, 255, 0.1)
}

.ace-datafoundry .ace_marker-layer .ace_active-line{
  background: #0f1419;
}

.ace-datafoundry.ace_multiselect .ace_selection.ace_start {
  box-shadow: 0 0 3px 0px #002B36;
}

.ace-datafoundry .ace_marker-layer .ace_step {
  background: rgb(102, 82, 0)
}

.ace-datafoundry .ace_marker-layer .ace_bracket {
  margin: -1px 0 0 -1px;
  border: 1px solid rgba(147, 161, 161, 0.50)
}

.ace-datafoundry .ace_gutter-active-line {
  background-color: #0d3440
}

.ace-datafoundry .ace_marker-layer .ace_selected-word {
  border: 1px solid #073642
}

.ace-datafoundry .ace_invisible {
  color: rgba(147, 161, 161, 0.50)
}

.ace-datafoundry .ace_keyword,
.ace-datafoundry .ace_meta,
.ace-datafoundry .ace_support.ace_class,
.ace-datafoundry .ace_support.ace_type {
  color: #859900
}

.ace-datafoundry .ace_constant.ace_character,
.ace-datafoundry .ace_constant.ace_other {
  color: #CB4B16
}

.ace-datafoundry .ace_constant.ace_language {
  color: #B58900
}

.ace-datafoundry .ace_constant.ace_numeric {
  color: #D33682
}

.ace-datafoundry .ace_fold {
  background-color: #268BD2;
  border-color: #93A1A1
}

.ace-datafoundry .ace_entity.ace_name.ace_function,
.ace-datafoundry .ace_entity.ace_name.ace_tag,
.ace-datafoundry .ace_support.ace_function,
.ace-datafoundry .ace_variable,
.ace-datafoundry .ace_variable.ace_language {
  color: #268BD2
}

.ace-datafoundry .ace_string {
  color: #2AA198
}

.ace-datafoundry .ace_comment {
  font-style: italic;
  color: #657B83
}`;

	let dom = acequire("../lib/dom");
	dom.importCssString(exports.cssText, exports.cssClass);
});
