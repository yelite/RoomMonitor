#include <pcduino/Arduino.h>

void setup() {
	if (argc != 2) {
		printf("usage: %s GPIOpin#\n", argv[0]);
		printf("example: %s 4 - Read from an light sensor connected to GPIO #4\n", argv[0]);
		exit(1);
	}

 	int pin = atoi(argv[1]);
	int rv = analogRead(pin);
	printf("Voltage(mV): \n%d\n", rv);
}

void loop() {
	exit(0);
}