#include "js_uiParser.h"
#include "js_cp_common.h"

 JSClass  *jsb_CPUIParser_class;
 JSObject *jsb_CPUIParser_prototype;


JSBool js_CPUIParser_constructor(JSContext *cx, uint32_t argc, jsval *vp)
{
	if (argc == 0) 
	{
		CPUIParser* cobj = new CPUIParser();
	
		TypeTest<CPUIParser> t;
		js_type_class_t *typeClass;
		uint32_t typeId = t.s_id();
		HASH_FIND_INT(_js_global_type_ht, &typeId, typeClass);
		assert(typeClass);
		JSObject *obj = JS_NewObject(cx, typeClass->jsclass, typeClass->proto, typeClass->parentProto);
		JS_SET_RVAL(cx, vp, OBJECT_TO_JSVAL(obj));
		// link the native object with the javascript object
		js_proxy_t *p;
		JS_NEW_PROXY(p, cobj, obj);
		JS_AddNamedObjectRoot(cx, &p->obj, "CPUIParser");
		return JS_TRUE;
	}

	JS_ReportError(cx, "wrong number of arguments: %d, was expecting %d", argc, 0);
	return JS_FALSE;
}

void js_CPUIParser_finalize(JSFreeOp *fop, JSObject *obj) {
	CCLOGINFO("finalizing JS object %p (CPUIParser)", obj);
}

void js_register_CPUIParser( JSContext *cx, JSObject *global )
{
	jsb_CPUIParser_class = (JSClass *)calloc(1, sizeof(JSClass));
	jsb_CPUIParser_class->name = "CPUIParser";
	jsb_CPUIParser_class->addProperty = JS_PropertyStub;
	jsb_CPUIParser_class->delProperty = JS_PropertyStub;
	jsb_CPUIParser_class->getProperty = JS_PropertyStub;
	jsb_CPUIParser_class->setProperty = JS_StrictPropertyStub;
	jsb_CPUIParser_class->enumerate = JS_EnumerateStub;
	jsb_CPUIParser_class->resolve = JS_ResolveStub;
	jsb_CPUIParser_class->convert = JS_ConvertStub;
	jsb_CPUIParser_class->finalize = js_CPUIParser_finalize;
	jsb_CPUIParser_class->flags = JSCLASS_HAS_RESERVED_SLOTS(2);

	static JSPropertySpec properties[] = {
		{0, 0, 0, JSOP_NULLWRAPPER, JSOP_NULLWRAPPER}
	};

	static JSFunctionSpec funcs[] = {
		JS_FN("parseUI", js_CPUIParser_ParseUI, 1, JSPROP_PERMANENT | JSPROP_ENUMERATE),
		JS_FN("parseStyle", js_CPUIParser_ParseStyle, 1, JSPROP_PERMANENT | JSPROP_ENUMERATE),
		JS_FS_END
	};

	static JSFunctionSpec* st_funcs = NULL;
	//static JSFunctionSpec st_funcs[] = {
	//	JS_FN("create", js_cocos2dx_CCAction_create, 0, JSPROP_PERMANENT | JSPROP_ENUMERATE),
	//	JS_FS_END
	//};

	jsb_CPUIParser_prototype = JS_InitClass(
		cx, global,
		NULL, // parent proto
		jsb_CPUIParser_class,
		js_CPUIParser_constructor, 0, // constructor
		properties,
		funcs,
		NULL, // no static properties
		st_funcs);
	// make the class enumerable in the registered namespace
	JSBool found;
	JS_SetPropertyAttributes(cx, global, "CPUIParser", JSPROP_ENUMERATE | JSPROP_READONLY, &found);

	// add the proto and JSClass to the type->js info hash table
	TypeTest<CPUIParser> t;
	js_type_class_t *p;
	uint32_t typeId = t.s_id();
	HASH_FIND_INT(_js_global_type_ht, &typeId, p);
	if (!p) {
		p = (js_type_class_t *)malloc(sizeof(js_type_class_t));
		p->type = typeId;
		p->jsclass = jsb_CPUIParser_class;
		p->proto = jsb_CPUIParser_prototype;
		p->parentProto = NULL;
		HASH_ADD_INT(_js_global_type_ht, type, p);
	}
}

