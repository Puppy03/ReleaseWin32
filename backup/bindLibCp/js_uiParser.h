#pragma once

#include "tinyxml2.h"
#include "jsapi.h"
#include "cocos-ext.h"
#include "cocos2d_specifics.hpp"

class CPUIParser :  public tinyxml2::XMLVisitor
{
public:
	bool parseUI(const char* file);
	bool parseStyle(const char* file);
	bool parseMemory(const char* buf,unsigned int size);
	bool parseFileFullPath(const char* full_path);
private:
	virtual bool VisitEnter( const tinyxml2::XMLElement& element, const tinyxml2::XMLAttribute* firstAttribute );
	virtual bool VisitExit( const tinyxml2::XMLElement& element );
	virtual bool Visit( const tinyxml2::XMLText& text );
	virtual bool Visit( const tinyxml2::XMLUnknown&){ return true; }
};

extern JSClass  *jsb_CPUIParser_class;
extern JSObject *jsb_CPUIParser_prototype;

JSBool js_CPUIParser_constructor(JSContext *cx, uint32_t argc, jsval *vp);
void js_register_CPUIParser(JSContext *cx, JSObject *global);
JSBool js_CPUIParser_ParseUI(JSContext *cx, uint32_t argc, jsval *vp);
JSBool js_CPUIParser_ParseStyle(JSContext *cx, uint32_t argc, jsval *vp);


