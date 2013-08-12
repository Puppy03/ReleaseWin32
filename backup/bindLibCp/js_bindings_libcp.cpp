//
//  js_bindings_ccbreader.cpp
//  watermelon
//
//  Created by Rohan Kuruvilla on 14/08/2012.
//
//

#include "js_bindings_libcp.h"
#include "ScriptingCore.h"
#include "js_bindings_config.h"

#include "js_uiParser.h"

JSBool js_call_CCDrawLine(JSContext *cx, uint32_t argc, jsval *vp)
{
	jsval *argv = JS_ARGV(cx, vp);
	JSBool ok = JS_TRUE;
	if (argc == 2) 
	{
		cocos2d::CCPoint arg0;
		cocos2d::CCPoint arg1;
		ok &= jsval_to_ccpoint(cx, argv[0], &arg0);
		ok &= jsval_to_ccpoint(cx, argv[1], &arg1);
		JSB_PRECONDITION2(ok, cx, JS_FALSE, "Error processing arguments");
		ccDrawLine(arg0,arg1);
		JS_SET_RVAL(cx, vp, JSVAL_VOID);
		return JS_TRUE;
	}
	return ok;
}


void js_register_staitcfuncs(JSContext *cx, JSObject *global)
{
	JS_DefineFunction(cx, global, "ccDrawLine", js_call_CCDrawLine, 0, JSPROP_READONLY | JSPROP_PERMANENT);
}

void register_LibCpAll( JSContext *cx, JSObject *global )
{
	js_register_CPUIParser(cx,global);
	js_register_staitcfuncs(cx,global);
}

