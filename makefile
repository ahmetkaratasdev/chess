CC = gcc					# Defines the compiler as GCC
CFLAGS = -Wall -Werror
output: testChess.o chess.o
	$(CC) $(CFLAGS) testChess.o chess.o -o output

chess.o: chess.c chess.h
	$(CC) $(CFLAGS) chess.c -c -o chess.o

testChess.o: testChess.c chess.h
	$(CC) $(CFLAGS) testChess.c -c -o testChess.o

clean: 
	rm -f *.o output
#-Wall means turn on all warnings
#-Werror means turn all warnings into errors
#-lm means link the maths library iirc
#-std=c11 means use C11 (there are versions of C: C89, C99, C11, C18 (same as C11), and soon another coming)
#*.c means all files in this directory ending in '.c'
#-o test_Ass1 means output the result to file test_Ass1
