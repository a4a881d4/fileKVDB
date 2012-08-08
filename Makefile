Test: work/Test

work/Test:src/FileKVDB.cc src/FileKVDB.h
	g++ -o work/Test -DSELFTEST src/FileKVDB.cc
	
clean:
	rm work/* -rf
	