JSBool js_CPUIParser_ParseUI( JSContext *cx, uint32_t argc, jsval *vp )
{
	jsval *argv = JS_ARGV(cx, vp);
	JSBool ok = JS_TRUE;

	JSObject *obj = NULL;
	CPUIParser* cobj = NULL;
	obj = JS_THIS_OBJECT(cx, vp);
	js_proxy_t *proxy; JS_GET_NATIVE_PROXY(proxy, obj);
	cobj = (CPUIParser *)(proxy ? proxy->ptr : NULL);
	JSB_PRECONDITION2( cobj, cx, JS_FALSE, "Invalid Native Object");
	if (argc == 1) 
	{
		JSString *string = NULL;  
		JS_ConvertArguments(cx, argc, JS_ARGV(cx, vp), "S", &string);  
		if (!string) {
			return JS_FALSE;  
		} 
		JSStringWrapper wrapper(string);  
		cobj->parseUI(wrapper.get().c_str());
		JS_SET_RVAL(cx, vp, JSVAL_VOID);
		return JS_TRUE;
	}
	return JS_FALSE; 
}


JSBool js_CPUIParser_ParseStyle( JSContext *cx, uint32_t argc, jsval *vp )
{
	jsval *argv = JS_ARGV(cx, vp);
	JSBool ok = JS_TRUE;

	JSObject *obj = NULL;
	CPUIParser* cobj = NULL;
	obj = JS_THIS_OBJECT(cx, vp);
	js_proxy_t *proxy; JS_GET_NATIVE_PROXY(proxy, obj);
	cobj = (CPUIParser *)(proxy ? proxy->ptr : NULL);
	JSB_PRECONDITION2( cobj, cx, JS_FALSE, "Invalid Native Object");
	if (argc == 1) 
	{
		JSString *string = NULL;  
		JS_ConvertArguments(cx, argc, JS_ARGV(cx, vp), "S", &string);  
		if (!string) {
			return JS_FALSE;  
		} 
		JSStringWrapper wrapper(string);  
		cobj->parseStyle(wrapper.get().c_str());
		JS_SET_RVAL(cx, vp, JSVAL_VOID);
		return JS_TRUE;
	}
	return JS_FALSE; 
}


bool CPUIParser::parseUI( const char* file )
{
	std::string full_path = CCFileUtils::sharedFileUtils()->fullPathForFilename(file);
	return parseFileFullPath(full_path.c_str());
}


bool CPUIParser::parseStyle( const char* file )
{
	std::string full_path = CCFileUtils::sharedFileUtils()->fullPathForFilename(file);
	return parseFileFullPath(full_path.c_str());
}


bool CPUIParser::parseMemory( const char* buf,unsigned int size )
{
	tinyxml2::XMLDocument tinyDoc;
	tinyDoc.Parse(buf, size);

	return tinyDoc.Accept(this );	
}

bool CPUIParser::parseFileFullPath( const char* full_path )
{
	unsigned int size;
	char* pData;
	if(!readFileData(full_path,pData,size))
	{
		assert(false);
		return false;
	}
	parseMemory(pData,size);

	delete[] pData;
	return true;
}

bool CPUIParser::VisitEnter( const tinyxml2::XMLElement& element, const tinyxml2::XMLAttribute* firstAttribute )
{
	ScriptingCore* sc = ScriptingCore::getInstance();
	JSContext* context = sc->getGlobalContext();
	JSObject *pObject = JS_NewObject(context, NULL, NULL, NULL);
	if(!pObject)
	{
		return false;
	}
	for( const tinyxml2::XMLAttribute* attrib = firstAttribute; attrib; attrib = attrib->Next() )
	{
		std::string str = attrib->Value();
		JS_DefineProperty(context, pObject, attrib->Name(), std_string_to_jsval(context,str), NULL, NULL, JSPROP_ENUMERATE | JSPROP_PERMANENT);
	}
	
   jsval val_attris = OBJECT_TO_JSVAL(pObject);
   std::string element_name = element.Name();
   std::string func_name = std::string("parse")+element_name;

   JSObject* pObj = nullptr;  
   jsval obj;  
   JS_GetProperty(sc->getGlobalContext(),sc->getGlobalObject(),"ui_parser", &obj);  
   JS_ValueToObject(sc->getGlobalContext(),obj,&pObj);  

   jsval _result;
   JSBool ret = JS_CallFunctionName(sc->getGlobalContext(), pObj, func_name.c_str(), 1, &val_attris, &_result); 

	return ret!=0;
}

bool CPUIParser::VisitExit( const tinyxml2::XMLElement& element )
{
	return true;
}

bool CPUIParser::Visit( const tinyxml2::XMLText& text )
{
	return true;
}
