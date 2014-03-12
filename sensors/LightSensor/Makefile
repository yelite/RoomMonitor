CC = gcc
LIBS= -larduino
CFLAGS = $(LIBS)
OBJ = main.o

light: $(OBJ)
	$(CC) $^ $(CFLAGS) -o $@

main.o: main.c 
	$(CC) $(CFLAGS) -c main.c -o $@

clean:
	-rm $(OBJ) light