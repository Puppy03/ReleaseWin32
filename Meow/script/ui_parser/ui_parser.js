


var ui_parser = 
{
parser:null, // CPUIParser
styles:{},
currentScene:null,
currentPage:null,
currentNode:null,
};

ui_parser.parser = new CPUIParser;

require('script/ui_delegator/ui_delegator.js');
require('script/ui_parser/ui_controller.js');
require('script/ui_parser/parser_style.js');
require('script/ui_parser/parser_common.js');
require('script/ui_parser/parser_page.js');
require('script/ui_parser/parser_label.js');
require('script/ui_parser/parser_button.js');
require('script/ui_parser/parser_image.js');
require('script/ui_parser/parser_icon.js');
require('script/ui_parser/parser_progress.js');