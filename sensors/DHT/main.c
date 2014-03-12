#include <stdio.h>
#include <pcduino/Arduino.h>

#define DHTLIB_OK				0
#define DHTLIB_ERROR_CHECKSUM	-1
#define DHTLIB_ERROR_TIMEOUT	-2

typedef struct return_value
{
	int flag;
	uint8_t temp;
	uint8_t hum;
} dht_data;

dht_data readDHT(int pin)
{
	dht_data val;
	// BUFFER TO RECEIVE
	uint8_t bits[5];
	uint8_t cnt = 7;
	uint8_t idx = 0;

	// EMPTY BUFFER
	int i;
	for (i=0; i< 5; i++) bits[i] = 0;

	// REQUEST SAMPLE
	pinMode(pin, OUTPUT);
	digitalWrite(pin, LOW);
	delay(36);
	digitalWrite(pin, HIGH);
	delayMicroseconds(40);
	pinMode(pin, INPUT);

	// ACKNOWLEDGE or TIMEOUT
	unsigned int loopCnt = 10000;
	while(digitalRead(pin) == LOW) {
		if (loopCnt-- == 0) {
			val.flag = DHTLIB_ERROR_TIMEOUT;
			return val;
		}
	}

	loopCnt = 50000;
	while(digitalRead(pin) == HIGH){
		if (loopCnt-- == 0) {
			val.flag = DHTLIB_ERROR_TIMEOUT;
			return val;
		}
	}


	// READ OUTPUT - 40 BITS => 5 BYTES or TIMEOUT
	for (i=0; i<40; i++)
	{
		loopCnt = 10000;
		while(digitalRead(pin) == LOW) {
			if (loopCnt-- == 0) {
				val.flag = DHTLIB_ERROR_TIMEOUT;
				return val;
			}
		}

		unsigned long t = micros();

		loopCnt = 10000;
		while(digitalRead(pin) == HIGH) {
			if (loopCnt-- == 0) {
				val.flag = DHTLIB_ERROR_TIMEOUT;
				return val;
			}
		}

		if ((micros() - t) > 40) bits[idx] |= (1 << cnt);
		if (cnt == 0)   // next byte?
		{
			cnt = 7;    // restart at MSB
			idx++;      // next byte!
		}
		else cnt--;
	}

	// WRITE TO RIGHT VARS
    // as bits[1] and bits[3] are allways zero they are omitted in formulas.
	val.hum  = bits[0]; 
	val.temp = bits[2]; 

	uint8_t sum = bits[0] + bits[2];  

	if (bits[4] != sum) {
		val.flag = DHTLIB_ERROR_CHECKSUM;
		return val;
	}
	val.flag = DHTLIB_OK;
	return val;
}

void setup() {
	if (argc != 2) {
		printf("usage: %s GPIOpin#\n", argv[0]);
		printf("example: %s 4 - Read from an DHT connected to GPIO #4\n", argv[0]);
	}

 	int pin = atoi(argv[1]);
	dht_data rv = readDHT(pin);
	switch(rv.flag) {
		case DHTLIB_OK:
		printf("Temperature (C): \n%d\n", rv.temp);
		printf("Humidity (%%): \n%d\n", rv.hum);
		break;
		case DHTLIB_ERROR_CHECKSUM:
		printf("Checksum Error!");
		break;
		case DHTLIB_ERROR_TIMEOUT:
		printf("Timeout Error!");
		break;
	}
}

void loop() {
	exit(0);
}