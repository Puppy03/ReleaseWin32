#include "js_cp_common.h"
#include <stdio.h>
#include "ScriptingCore.h"

bool readFileData( const char* full_path,char*& pBuffer,unsigned int& _size )
{
	FILE *fp = fopen(full_path, MD_READ);
	if(!fp)
		return false;

	fseek(fp,0,SEEK_END);
	_size = ftell(fp);
	fseek(fp,0,SEEK_SET);
	pBuffer = new char[_size];
	unsigned int read_size= fread(pBuffer,sizeof(char),_size,fp);
	fclose(fp);
	if(read_size != _size)
		return false;
	return true;
}
