CC = gcc
LIBS= -larduino
CFLAGS = $(LIBS)
OBJ = bmp.o main.o

bmp: $(OBJ)
	$(CC) $^ $(CFLAGS) -o $@

bmp.o: Adafruit_BMP085.h Adafruit_BMP085.cpp
	$(CC) $(CFLAGS) -c Adafruit_BMP085.cpp -o $@

main.o: main.cpp Adafruit_BMP085.h
	$(CC) $(CFLAGS) -c main.cpp -o $@

clean:
	-rm $(OBJ) bmp