#pragma once

#include "jsapi.h"
#include "cocos-ext.h"
#include "cocos2d_specifics.hpp"

#define MD_WRITE     "rb+" // see fseek || must exist
#define MD_OVERWRITE "wb+" // re_init || create if not exist
#define MD_READ      "rb"  // read only || must exist
#define MD_APPEND    "ab"  // append || create if not exist

#ifdef _WIN32
#define CP_DLL __declspec(dllexport)
#else
#define CP_DLL
#endif


bool CP_DLL readFileData(const char* full_path,char*& pBuffer,unsigned int& _size);
