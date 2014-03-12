#include <stdio.h>
#include "Adafruit_BMP085.h"
#include <pcduino/Arduino.h>

void setup() {
	Adafruit_BMP085 bmp;
	if ( !bmp.begin() ) {
		printf("Error!!");
		exit(1);
	}
	float temp = bmp.readTemperature();
	int32_t pressure = bmp.readPressure();
	printf("Temp: \n%f\n", temp);
	printf("Pressure: \n%d\n", pressure);
}

void loop() {
	exit(0);
}